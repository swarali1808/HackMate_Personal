import React, { useState, useEffect } from 'react';
import { FaRegClock, FaTrashAlt, FaRegEdit, FaArrowUp, FaArrowDown, FaPlus, FaTimes } from 'react-icons/fa';
import { priorityColorsLight, getDaysRemaining } from './taskUtils';

const TaskModal = ({ task: initialTask, onClose, onUpdate, onDelete }) => {
  const [task, setTask] = useState(initialTask);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(initialTask);
  const [checklist, setChecklist] = useState(initialTask.checkList || []);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeTracking, setTimeTracking] = useState({
    isTracking: false,
    startTime: null,
    elapsedTime: task.actualTime || 0,
  });

  // Fetch comments when modal opens
  useEffect(() => {
    /* 
    // Backend integration for fetching comments
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/comments/task/${task.id}`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });
        if (!response.ok) throw new Error('Failed to fetch comments');
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };
    
    fetchComments();
    */
    
    // Mock comments for development
    setComments([
      {
        id: 'comment-1',
        content: 'I think we should prioritize this for the hackathon demo.',
        userId: 'user1',
        createdAt: '2025-04-08T14:22:00Z',
        user: { name: 'John Doe' },
      },
      {
        id: 'comment-2',
        content: 'I agree. Let me know if you need any help with the implementation.',
        userId: 'user2',
        createdAt: '2025-04-09T09:15:00Z',
        user: { name: 'Jane Smith' },
      },
    ]);
  }, [task.id]);

  // Handle time tracking timer
  useEffect(() => {
    let interval;
    
    if (timeTracking.isTracking) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = timeTracking.startTime
          ? (now - timeTracking.startTime) / 3600000 + timeTracking.elapsedTime
          : timeTracking.elapsedTime;
        
        setTimeTracking(prev => ({
          ...prev,
          elapsedTime: elapsed,
        }));
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [timeTracking.isTracking, timeTracking.startTime]);

  // Toggle time tracking
  const handleToggleTimeTracking = () => {
    if (timeTracking.isTracking) {
      // Stop tracking
      setTimeTracking(prev => ({
        ...prev,
        isTracking: false,
        startTime: null,
      }));
      
      // Update task with new time
      const updatedTask = {
        ...task,
        actualTime: timeTracking.elapsedTime,
      };
      
      setTask(updatedTask);
      onUpdate(updatedTask);
    } else {
      // Start tracking
      setTimeTracking(prev => ({
        ...prev,
        isTracking: true,
        startTime: Date.now(),
      }));
    }
  };

  // Add a comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: `comment-${Date.now()}`,
      content: newComment.trim(),
      userId: 'currentUser', // Would come from auth context in a real app
      createdAt: new Date().toISOString(),
      user: { name: 'Tanish Shah' }, // Using the current user's login
    };
    
    setComments([...comments, comment]);
    setNewComment('');
    
    /* 
    // Backend integration for adding comments
    const addComment = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          body: JSON.stringify({
            taskId: task.id,
            content: newComment.trim(),
          })
        });
        
        if (!response.ok) throw new Error('Failed to add comment');
        
        const comment = await response.json();
        setComments([...comments, comment]);
        setNewComment('');
      } catch (err) {
        console.error('Error adding comment:', err);
      }
    };
    
    addComment();
    */
  };

  // Toggle checklist item completion
  const handleToggleChecklistItem = (id) => {
    const updatedChecklist = checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    
    setChecklist(updatedChecklist);
    
    // Update task with new checklist
    const updatedTask = {
      ...task,
      checkList: updatedChecklist,
    };
    
    setTask(updatedTask);
    
    /* 
    // Backend integration for updating checklist items
    const updateChecklistItem = async (id, completed) => {
      try {
        const response = await fetch(`http://localhost:5000/api/checklistItems/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          body: JSON.stringify({
            completed: !completed,
          })
        });
        
        if (!response.ok) throw new Error('Failed to update checklist item');
      } catch (err) {
        console.error('Error updating checklist item:', err);
        // Revert change on error
        setChecklist(checklist);
      }
    };
    
    const item = checklist.find(item => item.id === id);
    if (item) {
      updateChecklistItem(id, item.completed);
    }
    */
  };

  // Add a checklist item
  const handleAddChecklistItem = () => {
    if (!newChecklistItem.trim()) return;
    
    const newItem = {
      id: `checklist-${Date.now()}`,
      text: newChecklistItem.trim(),
      completed: false,
      rank: checklist.length,
    };
    
    const updatedChecklist = [...checklist, newItem];
    setChecklist(updatedChecklist);
    setNewChecklistItem('');
    
    // Update task with new checklist
    const updatedTask = {
      ...task,
      checkList: updatedChecklist,
    };
    
    setTask(updatedTask);
    
    /* 
    // Backend integration for adding checklist items
    const addChecklistItem = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/checklistItems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          body: JSON.stringify({
            taskId: task.id,
            text: newChecklistItem.trim(),
            rank: checklist.length,
          })
        });
        
        if (!response.ok) throw new Error('Failed to add checklist item');
        
        const item = await response.json();
        setChecklist([...checklist, item]);
        setNewChecklistItem('');
      } catch (err) {
        console.error('Error adding checklist item:', err);
      }
    };
    
    addChecklistItem();
    */
  };

  // Move checklist item up or down
  const handleMoveChecklistItem = (id, direction) => {
    const index = checklist.findIndex(item => item.id === id);
    if (index === -1) return;
    
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === checklist.length - 1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedChecklist = [...checklist];
    
    // Swap the items
    [updatedChecklist[index], updatedChecklist[newIndex]] = 
    [updatedChecklist[newIndex], updatedChecklist[index]];
    
    // Update ranks
    updatedChecklist.forEach((item, idx) => {
      item.rank = idx;
    });
    
    setChecklist(updatedChecklist);
    
    // Update task with new checklist
    const updatedTask = {
      ...task,
      checkList: updatedChecklist,
    };
    
    setTask(updatedTask);
    
    /* 
    // Backend integration for updating checklist item ranks
    const updateChecklistItemRanks = async () => {
      try {
        // Update both items with new ranks
        await Promise.all([
          fetch(`http://localhost:5000/api/checklistItems/${updatedChecklist[index].id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
              rank: updatedChecklist[index].rank,
            })
          }),
          fetch(`http://localhost:5000/api/checklistItems/${updatedChecklist[newIndex].id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
              rank: updatedChecklist[newIndex].rank,
            })
          })
        ]);
      } catch (err) {
        console.error('Error updating checklist item ranks:', err);
        // Revert change on error
        setChecklist(checklist);
      }
    };
    
    updateChecklistItemRanks();
    */
  };

  // Delete a checklist item
  const handleDeleteChecklistItem = (id) => {
    const updatedChecklist = checklist.filter(item => item.id !== id);
    
    // Update ranks
    updatedChecklist.forEach((item, idx) => {
      item.rank = idx;
    });
    
    setChecklist(updatedChecklist);
    
    // Update task with new checklist
    const updatedTask = {
      ...task,
      checkList: updatedChecklist,
    };
    
    setTask(updatedTask);
    
    /* 
    // Backend integration for deleting checklist items
    const deleteChecklistItem = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/checklistItems/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });
        
        if (!response.ok) throw new Error('Failed to delete checklist item');
        
        // Update ranks for remaining items
        const remainingItems = updatedChecklist.map((item, idx) => ({ ...item, rank: idx }));
        
        await Promise.all(
          remainingItems.map(item => 
            fetch(`http://localhost:5000/api/checklistItems/${item.id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
              },
              body: JSON.stringify({ rank: item.rank })
            })
          )
        );
      } catch (err) {
        console.error('Error deleting checklist item:', err);
        // Revert change on error
        setChecklist(checklist);
      }
    };
    
    deleteChecklistItem();
    */
  };

  // Save edited task
  const handleSaveTask = () => {
    setLoading(true);
    
    // Update task with edited values
    const updatedTask = {
      ...task,
      ...editedTask,
      checkList: checklist,
    };
    
    setTask(updatedTask);
    setIsEditing(false);
    setLoading(false);
    
    // Call parent update handler
    onUpdate(updatedTask);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Calculate and format time spent
  const formatTimeSpent = (hours) => {
    if (!hours && hours !== 0) return 'Not tracked';
    
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    
    if (wholeHours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${wholeHours}h`;
    } else {
      return `${wholeHours}h ${minutes}m`;
    }
  };

  // Calculate checklist completion percentage
  const checklistTotal = checklist.length;
  const checklistCompleted = checklist.filter(item => item.completed).length;
  const checklistPercentage = checklistTotal > 0
    ? Math.round((checklistCompleted / checklistTotal) * 100)
    : 0;

  // Get priority styling
  const priorityStyle = priorityColorsLight[task.priority] || priorityColorsLight.DEFAULT;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-lg bg-white p-4 sm:p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Task header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between">
          <div className="flex-1 mb-4 sm:mb-0">
            {isEditing ? (
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-dark-secondary1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  className="w-full rounded-md bg-light-primary p-2 text-dark-primary outline-none border border-gray-300 focus:ring-2 focus:ring-dark-secondary1"
                />
              </div>
            ) : (
              <h2 className="text-2xl font-bold text-dark-primary">{task.title}</h2>
            )}
            
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span 
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyle}`}
              >
                {task.priority}
              </span>
              
              {task.difficulty && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-dark-secondary1">
                  {task.difficulty}
                </span>
              )}
              
              <span className="inline-flex items-center text-sm text-dark-secondary1">
                <FaRegClock className="mr-1" />
                {formatDate(task.dueDate)}
                {getDaysRemaining(task.dueDate) === 0 && ' (Today)'}
                {getDaysRemaining(task.dueDate) > 0 && ` (${getDaysRemaining(task.dueDate)}d remaining)`}
                {getDaysRemaining(task.dueDate) < 0 && ' (Overdue)'}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button
                  className="rounded-md bg-dark-primary px-3 py-1 font-medium text-light-primary transition-colors hover:bg-opacity-80"
                  onClick={handleSaveTask}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  className="rounded-md bg-gray-200 px-3 py-1 text-dark-primary transition-colors hover:bg-opacity-80"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedTask(task);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="rounded-md bg-dark-primary px-3 py-1 font-medium text-light-primary transition-colors hover:bg-opacity-80"
                  onClick={() => setIsEditing(true)}
                >
                  <FaRegEdit className="mr-1 inline" /> Edit
                </button>
                <button
                  className="rounded-md bg-red-100 px-3 py-1 text-red-600 transition-colors hover:bg-opacity-80"
                  onClick={() => onDelete(task.id)}
                >
                  <FaTrashAlt className="mr-1 inline" /> Delete
                </button>
                <button
                  className="rounded-md bg-gray-200 px-2 py-1 text-dark-primary transition-colors hover:bg-opacity-80 ml-2 sm:hidden"
                  onClick={onClose}
                >
                  <FaTimes />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Task content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column: description and checklist */}
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            <div className="rounded-md bg-light-primary p-4 border border-gray-200">
              <h3 className="mb-3 text-lg font-medium text-dark-primary">Description</h3>
              
              {isEditing ? (
                <textarea
                  value={editedTask.description || ''}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  className="min-h-[100px] w-full rounded-md bg-white p-2 text-dark-primary outline-none border border-gray-300 focus:ring-2 focus:ring-dark-secondary1"
                  placeholder="Add a description..."
                />
              ) : (
                <div className="prose prose-sm max-w-none">
                  {task.description || <span className="text-dark-secondary1">No description provided</span>}
                </div>
              )}
            </div>
            
            {/* Checklist */}
            <div className="rounded-md bg-light-primary p-4 border border-gray-200">
              <h3 className="mb-3 text-lg font-medium text-dark-primary">
                Checklist
                <span className="ml-2 text-sm text-dark-secondary1">
                  {checklistCompleted}/{checklistTotal} completed • {checklistPercentage}%
                </span>
              </h3>
              
              {/* Progress bar */}
              <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div 
                  className="h-full rounded-full bg-dark-primary" 
                  style={{ width: `${checklistPercentage}%` }}
                ></div>
              </div>
              
              {/* Checklist items */}
              <ul className="mb-4 space-y-2">
                {checklist.map(item => (
                  <li key={item.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggleChecklistItem(item.id)}
                      className="mr-2 h-4 w-4 rounded text-dark-secondary1 focus:ring-dark-secondary1"
                    />
                    <span className={`flex-1 ${item.completed ? 'text-dark-secondary1 line-through' : 'text-dark-primary'}`}>
                      {item.text}
                    </span>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleMoveChecklistItem(item.id, 'up')}
                        className="p-1 text-dark-secondary1 hover:text-dark-primary"
                        title="Move up"
                      >
                        <FaArrowUp size={12} />
                      </button>
                      <button
                        onClick={() => handleMoveChecklistItem(item.id, 'down')}
                        className="p-1 text-dark-secondary1 hover:text-dark-primary"
                        title="Move down"
                      >
                        <FaArrowDown size={12} />
                      </button>
                      <button
                        onClick={() => handleDeleteChecklistItem(item.id)}
                        className="p-1 text-red-600 hover:text-red-500"
                        title="Delete"
                      >
                        <FaTrashAlt size={12} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              
              {/* Add checklist item */}
              <div className="flex items-center">
                <input
                  type="text"
                  value={newChecklistItem}
                  onChange={(e) => setNewChecklistItem(e.target.value)}
                  placeholder="Add a new item..."
                  className="flex-1 rounded-l-md bg-white p-2 text-dark-primary outline-none border border-gray-300 focus:ring-2 focus:ring-dark-secondary1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newChecklistItem.trim()) {
                      handleAddChecklistItem();
                    }
                  }}
                />
                <button
                  onClick={handleAddChecklistItem}
                  disabled={!newChecklistItem.trim()}
                  className="rounded-r-md bg-dark-primary p-2 font-medium text-light-primary transition-colors hover:bg-opacity-80 disabled:cursor-not-allowed disabled:bg-opacity-50"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
          
          {/* Right column: details, comments, time tracking */}
          <div className="space-y-6">
            {/* Task details */}
            <div className="rounded-md bg-light-primary p-4 border border-gray-200">
              <h3 className="mb-3 text-lg font-medium text-dark-primary">Details</h3>
              
              <div className="space-y-3 text-sm">
                {isEditing ? (
                  <>
                    <div>
                      <label className="mb-1 block font-medium text-dark-secondary1">
                        Priority
                      </label>
                      <select
                        value={editedTask.priority}
                        onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                        className="w-full rounded-md bg-white p-2 text-dark-primary outline-none border border-gray-300 focus:ring-2 focus:ring-dark-secondary1"
                      >
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                        <option value="CRITICAL">CRITICAL</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="mb-1 block font-medium text-dark-secondary1">
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setEditedTask({ 
                          ...editedTask, 
                          dueDate: e.target.value ? new Date(e.target.value).toISOString() : null 
                        })}
                        className="w-full rounded-md bg-white p-2 text-dark-primary outline-none border border-gray-300 focus:ring-2 focus:ring-dark-secondary1"
                      />
                    </div>
                    
                    <div>
                      <label className="mb-1 block font-medium text-dark-secondary1">
                        Difficulty
                      </label>
                      <select
                        value={editedTask.difficulty}
                        onChange={(e) => setEditedTask({ ...editedTask, difficulty: e.target.value })}
                        className="w-full rounded-md bg-white p-2 text-dark-primary outline-none border border-gray-300 focus:ring-2 focus:ring-dark-secondary1"
                      >
                        <option value="EASY">EASY</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HARD">HARD</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="mb-1 block font-medium text-dark-secondary1">
                        Estimated Time (hours)
                      </label>
                      <input
                        type="number"
                        value={editedTask.estimatedTime || ''}
                        onChange={(e) => setEditedTask({ 
                          ...editedTask, 
                          estimatedTime: e.target.value ? parseFloat(e.target.value) : null 
                        })}
                        className="w-full rounded-md bg-white p-2 text-dark-primary outline-none border border-gray-300 focus:ring-2 focus:ring-dark-secondary1"
                        min="0"
                        step="0.5"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-dark-secondary1">Status</span>
                      <span className="font-medium">{task.status}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-dark-secondary1">Created</span>
                      <span className="font-medium">{formatDate(task.createdAt)}</span>
                    </div>
                    
                    {task.updatedAt && task.updatedAt !== task.createdAt && (
                      <div className="flex justify-between">
                        <span className="text-dark-secondary1">Updated</span>
                        <span className="font-medium">{formatDate(task.updatedAt)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-dark-secondary1">Estimated time</span>
                      <span className="font-medium">
                        {task.estimatedTime ? `${task.estimatedTime}h` : 'Not set'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-dark-secondary1">Time spent</span>
                      <span className="font-medium">{formatTimeSpent(timeTracking.elapsedTime)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Time tracking */}
            <div className="rounded-md bg-light-primary p-4 border border-gray-200">
              <h3 className="mb-3 text-lg font-medium text-dark-primary">Time Tracking</h3>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-dark-secondary1">Time spent</span>
                  <span>{formatTimeSpent(timeTracking.elapsedTime)}</span>
                </div>
                
                {task.estimatedTime && (
                  <>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div 
                        className={`h-full rounded-full ${
                          timeTracking.elapsedTime > task.estimatedTime ? 'bg-yellow-500' : 'bg-dark-primary'
                        }`}
                        style={{ 
                          width: `${Math.min(100, (timeTracking.elapsedTime / task.estimatedTime) * 100)}%` 
                        }}
                      ></div>
                    </div>
                    
                    <div className="mt-1 flex justify-between text-xs">
                      <span>{formatTimeSpent(timeTracking.elapsedTime)}</span>
                      <span>{formatTimeSpent(task.estimatedTime)}</span>
                    </div>
                  </>
                )}
              </div>
              
              <button
                onClick={handleToggleTimeTracking}
                className={`w-full rounded-md py-2 text-center font-medium ${
                  timeTracking.isTracking
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-green-100 text-green-600 hover:bg-green-200'
                }`}
              >
                {timeTracking.isTracking ? 'Stop Timer' : 'Start Timer'}
              </button>
            </div>
            
            {/* Comments */}
            <div className="rounded-md bg-light-primary p-4 border border-gray-200">
              <h3 className="mb-3 text-lg font-medium text-dark-primary">Comments</h3>
              
              <div className="mb-3 max-h-60 overflow-y-auto space-y-3">
                {comments.length === 0 ? (
                  <p className="text-center text-sm text-dark-secondary1">No comments yet</p>
                ) : (
                  comments.map(comment => (
                    <div key={comment.id} className="rounded bg-white p-3 border border-gray-100 shadow-sm">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-medium text-dark-primary">{comment.user?.name || 'Anonymous'}</span>
                        <span className="text-xs text-dark-secondary1">
                          {new Date(comment.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-dark-secondary1">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>
              
              <div className="flex items-center">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 rounded-l-md bg-white p-2 text-dark-primary outline-none border border-gray-300 focus:ring-2 focus:ring-dark-secondary1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newComment.trim()) {
                      handleAddComment();
                    }
                  }}
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="rounded-r-md bg-dark-primary p-2 font-medium text-light-primary transition-colors hover:bg-opacity-80 disabled:cursor-not-allowed disabled:bg-opacity-50"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;