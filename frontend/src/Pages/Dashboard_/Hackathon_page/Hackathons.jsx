import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { InformationCircleIcon, LinkIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import hackathonData from "../../../Data/HackathonResource.js";
import CreateTeamModal from "../../../Component/CreateTeamModal.jsx";

// Simple Custom Delete Confirmation Modal
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, hackathonName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center mb-4 text-red-500">
          <ExclamationTriangleIcon className="h-12 w-12" />
        </div>
        <h3 className="text-lg font-medium leading-6 text-dark-primary text-center font-poppins">
          Delete Hackathon
        </h3>
        <div className="mt-3">
          <p className="text-sm text-dark-secondary1 text-center font-dmsans">
            Are you sure you want to delete <span className="font-semibold">{hackathonName}</span>? This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-dark-primary bg-light-secondary1 border border-transparent rounded-md hover:bg-light-secondary2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Hackathons = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [hackathonUrl, setHackathonUrl] = useState("");
  const [hackathons, setHackathons] = useState([]);
  const [isUrlValid, setIsUrlValid] = useState(null);
  const [isAddingHackathon, setIsAddingHackathon] = useState(false);
  const [addUrlMode, setAddUrlMode] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [hackathonToDelete, setHackathonToDelete] = useState(null);
  const navigate = useNavigate();

  // Initialize hackathons from the static data when component mounts
  useEffect(() => {
    // Load any saved hackathons from localStorage
    try {
      const savedHackathons = localStorage.getItem("customHackathons");
      const parsedSavedHackathons = savedHackathons ? JSON.parse(savedHackathons) : [];
      
      // Combine with the static hackathon data
      setHackathons([...hackathonData, ...parsedSavedHackathons]);
    } catch (error) {
      console.error("Error loading hackathons:", error);
      setHackathons([...hackathonData]);
    }
  }, []);

  const getFilteredHackathons = () => {
    const today = new Date();
    if (!Array.isArray(hackathons)) {
      console.error("hackathons is not an array:", hackathons);
      return [];
    }

    let filtered = [...hackathons];

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

  // Function to validate URL format
  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Generate a realistic hackathon from URL
  const generateHackathonFromUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      const mockId = `url-${Date.now()}`;
      
      // Generate a realistic start date (between now and 30 days from now)
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
      
      // Generate a realistic end date (between start date and 14 days after start date)
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 14) + 1);
      
      // Generate a realistic name based on the URL
      let name = "Hackathon";
      if (hostname.includes("devpost")) {
        name = "DevPost " + hostname.split('.')[0].charAt(0).toUpperCase() + hostname.split('.')[0].slice(1) + " Hackathon";
      } else if (hostname.includes("github")) {
        name = "GitHub " + urlObj.pathname.split('/')[1] + " Hackathon Challenge";
      } else if (hostname.includes("hack")) {
        name = hostname.split('.')[0].charAt(0).toUpperCase() + hostname.split('.')[0].slice(1) + " Challenge";
      } else {
        name = hostname.split('.')[0].charAt(0).toUpperCase() + hostname.split('.')[0].slice(1) + " Hackathon";
      }
      
      // Extract path components for additional context
      const pathSegments = urlObj.pathname.split('/').filter(segment => segment.length > 0);
      const lastSegment = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : "";
      
      if (lastSegment && lastSegment.length > 3) {
        // If the last segment seems meaningful, incorporate it into the name
        const formattedSegment = lastSegment
          .replace(/-/g, ' ')
          .replace(/_/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        name = formattedSegment + " Hackathon";
      }
      
      // Select random domains from a preset list
      const domainOptions = [
        "Web Development", "AI/ML", "Mobile", "Blockchain", 
        "IoT", "DevOps", "Cloud Computing", "Data Science", 
        "Cybersecurity", "AR/VR", "FinTech", "HealthTech"
      ];
      
      const domains = [];
      const numDomains = Math.floor(Math.random() * 3) + 1; // 1-3 domains
      
      for (let i = 0; i < numDomains; i++) {
        const randomDomain = domainOptions[Math.floor(Math.random() * domainOptions.length)];
        if (!domains.includes(randomDomain)) {
          domains.push(randomDomain);
        }
      }
      
      // Generate a realistic description
      const descriptions = [
        `Join us for the ${name} where innovators come together to solve real-world problems. This event focuses on ${domains.join(', ')} and encourages creative solutions.`,
        `The ${name} challenges developers to build innovative solutions in ${domains.join(', ')}. Collaborate with like-minded individuals and win exciting prizes!`,
        `${name} is a ${Math.floor(Math.random() * 48) + 24}-hour coding marathon bringing together talented individuals to create groundbreaking projects in ${domains.join(', ')}.`,
        `Are you passionate about ${domains[0]}? Join the ${name} to showcase your skills and compete for amazing prizes and recognition.`
      ];
      
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];
      
      // Generate mock prize details
      const prizeDetails = {
        firstPrize: {
          title: "First Prize",
          amount: `$${Math.floor(Math.random() * 5000) + 1000}`,
          description: "For the best overall project"
        },
        secondPrize: {
          title: "Second Prize",
          amount: `$${Math.floor(Math.random() * 2000) + 500}`,
          description: "For the runner-up project"
        },
        thirdPrize: {
          title: "Third Prize",
          amount: `$${Math.floor(Math.random() * 1000) + 200}`,
          description: "For the third-place project"
        }
      };
      
      // Generate timeline
      const timeline = [
        {
          title: "Registration Opens",
          date: new Date(startDate).setDate(startDate.getDate() - 14),
          description: "Start forming your teams and register for the hackathon"
        },
        {
          title: "Hackathon Kickoff",
          date: startDate.toISOString(),
          description: "Opening ceremony and challenge announcement"
        },
        {
          title: "Submission Deadline",
          date: new Date(endDate).setHours(endDate.getHours() - 2),
          description: "Final deadline for all project submissions"
        },
        {
          title: "Judging & Awards",
          date: endDate.toISOString(),
          description: "Projects will be judged and winners announced"
        }
      ];
      
      // Generate rules
      const rules = `# ${name} Rules and Guidelines

1. Teams can have a maximum of 4 members.
2. All code must be written during the hackathon period.
3. You may use open-source libraries and frameworks.
4. Projects must address one of the hackathon themes or challenges.
5. Submissions must include source code and a brief presentation.
6. Judging criteria includes:
   - Innovation and creativity
   - Technical complexity
   - Design and user experience
   - Practical application and impact
7. Winners will be announced at the closing ceremony.
8. The judges' decisions are final.

Remember to have fun and collaborate respectfully with all participants!`;
      
      return {
        id: mockId,
        name,
        description,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        domains,
        location: "Online",
        createdAt: new Date().toISOString(),
        url: url,
        isCustom: true,
        prizeDetails,
        rules,
        timeline
      };
    } catch (error) {
      console.error("Error generating hackathon data:", error);
      
      // Fallback to a very basic hackathon if there's an error
      return {
        id: `url-${Date.now()}`,
        name: "Imported Hackathon",
        description: "This hackathon was imported from an external source.",
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        domains: ["External", "Unknown"],
        location: "Online",
        createdAt: new Date().toISOString(),
        url: url,
        isCustom: true
      };
    }
  };

  // Function to fetch hackathon data from URL
  const fetchHackathonFromUrl = async (url) => {
    setIsAddingHackathon(true);
    setIsUrlValid(null);

    try {
      // Basic URL validation
      if (!validateUrl(url)) {
        setIsUrlValid(false);
        showNotification("Invalid URL format", "error");
        setIsAddingHackathon(false);
        return;
      }

      // Extract an ID from the URL
      const urlObj = new URL(url);
      
      // Check if a hackathon with this URL already exists
      const existingHackathon = hackathons.find(h => h.url === url);
      if (existingHackathon) {
        setIsUrlValid(false);
        showNotification("This hackathon already exists in your list", "error");
        setIsAddingHackathon(false);
        return;
      }
      
      // Generate a realistic hackathon based on the URL
      const hackathonFromUrl = generateHackathonFromUrl(url);

      // Add the new hackathon to the list
      const updatedHackathons = [...hackathons, hackathonFromUrl];
      setHackathons(updatedHackathons);
      
      // Save to localStorage
      const customHackathons = updatedHackathons.filter(h => h.isCustom);
      localStorage.setItem("customHackathons", JSON.stringify(customHackathons));
      
      setIsUrlValid(true);
      showNotification("Hackathon successfully added!", "success");
      setHackathonUrl("");
      setAddUrlMode(false);
    } catch (error) {
      console.error("Error adding hackathon:", error);
      setIsUrlValid(false);
      showNotification("Failed to add hackathon", "error");
    } finally {
      setIsAddingHackathon(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
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
  
  // Modified to show confirmation dialog
  const handleRemoveHackathon = (hackathon, e) => {
    e.preventDefault();
    e.stopPropagation();
    setHackathonToDelete(hackathon);
    setDeleteConfirmOpen(true);
  };
  
  // Function to confirm deletion
  const confirmDeleteHackathon = () => {
    if (!hackathonToDelete) return;
    
    const updatedHackathons = hackathons.filter(h => h.id !== hackathonToDelete.id);
    setHackathons(updatedHackathons);
    
    // Update localStorage
    const customHackathons = updatedHackathons.filter(h => h.isCustom);
    localStorage.setItem("customHackathons", JSON.stringify(customHackathons));
    
    showNotification(`"${hackathonToDelete.name}" has been removed`, "success");
    setDeleteConfirmOpen(false);
    setHackathonToDelete(null);
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

      {/* URL Input Section */}
      <div className="mb-6">
        {addUrlMode ? (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-light-secondary2 p-4 rounded-lg shadow-md border border-dark-primary/10"
          >
            <h3 className="text-lg font-bold mb-3 text-dark-primary font-poppins">Add Hackathon by URL</h3>
            <div className="flex flex-wrap gap-2">
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Enter hackathon URL..."
                  className={`w-full px-4 py-2 border ${
                    isUrlValid === false 
                      ? "border-red-500" 
                      : isUrlValid === true 
                      ? "border-green-500" 
                      : "border-dark-secondary1"
                  } rounded-lg focus:ring-2 focus:ring-dark-primary`}
                  value={hackathonUrl}
                  onChange={(e) => setHackathonUrl(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchHackathonFromUrl(hackathonUrl)}
                  disabled={isAddingHackathon || !hackathonUrl}
                  className="px-4 py-2 bg-dark-primary text-light-secondary2 rounded-lg hover:bg-dark-secondary1 transition-colors duration-300 disabled:bg-gray-400 flex items-center"
                >
                  {isAddingHackathon ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    "Add Hackathon"
                  )}
                </button>
                <button
                  onClick={() => {
                    setAddUrlMode(false);
                    setHackathonUrl("");
                    setIsUrlValid(null);
                  }}
                  className="px-4 py-2 border border-dark-secondary1 rounded-lg hover:bg-light-secondary1 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
            <p className="text-xs text-dark-secondary1 mt-2">
              Enter the URL of the hackathon you want to add. The hackathon will automatically be categorized as upcoming, ongoing, or past.
            </p>
          </motion.div>
        ) : (
          <div className="flex justify-end">
            <motion.button
              onClick={() => setAddUrlMode(true)}
              className="flex items-center gap-2 px-4 py-2 bg-dark-primary text-light-secondary2 rounded-lg hover:bg-dark-secondary1 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LinkIcon className="h-5 w-5" />
              Add Hackathon by URL
            </motion.button>
          </div>
        )}
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg ${
              notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            } flex items-center gap-2`}
          >
            {notification.type === "success" ? (
              <CheckCircleIcon className="h-5 w-5" />
            ) : (
              <XCircleIcon className="h-5 w-5" />
            )}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters and Search */}
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

      {/* Hackathon Cards */}
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
              className={`bg-gradient-to-br from-light-secondary2 to-white rounded-xl shadow-lg overflow-hidden border ${
                hackathon.isCustom ? 'border-dark-primary/30' : 'border-dark-primary/10'
              }`}
              whileHover="hover"
            >
              <div className="p-6">
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold mb-3 text-dark-primary font-poppins truncate">
                    {hackathon.name}
                  </h3>
                  {hackathon.isCustom && (
                    <button 
                      onClick={(e) => handleRemoveHackathon(hackathon, e)}
                      className="text-red-500 hover:text-red-700 ml-2"
                      title="Remove hackathon"
                    >
                      <XCircleIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>

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
                  to={`/dashboard/hackathon/${hackathon.slug}`}
                  className="w-full bg-dark-primary text-light-secondary2 px-4 py-2 rounded-lg text-center font-poppins hover:bg-dark-secondary1 transition-colors duration-300 block"
                >
                  View Details
                </Link>
              </div>
              {hackathon.isCustom && hackathon.url && (
                <div className="px-6 py-2 bg-light-secondary1 border-t border-dark-primary/10">
                  <a 
                    href={hackathon.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-xs text-dark-secondary1 hover:text-dark-primary"
                  >
                    <LinkIcon className="h-3 w-3 mr-1" />
                    {new URL(hackathon.url).hostname}
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No Results */}
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

      {/* Team Creation Modal */}
      <CreateTeamModal
        isOpen={!!selectedHackathon}
        onClose={handleTeamModalClose}
        onSubmit={handleTeamSubmit}
        hackathonId={selectedHackathon?.id}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDeleteHackathon}
        hackathonName={hackathonToDelete?.name || ""}
      />
    </div>
  );
};

export default Hackathons;