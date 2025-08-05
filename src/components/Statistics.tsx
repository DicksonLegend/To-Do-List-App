import React from 'react';
import { CheckCircle2, ListTodo, Target, TrendingUp } from 'lucide-react';
import { StatisticsProps } from '../types';

const Statistics: React.FC<StatisticsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    { label: 'Total Tasks', value: totalTasks, icon: ListTodo, color: 'blue' },
    { label: 'Completed', value: completedTasks, icon: CheckCircle2, color: 'green' },
    { label: 'Pending', value: pendingTasks, icon: Target, color: 'orange' },
    { label: 'Completion Rate', value: `${completionRate}%`, icon: TrendingUp, color: 'purple' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in group" 
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2 font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className={`p-4 rounded-2xl bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform duration-300 ${
              stat.color === 'blue' ? 'from-blue-400 to-blue-600' :
              stat.color === 'green' ? 'from-green-400 to-green-600' :
              stat.color === 'orange' ? 'from-orange-400 to-orange-600' :
              'from-purple-400 to-purple-600'
            }`}>
              <stat.icon className="text-white" size={28} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
