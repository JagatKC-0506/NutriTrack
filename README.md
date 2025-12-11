# NutriTrack

A comprehensive nutrition tracking application with separate frontend and backend components.

## STEP 2 — Clone ONLY one directory (frontend OR backend)

This uses sparse checkout.

### ⭐ A) Clone only the FRONTEND folder

```bash
git clone --no-checkout https://github.com/YourUser/NutriTrack.git
cd NutriTrack

git sparse-checkout init --cone
git sparse-checkout set frontend

git checkout main
```

You will now have ONLY:

```
NutriTrack/
  frontend/
```

⚡ No backend folder downloaded!

### ⭐ B) Clone only the BACKEND folder

```bash
git clone --no-checkout https://github.com/YourUser/NutriTrack.git
cd NutriTrack

git sparse-checkout init --cone
git sparse-checkout set backend

git checkout main
```

You will now have ONLY:

```
NutriTrack/
  backend/
```

### ⭐ C) If later you want both folders

```bash
git sparse-checkout set frontend backend
```

### ⭐ D) To push changes from only one directory

Example: You cloned only frontend and want to push:

```bash
git add .
git commit -m "Updated frontend"
git push
```

Git pushes only the files you have.
