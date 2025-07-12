#!/bin/bash

# 🚀 FastAPI + React Vercel Deployment Script
# This script helps deploy your full-stack application to Vercel

echo "🚀 Starting deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel..."
    vercel login
fi

# Deploy the application
echo "📦 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your app should be live at the URL shown above"
echo ""
echo "📝 Next steps:"
echo "1. Test your API endpoints"
echo "2. Update your frontend environment variables if needed"
echo "3. Share your deployment URL" 