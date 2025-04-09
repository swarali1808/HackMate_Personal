import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const CreateTeamModal = ({ isOpen, onClose, onSubmit, hackathonId }) => {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [maxMembers, setMaxMembers] = useState(4);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Create refs for input fields
  const modalRef = useRef(null);
  const nameInputRef = useRef(null);
  
  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTeamName("");
      setTeamDescription("");
      setMaxMembers(4);
      setErrors({});
    } else {
      // Focus the input field after a short delay to ensure the modal is rendered
      setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);
  
  // Handle clicks outside the modal content
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    // Only add the listener if the modal is open
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!teamName.trim()) {
      newErrors.teamName = "Please enter a team name";
    } else if (teamName.length > 50) {
      newErrors.teamName = "Team name cannot exceed 50 characters";
    }
    
    if (teamDescription && teamDescription.length > 200) {
      newErrors.teamDescription = "Description cannot exceed 200 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit the form
      onSubmit({
        name: teamName.trim(),
        description: teamDescription.trim(),
        maxMembers,
        hackathonId
      });
      
      // Close the modal after successful submission
      onClose();
    } catch (error) {
      console.error("Error submitting team:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handlers for input changes with explicit event prevention
  const handleTeamNameChange = (e) => {
    e.stopPropagation();
    setTeamName(e.target.value);
  };
  
  const handleTeamDescriptionChange = (e) => {
    e.stopPropagation();
    setTeamDescription(e.target.value);
  };
  
  const handleMaxMembersChange = (e) => {
    e.stopPropagation();
    setMaxMembers(parseInt(e.target.value));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <motion.div
            ref={modalRef}
            className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 pt-5 pb-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold leading-6 text-dark-primary font-poppins flex items-center">
                  <UserGroupIcon className="w-5 h-5 mr-2" />
                  Create New Team
                </h3>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="text-dark-secondary1 hover:text-dark-primary focus:outline-none"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-sm text-dark-secondary1 font-dmsans">
                  Create a new team for this hackathon. You'll be the team leader and can invite others to join your team.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="teamName" className="block text-sm font-medium text-dark-primary font-poppins mb-1">
                    Team Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="teamName"
                    ref={nameInputRef}
                    type="text"
                    className={`w-full px-3 py-2 border ${errors.teamName ? 'border-red-500' : 'border-dark-secondary1'} rounded-lg focus:ring-dark-primary focus:border-dark-primary`}
                    placeholder="Enter your team name"
                    value={teamName}
                    onChange={handleTeamNameChange}
                    maxLength={50}
                    onClick={(e) => e.stopPropagation()}
                  />
                  {errors.teamName && <p className="mt-1 text-sm text-red-600">{errors.teamName}</p>}
                  <p className="text-xs text-dark-secondary1 mt-1">
                    {teamName.length}/50 characters
                  </p>
                </div>

                <div className="mb-4">
                  <label htmlFor="teamDescription" className="block text-sm font-medium text-dark-primary font-poppins mb-1">
                    Team Description <span className="text-xs text-dark-secondary1">(optional)</span>
                  </label>
                  <textarea
                    id="teamDescription"
                    rows="3"
                    className={`w-full px-3 py-2 border ${errors.teamDescription ? 'border-red-500' : 'border-dark-secondary1'} rounded-lg focus:ring-dark-primary focus:border-dark-primary`}
                    placeholder="Briefly describe your team and project ideas"
                    value={teamDescription}
                    onChange={handleTeamDescriptionChange}
                    maxLength={200}
                    onClick={(e) => e.stopPropagation()}
                  ></textarea>
                  {errors.teamDescription && <p className="mt-1 text-sm text-red-600">{errors.teamDescription}</p>}
                  <p className="text-xs text-dark-secondary1 mt-1">
                    {teamDescription.length}/200 characters
                  </p>
                </div>

                <div className="mb-4">
                  <label htmlFor="maxMembers" className="block text-sm font-medium text-dark-primary font-poppins mb-1">
                    Maximum Team Size
                  </label>
                  <select
                    id="maxMembers"
                    className="w-full px-3 py-2 border border-dark-secondary1 rounded-lg focus:ring-dark-primary focus:border-dark-primary"
                    value={maxMembers}
                    onChange={handleMaxMembersChange}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {[2, 3, 4, 5, 6].map((size) => (
                      <option key={size} value={size}>
                        {size} members
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-dark-secondary1 mt-1">
                    Including yourself as team leader
                  </p>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                    className="px-4 py-2 border border-dark-secondary1 rounded-lg text-dark-primary hover:bg-light-secondary1 transition-colors duration-300 font-poppins"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-dark-primary text-light-secondary2 rounded-lg hover:bg-dark-secondary1 transition-colors duration-300 font-poppins flex items-center"
                    disabled={isSubmitting}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {isSubmitting ? "Creating..." : "Create Team"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateTeamModal;