@echo off
REM NutriTrack Mobile APK Builder Script (Windows)
REM This script builds the APK and copies it to an easy-to-find location

echo.
echo 🚀 Building NutriTrack Mobile APK...
echo.

REM Navigate to frontend directory
cd /d "%~dp0FrontEnd" || (
    echo ❌ Failed to navigate to FrontEnd directory!
    pause
    exit /b 1
)

echo 📦 Step 1: Building web assets...
call npm run build

if errorlevel 1 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo ✅ Web assets built successfully
echo.

echo 🔄 Step 2: Syncing to Android...
call npx cap sync android

if errorlevel 1 (
    echo ❌ Sync failed!
    pause
    exit /b 1
)

echo ✅ Synced to Android
echo.

echo 🔨 Step 3: Building APK ^(this may take a few minutes^)...
cd /d android || (
    echo ❌ Failed to navigate to android directory!
    pause
    exit /b 1
)

call gradlew.bat assembleDebug

if errorlevel 1 (
    echo ❌ APK build failed!
    pause
    exit /b 1
)

echo ✅ APK built successfully
echo.

echo 📋 Step 4: Copying APK to project root...
copy app\build\outputs\apk\debug\app-debug.apk ..\..\NutriTrack.apk

if errorlevel 1 (
    echo ⚠️  Warning: Could not copy APK to root
) else (
    echo ✅ APK copied to: %~dp0..\..\NutriTrack.apk
)

echo.
echo 🎉 SUCCESS! Your APK is ready!
echo.
echo APK Locations:
echo   1. %~dp0app\build\outputs\apk\debug\app-debug.apk
echo   2. %~dp0..\..\NutriTrack.apk
echo.
echo Next steps:
echo   1. Transfer NutriTrack.apk to your phone
echo   2. Install the APK on your phone
echo   3. Start backend: cd backend ^&^& npm start
echo   4. Make sure phone and computer are on same WiFi
echo   5. Open NutriTrack app on your phone
echo.
pause
