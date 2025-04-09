import React, { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';

const TaglineTab = ({ initialTagline = '' }) => {
  const [tagline, setTagline] = useState(initialTagline);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTagline, setTempTagline] = useState('');

  const handleEditClick = () => {
    setTempTagline(tagline);
    setIsEditing(true);
  };

  const handleSave = () => {
    setTagline(tempTagline);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-[#340062]">Tagline</h3>
        {!isEditing && (
          <button 
            type="button"
            onClick={handleEditClick}
            className="text-[#340062] border border-[#340062] rounded p-1 hover:bg-[#f6ebff] transition-colors"
          >
            <FiEdit2 size={16} />
          </button>
        )}
      </div>
      
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={tempTagline}
            onChange={(e) => setTempTagline(e.target.value)}
            className="border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#340062]"
            placeholder="Enter your tagline"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-[#340062] text-white px-4 py-1 rounded hover:bg-[#4a0080] transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="border border-[#340062] text-[#340062] px-4 py-1 rounded hover:bg-[#f6ebff] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        tagline ? (
          <p className="text-[#11014c]">{tagline}</p>
        ) : (
          <p className="text-[#11014c] opacity-70">No Tagline Added</p>
        )
      )}
    </div>
  );
};

export default TaglineTab;