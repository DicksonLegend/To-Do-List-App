import React, { useState, useEffect } from 'react';
import { ListTodo } from 'lucide-react';
import { Task } from '../types';
import { TaskCard, AddTaskForm, Statistics, FilterBar } from '../components';

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load tasks from memory on component mount
  useEffect(() => {
    const savedTasks: Task[] = [];
    if (savedTasks.length > 0) {
      setTasks(savedTasks);
    } else {
      // Demo tasks for initial load
      const demoTasks: Task[] = [
        {
          id: 1,
          text: 'Welcome to your creative to-do app!',
          description: 'This is a sample task to get you started. You can edit, complete, or delete it.',
          completed: false,
          priority: 'high',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          text: 'Complete the React project',
          description: 'Finish building the todo app with all features',
          completed: false,
          priority: 'medium',
          createdAt: new Date().toISOString()
        }
      ];
      setTasks(demoTasks);
    }
  }, []);

  // Save tasks to memory whenever tasks change
  useEffect(() => {
    // In a real app, you would save to localStorage here
    // localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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
