@echo off
setlocal enabledelayedexpansion

if "%~1"=="" (
    echo ===================================================================
    echo Antigravity Master Skills Installer
    echo ===================================================================
    echo Usage: install-skills-to-other-project.bat "C:\Path\To\Your\Other\Project"
    echo.
    echo Please provide the target project path.
    exit /b 1
)

set "TARGET_PATH=%~1"
set "SOURCE_DIR=%~dp0.agents"

echo Installing skills into: "%TARGET_PATH%"...

if not exist "%TARGET_PATH%\.agents\skills" mkdir "%TARGET_PATH%\.agents\skills"
if not exist "%TARGET_PATH%\.agents\rules" mkdir "%TARGET_PATH%\.agents\rules"

xcopy /E /I /Y /Q "%SOURCE_DIR%\skills\*" "%TARGET_PATH%\.agents\skills"
xcopy /E /I /Y /Q "%SOURCE_DIR%\rules\*" "%TARGET_PATH%\.agents\rules"

if not exist "%TARGET_PATH%\GEMINI.md" (
    copy /Y "%~dp0GEMINI.md" "%TARGET_PATH%\GEMINI.md" >nul
)

echo.
echo [SUCCESS] All 9 UI/UX Design and Engineering Skills installed in "%TARGET_PATH%"!
exit /b 0
