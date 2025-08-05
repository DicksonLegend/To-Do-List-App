import { useState, useEffect } from 'react';
import { Task } from '../types';

// Custom hook for localStorage with error handling and type safety
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};

// Hook specifically for tasks with additional utility functions
export const useTaskStorage = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('creative-todo-tasks', []);

  // Clear all tasks
  const clearAllTasks = () => {
    setTasks([]);
  };

  // Export tasks as JSON
  const exportTasks = () => {
    try {
      const dataStr = JSON.stringify(tasks, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `todo-tasks-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting tasks:', error);
    }
  };

  // Import tasks from JSON
  const importTasks = (file: File) => {
    return new Promise<Task[]>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          if (Array.isArray(imported)) {
            setTasks(imported as Task[]);
            resolve(imported as Task[]);
          } else {
            reject(new Error('Invalid file format'));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  };

  // Get storage info
  const getStorageInfo = () => {
    try {
      const tasksStr = JSON.stringify(tasks);
      const sizeInBytes = new Blob([tasksStr]).size;
      const sizeInKB = (sizeInBytes / 1024).toFixed(2);
      
      return {
        taskCount: tasks.length,
        storageSize: `${sizeInKB} KB`,
        lastModified: localStorage.getItem('creative-todo-tasks-lastModified') || 'Never'
      };
    } catch (error) {
      return {
        taskCount: 0,
        storageSize: '0 KB',
        lastModified: 'Error'
      };
    }
  };

  // Update last modified timestamp whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('creative-todo-tasks-lastModified', new Date().toISOString());
    }
  }, [tasks]);

  return {
    tasks,
    setTasks,
    clearAllTasks,
    exportTasks,
    importTasks,
    getStorageInfo
  };
};
