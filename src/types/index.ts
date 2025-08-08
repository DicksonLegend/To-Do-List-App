export interface Task {
  id: number;
  text: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt?: string;
  userId?: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onTogglePriority: (id: number) => void;
  onDownload: (task: Task) => void;
}

export interface AddTaskFormProps {
  onAddTask: (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
}

export interface StatisticsProps {
  tasks: Task[];
}

export interface FilterBarProps {
  filter: string;
  setFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}
