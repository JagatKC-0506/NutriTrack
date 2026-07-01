# Complete Mobile App Setup Script (Windows PowerShell)
# This script will configure, build, and prepare your NutriTrack mobile app
# No ngrok required - uses local network IP for direct connection

Write-Host ""
Write-Host "NutriTrack Mobile App - Complete Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Get IP address
Write-Host "Step 1: Finding your computer's IP address..."

# Get the primary non-loopback IPv4 address using ipconfig
$ipOutput = ipconfig | Select-String "IPv4 Address" | Select-Object -First 1
if ($ipOutput) {
    $IP = $ipOutput -replace '.*IPv4 Address.*:\s*' -replace '\s*$'
}

if (-not $IP) {
    Write-Host "Could not find IP address!" -ForegroundColor Red
    Write-Host "Please make sure you are connected to WiFi or Ethernet"
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "IP Address: $IP" -ForegroundColor Green
Write-Host ""

# Step 2: Update .env.production
Write-Host "Step 2: Updating API configuration..."

$envContent = "# Production API URL - Set this to your computer's local IP`n# Local network connection - no ngrok required`nVITE_API_URL=http://$($IP):8000"

Set-Content -Path "FrontEnd\.env.production" -Value $envContent -Encoding UTF8
Write-Host "API URL set to: http://$($IP):8000" -ForegroundColor Green
Write-Host ""

# Step 3: Build
Write-Host "Step 3: Building mobile app..."
Write-Host "(This will take several minutes...)"
Write-Host ""

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location "$scriptDir\FrontEnd"

Write-Host "  Building web assets..."
$buildOutput = & npm run build 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Web build failed!" -ForegroundColor Red
    Write-Host $buildOutput
    Pop-Location
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "  Web assets built" -ForegroundColor Green

Write-Host "  Syncing to Android..."
$syncOutput = & npx cap sync android 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Android sync failed!" -ForegroundColor Red
    Write-Host $syncOutput
    Pop-Location
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "  Synced to Android" -ForegroundColor Green

Write-Host "  Building APK (this takes the longest)..."
Push-Location android

$buildOutput = & .\gradlew.bat assembleDebug 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "APK build failed!" -ForegroundColor Red
    Write-Host $buildOutput
    Pop-Location
    Pop-Location
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "  APK built successfully" -ForegroundColor Green

Write-Host "  Copying APK..."
$sourceAPK = "app\build\outputs\apk\debug\app-debug.apk"
$destAPK = "..\..\NutriTrack.apk"

if (Test-Path $sourceAPK) {
    Copy-Item $sourceAPK $destAPK -Force
}

Pop-Location
Pop-Location

# Get APK size
$apkPath = Join-Path $scriptDir "NutriTrack.apk"
if (Test-Path $apkPath) {
    $apkSize = (Get-Item $apkPath).Length
    if ($apkSize -gt 1048576) {
        $apkSizeStr = "{0:N2} MB" -f ($apkSize / 1048576)
    } else {
        $apkSizeStr = "{0:N2} KB" -f ($apkSize / 1024)
    }
} else {
    $apkSizeStr = "Unknown"
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "SUCCESS! Your mobile app is ready!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "APK Location: $apkPath"
Write-Host "APK Size: $apkSizeStr"
Write-Host ""
Write-Host "Next Steps:"
Write-Host "  1. Transfer NutriTrack.apk to your phone"
Write-Host "     - Via USB cable"
Write-Host "     - Via email/cloud storage"
Write-Host "     - Via ADB: adb install -r ""$apkPath"""
Write-Host ""
Write-Host "  2. Install on your phone"
Write-Host "     - Enable 'Install from Unknown Sources'"
Write-Host "     - Open the APK file and install"
Write-Host ""
Write-Host "  3. Start the backend server:"
Write-Host "     cd backend; npm start"
Write-Host ""
Write-Host "  4. Connect both devices to the same WiFi network"
Write-Host ""
Write-Host "  5. Open NutriTrack app on your phone"
Write-Host ""
Write-Host "Your backend URL: http://$IP:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tip: Keep the backend server running while using the app!" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to exit"
