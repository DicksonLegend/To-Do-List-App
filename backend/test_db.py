#!/usr/bin/env python3
"""
Simple test script to check database connection and create table
"""
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

# Load environment variables
load_dotenv()

def test_connection():
    """Test the database connection"""
    try:
        DATABASE_URL = os.getenv("DATABASE_URL")
        print(f"🔌 Connecting to database...")
        print(f"📍 Host: {DATABASE_URL.split('@')[1].split('/')[0] if '@' in DATABASE_URL else 'localhost'}")
        
        # Create engine
        engine = create_engine(DATABASE_URL)
        
        # Test connection
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1 as test"))
            test_result = result.fetchone()
            
            if test_result and test_result[0] == 1:
                print("✅ Database connection successful!")
                
                # Check if tables exist
                result = connection.execute(text("""
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public'
                """))
                tables = result.fetchall()
                
                if tables:
                    print(f"📋 Existing tables: {[table[0] for table in tables]}")
                else:
                    print("📋 No tables found - will be created when app runs")
                
                return True
            else:
                print("❌ Database connection failed - unexpected result")
                return False
                
    except Exception as e:
        print(f"❌ Database connection failed: {str(e)}")
        return False

if __name__ == "__main__":
    print("🚀 Testing Database Connection...")
    print("=" * 50)
    success = test_connection()
    print("=" * 50)
    
    if success:
        print("🎉 Ready to start the FastAPI server!")
    else:
        print("🔧 Please check your DATABASE_URL in .env file")
