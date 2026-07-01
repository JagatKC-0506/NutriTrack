# 🥗 NutriTrack

> A comprehensive nutrition tracking application with web and mobile support, featuring separate frontend and backend components.

---

## 📱 Mobile App (NEW!)

**Your Android APK is ready!** See [WINDOWS_SETUP.md](./WINDOWS_SETUP.md) for complete Windows setup instructions (recommended) or [MOBILE_APP_READY.md](./MOBILE_APP_READY.md) for general information.

### Quick Mobile Setup (Windows):

**Option 1: PowerShell (Recommended)**
```powershell
# One-command setup (configures, builds, and creates APK)
.\setup-mobile-complete.ps1

# Install on phone
adb install -r NutriTrack.apk

# Start backend
cd backend && npm start
```

**Option 2: Command Prompt**
```batch
REM One-command setup
setup-mobile-complete.bat

REM Install on phone
adb install -r NutriTrack.apk

REM Start backend
cd backend && npm start
```

📚 **Mobile Documentation:**
- [WINDOWS_SETUP.md](./WINDOWS_SETUP.md) - **Complete Windows setup guide (RECOMMENDED)**
- [MOBILE_APP_READY.md](./MOBILE_APP_READY.md) - Mobile app installation details
- [QUICK_START_MOBILE.md](./QUICK_START_MOBILE.md) - Quick reference
- [MOBILE_SETUP.md](./MOBILE_SETUP.md) - Detailed cross-platform documentation

---

## 🪟 Windows vs Linux

### ⚠️ Project Now Windows-Optimized!

If you're on **Windows**, use the new scripts:
- ✅ `setup-mobile-complete.ps1` (PowerShell) - recommended
- ✅ `setup-mobile-complete.bat` (Command Prompt)
- ✅ `build-mobile.ps1` (PowerShell)
- ✅ `build-mobile.bat` (Command Prompt)
- ✅ `get-local-ip.ps1` (PowerShell)
- ✅ `get-local-ip.bat` (Command Prompt)

**Linux users:** The original `.sh` scripts are still available.

### 🔄 No ngrok Required!

This project now works with **direct local IP connection** - much faster and more reliable:
- ✅ Phone and computer on same WiFi
- ✅ Direct connection to backend
- ✅ No tunneling service needed
- ✅ Works offline on local network

---

## 📖 How to Clone

### 🎨 Clone Only Frontend

```bash
git clone --no-checkout https://github.com/JagatKC-0506/NutriTrack.git
cd NutriTrack

git sparse-checkout init --cone
git sparse-checkout set frontend

git checkout main
```

**Result:**
```
NutriTrack/
├── frontend/
```

---

### ⚙️ Clone Only Backend

```bash
git clone --no-checkout https://github.com/JagatKC-0506/NutriTrack.git
cd NutriTrack

git sparse-checkout init --cone
git sparse-checkout set backend

git checkout main
```

**Result:**
```
NutriTrack/
├── backend/
```

---

### 📦 Clone Both Frontend & Backend

```bash
git clone https://github.com/JagatKC-0506/NutriTrack.git
cd NutriTrack
git checkout main
```

**Result:**
```
NutriTrack/
├── frontend/
├── backend/
```

---

## 📤 How to Push

When you've made changes in your cloned directory:

```bash
git add .
git commit -m "Your commit message"
git push
```

✨ **Note:** Git will push only the files from the directory/directories you have locally!

---

**Happy tracking! 🎯**
