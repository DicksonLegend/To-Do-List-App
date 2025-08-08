import { Task } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Request failed');
    }
    return response.json();
  }

  // Task API methods
  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks/`, {
      headers: this.getAuthHeaders(),
    });
    const data = await this.handleResponse(response);
    return data.tasks;
  }

  async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(taskData),
    });
    const data = await this.handleResponse(response);
    return data.task;
  }

  async updateTask(taskId: number, updates: Partial<Task>): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    const data = await this.handleResponse(response);
    return data.task;
  }

  async deleteTask(taskId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    await this.handleResponse(response);
  }

  async createBulkTasks(tasks: Array<Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks/bulk`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(tasks),
    });
    const data = await this.handleResponse(response);
    return data.tasks;
  }
}

export const apiService = new ApiService();
