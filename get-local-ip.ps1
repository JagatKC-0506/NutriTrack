# Get Local IP Address Script (Windows PowerShell)
# Use this to find your computer's IP address for mobile app connection

Write-Host ""
Write-Host "Finding your computer's IP address..." -ForegroundColor Cyan
Write-Host ""

# Get the primary non-loopback IPv4 address
$IP = (Get-NetIPAddress -AddressFamily IPv4 -PrefixLength 24 | 
       Where-Object { $_.IPAddress -notlike "127.*" } | 
       Select-Object -First 1).IPAddress

if (-not $IP) {
    Write-Host "Could not find IP address!" -ForegroundColor Red
    Write-Host "Make sure you're connected to WiFi or Ethernet"
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Your computer's IP address is: $IP" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Update FrontEnd\.env.production with: VITE_API_URL=http://$IP:8000"
Write-Host "  2. Rebuild the app: .\setup-mobile-complete.ps1"
Write-Host "  3. Make sure your phone is on the same WiFi network"
Write-Host ""
Write-Host "Quick command to update .env.production:"
Write-Host ""
@"
@"
# Production API URL - Set this to your computer's local IP
# Local network connection - no ngrok required
VITE_API_URL=http://$IP:8000
"@ | Out-File FrontEnd\.env.production -Encoding UTF8
"@ | Write-Host
Write-Host ""
Read-Host "Press Enter to exit"
