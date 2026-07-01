#!/bin/bash

# Complete Mobile App Setup Script
# This script will configure, build, and prepare your NutriTrack mobile app

echo "🚀 NutriTrack Mobile App - Complete Setup"
echo "=========================================="
echo ""

# Get IP address
echo "Step 1: Finding your computer's IP address..."
IP=$(ip addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | grep -v '127.0.0.1' | head -1)

if [ -z "$IP" ]; then
    echo "❌ Could not find IP address!"
    echo "   Please make sure you're connected to WiFi"
    exit 1
fi

echo "✅ IP Address: $IP"
echo ""

# Update .env.production
echo "Step 2: Updating API configuration..."
echo "VITE_API_URL=http://$IP:8000" > FrontEnd/.env.production
echo "✅ API URL set to: http://$IP:8000"
echo ""

# Build
echo "Step 3: Building mobile app..."
echo "   (This will take a few minutes...)"
echo ""

cd FrontEnd || exit 1

# Build web assets
echo "   → Building web assets..."
npm run build > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Web build failed!"
    npm run build
    exit 1
fi
echo "   ✅ Web assets built"

# Sync to Android
echo "   → Syncing to Android..."
npx cap sync android > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Android sync failed!"
    npx cap sync android
    exit 1
fi
echo "   ✅ Synced to Android"

# Build APK
echo "   → Building APK (this takes the longest)..."
cd android || exit 1
./gradlew assembleDebug > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ APK build failed!"
    ./gradlew assembleDebug
    exit 1
fi
echo "   ✅ APK built successfully"

# Copy APK
cp app/build/outputs/apk/debug/app-debug.apk ../../NutriTrack.apk
APK_PATH="$(cd ../.. && pwd)/NutriTrack.apk"

echo ""
echo "=========================================="
echo "🎉 SUCCESS! Your mobile app is ready!"
echo "=========================================="
echo ""
echo "📱 APK Location: $APK_PATH"
echo "📊 APK Size: $(du -h "$APK_PATH" | cut -f1)"
echo ""
echo "📝 Next Steps:"
echo "   1. Transfer NutriTrack.apk to your phone"
echo "      - Via USB cable"
echo "      - Via email/cloud storage"
echo "      - Via ADB: adb install -r \"$APK_PATH\""
echo ""
echo "   2. Install on your phone"
echo "      - Enable 'Install from Unknown Sources'"
echo "      - Open the APK file and install"
echo ""
echo "   3. Start the backend server:"
echo "      cd backend && npm start"
echo ""
echo "   4. Connect both devices to the same WiFi network"
echo ""
echo "   5. Open NutriTrack app on your phone"
echo ""
echo "🌐 Your backend URL: http://$IP:8000"
echo ""
echo "💡 Tip: Keep the backend server running while using the app!"
echo ""
