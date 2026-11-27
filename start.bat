:: SPDX-License-Identifier: GPL-3.0-or-later
@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title RelayZero Bridge
cd /d "%~dp0"

if not exist "%~dp0logs" mkdir "%~dp0logs" >nul 2>nul
set "LOGFILE=%~dp0logs\start.log"
call :log "===== %DATE% %TIME%  start.bat launched ====="
for /f "tokens=*" %%v in ('ver') do call :log "%%v"

echo.
echo   === RelayZero Bridge ===
echo   Starting the local bridge. Dependencies are not installed or updated here.
echo.

if not exist "%~dp0bridge.py" (
    echo   ERROR: bridge.py is missing next to start.bat.
    echo   Extract the full project folder before running this file.
    call :log "FATAL: bridge.py missing next to start.bat."
    pause
    exit /b 1
)

echo   Checking Python and websockets...
set "PY="
where py >nul 2>nul && set "PY=py -3"
if defined PY (call :validate_bridge_python && goto :python_ready)
set "PY=python"
call :validate_bridge_python && goto :python_ready
set "PY="
for %%R in ("%LOCALAPPDATA%\Programs\Python" "%ProgramFiles%" "%ProgramFiles(x86)%") do (
    if exist "%%~R" (
        for /f "delims=" %%D in ('dir /b /ad /o-n "%%~R\Python3*" 2^>nul') do (
            if exist "%%~R\%%D\python.exe" (
                set "PY="%%~R\%%D\python.exe""
                call :validate_bridge_python && goto :python_ready
            )
        )
    )
)
goto :dependencies_required

:python_ready
for /f "tokens=*" %%v in ('call %PY% --version 2^>^&1') do echo   [OK] %%v with websockets

REM REA is a core server: confirm its runtime setup exists without installing it.
where node >nul 2>nul || goto :dependencies_required
where npm >nul 2>nul || goto :dependencies_required
powershell -NoProfile -NonInteractive -Command "$raw=(node --version).TrimStart(''v''); if ($raw.Contains(''-'')) { exit 1 }; $v=[version]$raw; $ok=(($v.Major -eq 22) -and ($v -ge [version]''22.23.4'')) -or (($v.Major -eq 24) -and ($v -ge [version]''24.22.1'')) -or (($v.Major -eq 26) -and ($v -ge [version]''26.12.1'')) -or ($v.Major -ge 27); if ($ok) { exit 0 }; exit 1" >nul 2>nul
if errorlevel 1 goto :dependencies_required
if not exist "%~dp0vendor\rea-agents\node_modules\.relayzero-ready" goto :dependencies_required
echo   [OK] Node.js and bundled REA dependencies

REM Do not terminate another process if RelayZero's port is already occupied.
set "OLDPID="
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :17613 ^| findstr LISTENING 2^>nul') do set "OLDPID=%%a"
if defined OLDPID (
    echo   ERROR: port 17613 is already used by pid !OLDPID!.
    echo   Close the existing RelayZero bridge before starting another one.
    call :log "FATAL: port 17613 is already used by pid !OLDPID!; left it untouched."
    pause
    exit /b 1
)

echo.
echo   RelayZero bridge is running. Keep this window open while using it.
echo   Press Ctrl+C to stop the bridge.
echo.
call :log "Launching bridge.py with %PY%"
%PY% "%~dp0bridge.py"
set "BRIDGE_EXIT=%errorlevel%"
call :log "bridge.py exited with code %BRIDGE_EXIT%"
if not "%BRIDGE_EXIT%"=="0" (
    echo.
    echo   Bridge stopped with error code %BRIDGE_EXIT%. See logs\start.log.
)
exit /b %BRIDGE_EXIT%

:dependencies_required
echo.
echo   ERROR: Required dependencies are missing or incompatible.
echo   Run install-dependencies.bat once, then run start.bat again.
call :log "FATAL: prerequisites missing; asked user to run install-dependencies.bat."
pause
exit /b 1

:validate_bridge_python
%PY% -c "import sys,websockets; sys.exit(0 if sys.version_info >= (3, 9) and websockets.__version__.split('.')[0] == '15' else 1)" >nul 2>nul
exit /b %errorlevel%

:log
>>"%LOGFILE%" 2>nul echo(%~1
exit /b 0
