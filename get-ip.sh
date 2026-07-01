#!/bin/bash

# Get Current IP Address Script
# Use this to find your computer's IP address for mobile app connection

echo "🌐 Finding your computer's IP address..."
echo ""

# Get the primary non-loopback IP address
IP=$(ip addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | grep -v '127.0.0.1' | head -1)

if [ -z "$IP" ]; then
    echo "❌ Could not find IP address!"
    echo "   Make sure you're connected to WiFi or Ethernet"
    exit 1
fi

echo "✅ Your computer's IP address is: $IP"
echo ""
echo "📝 Next steps:"
echo "   1. Update .env.production with: VITE_API_URL=http://$IP:8000"
echo "   2. Rebuild the app: ./build-mobile.sh"
echo "   3. Make sure your phone is on the same WiFi network"
echo ""
echo "Quick command to update .env.production:"
echo "   echo 'VITE_API_URL=http://$IP:8000' > FrontEnd/.env.production"
echo ""
