import React from 'react';
import { FaExclamationCircle, FaCheckCircle, FaRegClock, FaRegListAlt, FaRegComment, FaAward } from 'react-icons/fa';
import { priorityColorsLight, getDaysRemaining } from './taskUtils';

const TaskCard = ({ task }) => {
  // Calculate checklist completion percentage
  const checklistTotal = task.checkList?.length || 0;
  const checklistCompleted = task.checkList?.filter(item => item.completed).length || 0;
  const checklistPercentage = checklistTotal > 0
    ? Math.round((checklistCompleted / checklistTotal) * 100)
    : 0;
  
  // Format due date and calculate days remaining
  const dueDate = new Date(task.dueDate);
  const formattedDueDate = dueDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const daysRemaining = getDaysRemaining(task.dueDate);
  
  // Determine if task is overdue
  const isOverdue = daysRemaining < 0 && task.status !== 'COMPLETED';
  
  // Get priority styling
  const priorityStyle = priorityColorsLight[task.priority] || priorityColorsLight.DEFAULT;

  return (
    <div className={`rounded-md bg-light-secondary1 bg-opacity-10 p-3 shadow-sm hover:shadow-md ${
      isOverdue ? 'border-l-4 border-red-500' : `${
        task.aiSuggestion ? 'border-l-4 border-purple-500' : ''
      }`
    }`}>
      <div className="mb-2 flex items-center justify-between">
        <span 
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyle}`}
        >
          {task.priority}
        </span>
        
        {task.difficulty && (
          <span className="inline-flex items-center text-xs font-medium text-dark-secondary1">
            <FaAward className="mr-1" />
            {task.difficulty}
          </span>
        )}
      </div>
      
      <h3 className="mb-1 font-medium text-dark-primary">{task.title}</h3>
      
      {task.description && (
        <p className="mb-2 line-clamp-2 text-xs text-dark-secondary1">
          {task.description}
        </p>
      )}
      
      <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-dark-secondary1">
        <div className="mb-1 flex items-center">
          {task.aiSuggestion && (
            <span className="mr-2 rounded bg-purple-100 px-1 text-purple-700">AI</span>
          )}
          
          <span className={`flex items-center ${isOverdue ? 'text-red-600' : ''}`}>
            <FaRegClock className="mr-1" />
            {formattedDueDate}
            {daysRemaining === 0 && ' (Today)'}
            {daysRemaining > 0 && ` (${daysRemaining}d)`}
            {daysRemaining < 0 && ' (Overdue)'}
          </span>
        </div>
        
        <div className="flex items-center">
          {checklistTotal > 0 && (
            <span className="mr-2 flex items-center">
              <FaRegListAlt className="mr-1" />
              {checklistCompleted}/{checklistTotal}
            </span>
          )}
          
          {task.estimatedTime && (
            <span className="flex items-center text-dark-secondary1">
              {task.actualTime ? (
                <FaCheckCircle className={`mr-1 ${
                  task.actualTime > task.estimatedTime ? 'text-yellow-600' : 'text-green-600'
                }`} />
              ) : (
                <FaExclamationCircle className="mr-1 text-blue-600" />
              )}
              {task.actualTime || 0}/{task.estimatedTime}h
            </span>
          )}
        </div>
      </div>
      
      {/* Progress bar for checklist */}
      {checklistTotal > 0 && (
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-200">
          <div 
            className="h-full rounded-full bg-dark-secondary1" 
            style={{ width: `${checklistPercentage}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;