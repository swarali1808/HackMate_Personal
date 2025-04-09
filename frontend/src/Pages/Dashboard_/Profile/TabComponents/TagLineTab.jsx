import React from 'react';
import { FiEdit2 } from 'react-icons/fi';

const TaglineTab = ({ tagline, onEditTagline }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-[#340062]">Tagline</h3>
        <button 
          type="button"
          onClick={onEditTagline}
          className="text-[#340062] border border-[#340062] rounded p-1 hover:bg-[#f6ebff] transition-colors"
        >
          <FiEdit2 size={16} />
        </button>
      </div>
      {tagline ? (
        <p className="text-[#11014c]">{tagline}</p>
      ) : (
        <p className="text-[#11014c] opacity-70">No Tagline Added</p>
      )}
    </div>
  );
};

export default TaglineTab;