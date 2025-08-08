// API service for connecting to FastAPI backend
import { API_BASE_URL } from '../config/environment';
import { localStorageFallback } from './fallback';
import { Task } from '../types';

// Convert API response to Task format
const convertApiTaskToTask = (apiTask: TaskResponse): Task => ({
  id: apiTask.id,
  text: apiTask.text,
  description: apiTask.description,
  completed: apiTask.completed,
  priority: apiTask.priority,
  createdAt: apiTask.created_at
});

// Check if backend is available
const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, { 
      method: 'GET',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    return response.ok;
  } catch {
    return false;
  }
};

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

// Get all tasks (with fallback to localStorage)
export const getTasks = async (): Promise<Task[]> => {
  try {
    // Check if backend is available
    const isBackendAvailable = await checkBackendHealth();
    
    if (!isBackendAvailable) {
      console.warn('⚠️ Backend not available, using localStorage fallback');
      return localStorageFallback.getTasks();
    }

    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    
    const data = await response.json();
    const apiTasks = data.tasks || [];
    
    // Convert API tasks to Task format
    return apiTasks.map(convertApiTaskToTask);
    
  } catch (error) {
    console.error('Error fetching tasks from API, using fallback:', error);
    return localStorageFallback.getTasks();
  }
};

// Create a new task (with fallback to localStorage)
export const createTask = async (task: TaskCreate): Promise<Task | null> => {
  try {
    // Check if backend is available
    const isBackendAvailable = await checkBackendHealth();
    
    if (!isBackendAvailable) {
      console.warn('⚠️ Backend not available, using localStorage fallback');
      return localStorageFallback.addTask(task);
    }

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
    return convertApiTaskToTask(data.task);
    
  } catch (error) {
    console.error('Error creating task, using fallback:', error);
    return localStorageFallback.addTask(task);
  }
};

// Update a task (with fallback to localStorage)
export const updateTask = async (id: number, updates: TaskUpdate): Promise<Task | null> => {
  try {
    // Check if backend is available
    const isBackendAvailable = await checkBackendHealth();
    
    if (!isBackendAvailable) {
      console.warn('⚠️ Backend not available, using localStorage fallback');
      return localStorageFallback.updateTask(id, updates);
    }

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
    return convertApiTaskToTask(data.task);
    
  } catch (error) {
    console.error('Error updating task, using fallback:', error);
    return localStorageFallback.updateTask(id, updates);
  }
};

// Delete a task (with fallback to localStorage)
export const deleteTask = async (id: number): Promise<boolean> => {
  try {
    // Check if backend is available
    const isBackendAvailable = await checkBackendHealth();
    
    if (!isBackendAvailable) {
      console.warn('⚠️ Backend not available, using localStorage fallback');
      return localStorageFallback.deleteTask(id);
    }

    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    
    return true;
    
  } catch (error) {
    console.error('Error deleting task, using fallback:', error);
    return localStorageFallback.deleteTask(id);
  }
};
