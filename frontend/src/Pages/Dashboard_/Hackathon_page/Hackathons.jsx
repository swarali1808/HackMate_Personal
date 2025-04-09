import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import hackathonData from "../../../Data/HackathonResource.js";
import CreateTeamModal from "../../../Component/CreateTeamModal.jsx"; // Adjust the path as needed

const Hackathons = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const navigate = useNavigate();

  const getFilteredHackathons = () => {
    const today = new Date();
    if (!Array.isArray(hackathonData)) {
      console.error("hackathonData is not an array:", hackathonData);
      return [];
    }

    let filtered = [...hackathonData];

    if (searchTerm) {
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (h.domains && h.domains.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    switch (filter) {
      case "upcoming":
        return filtered.filter((h) => new Date(h.startDate) > today);
      case "ongoing":
        return filtered.filter(
          (h) => new Date(h.startDate) <= today && new Date(h.endDate) >= today
        );
      case "past":
        return filtered.filter((h) => new Date(h.endDate) < today);
      default:
        return filtered;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)", transition: { duration: 0.3 } },
  };

  const filteredHackathons = getFilteredHackathons() || [];

  const handleTeamModalOpen = (hackathon) => {
    setSelectedHackathon(hackathon);
  };

  const handleTeamModalClose = () => {
    setSelectedHackathon(null);
  };

  const handleTeamSubmit = (teamData) => {
    console.log("Team created:", teamData);
    // Add your team creation logic here (e.g., API call)
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-light-primary text-dark-primary font-outfit">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 text-dark-primary font-poppins">Hackathons</h1>
        <p className="text-lg text-dark-secondary1 font-dmsans">Discover and join exciting hackathons</p>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {["all", "upcoming", "ongoing", "past"].map((f) => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full ${
                filter === f
                  ? "bg-dark-primary text-light-secondary2"
                  : "bg-light-secondary1 text-dark-secondary1 hover:bg-dark-secondary1 hover:text-light-secondary2"
              } transition-colors duration-300`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </motion.button>
          ))}
        </div>

        <div className="relative flex-1 md:max-w-md">
          <input
            type="text"
            placeholder="Search hackathons..."
            className="w-full px-4 py-2 border border-dark-secondary1 rounded-lg bg-light-secondary2 focus:ring-2 focus:ring-dark-primary text-dark-primary font-dmsans"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InformationCircleIcon className="h-5 w-5 absolute right-3 top-2.5 text-dark-secondary1 cursor-pointer" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredHackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gradient-to-br from-light-secondary2 to-white rounded-xl shadow-lg overflow-hidden border border-dark-primary/10"
              whileHover="hover"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-dark-primary font-poppins truncate">{hackathon.name}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hackathon.domains && hackathon.domains.map((domain) => (
                    <span
                      key={domain}
                      className="bg-dark-primary text-light-secondary2 text-xs px-3 py-1 rounded-full font-dmsans"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
                <p className="text-dark-secondary1 mb-4 line-clamp-2 font-dmsans">{hackathon.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-dark-secondary1 text-sm font-dmsans">
                      {new Date(hackathon.startDate).toLocaleDateString()} -{" "}
                      {new Date(hackathon.endDate).toLocaleDateString()}
                    </p>
                    <div className="flex items-center mt-1">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${
                          new Date(hackathon.startDate) > new Date()
                            ? "bg-dark-primary"
                            : new Date(hackathon.endDate) < new Date()
                            ? "bg-gray-500"
                            : "bg-dark-secondary1"
                        }`}
                      ></span>
                      <span className="text-sm text-dark-secondary1 font-dmsans">
                        {new Date(hackathon.startDate) > new Date()
                          ? "Upcoming"
                          : new Date(hackathon.endDate) < new Date()
                          ? "Past"
                          : "Ongoing"}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/dashboard/hackathon/${hackathon.id}`}
                  className="w-full bg-dark-primary text-light-secondary2 px-4 py-2 rounded-lg text-center font-poppins hover:bg-dark-secondary1 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredHackathons.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-light-secondary2 rounded-lg shadow-md"
        >
          <svg
            className="mx-auto h-12 w-12 text-dark-secondary1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-dark-primary font-poppins">No hackathons found</h3>
          <p className="mt-1 text-dark-secondary1 font-dmsans">Try changing your search or filter criteria</p>
        </motion.div>
      )}

      <CreateTeamModal
        isOpen={!!selectedHackathon}
        onClose={handleTeamModalClose}
        onSubmit={handleTeamSubmit}
        hackathonId={selectedHackathon?.id}
      />
    </div>
  );
};

export default Hackathons;