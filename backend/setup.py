#!/usr/bin/env python3

import os
import subprocess
import sys
from pathlib import Path

def run_command(command, cwd=None):
    """Run a command and return the result"""
    try:
        result = subprocess.run(command, shell=True, cwd=cwd, check=True, 
                              capture_output=True, text=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {command}")
        print(f"Error: {e.stderr}")
        return None

def setup_backend():
    """Set up the Python backend"""
    print("🐍 Setting up Python backend...")
    
    backend_dir = Path(__file__).parent
    
    # Create virtual environment
    print("Creating virtual environment...")
    run_command("python -m venv venv", cwd=backend_dir)
    
    # Activate virtual environment and install dependencies
    if os.name == 'nt':  # Windows
        activate_cmd = "venv\\Scripts\\activate && pip install -r requirements.txt"
    else:  # Unix/Linux/MacOS
        activate_cmd = "source venv/bin/activate && pip install -r requirements.txt"
    
    print("Installing Python dependencies...")
    run_command(activate_cmd, cwd=backend_dir)
    
    print("✅ Backend setup complete!")

def create_env_file():
    """Create .env file from example"""
    backend_dir = Path(__file__).parent
    env_example = backend_dir / ".env.example"
    env_file = backend_dir / ".env"
    
    if not env_file.exists() and env_example.exists():
        print("📝 Creating .env file...")
        with open(env_example, 'r') as src, open(env_file, 'w') as dst:
            content = src.read()
            # Replace with your actual database URL
            content = content.replace(
                "DATABASE_URL=postgresql://username:password@hostname:port/database_name",
                "DATABASE_URL=postgresql://your_username:your_password@your_host:5432/your_database"
            )
            dst.write(content)
        
        print("⚠️  Please update the .env file with your actual database credentials!")
        print(f"   Edit: {env_file}")
    else:
        print("✅ .env file already exists")

def main():
    print("🚀 Setting up TodoList FastAPI Backend")
    print("=" * 40)
    
    setup_backend()
    create_env_file()
    
    print("\n🎉 Setup complete!")
    print("\nNext steps:")
    print("1. Update the .env file with your PostgreSQL database URL")
    print("2. Run: python main.py")
    print("3. Visit: http://localhost:8000/docs for API documentation")

if __name__ == "__main__":
    main()
