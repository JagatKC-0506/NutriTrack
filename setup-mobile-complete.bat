@echo off
setlocal enabledelayedexpansion

REM Complete Mobile App Setup Script (Windows)
REM This script will configure, build, and prepare your NutriTrack mobile app
REM No ngrok required - uses local network IP for direct connection

echo.
echo 🚀 NutriTrack Mobile App - Complete Setup
echo ==========================================
echo.

REM Step 1: Get IP address
echo Step 1: Finding your computer's IP address...

for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4 Address"') do (
    set "IP=%%a"
    REM Remove leading spaces
    for /f "tokens=*" %%b in ("!IP!") do set "IP=%%b"
)

if not defined IP (
    echo ❌ Could not find IP address!
    echo    Please make sure you're connected to WiFi or Ethernet
    pause
    exit /b 1
)

echo ✅ IP Address: !IP!
echo.

REM Step 2: Update .env.production
echo Step 2: Updating API configuration...
(
    echo # Production API URL - Set this to your computer's local IP
    echo # Local network connection - no ngrok required
    echo VITE_API_URL=http://!IP!:8000
) > FrontEnd\.env.production

echo ✅ API URL set to: http://!IP!:8000
echo.

REM Step 3: Build
echo Step 3: Building mobile app...
echo    ^(This will take several minutes...^)
echo.

cd /d "%~dp0FrontEnd" || (
    echo ❌ Failed to navigate to FrontEnd directory!
    pause
    exit /b 1
)

echo    → Building web assets...
call npm run build >nul 2>&1
if errorlevel 1 (
    echo ❌ Web build failed!
    call npm run build
    pause
    exit /b 1
)
echo    ✅ Web assets built

echo    → Syncing to Android...
call npx cap sync android >nul 2>&1
if errorlevel 1 (
    echo ❌ Android sync failed!
    call npx cap sync android
    pause
    exit /b 1
)
echo    ✅ Synced to Android

echo    → Building APK ^(this takes the longest^)...
cd /d android || (
    echo ❌ Failed to navigate to android directory!
    pause
    exit /b 1
)

call gradlew.bat assembleDebug >nul 2>&1
if errorlevel 1 (
    echo ❌ APK build failed!
    call gradlew.bat assembleDebug
    pause
    exit /b 1
)
echo    ✅ APK built successfully

echo    → Copying APK...
copy app\build\outputs\apk\debug\app-debug.apk ..\..\NutriTrack.apk >nul 2>&1

set "APK_PATH=%~dp0..\..\NutriTrack.apk"
for %%A in (!APK_PATH!) do (
    set "APK_SIZE=%%~zA"
)

REM Convert bytes to KB/MB
if %APK_SIZE% geq 1048576 (
    set /a APK_SIZE_MB=%APK_SIZE%/1048576
    set "APK_SIZE_STR=!APK_SIZE_MB! MB"
) else if %APK_SIZE% geq 1024 (
    set /a APK_SIZE_KB=%APK_SIZE%/1024
    set "APK_SIZE_STR=!APK_SIZE_KB! KB"
) else (
    set "APK_SIZE_STR=%APK_SIZE% bytes"
)

echo.
echo ==========================================
echo 🎉 SUCCESS! Your mobile app is ready!
echo ==========================================
echo.
echo 📱 APK Location: !APK_PATH!
echo 📊 APK Size: !APK_SIZE_STR!
echo.
echo 📝 Next Steps:
echo    1. Transfer NutriTrack.apk to your phone
echo       - Via USB cable
echo       - Via email/cloud storage
echo       - Via ADB: adb install -r "!APK_PATH!"
echo.
echo    2. Install on your phone
echo       - Enable 'Install from Unknown Sources'
echo       - Open the APK file and install
echo.
echo    3. Start the backend server:
echo       cd backend ^&^& npm start
echo.
echo    4. Connect both devices to the same WiFi network
echo.
echo    5. Open NutriTrack app on your phone
echo.
echo 🌐 Your backend URL: http://!IP!:8000
echo.
echo 💡 Tip: Keep the backend server running while using the app!
echo.
pause
