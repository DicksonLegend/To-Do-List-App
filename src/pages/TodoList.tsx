import React, { useState, useEffect } from 'react';
import { ListTodo } from 'lucide-react';
import { Task } from '../types';
import { TaskCard, AddTaskForm, Statistics, FilterBar } from '../components';
import { useTaskStorage } from '../hooks/useLocalStorage';

const TodoList: React.FC = () => {
  const { tasks, setTasks } = useTaskStorage();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize with demo tasks if no tasks exist
  useEffect(() => {
    if (tasks.length === 0) {
      const demoTasks: Task[] = [
        {
          id: 1,
          text: 'Welcome to your creative to-do app! 🎉',
          description: 'This is a sample task to get you started. Your tasks are now automatically saved to your browser\'s local storage and will persist between sessions!',
          completed: false,
          priority: 'high',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          text: 'Complete the React project',
          description: 'Finish building the todo app with all features including local storage',
          completed: false,
          priority: 'medium',
          createdAt: new Date().toISOString()
        }
      ];
      setTasks(demoTasks);
    }
  }, [tasks.length, setTasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: Task = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const togglePriority = (id: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            priority: task.priority === 'high' ? 'medium' : 'high'
          }
        : task
    ));
  };

  const downloadTask = (task: Task) => {
    const taskData = {
      id: task.id,
      text: task.text,
      description: task.description,
      completed: task.completed,
      priority: task.priority,
      createdAt: task.createdAt,
      downloadedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(taskData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `task-${task.id}-${task.text.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filter tasks based on current filter and search term
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    switch (filter) {
      case 'pending':
        return !task.completed && matchesSearch;
      case 'completed':
        return task.completed && matchesSearch;
      case 'high':
        return task.priority === 'high' && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Statistics */}
      <Statistics tasks={tasks} />

      {/* Add Task Form */}
      <div className="mb-8">
        <AddTaskForm onAddTask={addTask} />
      </div>

      {/* Filter Bar */}
      <FilterBar 
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Tasks List */}
      <div className="space-y-5">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onTogglePriority={togglePriority}
              onDownload={downloadTask}
            />
          ))
        ) : (
          <div className="text-center py-16">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ListTodo size={48} className="text-indigo-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              {searchTerm || filter !== 'all' ? 'No tasks found' : 'No tasks yet'}
            </h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter to find what you\'re looking for'
                : 'Start your productivity journey by adding your first task!'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
