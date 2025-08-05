import React from 'react';
import { Search } from 'lucide-react';
import { FilterBarProps } from '../types';

const FilterBar: React.FC<FilterBarProps> = ({ filter, setFilter, searchTerm, setSearchTerm }) => {
  const filters = [
    { id: 'all', label: 'All Tasks', count: '' },
    { id: 'pending', label: 'Pending', count: '' },
    { id: 'completed', label: 'Completed', count: '' },
    { id: 'high', label: 'High Priority', count: '' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === f.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 hover:scale-105'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks..."
            className="pl-12 pr-6 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-80 bg-gray-50/50 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
