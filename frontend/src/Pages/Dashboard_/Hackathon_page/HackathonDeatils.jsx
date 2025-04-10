import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeftIcon, 
  UserGroupIcon, 
  PlusCircleIcon, 
  UserPlusIcon,
  ClipboardDocumentIcon,
  LinkIcon
} from "@heroicons/react/24/outline";
import hackathonData from "../../../Data/HackathonResource.js";
import CreateTeamModal from "../../../Component/CreateTeamModal.jsx";
import InviteMembersModal from "../../../Component/InviteMembersModal.jsx";
import JoinTeamModal from "../../../Component/JoinTeamModal.jsx";
import HackathonTimeLine from "../../../Component/HackathonTimeLine.jsx";

const HackathonDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showJoinTeamModal, setShowJoinTeamModal] = useState(false);
  const [myTeam, setMyTeam] = useState(null);
  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    setLoading(true);
    
    // Load both static and custom hackathons
    let allHackathons = [...hackathonData];
    
    // Add custom hackathons from localStorage
    try {
      const savedHackathons = localStorage.getItem("customHackathons");
      if (savedHackathons) {
        const parsedSavedHackathons = JSON.parse(savedHackathons);
        allHackathons = [...allHackathons, ...parsedSavedHackathons];
      }
    } catch (error) {
      console.error("Error parsing saved hackathons:", error);
    }
    
    // Find the hackathon with the matching ID
    const found = allHackathons.find((h) => h.slug === slug);
    if (found) {
      setHackathon(found);
    } else {
      console.error("Hackathon not found with id:", slug);
    }
    
    // Mock API call to check if user has a team for this hackathon
    fetchUserTeam();
    
    setLoading(false);
  }, [slug]);

  // Function to fetch user's team data
  const fetchUserTeam = () => {
    // This is a mock function - replace with actual API call
    // For now, we'll just simulate not having a team
    setMyTeam(null);
    
    // Example of what this might look like with real data:
    // api.getUserTeam(id).then(team => {
    //   setMyTeam(team);
    //   if(team) setInviteCode(team.inviteCode);
    // }).catch(err => console.error(err));
  };

  const handleCreateTeamModalOpen = () => {
    setShowCreateTeamModal(true);
  };

  const handleCreateTeamModalClose = () => {
    setShowCreateTeamModal(false);
  };

  const handleInviteModalOpen = () => {
    setShowInviteModal(true);
  };

  const handleInviteModalClose = () => {
    setShowInviteModal(false);
  };

  const handleJoinTeamModalOpen = () => {
    setShowJoinTeamModal(true);
  };

  const handleJoinTeamModalClose = () => {
    setShowJoinTeamModal(false);
  };

  const handleTeamSubmit = (teamData) => {
    console.log("Team created:", teamData);
    // Add your team creation logic here (e.g., API call)
    
    // Mock successful team creation with invite code
    const mockInviteCode = "HACK-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    setInviteCode(mockInviteCode);
    
    setMyTeam({
      id: "team-" + Math.random().toString(36).substr(2, 9),
      name: teamData.name,
      members: [{ id: "current-user", name: "You (Team Leader)", role: "Leader" }],
      inviteCode: mockInviteCode,
      hackathonSlug: slug
    });
    
    handleCreateTeamModalClose();
  };

  const handleInviteSubmit = (emails) => {
    console.log("Invitations sent to:", emails);
    // Add your invitation logic here (e.g., API call)
    
    handleInviteModalClose();
    
    // Show a success notification
    alert("Invitations sent successfully!");
  };

  const handleJoinTeam = (joinCode) => {
    console.log("Joining team with code:", joinCode);
    // Add your team joining logic here (e.g., API call)
    
    // Mock successful team join
    setMyTeam({
      id: "team-joined-" + Math.random().toString(36).substr(2, 9),
      name: "Awesome Team",
      members: [
        { id: "team-leader", name: "Team Leader", role: "Leader" },
        { id: "current-user", name: "You", role: "Member" },
        { id: "other-member", name: "Other Member", role: "Member" }
      ],
      inviteCode: joinCode
    });
    
    handleJoinTeamModalClose();
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    // Show a success notification
    alert("Invite code copied to clipboard!");
  };

  const formatPrizeDetails = (prizeDetails) => {
    if (!prizeDetails) return null;
    
    // Check if prizeDetails is already formatted
    if (typeof prizeDetails === 'string') {
      return prizeDetails;
    }
    
    // Format the prize details in a more readable way
    if (prizeDetails.firstPrize || prizeDetails.secondPrize || prizeDetails.thirdPrize) {
      return (
        <div className="space-y-4">
          {prizeDetails.firstPrize && (
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-dark-primary text-xl font-bold">1st</div>
              <div className="ml-4">
                <h3 className="font-bold text-lg">{prizeDetails.firstPrize.title || "First Prize"}</h3>
                <p>{prizeDetails.firstPrize.amount || prizeDetails.firstPrize}</p>
                {prizeDetails.firstPrize.description && <p className="text-sm">{prizeDetails.firstPrize.description}</p>}
              </div>
            </div>
          )}
          
          {prizeDetails.secondPrize && (
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-dark-primary text-xl font-bold">2nd</div>
              <div className="ml-4">
                <h3 className="font-bold text-lg">{prizeDetails.secondPrize.title || "Second Prize"}</h3>
                <p>{prizeDetails.secondPrize.amount || prizeDetails.secondPrize}</p>
                {prizeDetails.secondPrize.description && <p className="text-sm">{prizeDetails.secondPrize.description}</p>}
              </div>
            </div>
          )}
          
          {prizeDetails.thirdPrize && (
            <div className="flex items-center">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-light-secondary2 text-xl font-bold">3rd</div>
              <div className="ml-4">
                <h3 className="font-bold text-lg">{prizeDetails.thirdPrize.title || "Third Prize"}</h3>
                <p>{prizeDetails.thirdPrize.amount || prizeDetails.thirdPrize}</p>
                {prizeDetails.thirdPrize.description && <p className="text-sm">{prizeDetails.thirdPrize.description}</p>}
              </div>
            </div>
          )}
          
          {prizeDetails.otherPrizes && (
            <div className="mt-4">
              <h3 className="font-bold text-lg mb-2">Special Prizes</h3>
              <div className="space-y-2">
                {Array.isArray(prizeDetails.otherPrizes) ? 
                  prizeDetails.otherPrizes.map((prize, index) => (
                    <div key={index} className="bg-light-secondary1 p-3 rounded-lg">
                      <h4 className="font-medium">{prize.title || `Special Prize ${index + 1}`}</h4>
                      <p>{prize.amount || prize}</p>
                      {prize.description && <p className="text-sm">{prize.description}</p>}
                    </div>
                  )) : (
                    <div className="bg-light-secondary1 p-3 rounded-lg">
                      <p>{prizeDetails.otherPrizes}</p>
                    </div>
                  )
                }
              </div>
            </div>
          )}
        </div>
      );
    }
    
    // Fallback for other formats
    return (
      <div className="space-y-2">
        {Object.entries(prizeDetails).map(([key, value]) => (
          <div key={key} className="bg-light-secondary1 p-3 rounded-lg">
            <h3 className="font-bold text-lg capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
            <p>{typeof value === 'object' ? JSON.stringify(value) : value}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderTeamSection = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-dark-primary font-poppins flex items-center">
          <UserGroupIcon className="w-6 h-6 mr-2" />
          Team Management
        </h2>
        
        {myTeam ? (
          <div className="bg-light-secondary2 rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h3 className="text-xl font-medium text-dark-primary font-poppins">{myTeam.name}</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block mt-2 md:mt-0">
                  Active Team
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
                <motion.button
                  onClick={handleInviteModalOpen}
                  className="px-4 py-2 bg-dark-secondary1 text-light-secondary2 rounded-lg hover:bg-dark-primary transition-colors duration-300 font-poppins text-sm flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserPlusIcon className="w-4 h-4 mr-1" />
                  Invite Members
                </motion.button>
              </div>
            </div>
            
            <div className="p-4 bg-light-secondary1 rounded-lg mb-4">
              <h4 className="text-sm font-medium mb-2 text-dark-primary font-poppins">Team Invite Code</h4>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inviteCode}
                  readOnly
                  className="w-full px-3 py-2 border border-dark-secondary1 rounded-lg bg-white text-dark-primary text-sm outline-none"
                />
                <motion.button
                  onClick={copyInviteCode}
                  className="p-2 bg-dark-primary text-light-secondary2 rounded-lg hover:bg-dark-secondary1 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Copy invite code"
                >
                  <ClipboardDocumentIcon className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-xs text-dark-secondary1 mt-2 font-dmsans">
                Share this code with your teammates. They can use it to join your team.
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-dark-secondary1 font-poppins mb-2">Team Members</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {myTeam.members.map((member) => (
                  <div 
                    key={member.id} 
                    className="flex items-center p-3 bg-light-secondary1 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-dark-secondary1 rounded-full flex items-center justify-center text-light-secondary2">
                      {member.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <span className="text-dark-primary font-medium font-dmsans block">{member.name}</span>
                      <span className="text-dark-secondary1 text-sm font-dmsans">{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-light-secondary2 rounded-xl shadow-md p-6">
            <div className="text-center py-8">
              <p className="text-dark-secondary1 font-dmsans mb-6">You haven't created or joined a team for this hackathon yet.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={handleCreateTeamModalOpen}
                  className="px-6 py-3 bg-dark-primary text-light-secondary2 rounded-lg hover:bg-dark-secondary1 transition-colors duration-300 font-poppins inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlusCircleIcon className="w-5 h-5 mr-2" />
                  Create Team
                </motion.button>
                <motion.button
                  onClick={handleJoinTeamModalOpen}
                  className="px-6 py-3 bg-light-secondary1 text-dark-primary border border-dark-primary rounded-lg hover:bg-light-secondary2 transition-colors duration-300 font-poppins inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserGroupIcon className="w-5 h-5 mr-2" />
                  Join Team
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
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
        <p className="text-dark-secondary1 mb-8">The hackathon you're looking for doesn't exist or has been removed.</p>
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
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-dmsans">
                {new Date(hackathon.startDate).toLocaleDateString()} -{" "}
                {new Date(hackathon.endDate).toLocaleDateString()}
              </span>
              
              {/* If this is a custom hackathon with URL, show the link */}
              {hackathon.isCustom && hackathon.url && (
                <a 
                  href={hackathon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-light-secondary2 bg-opacity-20 px-3 py-1 rounded-full text-sm font-dmsans hover:bg-opacity-30 transition-all"
                >
                  <LinkIcon className="w-4 h-4 mr-1" />
                  Visit Original Source
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="border-b border-dark-secondary1">
            <nav className="flex space-x-8">
              {["overview", "teams", "rules", "timeline"].map((tab) => (
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
                <p className="text-dark-secondary1 font-dmsans whitespace-pre-wrap">{hackathon.description}</p>
                
                {hackathon.isCustom && hackathon.url && (
                  <div className="mt-4 pt-4 border-t border-dark-secondary1/20">
                    <a 
                      href={hackathon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-dark-primary hover:text-dark-secondary1 font-dmsans"
                    >
                      <LinkIcon className="w-5 h-5 mr-2" />
                      View hackathon on {new URL(hackathon.url).hostname}
                    </a>
                  </div>
                )}
              </motion.div>

              {hackathon.prizeDetails && (
                <motion.div
                  className="bg-light-secondary2 rounded-xl shadow-md p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Prizes</h2>
                  <div className="text-dark-secondary1 font-dmsans">
                    {formatPrizeDetails(hackathon.prizeDetails)}
                  </div>
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
                <div className="space-y-3">
                  <p className="text-dark-secondary1 font-dmsans">
                    <strong>Location:</strong> {hackathon.location || "Online"}
                  </p>
                  <p className="text-dark-secondary1 font-dmsans">
                    <strong>Status:</strong>{" "}
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      new Date(hackathon.startDate) > new Date()
                        ? "bg-blue-100 text-blue-800"
                        : new Date(hackathon.endDate) < new Date()
                        ? "bg-gray-100 text-gray-800"
                        : "bg-green-100 text-green-800"
                    }`}>
                      {new Date(hackathon.startDate) > new Date()
                        ? "Upcoming"
                        : new Date(hackathon.endDate) < new Date()
                        ? "Past"
                        : "Ongoing"}
                    </span>
                  </p>
                  <p className="text-dark-secondary1 font-dmsans">
                    <strong>Created:</strong>{" "}
                    {hackathon.createdAt && new Date(hackathon.createdAt).toLocaleDateString()}
                  </p>
                  {hackathon.isCustom && (
                    <p className="text-dark-secondary1 font-dmsans">
                      <strong>Source:</strong> Imported via URL
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === "teams" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {renderTeamSection()}
          </motion.div>
        )}

        {activeTab === "rules" && (
          <motion.div
            className="bg-light-secondary2 rounded-xl shadow-md p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Rules</h2>
            <div className="text-dark-secondary1 font-dmsans whitespace-pre-wrap">
              {hackathon.rules || 
                `# ${hackathon.name} Rules

1. All participants must register and join a team before the submission deadline.
2. Teams can consist of 1-4 members.
3. All code and design elements must be created during the hackathon period.
4. Use of open-source libraries and frameworks is permitted.
5. Submissions must include source code and a brief presentation.
6. Judging will be based on innovation, functionality, design, and presentation.
7. Winners will be announced after the judging period.

Good luck to all participants!`
              }
            </div>
          </motion.div>
        )}

        {activeTab === "timeline" && (
          <HackathonTimeLine hackathon={hackathon} />
        )}
      </motion.div>

      {/* Create Team Modal */}
      <CreateTeamModal
        isOpen={showCreateTeamModal}
        onClose={handleCreateTeamModalClose}
        onSubmit={handleTeamSubmit}
        hackathonSlug={slug}
      />

      {/* Invite Members Modal */}
      <InviteMembersModal
        isOpen={showInviteModal}
        onClose={handleInviteModalClose}
        onSubmit={handleInviteSubmit}
        teamId={myTeam?.id}
        inviteCode={inviteCode}
      />

      {/* Join Team Modal */}
      <JoinTeamModal
        isOpen={showJoinTeamModal}
        onClose={handleJoinTeamModalClose}
        onSubmit={handleJoinTeam}
        hackathonSlug={slug}
      />
    </div>
  );
};

export default HackathonDetails;