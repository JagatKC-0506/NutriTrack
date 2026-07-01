# NutriTrack Mobile APK Builder Script (Windows PowerShell)
# This script builds the APK and copies it to an easy-to-find location

Write-Host ""
Write-Host "Building NutriTrack Mobile APK..." -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location "$scriptDir\FrontEnd" -ErrorAction Stop

Write-Host "Step 1: Building web assets..."
& npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "Web assets built successfully" -ForegroundColor Green
Write-Host ""

Write-Host "Step 2: Syncing to Android..."
& npx cap sync android
if ($LASTEXITCODE -ne 0) {
    Write-Host "Sync failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "Synced to Android" -ForegroundColor Green
Write-Host ""

Write-Host "Step 3: Building APK (this may take a few minutes)..."
Set-Location android
& .\gradlew.bat assembleDebug
if ($LASTEXITCODE -ne 0) {
    Write-Host "APK build failed!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "APK built successfully" -ForegroundColor Green
Write-Host ""

Write-Host "Step 4: Copying APK to project root..."
$sourceAPK = "app\build\outputs\apk\debug\app-debug.apk"
$destAPK = "..\..\NutriTrack.apk"

if (Test-Path $sourceAPK) {
    Copy-Item $sourceAPK $destAPK -Force
    Write-Host "APK copied to: $destAPK" -ForegroundColor Green
} else {
    Write-Host "Warning: Could not find APK at $sourceAPK"
}

Write-Host ""
Write-Host "SUCCESS! Your APK is ready!" -ForegroundColor Green
Write-Host ""
Write-Host "APK Locations:"
Write-Host "  1. $(Get-Location)\$sourceAPK"
Write-Host "  2. $destAPK"
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Transfer NutriTrack.apk to your phone"
Write-Host "  2. Install the APK on your phone"
Write-Host "  3. Start backend: cd backend; npm start"
Write-Host "  4. Make sure phone and computer are on same WiFi"
Write-Host "  5. Open NutriTrack app on your phone"
Write-Host ""
Read-Host "Press Enter to exit"
