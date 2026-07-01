#!/bin/bash

# NutriTrack Mobile APK Builder Script
# This script builds the APK and copies it to an easy-to-find location

echo "🚀 Building NutriTrack Mobile APK..."
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")/FrontEnd" || exit 1

echo "📦 Step 1: Building web assets..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Web assets built successfully"
echo ""

echo "🔄 Step 2: Syncing to Android..."
npx cap sync android

if [ $? -ne 0 ]; then
    echo "❌ Sync failed!"
    exit 1
fi

echo "✅ Synced to Android"
echo ""

echo "🔨 Step 3: Building APK (this may take a minute)..."
cd android || exit 1
./gradlew assembleDebug

if [ $? -ne 0 ]; then
    echo "❌ APK build failed!"
    exit 1
fi

echo "✅ APK built successfully"
echo ""

echo "📋 Step 4: Copying APK to project root..."
cp app/build/outputs/apk/debug/app-debug.apk ../../NutriTrack.apk

if [ $? -ne 0 ]; then
    echo "⚠️  Warning: Could not copy APK to root"
else
    echo "✅ APK copied to: $(cd ../.. && pwd)/NutriTrack.apk"
fi

echo ""
echo "🎉 SUCCESS! Your APK is ready!"
echo ""
echo "APK Locations:"
echo "  1. $(pwd)/app/build/outputs/apk/debug/app-debug.apk"
echo "  2. $(cd ../.. && pwd)/NutriTrack.apk"
echo ""
echo "Next steps:"
echo "  1. Transfer NutriTrack.apk to your phone"
echo "  2. Install the APK on your phone"
echo "  3. Start backend: cd backend && npm start"
echo "  4. Make sure phone and computer are on same WiFi"
echo "  5. Open NutriTrack app on your phone"
echo ""
