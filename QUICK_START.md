# 🎉 How to Run Your Simple Todo App

## Quick Start Guide

### 1. Start the Backend API

```bash
# Navigate to backend folder
cd backend

# Install dependencies (one time only)
pip install -r requirements.txt

# Set up your database
# Copy .env.example to .env and add your Render PostgreSQL URL

# Start the API server
python main.py
```

The API will run at `http://localhost:8000` 🚀

### 2. Start the React Frontend

```bash
# Navigate to project root (if not already there)
cd ..

# Install dependencies (one time only)
npm install

# Start the React app
npm run dev
```

The React app will run at `http://localhost:5173` ✨

### 3. Done! 

Your todo app will now save tasks to your PostgreSQL database on Render!

## What's Different Now?

✅ **Super Simple** - No complex authentication, just task storage  
✅ **Database Connected** - Tasks saved to your Render PostgreSQL  
✅ **Easy to Use** - Just add, edit, delete tasks  
✅ **Fast** - Only 5 dependencies in backend, no heavy libraries  

## Backend API Docs

Visit `http://localhost:8000/docs` to see the interactive API documentation!

That's it! Much simpler than before. 🎊
