# # SPDX-License-Identifier: GPL-3.0-or-later
# bridge.py
# ──────────────────────────────────────────────────────────────────────────
#  RelayZero Bridge
#  Local WebSocket <-> VS Code MCP server.
#  The browser extension talks to this over ws://127.0.0.1:<PORT>.
#
#  What this bridge exposes to the AI (aggregated into one tools/list):
#    - Every MCP server declared in config.json (by default: vscode over
#      Streamable HTTP at 127.0.0.1:9876/mcp), routed by tool name.
#    - Optional stdio addon MCP servers (command/args in config.json).
#    - BUILT-IN tools in bridge.py + sys_tools.py (project memory, shell,
#      git, files, process/system, C++ toolchain, .vcxproj helpers), so many
#      tasks work even when VS Code is not running.
#
#  Design goals (robustness first):
#   - HTTP primary: JSON-RPC POST /mcp (nabheet.vscode-ide-mcp).
#   - Stdio addons: ONE dedicated reader thread per child; responses matched
#     by JSON-RPC id. stderr drained so a child never blocks on a full pipe.
#   - A dead server is auto-restarted and the failing call retried once.
#   - Tool calls are locked PER SERVER, so a slow server never blocks another.
#   - Every call ALWAYS produces a reply: a result OR a structured error.
#     Nothing ever hangs the agentic loop silently.
# ──────────────────────────────────────────────────────────────────────────
import asyncio
import json
import os
import queue
import subprocess
import sys
import threading
import time

# ── Windows: never flash a console window for child processes ──
# The bridge runs under pythonw (no console). On Windows any console child
# (netstat, tasklist, powershell, cmd/npx...) would otherwise pop its own
# window - and the status probes run every few seconds, so the user sees a
# storm of cmd windows. Default every subprocess to CREATE_NO_WINDOW unless a
# caller already passed creationflags.
if sys.platform == "win32":
    _ZS_NO_WINDOW = getattr(subprocess, "CREATE_NO_WINDOW", 0x08000000)
    _zs_popen = subprocess.Popen
    _zs_run = subprocess.run

    def _zs_popen_nowin(*a, **k):
        k.setdefault("creationflags", _ZS_NO_WINDOW)
        return _zs_popen(*a, **k)

    def _zs_run_nowin(*a, **k):
        k.setdefault("creationflags", _ZS_NO_WINDOW)
        return _zs_run(*a, **k)

    subprocess.Popen = _zs_popen_nowin
    subprocess.run = _zs_run_nowin

try:
    # Sibling diagnostics script (same folder as bridge.py) - used to detect
    # Code.exe / the nabheet MCP HTTP endpoint, not to launch anything.
    import launch_vscode_mcp as _vs_scan
except Exception:
    _vs_scan = None

try:
    import urllib.error
    import urllib.request
except Exception:
    urllib = None

try:
    import websockets
except ImportError:
    print("[bridge] Missing dependency. Run:  pip install websockets")
    sys.exit(1)

# Windows consoles often default to a legacy codepage (cp1252): printing
# non-ASCII text then raises UnicodeEncodeError INSIDE the WS handler, which
# kills the connection. Force UTF-8 (best effort). We also keep all console
# output strictly ASCII (no arrows / dots) so nothing garbles on a console that
# stayed on a legacy codepage anyway.
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass


def _enable_ansi_colors():
    """On Windows, turn on ANSI escape processing so color codes render instead
    of printing as literal gibberish like "<ESC>[92m". Returns True on success."""
    if sys.platform != "win32":
        return True
    try:
        import ctypes
        k = ctypes.windll.kernel32
        h = k.GetStdHandle(-11)  # STD_OUTPUT_HANDLE
        mode = ctypes.c_uint32()
        if not k.GetConsoleMode(h, ctypes.byref(mode)):
            return False
        # ENABLE_VIRTUAL_TERMINAL_PROCESSING = 0x0004
        return bool(k.SetConsoleMode(h, mode.value | 0x0004))
    except Exception:
        return False


HOST = "127.0.0.1"
# Keep in sync with relayzero-extension/manifest.json "version" - printed at
# startup so a user's terminal output alone tells us which build they're on.
BRIDGE_VERSION = "5.3.0"
PORT = int(os.environ.get("ZS_BRIDGE_PORT", "17613"))
ALLOWED_EXTENSION_ORIGIN = "chrome-extension://jnhfkinpdpbkbmpnmbpefeadkfnnnkmf"
HERE = os.path.dirname(os.path.abspath(__file__))

def _writable_dir(preferred):
    try:
        os.makedirs(preferred, exist_ok=True)
        t = os.path.join(preferred, ".zs_write_test")
        with open(t, "w") as f:
            f.write("ok")
        os.remove(t)
        return preferred
    except Exception:
        return None

# Config lives next to the bridge (dev/working copy) when that folder is
# writable; under Program Files it is read-only, so fall back to a per-user
# copy in ~/RelayZero so extension-driven add/remove-server still works.
_user_cfg = os.path.join(os.path.expanduser("~"), "RelayZero", "config.json")
if _writable_dir(HERE):
    CONFIG_PATH = os.path.join(HERE, "config.json")
else:
    CONFIG_PATH = _user_cfg
    if not os.path.exists(CONFIG_PATH):
        try:
            os.makedirs(os.path.dirname(CONFIG_PATH), exist_ok=True)
            _local = os.path.join(HERE, "config.example.json")
            _data = open(_local, "r", encoding="utf-8").read() if os.path.exists(_local) else "{}"
            with open(CONFIG_PATH, "w", encoding="utf-8") as _f:
                _f.write(_data)
        except Exception:
            CONFIG_PATH = os.path.join(HERE, "config.json")

# Keep user-added MCP servers and credentials out of the source tree. The
# example config is copied only on first run; an existing local config wins.
if not os.path.exists(CONFIG_PATH):
    try:
        os.makedirs(os.path.dirname(CONFIG_PATH), exist_ok=True)
        _template = os.path.join(HERE, "config.example.json")
        _data = open(_template, "r", encoding="utf-8").read() if os.path.exists(_template) else "{}"
        with open(CONFIG_PATH, "w", encoding="utf-8") as _f:
            _f.write(_data)
    except OSError:
        pass

# The primary server. It is always present, added by the installer, and can
# never be edited/removed through the extension (it is what RelayZero is FOR).
PRIMARY_SERVER_ID = "vscode"

if _enable_ansi_colors():
    C = {
        "reset": "\033[0m", "dim": "\033[2m", "gr": "\033[92m",
        "yl": "\033[93m", "rd": "\033[91m", "cy": "\033[96m",
    }
else:
    # Console can't do ANSI: drop colors entirely rather than print raw escapes.
    C = {k: "" for k in ("reset", "dim", "gr", "yl", "rd", "cy")}

# Every run appends here (never truncated), so a whole test session - across
# multiple restarts - stays in one file the user can just send us. Each
# process start writes a banner (see main()) so restarts are easy to spot.
# Prefer logs next to the bridge (dev/working copy); fall back to a
# user-writable folder when installed under Program Files (read-only).
LOGS_DIR = (_writable_dir(os.path.join(HERE, "logs"))
            or _writable_dir(os.path.join(os.path.expanduser("~"), "RelayZero", "logs"))
            or os.path.join(os.path.expanduser("~"), "RelayZero", "logs"))
os.makedirs(LOGS_DIR, exist_ok=True)
LOG_PATH = os.path.join(LOGS_DIR, "bridge_debug.log")
try:
    _log_file = open(LOG_PATH, "a", encoding="utf-8", errors="replace")
except Exception:
    _log_file = None


class _Spinner:
    """Terminal-only progress indicator for waits that can run several seconds
    (server launch/handshake, VS Code attach grace period) so the console never
    just sits there looking dead - the #1 thing that makes a user assume the
    bridge hung and close the window. Purely cosmetic: writes over its own line
    with \\r, never touches bridge_debug.log, and is skipped entirely when
    stdout isn't a real console (redirected to a file, no ANSI)."""
    FRAMES = "|/-\\"
    # Only ONE spinner may animate at a time: server launches now run in
    # PARALLEL (see MCPManager.start_all), and several spinners fighting over
    # the same console line with \r produced interleaved garbage. Whoever
    # acquires this lock animates; the others silently skip (the log lines
    # around them still tell the story).
    _active = threading.Lock()

    def __init__(self, label):
        self.label = label
        self._stop = threading.Event()
        self._thread = None
        self._owns_lock = False

    def __enter__(self):
        if sys.stdout.isatty() and _Spinner._active.acquire(blocking=False):
            self._owns_lock = True
            self._thread = threading.Thread(target=self._run, daemon=True)
            self._thread.start()
        return self

    def __exit__(self, *exc):
        self._stop.set()
        if self._thread:
            self._thread.join(timeout=1.0)
            # Wipe the spinner line so the next log() line doesn't get glued
            # onto trailing spinner characters.
            print("\r" + " " * (len(self.label) + 4) + "\r", end="", flush=True)
        if self._owns_lock:
            _Spinner._active.release()

    def _run(self):
        i = 0
        while not self._stop.is_set():
            frame = self.FRAMES[i % len(self.FRAMES)]
            print(f"\r{C['dim']}{self.label} {frame}{C['reset']}", end="", flush=True)
            i += 1
            self._stop.wait(0.15)


def log(msg, color="dim", terminal=True):
    """terminal=False: written to bridge_debug.log only, not the console. Use
    for noisy/technical detail (raw stderr from child MCP servers, per-call
    traces) that would bury the handful of lines a non-technical user actually
    needs to read. Nothing is ever lost - it all still lands in the file."""
    if terminal:
        ts = time.strftime("%H:%M:%S")
        print(f"{C['dim']}{ts}{C['reset']} {C.get(color,'')}{msg}{C['reset']}", flush=True)
    if _log_file:
        try:
            _log_file.write(f"{time.strftime('%Y-%m-%d %H:%M:%S')} {msg}\n")
            _log_file.flush()
        except Exception:
            pass


# VS Code MCP (nabheet) exposes Streamable HTTP at 127.0.0.1:9876/mcp.
# Ports 9876-9880 are probed if the default is busy.


def _port_owner(port):
    """(pid, name, path) of the process LISTENING on `port`, or None. Win32 only."""
    if sys.platform != "win32":
        return None
    try:
        out = subprocess.run(
            ["netstat", "-ano", "-p", "TCP"],
            capture_output=True, text=True, encoding="utf-8", errors="replace",
            timeout=8,
        ).stdout
    except Exception:
        return None
    pid = None
    needle = f":{port} "
    for line in out.splitlines():
        if "LISTENING" in line and needle in line:
            parts = line.split()
            if parts and parts[-1].isdigit():
                pid = parts[-1]
                break
    if not pid:
        return None
    name, path = "?", ""
    try:
        ps = subprocess.run(
            ["powershell", "-NoProfile", "-Command",
             f"$p=Get-Process -Id {pid} -ErrorAction SilentlyContinue; "
             f"if($p){{$p.Name; $p.Path}}"],
            capture_output=True, text=True, encoding="utf-8", errors="replace",
            timeout=8,
        ).stdout.splitlines()
        ps = [l.strip() for l in ps if l.strip()]
        if ps:
            name = ps[0]
            path = ps[1] if len(ps) > 1 else ""
    except Exception:
        pass
    return (pid, name, path)


def _vs_app_running():
    """True/False whether Code.exe (VS Code) exists, or None if this can't be
    determined (non-Windows, or the check itself failed)."""
    if sys.platform != "win32":
        return None
    try:
        out = subprocess.run(
            ["tasklist", "/FI", "IMAGENAME eq Code.exe"],
            capture_output=True, text=True, encoding="utf-8", errors="replace",
            timeout=8,
        ).stdout
    except Exception:
        return None
    return "Code.exe" in out


def _kill_orphan_vs_mcp():
    """No-op on the VS Code port (HTTP primary - no StdioProxy child)."""
    return


def check_vs_ports():
    """No-op on the VS Code port (fixed HTTP port, not dynamic port files)."""
    return False


# Transport-level markers: unmistakable anywhere in the payload (a traceback
# puts them at the end, so a head-only check would miss them).
_TRANSIENT_TRANSPORT_MARKERS = (
    "econnrefused", "connection refused", "connection reset",
    "connection aborted", "broken pipe", "failed to establish a new connection",
)

# Prose markers: the server's failure disclaimer. These are ALSO ordinary
# English that appears inside file content (our own config.js literally says
# "VS Code is offline"), so they only count at the START of the payload -
# that is where the real disclaimer lives, and where the ~1s post-start
# window reply appears.
_TRANSIENT_VS_MARKERS = (
    "vs code is not running", "vscode is not running",
    "could not connect to vs code", "could not connect to vscode",
    "not connected to vs code", "vs code is offline",
    "no visual studio", "visual studio is not running",
    "could not connect to visual studio", "not connected",
    "offline",
)


def _looks_like_transient_vs_drop(text):
    low = (text or "").lower()
    if any(m in low for m in _TRANSIENT_TRANSPORT_MARKERS):
        return True
    head = low.lstrip()[:200]
    return any(m in head for m in _TRANSIENT_VS_MARKERS)


# ── config.json read / write (for extension-driven add/remove) ──────────────
def _read_config():
    if os.path.exists(CONFIG_PATH):
        try:
            with open(CONFIG_PATH, "r", encoding="utf-8") as f:
                cfg = json.load(f)
            if isinstance(cfg, dict):
                cfg.setdefault("mcpServers", {})
                return cfg
        except Exception as e:
            log(f"config.json unreadable ({e}) - starting from a fresh one", "yl")
    return {"mcpServers": {PRIMARY_SERVER_ID: {
        "type": "http", "url": "http://127.0.0.1:9876/mcp"}}}


def _write_config(cfg):
    """Atomic write so a crash mid-write never leaves a truncated config.json."""
    tmp = CONFIG_PATH + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(cfg, f, indent=2)
    os.replace(tmp, CONFIG_PATH)


def config_add_server(server_id, command, args=None, env=None,
                      mcp_type=None, url=None, headers=None):
    """Add/replace an addon server in config.json. Refuses to touch the primary
    (vs) server. Supports BOTH stdio (command+args) and http/sse (url).
    Returns (ok, error)."""
    sid = (server_id or "").strip()
    if not sid:
        return False, "server id is required"
    if sid == PRIMARY_SERVER_ID:
        return False, f"'{PRIMARY_SERVER_ID}' is the primary server and cannot be edited"
    mtype = (mcp_type or "").lower()
    is_http = mtype in ("http", "sse", "remote") or (bool(url) and not command)
    cfg = _read_config()
    if is_http:
        if not (url or "").strip():
            return False, "a url is required for an http/sse server"
        spec = {"type": "http", "url": url.strip()}
        if headers:
            spec["headers"] = dict(headers)
    else:
        if not (command or "").strip():
            return False, "a command is required"
        spec = {"command": command.strip(), "args": list(args or [])}
        if env:
            spec["env"] = dict(env)
    cfg["mcpServers"][sid] = spec
    try:
        _write_config(cfg)
    except Exception as e:
        return False, f"could not write config.json: {e}"
    return True, None


def config_remove_server(server_id):
    """Remove an addon server from config.json. Refuses the primary server."""
    sid = (server_id or "").strip()
    if sid == PRIMARY_SERVER_ID:
        return False, f"'{PRIMARY_SERVER_ID}' is the primary server and cannot be removed"
    cfg = _read_config()
    if sid not in cfg.get("mcpServers", {}):
        return False, f"server '{sid}' is not in the config"
    del cfg["mcpServers"][sid]
    try:
        _write_config(cfg)
    except Exception as e:
        return False, f"could not write config.json: {e}"
    return True, None


def restart_self():
    """Replace this process with a fresh one so config.json is reloaded from
    scratch. Children are killed first to free their stdio pipes / ports before
    the new instance claims them. Never returns on success (os.execv)."""
    log("restarting bridge to load new server config...", "yl")
    try:
        for c in mgr.clients.values():
            c.stop()
    except Exception:
        pass
    if _log_file:
        try:
            _log_file.flush()
        except Exception:
            pass
    # sys.argv[0] may be relative ('bridge.py'); make it absolute so the restart
    # works regardless of the current working directory.
    argv = list(sys.argv)
    script = os.path.abspath(argv[0]) if argv else os.path.abspath(__file__)
    argv = [script] + argv[1:]
    try:
        os.execv(sys.executable, [sys.executable] + argv)
    except Exception as e:
        # execv failed (rare) - fall back to spawning a detached copy and exiting
        # so the user still ends up with a running, up-to-date bridge.
        log(f"in-place restart failed ({e}); spawning a fresh bridge...", "rd")
        try:
            subprocess.Popen([sys.executable] + argv, cwd=HERE,
                             creationflags=(subprocess.CREATE_NO_WINDOW if sys.platform == "win32" else 0))
        except Exception as e2:
            log(f"could not spawn a fresh bridge: {e2} - please restart it manually", "rd")
        os._exit(0)


# ══════════════════════════════════════════════════════════════════════════
#  HARDENED MCP CLIENT  (one per server in config.json)
# ══════════════════════════════════════════════════════════════════════════
# REA's shared catalogue covers passive browser and artifact inspection.
REA_TOOLS = frozenset({
    "list_browser_targets",
    "inspect_web_page",
    "inspect_web_event_listeners",
    "analyze_web_bundle",
    "compare_bundles",
    "compare_web_captures",
    "open_binary",
    "close_binary",
    "binary_overview",
    "inspect_artifact",
    "compare_artifacts",
    "inspect_binary_layout",
    "inspect_pe_resources",
    "inspect_asset_catalog",
    "inspect_android_package",
    "inspect_plist",
    "inspect_signature",
    "inspect_wasm_artifact",
})


class MCPClient:
    def __init__(self, server_id, command, args, env=None,
                 mcp_type="stdio", url=None, headers=None):
        self.id = server_id
        self.command = command
        self.args = list(args or [])
        self.env = env or {}
        self.mcp_type = (mcp_type or "stdio").lower()
        self.url = (url or "").rstrip("/")
        self.headers = dict(headers or {})
        self.http_up = False
        self.proc = None
        self.req_id = 1
        self.write_lock = threading.Lock()
        self.call_lock = threading.Lock()   # serialize tool calls (one pipe/HTTP session)
        self.pending = {}                    # id -> queue.Queue (one slot) [stdio]
        self.pend_lock = threading.Lock()
        self.tools_cache = []
        self.start_lock = threading.Lock()
        self._reader_thread = None
        # Crash-loop forensics (read by server_watch). The auto-restart used to
        # hide a server that something else kills over and over: the terminal
        # showed an endless quiet restart cycle with no explanation at all. We
        # keep just enough state to NAME the problem in the terminal instead:
        #  - last_exit: exit code from the final _reader EOF (crash vs kill hint)
        #  - stderr_tail: the last few stderr lines (usually the actual reason -
        #    port bind failure, missing dependency, crash trace)
        #  - restart_times: recent auto-restart timestamps (loop detector input)
        #  - loop_warned_at: throttle so the big red banner prints once per
        #    cooldown, not every 5s poll
        self.last_exit = None
        self.stderr_tail = []
        self.restart_times = []
        self.loop_warned_at = 0.0

    # ── lifecycle ─────────────────────────────────────────────────────────
    def _resolve(self, s):
        return os.path.expandvars(os.path.expanduser(str(s)))

    def start(self):
        with self.start_lock:
            if self.is_alive():
                return
            if self.mcp_type == "http":
                self._start_http()
                return
            cmd = [self._resolve(self.command)] + [self._resolve(a) for a in self.args]
            # A bare .py command (relative paths resolve against the bridge dir)
            # is run with the SAME interpreter the bridge itself uses, so it works
            # even on installs where only the `py` launcher exists (no `python`
            # on PATH). This is how the VS Code MCP launcher is wired by default.
            if cmd[0].lower().endswith(".py"):
                script = cmd[0]
                if not os.path.isabs(script):
                    script = os.path.join(HERE, script)
                cmd = [sys.executable, script] + cmd[1:]
            # On Windows, npx/npm/yarn/pnpm/bunx are .cmd shims that Popen can't
            # launch directly (WinError 2). Run them through cmd.exe so any
            # node-based MCP server "just works" from config.json.
            if sys.platform == "win32":
                base = os.path.basename(cmd[0]).lower()
                if base in ("npx", "npm", "yarn", "pnpm", "bunx"):
                    cmd = ["cmd.exe", "/c"] + cmd
            env = dict(os.environ)
            for k, v in self.env.items():
                env[k] = self._resolve(v)
            log(f"[{self.id}] launching  ({' '.join(cmd)})", "cy")
            with _Spinner(f"    [{self.id}] starting..."):
                self.proc = subprocess.Popen(
                    cmd,
                    stdin=subprocess.PIPE,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    text=True,
                    bufsize=1,
                    encoding="utf-8",
                    errors="replace",
                    cwd=HERE,
                    env=env,
                    creationflags=(subprocess.CREATE_NO_WINDOW if sys.platform == "win32" else 0),
                )
                with self.pend_lock:
                    self.pending.clear()
                self._reader_thread = threading.Thread(target=self._reader, args=(self.proc,), daemon=True)
                self._reader_thread.start()
                threading.Thread(target=self._stderr_drain, args=(self.proc,), daemon=True).start()

                # MCP handshake.
                self._request("initialize", {
                    "protocolVersion": "2024-11-05",
                    "capabilities": {},
                    "clientInfo": {"name": "relayzero-bridge", "version": "1.0"},
                }, timeout=30)
                self._notify("notifications/initialized")
                # A freshly spawned MCP server can advertise 0 tools at the
                # instant initialize returns (it is still importing / connecting
                # to its own backend - for VS Code, the plugin HTTP bridge). A single
                # tools/list then caches an empty list forever. So if we get
                # nothing, retry for a few seconds.
                # Short per-attempt timeout so the bridge never looks frozen if the
                # server stays silent (e.g. VS Code not started yet); ~12s budget.
                for _ in range(12):
                    if self.refresh_tools(timeout=3):
                        break
                    if not self.is_alive():
                        break
                    time.sleep(1.0)
            log(f"[{self.id}] MCP server up  ({len(self.tools_cache)} tools advertised)", "cy")

    def _start_http(self):
        if not self.url:
            raise RuntimeError(f"[{self.id}] http MCP server has no url")
        log(f"[{self.id}] connecting  ({self.url})", "cy")
        with _Spinner(f"    [{self.id}] connecting..."):
            deadline = time.time() + 15
            ok = False
            last_err = None
            while time.time() < deadline:
                try:
                    self._http_post({
                        "jsonrpc": "2.0", "id": self._next_id(),
                        "method": "initialize",
                        "params": {
                            "protocolVersion": "2024-11-05",
                            "capabilities": {},
                            "clientInfo": {"name": "relayzero-bridge", "version": "1.0"},
                        },
                    }, timeout=6)
                    self.http_up = True
                    ok = True
                    break
                except Exception as e:
                    last_err = e
                    time.sleep(0.8)
            if not ok:
                self.http_up = False
                self.tools_cache = []
                log(f"[{self.id}] endpoint not up yet: {last_err}", "yl")
                return
            for _ in range(8):
                if self.refresh_tools(timeout=4):
                    break
                time.sleep(0.75)
        log(f"[{self.id}] HTTP MCP up  ({len(self.tools_cache)} tools advertised)", "cy")

    def _http_post(self, payload, timeout):
        if urllib is None:
            raise RuntimeError("urllib unavailable")
        data = json.dumps(payload).encode("utf-8")
        hdrs = {
            "Content-Type": "application/json",
            "Accept": "application/json, text/event-stream",
        }
        for k, v in self.headers.items():
            hdrs[str(k)] = str(v)
        req = urllib.request.Request(self.url, data=data, headers=hdrs, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                body = resp.read().decode("utf-8", errors="replace")
        except Exception:
            self.http_up = False
            raise
        self.http_up = True
        body = (body or "").strip()
        if not body:
            return None
        if body.startswith("event:") or "\ndata:" in body or body.startswith("data:") or body.startswith("{") is False and "data:" in body:
            for line in body.splitlines():
                line = line.strip()
                if line.startswith("data:"):
                    line = line[5:].strip()
                    if not line:
                        continue
                    try:
                        return json.loads(line)
                    except Exception:
                        continue
            return None
        try:
            return json.loads(body)
        except Exception:
            return None

    def is_alive(self):
        if self.mcp_type == "http":
            return bool(self.http_up)
        return self.proc is not None and self.proc.poll() is None

    def restart(self):
        log(f"[{self.id}] restarting...", "yl")
        self.stop()
        time.sleep(0.4)
        self.start()

    def stop(self):
        if self.mcp_type == "http":
            self.http_up = False
            self.proc = None
            return
        with self.pend_lock:
            for q in self.pending.values():
                try:
                    q.put_nowait(None)
                except Exception:
                    pass
            self.pending.clear()
        if self.proc:
            # HTTP mode has no child process; stdio mode may still be used
            # for addon servers. taskkill /T on Windows kills the tree.
            try:
                if sys.platform == "win32":
                    subprocess.run(
                        ["taskkill", "/F", "/T", "/PID", str(self.proc.pid)],
                        capture_output=True, timeout=8,
                    )
                else:
                    self.proc.terminate()
            except Exception:
                pass
        self.proc = None

    # ── io threads ────────────────────────────────────────────────────────
    def _reader(self, proc):
        stream = proc.stdout
        while True:
            try:
                line = stream.readline()
            except Exception:
                break
            if line == "":  # EOF -> process exited
                break
            line = line.strip()
            if not line:
                continue
            try:
                msg = json.loads(line)
            except Exception:
                continue  # stray non-JSON log on stdout
            mid = msg.get("id")
            if mid is None:
                continue  # server notification, nothing waits on it
            with self.pend_lock:
                q = self.pending.get(mid)
            if q is not None:
                try:
                    q.put_nowait(msg)
                except Exception:
                    pass
        code = proc.poll()
        self.last_exit = code  # kept for the crash-loop banner in server_watch
        log(f"[{self.id}] stdout closed (process ended, exit code {code})", "rd")
        with self.pend_lock:
            for q in self.pending.values():
                try:
                    q.put_nowait(None)
                except Exception:
                    pass

    def _stderr_drain(self, proc):
        # Surface the child's stderr instead of silently discarding it - this
        # is often the ONLY clue why a server died (crash trace, port bind
        # failure, missing VS Code plugin, etc).
        try:
            for line in iter(proc.stderr.readline, ""):
                line = line.rstrip()
                if line:
                    # Ring buffer of the last stderr lines: when the server
                    # enters a crash loop, these are printed in the terminal
                    # banner - they are usually the only real explanation
                    # (port already in use, module not found, crash trace).
                    self.stderr_tail.append(line)
                    if len(self.stderr_tail) > 8:
                        self.stderr_tail.pop(0)
                    log(f"[{self.id}] stderr: {line}", "yl", terminal=False)
        except Exception:
            pass

    # ── jsonrpc ───────────────────────────────────────────────────────────
    def _next_id(self):
        with self.write_lock:
            rid = self.req_id
            self.req_id += 1
            return rid

    def _notify(self, method, params=None):
        if self.mcp_type == "http":
            try:
                self._http_post({"jsonrpc": "2.0", "method": method,
                                 "params": params or {}}, timeout=5)
            except Exception:
                pass
            return
        payload = {"jsonrpc": "2.0", "method": method, "params": params or {}}
        with self.write_lock:
            self.proc.stdin.write(json.dumps(payload) + "\n")
            self.proc.stdin.flush()

    def _request(self, method, params, timeout):
        if self.mcp_type == "http":
            if not self.url:
                raise RuntimeError(f"server '{self.id}' has no url")
            rid = self._next_id()
            payload = {"jsonrpc": "2.0", "id": rid, "method": method, "params": params or {}}
            try:
                msg = self._http_post(payload, timeout=timeout)
            except Exception as e:
                self.http_up = False
                raise RuntimeError(f"HTTP MCP '{self.id}' unreachable: {e}") from e
            if msg is None:
                return None
            return msg
        if not self.is_alive():
            raise RuntimeError(f"server '{self.id}' is not running")
        rid = self._next_id()
        q = queue.Queue(maxsize=1)
        with self.pend_lock:
            self.pending[rid] = q
        try:
            payload = {"jsonrpc": "2.0", "id": rid, "method": method, "params": params or {}}
            with self.write_lock:
                self.proc.stdin.write(json.dumps(payload) + "\n")
                self.proc.stdin.flush()
            try:
                return q.get(timeout=timeout)
            except queue.Empty:
                return None
        finally:
            with self.pend_lock:
                self.pending.pop(rid, None)

    # ── high-level ────────────────────────────────────────────────────────
    def refresh_tools(self, timeout=20):
        msg = self._request("tools/list", {}, timeout=timeout)
        if msg and "result" in msg:
            tools = msg["result"].get("tools", [])
            self.tools_cache = (
                [tool for tool in tools if tool.get("name") in REA_TOOLS]
                if self.id == "rea" else tools
            )
        return self.tools_cache

    def call_tool(self, name, arguments, timeout):
        """Returns {"text":..., "images":[...]}. Raises on error/timeout."""
        if self.id == "rea" and name not in REA_TOOLS:
            raise RuntimeError(f"REA tool '{name}' is outside the inspection catalogue")
        with self.call_lock:
            for attempt in (1, 2):
                if not self.is_alive():
                    self.restart()
                msg = self._request("tools/call",
                                    {"name": name, "arguments": arguments}, timeout)
                if msg is None:
                    if not self.is_alive():
                        self.restart()
                        msg = self._request("tools/call",
                                            {"name": name, "arguments": arguments}, timeout)
                    if msg is None:
                        raise TimeoutError(
                            f"No response from server '{self.id}' after {timeout}s.")
                if msg.get("error"):
                    err = msg["error"]
                    err_text = err.get("message", json.dumps(err))
                    if attempt == 1 and _looks_like_transient_vs_drop(err_text):
                        log(f"[{self.id}] {name}: transient editor drop, retrying once...", "yl")
                        time.sleep(1.5)
                        continue
                    raise RuntimeError(err_text)
                result = msg.get("result", {})
                content = result.get("content", [])
                text = "\n".join(it.get("text", "") for it in content if it.get("type") == "text")
                if self.id == "rea" and result.get("isError"):
                    raise RuntimeError(text or "REA reported a tool error")
                images = [{"data": it["data"], "mimeType": it.get("mimeType", "image/jpeg")}
                          for it in content if it.get("type") == "image" and it.get("data")]
                if not text and not images and content:
                    text = json.dumps(content)[:4000]
                # The VS MCP server answers a disconnected plugin with a
                # NORMAL result ("Error: VS Code is not running" / "Could not
                # connect to VS Code") rather than a JSON-RPC error.
                # That text is also what a call sees in the ~1s window right
                # after the user clicks "Start MCP Server" (the socket exists but
                # is not accepting yet), so one short retry rides through it
                # instead of surfacing a spurious error to the user.
                if attempt == 1 and _looks_like_transient_vs_drop(text):
                    log(f"[{self.id}] {name}: VS Code not reachable yet, retrying once...", "yl")
                    time.sleep(1.5)
                    continue
                return {"text": text, "images": images}


# ══════════════════════════════════════════════════════════════════════════
#  BUILT-IN TOOLS  (served by the bridge itself, no MCP server involved)
# ══════════════════════════════════════════════════════════════════════════
# The Roblox build kept the agent's long-term project memory INSIDE the place
# (a ModuleScript under ServerStorage), which has no VS Code equivalent. Doing
# it with execute_code would mean the model hand-writes C# / file I/O
# on every read and write, so instead these two commands are served right here:
# memory works with VS Code closed, needs no MCP server, survives a VS Code crash,
# and is one JSON call instead of a code block.
MEMORY_ROOT = os.path.join(os.path.expanduser("~"), "RelayZero", "memory")
MEMORY_MAX_BYTES = 200_000


def _memory_slug(name):
    """Filesystem-safe file stem for a project name (default: 'default')."""
    raw = (name or "").strip() or "default"
    out = []
    for ch in raw:
        out.append(ch if (ch.isalnum() or ch in ("-", "_", ".", " ")) else "_")
    slug = "".join(out).strip(" ._")
    return (slug or "default")[:80]


def _memory_path(name):
    return os.path.join(MEMORY_ROOT, _memory_slug(name) + ".md")


_NO_MEMORY_YET = (
    "No project memory saved yet. Create one with memory_write: "
    '{"name": "<project>", "content": "<the full note>"} - use the VS Code project '
    "folder name (or a short project name) as \"name\"."
)


def memory_read(args):
    """Read (or list) the agent's durable project memory. Never raises."""
    args = args or {}
    name = args.get("name") or args.get("project")
    if not name:
        # No name: list what exists so the model can pick the right one instead
        # of guessing a filename that does not exist.
        if not os.path.isdir(MEMORY_ROOT):
            return _NO_MEMORY_YET
        try:
            files = sorted(f[:-3] for f in os.listdir(MEMORY_ROOT) if f.endswith(".md"))
        except Exception:
            files = []
        if not files:
            return _NO_MEMORY_YET
        return ("Saved project memory: " + ", ".join(files) +
                '\nCall memory_read again with {"name": "<one of those>"}.')
    path = _memory_path(name)
    if not os.path.isfile(path):
        return (f"No memory saved for '{_memory_slug(name)}' yet. You can create it "
                f'with memory_write ({{"name": "{_memory_slug(name)}", "content": '
                '"..."}}) once you have learned something durable about this project.')
    try:
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()
    except Exception as e:
        return f"Could not read memory for '{_memory_slug(name)}': {e}"
    return f"Project memory '{_memory_slug(name)}':\n{content}"


def memory_write(args):
    """Save the project memory file (the model sends the WHOLE note)."""
    args = args or {}
    content = args.get("content")
    if not isinstance(content, str) or not content.strip():
        return 'ERROR: memory_write needs a non-empty "content" string.'
    name = args.get("name") or args.get("project") or "default"
    if len(content.encode("utf-8", "replace")) > MEMORY_MAX_BYTES:
        return (f"ERROR: memory is too large (limit "
                f"{MEMORY_MAX_BYTES // 1000} kB). Keep only durable facts - never "
                f"task logs or whole scripts.")
    path = _memory_path(name)
    try:
        os.makedirs(MEMORY_ROOT, exist_ok=True)
        tmp = path + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            f.write(content)
        os.replace(tmp, path)  # atomic: a crash mid-write never truncates memory
    except Exception as e:
        return f"ERROR: could not write memory for '{_memory_slug(name)}': {e}"
    return (f"Memory for '{_memory_slug(name)}' saved ({len(content)} chars) to "
            f"{path}. It persists across sessions and chats.")


try:
    from sys_tools import SYS_HANDLERS, SYS_TOOL_SPECS, set_vs_execute as _sys_set_vs_execute
except Exception as _sys_imp_err:
    SYS_HANDLERS = {}
    SYS_TOOL_SPECS = []
    _sys_set_vs_execute = None
    print(f"[bridge] system tools disabled (import failed): {_sys_imp_err}", file=sys.stderr)

BUILTIN_HANDLERS = {
    "memory_read": memory_read,
    "memory_write": memory_write,
    **SYS_HANDLERS,
}
# Advertised as its own pseudo-server so list_commands/list_mcp_servers can name
# where these come from (they are not VS Code's).
BUILTIN_SERVER_ID = "zeroscript"

# Advertised exactly like an MCP server's tools so the model finds them through
# list_commands like anything else (see MCPManager.list_tools).
BUILTIN_TOOL_SPECS = [
    {
        "name": "memory_read",
        "description": (
            "Read your persistent project memory: durable notes about THIS VS Code "
            "project (what it is, how scenes/GameObjects/prefabs are organised, "
            "conventions, decisions, user preferences) that you wrote in an earlier "
            "session. Works even when VS Code is closed. Call with no arguments to "
            "list which projects have memory, then call again with \"name\"."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": ("Project name, e.g. the VS Code project folder name. Omit to "
                                    "list the projects that have memory."),
                },
            },
        },
    },
    {
        "name": "memory_write",
        "description": (
            "Save your persistent project memory for THIS project. Send the WHOLE "
            "note: it REPLACES the previous content, so read it with memory_read "
            "first and rewrite it complete. Keep only durable, useful facts - never "
            "task logs, obvious facts or whole scripts. Works even when VS Code is "
            "closed."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Project name, e.g. the VS Code project folder name.",
                },
                "content": {
                    "type": "string",
                    "description": "Full markdown content of the memory file.",
                },
            },
            "required": ["content"],
        },
    },
]

if SYS_TOOL_SPECS:
    BUILTIN_TOOL_SPECS.extend(SYS_TOOL_SPECS)


# ══════════════════════════════════════════════════════════════════════════
#  MANAGER  - aggregates every MCP server, routes by tool name.
# ══════════════════════════════════════════════════════════════════════════
class MCPManager:
    def __init__(self):
        self.clients = {}          # server_id -> MCPClient
        self.index = {}            # advertised_name -> (holder, real_name)
        self.index_lock = threading.Lock()

    def load_config(self):
        servers = _read_config().get("mcpServers", {}) or {}
        for sid, spec in servers.items():
            spec = spec or {}
            mtype = (spec.get("type") or "").lower()
            if mtype in ("http", "sse", "remote") or (spec.get("url") and not spec.get("command")):
                self.clients[sid] = MCPClient(
                    sid, None, None, None,
                    mcp_type="http", url=spec.get("url"),
                    headers=spec.get("headers"))
            else:
                self.clients[sid] = MCPClient(
                    sid, spec.get("command"), spec.get("args"), spec.get("env"))
        log(f"configured {len(self.clients)} MCP server(s): {', '.join(self.clients) or '(none)'}", "cy")

    def start_all(self):
        # Launch every configured server IN PARALLEL, not one after another.
        # client.start() can block for up to ~12s (its own "wait for the MCP
        # server's tools to appear" grace loop) - with a sequential for-loop,
        # having the primary vscode server first in config.json meant every OTHER
        # server (any
        # addon) didn't even begin launching until that grace loop gave up,
        # even though the addon has nothing to do with VS Code and could have
        # been ready in 1-2s. A thread per client removes that dependency
        # entirely: a slow/absent VS Code no longer holds up an addon server
        # the user actually wants right now.
        threads = []
        for sid, client in self.clients.items():
            def _run(sid=sid, client=client):
                try:
                    client.start()
                except Exception as e:
                    log(f"[{sid}] failed to start: {e}  (other servers continue)", "rd")
            t = threading.Thread(target=_run, daemon=True)
            t.start()
            threads.append(t)
        for t in threads:
            t.join()
        self.rebuild_index()

    def rebuild_index(self):
        """Aggregate server tools. Collisions get a 'server/' prefix."""
        with self.index_lock:
            self.index = {}
            for sid, client in self.clients.items():
                for t in (client.tools_cache or []):
                    name = t.get("name")
                    if not name:
                        continue
                    advertised = name if name not in self.index else f"{sid}/{name}"
                    self.index[advertised] = (client, name)

    def list_tools(self, refresh=False):
        if refresh:
            for sid, client in self.clients.items():
                try:
                    if not client.is_alive():
                        client.start()
                    else:
                        client.refresh_tools()
                except Exception as e:
                    log(f"[{sid}] refresh failed: {e}", "yl")
            self.rebuild_index()
        out = []
        for sid, client in self.clients.items():
            for t in (client.tools_cache or []):
                name = t.get("name")
                advertised = name
                with self.index_lock:
                    # find the advertised key that maps to this (client, name)
                    for k, (holder, real) in self.index.items():
                        if holder is client and real == name:
                            advertised = k
                            break
                tt = dict(t)
                tt["name"] = advertised
                tt["server"] = sid
                out.append(tt)
        # Built-in tools are advertised alongside the MCP servers' own, so the
        # model discovers them through the normal command list.
        for spec in BUILTIN_TOOL_SPECS:
            tt = dict(spec)
            tt["server"] = BUILTIN_SERVER_ID
            out.append(tt)
        return out

    def call(self, name, arguments, timeout):
        # Built-in tools are served by the bridge itself - they must be checked
        # BEFORE the MCP index (they belong to no MCP server) and they keep
        # working with VS Code closed.
        bare = name.split("/", 1)[1] if name.startswith(BUILTIN_SERVER_ID + "/") else name
        if bare in BUILTIN_HANDLERS:
            try:
                text = BUILTIN_HANDLERS[bare](arguments or {})
            except Exception as e:
                return {"text": f"ERROR: {bare} failed: {e}", "images": []}
            return {"text": text, "images": []}
        with self.index_lock:
            entry = self.index.get(name)
        if entry is None:
            # Maybe a freshly added tool - rebuild once and retry.
            self.rebuild_index()
            with self.index_lock:
                entry = self.index.get(name)
        if entry is None:
            raise RuntimeError(f"unknown tool '{name}'")
        holder, real_name = entry
        return holder.call_tool(real_name, arguments, timeout)

    def restart(self, server_id=None):
        targets = [self.clients[server_id]] if server_id and server_id in self.clients else list(self.clients.values())
        for client in targets:
            try:
                client.restart()
            except Exception as e:
                log(f"[{client.id}] restart failed: {e}", "rd")
        self.rebuild_index()

    def health(self):
        return [{"id": sid, "alive": c.is_alive(), "tools": len(c.tools_cache)}
                for sid, c in self.clients.items()]

    def any_alive(self):
        return any(c.is_alive() for c in self.clients.values())


# ══════════════════════════════════════════════════════════════════════════
#  WEBSOCKET SERVER
# ══════════════════════════════════════════════════════════════════════════
mgr = MCPManager()
clients = set()


def _sys_vs_execute(tool, arguments=None):
    result = mgr.call(tool, arguments or {}, 30)
    return result.get("text") if isinstance(result, dict) else str(result)


if _sys_set_vs_execute is not None:
    try:
        _sys_set_vs_execute(_sys_vs_execute)
    except Exception as e:
        log(f"sys_tools VS callback not wired: {e}", "yl")

# ── VS Code connectivity probe ────────────────────────────────────────────
# list_workspaces is side-effect free and only answers when the nabheet
# extension's HTTP server is up (and a window is registered).
VS_PROBE_TOOL = "list_workspaces"
VS_PROBE_ARGS = {}


def _probe_tool_text(tool, probe_args=None):
    """Side-effect-free probe. Returns text, None if unavailable/busy, or ""
    on JSON-RPC / isError (treated as not connected)."""
    with mgr.index_lock:
        entry = mgr.index.get(tool)
    if entry is None:
        return None
    holder, real_name = entry
    if not holder.call_lock.acquire(blocking=False):
        return None
    try:
        if not holder.is_alive():
            return None
        args = dict(probe_args) if probe_args else {}
        msg = holder._request("tools/call", {"name": real_name, "arguments": args}, timeout=8)
        if not msg:
            return None
        if msg.get("error"):
            return "" if probe_args is not None else None
        content = msg.get("result", {}).get("content", [])
        if msg.get("result", {}).get("isError"):
            return ""
        return "\n".join(it.get("text", "") for it in content if it.get("type") == "text")
    except Exception:
        return None
    finally:
        holder.call_lock.release()


def probe_vs():
    """VS Code MCP reachability -> {"app": True|False|None, "scene": same}."""
    client = mgr.clients.get(PRIMARY_SERVER_ID)
    if client is not None and client.mcp_type == "http" and not client.is_alive():
        return {"app": False, "scene": False}
    if client is not None and client.is_alive() and not client.tools_cache:
        return {"app": False, "scene": False}
    text = _probe_tool_text(VS_PROBE_TOOL, VS_PROBE_ARGS)
    if text is None:
        return {"app": None, "scene": None}
    low = (text or "").strip().lower()
    if (
        not low
        or "visual studio is not running" in low
        or "vs is not running" in low
        or "vs code is not running" in low
        or "vscode is not running" in low
        or "could not connect" in low
        or "no visual studio" in low
        or "not connected" in low
        or "offline" in low
        or '"success":false' in low
        or '"success": false' in low
        or low.startswith("error")
    ):
        return {"app": False, "scene": False}
    return {"app": True, "scene": True}


probe_vs = probe_vs


def safe_call(name, arguments, timeout):
    """Never raises. Always returns a dict the extension can feed back to DeepSeek."""
    try:
        result = mgr.call(name, arguments, timeout)
        return {"ok": True, "text": result["text"], "images": result["images"]}
    except TimeoutError as e:
        return {"ok": False, "error": str(e), "kind": "timeout"}
    except Exception as e:
        return {"ok": False, "error": str(e), "kind": type(e).__name__}


async def run_tool_task(ws, name, args, timeout, rid):
    """Execute one tool off the socket read loop and send its result back.

    Kept as a standalone task (not awaited inline in handler) so a long tool
    never starves the connection's ability to answer app-level pings - see the
    call_tool branch in handler() for the full rationale."""
    t0 = time.monotonic()
    res = await asyncio.to_thread(safe_call, name, args, timeout)
    elapsed = time.monotonic() - t0
    tag = "gr" if res.get("ok") else "rd"
    summary = (res.get("text") or res.get("error") or "")[:80].replace("\n", " ")
    slow = "  [SLOW]" if elapsed > 5 else ""
    # Routine per-call traces are technical noise for a non-dev user watching
    # the console; they still land in bridge_debug.log. A failed/slow call
    # DOES surface on the terminal - that's the signal a user should notice.
    log(f"<- {name} ({elapsed:.1f}s){slow}: {summary}", tag, terminal=not res.get("ok") or elapsed > 5)
    try:
        await ws.send(json.dumps({"type": "tool_result", "id": rid, **res}))
    except websockets.ConnectionClosed:
        pass


async def broadcast_status():
    """Push a fresh status snapshot to every currently-connected extension tab.

    Needed because the socket now starts listening (see _boot_and_diagnose in
    main()) before every MCP server has necessarily finished launching in the
    background - an extension that connects in that window gets an early,
    incomplete "connected" snapshot (e.g. an addon server not started yet).
    The extension's own periodic poll only reads a passively cached copy of
    the LAST message it received (background.js never re-probes on its own),
    so without a follow-up push that stale snapshot can persist forever (seen
    live 2026-07-11: an addon server not yet alive at connect-time froze the
    "Start" button in its fully-disabled, non-degraded state even long after it
    was actually up). background.js already handles a second
    "connected" message arriving at any time (updates its cache and re-renders
    the bar), so re-sending this exact shape once startup truly settles is
    enough to self-correct with zero extension-side changes needed.
    """
    if not clients:
        return
    try:
        _st = await asyncio.to_thread(probe_vs)
        _proc = await asyncio.to_thread(_vs_app_running)
        payload = json.dumps({
            "type": "connected",
            "mcp_alive": mgr.any_alive(),
            # Whether the VS MCP extension is reachable, i.e. commands can actually run.
            "vs": _st["app"],
            # Whether a VS Code WINDOW process exists at all - lets the
            # extension word the corrective step correctly ("start the MCP for
            # VS Code server in your already-open VS Code" vs "open VS Code").
            "vs_proc": _proc,
            "servers": mgr.health(),
            "tools": mgr.list_tools(),
            "port": PORT,
        })
    except Exception:
        return
    for ws in list(clients):
        try:
            await ws.send(payload)
        except Exception:
            pass


async def handler(ws):
    peer = getattr(ws, "remote_address", ("?",))[0]
    clients.add(ws)
    log(f"extension connected  ({peer})  [{len(clients)} client(s)]", "gr")
    try:
        _st = await asyncio.to_thread(probe_vs)
        await ws.send(json.dumps({
            "type": "connected",
            "mcp_alive": mgr.any_alive(),
            "vs": _st["app"],
            "vs_proc": await asyncio.to_thread(_vs_app_running),
            "servers": mgr.health(),
            "tools": mgr.list_tools(),
            "port": PORT,
        }))
        async for raw in ws:
            try:
                msg = json.loads(raw)
            except Exception:
                continue
            mtype = msg.get("type")
            rid = msg.get("id")

            if mtype == "ping":
                await ws.send(json.dumps({"type": "pong", "id": rid}))

            elif mtype == "vs_status":
                st = await asyncio.to_thread(probe_vs)
                await ws.send(json.dumps({
                    "type": "vs_status", "id": rid,
                    "vs": st["app"],
                    "vs_proc": await asyncio.to_thread(_vs_app_running),
                    "mcp_alive": mgr.any_alive(),
                }))

            elif mtype == "list_tools":
                try:
                    tools = await asyncio.to_thread(mgr.list_tools, True)
                except Exception as e:
                    tools = mgr.list_tools()
                    log(f"list_tools error: {e}", "yl")
                _st = await asyncio.to_thread(probe_vs)
                await ws.send(json.dumps({
                    "type": "tools", "id": rid,
                    "tools": tools, "mcp_alive": mgr.any_alive(),
                    "vs": _st["app"],
                    "vs_proc": await asyncio.to_thread(_vs_app_running),
                    "servers": mgr.health(),
                }))

            elif mtype == "call_tool":
                name = msg.get("name", "")
                args = msg.get("arguments") or {}
                timeout = float(msg.get("timeout", 120000)) / 1000.0
                log(f"-> tool  {name}({', '.join(args.keys())})", "cy", terminal=False)
                # Run the tool as a BACKGROUND task instead of awaiting it here.
                # Awaiting inline parks this read loop for the WHOLE tool call, so
                # a long tool (e.g. wait_job_finished > 25s) means the client's
                # app-level pings are never read/answered - its half-open-socket
                # watchdog then force-closes the connection and the in-flight call
                # is dropped as "bridge unreachable" (reported live). As a task,
                # the loop stays free to answer pings/status while the tool runs.
                # The extension only ever has ONE call_tool in flight (its agent
                # loop awaits each result before sending the next), so this never
                # overlaps tool executions.
                asyncio.create_task(run_tool_task(ws, name, args, timeout, rid))

            elif mtype in ("add_server", "remove_server"):
                # Adding/removing an addon MCP server rewrites config.json, which
                # the bridge only reads at launch - so we ack, then restart the
                # whole process to pick it up cleanly. The primary VS Code server
                # is protected inside config_add/remove_server.
                if mtype == "add_server":
                    ok, err = await asyncio.to_thread(
                        config_add_server,
                        msg.get("server_id"), msg.get("command"),
                        msg.get("args"), msg.get("env"),
                        msg.get("mcp_type"), msg.get("url"), msg.get("headers"))
                else:
                    ok, err = await asyncio.to_thread(
                        config_remove_server, msg.get("server_id"))
                await ws.send(json.dumps({
                    "type": "server_changed", "id": rid,
                    "ok": ok, "error": err, "restarting": ok,
                }))
                if ok:
                    # Give the ack a beat to flush over the socket, then restart.
                    async def _do_restart():
                        await asyncio.sleep(0.4)
                        restart_self()
                    asyncio.create_task(_do_restart())

            elif mtype == "restart_mcp":
                sid = msg.get("server")
                try:
                    await asyncio.to_thread(mgr.restart, sid)
                    ok, err = True, None
                except Exception as e:
                    ok, err = False, str(e)
                await ws.send(json.dumps({
                    "type": "mcp_status", "id": rid,
                    "alive": mgr.any_alive(), "ok": ok, "error": err,
                    "servers": mgr.health(), "tools": mgr.list_tools(),
                }))

            else:
                await ws.send(json.dumps({
                    "type": "error", "id": rid,
                    "error": f"unknown message type: {mtype}",
                }))
    except websockets.ConnectionClosed:
        pass
    except Exception as e:
        log(f"handler error: {e}", "rd")
    finally:
        clients.discard(ws)
        log(f"extension disconnected  [{len(clients)} client(s)]", "yl")


async def server_watch():
    """Poll every MCP server and restart any that died unexpectedly (e.g. the
    VS MCP server process being killed by something else - see stop()'s
    taskkill /T fix and the stderr logging above for why this used to happen
    silently). Without this, a dead server only got noticed on the NEXT real
    tool call, which is what made "the bridge looks connected but nothing
    responds" possible."""
    # Crash-LOOP detection thresholds: LOOP_N deaths within LOOP_WINDOW seconds
    # means something is killing (or instantly crashing) the server every time
    # we bring it back - the silent restart cycle the auto-restart otherwise
    # hides completely. We still keep restarting (the cause may be transient,
    # e.g. the user is about to start VS Code), but the terminal now NAMES the
    # problem: exit code, the child's last stderr lines, and - for a port-bound
    # server - who is squatting the port. Banner re-prints at most every
    # LOOP_WARN_COOLDOWN so the terminal stays readable.
    LOOP_N = 3
    LOOP_WINDOW = 60
    LOOP_WARN_COOLDOWN = 120
    while True:
        await asyncio.sleep(5)
        for sid, client in list(mgr.clients.items()):
            try:
                if not client.is_alive():
                    now = time.time()
                    # restart_times holds RESTART ATTEMPTS (appended just before
                    # each start below), never per-poll sightings - appending on
                    # every 5s poll would keep the window full forever and the
                    # "slow down" branch would then block restarts permanently.
                    client.restart_times = [t for t in client.restart_times if now - t < LOOP_WINDOW]
                    looping = len(client.restart_times) >= LOOP_N
                    if looping and now - client.loop_warned_at > LOOP_WARN_COOLDOWN:
                        client.loop_warned_at = now
                        log(f"[{sid}] CRASH LOOP: died {len(client.restart_times)} times in the last "
                            f"{LOOP_WINDOW}s (last exit code: {client.last_exit}). Something is killing it "
                            f"or it cannot start.", "rd")
                        if client.stderr_tail:
                            log(f"[{sid}] last error output (usually the real reason):", "rd")
                            for ln in client.stderr_tail:
                                log(f"[{sid}]   {ln}", "yl")
                        else:
                            log(f"[{sid}] the server printed no error output before dying.", "yl")
                        # Port forensics for the primary server: VS uses dynamic port files;
                        # no fixed HTTP port to squatter-check here.
                        if sid == PRIMARY_SERVER_ID:
                            try:
                                base = _vs_scan.find_mcp_base() if _vs_scan else None
                                if not base:
                                    log(f"[{sid}] HTTP endpoint 127.0.0.1:9876-9880 not answering "
                                        f"(VS Code closed or the MCP extension is not running).", "rd")
                            except Exception:
                                pass
                        log(f"[{sid}] common causes: VS Code is not running (or nabheet.vscode-ide-mcp "
                            f"is missing), run 'launch_vscode_mcp.py --check', "
                            f"an antivirus blocking localhost, or a bad url in config.json. "
                            f"Auto-restart continues in the background.", "yl")
                    if looping and client.restart_times and now - client.restart_times[-1] < 15:
                        # Clearly hopeless right now: drop to a ~15s cadence so a
                        # broken command isn't hammer-spawned every 5 seconds,
                        # while still retrying forever (the cause may clear, e.g.
                        # the user finally opens VS Code).
                        continue
                    client.restart_times.append(now)
                    log(f"[{sid}] found dead - auto-restarting...", "yl")
                    await asyncio.to_thread(client.start)
                    mgr.rebuild_index()
                    await broadcast_status()  # tell any connected extension right away
            except Exception as e:
                log(f"[{sid}] auto-restart failed: {e}", "rd")


def _current_vs_state():
    """(code_running, endpoint_up) snapshot used only to notice VS Code going
    away/up mid-session so the terminal can name the real recovery step."""
    if _vs_scan is None:
        return (None, 0)
    try:
        running = _vs_scan.code_running()
        up = 1 if _vs_scan.find_mcp_base() else 0
        return (running, up)
    except Exception:
        return (None, 0)


async def vs_watch(initial_app):
    """Poll VS Code attachment and log transitions, so the terminal confirms in
    GREEN the moment the VS MCP extension answers (e.g. right after the user
    starts the server in Window > VS MCP Server) and warns again if it later
    drops. Best-effort.

    Also auto-recovers from a real disconnect: the MCP server child stays alive
    (its stdio side never dies, so server_watch's dead-process restart never
    fires) while its VS Code bridge is gone - VS Code was closed and reopened, or
    the plugin's server was stopped and restarted, so the session the child
    holds belongs to the previous instance. A fresh child simply re-connects on
    its next call, so once a drop looks real (sustained, not a momentary blip)
    we restart it ourselves instead of leaving the user to notice that every
    command fails."""
    prev_app = initial_app
    disconnected_since = None
    last_auto_restart = 0.0
    known_vs_state = await asyncio.to_thread(_current_vs_state)
    update_suspected = False
    # Only auto-restart a disconnect that follows a real connection - never
    # spam-restart while VS Code simply isn't open yet (prev_app starting
    # False/None is the common cold-start case and restarting there would just
    # be noise every cooldown).
    ever_connected = initial_app is True
    while True:
        await asyncio.sleep(4)
        # If the MCP server launched while VS Code was unreachable, its catalogue
        # may still be full (StdioProxy advertises cached tools) - but the
        # probe tool below is what actually talks to VS Code. Re-ask for tools
        # while empty just in case the extension finished registering late.
        rc0 = mgr.clients.get(PRIMARY_SERVER_ID)
        if rc0 is not None and rc0.is_alive() and not rc0.tools_cache:
            try:
                if await asyncio.to_thread(rc0.refresh_tools, 3):
                    mgr.rebuild_index()
                    log(f"VS Code's tools appeared ({len(rc0.tools_cache)}) - VS Code attached.", "gr")
            except Exception:
                pass
        try:
            st = await asyncio.to_thread(probe_vs)
        except Exception:
            continue
        app = st["app"]
        if app is not None and app != prev_app:
            if app is True:
                # Primary-server-only count, not mgr.list_tools() (which sums
                # every configured server) - this message is specifically about
                # VS Code attaching, so it must not borrow addon tool counts
                # (same class of bug as the startup banner, see vs_total).
                rc = mgr.clients.get(PRIMARY_SERVER_ID)
                vs_now = len(rc.tools_cache) if rc else 0
                log(f"VS Code connected - {vs_now} tools ready.", "gr")
                ever_connected = True
                disconnected_since = None
                update_suspected = False
            else:
                cur_state = await asyncio.to_thread(_current_vs_state)
                if known_vs_state and known_vs_state != cur_state and known_vs_state[0] is True and cur_state[0] is False:
                    log("VS Code process disappeared - Code.exe is gone. "
                        "Reopen VS Code; the MCP extension starts with it.", "yl")
                    update_suspected = True
                else:
                    log("VS Code MCP is not reachable - open VS Code with the "
                        "nabheet.vscode-ide-mcp extension (Ctrl+Shift+X).", "yl")
                    update_suspected = False
                known_vs_state = cur_state or known_vs_state
                if ever_connected and disconnected_since is None:
                    disconnected_since = time.time()
            prev_app = app
            # vs_watch only used to LOG transitions - an extension sitting
            # on the pre-start standby screen (no tool calls happening, so
            # nothing else round-trips to the bridge) never saw VS Code connect
            # or disconnect mid-session until it happened to poll for an
            # unrelated reason. Push it immediately instead of leaving that
            # extension staring at a stale snapshot indefinitely.
            await broadcast_status()
        # `now` is set once per iteration, before BOTH the drop-recovery branch
        # below and the timestamp comparisons in it use it.
        now = time.time()
        if app is False and ever_connected and disconnected_since is not None and not update_suspected:
            # ~20s sustained (5 polls) before treating it as a real drop, not a
            # momentary blip; 90s cooldown between recovery attempts so a VS Code
            # that is genuinely closed for a while doesn't get hammered. Skipped
            # entirely when a version bump was the likely cause (see above) -
            # restarting our child cannot enable a plugin in a fresh install, so
            # retrying would just be noise every 90s.
            if now - disconnected_since > 20 and now - last_auto_restart > 90:
                last_auto_restart = now
                # Restarting the MCP server child is always safe: it keeps no
                # state of its own (it opens a bridge to the plugin and forwards
                # JSON both ways), so a fresh instance simply connects again.
                # That is the VS Code-side equivalent of the user stopping and
                # starting the plugin's server, which is what clears a stale
                # session after VS Code was closed and reopened.
                log("VS Code MCP has been unreachable for a while - reconnecting the HTTP client.", "yl")
                try:
                    await asyncio.to_thread(mgr.restart, PRIMARY_SERVER_ID)
                    await broadcast_status()
                except Exception as e:
                    log(f"auto-restart of the VS Code MCP client failed: {e}", "rd")
        # NOTE: the Roblox build also watched "place churn" here - a place being
        # closed/reopened over and over while the app stayed attached, caused by
        # a stuck StudioMCP proxy. VS Code has no equivalent sub-state (one
        # active scene always exists when the editor answers), so there is
        # nothing to watch beyond `app` above.


async def _supervised(name, coro_factory):
    """Run a watcher coroutine forever, restarting it if it ever raises.

    Both watchers are designed to never raise, but one line proved that wrong
    in practice (an UnboundLocalError killed vs_watch SILENTLY - asyncio
    only prints 'Task exception was never retrieved' at shutdown, so all
    VS Code monitoring and status broadcasts just stopped until the user
    restarted the bridge). A crash in a watcher must never be silent or
    permanent: log it loudly, wait a beat, start a fresh instance.
    """
    while True:
        try:
            await coro_factory()
            return  # normal completion (doesn't happen today, but respect it)
        except Exception as e:
            log(f"{name} crashed: {type(e).__name__}: {e} - restarting it in 5s "
                f"(please report this).", "rd")
            await asyncio.sleep(5)


async def main():
    print(f"\n{C['cy']}  RelayZero Bridge v{BRIDGE_VERSION}{C['reset']}  {C['dim']} - VS Code - ws://{HOST}:{PORT}{C['reset']}\n")
    log(f"===== BRIDGE START  v{BRIDGE_VERSION}  pid={os.getpid()}  log={LOG_PATH} =====", "cy")
    await asyncio.to_thread(_kill_orphan_vs_mcp)
    killed_squatter = await asyncio.to_thread(check_vs_ports)
    mgr.load_config()

    async def _boot_and_diagnose():
        """Launch every configured MCP server and print the boot diagnostic
        banner. Runs as a background task AFTER the socket below is already
        listening, so a slow or absent VS Code never delays the extension's
        ability to connect and use OTHER MCP servers right away - only the
        terminal banner and VS Code's own auto-recovery loop wait on this.
        (mgr.start_all() itself also launches every server in parallel now,
        for the same reason.)"""
        try:
            await asyncio.to_thread(mgr.start_all)
        except Exception as e:
            log(f"server startup error: {e}", "rd")
            log("The bridge will keep running; it retries on the first tool call.", "yl")
        total = len(mgr.list_tools())
        # Primary-server-only count for the corrective message below:
        # list_tools() sums every configured server AND the built-in tools, so
        # printing `total` there would falsely blame addon tools on "VS Code is
        # not connected".
        vs_client = mgr.clients.get(PRIMARY_SERVER_ID)
        vs_total = len(vs_client.tools_cache) if vs_client else 0

        # A tool count alone only proves the MCP server PROCESS is up: its
        # catalogue is served by that process, which reaches VS Code over a
        # bridge, so it advertises the full tool set whether or not VS Code is
        # running. The authoritative "VS Code is actually reachable" signal is
        # the list_workspaces probe. So we probe FIRST and only show
        # the green "ready" line when the plugin really answered; otherwise we
        # show just the corrective step (no misleading green success).
        _st = await asyncio.to_thread(probe_vs)
        # Even when VS Code was ALREADY open with its MCP HTTP endpoint running before
        # the bridge started, the freshly-launched MCP server child needs a moment
        # to start and connect - so an instant probe right after launch often
        # reads app=False for a beat before flipping True a few seconds later
        # (vs_watch would catch it, but only after printing a scary yellow
        # "not connected" block first). Give it the same grace period the tools
        # probe already gets before deciding it is a real problem.
        if _st["app"] is False:
            with _Spinner("    waiting for VS Code to attach..."):
                for _ in range(8):
                    await asyncio.sleep(1)
                    _st = await asyncio.to_thread(probe_vs)
                    if _st["app"] is not False:
                        break
        # Confirm before trusting a positive reading: the banner must never
        # announce a connection that is not really there.
        if _st["app"] is True:
            await asyncio.sleep(1.5)
            confirm = await asyncio.to_thread(probe_vs)
            if confirm["app"] is not True:
                _st = confirm
        if vs_client is not None and (vs_total == 0 or _st["app"] is False):
            log("    -------------------------------------------------------------", "yl")
            if vs_total == 0:
                log("    0 VS Code tools loaded - the MCP HTTP endpoint is not up.", "yl")
                log("    Check the install:  python launch_vscode_mcp.py --check", "yl")
                log("    (needs nabheet.vscode-ide-mcp + VS Code open on a workspace)", "yl")
            else:
                log(f"    {vs_total} VS Code tools loaded, but the endpoint is not reachable yet.", "yl")
                log("    (A freshly started extension needs a moment - watch", "yl")
                log("    for a green 'VS Code connected' line right after this.)", "yl")
            if killed_squatter:
                log("    Another process was holding the MCP HTTP port (logged above).", "yl")
            else:
                log("    In VS Code: install/enable nabheet.vscode-ide-mcp", "yl")
                log("    (Ctrl+Shift+X -> search 'MCP Server'), then", "yl")
                log("    run Developer: Reload Window.", "yl")
            log("    The extension's status dot turns green once VS Code answers.", "yl")
            log("    -------------------------------------------------------------", "yl")
        elif _st["app"] is True:
            log(f"ready {total} tools available - VS Code connected", "gr")
        else:
            log(f"ready {total} tools available ({len(mgr.clients)} MCP server(s))", "gr")
        asyncio.create_task(_supervised(
            "vs_watch", lambda: vs_watch(_st["app"])))

    async def _early_status_pushes():
        """A few follow-up status broadcasts shortly after boot.

        So a single
        broadcast placed after start_all() would be just as slow as the old
        blocking behavior for the exact case this is meant to fix: an addon
        server that is ready in 1-13s while the primary server is still
        slowly timing out. Poll-and-broadcast a few times instead, cheaply,
        so any extension that connected during that window self-corrects
        quickly instead of staying stuck on its first, incomplete snapshot.
        """
        for interval in (2, 2, 4, 6, 6):  # cumulative: 2s, 4s, 8s, 14s, 20s after boot
            await asyncio.sleep(interval)
            await broadcast_status()

    async with websockets.serve(handler, HOST, PORT, origins=[ALLOWED_EXTENSION_ORIGIN], ping_interval=20, ping_timeout=20, max_size=16 * 1024 * 1024):
        log(f"listening on ws://{HOST}:{PORT}  - load the extension and open a supported AI chat", "cy")
        asyncio.create_task(_supervised("server_watch", server_watch))
        asyncio.create_task(_boot_and_diagnose())
        asyncio.create_task(_early_status_pushes())
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        log("shutting down...", "yl")
        for c in mgr.clients.values():
            c.stop()
    except OSError as e:
        # Port already taken: usually ANOTHER RelayZero bridge (e.g. a dev
        # one, or a previous app instance) is already listening on PORT. The
        # app reuses the running bridge, so this second one exiting is
        # harmless - but with pythonw it used to die SILENTLY (no console),
        # which looked like the bridge "closing for no reason". Name it.
        log(f"Could not start the bridge: {e}", "rd")
        log(f"Port {PORT} is probably already in use by another RelayZero "
            f"bridge - the app reuses the running one, so this is harmless.", "yl")
    finally:
        log("===== BRIDGE STOP =====", "cy")


