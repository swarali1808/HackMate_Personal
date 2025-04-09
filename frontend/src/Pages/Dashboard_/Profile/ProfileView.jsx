import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiDownload, FiCalendar, FiExternalLink, FiUser, 
  FiBriefcase, FiAward, FiCheck, FiCode, FiLink, FiGithub, 
  FiLinkedin, FiGlobe, FiTwitter, FiBook
} from 'react-icons/fi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ProfileView = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser] = useState('tanishshah20');
  const [generatingPDF, setGeneratingPDF] = useState(false);
  
  useEffect(() => {
    // Load profile data from localStorage
    try {
      const savedProfileData = localStorage.getItem(`profileData_${currentUser}`);
      const savedResumeData = localStorage.getItem(`resumeData_${currentUser}`);
      
      if (savedProfileData) {
        setProfileData(JSON.parse(savedProfileData));
      }
      
      if (savedResumeData) {
        setResumeData(JSON.parse(savedResumeData));
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      setLoading(false);
    }
  }, [currentUser]);
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  const handleViewResume = () => {
    if (resumeData && resumeData.url) {
      window.open(resumeData.url, '_blank');
    }
  };
  
  const generatePDF = async () => {
    setGeneratingPDF(true);
    
    try {
      const resumeElement = document.getElementById('profile-resume');
      
      if (resumeElement) {
        const canvas = await html2canvas(resumeElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        
        pdf.addImage(
          imgData, 
          'PNG', 
          0, 
          0, 
          imgWidth * ratio, 
          imgHeight * ratio
        );
        
        pdf.save(`${currentUser}_profile_resume.pdf`);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setGeneratingPDF(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6ebff] bg-opacity-30 flex justify-center items-center font-dmsans">
        <div className="bg-white p-8 rounded-lg shadow">
          <p className="text-[#340062]">Loading profile data...</p>
        </div>
      </div>
    );
  }
  
  if (!profileData) {
    return (
      <div className="min-h-screen bg-[#f6ebff] bg-opacity-30 flex justify-center items-center font-dmsans">
        <div className="bg-white p-8 rounded-lg shadow">
          <p className="text-[#340062]">No profile data found. Please create your profile first.</p>
          <button 
            onClick={() => navigate('/dashboard/profile')}
            className="mt-4 px-6 py-2 bg-[#340062] text-white font-medium rounded-md"
          >
            Go to Profile
          </button>
        </div>
      </div>
    );
  }
  
  // Get first letter of username for avatar
  const userInitial = currentUser ? currentUser.charAt(0).toUpperCase() : 'T';
  
  return (
    <div className="min-h-screen bg-[#f6ebff] bg-opacity-30 py-6 px-4 font-dmsans">
      <div className="max-w-7xl mx-auto">
        {/* Top navigation */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={handleBackClick}
            className="text-[#340062] flex items-center hover:underline"
          >
            <FiArrowLeft className="mr-2" /> Back to Profile
          </button>
          
          <div className="flex gap-3">
            {resumeData && (
              <button 
                onClick={handleViewResume}
                className="px-4 py-2 border border-[#340062] text-[#340062] font-medium rounded-md hover:bg-[#f6ebff] transition-colors flex items-center"
              >
                <FiExternalLink className="mr-2" /> View Original Resume
              </button>
            )}
            <button 
              onClick={generatePDF}
              disabled={generatingPDF}
              className="px-6 py-2 bg-[#340062] text-white font-medium rounded-md hover:bg-[#11014c] transition-colors flex items-center"
            >
              <FiDownload className="mr-2" /> 
              {generatingPDF ? 'Generating...' : 'Download as PDF'}
            </button>
          </div>
        </div>
        
        {/* Profile Resume Content */}
        <div id="profile-resume" className="bg-white rounded-lg shadow-sm p-6 md:p-10">
          {/* Header with Name and Contact Info */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10 border-b border-[#f6ebff] pb-6">
            <div className="flex-shrink-0 w-24 h-24 bg-[#340062] rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {userInitial}
            </div>
            
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-[#340062]">Tanish Shah</h1>
              <p className="text-lg text-[#11014c]">@{currentUser}</p>
              
              {profileData.Tagline && (
                <p className="mt-2 text-[#11014c]">{profileData.Tagline}</p>
              )}
              
              {/* Contact Info & Social Links */}
              <div className="mt-4 flex flex-wrap gap-4">
                {profileData['Social Links']?.linkedin && (
                  <a 
                    href={profileData['Social Links'].linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-[#11014c] hover:text-[#340062]"
                  >
                    <FiLinkedin className="mr-1" /> LinkedIn
                  </a>
                )}
                
                {profileData['Social Links']?.github && (
                  <a 
                    href={profileData['Social Links'].github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-[#11014c] hover:text-[#340062]"
                  >
                    <FiGithub className="mr-1" /> GitHub
                  </a>
                )}
                
                {profileData['Social Links']?.portfolio && (
                  <a 
                    href={profileData['Social Links'].portfolio} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-[#11014c] hover:text-[#340062]"
                  >
                    <FiGlobe className="mr-1" /> Portfolio
                  </a>
                )}
                
                {profileData['Social Links']?.twitter && (
                  <a 
                    href={profileData['Social Links'].twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-[#11014c] hover:text-[#340062]"
                  >
                    <FiTwitter className="mr-1" /> Twitter
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skills - Double width */}
            {profileData.Skills && profileData.Skills.length > 0 && (
              <div className="bg-[#f6ebff] bg-opacity-30 p-6 rounded-xl shadow-sm md:col-span-2">
                <h2 className="text-xl font-bold text-[#340062] mb-4 flex items-center">
                  <FiCode className="mr-2" /> Technical Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profileData.Skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-[#f6ebff] text-[#340062] rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Education */}
            {profileData.Education && profileData.Education.length > 0 && (
              <div className="bg-[#f6ebff] bg-opacity-30 p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold text-[#340062] mb-4 flex items-center">
                  <FiBook className="mr-2" /> Education
                </h2>
                <div className="space-y-4">
                  {profileData.Education.map((edu, index) => (
                    <div key={index} className="border-l-3 border-[#340062] pl-4 py-1">
                      <h3 className="font-bold text-[#340062]">
                        {edu.university || edu.school}
                      </h3>
                      <p className="text-[#11014c]">
                        {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                      </p>
                      <div className="text-sm text-[#11014c] opacity-80 flex items-center">
                        <FiCalendar className="mr-1" /> {edu.startYear} - {edu.endYear}
                      </div>
                      {edu.grade && (
                        <div className="text-sm font-medium text-[#340062] mt-1">
                          Grade: {edu.grade}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Work Experience - Double height */}
            {profileData['Work Experience'] && profileData['Work Experience'].length > 0 && (
              <div className="bg-[#f6ebff] bg-opacity-30 p-6 rounded-xl shadow-sm row-span-2">
                <h2 className="text-xl font-bold text-[#340062] mb-4 flex items-center">
                  <FiBriefcase className="mr-2" /> Work Experience
                </h2>
                <div className="space-y-6">
                  {profileData['Work Experience'].map((exp, index) => (
                    <div key={index} className="border-l-3 border-[#340062] pl-4 py-1">
                      <h3 className="font-bold text-[#340062]">
                        {exp.position}
                      </h3>
                      <p className="text-[#11014c] font-medium">
                        {exp.company} • {exp.employmentType}
                      </p>
                      <div className="text-sm text-[#11014c] opacity-80 flex items-center mb-2">
                        <FiCalendar className="mr-1" /> {exp.startDate} - {exp.endDate || 'Present'}
                      </div>
                      {exp.description && (
                        <p className="text-sm text-[#11014c]">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Projects */}
            {profileData.Projects && profileData.Projects.length > 0 && (
              <div className="bg-[#f6ebff] bg-opacity-30 p-6 rounded-xl shadow-sm md:col-span-2">
                <h2 className="text-xl font-bold text-[#340062] mb-4 flex items-center">
                  <FiExternalLink className="mr-2" /> Projects
                </h2>
                <div className="space-y-6">
                  {profileData.Projects.map((project, index) => (
                    <div key={index} className="border-l-3 border-[#340062] pl-4 py-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-[#340062]">
                          {project.title}
                        </h3>
                        {project.url && (
                          <a 
                            href={project.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-[#340062] flex items-center hover:underline"
                          >
                            <FiLink className="mr-1" size={14} />View
                          </a>
                        )}
                      </div>
                      {project.description && (
                        <p className="text-sm text-[#11014c] my-1">{project.description}</p>
                      )}
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.split(',').map((tech, i) => (
                            <span key={i} className="bg-[#f6ebff] px-2 py-0.5 rounded-full text-xs text-[#340062]">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="text-xs text-[#11014c] opacity-80 mt-2 flex items-center">
                        <FiCalendar className="mr-1" /> {project.startDate} {project.endDate ? `- ${project.endDate}` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Achievements */}
            {profileData.Achievements && profileData.Achievements.length > 0 && (
              <div className="bg-[#f6ebff] bg-opacity-30 p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold text-[#340062] mb-4 flex items-center">
                  <FiAward className="mr-2" /> Achievements
                </h2>
                <div className="space-y-4">
                  {profileData.Achievements.map((achievement, index) => (
                    <div key={index} className="border-l-3 border-[#340062] pl-4 py-1">
                      <h3 className="font-bold text-[#340062]">
                        {achievement.title}
                      </h3>
                      <p className="text-[#11014c]">{achievement.issuer}</p>
                      {achievement.description && (
                        <p className="text-sm text-[#11014c] mt-1">{achievement.description}</p>
                      )}
                      <div className="text-xs text-[#11014c] opacity-80 mt-1 flex items-center">
                        <FiCalendar className="mr-1" /> {achievement.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Position of Responsibility */}
            {profileData['Position of Responsibility'] && profileData['Position of Responsibility'].length > 0 && (
              <div className="bg-[#f6ebff] bg-opacity-30 p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold text-[#340062] mb-4 flex items-center">
                  <FiUser className="mr-2" /> Leadership Roles
                </h2>
                <div className="space-y-4">
                  {profileData['Position of Responsibility'].map((position, index) => (
                    <div key={index} className="border-l-3 border-[#340062] pl-4 py-1">
                      <h3 className="font-bold text-[#340062]">
                        {position.title}
                      </h3>
                      <p className="text-[#11014c]">{position.organization}</p>
                      {position.description && (
                        <p className="text-sm text-[#11014c] mt-1">{position.description}</p>
                      )}
                      <div className="text-xs text-[#11014c] opacity-80 mt-1 flex items-center">
                        <FiCalendar className="mr-1" /> {position.startDate} {position.endDate ? `- ${position.endDate}` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Certifications */}
            {profileData.Certifications && profileData.Certifications.length > 0 && (
              <div className="bg-[#f6ebff] bg-opacity-30 p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold text-[#340062] mb-4 flex items-center">
                  <FiCheck className="mr-2" /> Certifications
                </h2>
                <div className="space-y-4">
                  {profileData.Certifications.map((cert, index) => (
                    <div key={index} className="border-l-3 border-[#340062] pl-4 py-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-[#340062]">
                          {cert.title}
                        </h3>
                        {cert.url && (
                          <a 
                            href={cert.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-[#340062] flex items-center hover:underline"
                          >
                            <FiLink className="mr-1" size={14} />View
                          </a>
                        )}
                      </div>
                      <p className="text-[#11014c]">{cert.issuer}</p>
                      {cert.description && (
                        <p className="text-sm text-[#11014c] mt-1">{cert.description}</p>
                      )}
                      {cert.date && (
                        <div className="text-xs text-[#11014c] opacity-80 mt-1 flex items-center">
                          <FiCalendar className="mr-1" /> {cert.date}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Hackathon Preferences - Span 2 columns */}
            {profileData['Hackathon Preferences'] && Object.keys(profileData['Hackathon Preferences']).length > 0 && (
              <div className="bg-[#f6ebff] bg-opacity-30 p-6 rounded-xl shadow-sm md:col-span-2">
                <h2 className="text-xl font-bold text-[#340062] mb-4 flex items-center">
                  <FiCode className="mr-2" /> Hackathon Experience
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Role Preferences */}
                  {profileData['Hackathon Preferences'].rolePreferences && (
                    <div>
                      <h3 className="font-bold text-[#340062] mb-2">Preferred Roles</h3>
                      <div className="space-y-1">
                        {profileData['Hackathon Preferences'].rolePreferences.map((role, idx) => (
                          <div key={idx} className="flex items-center">
                            <span className="text-sm font-medium text-[#340062]">
                              {idx === 0 ? '1st Choice: ' : idx === 1 ? '2nd Choice: ' : '3rd Choice: '}
                            </span>
                            <span className="ml-1 text-sm text-[#11014c]">{role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Domain Interests */}
                  {profileData['Hackathon Preferences'].domainInterests && (
                    <div>
                      <h3 className="font-bold text-[#340062] mb-2">Domain Interests</h3>
                      <div className="flex flex-wrap gap-1">
                        {profileData['Hackathon Preferences'].domainInterests.map((domain, idx) => (
                          <span key={idx} className="bg-[#f6ebff] px-2 py-0.5 rounded-full text-xs text-[#340062]">
                            {domain}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Experience Level */}
                  <div>
                    <h3 className="font-bold text-[#340062] mb-2">Experience</h3>
                    <div className="text-sm text-[#11014c]">
                      <p>Level: {profileData['Hackathon Preferences'].experienceLevel}</p>
                      <p>Participated in: {profileData['Hackathon Preferences'].hackathonsParticipated} hackathons</p>
                    </div>
                  </div>
                  
                  {/* Collaboration Preferences */}
                  <div>
                    <h3 className="font-bold text-[#340062] mb-2">Collaboration</h3>
                    <div className="text-sm text-[#11014c]">
                      <p>Team Size: {profileData['Hackathon Preferences'].teamSize}</p>
                      <p>Work Style: {profileData['Hackathon Preferences'].workStyle}</p>
                      <p>Communication: {profileData['Hackathon Preferences'].communicationPreference}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;