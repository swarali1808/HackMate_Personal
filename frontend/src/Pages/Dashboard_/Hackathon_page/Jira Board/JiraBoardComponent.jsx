import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import TaskModal from './TaskModal';
import TaskFilter from './TaskFilter';
import { FiFilter, FiSearch, FiPlus } from 'react-icons/fi';
import { FaFire, FaClock, FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import CreateTaskModal from './CreateTaskModal';
import { priorityColorsLight, getDaysRemaining } from './taskUtils';
import DeleteZone from './DeleteZone';

const JiraBoardComponent = ({ teamId }) => {
  // State for tasks, columns, and UI elements
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState({
    backlog: { id: 'backlog', title: 'BACKLOG', taskIds: [] },
    todo: { id: 'todo', title: 'TO DO', taskIds: [] },
    inProgress: { id: 'inProgress', title: 'IN PROGRESS', taskIds: [] },
    review: { id: 'review', title: 'REVIEW', taskIds: [] },
    done: { id: 'done', title: 'DONE', taskIds: [] },
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priority: 'all',
    assignee: 'all',
    dueDate: 'all',
    difficulty: 'all',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteHighlighted, setDeleteHighlighted] = useState(false);

  // Fetch tasks from backend when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        // Mock data for development - will be replaced with API call
        const mockTasks = generateMockTasks(15);
        setTasks(mockTasks);
        
        // Organize tasks into columns
        const columnMap = {
          backlog: [],
          todo: [],
          inProgress: [],
          review: [],
          done: [],
        };
        
        mockTasks.forEach(task => {
          const status = mapStatusToColumn(task.status);
          columnMap[status].push(task.id);
        });
        
        setColumns(prevColumns => {
          const newColumns = { ...prevColumns };
          Object.keys(newColumns).forEach(colId => {
            newColumns[colId] = {
              ...newColumns[colId],
              taskIds: columnMap[colId],
            };
          });
          return newColumns;
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchTasks();
    
    /* Backend integration will look like this:
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/team/${teamId}/tasks`, {
          headers: { 
            Authorization: localStorage.getItem('token') 
          }
        });
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data);
        
        // Organize tasks into columns
        const columnMap = {
          backlog: [],
          todo: [],
          inProgress: [],
          review: [],
          done: [],
        };
        
        data.forEach(task => {
          const status = mapStatusToColumn(task.status);
          columnMap[status].push(task.id);
        });
        
        setColumns(prevColumns => {
          const newColumns = { ...prevColumns };
          Object.keys(newColumns).forEach(colId => {
            newColumns[colId] = {
              ...newColumns[colId],
              taskIds: columnMap[colId],
            };
          });
          return newColumns;
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks. Please try again later.');
        setLoading(false);
      }
    };
    */
  }, [teamId]);

  // Map backend status to column ID
  const mapStatusToColumn = (status) => {
    const statusMap = {
      'PENDING': 'backlog',
      'TODO': 'todo',
      'IN_PROGRESS': 'inProgress',
      'REVIEW': 'review',
      'COMPLETED': 'done',
    };
    return statusMap[status] || 'todo';
  };
  
  // Map column ID to backend status
  const mapColumnToStatus = (columnId) => {
    const columnMap = {
      'backlog': 'PENDING',
      'todo': 'TODO',
      'inProgress': 'IN_PROGRESS',
      'review': 'REVIEW',
      'done': 'COMPLETED',
    };
    return columnMap[columnId];
  };

  // Handle drag and drop between columns
  const onDragEnd = (result) => {
    setDeleteHighlighted(false);
    const { destination, source, draggableId } = result;

    // Dropped outside the list
    if (!destination) return;

    // Check if dropped in delete zone
    if (destination.droppableId === 'deleteZone') {
      // Get the column that contains this task
      let sourceColumnId = null;
      for (const [colId, column] of Object.entries(columns)) {
        if (column.taskIds.includes(draggableId)) {
          sourceColumnId = colId;
          break;
        }
      }
      
      if (sourceColumnId) {
        // Remove task from its column
        const sourceColumn = columns[sourceColumnId];
        const newSourceTaskIds = sourceColumn.taskIds.filter(id => id !== draggableId);
        
        setColumns({
          ...columns,
          [sourceColumnId]: {
            ...sourceColumn,
            taskIds: newSourceTaskIds,
          }
        });
        
        // Remove task from tasks state
        setTasks(prev => prev.filter(task => task.id !== draggableId));
        
        // If this was the selected task, close the modal
        if (selectedTask && selectedTask.id === draggableId) {
          setIsModalOpen(false);
          setSelectedTask(null);
        }
        
        /* Backend integration for deletion:
        const deleteTask = async () => {
          try {
            await fetch(`http://localhost:5000/api/tasks/delete/${draggableId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': localStorage.getItem('token')
              }
            });
          } catch (err) {
            console.error('Error deleting task:', err);
          }
        };
        
        deleteTask();
        */
        
        return;
      }
    }

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    // Get source and destination columns
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    // Moving within the same column
    if (sourceColumn === destColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
    } 
    // Moving to a different column
    else {
      const sourceTaskIds = Array.from(sourceColumn.taskIds);
      sourceTaskIds.splice(source.index, 1);
      
      const destTaskIds = Array.from(destColumn.taskIds);
      destTaskIds.splice(destination.index, 0, draggableId);

      const newSourceColumn = {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      };

      const newDestColumn = {
        ...destColumn,
        taskIds: destTaskIds,
      };

      setColumns({
        ...columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestColumn.id]: newDestColumn,
      });
      
      // Update task status in tasks state
      const newStatus = mapColumnToStatus(destination.droppableId);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === draggableId ? { ...task, status: newStatus } : task
        )
      );
      
      // For future backend integration:
      // updateTaskStatus(draggableId, newStatus);
    }
  };

  // Handle drag start - highlight delete zone
  const onDragStart = () => {
    setDeleteHighlighted(true);
  };

  /* 
  // Backend integration for updating task status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/update/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) throw new Error('Failed to update task status');
      // No need to update state again as we already did it optimistically
    } catch (err) {
      console.error('Error updating task status:', err);
      // Revert state change on error
      // fetchTasks(); // Re-fetch all tasks to restore correct state
    }
  };
  */

  // Handle opening the task detail modal
  const handleTaskClick = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Handle creating a new task
  const handleCreateTask = (newTask) => {
    // Generate a new ID for the task
    const id = `task-${Date.now()}`;
    const task = {
      id,
      ...newTask,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    
    // Add task to tasks state
    setTasks([...tasks, task]);
    
    // Add task ID to backlog column
    const newBacklog = {
      ...columns.backlog,
      taskIds: [...columns.backlog.taskIds, id],
    };
    
    setColumns({
      ...columns,
      backlog: newBacklog,
    });
    
    setIsCreateModalOpen(false);
    
    /* Backend integration would look like:
    const handleCreateTask = async (newTask) => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/team/${teamId}/task/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          body: JSON.stringify(newTask)
        });
        
        if (!response.ok) throw new Error('Failed to create task');
        
        const task = await response.json();
        
        // Add task to tasks state
        setTasks([...tasks, task]);
        
        // Add task ID to backlog column
        const newBacklog = {
          ...columns.backlog,
          taskIds: [...columns.backlog.taskIds, task.id],
        };
        
        setColumns({
          ...columns,
          backlog: newBacklog,
        });
        
        setIsCreateModalOpen(false);
      } catch (err) {
        console.error('Error creating task:', err);
        // Show error message to user
      }
    };
    */
  };

  // Handle updating an existing task
  const handleUpdateTask = (updatedTask) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
    
    setIsModalOpen(false);
    setSelectedTask(null);
    
    /* Backend integration would look like:
    const handleUpdateTask = async (updatedTask) => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/update/${updatedTask.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          body: JSON.stringify(updatedTask)
        });
        
        if (!response.ok) throw new Error('Failed to update task');
        
        const task = await response.json();
        
        // Update task in tasks state
        setTasks(prevTasks => 
          prevTasks.map(t => 
            t.id === task.id ? { ...t, ...task } : t
          )
        );
        
        setIsModalOpen(false);
        setSelectedTask(null);
      } catch (err) {
        console.error('Error updating task:', err);
        // Show error message to user
      }
    };
    */
  };

  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    // Find which column contains this task
    let columnId = null;
    for (const [colId, column] of Object.entries(columns)) {
      if (column.taskIds.includes(taskId)) {
        columnId = colId;
        break;
      }
    }
    
    if (columnId) {
      // Remove task ID from column
      const newColumn = {
        ...columns[columnId],
        taskIds: columns[columnId].taskIds.filter(id => id !== taskId),
      };
      
      setColumns({
        ...columns,
        [columnId]: newColumn,
      });
      
      // Remove task from tasks state
      setTasks(tasks.filter(task => task.id !== taskId));
      
      if (selectedTask && selectedTask.id === taskId) {
        setIsModalOpen(false);
        setSelectedTask(null);
      }
    }
    
    /* Backend integration would look like:
    const handleDeleteTask = async (taskId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/delete/${taskId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });
        
        if (!response.ok) throw new Error('Failed to delete task');
        
        // Find which column contains this task
        let columnId = null;
        for (const [colId, column] of Object.entries(columns)) {
          if (column.taskIds.includes(taskId)) {
            columnId = colId;
            break;
          }
        }
        
        if (columnId) {
          // Remove task ID from column
          const newColumn = {
            ...columns[columnId],
            taskIds: columns[columnId].taskIds.filter(id => id !== taskId),
          };
          
          setColumns({
            ...columns,
            [columnId]: newColumn,
          });
          
          // Remove task from tasks state
          setTasks(tasks.filter(task => task.id !== taskId));
          
          if (selectedTask && selectedTask.id === taskId) {
            setIsModalOpen(false);
            setSelectedTask(null);
          }
        }
      } catch (err) {
        console.error('Error deleting task:', err);
        // Show error message to user
      }
    };
    */
  };

  // Filter tasks based on search term and filters
  const filteredTasks = tasks.filter(task => {
    // Search term filter
    if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !task.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Priority filter
    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false;
    }
    
    // Assignee filter
    if (filters.assignee !== 'all' && task.assigneeId !== filters.assignee) {
      return false;
    }
    
    // Due date filter
    if (filters.dueDate !== 'all') {
      const daysRemaining = getDaysRemaining(task.dueDate);
      if (filters.dueDate === 'overdue' && daysRemaining >= 0) {
        return false;
      }
      if (filters.dueDate === 'today' && (daysRemaining < 0 || daysRemaining > 1)) {
        return false;
      }
      if (filters.dueDate === 'week' && (daysRemaining < 0 || daysRemaining > 7)) {
        return false;
      }
    }
    
    // Difficulty filter
    if (filters.difficulty !== 'all' && task.difficulty !== filters.difficulty) {
      return false;
    }
    
    return true;
  });

  // Apply filtered tasks to columns
  const filteredColumns = { ...columns };
  Object.keys(filteredColumns).forEach(columnId => {
    filteredColumns[columnId] = {
      ...filteredColumns[columnId],
      taskIds: columns[columnId].taskIds.filter(taskId => 
        filteredTasks.some(task => task.id === taskId)
      ),
    };
  });

  // Mock data generator for development
  const generateMockTasks = (count) => {
    const mockTasks = [];
    const statuses = ['PENDING', 'TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED'];
    const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    const difficulties = ['EASY', 'MEDIUM', 'HARD'];
    const users = ['user1', 'user2', 'user3'];
    
    for (let i = 1; i <= count; i++) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 14) - 3); // -3 to +10 days
      
      mockTasks.push({
        id: `task-${i}`,
        title: `Task ${i}: ${['Implement', 'Design', 'Test', 'Fix', 'Review'][i % 5]} ${['UI', 'API', 'Database', 'Login', 'Dashboard'][i % 5]}`,
        description: `This is a description for task ${i}. It provides details about what needs to be done.`,
        status: statuses[i % statuses.length],
        priority: priorities[i % priorities.length],
        difficulty: difficulties[i % difficulties.length],
        assigneeId: users[i % users.length],
        dueDate: dueDate.toISOString(),
        estimatedTime: Math.floor(Math.random() * 8) + 1,
        actualTime: Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 1 : null,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10 * 86400000)).toISOString(),
        updatedAt: new Date(Date.now() - Math.floor(Math.random() * 5 * 86400000)).toISOString(),
        checkList: Array(Math.floor(Math.random() * 5)).fill().map((_, idx) => ({
          id: `checklist-${i}-${idx}`,
          text: `Subtask ${idx + 1} for Task ${i}`,
          completed: Math.random() > 0.5,
          rank: idx,
        })),
        aiSuggestion: Math.random() > 0.7,
        teamId: `team-${Math.floor(Math.random() * 3) + 1}`,
      });
    }
    
    return mockTasks;
  };

  // Calculate stats for dashboard
  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'COMPLETED').length,
    inProgress: tasks.filter(task => task.status === 'IN_PROGRESS').length,
    overdue: tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      return dueDate < today && task.status !== 'COMPLETED';
    }).length,
  };

  // Get current date and time
  const getCurrentDateTime = () => {
    return "2025-04-10 09:59:04"; // Using the provided date
  };

  // Render loading spinner if data is being fetched
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-light-primary">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-dark-primary border-t-transparent"></div>
      </div>
    );
  }

  // Render error message if there was an error fetching data
  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-light-primary text-dark-primary">
        <FaFire className="mb-4 text-6xl text-red-500" />
        <h2 className="mb-2 text-2xl font-bold">Something went wrong</h2>
        <p className="mb-4">{error}</p>
        <button 
          className="rounded bg-dark-secondary1 px-4 py-2 text-light-primary"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-light-primary font-dmsans text-dark-primary">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-light-secondary1 bg-light-secondary1 bg-opacity-30 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center mb-2 sm:mb-0">
          <h1 className="text-2xl font-bold mr-4">Jira Board</h1>
        </div>
        
        {/* Search bar */}
        <div className="relative w-full md:w-auto md:ml-8 md:flex-1 max-w-md mb-2 md:mb-0">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-secondary1" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md bg-white py-2 pl-10 pr-4 text-dark-primary outline-none focus:ring-2 focus:ring-dark-secondary1"
          />
        </div>
        
        {/* Filter button */}
        <div className="flex items-center w-full md:w-auto md:ml-4 justify-between md:justify-start">
          <TaskFilter filters={filters} setFilters={setFilters} />
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="ml-4 flex items-center rounded-md bg-dark-secondary1 px-4 py-2 font-medium text-light-primary transition-colors hover:bg-opacity-80"
          >
            <FiPlus className="mr-1" />
            New Task
          </button>
        </div>
      </div>
      
      {/* User info bar */}
      <div className="bg-light-secondary1 bg-opacity-20 py-2 px-4 text-sm flex items-center justify-end border-b border-light-secondary1">
        <span className="mr-2">Logged in as:</span>
        <span className="font-medium">tanishshah20</span>
      </div>
      
      {/* Dashboard stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-b border-light-secondary1 bg-light-secondary1 bg-opacity-10 p-4">
        <div className="flex items-center rounded-md bg-white p-3 shadow-md">
          <div className="mr-3 rounded-full bg-blue-500 bg-opacity-20 p-2">
            <FaClock className="text-xl text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm text-dark-secondary1">In Progress</h3>
            <p className="text-xl font-bold">{stats.inProgress}</p>
          </div>
        </div>
        
        <div className="flex items-center rounded-md bg-white p-3 shadow-md">
          <div className="mr-3 rounded-full bg-green-500 bg-opacity-20 p-2">
            <FaCheckCircle className="text-xl text-green-600" />
          </div>
          <div>
            <h3 className="text-sm text-dark-secondary1">Completed</h3>
            <p className="text-xl font-bold">{stats.completed}</p>
          </div>
        </div>
        
        <div className="flex items-center rounded-md bg-white p-3 shadow-md">
          <div className="mr-3 rounded-full bg-red-500 bg-opacity-20 p-2">
            <FaFire className="text-xl text-red-600" />
          </div>
          <div>
            <h3 className="text-sm text-dark-secondary1">Overdue</h3>
            <p className="text-xl font-bold">{stats.overdue}</p>
          </div>
        </div>
        
        <div className="flex items-center rounded-md bg-white p-3 shadow-md">
          <div className="mr-3 rounded-full bg-purple-500 bg-opacity-20 p-2">
            <svg className="h-5 w-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
              <path d="M10 4a1 1 0 011 1v4.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 019 10V5a1 1 0 011-1z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm text-dark-secondary1">Total</h3>
            <p className="text-xl font-bold">{stats.total}</p>
          </div>
        </div>
      </div>
      
      {/* Kanban board */}
      <div className="flex flex-1 overflow-x-hidden flex-wrap items-center justify-between gap-4 p-4 pb-20">
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          {Object.values(filteredColumns).map(column => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter(task => column.taskIds.includes(task.id))}
              onTaskClick={handleTaskClick}
            />
          ))}
          
          {/* Delete Zone / Burner Barrel */}
          <DeleteZone isHighlighted={deleteHighlighted} />
        </DragDropContext>
      </div>
      
      {/* Task detail modal */}
      {isModalOpen && selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      )}
      
      {/* Create task modal */}
      {isCreateModalOpen && (
        <CreateTaskModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateTask}
          teamId={teamId}
        />
      )}
    </div>
  );
};

export default JiraBoardComponent;