import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiAward, FiStar, FiTarget, FiZap, FiCode, 
  FiUsers, FiHeart, FiThumbsUp, FiCpu, FiDatabase, FiGlobe,
  FiCalendar, FiCodesandbox, FiGift, FiPieChart, FiCloud,
  FiX, FiShare2, FiTwitter, FiLinkedin, FiFacebook
} from 'react-icons/fi';
import { FaTrophy, FaCheck } from "react-icons/fa";

const BadgesTab = ({ username = 'tanishshah20' }) => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [currentDate] = useState('2025-04-06 09:01:18');
  
  useEffect(() => {
    // Simulate fetching badges from an API or local storage
    const fetchBadges = async () => {
      try {
        // In a real app, replace this with actual API call
        // For now, we'll use mock data
        const mockBadges = generateMockBadges();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setBadges(mockBadges);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching badges:', error);
        setLoading(false);
      }
    };
    
    fetchBadges();
  }, [username]);
  
  // Function to generate mock badge data
  const generateMockBadges = () => {
    // Badge categories
    const CATEGORIES = {
      ACHIEVEMENT: 'achievement',
      PARTICIPATION: 'participation',
      SKILL: 'skill',
      COMMUNITY: 'community',
      SPECIAL: 'special'
    };
    
    // Define all possible badges
    const allBadges = [
      // Achievement Badges
      {
        id: 'first-win',
        name: 'First Victory',
        description: 'Won your first hackathon. The first of many victories to come!',
        icon: <FaTrophy size={28} />,
        color: '#FFD700',
        gradientFrom: '#FFD700',
        gradientTo: '#FFA500',
        category: CATEGORIES.ACHIEVEMENT,
        earned: true,
        earnedDate: '2023-10-15',
        rarity: 'common',
        progress: 100,
        image: 'https://img.icons8.com/fluency/96/trophy.png'
      },
      {
        id: 'top-50',
        name: 'Elite Fifty',
        description: 'Ranked in the top 50 participants nationally. Your skills are getting recognized!',
        icon: <FiStar size={28} />,
        color: '#9C27B0',
        gradientFrom: '#9C27B0',
        gradientTo: '#673AB7',
        category: CATEGORIES.ACHIEVEMENT,
        earned: true,
        earnedDate: '2024-02-10',
        rarity: 'epic',
        progress: 100,
        image: 'https://img.icons8.com/fluency/96/prize.png'
      },
      {
        id: '10x-winner',
        name: 'Decathlon Champion',
        description: 'Won 10 hackathons. You\'ve mastered the art of competitive coding!',
        icon: <FiAward size={28} />,
        color: '#2196F3',
        gradientFrom: '#2196F3',
        gradientTo: '#03A9F4',
        category: CATEGORIES.ACHIEVEMENT,
        earned: false,
        rarity: 'rare',
        progress: 70,
        image: 'https://img.icons8.com/fluency/96/medal2.png'
      },
      {
        id: '20x-winner',
        name: 'Hackathon Legend',
        description: 'Won 20 hackathons. Your name is now legendary in the community!',
        icon: <FiAward size={28} />,
        color: '#F44336',
        gradientFrom: '#F44336',
        gradientTo: '#E91E63',
        category: CATEGORIES.ACHIEVEMENT,
        earned: false,
        rarity: 'epic',
        progress: 35,
        image: 'https://img.icons8.com/fluency/96/crown.png'
      },
      {
        id: 'best-performance',
        name: 'Outstanding Excellence',
        description: 'Received special recognition for exceptional performance across multiple domains.',
        icon: <FiTarget size={28} />,
        color: '#E91E63',
        gradientFrom: '#E91E63',
        gradientTo: '#9C27B0',
        category: CATEGORIES.ACHIEVEMENT,
        earned: true,
        earnedDate: '2024-01-05',
        rarity: 'rare',
        progress: 100,
        image: 'https://img.icons8.com/fluency/96/guarantee.png'
      },
      {
        id: '50x-winner',
        name: 'Hackathon Immortal',
        description: 'Won 50 hackathons. Your legacy in the hackathon world is immortalized!',
        icon: <FiAward size={28} />,
        color: '#673AB7',
        gradientFrom: '#673AB7',
        gradientTo: '#3F51B5',
        category: CATEGORIES.ACHIEVEMENT,
        earned: false,
        rarity: 'legendary',
        progress: 10,
        image: 'https://img.icons8.com/fluency/96/diamond.png'
      },
      
      // Participation Badges
      {
        id: 'first-hackathon',
        name: 'First Steps',
        description: 'Participated in your first hackathon. The journey of a thousand lines of code begins with a single step!',
        icon: <FiCalendar size={28} />,
        color: '#4CAF50',
        gradientFrom: '#4CAF50',
        gradientTo: '#8BC34A',
        category: CATEGORIES.PARTICIPATION,
        earned: true,
        earnedDate: '2023-09-01',
        rarity: 'common',
        progress: 100,
        image: 'https://img.icons8.com/fluency/96/time-machine.png'
      },
      {
        id: '10x-participation',
        name: 'Serial Hacker',
        description: 'Participated in 10 hackathons. Your dedication to the craft is inspiring!',
        icon: <FiCalendar size={28} />,
        color: '#00BCD4',
        gradientFrom: '#00BCD4',
        gradientTo: '#03A9F4',
        category: CATEGORIES.PARTICIPATION,
        earned: true,
        earnedDate: '2024-03-20',
        rarity: 'uncommon',
        progress: 100,
        image: 'https://img.icons8.com/fluency/96/calendar-app.png'
      },
      {
        id: '25x-participation',
        name: 'Hack Enthusiast',
        description: 'Participated in 25 hackathons. You\'ve made hackathons a way of life!',
        icon: <FiZap size={28} />,
        color: '#FF9800',
        gradientFrom: '#FF9800',
        gradientTo: '#FF5722',
        category: CATEGORIES.PARTICIPATION,
        earned: false,
        rarity: 'rare',
        progress: 60,
        image: 'https://img.icons8.com/fluency/96/lightning-bolt.png'
      },
      {
        id: '50x-participation',
        name: 'Hackathon Addict',
        description: 'Participated in 50 hackathons. Your addiction to innovation knows no bounds!',
        icon: <FiZap size={28} />,
        color: '#FF5722',
        gradientFrom: '#FF5722',
        gradientTo: '#F44336',
        category: CATEGORIES.PARTICIPATION,
        earned: false,
        rarity: 'epic',
        progress: 30,
        image: 'https://img.icons8.com/fluency/96/fire-element.png'
      },
      {
        id: 'global-participant',
        name: 'Global Hacker',
        description: 'Participated in hackathons across 3+ countries. Your innovation knows no borders!',
        icon: <FiGlobe size={28} />,
        color: '#3F51B5',
        gradientFrom: '#3F51B5',
        gradientTo: '#2196F3',
        category: CATEGORIES.PARTICIPATION,
        earned: false,
        rarity: 'rare',
        progress: 66,
        image: 'https://img.icons8.com/fluency/96/geography.png'
      },
      
      // Skill Badges
      {
        id: 'frontend-wizard',
        name: 'Frontend Wizard',
        description: 'Recognized for exceptional frontend development skills. Your UIs are magical!',
        icon: <FiCode size={28} />,
        color: '#009688',
        gradientFrom: '#009688',
        gradientTo: '#4CAF50',
        category: CATEGORIES.SKILL,
        earned: true,
        earnedDate: '2023-12-08',
        rarity: 'uncommon',
        progress: 100,
        image: 'https://img.icons8.com/fluency/96/web-design.png'
      },
      {
        id: 'backend-master',
        name: 'Backend Master',
        description: 'Demonstrated excellence in backend architecture and development. The unseen hero of every app!',
        icon: <FiDatabase size={28} />,
        color: '#607D8B',
        gradientFrom: '#607D8B',
        gradientTo: '#455A64',
        category: CATEGORIES.SKILL,
        earned: false,
        rarity: 'uncommon',
        progress: 85,
        image: 'https://img.icons8.com/fluency/96/database.png'
      },
      {
        id: 'ai-pioneer',
        name: 'AI Pioneer',
        description: 'Created innovative solutions using artificial intelligence. Teaching machines to think like you!',
        icon: <FiCpu size={28} />,
        color: '#795548',
        gradientFrom: '#795548',
        gradientTo: '#5D4037',
        category: CATEGORIES.SKILL,
        earned: true,
        earnedDate: '2024-02-22',
        rarity: 'rare',
        progress: 100,
        image: 'https://img.icons8.com/fluency/96/artificial-intelligence.png'
      },
      {
        id: 'cloud-architect',
        name: 'Cloud Architect',
        description: 'Showcased expertise in cloud infrastructure and services. Your head is literally in the clouds!',
        icon: <FiCloud size={28} />,
        color: '#29B6F6',
        gradientFrom: '#29B6F6',
        gradientTo: '#0288D1',
        category: CATEGORIES.SKILL,
        earned: false,
        rarity: 'uncommon',
        progress: 42,
        image: 'https://img.icons8.com/fluency/96/cloud-storage.png'
      },
      {
        id: 'data-scientist',
        name: 'Data Virtuoso',
        description: 'Demonstrated exceptional skills in data analysis and visualization. Finding patterns where others see chaos!',
        icon: <FiPieChart size={28} />,
        color: '#8E24AA',
        gradientFrom: '#8E24AA',
        gradientTo: '#6A1B9A',
        category: CATEGORIES.SKILL,
        earned: false,
        rarity: 'rare',
        progress: 30,
        image: 'https://img.icons8.com/fluency/96/combo-chart.png'
      },
      
      // Community Badges
      {
        id: 'team-player',
        name: 'Team Player',
        description: 'Received positive feedback from 10+ team members. The person everyone wants on their team!',
        icon: <FiUsers size={28} />,
        color: '#26A69A',
        gradientFrom: '#26A69A',
        gradientTo: '#00897B',
        category: CATEGORIES.COMMUNITY,
        earned: true,
        earnedDate: '2023-11-12',
        rarity: 'uncommon',
        progress: 100,
        image: 'https://img.icons8.com/fluency/96/conference-call.png'
      },
      {
        id: 'mentor',
        name: 'Guiding Light',
        description: 'Mentored new participants in 3+ hackathons. Lighting the path for future innovators!',
        icon: <FiHeart size={28} />,
        color: '#EC407A',
        gradientFrom: '#EC407A',
        gradientTo: '#D81B60',
        category: CATEGORIES.COMMUNITY,
        earned: false,
        rarity: 'rare',
        progress: 66,
        image: 'https://img.icons8.com/fluency/96/helping-hand.png'
      },
      {
        id: 'community-contributor',
        name: 'Community Star',
        description: 'Made significant contributions to the hackathon community. Your impact extends beyond code!',
        icon: <FiThumbsUp size={28} />,
        color: '#7CB342',
        gradientFrom: '#7CB342',
        gradientTo: '#558B2F',
        category: CATEGORIES.COMMUNITY,
        earned: true,
        earnedDate: '2024-03-05',
        rarity: 'uncommon',
        progress: 100,
        image: 'https://img.icons8.com/fluency/96/popular-topic.png'
      },
      
      // Special Badges
      {
        id: 'innovator',
        name: 'Visionary Innovator',
        description: 'Created a genuinely innovative solution recognized by judges. You see what others can\'t!',
        icon: <FiCodesandbox size={28} />,
        color: '#FFC107',
        gradientFrom: '#FFC107',
        gradientTo: '#FFB300',
        category: CATEGORIES.SPECIAL,
        earned: true,
        earnedDate: '2024-01-28',
        rarity: 'epic',
        progress: 100,
        image: 'https://img.icons8.com/fluency/96/idea.png'
      },
      {
        id: 'hackathon-organizer',
        name: 'Event Architect',
        description: 'Helped organize or sponsor a hackathon event. Building stages for others to shine!',
        icon: <FiGift size={28} />,
        color: '#8D6E63',
        gradientFrom: '#8D6E63',
        gradientTo: '#6D4C41',
        category: CATEGORIES.SPECIAL,
        earned: false,
        rarity: 'rare',
        progress: 0,
        image: 'https://img.icons8.com/fluency/96/task.png'
      }
    ];
    
    return allBadges;
  };
  
  const handleBadgeClick = (badge) => {
    setSelectedBadge(badge);
  };
  
  const handleCloseModal = () => {
    setSelectedBadge(null);
  };
  
  const getFilteredBadges = () => {
    if (filterType === 'all') {
      return badges;
    }
    if (filterType === 'earned') {
      return badges.filter(badge => badge.earned);
    }
    if (filterType === 'in-progress') {
      return badges.filter(badge => !badge.earned && badge.progress > 0);
    }
    if (filterType === 'locked') {
      return badges.filter(badge => !badge.earned && badge.progress === 0);
    }
    
    // Filter by category
    return badges.filter(badge => badge.category === filterType);
  };
  
  const getEarnedCount = () => {
    return badges.filter(badge => badge.earned).length;
  };
  
  const getTotalCount = () => {
    return badges.length;
  };
  
  const getBadgeRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return { bg: 'rgba(158, 158, 158, 0.2)', text: '#757575', border: '#9E9E9E' };
      case 'uncommon':
        return { bg: 'rgba(76, 175, 80, 0.2)', text: '#2E7D32', border: '#4CAF50' };
      case 'rare':
        return { bg: 'rgba(33, 150, 243, 0.2)', text: '#1565C0', border: '#2196F3' };
      case 'epic':
        return { bg: 'rgba(156, 39, 176, 0.2)', text: '#7B1FA2', border: '#9C27B0' };
      case 'legendary':
        return { bg: 'rgba(255, 193, 7, 0.2)', text: '#F57F17', border: '#FFC107' };
      default:
        return { bg: 'rgba(158, 158, 158, 0.2)', text: '#757575', border: '#9E9E9E' };
    }
  };
  
  const getBadgeRarityLabel = (rarity) => {
    switch (rarity) {
      case 'common':
        return { text: 'Common', color: 'text-gray-600', bg: 'bg-gray-100' };
      case 'uncommon':
        return { text: 'Uncommon', color: 'text-green-700', bg: 'bg-green-100' };
      case 'rare':
        return { text: 'Rare', color: 'text-blue-700', bg: 'bg-blue-100' };
      case 'epic':
        return { text: 'Epic', color: 'text-purple-700', bg: 'bg-purple-100' };
      case 'legendary':
        return { text: 'Legendary', color: 'text-yellow-700', bg: 'bg-yellow-100' };
      default:
        return { text: 'Unknown', color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };
  
  const filteredBadges = getFilteredBadges();
  
  if (loading) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm mt-6">
        <div className="animate-pulse">
          <div className="h-8 bg-[#f6ebff] rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="h-40 bg-[#f6ebff] rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm my-6 font-dmsans">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#340062] mb-2 flex items-center">
            <FiAward className="mr-2" /> Hackathon Badges
          </h2>
          <div className="flex items-center">
            <div className="h-2 w-40 bg-gray-200 rounded-full mr-3">
              <div 
                className="h-2 bg-[#340062] rounded-full" 
                style={{ width: `${(getEarnedCount() / getTotalCount() * 100)}%` }}
              ></div>
            </div>
            <p className="text-[#11014c]">
              <span className="font-medium">{getEarnedCount()}</span> of {getTotalCount()} badges
            </p>
          </div>
        </div>
        
        {/* Badges Legend */}
        <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
          {['common', 'uncommon', 'rare', 'epic', 'legendary'].map(rarity => (
            <div key={rarity} className="flex items-center">
              <span 
                className="inline-block w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: getBadgeRarityColor(rarity).border }}
              ></span>
              <span 
                className="text-xs capitalize"
                style={{ color: getBadgeRarityColor(rarity).text }}
              >
                {rarity}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Filter Tabs */}
      <div className="bg-[#f6ebff] bg-opacity-30 rounded-xl p-1 mb-8">
        <div className="flex overflow-x-auto hide-scrollbar">
          {[
            { id: 'all', label: 'All Badges', icon: <FiAward className="mr-2" /> },
            { id: 'earned', label: 'Earned', icon: <FaTrophy className="mr-2" /> },
            { id: 'in-progress', label: 'In Progress', icon: <FiTarget className="mr-2" /> },
            { id: 'achievement', label: 'Achievements', icon: <FiStar className="mr-2" /> },
            { id: 'skill', label: 'Skills', icon: <FiCode className="mr-2" /> },
            { id: 'participation', label: 'Participation', icon: <FiCalendar className="mr-2" /> },
            { id: 'community', label: 'Community', icon: <FiUsers className="mr-2" /> },
            { id: 'special', label: 'Special', icon: <FiGift className="mr-2" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap flex items-center ${
                filterType === tab.id
                  ? "bg-white text-[#340062] shadow-sm"
                  : "text-[#11014c] hover:bg-white hover:bg-opacity-50"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {filteredBadges.length === 0 ? (
        <div className="text-center py-16 bg-[#f6ebff] bg-opacity-20 rounded-xl">
          <FiAward size={64} className="mx-auto mb-4 text-[#b6cbff]" />
          <p className="text-[#11014c] text-lg">No badges match your current filter.</p>
          <button 
            onClick={() => setFilterType('all')}
            className="mt-4 px-4 py-2 bg-[#340062] text-white rounded-lg font-medium"
          >
            Show all badges
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredBadges.map((badge) => (
            <motion.div
              key={badge.id}
              onClick={() => handleBadgeClick(badge)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-xl overflow-hidden cursor-pointer"
              style={{ 
                filter: badge.earned ? 'none' : 'grayscale(0.7)', 
                opacity: badge.earned ? '1' : '0.7',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Badge Background with gradient */}
              <div 
                className="absolute inset-0 z-0"
                style={{ 
                  background: badge.earned 
                    ? `linear-gradient(135deg, ${badge.gradientFrom}, ${badge.gradientTo})` 
                    : '#f5f5f5',
                  opacity: badge.earned ? 0.15 : 1
                }}
              ></div>
              
              <div className="relative z-10 p-5 flex flex-col items-center">
                {/* Badge Icon/Image */}
                {badge.image ? (
                  <div className="w-20 h-20 mb-3">
                    <img 
                      src={badge.image} 
                      alt={badge.name} 
                      className="w-full h-full object-contain"
                      style={{ filter: badge.earned ? 'none' : 'grayscale(1)' }} 
                    />
                  </div>
                ) : (
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
                    style={{ 
                      background: badge.earned 
                        ? `linear-gradient(135deg, ${badge.gradientFrom}, ${badge.gradientTo})` 
                        : '#ffffff',
                      color: badge.earned ? '#ffffff' : badge.color,
                      border: `2px solid ${badge.earned ? 'transparent' : badge.color}`
                    }}
                  >
                    {badge.icon}
                  </div>
                )}
                
                {/* Badge Name */}
                <h3 className="font-bold text-center text-[#340062] mb-1 line-clamp-1">
                  {badge.name}
                </h3>
                
                {/* Rarity Pill */}
                <div 
                  className="text-xs px-2 py-0.5 rounded-full mb-2"
                  style={{ 
                    backgroundColor: getBadgeRarityColor(badge.rarity).bg,
                    color: getBadgeRarityColor(badge.rarity).text
                  }}
                >
                  {badge.rarity}
                </div>
                
                {/* Badge Status */}
                {badge.earned ? (
                  <div className="text-xs text-green-700 font-medium mt-1 flex items-center">
                    <FaCheck className="mr-1" /> Earned
                  </div>
                ) : (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${badge.progress}%`,
                        background: `linear-gradient(to right, ${badge.gradientFrom}, ${badge.gradientTo})`
                      }}
                    ></div>
                  </div>
                )}
                
                {/* Shine effect for earned badges */}
                {badge.earned && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -inset-[10%] bg-white opacity-0 hover:opacity-10 rotate-45 transform-gpu transition-all duration-700 shine-effect"></div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Badge detail modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Badge header with gradient background */}
            <div 
              className="p-8 pb-10 relative"
              style={{ 
                background: selectedBadge.earned 
                  ? `linear-gradient(135deg, ${selectedBadge.gradientFrom}, ${selectedBadge.gradientTo})` 
                  : 'linear-gradient(135deg, #f5f5f5, #e0e0e0)'
              }}
            >
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-all z-20"
              >
                <FiX size={18} />
              </button>
              
              {/* Badge icon with extra large size */}
              <div className="flex justify-center">
                {selectedBadge.image ? (
                  <div className="w-32 h-32 relative">
                    <img 
                      src={selectedBadge.image} 
                      alt={selectedBadge.name} 
                      className="w-full h-full object-contain"
                      style={{ filter: selectedBadge.earned ? 'none' : 'grayscale(1)' }} 
                    />
                    {/* Glow effect for earned badges */}
                    {selectedBadge.earned && (
                      <div className="absolute inset-0 -m-2 rounded-full bg-white opacity-20 blur-xl"></div>
                    )}
                  </div>
                ) : (
                  <div 
                    className="w-32 h-32 rounded-full flex items-center justify-center mb-3 relative"
                    style={{ 
                      background: selectedBadge.earned 
                        ? '#ffffff' 
                        : '#ffffff',
                      color: selectedBadge.color,
                      border: `4px solid ${selectedBadge.earned ? '#ffffff' : selectedBadge.color}`
                    }}
                  >
                    <div className="text-4xl">{selectedBadge.icon}</div>
                    {/* Glow effect for earned badges */}
                    {selectedBadge.earned && (
                      <div className="absolute inset-0 -m-2 rounded-full bg-white opacity-20 blur-md"></div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-full w-[200%] h-[200%] bg-white opacity-10 animate-shine-slow rotate-45 transform-gpu"></div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Badge title and rarity tag */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-xl text-[#340062] mr-2">
                  {selectedBadge.name}
                </h3>
                
                <div 
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: getBadgeRarityColor(selectedBadge.rarity).bg,
                    color: getBadgeRarityColor(selectedBadge.rarity).text
                  }}
                >
                  {selectedBadge.rarity.charAt(0).toUpperCase() + selectedBadge.rarity.slice(1)}
                </div>
              </div>
              
              {/* Badge description */}
              <p className="text-[#11014c] mb-6 text-sm leading-relaxed">
                {selectedBadge.description}
              </p>
              
              {/* Badge status */}
              {selectedBadge.earned ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <FaCheck color="#22c55e" size={18} />
                  </div>
                  <div>
                    <p className="text-green-700 font-medium text-sm">Earned on</p>
                    <p className="text-green-900">{new Date(selectedBadge.earnedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-[#f6ebff] bg-opacity-50 border border-[#e0d1f0] rounded-lg p-4 mb-4">
                  <div className="flex justify-between mb-2 text-sm text-[#11014c]">
                    <span>Progress toward earning this badge:</span>
                    <span className="font-medium">{selectedBadge.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-[#e0d1f0]">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${selectedBadge.progress}%`,
                        background: `linear-gradient(to right, ${selectedBadge.gradientFrom}, ${selectedBadge.gradientTo})`
                      }}
                    ></div>
                  </div>
                  
                  {selectedBadge.progress > 0 && (
                    <p className="mt-2 text-sm text-[#340062] font-medium">
                      {selectedBadge.progress < 30 ? 'Just getting started!' : 
                       selectedBadge.progress < 60 ? 'Making good progress!' : 
                       'Almost there!'}
                    </p>
                  )}
                </div>
              )}
              
              {/* Sharing buttons for earned badges */}
              {selectedBadge.earned && (
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm text-[#11014c] mb-3 flex items-center">
                    <FiShare2 className="mr-2" /> Share this achievement
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#1877F2] text-white text-sm rounded-lg hover:bg-[#166FE5] transition-colors">
                      <FiFacebook /> Facebook
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#1DA1F2] text-white text-sm rounded-lg hover:bg-[#1A91DA] transition-colors">
                      <FiTwitter /> Twitter
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#0077B5] text-white text-sm rounded-lg hover:bg-[#006699] transition-colors">
                      <FiLinkedin /> LinkedIn
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Achievement summary section */}
      <div className="mt-10 p-0">
        <h3 className="text-xl font-bold text-[#340062] mb-6">Your Badge Journey</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Total Badges Earned',
              count: getEarnedCount(),
              icon: <FiAward size={20} />,
              color: '#340062',
              gradientFrom: '#340062',
              gradientTo: '#5C2D91'
            },
            {
              title: 'Achievement Badges',
              count: badges.filter(b => b.category === 'achievement' && b.earned).length,
              icon: <FiTarget size={20} />,
              color: '#673AB7',
              gradientFrom: '#673AB7',
              gradientTo: '#9C27B0'
            },
            {
              title: 'Skill Badges',
              count: badges.filter(b => b.category === 'skill' && b.earned).length,
              icon: <FiCode size={20} />,
              color: '#009688',
              gradientFrom: '#009688',
              gradientTo: '#4CAF50'
            },
            {
              title: 'Rare+ Badges',
              count: badges.filter(b => b.earned && ['rare', 'epic', 'legendary'].includes(b.rarity)).length,
              icon: <FiStar size={20} />,
              color: '#FF9800',
              gradientFrom: '#FF9800',
              gradientTo: '#F44336'
            }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
              className="relative overflow-hidden rounded-xl"
              style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)' }}
            >
              {/* Gradient background */}
              <div 
                className="absolute inset-0 opacity-10" 
                style={{ background: `linear-gradient(135deg, ${stat.gradientFrom}, ${stat.gradientTo})` }}
              ></div>
              
              <div className="relative z-10 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[#11014c] text-sm mb-1">{stat.title}</p>
                    <p className="font-bold text-3xl" style={{ color: stat.color }}>{stat.count}</p>
                  </div>
                  <div 
                    className="p-3 rounded-full" 
                    style={{ background: `linear-gradient(135deg, ${stat.gradientFrom}, ${stat.gradientTo})` }}
                  >
                    <div className="text-white">{stat.icon}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Next Badge to Earn */}
        {badges.some(b => !b.earned && b.progress > 0) && (
          <div className="mt-8">
            <h4 className="font-medium text-[#340062] text-lg mb-4">Next Badge Within Reach:</h4>
            
            {badges
              .filter(b => !b.earned && b.progress > 50)
              .sort((a, b) => b.progress - a.progress)
              .slice(0, 1)
              .map(badge => (
                <motion.div 
                  key={badge.id}
                  whileHover={{ y: -3 }}
                  className="bg-white rounded-xl p-6 shadow-sm overflow-hidden relative"
                  style={{ 
                    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)',
                    borderLeft: `4px solid ${badge.color}` 
                  }}
                >
                  <div className="flex gap-6 items-center">
                    {badge.image ? (
                      <div className="w-16 h-16 flex-shrink-0">
                        <img 
                          src={badge.image} 
                          alt={badge.name} 
                          className="w-full h-full object-contain"
                          style={{ filter: 'grayscale(0.5)' }} 
                        />
                      </div>
                    ) : (
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ 
                          background: '#ffffff',
                          color: badge.color,
                          border: `2px solid ${badge.color}`
                        }}
                      >
                        {badge.icon}
                      </div>
                    )}
                    
                    <div className="flex-grow">
                      <h5 className="font-bold text-[#340062] mb-1">{badge.name}</h5>
                      <p className="text-sm text-[#11014c] mb-3 line-clamp-2">{badge.description}</p>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full" 
                          style={{ 
                            width: `${badge.progress}%`,
                            background: `linear-gradient(to right, ${badge.gradientFrom}, ${badge.gradientTo})`
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-[#11014c]">{badge.progress}% complete</span>
                        <span className="text-xs font-medium" style={{ color: badge.color }}>Keep going!</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Background pattern */}
                  <div 
                    className="absolute right-0 bottom-0 opacity-5 pointer-events-none"
                    style={{ color: badge.color }}
                  >
                    <svg width="120" height="120" viewBox="0 0 80 80" fill="currentColor">
                      <path d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z" />
                    </svg>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </div>
      
      {/* CSS for animations and effects */}
      <style jsx="true">{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .shine-effect {
          transform: translateX(-100%);
        }
        div:hover .shine-effect {
          transform: translateX(100%);
          transition: transform 0.8s;
        }
        @keyframes shine {
          from {
            transform: translateX(-100%) rotate(45deg);
          }
          to {
            transform: translateX(100%) rotate(45deg);
          }
        }
        .animate-shine-slow {
          animation: shine 3s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default BadgesTab;