import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import hackathonData from "../../../Data/HackathonResource.js";
import CreateTeamModal from "../../../Component/CreateTeamModal.jsx"; // Adjust the path as needed

const HackathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showTeamModal, setShowTeamModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (Array.isArray(hackathonData)) {
      const found = hackathonData.find((h) => h.id === id);
      if (found) {
        setHackathon(found);
      }
    } else {
      console.error("hackathonData is not an array:", hackathonData);
    }
    setLoading(false);
  }, [id]);

  const handleTeamModalOpen = () => {
    setShowTeamModal(true);
  };

  const handleTeamModalClose = () => {
    setShowTeamModal(false);
  };

  const handleTeamSubmit = (teamData) => {
    console.log("Team created:", teamData);
    // Add your team creation logic here (e.g., API call)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-light-primary">
        <motion.div
          className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-dark-primary"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="container mx-auto px-4 py-16 text-center bg-light-primary">
        <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Hackathon not found</h2>
        <motion.button
          onClick={() => navigate("/dashboard/hackathons")}
          className="px-6 py-2 bg-dark-primary text-light-secondary2 rounded-lg hover:bg-dark-secondary1 transition-colors duration-300 font-poppins"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Return to Hackathons
        </motion.button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-light-primary text-dark-primary font-outfit">
      <motion.button
        onClick={() => navigate("/dashboard/hackathons")}
        className="flex items-center text-dark-primary hover:text-dark-secondary1 mb-4 font-poppins"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ArrowLeftIcon className="w-4 h-4 mr-1" />
        Back to Hackathons
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-dark-primary to-dark-secondary1 rounded-xl text-light-secondary2 p-6 mb-8 shadow-lg">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-2 font-poppins">{hackathon.name}</h1>
            <p className="mb-4 text-light-secondary1 font-dmsans">{hackathon.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {hackathon.domains &&
                hackathon.domains.map((domain) => (
                  <span
                    key={domain}
                    className="bg-light-secondary2 bg-opacity-50 px-3 py-1 rounded-full text-sm font-dmsans"
                  >
                    {domain}
                  </span>
                ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="font-dmsans">
                {new Date(hackathon.startDate).toLocaleDateString()} -{" "}
                {new Date(hackathon.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <motion.button
          onClick={handleTeamModalOpen}
          className="w-full md:w-auto px-6 py-3 bg-dark-primary text-light-secondary2 rounded-lg hover:bg-dark-secondary1 transition-colors duration-300 font-poppins mb-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Team
        </motion.button>

        <div className="mb-8">
          <div className="border-b border-dark-secondary1">
            <nav className="flex space-x-8">
              {["overview", "rules", "timeline"].map((tab) => (
                <motion.button
                  key={tab}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-dark-primary text-dark-primary"
                      : "border-transparent text-dark-secondary1 hover:text-dark-primary"
                  } font-poppins`}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.05 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </nav>
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                className="bg-light-secondary2 rounded-xl shadow-md p-6 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">About</h2>
                <p className="text-dark-secondary1 font-dmsans">{hackathon.description}</p>
              </motion.div>

              {hackathon.prizeDetails && (
                <motion.div
                  className="bg-light-secondary2 rounded-xl shadow-md p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Prizes</h2>
                  <pre className="text-dark-secondary1 font-dmsans whitespace-pre-wrap">
                    {JSON.stringify(hackathon.prizeDetails, null, 2)}
                  </pre>
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-1">
              <motion.div
                className="bg-light-secondary2 rounded-xl shadow-md p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Details</h2>
                <p className="text-dark-secondary1 font-dmsans">
                  <strong>Location:</strong> {hackathon.location}
                </p>
                <p className="text-dark-secondary1 font-dmsans">
                  <strong>Created:</strong>{" "}
                  {hackathon.createdAt && new Date(hackathon.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === "rules" && hackathon.rules && (
          <motion.div
            className="bg-light-secondary2 rounded-xl shadow-md p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Rules</h2>
            <div className="text-dark-secondary1 font-dmsans whitespace-pre-wrap">
              {hackathon.rules}
            </div>
          </motion.div>
        )}

        {activeTab === "timeline" && hackathon.timeline && (
          <motion.div
            className="bg-light-secondary2 rounded-xl shadow-md p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Timeline</h2>
            <div className="space-y-4">
              {hackathon.timeline.map((event, index) => (
                <div key={index} className="flex items-start">
                  <div className="h-4 w-4 rounded-full bg-dark-primary mt-1"></div>
                  <div className="ml-4">
                    <h3 className="font-medium text-dark-primary font-poppins">{event.title}</h3>
                    <p className="text-dark-secondary1 font-dmsans">{event.description}</p>
                    <p className="text-sm text-dark-secondary1 font-dmsans">
                      {new Date(event.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      <CreateTeamModal
        isOpen={showTeamModal}
        onClose={handleTeamModalClose}
        onSubmit={handleTeamSubmit}
        hackathonId={id}
      />
    </div>
  );
};

export default HackathonDetails;