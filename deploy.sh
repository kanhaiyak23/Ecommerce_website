#!/bin/bash

# Deployment Script for T-Shirt E-Commerce Store
echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the React app
echo "🏗️ Building React app..."
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    echo "❌ Error: Build failed. Please check the build logs."
    exit 1
fi

echo "✅ Build completed successfully!"

# Check environment variables
echo "🔍 Checking environment variables..."
if [ -z "$PHONEPE_MERCHANT_ID" ]; then
    echo "⚠️ Warning: PHONEPE_MERCHANT_ID not set"
fi

if [ -z "$PHONEPE_SALT_KEY" ]; then
    echo "⚠️ Warning: PHONEPE_SALT_KEY not set"
fi

echo "🎉 Ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Set environment variables in your hosting platform"
echo "2. Deploy to Railway, Render, or your preferred platform"
echo "3. Update PhonePe redirect URLs"
echo ""
echo "For detailed instructions, see DEPLOYMENT.md"
