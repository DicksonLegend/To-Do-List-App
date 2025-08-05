import React from 'react';
import { CheckCircle2, Trash2, Calendar, Star, Download } from 'lucide-react';
import { TaskCardProps } from '../types';

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onDelete, onTogglePriority, onDownload }) => {
  return (
    <div className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-l-4 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] animate-slide-in-up border border-white/20 ${
      task.completed 
        ? 'border-l-emerald-400 bg-emerald-50/30' 
        : task.priority === 'high' 
          ? 'border-l-rose-400 bg-rose-50/30' 
          : task.priority === 'medium' 
            ? 'border-l-amber-400 bg-amber-50/30' 
            : 'border-l-indigo-400 bg-indigo-50/30'
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <button
              onClick={() => onToggle(task.id)}
              className={`mt-1 transition-all duration-200 hover:scale-110 ${
                task.completed ? 'text-emerald-500' : 'text-gray-400 hover:text-emerald-500'
              }`}
            >
              <CheckCircle2 size={24} className={task.completed ? 'fill-current' : ''} />
            </button>
            
            <div className="flex-1">
              <h3 className={`font-semibold text-lg transition-all duration-200 ${
                task.completed 
                  ? 'text-gray-500 line-through' 
                  : 'text-gray-800'
              }`}>
                {task.text}
              </h3>
              {task.description && (
                <p className={`text-sm mt-2 leading-relaxed ${
                  task.completed ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs text-gray-500 flex items-center gap-1.5 bg-gray-100/80 px-3 py-1 rounded-full">
                  <Calendar size={14} />
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  task.priority === 'high' 
                    ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                    : task.priority === 'medium' 
                      ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                      : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                }`}>
                  {task.priority} priority
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button
              onClick={() => onTogglePriority(task.id)}
              className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                task.priority === 'high' ? 'text-amber-500 bg-amber-100' : 'text-gray-400 hover:text-amber-500 hover:bg-amber-100'
              }`}
              title="Toggle Priority"
            >
              <Star size={18} className={task.priority === 'high' ? 'fill-current' : ''} />
            </button>
            <button
              onClick={() => onDownload(task)}
              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-100 transition-all duration-200 rounded-xl hover:scale-110"
              title="Download Task"
            >
              <Download size={18} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-100 transition-all duration-200 rounded-xl hover:scale-110"
              title="Delete Task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
