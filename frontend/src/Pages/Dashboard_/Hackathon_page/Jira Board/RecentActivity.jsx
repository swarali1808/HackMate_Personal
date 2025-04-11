import React from 'react';
import { FaPlus, FaCheck, FaPencilAlt, FaComment, FaList } from 'react-icons/fa';

const RecentActivity = ({ activities }) => {
  // Get icon based on activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'created_task':
        return <FaPlus className="text-blue-500" />;
      case 'completed_task':
        return <FaCheck className="text-green-500" />;
      case 'updated_task':
        return <FaPencilAlt className="text-purple-500" />;
      case 'commented':
        return <FaComment className="text-yellow-500" />;
      case 'updated_checklist':
        return <FaList className="text-orange-500" />;
      default:
        return <FaPencilAlt className="text-gray-500" />;
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffMins < 1440) {
      return `${Math.floor(diffMins / 60)}h ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-dark-secondary1">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-dark-primary">{activity.description}</p>
            <p className="text-xs text-dark-secondary1">{formatTimestamp(activity.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;