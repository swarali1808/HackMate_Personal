import React, { useState, useCallback } from 'react';
import { FiSearch, FiX, FiPlus } from 'react-icons/fi';

const SkillsTab = ({ skills, addSkill, deleteSkill, predefinedSkills }) => {
  const [skillSearchInput, setSkillSearchInput] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);

  // Handle search input change
  const handleSearchChange = useCallback((e) => {
    const input = e.target.value;
    setSkillSearchInput(input);
    
    // Filter skills based on input
    if (input.trim() === '') {
      setFilteredSkills([]);
    } else {
      const filtered = predefinedSkills
        .filter(skill => 
          skill.toLowerCase().includes(input.toLowerCase()) &&
          !skills.includes(skill)
        )
        .slice(0, 8); // Limit to 8 results for better UX
      setFilteredSkills(filtered);
    }
  }, [skills, predefinedSkills]);

  // Handle adding custom skill
  const handleAddCustomSkill = useCallback(() => {
    if (skillSearchInput.trim()) {
      addSkill(skillSearchInput.trim());
      setSkillSearchInput('');
      setFilteredSkills([]);
    }
  }, [skillSearchInput, addSkill]);

  // Handle key press (Enter)
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && skillSearchInput.trim()) {
      e.preventDefault();
      addSkill(skillSearchInput.trim());
      setSkillSearchInput('');
      setFilteredSkills([]);
    }
  }, [skillSearchInput, addSkill]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-[#340062]">Skills</h3>
      </div>
      
      {/* Skills Search and Add Section */}
      <div className="mb-6">
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="w-5 h-5 text-[#11014c] opacity-50" />
          </div>
          <input 
            type="text" 
            className="block w-full pl-10 pr-24 py-3 border border-[#b6cbff] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#340062]"
            placeholder="Search for a skill to add..." 
            value={skillSearchInput}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <button 
            onClick={handleAddCustomSkill}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#340062] text-white px-3 py-1 rounded-md text-sm"
            disabled={!skillSearchInput.trim()}
            type="button"
          >
            Add
          </button>
        </div>
        
        {/* Search Results */}
        {filteredSkills.length > 0 && (
          <div className="bg-white border border-[#b6cbff] rounded-lg shadow-lg p-2 mt-1 mb-4">
            <ul className="max-h-60 overflow-y-auto">
              {filteredSkills.map((skill, index) => (
                <li 
                  key={index} 
                  className="px-3 py-2 hover:bg-[#f6ebff] rounded cursor-pointer transition"
                  onClick={() => {
                    addSkill(skill);
                    setSkillSearchInput('');
                    setFilteredSkills([]);
                  }}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* No Results Message */}
        {skillSearchInput.trim() !== '' && filteredSkills.length === 0 && (
          <div className="mb-4 text-center py-2 text-[#11014c]">
            <p>No matching skill found. Press Enter or click Add to add as a custom skill.</p>
          </div>
        )}
      </div>
      
      {/* Skills Display */}
      {skills.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-[#b6cbff] rounded-lg">
          <p className="text-[#11014c] opacity-70">No skills added yet. Search and add skills above.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div key={index} className="bg-[#f6ebff] px-4 py-2 rounded-full relative group">
              <span className="text-[#340062] pr-6">{skill}</span>
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => deleteSkill(index)}
                type="button"
                aria-label={`Delete ${skill}`}
              >
                <FiX size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Skills Suggestions */}
      {skills.length > 0 && skills.length < 5 && (
        <div className="mt-6 pt-4 border-t border-[#b6cbff]">
          <p className="text-[#11014c] mb-2 font-medium">Suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {predefinedSkills
              .filter(skill => !skills.includes(skill))
              .slice(0, 5)
              .map((skill, index) => (
                <div 
                  key={index} 
                  className="bg-gray-100 px-3 py-1 rounded-full text-[#11014c] cursor-pointer hover:bg-[#f6ebff] transition"
                  onClick={() => addSkill(skill)}
                >
                  <span>{skill}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsTab;