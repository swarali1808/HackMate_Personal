import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiCalendar, FiPlus, FiExternalLink, FiTrash2, FiUser, FiBriefcase, FiAward, FiCheck, FiCode, FiLayers, FiClock, FiEye } from 'react-icons/fi';
import ResumeUpload from './TabComponents/ResumeUpload';

const ProfileSection = ({ 
  onOpenModal, 
  onEditItem, 
  onDeleteItem, 
  profileData, 
  username,
  userId
}) => {
  const [activeTab, setActiveTab] = useState('Education');
  const navigate = useNavigate();
  
  const tabs = [
    'Education', 
    'Projects', 
    'Position of Responsibility', 
    'Work Experience', 
    'Achievements', 
    'Certifications',
    'Hackathon Preferences'
  ];

  // Get first letter of username for avatar
  const userInitial = username ? username.charAt(0).toUpperCase() : 'U';
  
  // Navigation handlers
  const handleViewProfile = () => {
    navigate(`/dashboard/${userId}/view`);
  };

  // Function to render content based on active tab and data
  const renderTabContent = () => {
    if (activeTab === 'Hackathon Preferences') {
      return renderHackathonPreferencesTab();
    }
    
    const tabData = profileData[activeTab];
    
    if (!tabData || tabData.length === 0) {
      // Show "Add New" button if no data exists
      return (
        <div className="text-center py-8">
          <div className="bg-[#f6ebff] inline-block p-4 rounded-full mb-4">
            {renderTabIcon(activeTab)}
          </div>
          <h3 className="font-bold text-lg mb-1 text-[#340062]">Add {activeTab} Details</h3>
          <p className="text-[#11014c] opacity-70 mb-4">{getTabDescription(activeTab)}</p>
          <button 
            onClick={() => onOpenModal(activeTab)}
            className="inline-flex items-center px-4 py-2 border border-[#340062] text-[#340062] rounded hover:bg-[#f6ebff] transition-colors"
          >
            <FiPlus className="mr-2" /> Add new
          </button>
        </div>
      );
    } else {
      // Show data if it exists
      return (
        <div className="py-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-[#340062]">{activeTab}</h3>
            <button 
              onClick={() => onOpenModal(activeTab)}
              className="inline-flex items-center px-3 py-1 border border-[#340062] text-[#340062] rounded text-sm hover:bg-[#f6ebff] transition-colors"
            >
              <FiPlus className="mr-1" /> Add More
            </button>
          </div>
          
          {/* Render data based on tab type */}
          {renderDataCards(tabData, activeTab)}
        </div>
      );
    }
  };
  
  // Hackathon Preferences Tab Rendering
  const renderHackathonPreferencesTab = () => {
    const hackathonPreferences = profileData['Hackathon Preferences'] || {};
    const hasPreferences = Object.keys(hackathonPreferences).length > 0;
    
    return (
      <div className="py-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-[#340062]">Hackathon Preferences</h3>
          <button 
            onClick={() => onOpenModal('Hackathon Preferences')}
            className="inline-flex items-center px-3 py-1 border border-[#340062] text-[#340062] rounded text-sm hover:bg-[#f6ebff] transition-colors"
          >
            {hasPreferences ? 'Edit Preferences' : 'Add Preferences'}
          </button>
        </div>
        
        {!hasPreferences ? (
          <div className="text-center py-8">
            <div className="bg-[#f6ebff] inline-block p-4 rounded-full mb-4">
              <FiCode size={24} color="#340062" />
            </div>
            <h3 className="font-bold text-lg mb-1 text-[#340062]">Add Hackathon Preferences</h3>
            <p className="text-[#11014c] opacity-70 mb-4">Help us match you with the perfect hackathon teams and projects</p>
            <button 
              onClick={() => onOpenModal('Hackathon Preferences')}
              className="inline-flex items-center px-4 py-2 border border-[#340062] text-[#340062] rounded hover:bg-[#f6ebff] transition-colors"
            >
              <FiPlus className="mr-2" /> Add preferences
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Role Preferences */}
            <div className="border border-[#b6cbff] rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-[#f6ebff] p-3 rounded-full mr-3">
                  <FiCode size={20} color="#340062" />
                </div>
                <h4 className="font-bold text-[#340062]">Role Preferences</h4>
              </div>
              
              <div className="space-y-2">
                {hackathonPreferences.rolePreferences && hackathonPreferences.rolePreferences.length > 0 ? (
                  hackathonPreferences.rolePreferences.map((role, idx) => (
                    <div key={idx} className="flex items-center bg-[#f6ebff] px-3 py-2 rounded-md">
                      <span className="text-[#340062] font-medium">
                        {idx === 0 ? '1st Choice: ' : idx === 1 ? '2nd Choice: ' : '3rd Choice: '}
                      </span>
                      <span className="ml-2 text-[#11014c]">{role}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-[#11014c] opacity-70">No role preferences specified</p>
                )}
              </div>
            </div>
            
            {/* Domain Interests */}
            <div className="border border-[#b6cbff] rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-[#f6ebff] p-3 rounded-full mr-3">
                  <FiLayers size={20} color="#340062" />
                </div>
                <h4 className="font-bold text-[#340062]">Domain Interests</h4>
              </div>
              
              <div className="space-y-2">
                {hackathonPreferences.domainInterests && hackathonPreferences.domainInterests.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {hackathonPreferences.domainInterests.map((domain, idx) => (
                      <span key={idx} className="bg-[#f6ebff] px-3 py-1 rounded-full text-[#340062]">
                        {domain}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#11014c] opacity-70">No domain interests specified</p>
                )}
              </div>
            </div>
            
            {/* Experience Level */}
            <div className="border border-[#b6cbff] rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-[#f6ebff] p-3 rounded-full mr-3">
                  <FiAward size={20} color="#340062" />
                </div>
                <h4 className="font-bold text-[#340062]">Experience Level</h4>
              </div>
              
              <div>
                {hackathonPreferences.experienceLevel ? (
                  <>
                    <div className="mb-2">
                      <span className="text-[#11014c] font-medium">Hackathon Experience:</span>
                      <span className="ml-2 text-[#340062]">{hackathonPreferences.experienceLevel}</span>
                    </div>
                    <div>
                      <span className="text-[#11014c] font-medium">Participated In:</span>
                      <span className="ml-2 text-[#340062]">
                        {hackathonPreferences.hackathonsParticipated || 0} hackathons
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="text-[#11014c] opacity-70">No experience level specified</p>
                )}
              </div>
            </div>
            
            {/* Collaboration Preferences */}
            <div className="border border-[#b6cbff] rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-[#f6ebff] p-3 rounded-full mr-3">
                  <FiUser size={20} color="#340062" />
                </div>
                <h4 className="font-bold text-[#340062]">Collaboration Preferences</h4>
              </div>
              
              <div className="space-y-2">
                {hackathonPreferences.teamSize ? (
                  <>
                    <div className="flex items-center">
                      <span className="text-[#11014c] font-medium">Preferred Team Size:</span>
                      <span className="ml-2 text-[#340062]">{hackathonPreferences.teamSize}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-[#11014c] font-medium">Communication:</span>
                      <span className="ml-2 text-[#340062]">{hackathonPreferences.communicationPreference}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-[#11014c] font-medium">Work Style:</span>
                      <span className="ml-2 text-[#340062]">{hackathonPreferences.workStyle}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-[#11014c] opacity-70">No collaboration preferences specified</p>
                )}
              </div>
            </div>
            
            {/* Availability */}
            <div className="md:col-span-2 border border-[#b6cbff] rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-[#f6ebff] p-3 rounded-full mr-3">
                  <FiClock size={20} color="#340062" />
                </div>
                <h4 className="font-bold text-[#340062]">Availability</h4>
              </div>
              
              <div className="space-y-2">
                {hackathonPreferences.availability ? (
                  <>
                    <div className="flex items-center">
                      <span className="text-[#11014c] font-medium">Typical Availability:</span>
                      <span className="ml-2 text-[#340062]">{hackathonPreferences.availability}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-[#11014c] font-medium">Time Zone:</span>
                      <span className="ml-2 text-[#340062]">{hackathonPreferences.timezone || 'Not specified'}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-[#11014c] font-medium">Weekly Commitment:</span>
                      <span className="ml-2 text-[#340062]">
                        {hackathonPreferences.weeklyCommitment || 'Not specified'}
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="text-[#11014c] opacity-70">No availability information specified</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Helper function to get tab description
  const getTabDescription = (tab) => {
    switch(tab) {
      case 'Education': return 'Your school / college details';
      case 'Projects': return 'Showcase your projects and skills';
      case 'Position of Responsibility': return 'Leadership roles and responsibilities';
      case 'Work Experience': return 'Your internships and job details';
      case 'Achievements': return 'Your awards and recognitions';
      case 'Certifications': return 'Professional certifications and courses';
      case 'Hackathon Preferences': return 'Your hackathon roles and preferences for better team matching';
      default: return '';
    }
  };
  
  // Helper function to render tab icons
  const renderTabIcon = (tab) => {
    switch(tab) {
      case 'Education':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 5V19H3V5H21ZM21 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V5C23 3.9 22.1 3 21 3ZM14 17H6V15H14V17ZM18 13H6V11H18V13ZM18 9H6V7H18V9Z" fill="#340062"/>
          </svg>
        );
      case 'Projects':
        return <FiExternalLink size={24} color="#340062" />;
      case 'Position of Responsibility':
        return <FiUser size={24} color="#340062" />;
      case 'Work Experience':
        return <FiBriefcase size={24} color="#340062" />;
      case 'Achievements':
        return <FiAward size={24} color="#340062" />;
      case 'Certifications':
        return <FiCheck size={24} color="#340062" />;
      case 'Hackathon Preferences':
        return <FiCode size={24} color="#340062" />;
      default:
        return <FiEdit2 size={24} color="#340062" />;
    }
  };
  
  // Function to render data cards based on tab type
  const renderDataCards = (data, tabType) => {
    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="border border-[#b6cbff] rounded-lg p-6 hover:shadow-md transition-shadow relative group">
            {/* Edit/Delete controls - shown on hover */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onEditItem(tabType, index, item)}
                className="bg-[#f6ebff] p-2 rounded-full text-[#340062] hover:bg-[#340062] hover:text-white transition"
                aria-label="Edit"
                type="button"
              >
                <FiEdit2 size={16} />
              </button>
              <button 
                onClick={() => onDeleteItem(tabType, index)}
                className="bg-[#f6ebff] p-2 rounded-full text-red-600 hover:bg-red-600 hover:text-white transition"
                aria-label="Delete"
                type="button"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            
            {/* Content for each tab type */}
            {tabType === 'Education' && (
              <div>
                <h4 className="font-bold text-[#340062] pr-12">
                  {item.university || item.school || "Educational Institution"}
                </h4>
                <p className="text-[#11014c]">
                  {item.degree || "Degree"} {item.fieldOfStudy ? `in ${item.fieldOfStudy}` : ""}
                </p>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-[#11014c] opacity-70">
                    {item.startYear || "Start Year"} - {item.endYear || "End Year"}
                  </span>
                  <span className="text-sm text-[#11014c]">
                    {item.grade ? `Grade: ${item.grade}` : ""}
                  </span>
                </div>
              </div>
            )}
            
            {tabType === 'Projects' && (
              <div>
                <h4 className="font-bold text-[#340062] pr-12">{item.title || "Project Title"}</h4>
                <p className="text-[#11014c] my-2">{item.description || ""}</p>
                <div className="flex flex-wrap gap-2 my-2">
                  {item.technologies && item.technologies.split(',').map((tech, i) => (
                    <span key={i} className="bg-[#f6ebff] px-3 py-1 rounded-full text-xs text-[#340062]">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-[#11014c] opacity-70">
                    {item.startDate || ""} {item.endDate ? `- ${item.endDate}` : ""}
                  </span>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#340062] flex items-center hover:underline">
                      View Project <FiExternalLink className="ml-1" />
                    </a>
                  )}
                </div>
              </div>
            )}
            
            {tabType === 'Work Experience' && (
              <div>
                <h4 className="font-bold text-[#340062] pr-12">{item.company || "Company Name"}</h4>
                <p className="text-[#11014c]">
                  {item.position || "Position"} {item.employmentType ? `• ${item.employmentType}` : ""}
                </p>
                <p className="text-sm text-[#11014c] my-2">{item.description || ""}</p>
                <span className="text-sm text-[#11014c] opacity-70">
                  {item.startDate || ""} {item.endDate ? `- ${item.endDate}` : ""}
                </span>
              </div>
            )}
            
            {tabType === 'Position of Responsibility' && (
              <div>
                <h4 className="font-bold text-[#340062] pr-12">{item.title || "Position Title"}</h4>
                <p className="text-[#11014c]">{item.organization || "Organization"}</p>
                <p className="text-sm text-[#11014c] my-2">{item.description || ""}</p>
                <span className="text-sm text-[#11014c] opacity-70">
                  {item.startDate || ""} {item.endDate ? `- ${item.endDate}` : ""}
                </span>
              </div>
            )}
            
            {tabType === 'Achievements' && (
              <div>
                <h4 className="font-bold text-[#340062] pr-12">{item.title || "Achievement Title"}</h4>
                <p className="text-[#11014c]">{item.issuer || "Issuer"}</p>
                <p className="text-sm text-[#11014c] my-2">{item.description || ""}</p>
                <span className="text-sm text-[#11014c] opacity-70">{item.date || ""}</span>
              </div>
            )}
            
            {tabType === 'Certifications' && (
              <div>
                <h4 className="font-bold text-[#340062] pr-12">{item.title || "Certification Name"}</h4>
                <p className="text-[#11014c]">{item.issuer || "Issuer"}</p>
                <p className="text-sm text-[#11014c] my-2">{item.description || ""}</p>
                <div className="flex justify-between">
                  <span className="text-sm text-[#11014c] opacity-70">{item.date || ""}</span>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#340062] flex items-center hover:underline">
                      View Certificate <FiExternalLink className="ml-1" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Calculate health once per render
  const healthPercentage = calculateProfileHealth();
  const suggestion = getSuggestionForProfileCompletion();

  return (
    <div className="w-full bg-[#f6ebff] bg-opacity-30 h-max font-dmsans">
      {/* Header Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-[#340062] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userInitial}
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#340062]">Tanish Shah</h1>
              <p className="text-sm text-[#11014c] mt-1">@{username || 'tanishshah20'}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            {/* Added View Profile button */}
            <button 
              type="button" 
              onClick={handleViewProfile}
              className="px-6 py-2 bg-[#f6ebff] border border-[#340062] text-[#340062] font-medium rounded-md hover:bg-[#ebd9ff] transition-colors flex items-center"
            >
              <FiEye className="mr-2" /> View Profile
            </button>
          </div>
        </div>
      </div>

      <ResumeUpload currentUser={username} />

      {/* Tabs Section */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <nav className="flex border-b border-[#b6cbff]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === tab
                      ? "text-[#340062] border-b-2 border-[#340062]"
                      : "text-[#11014c] opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {renderTabContent()}
        </div>
      </div>

      {/* Profile Health Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-[#340062]">Profile Health:</h3>
          <span className={`${healthPercentage > 50 ? "text-[#340062]" : "text-[#FF6B6B]"}`}>
            {healthPercentage > 75 ? "EXCELLENT" : healthPercentage > 50 ? "GOOD" : "AVERAGE"}
          </span>
        </div>
        
        <p className="text-sm mb-3 text-[#11014c]">
          <span className="font-medium">Students with atleast 90% profile completion</span> have a better chance of getting selected!
        </p>
        
        {/* Progress Bar */}
        <div className="w-full bg-[#f6ebff] rounded-full h-2 mb-1">
          <div 
            className={`h-2 rounded-full ${healthPercentage > 50 ? "bg-[#340062]" : "bg-[#FF6B6B]"}`} 
            style={{width: `${healthPercentage}%`}}
          ></div>
        </div>
        <div className="flex justify-between mb-6">
          <span className={`text-sm font-medium ${healthPercentage > 50 ? "text-[#340062]" : "text-[#FF6B6B]"}`}>
            {healthPercentage}% completed
          </span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full mx-1 mt-1 ${
                  i < Math.ceil(healthPercentage / 20) ? 
                    (healthPercentage > 50 ? "bg-[#340062]" : "bg-[#FF6B6B]") : 
                    "bg-[#f6ebff]"
                }`}
              ></div>
            ))}
          </div>
        </div>
        
        <button 
          type="button"
          className={`text-sm font-medium ${healthPercentage > 50 ? "text-[#340062]" : "text-[#FF6B6B]"} hover:underline`}>
          {suggestion}
        </button>
      </div>
    </div>
  );
  
  // Function to calculate profile health percentage
  function calculateProfileHealth() {
    const totalSections = 11; // Tabs + Tagline + Skills + Social Links + Hackathon Preferences
    let completedSections = 0;
    
    // Check tabs with data
    Object.entries(profileData).forEach(([key, data]) => {
      if (key === 'Social Links' || key === 'Hackathon Preferences' || key === 'Tagline') {
        if ((typeof data === 'string' && data) || (data && Object.keys(data).length > 0)) completedSections++;
      } else if (data && Array.isArray(data) && data.length > 0) {
        completedSections++;
      }
    });
    
    return Math.round((completedSections / totalSections) * 100);
  }
  
  // Function to provide suggestion for profile completion
  function getSuggestionForProfileCompletion() {
    if (!profileData.Projects || profileData.Projects.length === 0) {
      return "Add 1 Project to improve your profile health";
    } else if (!profileData.Education || profileData.Education.length === 0) {
      return "Add your Education details to improve your profile health";
    } else if (!profileData['Hackathon Preferences'] || Object.keys(profileData['Hackathon Preferences']).length === 0) {
      return "Add Hackathon Preferences to improve team matching";
    } else if (!profileData.Skills || profileData.Skills.length === 0) {
      return "Add Skills to improve your profile health";
    } else if (!profileData['Work Experience'] || profileData['Work Experience'].length === 0) {
      return "Add Work Experience to improve your profile health";
    } else if (!profileData.Tagline) {
      return "Add a Tagline to improve your profile";
    }
    return "Complete your profile to improve visibility";
  }
};

export default ProfileSection;