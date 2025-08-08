# 🚀 Render Deployment Guide

## Quick Deploy to Render

1. **Connect your GitHub repository to Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Static Site"
   - Connect your GitHub account and select this repository

2. **Configure the deployment:**
   - **Name:** `to-do-list-frontend` (or any name you prefer)
   - **Root Directory:** Leave empty (deploy from root)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - **Auto-Deploy:** Yes

3. **Deploy:**
   - Click "Create Static Site"
   - Render will automatically build and deploy your app
   - You'll get a URL like `https://your-app-name.onrender.com`

## Backend Configuration

Your backend is already deployed at:
`https://to-do-list-app-ub20.onrender.com`

The frontend is configured to use this backend automatically.

## That's it! 🎉

Your full-stack todo app will be live on Render with:
- ✅ Frontend on Render Static Site
- ✅ Backend on Render Web Service  
- ✅ Database on Render PostgreSQL

Both services will be on the same platform for easy management.
