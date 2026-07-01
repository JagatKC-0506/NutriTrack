# 🚀 Windows Setup Checklist - NutriTrack Mobile App

> Quick reference checklist for setting up and building NutriTrack on Windows

---

## ✅ Pre-Setup Requirements

- [ ] Windows 10 or later
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm 9+ installed (`npm --version`)
- [ ] Android SDK installed (part of Android Studio)
- [ ] Java Development Kit (JDK) 11+ installed
- [ ] Computer connected to WiFi
- [ ] Android phone connected to same WiFi network

---

## 📋 Step-by-Step Setup

### 1. Get Your Computer's IP Address

**Choose one method:**

#### Method A: Using PowerShell (Recommended)
```powershell
cd C:\path\to\NutriTrack
.\get-local-ip.ps1
```

#### Method B: Using Command Prompt
```batch
cd C:\path\to\NutriTrack
get-local-ip.bat
```

#### Method C: Manual (Windows)
1. Open Command Prompt
2. Type: `ipconfig`
3. Look for "IPv4 Address" (usually starts with 192.168 or 10.)
4. Note: Skip the 127.0.0.1 address

**Expected Output:** `192.168.x.x` or similar

- [ ] IP address found: `_____________________`

---

### 2. Build APK (All-in-One)

**Choose one method:**

#### Method A: PowerShell (Recommended) ⭐
```powershell
cd C:\path\to\NutriTrack
.\setup-mobile-complete.ps1
```

#### Method B: Command Prompt
```batch
cd C:\path\to\NutriTrack
setup-mobile-complete.bat
```

**What this does:**
1. ✅ Detects your IP
2. ✅ Updates `.env.production` 
3. ✅ Builds web assets
4. ✅ Syncs to Android
5. ✅ Builds APK
6. ✅ Copies APK to project root

- [ ] Script completed successfully
- [ ] APK file created: `NutriTrack.apk`
- [ ] Script output shows: `🎉 SUCCESS!`

---

### 3. Install APK on Phone

**Choose one method:**

#### Method A: Using ADB (For Developers)
```powershell
# Make sure phone is connected via USB (USB debugging enabled)
adb devices  # Verify phone is listed
adb install -r .\NutriTrack.apk
```

#### Method B: Manual Installation
1. Transfer `NutriTrack.apk` to your phone
   - Via USB cable
   - Via email
   - Via cloud storage (Google Drive, OneDrive, etc.)
2. On your phone:
   - Settings → Security → Enable "Unknown Sources"
   - Find and open `NutriTrack.apk`
   - Tap "Install"

- [ ] APK installed on phone
- [ ] App opens and shows login screen

---

### 4. Start Backend Server

```bash
cd backend
npm install    # First time only
npm start
```

**Expected output:**
```
Database connection established
Database synced
✅ Server running on http://YOUR_IP:8000
```

- [ ] Backend server started
- [ ] Shows database connected
- [ ] Running on port 8000

---

### 5. Connect Phone to Backend

**On your phone:**

1. Make sure WiFi is connected to same network as computer
2. Open NutriTrack app
3. The app should auto-connect to backend at `http://YOUR_IP:8000`
4. If prompted, enter the backend URL: `http://192.168.x.x:8000` (with your IP)

- [ ] Phone connected to WiFi
- [ ] Phone can see backend URL in app
- [ ] App can login/create account
- [ ] Data saves successfully

---

## 🔧 Troubleshooting Quick Fixes

### Issue: PowerShell script won't run

**Error:** `cannot be loaded because running scripts is disabled`

**Fix:** Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

- [ ] Execution policy updated
- [ ] Script runs successfully

---

### Issue: Can't find IP address

**Fix:** Manual detection
```powershell
# In PowerShell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -notlike "127.*"}

# In Command Prompt  
ipconfig
```

- [ ] IP address identified manually
- [ ] Updated in `.env.production`
- [ ] APK rebuilt

---

### Issue: Phone can't connect to backend

**Checklist:**
1. [ ] Phone and computer on same WiFi
2. [ ] WiFi has internet (not just connection)
3. [ ] IP in `.env.production` is correct
4. [ ] Backend server is running
5. [ ] No firewall blocking port 8000

**Fix:**
```powershell
# On Windows, test connection:
Test-NetConnection -ComputerName 192.168.x.x -Port 8000

# Should say: "TcpTestSucceeded: True"
```

- [ ] Connection test passed
- [ ] Phone can reach backend
- [ ] App connects successfully

---

### Issue: APK build fails

**Check Prerequisites:**
```powershell
# Check Java
java -version
# Should show version 11 or higher

# Check Android SDK
# Should be at: C:\Users\YourName\AppData\Local\Android\Sdk
```

**Rebuild:**
```powershell
cd FrontEnd
npm install
npm run build
```

- [ ] Java version OK
- [ ] Android SDK found
- [ ] Fresh build successful

---

## 📝 Configuration Files to Know

| File | Purpose | Example Value |
|------|---------|--------|
| `FrontEnd/.env.production` | Frontend API URL | `http://192.168.1.100:8000` |
| `backend/.env` | Backend config | Created from `.env.example` |
| `FrontEnd/capacitor.config.json` | Mobile app config | App ID and name |

- [ ] All config files updated
- [ ] No placeholder values remaining

---

## 🎯 Success Indicators

### ✅ Backend Server
- [ ] No errors on startup
- [ ] Shows "Database synced"
- [ ] API endpoints responding

### ✅ APK Build
- [ ] Completes without errors
- [ ] Shows file size > 50MB
- [ ] Located at project root

### ✅ Phone Connection
- [ ] App installs without errors
- [ ] App launches successfully
- [ ] Can see backend URL
- [ ] Can login/create account
- [ ] Data saves to database

---

## 🚀 Development Workflow

Once everything is set up:

```powershell
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: (Optional) Start frontend dev server
cd FrontEnd
npm run dev

# When ready to test on phone:
# Terminal 3: Rebuild APK
.\build-mobile.ps1

# Install on phone
adb install -r .\NutriTrack.apk
```

- [ ] Backend running
- [ ] Frontend dev server (optional)
- [ ] APK built and installed
- [ ] Testing on phone

---

## 📚 Next Steps

After successful setup:

1. **Learn the codebase**
   - Read: [WINDOWS_SETUP.md](./WINDOWS_SETUP.md)
   - Read: [CONVERSION_SUMMARY.md](./CONVERSION_SUMMARY.md)

2. **Make changes**
   - Edit code in appropriate folders
   - Backend: `backend/src/`
   - Frontend: `FrontEnd/src/`

3. **Test changes**
   - Backend: Restart `npm start`
   - Frontend: Changes hot-reload
   - Mobile: Rebuild APK and install

4. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```

---

## 💾 Useful Commands

```bash
# Backend
cd backend
npm install       # Install dependencies
npm start         # Run server
npm run dev       # Run with auto-reload

# Frontend  
cd FrontEnd
npm install       # Install dependencies
npm run dev       # Run web dev server
npm run build     # Build for production

# Mobile/APK
.\get-local-ip.ps1                  # Find your IP
.\setup-mobile-complete.ps1         # Full setup
.\build-mobile.ps1                  # Just build APK
adb install -r .\NutriTrack.apk     # Install on phone
adb devices                         # List connected phones
```

---

## ❓ Support

If you encounter issues:

1. **Check logs:**
   - Backend: Look at terminal output
   - Frontend: Open browser console (F12)
   - Phone: Check app logs

2. **Read documentation:**
   - [WINDOWS_SETUP.md](./WINDOWS_SETUP.md) - Comprehensive guide
   - [README.md](./README.md) - Project overview
   - [CONVERSION_SUMMARY.md](./CONVERSION_SUMMARY.md) - What changed

3. **Common fixes:**
   - Restart terminal/PowerShell
   - Check WiFi connection
   - Verify IP address
   - Restart backend server
   - Rebuild and reinstall APK

---

## 🎉 You're All Set!

Once you see your app running on the phone, you're good to go!

**Next:** Start making changes and testing them in real-time on your mobile device.

Happy coding! 🚀

---

**Last Updated:** May 2026  
**Status:** ✅ Windows Optimized  
**ngrok:** ❌ Removed  
**Direct Connection:** ✅ Working
