import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const CreateTaskModal = ({ onClose, onCreate, teamId }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    difficulty: 'MEDIUM',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default to 1 week from now
    estimatedTime: 2,
    teamId,
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!task.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!task.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    // Convert dueDate from YYYY-MM-DD to ISO string
    const formattedTask = {
      ...task,
      dueDate: new Date(task.dueDate).toISOString(),
    };
    
    onCreate(formattedTask);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark-primary">Create New Task</h2>
          <button
            className="text-dark-secondary1 hover:text-dark-primary"
            onClick={onClose}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-dark-secondary1">
              Task Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className={`w-full rounded-md border p-2 text-dark-primary outline-none focus:ring-2 focus:ring-dark-secondary1 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-600">{errors.title}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-dark-secondary1">
              Description
            </label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-gray-300 p-2 text-dark-primary outline-none focus:ring-2 focus:ring-dark-secondary1"
              placeholder="Describe what needs to be done..."
            />
          </div>
          
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-dark-secondary1">
                Priority
              </label>
              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-dark-primary outline-none focus:ring-2 focus:ring-dark-secondary1"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium text-dark-secondary1">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={task.difficulty}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-dark-primary outline-none focus:ring-2 focus:ring-dark-secondary1"
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-dark-secondary1">
                Due Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                className={`w-full rounded-md border p-2 text-dark-primary outline-none focus:ring-2 focus:ring-dark-secondary1 ${
                  errors.dueDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dueDate && (
                <p className="mt-1 text-xs text-red-600">{errors.dueDate}</p>
              )}
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium text-dark-secondary1">
                Estimated Time (hours)
              </label>
              <input
                type="number"
                name="estimatedTime"
                value={task.estimatedTime || ''}
                onChange={handleChange}
                min="0"
                step="0.5"
                className="w-full rounded-md border border-gray-300 p-2 text-dark-primary outline-none focus:ring-2 focus:ring-dark-secondary1"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 font-medium text-dark-primary transition-colors hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-dark-primary px-4 py-2 font-medium text-light-primary transition-colors hover:bg-opacity-80 disabled:cursor-not-allowed disabled:bg-opacity-50"
            >
              {loading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;