# 🪟 NutriTrack Windows Setup Guide

> Complete guide for setting up and building NutriTrack mobile app on Windows without ngrok

---

## 📋 What Changed

This project has been converted from **Linux to Windows** with the following improvements:

### ✅ Changes Made

1. **Removed ngrok dependency** - No longer needed!
   - ❌ Removed: ngrok bypass headers from API client
   - ❌ Removed: ngrok URL from environment configuration
   - ✅ Added: Direct local IP connection support

2. **Linux scripts → Windows scripts**
   - ❌ Removed: `setup-mobile-complete.sh` (bash)
   - ❌ Removed: `build-mobile.sh` (bash)
   - ❌ Removed: `get-ip.sh` (bash)
   - ✅ Added: `.bat` versions (Command Prompt compatible)
   - ✅ Added: `.ps1` versions (PowerShell - recommended)

3. **Improved CORS configuration**
   - ✅ Added: Support for local network IP addresses (192.168.x.x, 10.x.x.x)
   - ✅ Added: Better Capacitor mobile app support
   - ✅ Maintained: All existing localhost support

4. **Better local network setup**
   - ✅ Automatic IP detection on Windows
   - ✅ Direct WiFi connection without tunneling
   - ✅ Faster and more reliable

---

## 🚀 Quick Start (Windows)

### Option 1: Using PowerShell (Recommended)

```powershell
# 1. Get your computer's IP address
.\get-local-ip.ps1

# 2. Build and setup the mobile app (all-in-one)
.\setup-mobile-complete.ps1

# OR build only the APK
.\build-mobile.ps1
```

### Option 2: Using Command Prompt (CMD)

```batch
REM 1. Get your computer's IP address
get-local-ip.bat

REM 2. Build and setup the mobile app (all-in-one)
setup-mobile-complete.bat

REM OR build only the APK
build-mobile.bat
```

---

## 📱 Complete Setup Steps

### Step 1: Find Your Computer's IP

**Using PowerShell:**
```powershell
.\get-local-ip.ps1
```

**Using Command Prompt:**
```batch
get-local-ip.bat
```

**Manual (if scripts don't work):**
```powershell
# In PowerShell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -notlike "127.*"}

# OR in Command Prompt
ipconfig
# Look for "IPv4 Address" (usually starts with 192.168.x.x or 10.x.x.x)
```

### Step 2: Configure the Frontend

The setup script does this automatically, but if you need to do it manually:

Edit `FrontEnd\.env.production`:
```
# Production API URL - Set this to your computer's local IP
# Local network connection - no ngrok required
VITE_API_URL=http://192.168.1.100:8000
```

Replace `192.168.1.100` with your actual computer's IP address.

### Step 3: Build the Mobile App

**Option A: Full Setup (Recommended)**
```powershell
.\setup-mobile-complete.ps1
```

This does everything:
- ✅ Detects your IP
- ✅ Updates `.env.production`
- ✅ Builds web assets
- ✅ Syncs to Android
- ✅ Builds APK
- ✅ Copies APK to project root

**Option B: Build Only**
```powershell
.\build-mobile.ps1
```

### Step 4: Install on Your Phone

**Method 1: Using ADB (Recommended for Developers)**
```powershell
adb install -r .\NutriTrack.apk
```

**Method 2: Manual Installation**
1. Transfer `NutriTrack.apk` to your phone (USB, email, cloud, etc.)
2. On your phone, enable "Install from Unknown Sources" in Settings
3. Open the APK file and tap "Install"

### Step 5: Start the Backend Server

```bash
cd backend
npm start
```

The backend will run on: `http://YOUR_IP:8000`

### Step 6: Connect and Test

1. Make sure your phone and computer are on the **same WiFi network**
2. Open the NutriTrack app on your phone
3. The app should connect automatically using `http://YOUR_IP:8000`

---

## 🔧 Troubleshooting

### Issue: Script won't run (PowerShell)

**Error:** `PowerShell cannot be loaded because running scripts is disabled`

**Solution:**
```powershell
# Run PowerShell as Administrator, then:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: Script won't run (Command Prompt)

**Error:** `'get-local-ip.bat' is not recognized`

**Solution:** Make sure you're running the command from the NutriTrack project root directory, or use full path:
```batch
cd /d "C:\path\to\NutriTrack"
get-local-ip.bat
```

### Issue: Can't find IP address

**Solution:** Check your WiFi is connected
```powershell
# Check all network adapters
Get-NetAdapter | Where-Object {$_.Status -eq "Up"}

# Check all IPv4 addresses
Get-NetIPAddress -AddressFamily IPv4
```

### Issue: Phone can't connect to backend

**Common causes:**
1. Phone and computer not on same WiFi
2. Firewall blocking port 8000
3. Wrong IP in `.env.production`
4. Backend server not running

**Debugging:**
```powershell
# Check if backend is running
Test-NetConnection -ComputerName 192.168.1.100 -Port 8000 -InformationLevel Detailed

# Check firewall (Windows Defender)
# Settings → Privacy & Security → Windows Defender Firewall → Allow an app through firewall
# Make sure "node" or your terminal application is allowed
```

### Issue: APK build fails

**Check Java installation:**
```powershell
java -version
```

Should show Java 11 or higher.

**Check Android Studio/SDK:**
```powershell
# If using Android Studio, check that SDK is properly installed
# Default location: C:\Users\YourUsername\AppData\Local\Android\Sdk
```

### Issue: ngrok references remaining

If you see ngrok errors, make sure to:
1. ✅ Updated `FrontEnd\.env.production` (no ngrok URL)
2. ✅ Updated `FrontEnd\src\api.js` (removed ngrok header)
3. ✅ Updated `backend\src\config\index.js` (CORS supports local IPs)

---

## 📝 File Changes Summary

### Modified Files

| File | Changes |
|------|---------|
| `FrontEnd/.env.production` | Removed ngrok URL, now uses local IP |
| `FrontEnd/src/api.js` | Removed ngrok bypass header logic |
| `backend/src/config/index.js` | Enhanced CORS for local IP support |

### New Files (Windows)

| File | Purpose |
|------|---------|
| `get-local-ip.bat` | Windows batch script to find your IP |
| `get-local-ip.ps1` | PowerShell version (recommended) |
| `build-mobile.bat` | Windows batch script to build APK |
| `build-mobile.ps1` | PowerShell version (recommended) |
| `setup-mobile-complete.bat` | Windows batch script for full setup |
| `setup-mobile-complete.ps1` | PowerShell version (recommended) |
| `WINDOWS_SETUP.md` | This file - complete setup guide |

### Old Files (Linux - can be deleted)

- `setup-mobile-complete.sh` - Use `.ps1` or `.bat` instead
- `build-mobile.sh` - Use `.ps1` or `.bat` instead
- `get-ip.sh` - Use `.ps1` or `.bat` instead

---

## 🌐 Architecture: How It Works Now

### Without ngrok (Previous)
```
Phone → ngrok tunnel → ngrok server → localhost:8000 → Database
         ❌ Slow, needs account, rate limited
```

### With Local IP (Current - Windows)
```
Phone (WiFi) → directly → 192.168.x.x:8000 → Database
                ✅ Fast, no account needed, reliable
```

**Requirements:**
- Phone and computer on same WiFi ✅
- Backend server running ✅
- Correct IP in `.env.production` ✅

---

## 🎯 Development Workflow

### Normal Development
```bash
# Terminal 1: Run backend
cd backend
npm start

# Terminal 2: Run frontend dev server (optional)
cd FrontEnd
npm run dev

# Then build APK when ready
.\build-mobile.ps1
```

### Testing Changes on Phone
```bash
# 1. Make code changes
# 2. Rebuild APK
.\build-mobile.ps1

# 3. Install on phone
adb install -r .\NutriTrack.apk

# 4. Test on phone
```

---

## 📚 Additional Commands

### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start
```

### Frontend Development

```bash
cd FrontEnd

# Install dependencies
npm install

# Start Vite dev server (for web testing)
npm run dev

# Build web assets
npm run build

# Open Android Studio
npx cap open android

# Sync to Android (manual)
npx cap sync android
```

### ADB Commands (Phone Interaction)

```powershell
# List connected devices
adb devices

# Install APK
adb install -r .\NutriTrack.apk

# Uninstall app
adb uninstall com.example.nutritrack

# View logs
adb logcat

# Open shell on phone
adb shell
```

---

## 🔒 Security Notes

⚠️ **For Development Only:**
- CORS allows all origins in development mode
- No authentication on backend in dev mode
- Direct local network access (no encryption)

✅ **For Production:**
- Change CORS to specific origins
- Enable proper authentication
- Use HTTPS/SSL certificates
- Use environment-based configuration

---

## 🆘 Getting Help

If you still have issues:

1. Check the error message carefully
2. Verify WiFi connection: `ipconfig`
3. Check IP configuration: `.\get-local-ip.ps1`
4. Check backend running: `Test-NetConnection -ComputerName <IP> -Port 8000`
5. Check Android build output
6. Review Backend logs: `npm start` output

---

## ✨ Next Steps

1. ✅ Run `.\setup-mobile-complete.ps1`
2. ✅ Transfer APK to phone
3. ✅ Install app
4. ✅ Start backend server
5. ✅ Test app on phone
6. 🎉 Enjoy NutriTrack!

---

**Happy coding! 🚀**
