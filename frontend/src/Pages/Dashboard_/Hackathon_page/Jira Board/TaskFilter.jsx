import React, { useState, useRef, useEffect } from 'react';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';

const TaskFilter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      priority: 'all',
      assignee: 'all',
      dueDate: 'all',
      difficulty: 'all',
    });
    setIsOpen(false);
  };

  // Count active filters
  const activeFilterCount = Object.values(filters).filter(f => f !== 'all').length;

  return (
    <div className="relative" ref={filterRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center rounded-md px-3 py-2 ${
          activeFilterCount > 0
            ? 'bg-dark-secondary1 bg-opacity-10 text-dark-secondary1'
            : 'bg-gray-100 text-dark-secondary1'
        }`}
      >
        <FiFilter className="mr-1" />
        <span>Filter</span>
        {activeFilterCount > 0 && (
          <span className="ml-1 rounded-full bg-dark-secondary1 px-1.5 py-0.5 text-xs font-bold text-light-primary">
            {activeFilterCount}
          </span>
        )}
        <FiChevronDown className="ml-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg border border-gray-200">
          <div className="p-3">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-dark-primary">Filter Tasks</h3>
              <button
                onClick={clearFilters}
                className="flex items-center text-xs text-dark-secondary1 hover:text-dark-primary"
              >
                <FiX className="mr-1" /> Clear all
              </button>
            </div>

            <div className="space-y-4">
              {/* Priority filter */}
              <div>
                <label className="mb-1 block text-xs font-medium text-dark-secondary1">
                  Priority
                </label>
                <select
                  value={filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-dark-primary outline-none focus:ring-2 focus:ring-dark-secondary1"
                >
                  <option value="all">All Priorities</option>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>

              {/* Due date filter */}
              <div>
                <label className="mb-1 block text-xs font-medium text-dark-secondary1">
                  Due Date
                </label>
                <select
                  value={filters.dueDate}
                  onChange={(e) => handleFilterChange('dueDate', e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-dark-primary outline-none focus:ring-2 focus:ring-dark-secondary1"
                >
                  <option value="all">All Due Dates</option>
                  <option value="overdue">Overdue</option>
                  <option value="today">Due Today</option>
                  <option value="week">Due This Week</option>
                </select>
              </div>

              {/* Difficulty filter */}
              <div>
                <label className="mb-1 block text-xs font-medium text-dark-secondary1">
                  Difficulty
                </label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-dark-primary outline-none focus:ring-2 focus:ring-dark-secondary1"
                >
                  <option value="all">All Difficulties</option>
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
              </div>

              {/* Assignee filter */}
              <div>
                <label className="mb-1 block text-xs font-medium text-dark-secondary1">
                  Assignee
                </label>
                <select
                  value={filters.assignee}
                  onChange={(e) => handleFilterChange('assignee', e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-dark-primary outline-none focus:ring-2 focus:ring-dark-secondary1"
                >
                  <option value="all">All Assignees</option>
                  <option value="user1">John Doe</option>
                  <option value="user2">Jane Smith</option>
                  <option value="user3">Alex Johnson</option>
                  <option value="unassigned">Unassigned</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFilter;