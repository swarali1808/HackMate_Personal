import React, { useState, useEffect, useRef } from 'react';
import { FiUpload, FiDownload, FiEye, FiCheckCircle, FiXCircle, FiPaperclip, FiAlertCircle, FiFileText } from 'react-icons/fi';

const ResumeUpload = ({ currentUser }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    // Load resume data from localStorage on component mount
    try {
      const savedResumeData = localStorage.getItem(`resumeData_${currentUser}`);
      if (savedResumeData) {
        const { url, name } = JSON.parse(savedResumeData);
        if (url) {
          setResumePreview(url);
          setResumeUploaded(true);
          setResumeFile({ name });
        }
      }
    } catch (error) {
      console.error("Error loading resume data from localStorage:", error);
    }
  }, [currentUser]);
  
  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    setUploadError(null);
    
    if (!file) return;
    
    // Validate file type (PDF, DOCX)
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload a PDF or DOCX file');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size should be less than 5MB');
      return;
    }
    
    setResumeFile(file);
    
    // Create a URL for preview
    const fileURL = URL.createObjectURL(file);
    setResumePreview(fileURL);
    setResumeUploaded(true);
    
    // Save to localStorage (just the reference, not the actual file)
    try {
      localStorage.setItem(`resumeData_${currentUser}`, JSON.stringify({
        url: fileURL,
        name: file.name,
        lastUpdated: new Date().toISOString()
      }));
    } catch (error) {
      console.error("Error saving resume data to localStorage:", error);
    }
  };
  
  const handleRemoveResume = () => {
    setResumeFile(null);
    setResumePreview(null);
    setResumeUploaded(false);
    
    // Remove from localStorage
    localStorage.removeItem(`resumeData_${currentUser}`);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const openResumePreview = () => {
    if (resumePreview) {
      window.open(resumePreview, '_blank');
    }
  };
  
  return (
    <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-[#340062] mb-4 flex items-center">
        <FiFileText className="mr-2" /> Resume
      </h2>
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left side - Upload Area */}
        <div className="w-full border-2 border-dashed border-[#b6cbff] rounded-lg p-8 flex flex-col items-center justify-center">
          {!resumeUploaded ? (
            <>
              <div className="bg-[#f6ebff] p-4 rounded-full mb-4">
                <FiUpload size={32} color="#340062" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#340062]">Upload Your Resume</h3>
              <p className="text-center text-[#11014c] opacity-70 mb-4">
                Upload your resume in PDF or DOCX format (max 5MB)
              </p>
              <input
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleResumeUpload}
                className="hidden"
                ref={fileInputRef}
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer px-6 py-2 bg-[#340062] text-white font-medium rounded-md hover:bg-[#11014c] transition-colors flex items-center"
              >
                <FiPaperclip className="mr-2" /> Choose File
              </label>
              {uploadError && (
                <div className="mt-4 text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" /> {uploadError}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="bg-[#f6ebff] p-4 rounded-full mb-4">
                <FiCheckCircle size={32} color="#340062" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#340062]">Resume Uploaded</h3>
              <p className="text-center text-[#11014c] mb-2 flex items-center justify-center">
                <FiPaperclip className="mr-1" /> {resumeFile?.name}
              </p>
              <p className="text-xs text-[#11014c] opacity-70 mb-4">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={openResumePreview}
                  className="px-4 py-2 bg-[#f6ebff] border border-[#340062] text-[#340062] font-medium rounded-md hover:bg-[#ebd9ff] transition-colors flex items-center"
                >
                  <FiEye className="mr-2" /> Preview
                </button>
                <button
                  onClick={handleRemoveResume}
                  className="px-4 py-2 border border-red-500 text-red-500 font-medium rounded-md hover:bg-red-50 transition-colors flex items-center"
                >
                  <FiXCircle className="mr-2" /> Remove
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;