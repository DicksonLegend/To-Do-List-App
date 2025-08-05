export interface Task {
  id: number;
  text: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
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
