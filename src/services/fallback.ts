// Fallback local storage service for when backend is not available
import { Task } from '../types';

const STORAGE_KEY = 'todo-tasks-fallback';

export const localStorageFallback = {
  // Get tasks from localStorage
  getTasks: (): Task[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  // Save tasks to localStorage
  saveTasks: (tasks: Task[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  // Add a new task
  addTask: (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>): Task => {
    const tasks = localStorageFallback.getTasks();
    const newTask: Task = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    const updatedTasks = [newTask, ...tasks];
    localStorageFallback.saveTasks(updatedTasks);
    return newTask;
  },

  // Update a task
  updateTask: (id: number, updates: Partial<Task>): Task | null => {
    const tasks = localStorageFallback.getTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) return null;
    
    const updatedTask = { ...tasks[taskIndex], ...updates };
    tasks[taskIndex] = updatedTask;
    localStorageFallback.saveTasks(tasks);
    return updatedTask;
  },

  // Delete a task
  deleteTask: (id: number): boolean => {
    const tasks = localStorageFallback.getTasks();
    const filteredTasks = tasks.filter(t => t.id !== id);
    
    if (filteredTasks.length === tasks.length) return false;
    
    localStorageFallback.saveTasks(filteredTasks);
    return true;
  }
};
