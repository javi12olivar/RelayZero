# SPDX-License-Identifier: GPL-3.0-or-later
import ctypes
import json
import os
import re
import shutil
import socket
import subprocess
import tarfile
import threading
import time
import urllib.request
import uuid
import zipfile

MAX_OUTPUT = 120_000
DEFAULT_TIMEOUT = 60
DOWNLOAD_MAX = 80 * 1024 * 1024
CONFIRM_KEY = "confirm"

_VS_EXECUTE = None
_SESSIONS = {}
_SESSIONS_LOCK = threading.Lock()


def set_vs_execute(fn):
    global _VS_EXECUTE
    _VS_EXECUTE = fn


def _clip(text, limit=MAX_OUTPUT):
    if text is None:
        return ""
    if not isinstance(text, str):
        text = str(text)
    if len(text) <= limit:
        return text
    return text[: limit - 80] + f"\n... [truncated, {len(text)} chars total]"


def _err(msg):
    return f"ERROR: {msg}"


def _ok(msg):
    return msg


def _as_bool(val):
    if isinstance(val, bool):
        return val
    if isinstance(val, str):
        return val.strip().lower() in ("1", "true", "yes", "y", "on")
    return bool(val)


def _run(cmd, timeout=DEFAULT_TIMEOUT, cwd=None, shell=False, env=None):
    if isinstance(cmd, str):
        display = cmd
        use_shell = True if shell or os.name != "nt" else shell
    else:
        display = " ".join(str(c) for c in cmd)
        use_shell = shell
    try:
        proc = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            errors="replace",
            timeout=timeout,
            cwd=cwd,
            shell=use_shell,
            env=env,
        )
    except subprocess.TimeoutExpired as e:
        out = e.stdout or ""
        err = e.stderr or ""
        if isinstance(out, bytes):
            out = out.decode("utf-8", "replace")
        if isinstance(err, bytes):
            err = err.decode("utf-8", "replace")
        return -1, _clip(out), _clip(f"timeout after {timeout}s\n{err}"), display
    except FileNotFoundError as e:
        return 127, "", _clip(str(e)), display
    except Exception as e:
        return 1, "", _clip(str(e)), display
    return proc.returncode, _clip(proc.stdout or ""), _clip(proc.stderr or ""), display


def _ps(script, timeout=DEFAULT_TIMEOUT):
    return _run(
        ["powershell", "-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-Command", script],
        timeout=timeout,
    )


def _format_run(rc, out, err, display, cwd=None):
    parts = [f"$ {display}"]
    if cwd:
        parts.append(f"(cwd: {cwd})")
    parts.append(f"exit code: {rc}")
    if out:
        parts.append("--- stdout ---\n" + out)
    if err:
        parts.append("--- stderr ---\n" + err)
    if not out and not err:
        parts.append("(no output)")
    return "\n".join(parts)


def _need_path(args, key="path"):
    path = (args or {}).get(key)
    if not path or not isinstance(path, str) or not path.strip():
        return None, _err(f'"{key}" is required (non-empty string path).')
    return path.strip().strip('"'), None


def _abs(path):
    return os.path.abspath(os.path.expandvars(os.path.expanduser(path)))


def _child_path(root, target):
    root = _abs(root)
    target = _abs(target)
    try:
        common = os.path.commonpath([root, target])
    except ValueError:
        return False
    return os.path.normcase(common) == os.path.normcase(root) and os.path.normcase(target) != os.path.normcase(root)


def terminal_run(args):
    args = args or {}
    cmd = args.get("command") or args.get("cmd")
    if not cmd or not isinstance(cmd, str):
        return _err('terminal_run needs "command" (the shell command string).')
    timeout = int(args.get("timeout") or DEFAULT_TIMEOUT)
    timeout = max(1, min(timeout, 600))
    cwd = args.get("cwd")
    cwd = _abs(cwd) if cwd else None
    if cwd and not os.path.isdir(cwd):
        return _err(f"cwd does not exist: {cwd}")
    shell = args.get("shell")
    if shell is None:
        rc, out, err, disp = _run(cmd, timeout=timeout, cwd=cwd, shell=True)
    else:
        argv = cmd if isinstance(shell, list) else None
        if argv:
            rc, out, err, disp = _run(argv, timeout=timeout, cwd=cwd, shell=False)
        else:
            rc, out, err, disp = _run(cmd, timeout=timeout, cwd=cwd, shell=bool(shell))
    return _format_run(rc, out, err, disp, cwd=cwd)


def terminal_run_elevated(args):
    args = args or {}
    cmd = args.get("command") or args.get("cmd")
    if not cmd or not isinstance(cmd, str):
        return _err('terminal_run_elevated needs "command".')
    timeout = int(args.get("timeout") or 180)
    timeout = max(5, min(timeout, 600))
    out_file = os.path.join(os.environ.get("TEMP", "."), f"zs_elev_{uuid.uuid4().hex}.txt")
    err_file = out_file + ".err"
    ps = (
        "$p = Start-Process -FilePath 'powershell' -Verb RunAs -Wait -PassThru "
        f"-ArgumentList @('-NoProfile','-NonInteractive','-Command', {json.dumps(cmd)} + "
        f"' | Out-File -Encoding utf8 {json.dumps(out_file)} 2>{json.dumps(err_file)}') "
        "-WindowStyle Hidden; $p.ExitCode"
    )
    rc, out, err, _ = _ps(ps, timeout=timeout)
    stdout = ""
    stderr = ""
    try:
        if os.path.isfile(out_file):
            with open(out_file, "r", encoding="utf-8", errors="replace") as f:
                stdout = f.read()
        if os.path.isfile(err_file):
            with open(err_file, "r", encoding="utf-8", errors="replace") as f:
                stderr = f.read()
    except Exception:
        pass
    for p in (out_file, err_file):
        try:
            if os.path.isfile(p):
                os.remove(p)
        except Exception:
            pass
    body = out.strip() or err.strip()
    if "canceled by the user" in body.lower() or "operation canceled" in body.lower():
        return _err("Elevation was cancelled (UAC declined) or the elevated process could not start.")
    try:
        exit_code = int(body.splitlines()[-1]) if body.splitlines() else rc
    except Exception:
        exit_code = rc
    return _format_run(exit_code, stdout, stderr, f"(elevated) {cmd}")


def _new_session(args):
    cwd = args.get("cwd")
    cwd = _abs(cwd) if cwd else os.getcwd()
    if not os.path.isdir(cwd):
        return None, _err(f"cwd does not exist: {cwd}")
    command = args.get("command") or args.get("cmd")
    sid = f"s{uuid.uuid4().hex[:8]}"
    creationflags = 0
    if os.name == "nt":
        creationflags = getattr(subprocess, "CREATE_NO_WINDOW", 0)
    try:
        if command:
            proc = subprocess.Popen(
                command,
                shell=True,
                cwd=cwd,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                errors="replace",
                bufsize=1,
                creationflags=creationflags,
            )
            label = command
        else:
            proc = subprocess.Popen(
                ["powershell", "-NoLogo", "-NoProfile"],
                cwd=cwd,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                errors="replace",
                bufsize=1,
                creationflags=creationflags,
            )
            label = "powershell"
    except Exception as e:
        return None, _err(f"could not start session: {e}")
    state = {
        "proc": proc,
        "label": label,
        "cwd": cwd,
        "buf": [],
        "bytes": 0,
        "created": time.time(),
        "done": False,
        "reader": None,
    }

    def _reader(p=proc, st=state):
        try:
            for line in p.stdout:
                st["bytes"] += len(line)
                if st["bytes"] <= MAX_OUTPUT * 2:
                    st["buf"].append(line)
                elif len(st["buf"]) < 4000:
                    st["buf"].append(line)
        except Exception:
            pass
        finally:
            st["done"] = True

    t = threading.Thread(target=_reader, daemon=True)
    t.start()
    state["reader"] = t
    with _SESSIONS_LOCK:
        for old_id, old in list(_SESSIONS.items()):
            if old.get("done") or old["proc"].poll() is not None:
                _SESSIONS.pop(old_id, None)
        _SESSIONS[sid] = state
    return sid, None


def terminal_send(args):
    args = args or {}
    sid = args.get("session_id") or args.get("session") or args.get("id")
    text = args.get("text") or args.get("data") or args.get("input")
    if not sid:
        return _err('terminal_send needs "session_id" (from terminal_run or terminal_list_sessions).')
    if text is None or text == "":
        return _err('terminal_send needs "text" (what to write to the process stdin).')
    with _SESSIONS_LOCK:
        st = _SESSIONS.get(str(sid))
    if not st:
        return _err(f"unknown session '{sid}'. Start one with terminal_run or terminal_list_sessions.")
    proc = st["proc"]
    if proc.poll() is not None:
        return _err(f"session '{sid}' already exited (code {proc.returncode}). Output:\n" + _clip("".join(st["buf"])))
    try:
        payload = text if text.endswith("\n") else text + "\n"
        proc.stdin.write(payload)
        proc.stdin.flush()
    except Exception as e:
        return _err(f"could not write to session '{sid}': {e}")
    wait = float(args.get("wait_ms") or 400) / 1000.0
    wait = max(0.0, min(wait, 5.0))
    if wait:
        time.sleep(wait)
    return _session_output(sid, st)


def _session_output(sid, st):
    data = "".join(st["buf"])
    st["buf"] = []
    status = "running" if st["proc"].poll() is None else f"exited({st['proc'].returncode})"
    if not data:
        return f"session {sid} [{status}]: (no new output)"
    return f"session {sid} [{status}]:\n{_clip(data)}"


def terminal_list_sessions(args):
    args = args or {}
    rows = []
    with _SESSIONS_LOCK:
        items = list(_SESSIONS.items())
    if not items:
        return "No active terminal sessions. Start one with terminal_run (pass persistent: true) or omit 'command' for an interactive PowerShell."
    for sid, st in items:
        alive = st["proc"].poll() is None
        age = int(time.time() - st["created"])
        pending = len(st["buf"])
        rows.append(
            f"- {sid}: {st['label'][:60]} | cwd={st['cwd']} | "
            f"{'running' if alive else 'exited(' + str(st['proc'].returncode) + ')'} | age={age}s | pending_lines={pending}"
        )
    return "Active terminal sessions:\n" + "\n".join(rows)


def terminal_kill(args):
    args = args or {}
    sid = args.get("session_id") or args.get("session") or args.get("id")
    if not sid:
        return _err('terminal_kill needs "session_id".')
    with _SESSIONS_LOCK:
        st = _SESSIONS.pop(str(sid), None)
    if not st:
        return _err(f"unknown session '{sid}'.")
    proc = st["proc"]
    try:
        if proc.poll() is None:
            proc.terminate()
            try:
                proc.wait(timeout=3)
            except Exception:
                proc.kill()
    except Exception as e:
        return _err(f"failed to kill session '{sid}': {e}")
    data = _clip("".join(st["buf"]))
    return f"Session {sid} terminated." + (f"\nLast output:\n{data}" if data else "")


def terminal_read_output(args):
    args = args or {}
    sid = args.get("session_id") or args.get("session") or args.get("id")
    if not sid:
        return _err('terminal_read_output needs "session_id".')
    with _SESSIONS_LOCK:
        st = _SESSIONS.get(str(sid))
    if not st:
        return _err(f"unknown session '{sid}'.")
    return _session_output(sid, st)


def copy_path(args):
    args = args or {}
    src, e = _need_path(args, "source")
    if e:
        src, e = _need_path(args, "src")
    if e:
        return e
    dst, e = _need_path(args, "destination")
    if e:
        dst, e = _need_path(args, "dest")
    if e:
        return e
    src, dst = _abs(src), _abs(dst)
    if not os.path.exists(src):
        return _err(f"source does not exist: {src}")
    try:
        if os.path.isdir(src):
            shutil.copytree(src, dst, dirs_exist_ok=_as_bool(args.get("overwrite")))
        else:
            shutil.copy2(src, dst)
    except Exception as ex:
        return _err(f"copy failed: {ex}")
    return f"Copied {src} -> {dst}"


def move_path(args):
    args = args or {}
    src, e = _need_path(args, "source")
    if e:
        src, e = _need_path(args, "src")
    if e:
        return e
    dst, e = _need_path(args, "destination")
    if e:
        dst, e = _need_path(args, "dest")
    if e:
        return e
    src, dst = _abs(src), _abs(dst)
    if not os.path.exists(src):
        return _err(f"source does not exist: {src}")
    try:
        os.makedirs(os.path.dirname(dst) or ".", exist_ok=True)
        shutil.move(src, dst)
    except Exception as ex:
        return _err(f"move failed: {ex}")
    return f"Moved {src} -> {dst}"


def delete_path(args):
    args = args or {}
    path, e = _need_path(args)
    if e:
        return e
    path = _abs(path)
    if not os.path.exists(path):
        return _err(f"path does not exist: {path}")
    home = os.path.normcase(os.path.abspath(os.path.expanduser("~")))
    drive = os.path.normcase(os.path.splitdrive(path)[0] + os.sep) if os.name == "nt" else os.path.normcase(os.sep)
    if os.path.normcase(path) in (home, drive) or os.path.normcase(path) in ("c:\\", "c:/"):
        return _err("refusing to delete a drive root or the user home directory.")
    is_dir = os.path.isdir(path)
    will_delete = []
    if is_dir:
        for dirpath, dirnames, filenames in os.walk(path):
            for n in filenames:
                will_delete.append(os.path.join(dirpath, n))
                if len(will_delete) >= 500:
                    break
            if len(will_delete) >= 500:
                break
        preview = f"directory '{path}' (recursive)"
    else:
        preview = f"file '{path}'"
    if not _as_bool(args.get(CONFIRM_KEY)):
        head = f"CONFIRMATION REQUIRED to delete {preview}."
        if will_delete:
            head += "\nSample of targets (max 500 listed):\n" + "\n".join(will_delete[:50])
            if len(will_delete) >= 500:
                head += "\n... (list capped)"
        else:
            head += "\n(path exists; no files listed for sample)"
        head += f'\nRe-call delete_path with the same path and "{CONFIRM_KEY}": true to delete.'
        return head
    try:
        if is_dir:
            shutil.rmtree(path)
        else:
            os.remove(path)
    except Exception as ex:
        return _err(f"delete failed: {ex}")
    return f"Deleted {preview}."


def list_directory(args):
    args = args or {}
    path = args.get("path") or args.get("dir") or "."
    path = _abs(path)
    if not os.path.isdir(path):
        return _err(f"not a directory: {path}")
    try:
        names = sorted(os.listdir(path))
    except Exception as ex:
        return _err(f"could not list {path}: {ex}")
    show_hidden = _as_bool(args.get("hidden"))
    entries = []
    for name in names:
        if not show_hidden and name.startswith("."):
            continue
        full = os.path.join(path, name)
        try:
            if os.path.isdir(full):
                entries.append(f"[DIR]  {name}/")
            else:
                size = os.path.getsize(full)
                entries.append(f"[FILE] {name}  ({size} bytes)")
        except Exception:
            entries.append(f"[????] {name}")
    if not entries:
        return f"{path} is empty."
    limit = int(args.get("limit") or 200)
    limit = max(1, min(limit, 2000))
    shown = entries[:limit]
    body = "\n".join(shown)
    more = f"\n... ({len(entries) - limit} more)" if len(entries) > limit else ""
    return f"Listing of {path} ({len(entries)} entries):\n{body}{more}"


def create_directory(args):
    args = args or {}
    path, e = _need_path(args)
    if e:
        return e
    path = _abs(path)
    try:
        os.makedirs(path, exist_ok=True)
    except Exception as ex:
        return _err(f"could not create directory: {ex}")
    return f"Directory ready: {path}"


def download_file(args):
    args = args or {}
    url = args.get("url")
    if not url or not isinstance(url, str) or not re.match(r"^https?://", url.strip(), re.I):
        return _err('download_file needs "url" starting with http:// or https://')
    dest, e = _need_path(args, "destination")
    if e:
        dest, e = _need_path(args, "path")
    if e:
        return _err('download_file needs "destination" (file path to write).')
    dest = _abs(dest)
    os.makedirs(os.path.dirname(dest) or ".", exist_ok=True)
    try:
        req = urllib.request.Request(url.strip(), headers={"User-Agent": "RelayZero/1.0"})
        with urllib.request.urlopen(req, timeout=60) as resp:
            total = resp.length or 0
            if total and total > DOWNLOAD_MAX:
                return _err(f"file too large ({total} bytes > {DOWNLOAD_MAX} limit).")
            read = 0
            tmp = dest + ".part"
            with open(tmp, "wb") as f:
                while True:
                    chunk = resp.read(65536)
                    if not chunk:
                        break
                    read += len(chunk)
                    if read > DOWNLOAD_MAX:
                        f.close()
                        try:
                            os.remove(tmp)
                        except Exception:
                            pass
                        return _err(f"download exceeded {DOWNLOAD_MAX} byte limit.")
                    f.write(chunk)
            os.replace(tmp, dest)
    except Exception as ex:
        return _err(f"download failed: {ex}")
    size = os.path.getsize(dest) if os.path.isfile(dest) else 0
    return f"Downloaded {url} -> {dest} ({size} bytes)."


def extract_archive(args):
    args = args or {}
    archive, e = _need_path(args, "archive")
    if e:
        archive, e = _need_path(args, "path")
    if e:
        return e
    dest = args.get("destination") or args.get("dest") or args.get("target_dir")
    archive = _abs(archive)
    if not os.path.isfile(archive):
        return _err(f"archive not found: {archive}")
    dest = _abs(dest) if dest else os.path.dirname(archive)
    os.makedirs(dest, exist_ok=True)
    lower = archive.lower()
    try:
        if lower.endswith(".zip") or zipfile.is_zipfile(archive):
            with zipfile.ZipFile(archive) as zf:
                names = zf.namelist()
                if len(names) > 5000:
                    return _err(f"archive has too many entries ({len(names)}).")
                zf.extractall(dest)
            return f"Extracted {len(names)} entries from {archive} -> {dest}"
        if lower.endswith((".tar", ".tar.gz", ".tgz", ".tar.bz2", ".tbz2", ".tar.xz")) or tarfile.is_tarfile(archive):
            with tarfile.open(archive) as tf:
                names = tf.getnames()
                if len(names) > 5000:
                    return _err(f"archive has too many entries ({len(names)}).")
                try:
                    tf.extractall(dest, filter="data")
                except TypeError:
                    tf.extractall(dest)
            return f"Extracted {len(names)} entries from {archive} -> {dest}"
    except Exception as ex:
        return _err(f"extract failed: {ex}")
    seven = shutil.which("7z") or shutil.which("7za")
    if seven:
        rc, out, err, disp = _run([seven, "x", "-y", f"-o{dest}", archive], timeout=180)
        return _format_run(rc, out, err, disp, cwd=dest)
    return _err(
        f"unsupported archive format for '{archive}'. Supported: .zip, .tar/.tar.gz/.tgz/.tar.bz2/.tar.xz. "
        "Or put 7z.exe on PATH and retry."
    )


def _git(args, *git_args, timeout=180):
    cwd = args.get("cwd") or args.get("path")
    cwd = _abs(cwd) if cwd else None
    if cwd and not os.path.isdir(cwd):
        return _err(f"cwd does not exist: {cwd}")
    if shutil.which("git") is None:
        return _err("git is not installed or not on PATH. Install Git for Windows: https://git-scm.com/download/win")
    rc, out, err, disp = _run(["git", *git_args], timeout=timeout, cwd=cwd)
    return _format_run(rc, out, err, disp, cwd=cwd)


def git_clone(args):
    args = args or {}
    url = args.get("url") or args.get("repo")
    if not url:
        return _err('git_clone needs "url" (repository URL).')
    dest = args.get("destination") or args.get("path") or args.get("dest")
    cmd = ["clone", url]
    if dest:
        cmd.append(_abs(dest))
    depth = args.get("depth")
    if depth:
        cmd.extend(["--depth", str(depth)])
    return _git(args, *cmd, timeout=300)


def git_pull(args):
    args = args or {}
    return _git(args, "pull", *( [args["remote"]] if args.get("remote") else [] ), *( [args["branch"]] if args.get("branch") else [] ))


def git_status(args):
    args = args or {}
    return _git(args, "status", "--short" if _as_bool(args.get("short")) else "--branch", "--porcelain" if _as_bool(args.get("short")) else "-u")


def git_checkout(args):
    args = args or {}
    target = args.get("target") or args.get("branch") or args.get("ref")
    if not target:
        return _err('git_checkout needs "branch" (or "target").')
    cmd = ["checkout"]
    if _as_bool(args.get("create")):
        cmd.append("-b")
    cmd.append(target)
    return _git(args, *cmd)


def _all_procs():
    try:
        out = subprocess.check_output(
            ["powershell", "-NoProfile", "-Command",
             "Get-Process | Select-Object Id,ProcessName,Path | ConvertTo-Json -Compress"],
            text=True, errors="replace", timeout=30,
        )
        data = json.loads(out or "[]")
        if isinstance(data, dict):
            data = [data]
        return data
    except Exception:
        return None


def process_list(args):
    args = args or {}
    name = (args.get("name") or args.get("filter") or "").strip().lower()
    procs = _all_procs()
    if procs is None:
        rc, out, err, disp = _run(["tasklist", "/FO", "CSV", "/NH"], timeout=20)
        if rc != 0:
            return _err(f"process list failed: {err or out}")
        lines = [ln for ln in out.splitlines() if ln.strip()]
        if name:
            lines = [ln for ln in lines if name in ln.lower()]
        limit = int(args.get("limit") or 80)
        body = "\n".join(lines[:limit])
        more = f"\n... ({len(lines) - limit} more)" if len(lines) > limit else ""
        return f"Processes (tasklist):\n{body}{more}"
    rows = []
    for p in procs:
        pname = str(p.get("ProcessName") or "")
        pid = p.get("Id")
        path = p.get("Path") or ""
        if name and name not in pname.lower() and name not in str(pid) and name not in path.lower():
            continue
        rows.append(f"{pid}\t{pname}\t{path}")
    limit = int(args.get("limit") or 80)
    limit = max(1, min(limit, 500))
    if not rows:
        return f"No processes matched filter '{name or '(all)'}'."
    body = "PID\tNAME\tPATH\n" + "\n".join(rows[:limit])
    more = f"\n... ({len(rows) - limit} more)" if len(rows) > limit else ""
    return body + more


def process_kill(args):
    args = args or {}
    pid = args.get("pid")
    name = args.get("name")
    if not pid and not name:
        return _err('process_kill needs "pid" or "name".')
    if not _as_bool(args.get(CONFIRM_KEY)):
        target = f"pid {pid}" if pid else f"name '{name}'"
        return f'CONFIRMATION REQUIRED to kill {target}. Re-call process_kill with "{CONFIRM_KEY}": true.'
    if pid:
        rc, out, err, disp = _run(["taskkill", "/PID", str(int(pid)), "/T" if _as_bool(args.get("tree")) else "/F"], timeout=20)
        return _format_run(rc, out, err, disp)
    rc, out, err, disp = _run(["taskkill", "/IM", str(name), "/F"], timeout=20)
    return _format_run(rc, out, err, disp)


def process_start(args):
    args = args or {}
    cmd = args.get("command") or args.get("path") or args.get("cmd")
    if not cmd:
        return _err('process_start needs "command" (executable path or command line).')
    cwd = args.get("cwd")
    cwd = _abs(cwd) if cwd else None
    wait = _as_bool(args.get("wait"))
    creationflags = 0
    if os.name == "nt":
        creationflags = getattr(subprocess, "CREATE_NO_WINDOW", 0)
    try:
        if wait:
            rc, out, err, disp = _run(cmd if isinstance(cmd, str) else cmd, timeout=int(args.get("timeout") or 120), cwd=cwd, shell=isinstance(cmd, str))
            return _format_run(rc, out, err, disp, cwd=cwd)
        proc = subprocess.Popen(
            cmd if isinstance(cmd, list) else cmd,
            shell=isinstance(cmd, str),
            cwd=cwd,
            creationflags=creationflags,
        )
    except Exception as ex:
        return _err(f"could not start process: {ex}")
    return f"Started process pid={proc.pid}: {cmd}"


def process_is_running(args):
    args = args or {}
    pid = args.get("pid")
    name = (args.get("name") or "").strip()
    if not pid and not name:
        return _err('process_is_running needs "pid" or "name".')
    procs = _all_procs()
    if procs is None:
        if pid:
            rc, out, err, disp = _run(["tasklist", "/FI", f"PID eq {pid}"], timeout=15)
            running = str(pid) in out and "No tasks" not in out
            return f"pid {pid}: {'RUNNING' if running else 'not running'}\n{out.strip()}"
        rc, out, err, disp = _run(["tasklist", "/FI", f"IMAGENAME eq {name}"], timeout=15)
        running = name.lower() in out.lower() and "No tasks" not in out
        return f"'{name}': {'RUNNING' if running else 'not running'}\n{out.strip()}"
    if pid:
        for p in procs:
            if str(p.get("Id")) == str(pid):
                return f"pid {pid}: RUNNING ({p.get('ProcessName')}, path={p.get('Path')})"
        return f"pid {pid}: not running"
    matches = [p for p in procs if name.lower() in str(p.get("ProcessName") or "").lower()]
    if not matches:
        return f"'{name}': not running"
    lines = [f"{p.get('Id')}\t{p.get('ProcessName')}\t{p.get('Path')}" for p in matches[:30]]
    return f"'{name}': RUNNING ({len(matches)} match(es))\n" + "\n".join(lines)


def registry_read(args):
    args = args or {}
    key = args.get("key") or args.get("path")
    name = args.get("name")
    if not key:
        return _err('registry_read needs "key" like HKLM\\SOFTWARE\\Microsoft or HKEY_LOCAL_MACHINE\\...')
    if os.name != "nt":
        return _err("registry_read is Windows-only.")
    import winreg

    hive_map = {
        "HKLM": winreg.HKEY_LOCAL_MACHINE,
        "HKEY_LOCAL_MACHINE": winreg.HKEY_LOCAL_MACHINE,
        "HKCU": winreg.HKEY_CURRENT_USER,
        "HKEY_CURRENT_USER": winreg.HKEY_CURRENT_USER,
        "HKCR": winreg.HKEY_CLASSES_ROOT,
        "HKEY_CLASSES_ROOT": winreg.HKEY_CLASSES_ROOT,
        "HKU": winreg.HKEY_USERS,
        "HKEY_USERS": winreg.HKEY_USERS,
    }
    parts = key.replace("/", "\\").split("\\", 1)
    hive_name = parts[0].upper()
    sub = parts[1] if len(parts) > 1 else ""
    hive = hive_map.get(hive_name)
    if hive is None:
        return _err(f"unknown hive in key: {parts[0]}. Use HKLM, HKCU, HKCR, HKU.")
    try:
        with winreg.OpenKey(hive, sub) as h:
            if name is None or name == "":
                values = []
                i = 0
                while True:
                    try:
                        n, v, t = winreg.EnumValue(h, i)
                        values.append(f"{n} ({t}) = {v!r}")
                        i += 1
                    except OSError:
                        break
                defaults = []
                j = 0
                while True:
                    try:
                        subname = winreg.EnumKey(h, j)
                        defaults.append(subname)
                        j += 1
                    except OSError:
                        break
                body = "\n".join(values) if values else "(no values)"
                subs = "\n".join(defaults) if defaults else "(no subkeys)"
                return f"Key: {key}\nSubkeys:\n{subs}\nValues:\n{body}"
            v, t = winreg.QueryValueEx(h, name)
            return f"{key}\\{name} (type {t}) = {v!r}"
    except FileNotFoundError:
        return _err(f"registry key not found: {key}")
    except Exception as ex:
        return _err(f"registry read failed: {ex}")


def registry_write(args):
    args = args or {}
    key = args.get("key") or args.get("path")
    name = args.get("name")
    value = args.get("value")
    regtype = str(args.get("type") or "SZ").upper()
    if not key or name is None:
        return _err('registry_write needs "key", "name", and "value".')
    if os.name != "nt":
        return _err("registry_write is Windows-only.")
    if not _as_bool(args.get(CONFIRM_KEY)):
        return (
            f'CONFIRMATION REQUIRED to write registry value {key}\\{name} = {value!r} (type {regtype}). '
            f'Re-call registry_write with "{CONFIRM_KEY}": true.'
        )
    import winreg

    hive_map = {
        "HKLM": winreg.HKEY_LOCAL_MACHINE,
        "HKEY_LOCAL_MACHINE": winreg.HKEY_LOCAL_MACHINE,
        "HKCU": winreg.HKEY_CURRENT_USER,
        "HKEY_CURRENT_USER": winreg.HKEY_CURRENT_USER,
        "HKCR": winreg.HKEY_CLASSES_ROOT,
        "HKEY_CLASSES_ROOT": winreg.HKEY_CLASSES_ROOT,
        "HKU": winreg.HKEY_USERS,
        "HKEY_USERS": winreg.HKEY_USERS,
    }
    parts = key.replace("/", "\\").split("\\", 1)
    hive = hive_map.get(parts[0].upper())
    if hive is None:
        return _err(f"unknown hive: {parts[0]}")
    sub = parts[1] if len(parts) > 1 else ""
    type_map = {
        "SZ": winreg.REG_SZ,
        "EXPAND_SZ": winreg.REG_EXPAND_SZ,
        "EXPANDSZ": winreg.REG_EXPAND_SZ,
        "DWORD": winreg.REG_DWORD,
        "QWORD": winreg.REG_QWORD,
        "MULTI_SZ": winreg.REG_MULTI_SZ,
        "MULTISZ": winreg.REG_MULTI_SZ,
        "BINARY": winreg.REG_BINARY,
    }
    rt = type_map.get(regtype)
    if rt is None:
        return _err(f"unknown type '{regtype}'. Use SZ, EXPAND_SZ, DWORD, QWORD, MULTI_SZ, BINARY.")
    if rt == winreg.REG_DWORD:
        value = int(value)
    elif rt == winreg.REG_QWORD:
        value = int(value)
    elif rt == winreg.REG_MULTI_SZ and isinstance(value, str):
        value = [ln for ln in value.split("\n") if ln != ""]
    try:
        with winreg.CreateKeyEx(hive, sub, 0, winreg.KEY_SET_VALUE) as h:
            winreg.SetValueEx(h, name, 0, rt, value)
    except Exception as ex:
        return _err(f"registry write failed: {ex}")
    return f"Wrote {key}\\{name} = {value!r} (type {regtype})."


def service_start(args):
    args = args or {}
    name = args.get("name") or args.get("service")
    if not name:
        return _err('service_start needs "name" (service name, e.g. Spooler).')
    rc, out, err, disp = _ps(f"Start-Service -Name '{name.replace(chr(39), chr(39)+chr(39))}' -ErrorAction Stop; (Get-Service -Name '{name.replace(chr(39), chr(39)+chr(39))}').Status", timeout=45)
    if rc != 0:
        return _err(f"start service '{name}' failed: {err or out}")
    return f"Service '{name}' status: {out.strip()}"


def service_stop(args):
    args = args or {}
    name = args.get("name") or args.get("service")
    if not name:
        return _err('service_stop needs "name".')
    if not _as_bool(args.get(CONFIRM_KEY)):
        return f'CONFIRMATION REQUIRED to stop service \'{name}\'. Re-call service_stop with "{CONFIRM_KEY}": true.'
    safe = name.replace("'", "''")
    rc, out, err, disp = _ps(f"Stop-Service -Name '{safe}' -Force -ErrorAction Stop; (Get-Service -Name '{safe}').Status", timeout=45)
    if rc != 0:
        return _err(f"stop service '{name}' failed: {err or out}")
    return f"Service '{name}' status: {out.strip()}"


def environment_get(args):
    args = args or {}
    name = args.get("name")
    scope = str(args.get("scope") or "process").lower()
    if name:
        if scope in ("user", "machine"):
            esc = scope.capitalize()
            safe = str(name).replace("'", "''")
            rc, out, err, disp = _ps(
                f"$v = [Environment]::GetEnvironmentVariable('{safe}', '{esc}'); "
                "if ($null -eq $v) { 'NOT SET' } else { $v }",
                timeout=20,
            )
            if rc == 0:
                return f"{name} ({scope}) = {out.strip()}"
        val = os.environ.get(str(name))
        return f"{name} (process) = {val if val is not None else 'NOT SET'}"
    rows = [f"{k}={v}" for k, v in sorted(os.environ.items())]
    limit = int(args.get("limit") or 200)
    body = "\n".join(rows[:limit])
    more = f"\n... ({len(rows) - limit} more)" if len(rows) > limit else ""
    return f"Process environment ({len(rows)} vars):\n{body}{more}"


def environment_set(args):
    args = args or {}
    name = args.get("name")
    value = args.get("value")
    scope = str(args.get("scope") or "user").lower()
    if not name:
        return _err('environment_set needs "name".')
    if value is None:
        return _err('environment_set needs "value" (use empty string "" to remove for user/machine).')
    if scope not in ("user", "machine", "process"):
        return _err('scope must be "user", "machine", or "process".')
    if scope == "machine" and not _as_bool(args.get(CONFIRM_KEY)):
        return f'CONFIRMATION REQUIRED to set machine-wide env {name}. Re-call environment_set with scope "user" or "{CONFIRM_KEY}": true.'
    if scope == "process":
        os.environ[str(name)] = str(value)
        return f"Set process env {name}={value!r} (this bridge process only)."
    safe_name = str(name).replace("'", "''")
    safe_val = str(value).replace("'", "''")
    esc = scope.capitalize()
    ps_value = "$null" if value == "" else f"'{safe_val}'"
    rc, out, err, disp = _ps(
        f"[Environment]::SetEnvironmentVariable('{safe_name}', {ps_value}, '{esc}')",
        timeout=20,
    )
    if rc != 0:
        return _err(f"set env failed: {err or out}")
    return f"Set {scope} env {name}={value!r}. New processes pick it up; already-running apps need a restart."


def _find_vswhere():
    for p in (
        r"C:\Program Files (x86)\Microsoft Visual Studio\Installer\vswhere.exe",
        r"C:\Program Files\Microsoft Visual Studio\Installer\vswhere.exe",
    ):
        if os.path.isfile(p):
            return p
    return shutil.which("vswhere")


def _vswhere_find(pattern, requires=None):
    vswhere = _find_vswhere()
    if not vswhere:
        return None
    cmd = [vswhere, "-latest", "-products", "*", "-format", "value"]
    if requires:
        cmd.extend(["-requires", *requires])
    cmd.extend(["-find", pattern])
    rc, out, err, disp = _run(cmd, timeout=20)
    lines = [ln.strip() for ln in out.splitlines() if ln.strip()]
    return lines[0] if lines else None


def _require_tool(exe, hint):
    path = shutil.which(exe)
    if path:
        return path, None
    return None, _err(f"'{exe}' not found on PATH. {hint}")


def vcpkg_install(args):
    args = args or {}
    package = args.get("package") or args.get("name")
    if not package:
        return _err('vcpkg_install needs "package" (e.g. fmt:x64-windows or zlib).')
    vcpkg, e = _require_tool("vcpkg", "Install vcpkg and add it to PATH, or pass full path via 'vcpkg_path'.")
    if args.get("vcpkg_path"):
        vcpkg = _abs(args["vcpkg_path"])
        e = None if os.path.isfile(vcpkg) else _err(f"vcpkg_path not found: {vcpkg}")
    if e:
        return e
    triplet = args.get("triplet")
    cmd = ["install", package]
    if triplet and ":" not in package:
        cmd = [f"{package}:{triplet}"]
    if _as_bool(args.get("clean_after_build")):
        cmd.append("--clean-after-build")
    rc, out, err, disp = _run([vcpkg, *cmd], timeout=int(args.get("timeout") or 600))
    return _format_run(rc, out, err, disp)


def vcpkg_integrate(args):
    args = args or {}
    vcpkg = args.get("vcpkg_path") and _abs(args["vcpkg_path"]) or shutil.which("vcpkg")
    if not vcpkg:
        return _err("vcpkg not found on PATH. Install vcpkg or pass 'vcpkg_path'.")
    if not _as_bool(args.get(CONFIRM_KEY)):
        return (
            'CONFIRMATION REQUIRED: vcpkg integrate install usually needs Administrator '
            f'(UAC prompt) and changes VS project defaults system-wide. Re-call with "{CONFIRM_KEY}": true.'
        )
    rc, out, err, disp = _run([vcpkg, "integrate", "install"], timeout=120)
    return _format_run(rc, out, err, disp)


def cmake_configure(args):
    args = args or {}
    src = args.get("source_dir") or args.get("source") or args.get("path")
    if not src:
        return _err('cmake_configure needs "source_dir" (folder with CMakeLists.txt).')
    src = _abs(src)
    if not os.path.isdir(src):
        return _err(f"source_dir does not exist: {src}")
    cmake, e = _require_tool("cmake", "Install CMake: https://cmake.org/download/ and tick 'Add to PATH'.")
    if e:
        return e
    build = args.get("build_dir")
    build = _abs(build) if build else os.path.join(src, "build")
    os.makedirs(build, exist_ok=True)
    cmd = [cmake, "-S", src, "-B", build]
    gen = args.get("generator")
    if gen:
        cmd.extend(["-G", gen])
    defs = args.get("defines") or args.get("variables") or []
    if isinstance(defs, str):
        defs = [d for d in defs.split(";") if d]
    for d in defs:
        cmd.append(f"-D{d}")
    rc, out, err, disp = _run(cmd, timeout=int(args.get("timeout") or 300))
    return _format_run(rc, out, err, disp, cwd=build) + f"\n(build_dir: {build})"


def cmake_build(args):
    args = args or {}
    build = args.get("build_dir") or args.get("path")
    if not build:
        return _err('cmake_build needs "build_dir".')
    build = _abs(build)
    if not os.path.isdir(build):
        return _err(f"build_dir does not exist: {build}")
    cmake, e = _require_tool("cmake", "Install CMake and add to PATH.")
    if e:
        return e
    cmd = [cmake, "--build", build]
    cfg = args.get("config") or args.get("configuration")
    if cfg:
        cmd.extend(["--config", str(cfg)])
    target = args.get("target")
    if target:
        cmd.extend(["--target", str(target)])
    if args.get("parallel") is not None:
        par = args.get("parallel")
        if par is True or par == "":
            cmd.append("--parallel")
        else:
            cmd.extend(["--parallel", str(par)])
    rc, out, err, disp = _run(cmd, timeout=int(args.get("timeout") or 600))
    return _format_run(rc, out, err, disp, cwd=build)


def msbuild_run(args):
    args = args or {}
    project = args.get("project") or args.get("path") or args.get("solution")
    if not project:
        return _err('msbuild_run needs "project" (.vcxproj/.sln path).')
    project = _abs(project)
    if not os.path.isfile(project):
        return _err(f"project not found: {project}")
    msbuild = args.get("msbuild_path") and _abs(args["msbuild_path"]) or shutil.which("msbuild")
    if not msbuild:
        found = _vswhere_find(r"MSBuild\**\Bin\MSBuild.exe", requires=["Microsoft.Component.MSBuild"])
        msbuild = found
    if not msbuild:
        return _err("msbuild not found. Install Visual Studio Build Tools / MSBuild or run from a VS Developer prompt.")
    cmd = [msbuild, project]
    target = args.get("target")
    if target:
        cmd.extend(["/t", str(target)])
    cfg = args.get("config") or args.get("configuration") or "Debug"
    cmd.extend(["/p:Configuration=" + str(cfg)])
    plat = args.get("platform")
    if plat:
        cmd.extend(["/p:Platform=" + str(plat)])
    if _as_bool(args.get("restore")):
        cmd.append("/restore")
    props = args.get("properties") or []
    if isinstance(props, str):
        props = [p for p in props.split(";") if p]
    for p in props:
        cmd.append(f"/p:{p}")
    rc, out, err, disp = _run(cmd, timeout=int(args.get("timeout") or 600))
    return _format_run(rc, out, err, disp)


def _vcvars_env():
    vswhere = _find_vswhere()
    if not vswhere:
        return None
    rc, out, err, disp = _run(
        [vswhere, "-latest", "-products", "*", "-requires", "Microsoft.VisualStudio.Component.VC.Tools.x86.x64",
         "-property", "installationPath"],
        timeout=20,
    )
    install = out.strip().splitlines()[0].strip() if out.strip() else ""
    if not install:
        return None
    bat = os.path.join(install, "VC", "Auxiliary", "Build", "vcvars64.bat")
    if not os.path.isfile(bat):
        return None
    rc, out, err, disp = _run(f'"{bat}" >nul && set', timeout=30, shell=True)
    if rc != 0:
        return None
    env = dict(os.environ)
    for line in out.splitlines():
        if "=" in line:
            k, _, v = line.partition("=")
            env[k] = v
    return env


def cl_compile(args):
    args = args or {}
    sources = args.get("sources") or args.get("source") or args.get("file")
    if not sources:
        return _err('cl_compile needs "sources" (file path or array of paths).')
    if isinstance(sources, str):
        sources = [sources]
    sources = [_abs(s) for s in sources]
    for s in sources:
        if not os.path.isfile(s):
            return _err(f"source not found: {s}")
    env = _vcvars_env()
    if env is None:
        return _err(
            "No MSVC vcvars64.bat found via vswhere. Install the 'Desktop development with C++' "
            "workload, or run through msbuild_run instead."
        )
    out_dir = args.get("out_dir")
    out_dir = _abs(out_dir) if out_dir else os.path.dirname(sources[0])
    os.makedirs(out_dir, exist_ok=True)
    cmd = ["cl", "/nologo", "/c", f"/Fo{out_dir}\\"]
    std = args.get("std") or args.get("cpp_standard")
    if std:
        s = str(std).lower().replace("c++", "").replace("cpp", "")
        cmd.append(f"/std:c++{s}")
    defs = args.get("defines") or []
    if isinstance(defs, str):
        defs = [d for d in defs.split(";") if d]
    for d in defs:
        cmd.append(f"/D{d}")
    incs = args.get("includes") or args.get("include_dirs") or []
    if isinstance(incs, str):
        incs = [i for i in incs.split(";") if i]
    for i in incs:
        cmd.append(f"/I{_abs(i)}")
    opt = args.get("optimize")
    if opt is not None:
        if _as_bool(opt):
            cmd.append("/O2")
        else:
            cmd.append("/Od")
    if _as_bool(args.get("warnings_as_errors")):
        cmd.append("/WX")
    cmd.extend(sources)
    rc, out, err, disp = _run(cmd, timeout=int(args.get("timeout") or 300), cwd=out_dir, env=env)
    return _format_run(rc, out, err, disp, cwd=out_dir)


def clang_format_file(args):
    args = args or {}
    path, e = _need_path(args, "file")
    if e:
        path, e = _need_path(args, "path")
    if e:
        return e
    path = _abs(path)
    if not os.path.isfile(path):
        return _err(f"file not found: {path}")
    exe = args.get("clang_format_path") and _abs(args["clang_format_path"]) or shutil.which("clang-format")
    if not exe:
        return _err("clang-format not found on PATH. Install LLVM: https://releases.llvm.org/ or pass 'clang_format_path'.")
    style = args.get("style")
    if _as_bool(args.get("dry_run")):
        cmd = [exe, "--dry-run"]
        if style:
            cmd.append(f"--style={style}")
        cmd.append(path)
        rc, out, err, disp = _run(cmd, timeout=30)
        return _format_run(rc, out, err, disp)
    if _as_bool(args.get("in_place")):
        cmd = [exe, "-i"]
        if style:
            cmd.append(f"--style={style}")
        cmd.append(path)
        rc, out, err, disp = _run(cmd, timeout=30)
        if rc == 0:
            return f"Formatted in place: {path}"
        return _format_run(rc, out, err, disp)
    cmd = [exe]
    if style:
        cmd.append(f"--style={style}")
    cmd.append(path)
    rc, out, err, disp = _run(cmd, timeout=30)
    return _format_run(rc, out, err, disp)


def clang_tidy_run(args):
    args = args or {}
    path = args.get("file") or args.get("path") or args.get("source")
    if not path:
        return _err('clang_tidy_run needs "file" (translation unit to check).')
    path = _abs(path)
    if not os.path.isfile(path):
        return _err(f"file not found: {path}")
    exe = args.get("clang_tidy_path") and _abs(args["clang_tidy_path"]) or shutil.which("clang-tidy")
    if not exe:
        return _err("clang-tidy not found on PATH. Install LLVM or pass 'clang_tidy_path'.")
    cmd = [exe, path]
    checks = args.get("checks")
    if checks:
        cmd.append(f"--checks={checks}")
    fix = _as_bool(args.get("fix"))
    if fix:
        cmd.append("--fix")
    compile_args = args.get("compile_args") or args.get("args") or []
    if isinstance(compile_args, str):
        compile_args = [compile_args]
    if compile_args:
        cmd.append("--")
        cmd.extend(compile_args)
    rc, out, err, disp = _run(cmd, timeout=int(args.get("timeout") or 120), cwd=os.path.dirname(path))
    return _format_run(rc, out, err, disp, cwd=os.path.dirname(path))


def _load_xml(path):
    import xml.etree.ElementTree as ET

    try:
        tree = ET.parse(path)
    except Exception as ex:
        return None, _err(f"could not parse project XML {path}: {ex}")
    return tree, None


def _save_xml(tree, path):
    tree.write(path, encoding="utf-8", xml_declaration=True)


def _require_vs_tool(fn, tool, args):
    if _VS_EXECUTE is None:
        return _err(f"{fn} requires the VS Code MCP connection, which is not ready.")
    try:
        result = _VS_EXECUTE(tool, args or {})
    except Exception as ex:
        return _err(f"{fn} failed calling {tool}: {ex}")
    if isinstance(result, dict):
        return _clip(result.get("text") or result.get("error") or str(result))
    return _clip(result)


def editor_format_document(args):
    return _require_vs_tool(
        "editor_format_document", "execute_command",
        {"command": "editor.action.formatDocument"},
    )


def editor_reload_document(args):
    return _require_vs_tool(
        "editor_reload_document", "execute_command",
        {"command": "workbench.action.files.revert"},
    )


def vs_open_settings(args):
    args = args or {}
    query = args.get("page") or args.get("category") or args.get("query") or ""
    params = {"command": "workbench.action.openSettings"}
    if query:
        params = {
            "command": "workbench.action.openSettings",
            "arguments": [query],
        }
    return _require_vs_tool("vs_open_settings", "execute_command", params)


def vs_install_extension(args):
    args = args or {}
    vsix = args.get("vsix") or args.get("path") or args.get("vsix_path")
    ext = args.get("extension") or args.get("id") or "nabheet.vscode-ide-mcp"
    if vsix:
        vsix = _abs(vsix)
        if not os.path.isfile(vsix):
            return _err(f"vsix not found: {vsix}")
        code = _find_code_cli()
        if not code:
            return _err("Code CLI not found. Install the .vsix manually (Extensions > ... > Install from VSIX).")
        rc, out, err, disp = _run([code, "--install-extension", vsix, "--force"], timeout=180)
        return _format_run(rc, out, err, disp)
    code = _find_code_cli()
    if code:
        rc, out, err, disp = _run([code, "--install-extension", ext, "--force"], timeout=180)
        if rc == 0:
            return (
                f"Installed VS Code extension {ext}. Reload the VS Code window "
                "(Developer: Reload Window) for the MCP server to start."
            )
    url = args.get("url") or (
        "https://marketplace.visualstudio.com/items?itemName=" + ext
    )
    webbrowser_open = __import__("webbrowser").open
    try:
        webbrowser_open(url)
    except Exception as ex:
        return _err(f"could not open browser: {ex}")
    return (
        f"Opened {url} in the default browser. In VS Code use Extensions > ... "
        f"to install {ext}, then run Developer: Reload Window."
    )


def _find_code_cli():
    for cand in (
        os.path.expandvars(r"%LOCALAPPDATA%\Programs\Microsoft VS Code\bin\code.cmd"),
        os.path.expandvars(r"%LOCALAPPDATA%\Programs\Microsoft VS Code\Code.exe"),
        os.path.expandvars(r"%ProgramFiles%\Microsoft VS Code\bin\code.cmd"),
        os.path.expandvars(r"%ProgramFiles%\Microsoft VS Code\Code.exe"),
    ):
        if cand and os.path.isfile(cand):
            return cand
    which = shutil.which("code") or shutil.which("code.cmd")
    return which


def project_add_item_from_path(args):
    import xml.etree.ElementTree as ET

    args = args or {}
    project, e = _need_path(args, "project")
    if e:
        return e
    item, e = _need_path(args, "path")
    if e:
        item, e = _need_path(args, "item_path")
    if e:
        return e
    project, item = _abs(project), _abs(item)
    if not os.path.isfile(project) or not project.lower().endswith((".vcxproj", ".csproj")):
        return _err(f"project must be an existing .vcxproj/.csproj path: {project}")
    if not os.path.isfile(item):
        return _err(f"item file does not exist: {item}")
    try:
        rel = os.path.relpath(item, os.path.dirname(project))
    except Exception:
        rel = item
    rel = rel.replace("/", "\\")
    tree, e = _load_xml(project)
    if e:
        return e
    root = tree.getroot()
    ns = root.tag.split("}")[0] + "}" if root.tag.startswith("{") else ""
    ext = os.path.splitext(item)[1].lower()
    if ext in (".c", ".cpp", ".cxx", ".cc"):
        tag = "ClCompile"
    elif ext in (".h", ".hpp", ".hxx", ".hh"):
        tag = "ClInclude"
    else:
        tag = "None"
    item_type = args.get("item_type") or tag
    for ig in root.findall(f"{ns}ItemGroup"):
        for existing in list(ig):
            if existing.get("Include") == rel:
                return f"Already present in project: {rel} ({existing.tag.split('}')[-1]})"
    ig = root.find(f"{ns}ItemGroup")
    if ig is None:
        ig = ET.SubElement(root, f"{ns}ItemGroup")
    el = ET.SubElement(ig, f"{ns}{item_type}")
    el.set("Include", rel)
    _save_xml(tree, project)
    return f"Added {rel} to {os.path.basename(project)} as <{item_type}>. Reload the project in VS Code."


def project_remove_item(args):
    args = args or {}
    project, e = _need_path(args, "project")
    if e:
        return e
    include = args.get("path") or args.get("include") or args.get("item")
    if not include:
        return _err('project_remove_item needs "path" (Include= value, relative path in the project).')
    include = str(include).replace("/", "\\")
    project = _abs(project)
    if not os.path.isfile(project):
        return _err(f"project not found: {project}")
    if not _as_bool(args.get(CONFIRM_KEY)):
        return f'CONFIRMATION REQUIRED to remove {include} from {os.path.basename(project)}. Re-call with "{CONFIRM_KEY}": true.'
    tree, e = _load_xml(project)
    if e:
        return e
    root = tree.getroot()
    ns = root.tag.split("}")[0] + "}" if root.tag.startswith("{") else ""
    removed = 0
    for ig in root.findall(f"{ns}ItemGroup"):
        for child in list(ig):
            if child.get("Include") == include or child.get("Include") == include.replace("\\", "/"):
                ig.remove(child)
                removed += 1
    if not removed:
        return f"No item with Include '{include}' found in {os.path.basename(project)}."
    _save_xml(tree, project)
    return f"Removed {removed} item(s) '{include}' from {os.path.basename(project)}. Reload the workspace in VS Code."


def project_rename_item(args):
    args = args or {}
    project, e = _need_path(args, "project")
    if e:
        return e
    old = args.get("old_path") or args.get("old") or args.get("from")
    new = args.get("new_path") or args.get("new") or args.get("to")
    if not old or not new:
        return _err('project_rename_item needs "old_path" and "new_path".')
    project = _abs(project)
    if not os.path.isfile(project):
        return _err(f"project not found: {project}")
    old_n = str(old).replace("/", "\\")
    new_n = str(new).replace("/", "\\")
    tree, e = _load_xml(project)
    if e:
        return e
    root = tree.getroot()
    ns = root.tag.split("}")[0] + "}" if root.tag.startswith("{") else ""
    found = False
    for ig in root.findall(f"{ns}ItemGroup"):
        for child in list(ig):
            if child.get("Include") in (old_n, old_n.replace("\\", "/")):
                child.set("Include", new_n)
                found = True
    if not found:
        return f"No item '{old_n}' found in {os.path.basename(project)}."
    rename_disk = _as_bool(args.get("rename_file"))
    if rename_disk:
        base = os.path.dirname(project)
        src, dst = os.path.normpath(os.path.join(base, old_n)), os.path.normpath(os.path.join(base, new_n))
        if os.path.isfile(src):
            os.makedirs(os.path.dirname(dst) or ".", exist_ok=True)
            os.replace(src, dst)
    _save_xml(tree, project)
    return f"Renamed item {old_n} -> {new_n} in {os.path.basename(project)}."


def _id_xml_list(tag, values, placeholders):
    parts = []
    for v in values:
        parts.append(str(v).strip())
    return ";".join(parts + placeholders)


def _edit_item_def(project, group_tag, metadata_tag, key, value, *, replace=True, append_placeholder=None, create_if_missing=True):
    import xml.etree.ElementTree as ET

    tree, e = _load_xml(project)
    if e:
        return None, e
    root = tree.getroot()
    ns = root.tag.split("}")[0] + "}" if root.tag.startswith("{") else ""
    group = None
    for g in root.findall(f"{ns}ItemDefinitionGroup"):
        cond = g.get("Condition") or ""
        if not cond or "Debug" in cond or "Release" in cond or cond.strip() == "":
            group = g
            break
    if group is None:
        if not create_if_missing:
            return None, _err("no ItemDefinitionGroup found in project.")
        group = ET.SubElement(root, f"{ns}ItemDefinitionGroup")
    meta = group.find(f"{ns}{metadata_tag}")
    if meta is None:
        meta = ET.SubElement(group, f"{ns}{metadata_tag}")
    node = meta.find(f"{ns}{key}")
    if node is None:
        node = ET.SubElement(meta, f"{ns}{key}")
    if replace:
        node.text = value
    else:
        current = (node.text or "").strip()
        existing = [x.strip() for x in current.split(";") if x.strip()] if current else []
        extras = []
        for x in str(value).split(";"):
            xs = x.strip()
            if xs and xs not in existing and xs not in extras:
                extras.append(xs)
        if append_placeholder and append_placeholder not in existing and append_placeholder not in extras:
            extras.append(append_placeholder)
        merged = existing + extras
        node.text = ";".join(merged)
    _save_xml(tree, project)
    return tree, None


def project_set_include_dirs(args):
    args = args or {}
    project, e = _need_path(args, "project")
    if e:
        return e
    dirs = args.get("dirs") or args.get("values") or args.get("includes")
    if not dirs:
        return _err('project_set_include_dirs needs "dirs" (string with ";" separators or array).')
    if isinstance(dirs, str):
        vals = [d.strip() for d in dirs.split(";") if d.strip()]
    else:
        vals = [str(d) for d in dirs]
    replace = not _as_bool(args.get("append"))
    text = ";".join(vals + (["%(AdditionalIncludeDirectories)"] if "%(AdditionalIncludeDirectories)" not in ";".join(vals) else []))
    tree, e = _edit_item_def(_abs(project), "ItemDefinitionGroup", "ClCompile", "AdditionalIncludeDirectories", text, replace=replace)
    if e:
        return e
    return f"Set AdditionalIncludeDirectories on {os.path.basename(_abs(project))}: {text}. Reload/rebuild in VS."


def project_set_lib_dirs(args):
    args = args or {}
    project, e = _need_path(args, "project")
    if e:
        return e
    dirs = args.get("dirs") or args.get("values") or args.get("lib_dirs")
    if not dirs:
        return _err('project_set_lib_dirs needs "dirs".')
    vals = [d.strip() for d in dirs.split(";") if d.strip()] if isinstance(dirs, str) else [str(d) for d in dirs]
    text = ";".join(vals + (["%(AdditionalLibraryDirectories)"] if "%(AdditionalLibraryDirectories)" not in ";".join(vals) else []))
    tree, e = _edit_item_def(_abs(project), "ItemDefinitionGroup", "Link", "AdditionalLibraryDirectories", text, replace=not _as_bool(args.get("append")))
    if e:
        return e
    return f"Set AdditionalLibraryDirectories on {os.path.basename(_abs(project))}: {text}."


def project_add_lib(args):
    args = args or {}
    project, e = _need_path(args, "project")
    if e:
        return e
    lib = args.get("lib") or args.get("name") or args.get("library")
    if not lib:
        return _err('project_add_lib needs "lib" (e.g. user32.lib or full path).')
    tree, e = _edit_item_def(
        _abs(project),
        "ItemDefinitionGroup",
        "Link",
        "AdditionalDependencies",
        f"{lib};%(AdditionalDependencies)",
        replace=False,
        append_placeholder="%(AdditionalDependencies)",
    )
    if e:
        return e
    return f"Link AdditionalDependencies now includes {lib} on {os.path.basename(_abs(project))}."


def project_set_subsystem(args):
    args = args or {}
    project, e = _need_path(args, "project")
    if e:
        return e
    sub = str(args.get("subsystem") or args.get("value") or "").strip()
    allowed = {"Console", "Windows", "Native", "POSIX", "EFI Application", "EFI Boot Service Driver", "EFI Runtime Driver", "EFI ROM"}
    if sub not in allowed:
        return _err(f"subsystem must be one of: {', '.join(sorted(allowed))}.")
    tree, e = _edit_item_def(_abs(project), "ItemDefinitionGroup", "Link", "SubSystem", sub, replace=True)
    if e:
        return e
    return f"Link SubSystem set to {sub} on {os.path.basename(_abs(project))}."


def project_set_cpp_standard(args):
    args = args or {}
    project, e = _need_path(args, "project")
    if e:
        return e
    std = str(args.get("standard") or args.get("value") or args.get("cpp_standard") or "").strip()
    if not std:
        return _err('project_set_cpp_standard needs "standard" (e.g. c++17, c++20, stdcpp17).')
    val = std.lower().replace("c++", "stdcpp").replace("cpp", "stdcpp")
    if val.startswith("stdcpp"):
        pass
    elif val.isdigit():
        val = f"stdcpp{val}"
    else:
        val = "stdcpp" + val.lstrip("stdcpp")
    mapping = {"stdcpp11": "stdcpp11", "stdcpp14": "stdcpp14", "stdcpp17": "stdcpp17", "stdcpp20": "stdcpp20", "stdcpplatest": "stdcpplatest", "stdcpp17": "stdcpp17"}
    if val not in mapping and not val.startswith("stdcpp"):
        return _err(f"unrecognised standard '{std}'. Examples: c++17, c++20, latest.")
    tree, e = _edit_item_def(_abs(project), "ItemDefinitionGroup", "ClCompile", "LanguageStandard", mapping.get(val, val), replace=True)
    if e:
        return e
    return f"LanguageStandard set to {mapping.get(val, val)} on {os.path.basename(_abs(project))}."


def project_add_preprocessor(args):
    args = args or {}
    project, e = _need_path(args, "project")
    if e:
        return e
    defs = args.get("defines") or args.get("definitions") or args.get("value") or args.get("define")
    if not defs:
        return _err('project_add_preprocessor needs "defines" (FOO or FOO=1;BAR).')
    if isinstance(defs, str):
        parts = [d.strip() for d in defs.replace(",", ";").split(";") if d.strip()]
    else:
        parts = [str(d) for d in defs]
    ph = "%(PreprocessorDefinitions)"
    text = ";".join(parts + [ph])
    tree, e = _edit_item_def(_abs(project), "ItemDefinitionGroup", "ClCompile", "PreprocessorDefinitions", text, replace=True)
    if e:
        return e
    return f"PreprocessorDefinitions set on {os.path.basename(_abs(project))}: {text}."


def terminal_persistent_flag(args):
    return bool(args.get("persistent") or args.get("session"))


def terminal_run_dispatch(args):
    args = args or {}
    if args.get("persistent") or args.get("session") is True or args.get("new_session"):
        sid, e = _new_session(args)
        if e:
            return e
        time.sleep(0.4)
        with _SESSIONS_LOCK:
            st = _SESSIONS.get(sid)
        return (
            f"Started persistent session {sid} ({st['label']}, cwd={st['cwd']}). "
            f"Write with terminal_send {{\"session_id\": \"{sid}\", \"text\": \"...\"}}; "
            f"read with terminal_read_output; stop with terminal_kill."
            + (("\nInitial output:\n" + _clip("".join(st["buf"]))) if st and st["buf"] else "")
        )
    return terminal_run(args)


def _schema(props, required=None):
    sch = {"type": "object", "properties": props}
    if required:
        sch["required"] = required
    return sch


PATH_PROP = {"type": "string", "description": "Filesystem path (absolute or relative)."}
CONFIRM_PROP = {
    "type": "boolean",
    "description": "Must be true to actually perform the destructive action. First call without it returns a confirmation prompt.",
}
TIMEOUT_PROP = {"type": "integer", "description": "Timeout in seconds (default 60, max 600)."}

SYS_TOOL_SPECS = [
    {
        "name": "terminal_run",
        "description": (
            "Run a shell command on the user's PC (PowerShell/cmd as the OS default) and return exit code, "
            "stdout and stderr. Works with VS Code closed. Omit 'persistent' for one-shot; set "
            '"persistent": true to open an interactive session you drive with terminal_send / '
            "terminal_read_output / terminal_kill. Pass cwd to set the working directory."
        ),
        "inputSchema": _schema(
            {
                "command": {"type": "string", "description": "The shell command to run."},
                "cwd": {"type": "string", "description": "Working directory (optional)."},
                "timeout": TIMEOUT_PROP,
                "persistent": {"type": "boolean", "description": "true = keep the process alive as a session."},
            },
            ["command"],
        ),
    },
    {
        "name": "terminal_run_elevated",
        "description": (
            "Run a command with Administrator elevation (Windows UAC prompt may appear; the user must accept). "
            "Captures the elevated process output. Use only when the task needs admin rights."
        ),
        "inputSchema": _schema(
            {
                "command": {"type": "string", "description": "Command to run elevated."},
                "timeout": TIMEOUT_PROP,
            },
            ["command"],
        ),
    },
    {
        "name": "terminal_send",
        "description": "Write a line of input to a persistent terminal session started with terminal_run (persistent: true).",
        "inputSchema": _schema(
            {
                "session_id": {"type": "string", "description": "Session id from terminal_run / terminal_list_sessions."},
                "text": {"type": "string", "description": "Text (usually + Enter) to send to the process stdin."},
                "wait_ms": {"type": "integer", "description": "How long to wait before reading output (default 400ms)."},
            },
            ["session_id", "text"],
        ),
    },
    {
        "name": "terminal_list_sessions",
        "description": "List active persistent terminal sessions (id, command, cwd, state).",
        "inputSchema": _schema({}),
    },
    {
        "name": "terminal_read_output",
        "description": "Read (and consume) pending output from a persistent terminal session.",
        "inputSchema": _schema(
            {"session_id": {"type": "string", "description": "Session id."}},
            ["session_id"],
        ),
    },
    {
        "name": "terminal_kill",
        "description": "Terminate a persistent terminal session.",
        "inputSchema": _schema(
            {"session_id": {"type": "string", "description": "Session id."}},
            ["session_id"],
        ),
    },
    {
        "name": "list_directory",
        "description": "List a directory on the PC (files and folders with sizes).",
        "inputSchema": _schema(
            {
                "path": {"type": "string", "description": "Directory path (default: current directory)."},
                "hidden": {"type": "boolean", "description": "Include dotfiles."},
                "limit": {"type": "integer", "description": "Max entries (default 200)."},
            }
        ),
    },
    {
        "name": "create_directory",
        "description": "Create a directory (and parents) if it does not exist.",
        "inputSchema": _schema({"path": PATH_PROP}, ["path"]),
    },
    {
        "name": "copy_path",
        "description": "Copy a file or folder to a new path.",
        "inputSchema": _schema(
            {"source": PATH_PROP, "destination": PATH_PROP, "overwrite": {"type": "boolean"}},
            ["source", "destination"],
        ),
    },
    {
        "name": "move_path",
        "description": "Move/rename a file or folder.",
        "inputSchema": _schema({"source": PATH_PROP, "destination": PATH_PROP}, ["source", "destination"]),
    },
    {
        "name": "delete_path",
        "description": (
            "Delete a file or folder. WITHOUT confirm it only previews what would be deleted; "
            're-call with "confirm": true to actually delete. Never use on system-critical paths.'
        ),
        "inputSchema": _schema({"path": PATH_PROP, CONFIRM_KEY: CONFIRM_PROP}, ["path"]),
    },
    {
        "name": "download_file",
        "description": "Download an http(s) URL to a local file (size-capped).",
        "inputSchema": _schema(
            {"url": {"type": "string", "description": "http:// or https:// URL."}, "destination": PATH_PROP},
            ["url", "destination"],
        ),
    },
    {
        "name": "extract_archive",
        "description": "Extract .zip / .tar / .tar.gz / .tgz / .tar.bz2 / .tar.xz into a folder (default: next to the archive).",
        "inputSchema": _schema({"archive": PATH_PROP, "destination": PATH_PROP}, ["archive"]),
    },
    {
        "name": "git_clone",
        "description": "git clone a repository (requires Git on PATH).",
        "inputSchema": _schema(
            {
                "url": {"type": "string", "description": "Repository URL."},
                "destination": {"type": "string", "description": "Target folder (optional)."},
                "depth": {"type": "integer", "description": "Shallow clone depth (optional)."},
                "cwd": {"type": "string"},
            },
            ["url"],
        ),
    },
    {
        "name": "git_pull",
        "description": "git pull in a repository (requires Git on PATH).",
        "inputSchema": _schema({"cwd": PATH_PROP, "remote": {"type": "string"}, "branch": {"type": "string"}}, ["cwd"]),
    },
    {
        "name": "git_status",
        "description": "git status --short (or --branch) in a repository.",
        "inputSchema": _schema({"cwd": PATH_PROP, "short": {"type": "boolean"}}, ["cwd"]),
    },
    {
        "name": "git_checkout",
        "description": "git checkout a branch or ref (optional create: true => -b).",
        "inputSchema": _schema(
            {"branch": {"type": "string"}, "create": {"type": "boolean"}, "cwd": PATH_PROP},
            ["branch", "cwd"],
        ),
    },
    {
        "name": "process_list",
        "description": "List running processes (optional name/path filter).",
        "inputSchema": _schema({"name": {"type": "string"}, "limit": {"type": "integer"}}),
    },
    {
        "name": "process_is_running",
        "description": "Check whether a pid or process name is running.",
        "inputSchema": _schema({"pid": {"type": "integer"}, "name": {"type": "string"}}, ["name"]),
    },
    {
        "name": "process_start",
        "description": "Start a process (option wait: true to run to completion and capture output).",
        "inputSchema": _schema(
            {
                "command": {"type": "string", "description": "Executable or command line."},
                "cwd": {"type": "string"},
                "wait": {"type": "boolean"},
                "timeout": TIMEOUT_PROP,
            },
            ["command"],
        ),
    },
    {
        "name": "process_kill",
        "description": "Kill a process by pid or image name. Requires confirm: true.",
        "inputSchema": _schema(
            {"pid": {"type": "integer"}, "name": {"type": "string"}, "tree": {"type": "boolean"}, CONFIRM_KEY: CONFIRM_PROP},
            ["name"],
        ),
    },
    {
        "name": "registry_read",
        "description": "Read a Windows registry key (values + subkeys) or one value by name.",
        "inputSchema": _schema(
            {"key": {"type": "string", "description": "e.g. HKLM\\SOFTWARE\\Microsoft"}, "name": {"type": "string"}},
            ["key"],
        ),
    },
    {
        "name": "registry_write",
        "description": "Write a Windows registry value. Requires confirm: true.",
        "inputSchema": _schema(
            {
                "key": {"type": "string"},
                "name": {"type": "string"},
                "value": {},
                "type": {"type": "string", "description": "SZ | EXPAND_SZ | DWORD | QWORD | MULTI_SZ | BINARY"},
                CONFIRM_KEY: CONFIRM_PROP,
            },
            ["key", "name", "value"],
        ),
    },
    {
        "name": "service_start",
        "description": "Start a Windows service by name (may need elevation).",
        "inputSchema": _schema({"name": {"type": "string", "description": "Service short name, e.g. Spooler."}}, ["name"]),
    },
    {
        "name": "service_stop",
        "description": "Stop a Windows service by name. Requires confirm: true.",
        "inputSchema": _schema({"name": {"type": "string"}, CONFIRM_KEY: CONFIRM_PROP}, ["name"]),
    },
    {
        "name": "environment_get",
        "description": "Read an environment variable (or list process env when name is omitted).",
        "inputSchema": _schema({"name": {"type": "string"}, "scope": {"type": "string"}, "limit": {"type": "integer"}}),
    },
    {
        "name": "environment_set",
        "description": 'Set an environment variable (scope user | machine | process). machine requires confirm: true.',
        "inputSchema": _schema(
            {
                "name": {"type": "string"},
                "value": {"type": "string"},
                "scope": {"type": "string", "description": "user (default) | machine | process"},
                CONFIRM_KEY: CONFIRM_PROP,
            },
            ["name", "value"],
        ),
    },
    {
        "name": "vcpkg_install",
        "description": "vcpkg install a package (vcpkg must be on PATH or pass vcpkg_path).",
        "inputSchema": _schema(
            {
                "package": {"type": "string", "description": "e.g. fmt or fmt:x64-windows"},
                "triplet": {"type": "string"},
                "vcpkg_path": {"type": "string"},
                "timeout": TIMEOUT_PROP,
            },
            ["package"],
        ),
    },
    {
        "name": "vcpkg_integrate",
        "description": "vcpkg integrate install (system-wide; requires confirm and usually admin).",
        "inputSchema": _schema({"vcpkg_path": {"type": "string"}, CONFIRM_KEY: CONFIRM_PROP}),
    },
    {
        "name": "cmake_configure",
        "description": "cmake -S <source> -B <build> configure step.",
        "inputSchema": _schema(
            {
                "source_dir": PATH_PROP,
                "build_dir": {"type": "string"},
                "generator": {"type": "string"},
                "defines": {"type": "string", "description": "semicolon-separated -D values without -D"},
                "timeout": TIMEOUT_PROP,
            },
            ["source_dir"],
        ),
    },
    {
        "name": "cmake_build",
        "description": "cmake --build a configured build directory.",
        "inputSchema": _schema(
            {
                "build_dir": PATH_PROP,
                "config": {"type": "string", "description": "Debug | Release"},
                "target": {"type": "string"},
                "timeout": TIMEOUT_PROP,
            },
            ["build_dir"],
        ),
    },
    {
        "name": "msbuild_run",
        "description": "MSBuild a .vcxproj / .sln (finds MSBuild via vswhere if not on PATH).",
        "inputSchema": _schema(
            {
                "project": PATH_PROP,
                "config": {"type": "string"},
                "platform": {"type": "string"},
                "target": {"type": "string"},
                "restore": {"type": "boolean"},
                "timeout": TIMEOUT_PROP,
            },
            ["project"],
        ),
    },
    {
        "name": "cl_compile",
        "description": "Compile C/C++ sources with cl.exe (loads the VS x64 dev environment via vcvars).",
        "inputSchema": _schema(
            {
                "sources": {"type": "string", "description": "One path or ';'-separated list (array also accepted)."},
                "includes": {"type": "string"},
                "defines": {"type": "string"},
                "std": {"type": "string", "description": "e.g. c++17 or c++20"},
                "out_dir": {"type": "string"},
                "timeout": TIMEOUT_PROP,
            },
            ["sources"],
        ),
    },
    {
        "name": "clang_format_file",
        "description": "Run clang-format on a source file (in_place: true rewrites it; default prints formatted text).",
        "inputSchema": _schema(
            {
                "file": PATH_PROP,
                "style": {"type": "string"},
                "in_place": {"type": "boolean"},
                "clang_format_path": {"type": "string"},
            },
            ["file"],
        ),
    },
    {
        "name": "clang_tidy_run",
        "description": "Run clang-tidy on a translation unit (optional --fix).",
        "inputSchema": _schema(
            {
                "file": PATH_PROP,
                "checks": {"type": "string"},
                "fix": {"type": "boolean"},
                "compile_args": {"type": "string"},
                "clang_tidy_path": {"type": "string"},
                "timeout": TIMEOUT_PROP,
            },
            ["file"],
        ),
    },
    {
        "name": "project_add_item_from_path",
        "description": "Add an existing source/header file to a .vcxproj/.csproj by path (picks ClCompile/ClInclude/None from extension). Reload the project in VS Code after.",
        "inputSchema": _schema({"project": PATH_PROP, "path": PATH_PROP, "item_type": {"type": "string"}}, ["project", "path"]),
    },
    {
        "name": "project_remove_item",
        "description": "Remove an item from a .vcxproj by its Include path. Requires confirm: true.",
        "inputSchema": _schema({"project": PATH_PROP, "path": {"type": "string"}, CONFIRM_KEY: CONFIRM_PROP}, ["project", "path"]),
    },
    {
        "name": "project_rename_item",
        "description": "Rename an item's Include path in a .vcxproj (optional rename_file: true also renames on disk).",
        "inputSchema": _schema(
            {"project": PATH_PROP, "old_path": {"type": "string"}, "new_path": {"type": "string"}, "rename_file": {"type": "boolean"}},
            ["project", "old_path", "new_path"],
        ),
    },
    {
        "name": "project_set_include_dirs",
        "description": "Set AdditionalIncludeDirectories on a .vcxproj (semicolon list; keeps %(AdditionalIncludeDirectories)).",
        "inputSchema": _schema(
            {"project": PATH_PROP, "dirs": {"type": "string"}, "append": {"type": "boolean"}},
            ["project", "dirs"],
        ),
    },
    {
        "name": "project_set_lib_dirs",
        "description": "Set AdditionalLibraryDirectories (Link) on a .vcxproj.",
        "inputSchema": _schema({"project": PATH_PROP, "dirs": {"type": "string"}, "append": {"type": "boolean"}}, ["project", "dirs"]),
    },
    {
        "name": "project_add_lib",
        "description": "Add a .lib to Link AdditionalDependencies on a .vcxproj.",
        "inputSchema": _schema({"project": PATH_PROP, "lib": {"type": "string"}}, ["project", "lib"]),
    },
    {
        "name": "project_set_subsystem",
        "description": "Set Link SubSystem (Console | Windows | ...) on a .vcxproj.",
        "inputSchema": _schema({"project": PATH_PROP, "subsystem": {"type": "string"}}, ["project", "subsystem"]),
    },
    {
        "name": "project_set_cpp_standard",
        "description": "Set ClCompile LanguageStandard (stdcpp17, stdcpp20, ...) on a .vcxproj.",
        "inputSchema": _schema({"project": PATH_PROP, "standard": {"type": "string"}}, ["project", "standard"]),
    },
    {
        "name": "project_add_preprocessor",
        "description": "Set PreprocessorDefinitions (ClCompile) on a .vcxproj.",
        "inputSchema": _schema({"project": PATH_PROP, "defines": {"type": "string"}}, ["project", "defines"]),
    },
    {
        "name": "vs_open_settings",
        "description": "Open VS Code Settings (optional query). Needs VS Code running with the MCP extension.",
        "inputSchema": _schema({"page": {"type": "string", "description": "Optional options page, e.g. 'TextEditor'."}}),
    },
    {
        "name": "vs_install_extension",
        "description": "Install a VS Code extension by id (default nabheet.vscode-ide-mcp) or a local .vsix path.",
        "inputSchema": _schema({"vsix": {"type": "string"}, "url": {"type": "string"}}),
    },
    {
        "name": "editor_format_document",
        "description": "Format the active document in VS Code. Needs VS Code running and a file focused.",
        "inputSchema": _schema({}),
    },
    {
        "name": "editor_reload_document",
        "description": "Reload the active document from disk (discard unsaved VS Code edits for that file).",
        "inputSchema": _schema({}),
    },
]

SYS_HANDLERS = {
    "terminal_run": terminal_run_dispatch,
    "terminal_run_elevated": terminal_run_elevated,
    "terminal_send": terminal_send,
    "terminal_list_sessions": terminal_list_sessions,
    "terminal_read_output": terminal_read_output,
    "terminal_kill": terminal_kill,
    "list_directory": list_directory,
    "create_directory": create_directory,
    "copy_path": copy_path,
    "move_path": move_path,
    "delete_path": delete_path,
    "download_file": download_file,
    "extract_archive": extract_archive,
    "git_clone": git_clone,
    "git_pull": git_pull,
    "git_status": git_status,
    "git_checkout": git_checkout,
    "process_list": process_list,
    "process_is_running": process_is_running,
    "process_start": process_start,
    "process_kill": process_kill,
    "registry_read": registry_read,
    "registry_write": registry_write,
    "service_start": service_start,
    "service_stop": service_stop,
    "environment_get": environment_get,
    "environment_set": environment_set,
    "vcpkg_install": vcpkg_install,
    "vcpkg_integrate": vcpkg_integrate,
    "cmake_configure": cmake_configure,
    "cmake_build": cmake_build,
    "msbuild_run": msbuild_run,
    "cl_compile": cl_compile,
    "clang_format_file": clang_format_file,
    "clang_tidy_run": clang_tidy_run,
    "project_add_item_from_path": project_add_item_from_path,
    "project_remove_item": project_remove_item,
    "project_rename_item": project_rename_item,
    "project_set_include_dirs": project_set_include_dirs,
    "project_set_lib_dirs": project_set_lib_dirs,
    "project_add_lib": project_add_lib,
    "project_set_subsystem": project_set_subsystem,
    "project_set_cpp_standard": project_set_cpp_standard,
    "project_add_preprocessor": project_add_preprocessor,
    "vs_open_settings": vs_open_settings,
    "vs_install_extension": vs_install_extension,
    "editor_format_document": editor_format_document,
    "editor_reload_document": editor_reload_document,
}
