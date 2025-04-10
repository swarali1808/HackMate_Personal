import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { FaTrashAlt, FaFire } from 'react-icons/fa';

const DeleteZone = ({ isHighlighted }) => {
  return (
    <Droppable droppableId="deleteZone">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`mx-4 mt-10 flex w-[300px] h-[400px] flex-shrink-0 flex-col items-center justify-center rounded-md border-2 border-dashed transition-all ${
            isHighlighted || snapshot.isDraggingOver
              ? 'border-red-500 bg-red-100 text-red-600'
              : 'border-gray-300 bg-gray-50 text-gray-400'
          }`}
        >
          <div className="flex flex-col items-center space-y-2 p-4 text-center">
            {snapshot.isDraggingOver ? (
              <>
                <FaFire className="mb-2 animate-bounce text-4xl" />
                <p className="font-bold">Drop to Delete</p>
              </>
            ) : (
              <>
                <FaTrashAlt className="mb-2 text-4xl" />
                <p className="font-bold">Delete Zone</p>
                <p className="text-sm">Drag tasks here to delete them</p>
              </>
            )}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DeleteZone;