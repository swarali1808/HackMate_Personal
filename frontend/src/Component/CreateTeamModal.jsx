import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CreateTeamModal = ({ isOpen, onClose, onSubmit, hackathonId }) => {
  const [teamData, setTeamData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...teamData, hackathonId });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-light-secondary2 rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-dark-primary mb-4 font-poppins">
              Create Team
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-dark-primary mb-2 font-dmsans">
                  Team Name
                </label>
                <input
                  type="text"
                  value={teamData.name}
                  onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-dark-primary/20 focus:outline-none focus:ring-2 focus:ring-dark-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-dark-primary mb-2 font-dmsans">
                  Description
                </label>
                <textarea
                  value={teamData.description}
                  onChange={(e) => setTeamData({ ...teamData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-dark-primary/20 focus:outline-none focus:ring-2 focus:ring-dark-primary h-32 resize-none"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-dark-primary bg-light-secondary1 hover:bg-dark-secondary1 hover:text-light-secondary2 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-dark-primary text-light-secondary2 hover:bg-dark-secondary1 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Team
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateTeamModal;