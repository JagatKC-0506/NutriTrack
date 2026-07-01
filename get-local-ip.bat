@echo off
REM Get Local IP Address Script (Windows)
REM Use this to find your computer's IP address for mobile app connection

echo.
echo 🌐 Finding your computer's IP address...
echo.

REM Get IP address using ipconfig and findstr
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4 Address"') do (
    set "IP=%%a"
    REM Remove leading spaces
    for /f "tokens=*" %%b in ("!IP!") do set "IP=%%b"
)

if not defined IP (
    echo ❌ Could not find IP address!
    echo    Make sure you're connected to WiFi or Ethernet
    pause
    exit /b 1
)

echo ✅ Your computer's IP address is: %IP%
echo.
echo 📝 Next steps:
echo    1. Update FrontEnd\.env.production with: VITE_API_URL=http://%IP%:8000
echo    2. Rebuild the app: setup-mobile-complete.bat
echo    3. Make sure your phone is on the same WiFi network
echo.
echo Quick command to update .env.production:
echo    For Windows CMD:
echo       (echo # Production API URL - Set this to your computer's local IP) > FrontEnd\.env.production
echo       (echo VITE_API_URL=http://%IP%:8000) >> FrontEnd\.env.production
echo.
echo    For PowerShell:
echo       @"^
echo # Production API URL - Set this to your computer's local IP
echo VITE_API_URL=http://%IP%:8000
echo "@ ^| Out-File FrontEnd\.env.production
echo.
pause
