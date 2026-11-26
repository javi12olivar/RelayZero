:: SPDX-License-Identifier: GPL-3.0-or-later
@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title RelayZero Bridge
cd /d "%~dp0"

if not exist "%~dp0logs" mkdir "%~dp0logs" >nul 2>nul
set "LOGFILE=%~dp0logs\start.log"
call :log "===== %DATE% %TIME%  start.bat launched ====="
REM Log the Windows build once per launch - most support requests arrive as a
REM single terminal screenshot, so anything that identifies the machine's
REM environment must be either ON SCREEN or in this log.
for /f "tokens=*" %%v in ('ver') do call :log "%%v"

echo.
echo   === RelayZero Bridge ===
echo.

REM Refuse to run from inside a ZIP preview: Explorer extracts start.bat alone
REM to %TEMP%, so bridge.py is missing and the launch fails with a confusing
REM Python error. Detect the missing file up front with a plain explanation -
REM this is one of the most common first-run mistakes.
if not exist "%~dp0bridge.py" (
    echo   ERROR: bridge.py not found next to start.bat.
    echo.
    echo   If you opened start.bat from inside the downloaded ZIP, first EXTRACT
    echo   the whole ZIP ^(right-click, "Extract All..."^), then run start.bat
    echo   from the extracted folder.
    echo.
    call :log "FATAL: bridge.py missing next to start.bat (run from inside ZIP?)."
    pause
    exit /b 1
)

call "%~dp0install-dependencies.bat" /from-start
if errorlevel 1 goto :dependency_install_failed

REM --- 1. Find Python ---------------------------------------------------------
echo   [1/5] Looking for Python...
set "PY="

REM Prefer the py launcher - it never resolves to the Microsoft Store stub.
where py >nul 2>nul && set "PY=py -3"
call :validate_py && goto :found

REM Fall back to python on PATH, but skip the Store stub (WindowsApps) which
REM cannot run pip and silently fails.
set "PY=python"
call :validate_py && goto :found

REM Last resort: scan the standard install folders directly. Covers the common
REM case where Python was installed WITHOUT "Add to PATH" and without the py
REM launcher, so neither "py" nor "python" resolves. Newest version first.
for %%R in (
    "%LOCALAPPDATA%\Programs\Python"
    "%ProgramFiles%"
    "%ProgramFiles(x86)%"
) do (
    if exist "%%~R" (
        for /f "delims=" %%D in ('dir /b /ad /o-n "%%~R\Python3*" 2^>nul') do (
            if exist "%%~R\%%D\python.exe" (
                set PY="%%~R\%%D\python.exe"
                call :validate_py && goto :found
            )
        )
    )
)

set "PY="
call :log "Python not found on PATH or in standard install folders."
goto :need_install

:found
REM Print the exact interpreter VERSION on screen (not just the launcher name):
REM a user screenshot must tell us whether the failure is a too-old Python
REM without asking them to run anything else.
REM "call" prefix: when %PY% is a quoted full path (the no-PATH scan case), a
REM bare quoted command inside for /f trips cmd's leading-quote stripping rule;
REM call re-parses the line and keeps the quotes intact.
for /f "tokens=*" %%v in ('call %PY% --version 2^>^&1') do (
    echo         Found: %PY%  ^(%%v^)
    call :log "Python found: %PY% (%%v)"
)
goto :install_deps

:need_install
REM --- Python not found, try winget -------------------------------------------
REM winget itself may be absent (LTSC / old Win10 / stripped installs). Without
REM this check the "winget" line fails with an unrelated "not recognized" error
REM that users screenshot without context - name the real problem instead.
where winget >nul 2>nul
if errorlevel 1 (
    echo   ERROR: Python is not installed and winget ^(Windows package manager^)
    echo   is not available on this PC, so it cannot be installed automatically.
    echo.
    echo   Install Python manually: https://www.python.org/downloads/
    echo   IMPORTANT: tick "Add python.exe to PATH", then run start.bat again.
    echo.
    call :log "FATAL: no Python and no winget on this machine."
    pause
    exit /b 1
)
echo         Not found. Installing via winget...
echo.
winget install --id Python.Python.3.12 --source winget --accept-package-agreements --accept-source-agreements
if errorlevel 1 call :log "winget install returned an error (see console output above)."
echo.
echo   Checking again...
set "PY=py -3"
call :validate_py && goto :ready
set "PY=python"
call :validate_py && goto :ready
REM A winget install does NOT refresh THIS console's PATH, so "py"/"python" can
REM stay unresolvable in the very session that installed them. Rescan the
REM standard install folders directly (same scan as the pre-install fallback)
REM before telling the user it failed - a plain restart-and-retry would have
REM worked, so we do its equivalent for them.
for %%R in (
    "%LOCALAPPDATA%\Programs\Python"
    "%ProgramFiles%"
    "%ProgramFiles(x86)%"
) do (
    if exist "%%~R" (
        for /f "delims=" %%D in ('dir /b /ad /o-n "%%~R\Python3*" 2^>nul') do (
            if exist "%%~R\%%D\python.exe" (
                set PY="%%~R\%%D\python.exe"
                call :validate_py && goto :ready
            )
        )
    )
)
echo.
echo   ERROR: Python not found after install.
echo   Install manually: https://www.python.org/downloads/
echo   Tick "Add python.exe to PATH" then run this again.
echo.
call :log "FATAL: no usable Python found even after winget install."
pause
exit /b 1
:ready
echo         Python ready!
call :log "Python ready after winget install: %PY%"

:install_deps
REM --- 2. Install websockets --------------------------------------------------
echo.
echo   [2/5] Checking websockets library...
%PY% -c "import websockets,sys; sys.exit(0 if websockets.__version__.split('.')[0] == '15' else 1)" >nul 2>nul
if errorlevel 1 (
    echo         Installing websockets - first time only...
    %PY% -m pip install --user -r "%~dp0requirements.txt"
    if errorlevel 1 (
        echo.
        echo   ERROR: Could not install websockets ^(see pip output above^).
        echo   Common causes: no internet, a firewall/antivirus blocking pip,
        echo   or Python has no working pip. If you used the Microsoft Store
        echo   python, install from https://www.python.org/downloads/ instead
        echo   ^(tick "Add to PATH"^).
        echo.
        call :log "FATAL: pip install websockets failed."
        pause
        exit /b 1
    )
)
echo         OK
call :log "websockets library OK"

REM --- 3. Check Node.js and install the bundled REA dependencies --------------
echo.
echo   [3/5] Checking Node.js and REA...
where node >nul 2>nul
if errorlevel 1 goto :node_required
where npm >nul 2>nul
if errorlevel 1 goto :node_required
node -e "const [major,minor,patch]=process.versions.node.split('.').map(Number);process.exit((!process.versions.node.includes('-')&&(((major===22&&(minor>23||(minor===23&&patch>=4)))||(major===24&&(minor>22||(minor===22&&patch>=1)))||(major===26&&(minor>12||(minor===12&&patch>=1)))||major>=27)))?0:1)" >nul 2>nul
if errorlevel 1 goto :node_required
if not exist "%~dp0vendor\rea-agents\node_modules\.relayzero-ready" (
    echo         Installing REA dependencies in the project folder - first run only...
    pushd "%~dp0vendor\rea-agents"
    if errorlevel 1 goto :rea_install_failed
    call npm ci --omit=dev --omit=optional
    if errorlevel 1 goto :rea_install_failed
    type nul > "%~dp0vendor\rea-agents\node_modules\.relayzero-ready"
    popd
)
echo         Node.js and REA ready.
call :log "Node.js and bundled REA dependencies OK"

REM --- 4. Check VS Code + the MCP extension --------------------------------
echo.
echo   [4/5] Checking VS Code and the MCP extension...
set "FOUND_CODE="
if exist "%LOCALAPPDATA%\Programs\Microsoft VS Code\Code.exe" set "FOUND_CODE=1"
if exist "%ProgramFiles%\Microsoft VS Code\Code.exe" set "FOUND_CODE=1"
if exist "%ProgramFiles(x86)%\Microsoft VS Code\Code.exe" set "FOUND_CODE=1"
if not defined FOUND_CODE (
    echo         WARNING: VS Code does not seem to be installed.
    echo         Start.bat continues, but the AI cannot do anything until
    echo         VS Code is installed. Get it at https://code.visualstudio.com/
    call :log "WARNING: VS Code not found."
)
%PY% "%~dp0launch_vscode_mcp.py" --check >nul 2>nul
if errorlevel 1 goto :check_vscode_extension
echo         VS Code + MCP extension: OK
goto :mcp_checked
:check_vscode_extension
call %CODE% --list-extensions 2>nul | findstr /i /x "nabheet.vscode-ide-mcp" >nul
if not errorlevel 1 (
    echo         The MCP extension is installed. Open VS Code with a folder and reload the window.
    call :log "VS Code MCP extension installed; server not reachable yet."
    goto :mcp_checked
)
goto :offer_vscode_mcp_install
:offer_vscode_mcp_install
echo         The MCP extension is not installed yet (or VS Code is closed).
echo.
set "INSTALL_VSCODE_MCP="
set /p INSTALL_VSCODE_MCP="         Show install instructions now? [Y/n] "
if /i "!INSTALL_VSCODE_MCP!"=="n" goto :mcp_declined
if /i "!INSTALL_VSCODE_MCP!"=="no" goto :mcp_declined
echo.
echo   Install the MCP extension in VS Code:
echo     Ctrl+Shift+X, search for "MCP Server" (nabheet.vscode-ide-mcp)
echo     or run:
echo       code --install-extension nabheet.vscode-ide-mcp
echo     marketplace:
echo     https://marketplace.visualstudio.com/items?itemName=nabheet.vscode-ide-mcp
echo   Open a folder/workspace in VS Code, then run: Developer: Reload Window
echo   Then verify with: %PY% "%~dp0launch_vscode_mcp.py" --check
echo.
pause
goto :mcp_checked
:mcp_declined
echo         Skipped. Install it later, then check with:
echo           %PY% "%~dp0launch_vscode_mcp.py" --check
call :log "User declined automatic VS Code MCP install instructions."
:mcp_checked
call :log "VS Code/MCP check done."

REM --- 5. Run the bridge ------------------------------------------------------
echo.
echo   [5/5] Starting bridge...

REM Do not terminate an arbitrary process if the default bridge port is busy.
set "OLDPID="
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :17613 ^| findstr LISTENING 2^>nul') do set "OLDPID=%%a"
if defined OLDPID (
    echo   ERROR: port 17613 is already used by pid !OLDPID!.
    echo   Close the RelayZero bridge if it is already running, then retry.
    echo   This launcher leaves the existing process untouched.
    call :log "FATAL: port 17613 is already used by pid !OLDPID!; left it untouched."
    pause
    exit /b 1
)

echo.
echo  ############################################################
echo  ##                                                        ##
echo  ##   KEEP THIS TERMINAL OPEN - DO NOT CLOSE THIS WINDOW   ##
echo  ##                                                        ##
echo  ##   RelayZero stops working if you close it. Just       ##
echo  ##   minimize this window and leave it running.           ##
echo  ##                                                        ##
echo  ############################################################
echo.
call :log "Launching bridge.py with %PY%"
%PY% "%~dp0bridge.py"
REM Show the exit code ON SCREEN, not only in the log: a screenshot of this
REM terminal is usually the only diagnostic we get, and "Bridge stopped" alone
REM does not say whether it crashed (non-zero) or was closed normally.
set "BRIDGE_EXIT=%errorlevel%"
call :log "bridge.py exited with code %BRIDGE_EXIT%"

echo.
if not "%BRIDGE_EXIT%"=="0" (
    echo   Bridge stopped with ERROR code %BRIDGE_EXIT% - scroll up for the Python
    echo   error message and include THIS WHOLE WINDOW in any bug report.
    echo   Log file: logs\start.log
) else (
    echo   Bridge stopped normally.
)
echo   Press any key to close.
pause >nul
exit /b 0

:node_required
echo.
echo   ERROR: This project needs Node.js 22.23.4+, 24.22.1+, or 26.12.1+ plus npm.
echo   Install a supported Node.js release from https://nodejs.org/ then retry.
call :log "FATAL: supported Node.js/npm is required for bundled REA."
pause
exit /b 1

:rea_install_failed
echo.
echo   ERROR: Could not install REA dependencies. Check internet access and npm output.
call :log "FATAL: npm ci failed for vendor/rea-agents."
pause
exit /b 1

REM --- Installer failure ------------------------------------------------------
:dependency_install_failed
echo.
echo   Dependency installation failed. See install-dependencies.bat output above.
call :log "FATAL: install-dependencies.bat failed."
pause
exit /b 1

REM --- Subroutine: verify %PY% is a real, usable Python ------------------------
REM Returns 0 only if the interpreter runs, has a working pip, AND is Python 3.9
REM or newer. The pip check rejects the Microsoft Store stub (WindowsApps\
REM python.exe). The version check rejects old interpreters (e.g. 3.7/3.8) that
REM lack asyncio.to_thread, which the bridge requires.
:validate_py
%PY% -m pip --version >nul 2>nul || exit /b 1
%PY% -c "import sys; sys.exit(0 if sys.version_info >= (3, 9) else 1)" >nul 2>nul
exit /b %errorlevel%

REM --- Subroutine: append a line to start.log (best-effort, never blocks) -----
:log
REM Redirect FIRST, then echo. With the redirect at the end, a message that
REM ENDS IN A DIGIT (e.g. "exited with code 0") makes cmd parse "0>>" as a
REM file-handle redirect: the digit is eaten and the line prints to the console
REM instead of the log (seen live). echo( is the safe echo form for arbitrary text.
>>"%LOGFILE%" 2>nul echo(%~1
exit /b 0


