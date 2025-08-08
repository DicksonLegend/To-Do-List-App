@echo off
echo 🚀 Starting TodoList FastAPI Backend...

REM Check if virtual environment exists
if not exist "venv" (
    echo ❌ Virtual environment not found. Please run setup.py first.
    pause
    exit /b 1
)

REM Activate virtual environment and start the server
call venv\Scripts\activate
python main.py
