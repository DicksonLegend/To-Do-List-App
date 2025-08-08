// Simple API service for connecting to FastAPI backend
const API_BASE_URL = 'http://localhost:8000';

export interface TaskResponse {
  id: number;
  text: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}

export interface TaskCreate {
  text: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface TaskUpdate {
  text?: string;
  description?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
}

// Get all tasks
export const getTasks = async (): Promise<TaskResponse[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    return data.tasks || [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

// Create a new task
export const createTask = async (task: TaskCreate): Promise<TaskResponse | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    
    const data = await response.json();
    return data.task;
  } catch (error) {
    console.error('Error creating task:', error);
    return null;
  }
};

// Update a task
export const updateTask = async (id: number, updates: TaskUpdate): Promise<TaskResponse | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    
    const data = await response.json();
    return data.task;
  } catch (error) {
    console.error('Error updating task:', error);
    return null;
  }
};

// Delete a task
export const deleteTask = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};
