import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, KeyIcon } from "@heroicons/react/24/outline";

const JoinTeamModal = ({ isOpen, onClose, onSubmit, hackathonId }) => {
  const [inviteCode, setInviteCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  // Add refs for modal and inputs
  const modalRef = useRef(null);
  const inviteCodeInputRef = useRef(null);
  
  // Focus management
  useEffect(() => {
    if (isOpen && inviteCodeInputRef.current) {
      setTimeout(() => {
        inviteCodeInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setInviteCode("");
      setError("");
    }
  }, [isOpen]);
  
  // Click outside handler
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

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Basic validation
    if (!inviteCode.trim()) {
      setError("Please enter an invite code");
      return;
    }
    
    setError("");
    setIsSubmitting(true);
    
    try {
      // Submit the form
      onSubmit(inviteCode.trim());
      
      // Reset form
      setInviteCode("");
      onClose();
    } catch (error) {
      console.error("Error joining team:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleInviteCodeChange = (e) => {
    e.stopPropagation();
    setInviteCode(e.target.value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <motion.div
            ref={modalRef}
            className="relative bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg sm:w-full mx-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold leading-6 text-dark-primary font-poppins">
                  Join Existing Team
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
                  Enter the invite code shared with you by your team leader to join their team for this hackathon.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="inviteCode" className="block text-sm font-medium text-dark-primary font-poppins mb-1">
                    Team Invite Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <KeyIcon className="w-5 h-5 text-dark-secondary1" />
                    </div>
                    <input
                      id="inviteCode"
                      ref={inviteCodeInputRef}
                      type="text"
                      className="w-full pl-10 pr-3 py-2 border border-dark-secondary1 rounded-lg outline-none"
                      placeholder="Enter team invite code"
                      value={inviteCode}
                      onChange={handleInviteCodeChange}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
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
                    {isSubmitting ? "Joining..." : "Join Team"}
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

export default JoinTeamModal;