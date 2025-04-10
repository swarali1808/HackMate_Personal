import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard.jsx';

const Column = ({ column, tasks, onTaskClick }) => {
  // Get column title styling based on column ID
  const getColumnStyles = (columnId) => {
    switch (columnId) {
      case 'backlog':
        return 'border-gray-500 text-gray-700';
      case 'todo':
        return 'border-blue-500 text-blue-700';
      case 'inProgress':
        return 'border-yellow-500 text-yellow-700';
      case 'review':
        return 'border-purple-500 text-purple-700';
      case 'done':
        return 'border-green-500 text-green-700';
      default:
        return 'border-dark-secondary1 text-dark-secondary1';
    }
  };

  return (
    <div className="m-2 flex w-[300px] h-[400px] flex-shrink-0 flex-col rounded-md bg-white shadow-lg">
      {/* Column header */}
      <div className={`border-b-2 p-3 ${getColumnStyles(column.id)}`}>
        <h3 className="flex items-center justify-between font-bold">
          <span>{column.title}</span>
          <span className="rounded-full bg-light-primary px-2 py-0.5 text-xs text-dark-primary">
            {tasks.length}
          </span>
        </h3>
      </div>
      
      {/* Droppable area for tasks */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`flex-1 overflow-y-auto p-2 transition-colors ${
              snapshot.isDraggingOver ? 'bg-light-secondary1 bg-opacity-50' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`mb-2 transform transition-transform ${
                      snapshot.isDragging ? 'rotate-1 scale-105' : ''
                    }`}
                    onClick={() => onTaskClick(task.id)}
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;