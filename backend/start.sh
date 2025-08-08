#!/bin/bash

echo "🚀 Starting TodoList FastAPI Backend..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Please run setup.py first."
    exit 1
fi

# Activate virtual environment and start the server
source venv/bin/activate
python main.py
