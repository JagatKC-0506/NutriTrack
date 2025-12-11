# 🥗 NutriTrack

> A comprehensive nutrition tracking application with separate frontend and backend components.

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
