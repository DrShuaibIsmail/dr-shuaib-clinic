@echo off
title Dr. Shuaib Project Runner
setlocal
cd /d "%~dp0"

echo ========================================
echo   Starting Dr. Shuaib Medical Project
echo ========================================
echo.

if not exist "web" (
    echo [ERROR] The 'web' directory was not found. 
    echo Make sure you are running this file from the project root.
    pause
    exit /b
)

cd web

:: Check if node_modules exists
if not exist "node_modules" (
    echo [INFO] node_modules not found. Installing dependencies...
    call pnpm install
)

echo [INFO] Running the development server...
echo [INFO] Once ready, open: http://localhost:3000
echo.

call pnpm run dev

if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Failed to start with pnpm. Trying with npm...
    call npm run dev
)

pause
