// API service switcher - automatically uses demo mode for GitHub Pages
const isGitHubPages = window.location.hostname === 'dicksonlegend.github.io';
const isDevelopment = import.meta.env.DEV;

// Use demo API for GitHub Pages, real API for development/production with backend
export const apiService = isGitHubPages 
  ? await import('./api-demo')
  : await import('./api');

// Re-export all functions
export const { getTasks, createTask, updateTask, deleteTask } = apiService;
export type { TaskResponse, TaskCreate, TaskUpdate } = apiService;
