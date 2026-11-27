:: SPDX-License-Identifier: GPL-3.0-or-later

@echo off

chcp 65001 >nul

cd /d "%~dp0"

echo.

echo   === RelayZero dependency installer ===

echo   Missing dependencies will be installed; existing compatible installs are kept.

echo.

goto :main

:find_python

set "PY="

where py >nul 2>nul && set "PY=py -3"

if defined PY (call :validate_py && exit /b 0)

set "PY=python"

call :validate_py && exit /b 0

set "PY="

for %%R in ("%LOCALAPPDATA%\Programs\Python" "%ProgramFiles%" "%ProgramFiles(x86)%") do (

    if exist "%%~R" (

        for /f "delims=" %%D in ('dir /b /ad /o-n "%%~R\Python3*" 2^>nul') do (

            if exist "%%~R\%%D\python.exe" (

                set "PY=%%~R\%%D\python.exe"

                call :validate_py && exit /b 0

            )

        )

    )

)

set "PY="

exit /b 1

:validate_py

%PY% -m pip --version >nul 2>nul || exit /b 1

%PY% -c "import sys; sys.exit(0 if sys.version_info >= (3, 9) else 1)" >nul 2>nul

exit /b %errorlevel%

:node_supported

where node >nul 2>nul || exit /b 1

powershell -NoProfile -NonInteractive -Command "$raw=(node --version).TrimStart('v'); if ($raw.Contains('-')) { exit 1 }; $v=[version]$raw; $ok=(($v.Major -eq 22) -and ($v -ge [version]'22.23.4')) -or (($v.Major -eq 24) -and ($v -ge [version]'24.22.1')) -or (($v.Major -eq 26) -and ($v -ge [version]'26.12.1')) -or ($v.Major -ge 27); if ($ok) { exit 0 }; exit 1" >nul 2>nul

exit /b %errorlevel%

:refresh_node_path

if exist "%ProgramFiles%\nodejs\node.exe" set "PATH=%ProgramFiles%\nodejs;%PATH%"

if exist "%ProgramFiles(x86)%\nodejs\node.exe" set "PATH=%ProgramFiles(x86)%\nodejs;%PATH%"

if exist "%LOCALAPPDATA%\Programs\nodejs\node.exe" set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"

exit /b 0

:find_code

set "CODE="

where code >nul 2>nul && set "CODE=code"

if defined CODE exit /b 0

if exist "%LOCALAPPDATA%\Programs\Microsoft VS Code\bin\code.cmd" set "CODE="%LOCALAPPDATA%\Programs\Microsoft VS Code\bin\code.cmd""

if defined CODE exit /b 0

if exist "%ProgramFiles%\Microsoft VS Code\bin\code.cmd" set "CODE="%ProgramFiles%\Microsoft VS Code\bin\code.cmd""

if defined CODE exit /b 0

if exist "%ProgramFiles(x86)%\Microsoft VS Code\bin\code.cmd" set "CODE="%ProgramFiles(x86)%\Microsoft VS Code\bin\code.cmd""

exit /b 0

:refresh_code_path

if exist "%LOCALAPPDATA%\Programs\Microsoft VS Code\bin" set "PATH=%LOCALAPPDATA%\Programs\Microsoft VS Code\bin;%PATH%"

if exist "%ProgramFiles%\Microsoft VS Code\bin" set "PATH=%ProgramFiles%\Microsoft VS Code\bin;%PATH%"

if exist "%ProgramFiles(x86)%\Microsoft VS Code\bin" set "PATH=%ProgramFiles(x86)%\Microsoft VS Code\bin;%PATH%"

exit /b 0

:find_browser

set "BROWSER="

where msedge >nul 2>nul && set "BROWSER=Edge"

if defined BROWSER exit /b 0

where chrome >nul 2>nul && set "BROWSER=Chrome"

if defined BROWSER exit /b 0

if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" set "BROWSER=Edge"

if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" set "BROWSER=Edge"

if exist "%LOCALAPPDATA%\Microsoft\Edge\Application\msedge.exe" set "BROWSER=Edge"

if defined BROWSER exit /b 0

if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "BROWSER=Chrome"

if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "BROWSER=Chrome"

if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" set "BROWSER=Chrome"

exit /b 0

:require_winget

where winget >nul 2>nul && exit /b 0

echo   ERROR: winget is unavailable, so missing applications cannot be installed automatically.

echo   Install manually from https://www.python.org/downloads/ , https://nodejs.org/ ,

echo   https://code.visualstudio.com/ , https://www.microsoft.com/edge and the VS Code extension at
echo   https://marketplace.visualstudio.com/items?itemName=nabheet.vscode-ide-mcp

exit /b 1

:failed

echo.

echo   ERROR: dependency setup did not complete.

echo   Check the command output above, internet access, and any Windows installer prompts.

echo   Node.js must be 22.23.4+, 24.22.1+, or 26.12.1+.

echo   Re-run install-dependencies.bat after fixing the problem.

echo.


pause


exit /b 1

:main
REM Python 3.9+ and pip -------------------------------------------------------

call :find_python

if errorlevel 1 goto :install_python

echo   [OK] Python: %PY%

goto :python_ready

:install_python

echo   [INSTALL] Python 3.12...

call :require_winget || goto :failed

winget install --id Python.Python.3.12 --exact --source winget --silent --accept-package-agreements --accept-source-agreements

if errorlevel 1 goto :failed

call :find_python

if errorlevel 1 goto :failed

echo   [OK] Python installed: %PY%

:python_ready

%PY% -c "import websockets,sys; sys.exit(0 if websockets.__version__.split('.')[0] == '15' else 1)" >nul 2>nul

if not errorlevel 1 (

    echo   [OK] Python websockets library

) else (

    echo   [INSTALL] Python websockets library...

    %PY% -m pip install --user -r "%~dp0requirements.txt"

    if errorlevel 1 goto :failed

    %PY% -c "import websockets,sys; sys.exit(0 if websockets.__version__.split('.')[0] == '15' else 1)" >nul 2>nul

    if errorlevel 1 goto :failed

)

REM Node.js version required by bundled REA -----------------------------------

call :node_supported

if not errorlevel 1 goto :node_ready

where node >nul 2>nul

if errorlevel 1 goto :install_node

echo   [UPDATE] Updating Node.js LTS to a REA-compatible version...

call :require_winget || goto :failed

winget upgrade --id OpenJS.NodeJS.LTS --exact --source winget --silent --accept-package-agreements --accept-source-agreements

call :refresh_node_path

call :node_supported

if not errorlevel 1 goto :node_ready

echo   [RETRY] WinGet did not upgrade the detected Node.js package; forcing the current LTS installer...

winget install --id OpenJS.NodeJS.LTS --exact --source winget --silent --force --accept-package-agreements --accept-source-agreements

set "NODE_INSTALL_EXIT=%errorlevel%"

call :refresh_node_path

call :node_supported

if not errorlevel 1 goto :node_ready

goto :node_failed

:install_node

echo   [INSTALL] Node.js LTS...

call :require_winget || goto :failed

winget install --id OpenJS.NodeJS.LTS --exact --source winget --silent --accept-package-agreements --accept-source-agreements

set "NODE_INSTALL_EXIT=%errorlevel%"

call :refresh_node_path

call :node_supported

if not errorlevel 1 goto :node_ready

goto :node_failed

:node_failed

echo   [ERROR] Could not install a REA-compatible Node.js version.

echo   WinGet install exit code: %NODE_INSTALL_EXIT%

where node 2>nul

node --version 2>nul

goto :failed

:node_ready

echo   [OK] Node.js is REA-compatible.
REM VS Code -------------------------------------------------------------------

call :find_code

if defined CODE goto :vscode_ready

echo   [INSTALL] Visual Studio Code...

call :require_winget || goto :failed

winget install --id Microsoft.VisualStudioCode --exact --source winget --silent --accept-package-agreements --accept-source-agreements

if errorlevel 1 goto :failed

call :refresh_code_path

call :find_code

if not defined CODE goto :failed

:vscode_ready

echo   [OK] Visual Studio Code found.

call %CODE% --list-extensions 2>nul | findstr /i /x "nabheet.vscode-ide-mcp" >nul

if errorlevel 1 (

    echo   [INSTALL] VS Code MCP extension nabheet.vscode-ide-mcp...

    call %CODE% --install-extension nabheet.vscode-ide-mcp

    if errorlevel 1 goto :failed

)

call %CODE% --list-extensions 2>nul | findstr /i /x "nabheet.vscode-ide-mcp" >nul

if errorlevel 1 goto :failed

echo   [OK] VS Code MCP extension

REM A supported browser is required to load the RelayZero extension -----------

call :find_browser

if defined BROWSER goto :browser_ready

echo   [INSTALL] Microsoft Edge (no Chrome/Edge browser found)...

call :require_winget || goto :failed

winget install --id Microsoft.Edge --exact --source winget --silent --accept-package-agreements --accept-source-agreements

if errorlevel 1 goto :failed

call :find_browser

if not defined BROWSER goto :failed

:browser_ready

echo   [OK] Browser found: %BROWSER%

REM Install REA's published, lockfile-pinned production dependencies -----------
if not exist "%~dp0vendor\rea-agents\npm-shrinkwrap.json" goto :failed
if exist "%~dp0vendor\rea-agents\node_modules\.relayzero-ready" goto :rea_ready
echo   [INSTALL] Bundled REA dependencies on first run...
pushd "%~dp0vendor\rea-agents"
if errorlevel 1 goto :failed
call npm ci --omit=dev --omit=optional
if errorlevel 1 (
    popd
    goto :failed
)
popd
type nul > "%~dp0vendor\rea-agents\node_modules\.relayzero-ready"
:rea_ready
echo   [OK] Bundled REA dependencies

echo.

echo   All dependencies are ready.

echo   One manual browser step remains: open chrome://extensions or edge://extensions,

echo   enable Developer mode, and Load unpacked: "%~dp0relayzero-extension"

echo   Then run start.bat.

echo.

pause
exit /b 0



