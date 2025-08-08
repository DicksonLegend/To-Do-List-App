// Demo API service for GitHub Pages deployment (no backend required)

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

// Demo data storage (localStorage-based for GitHub Pages)
const STORAGE_KEY = 'todo-app-demo-tasks';

let demoTasks: TaskResponse[] = [
  {
    id: 1,
    text: '🎉 Welcome to the Todo App Demo!',
    description: 'This demo runs entirely in your browser using localStorage. In production, it connects to a FastAPI backend with PostgreSQL.',
    completed: false,
    priority: 'high',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    text: '⚡ Try adding a new task',
    description: 'Click the "Add Task" button to create your own tasks',
    completed: false,
    priority: 'medium',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    text: '✅ Mark this task as completed',
    description: 'Click the checkbox to see the completion animation',
    completed: false,
    priority: 'low',
    created_at: new Date().toISOString()
  }
];

// Load tasks from localStorage or use demo data
const loadTasks = (): TaskResponse[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.log('Using demo data');
  }
  return [...demoTasks];
};

// Save tasks to localStorage
const saveTasks = (tasks: TaskResponse[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
};

let currentTasks = loadTasks();

// Simulate API delay for realistic demo
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all tasks
export const getTasks = async (): Promise<TaskResponse[]> => {
  await delay(300); // Simulate network delay
  return currentTasks;
};

// Create a new task
export const createTask = async (task: TaskCreate): Promise<TaskResponse | null> => {
  await delay(500);
  
  const newTask: TaskResponse = {
    id: Math.max(0, ...currentTasks.map(t => t.id)) + 1,
    text: task.text,
    description: task.description,
    completed: false,
    priority: task.priority,
    created_at: new Date().toISOString()
  };
  
  currentTasks = [newTask, ...currentTasks];
  saveTasks(currentTasks);
  return newTask;
};

// Update a task
export const updateTask = async (id: number, updates: TaskUpdate): Promise<TaskResponse | null> => {
  await delay(300);
  
  const taskIndex = currentTasks.findIndex(t => t.id === id);
  if (taskIndex === -1) return null;
  
  currentTasks[taskIndex] = { ...currentTasks[taskIndex], ...updates };
  saveTasks(currentTasks);
  return currentTasks[taskIndex];
};

// Delete a task
export const deleteTask = async (id: number): Promise<boolean> => {
  await delay(400);
  
  const initialLength = currentTasks.length;
  currentTasks = currentTasks.filter(t => t.id !== id);
  
  if (currentTasks.length < initialLength) {
    saveTasks(currentTasks);
    return true;
  }
  return false;
};
