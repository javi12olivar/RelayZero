# SPDX-License-Identifier: GPL-3.0-or-later
# launch_vscode_mcp.py
# ──────────────────────────────────────────────────────────────────────────
#  Diagnostics for the RelayZero VS Code port.
#
#  The primary MCP server is the "MCP Server for VS Code" extension
#  (nabheet.vscode-ide-mcp - THIRD PARTY). It exposes Streamable HTTP at
#  http://127.0.0.1:9876/mcp and a /health probe. The bridge connects over
#  HTTP (config.json type "http") - no stdio proxy process is spawned here.
#
#  Helper modes (used by start.bat and by hand):
#    python launch_vscode_mcp.py --check   diagnose install + endpoint
#    python launch_vscode_mcp.py --setup   print install steps
# ──────────────────────────────────────────────────────────────────────────
import json
import os
import shutil
import subprocess
import sys
import urllib.error
import urllib.request

EXT_ID = "nabheet.vscode-ide-mcp"
MARKETPLACE_URL = (
    "https://marketplace.visualstudio.com/items?itemName=" + EXT_ID
)
DEFAULT_BASE = "http://127.0.0.1:9876"
DEFAULT_MCP_URL = DEFAULT_BASE + "/mcp"
PORT_SCAN = range(9876, 9881)


def find_code_exe():
    """Absolute path of Code.exe, or None."""
    candidates = [
        os.path.expandvars(r"%LOCALAPPDATA%\Programs\Microsoft VS Code\Code.exe"),
        os.path.expandvars(r"%ProgramFiles%\Microsoft VS Code\Code.exe"),
        os.path.expandvars(r"%ProgramFiles(x86)%\Microsoft VS Code\Code.exe"),
    ]
    for path in candidates:
        if path and os.path.isfile(path):
            return path
    which = shutil.which("code") or shutil.which("code.cmd")
    if which:
        return which
    return None


def code_running():
    """True/False whether Code.exe exists, or None if undeterminable."""
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


def extension_installed():
    """True if nabheet.vscode-ide-mcp appears under ~/.vscode/extensions."""
    root = os.path.expandvars(r"%USERPROFILE%\.vscode\extensions")
    if not os.path.isdir(root):
        return False
    prefix = EXT_ID + "-"
    try:
        for name in os.listdir(root):
            if name.startswith(prefix) or name.startswith(EXT_ID + "."):
                return True
    except OSError:
        return False
    return False


def health_url(base):
    return base.rstrip("/") + "/health"


def probe_health(base, timeout=2.0):
    """GET <base>/health -> dict | None."""
    try:
        req = urllib.request.Request(health_url(base), method="GET")
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read().decode("utf-8", errors="replace")
        try:
            data = json.loads(body)
            return data if isinstance(data, dict) else {"raw": body}
        except Exception:
            return {"raw": body}
    except Exception:
        return None


def find_mcp_base():
    """First base URL whose /health answers, or None. Defaults to 9876."""
    hit = probe_health(DEFAULT_BASE)
    if hit is not None:
        return DEFAULT_BASE
    for port in PORT_SCAN:
        base = f"http://127.0.0.1:{port}"
        if port == 9876:
            continue
        if probe_health(base) is not None:
            return base
    return None


def mcp_request(url, payload, timeout=8.0):
    """POST JSON-RPC to Streamable HTTP /mcp. Returns parsed JSON or None."""
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json, text/event-stream",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError:
        return None
    except Exception:
        return None
    body = body.strip()
    if not body:
        return None
    if body.startswith("event:") or "\ndata:" in body or body.startswith("data:"):
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


def install_extension(code_exe=None):
    """Try `code --install-extension nabheet.vscode-ide-mcp`. Returns (ok, out)."""
    code_exe = code_exe or find_code_exe()
    if not code_exe:
        return False, "code CLI / Code.exe not found"
    cmd = [code_exe, "--install-extension", EXT_ID]
    if code_exe.lower().endswith(".cmd"):
        cmd = ["cmd", "/c"] + cmd
    try:
        proc = subprocess.run(
            cmd, capture_output=True, text=True, encoding="utf-8",
            errors="replace", timeout=180,
        )
        out = (proc.stdout or "") + (proc.stderr or "")
        return proc.returncode == 0, out.strip()
    except Exception as ex:
        return False, str(ex)


MANUAL_HELP = (
    "launch_vscode_mcp: VS Code MCP endpoint is not up.\n"
    "  1. Install the extension:\n"
    f"       {MARKETPLACE_URL}\n"
    "     or:  code --install-extension " + EXT_ID + "\n"
    "  2. Reload the VS Code window (Developer: Reload Window).\n"
    "  3. Leave VS Code open - the extension listens on 127.0.0.1:9876.\n"
    "  Verify with:  python launch_vscode_mcp.py --check\n"
)


def run_helper(argv):
    """--check / --setup / --install. Returns exit code (-1 = not a helper)."""
    if "--install" in argv:
        ok, out = install_extension()
        print(out or "(no output)")
        print("extension install:", "OK" if ok else "FAILED")
        return 0 if ok else 1
    if "--check" in argv:
        code = find_code_exe()
        running = code_running()
        has_ext = extension_installed()
        base = find_mcp_base()
        health = probe_health(base) if base else None
        tools_note = ""
        if base:
            msg = mcp_request(
                base.rstrip("/") + "/mcp",
                {"jsonrpc": "2.0", "id": 1, "method": "initialize",
                 "params": {"protocolVersion": "2024-11-05", "capabilities": {},
                            "clientInfo": {"name": "relayzero-check", "version": "1.0"}}},
                timeout=4.0,
            )
            tools_note = "JSON-RPC initialize: OK" if msg else "JSON-RPC initialize: no response"
        print("VS Code MCP launcher check")
        print(f"  Code.exe     : {code or 'NOT FOUND'}")
        print(f"  running      : {'yes' if running else ('NO' if running is False else 'unknown')}")
        print(f"  extension    : {'installed' if has_ext else 'NOT INSTALLED'} ({EXT_ID})")
        print(f"  health       : {'up on ' + base if health is not None else 'NOT RESPONDING (ports 9876-9880)'}")
        if tools_note:
            print(f"  mcp          : {tools_note}")
        if health is not None:
            print("  server       : HTTP streamable (nabheet.vscode-ide-mcp)")
            return 0
        if not has_ext:
            sys.stderr.write(MANUAL_HELP)
            return 1
        sys.stderr.write(
            "Extension is installed but the endpoint is down.\n"
            "Open VS Code and run: Developer: Reload Window\n"
            "Then re-check:  python launch_vscode_mcp.py --check\n"
        )
        return 1
    if "--setup" in argv:
        print("RelayZero VS Code - manual setup:")
        print("  1. Install VS Code: https://code.visualstudio.com/")
        print(f"  2. Install the MCP extension: {MARKETPLACE_URL}")
        print(f"       or:  code --install-extension {EXT_ID}")
        print("  3. Reload the VS Code window and leave it open.")
        print("  4. Run start.bat (or python bridge.py).")
        print(f"  Verify:  python {os.path.basename(__file__)} --check")
        print(f"  Endpoint: {DEFAULT_MCP_URL} (ports 9876-9880 if busy)")
        return 0
    return -1


def main():
    code = run_helper(sys.argv[1:])
    if code >= 0:
        return code
    print(
        "This port talks HTTP to the VS Code extension - no stdio child to launch.\n"
        "Primary config lives in config.json (type http).\n"
        "Use --check / --setup for diagnostics.",
        file=sys.stderr,
    )
    return 1


if __name__ == "__main__":
    sys.exit(main())


