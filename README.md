# 🥗 NutriTrack

> A comprehensive nutrition tracking application with web and mobile support, featuring separate frontend and backend components.

---

## 📱 Mobile App (NEW!)

**Your Android APK is ready!** See [MOBILE_APP_READY.md](./MOBILE_APP_READY.md) for installation instructions.

### Quick Mobile Setup:
```bash
# One-command setup (configures, builds, and creates APK)
./setup-mobile-complete.sh

# Install on phone
adb install NutriTrack.apk

# Start backend
cd backend && npm start
```

📚 **Mobile Documentation:**
- [MOBILE_APP_READY.md](./MOBILE_APP_READY.md) - Complete mobile setup guide
- [QUICK_START_MOBILE.md](./QUICK_START_MOBILE.md) - Quick reference
- [MOBILE_SETUP.md](./MOBILE_SETUP.md) - Detailed documentation

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
