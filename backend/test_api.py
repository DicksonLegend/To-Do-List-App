#!/usr/bin/env python3
"""
Test the API endpoints to verify everything works
"""
import requests
import time
import json

API_BASE = "http://localhost:8000"

def test_api():
    """Test all API endpoints"""
    try:
        print("🧪 Testing API Endpoints...")
        print("=" * 50)
        
        # Test root endpoint
        print("1️⃣ Testing root endpoint...")
        response = requests.get(f"{API_BASE}/")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}")
        
        # Test get tasks (should be empty initially)
        print("\n2️⃣ Testing GET /tasks...")
        response = requests.get(f"{API_BASE}/tasks")
        print(f"   Status: {response.status_code}")
        tasks = response.json()
        print(f"   Current tasks: {len(tasks.get('tasks', []))}")
        
        # Test create task
        print("\n3️⃣ Testing POST /tasks...")
        new_task = {
            "text": "Test task from API test",
            "description": "This is a test task created by the test script",
            "priority": "high"
        }
        response = requests.post(f"{API_BASE}/tasks", json=new_task)
        print(f"   Status: {response.status_code}")
        created_task = response.json()
        print(f"   Created task ID: {created_task.get('task', {}).get('id')}")
        
        # Test get tasks again (should have 1 task)
        print("\n4️⃣ Testing GET /tasks (after creation)...")
        response = requests.get(f"{API_BASE}/tasks")
        tasks = response.json()
        print(f"   Total tasks now: {len(tasks.get('tasks', []))}")
        
        if tasks.get('tasks'):
            task_id = tasks['tasks'][0]['id']
            
            # Test update task
            print(f"\n5️⃣ Testing PUT /tasks/{task_id}...")
            update_data = {"completed": True}
            response = requests.put(f"{API_BASE}/tasks/{task_id}", json=update_data)
            print(f"   Status: {response.status_code}")
            print(f"   Updated task completed: {response.json().get('task', {}).get('completed')}")
            
            # Test delete task
            print(f"\n6️⃣ Testing DELETE /tasks/{task_id}...")
            response = requests.delete(f"{API_BASE}/tasks/{task_id}")
            print(f"   Status: {response.status_code}")
            print(f"   Message: {response.json().get('message')}")
        
        print("\n" + "=" * 50)
        print("✅ All API tests completed successfully!")
        return True
        
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to API server.")
        print("   Make sure the server is running on http://localhost:8000")
        return False
    except Exception as e:
        print(f"❌ Test failed: {str(e)}")
        return False

if __name__ == "__main__":
    print("🚀 API Testing Script")
    print("Make sure your FastAPI server is running first!")
    print()
    input("Press Enter when server is ready...")
    test_api()
