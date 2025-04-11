import React, { useState, useEffect, useCallback } from 'react';
import ProfileSection from './ProfileSection';
import FormModal from './FormModal';
import SkillsTab from './TabComponents/SkillsTab';
import SocialLinksTab from './TabComponents/SocialLinksTab';
import TaglineTab from './TabComponents/TagLineTab';
import BadgesTab from './TabComponents/BadgesTab';
import { useParams } from 'react-router-dom';
import { useAuth } from "../../../Context/AuthContext";

const Profile = () => {
  const { userId } = useParams()
  const { currentUser } = useAuth()
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Education');
  const [editIndex, setEditIndex] = useState(-1); // -1 means adding new, >= 0 means editing
  const [editData, setEditData] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({ type: '', index: -1 });
  // const [currentUser] = useState('tanish-shah');
  const [currentDate] = useState('2025-04-05');
  
  // State to store data for each tab
  const [profileData, setProfileData] = useState({
    Education: [],
    Projects: [],
    'Position of Responsibility': [],
    'Work Experience': [],
    Achievements: [],
    Certifications: [],
    Skills: [], 
    'Social Links': {},
    'Hackathon Preferences': {},
    Tagline: ''
  });
  
  // Predefined list of common skills 
  const predefinedSkills = [
    'JavaScript', 'React', 'Node.js', 'CSS', 'HTML', 'Python', 'Java', 'C++', 
    'TypeScript', 'Angular', 'Vue.js', 'Redux', 'Express', 'MongoDB', 'SQL', 
    'PostgreSQL', 'Firebase', 'AWS', 'Docker', 'Kubernetes', 'Git', 'REST API',
    'GraphQL', 'Agile', 'Scrum', 'TDD', 'CI/CD', 'DevOps', 'Machine Learning',
    'Data Science', 'Blockchain', 'UI/UX Design', 'Figma', 'Adobe XD', 
    'Responsive Design', 'Mobile Development', 'React Native', 'Flutter',
    'Swift', 'Kotlin', 'SEO', 'Data Analysis', 'Testing', 'Jest', 'Mocha',
    'TensorFlow', 'PyTorch', 'Natural Language Processing', 'Computer Vision',
    'Reinforcement Learning', 'Data Visualization', 'D3.js', 'Tableau',
    'AR/VR', 'Unity', 'Three.js', 'WebGL', 'Embedded Systems', 'IoT',
    'Cybersecurity', 'Ethical Hacking', 'Cryptography'
  ];
  
  // Function to load saved data from local storage
  useEffect(() => {
    try {
      // Don't reassign userId - use it directly or use a derived value
      const userToLoad = currentUser;
      const savedData = localStorage.getItem(`profileData_${userToLoad}`);
      if (savedData) {
        setProfileData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, [currentUser]); // Only run once on component mount
  
  // Function to save data to local storage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(`profileData_${currentUser}`, JSON.stringify(profileData));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [profileData, currentUser]); // Only run when profileData changes
  
  // Function to open modal with specific type for adding new entry
  const openModalWithType = useCallback((type) => {
    setModalType(type);
    setEditIndex(-1);
    setEditData(null);
    setModalOpen(true);
  }, []);
  
  // Function to open modal for editing an existing entry
  const openEditModal = useCallback((type, index, data) => {
    setModalType(type);
    setEditIndex(index);
    setEditData(data);
    setModalOpen(true);
  }, []);
  
  // Function to open delete confirmation modal
  const openDeleteConfirm = useCallback((type, index) => {
    setDeleteInfo({ type, index });
    setConfirmDeleteOpen(true);
  }, []);
  
  // Function to handle deletion of an entry
  const handleDeleteEntry = useCallback(() => {
    const { type, index } = deleteInfo;
    
    setProfileData(prevData => {
      const updatedData = [...prevData[type]];
      updatedData.splice(index, 1);
      return {
        ...prevData,
        [type]: updatedData
      };
    });
    
    setConfirmDeleteOpen(false);
  }, [deleteInfo]);
  
  // Function to handle saving form data
  const handleSaveData = useCallback((type, newData) => {
    if (type === 'Social Links' || type === 'Hackathon Preferences') {
      // For social links and hackathon preferences, replace the entire object
      setProfileData(prevData => ({
        ...prevData,
        [type]: newData
      }));
    } else if (type === 'Tagline') {
      // For tagline, just update the string
      setProfileData(prevData => ({
        ...prevData,
        Tagline: newData
      }));
    } else if (editIndex >= 0) {
      // Editing existing entry
      setProfileData(prevData => {
        const updatedData = [...prevData[type]];
        updatedData[editIndex] = newData;
        return {
          ...prevData,
          [type]: updatedData
        };
      });
    } else {
      // Adding new entry
      setProfileData(prevData => ({
        ...prevData,
        [type]: [...prevData[type], newData]
      }));
    }
    setModalOpen(false);
    setEditIndex(-1);
    setEditData(null);
  }, [editIndex]);
  
  // Function to edit tagline
  const handleEditTagline = useCallback(() => {
    setModalType('Tagline');
    setEditData(profileData.Tagline);
    setModalOpen(true);
  }, [profileData.Tagline]);
  
  // Function to add a skill
  const addSkill = useCallback((skill) => {
    if (!profileData.Skills.includes(skill) && skill.trim() !== '') {
      setProfileData(prevData => ({
        ...prevData,
        Skills: [...prevData.Skills, skill]
      }));
    }
  }, [profileData.Skills]);
  
  // Function to delete a skill
  const deleteSkill = useCallback((skillIndex) => {
    setProfileData(prevData => {
      const updatedSkills = [...prevData.Skills];
      updatedSkills.splice(skillIndex, 1);
      return {
        ...prevData,
        Skills: updatedSkills
      };
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Main Profile Section */}
      <ProfileSection 
        onOpenModal={openModalWithType} 
        onEditItem={openEditModal}
        onDeleteItem={openDeleteConfirm}
        profileData={profileData}
        username={currentUser.name}
        slug={currentUser.slug}
        predefinedSkills={predefinedSkills}
      />
      
      {/* Reorganized Content Area - TagLine, Skills, and Social Links */}
      <div className="mt-6">
        <BadgesTab />
        
        <TaglineTab 
          tagline={profileData.Tagline}
          onEditTagline={handleEditTagline}
        />
        
        <SkillsTab 
          skills={profileData.Skills}
          addSkill={addSkill}
          deleteSkill={deleteSkill}
          predefinedSkills={predefinedSkills}
        />
        
        <SocialLinksTab 
          socialLinks={profileData['Social Links']}
          onOpenModal={openModalWithType}
        />
      </div>
      
      {/* Reusable Modal */}
      <FormModal 
        isOpen={modalOpen} 
        onClose={() => {
          setModalOpen(false);
          setEditIndex(-1);
          setEditData(null);
        }} 
        modalType={modalType}
        editData={editData}
        isEditing={modalType === 'Tagline' ? Boolean(editData) : editIndex >= 0}
        onSave={(data) => handleSaveData(modalType, data)}
        currentDate={currentDate}
      />
      
      {/* Delete Confirmation Modal */}
      {confirmDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-[#340062] mb-4">Confirm Deletion</h3>
            <p className="text-[#11014c] mb-6">
              Are you sure you want to delete this {deleteInfo.type} entry? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setConfirmDeleteOpen(false)} 
                className="px-4 py-2 border border-[#b6cbff] text-[#11014c] rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteEntry}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;