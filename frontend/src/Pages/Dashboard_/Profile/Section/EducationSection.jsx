import React, { useState, useEffect } from "react";
import axios from "axios";

// API base URL from Vite environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Format current date and time in UTC
const formatCurrentDateTime = () => {
  const now = new Date();
  return now.toISOString().replace('T', ' ').substring(0, 19);
};

const EducationSection = ({ editData, isEditing, onSave }) => {
  // State for education form
  const [educationType, setEducationType] = useState("College");
  const [formData, setFormData] = useState({
    university: "",
    school: "",
    fieldOfStudy: "",
    degree: "",
    grade: "",
    startYear: "",
    endYear: "",
    type: "College"
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(formatCurrentDateTime());
  const [currentUser] = useState(localStorage.getItem('username') || 'tanishshah20');

  // Update current date time periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(formatCurrentDateTime());
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(timer);
  }, []);

  // Fetch education data on component mount
  useEffect(() => {
    if (!isEditing) {
      fetchEducationData();
    }
  }, []);

  // Set form data when editing or reset when adding new
  useEffect(() => {
    if (isEditing && editData) {
      setFormData(editData);
      if (editData.type) {
        setEducationType(editData.type);
      }
    } else {
      setFormData({
        university: "",
        school: "",
        fieldOfStudy: "",
        degree: "",
        grade: "",
        startYear: "",
        endYear: "",
        type: "College"
      });
      setEducationType("College");
    }
    setErrors({});
  }, [editData, isEditing]);

  // Authentication helper functions
  const getAccessToken = () => localStorage.getItem("accessToken");
  
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }
      
      const response = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken });
      
      if (response.data && response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        return response.data.accessToken;
      } else {
        throw new Error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      // Handle auth failure - redirect to login
      window.location.href = "/login";
      throw error;
    }
  };
  
  // API request wrapper with token refresh capability
  const apiRequest = async (method, url, data = null) => {
    const makeRequest = async (token) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      
      switch (method.toLowerCase()) {
        case 'get':
          return axios.get(url, config);
        case 'post':
          return axios.post(url, data, config);
        case 'put':
          return axios.put(url, data, config);
        case 'delete':
          return axios.delete(url, config);
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
    };
    
    try {
      // First attempt with current access token
      return await makeRequest(getAccessToken());
    } catch (error) {
      // If 401 Unauthorized, try refreshing token and retry
      if (error.response && error.response.status === 401) {
        const newToken = await refreshAccessToken();
        return makeRequest(newToken);
      }
      throw error;
    }
  };
  
  // Fetch all education entries
  const fetchEducationData = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest('get', `${API_URL}/education`);
      if (response.data && response.data.success) {
        setEducationList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching education data:", error);
      setErrors(prev => ({
        ...prev,
        apiError: "Failed to load education data. Please try again."
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (educationType === "College" && !formData.university) {
      newErrors.university = "University name is required";
    }
    if (educationType === "School" && !formData.school) {
      newErrors.school = "School name is required";
    }
    if (!formData.grade) {
      newErrors.grade = "Grade is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // CRUD Operations
  const saveEducation = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const dataToSave = { ...formData, type: educationType };
      let response;
      
      if (isEditing && editData._id) {
        // Update existing education
        response = await apiRequest('put', `${API_URL}/education/${editData._id}`, dataToSave);
      } else {
        // Create new education
        response = await apiRequest('post', `${API_URL}/education`, dataToSave);
      }
      
      if (response.data && response.data.success) {
        // Refresh the education list if we're in list view
        if (!isEditing) {
          fetchEducationData();
        }
        
        // Return data to parent component
        onSave(response.data.data);
        
        // Reset form if we're not editing
        if (!isEditing) {
          setFormData({
            university: "",
            school: "",
            fieldOfStudy: "",
            degree: "",
            grade: "",
            startYear: "",
            endYear: "",
            type: "College"
          });
          setEducationType("College");
        }
      } else {
        throw new Error(response.data?.error || "Failed to save education data");
      }
    } catch (error) {
      console.error('Error saving education data:', error);
      
      if (error.response?.data?.error) {
        setErrors(prev => ({
          ...prev,
          apiError: error.response.data.error
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          apiError: "Failed to save education data. Please try again later."
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEducation = async () => {
    if (!isEditing || !editData || !editData._id) return;
    
    if (!window.confirm("Are you sure you want to delete this education entry?")) {
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await apiRequest('delete', `${API_URL}/education/${editData._id}`);
      
      // 204 No Content is success for delete
      if (response.status === 204 || (response.data && response.data.success)) {
        // Refresh the education list if we're in list view
        if (!isEditing) {
          fetchEducationData();
        }
        
        // Notify parent component
        onSave(null);
      } else {
        throw new Error("Failed to delete education data");
      }
    } catch (error) {
      console.error('Error deleting education data:', error);
      setErrors(prev => ({
        ...prev,
        apiError: "Failed to delete education data. Please try again later."
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Display API errors if any */}
      {errors.apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
          <span className="block sm:inline">{errors.apiError}</span>
          <span 
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
            onClick={() => setErrors(prev => ({ ...prev, apiError: null }))}
          >
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>
      )}

      {/* Education Toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center bg-[#f6ebff] rounded-full p-1">
          <button
            type="button"
            className={`px-6 py-1 rounded-full ${
              educationType === "College"
                ? "bg-[#340062] text-white"
                : "text-[#11014c]"
            }`}
            onClick={() => {
              setEducationType("College");
              setFormData(prev => ({...prev, type: "College"}));
            }}
          >
            College
          </button>
          <button
            type="button"
            className={`px-6 py-1 rounded-full ${
              educationType === "School"
                ? "bg-[#340062] text-white"
                : "text-[#11014c]"
            }`}
            onClick={() => {
              setEducationType("School");
              setFormData(prev => ({...prev, type: "School"}));
            }}
          >
            School
          </button>
        </div>
      </div>

      {/* Education Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[#11014c] mb-2">
            {educationType === "College"
              ? "University Name"
              : "School Name"}{" "}
            <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name={educationType === "College" ? "university" : "school"}
            value={
              educationType === "College"
                ? formData.university || ""
                : formData.school || ""
            }
            onChange={handleInputChange}
            placeholder={`Type ${educationType} Name`}
            className={`w-full px-3 py-2 border ${
              errors.university || errors.school
                ? "border-red-500 focus:ring-red-500"
                : "border-[#b6cbff] focus:ring-[#340062]"
            } rounded focus:outline-none focus:ring-1`}
          />
          {educationType === "College" && errors.university && (
            <p className="text-red-500 text-xs mt-1">
              {errors.university}
            </p>
          )}
          {educationType === "School" && errors.school && (
            <p className="text-red-500 text-xs mt-1">{errors.school}</p>
          )}
        </div>
        {educationType === "College" && (
          <div>
            <label className="block text-[#11014c] mb-2">
              Field of Study
            </label>
            <input
              type="text"
              name="fieldOfStudy"
              value={formData.fieldOfStudy || ""}
              onChange={handleInputChange}
              placeholder="Type field of study"
              className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
            />
          </div>
        )}
        {educationType === "College" && (
          <div>
            <label className="block text-[#11014c] mb-2">Degree</label>
            <select
              name="degree"
              value={formData.degree || ""}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${
                errors.degree
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#b6cbff] focus:ring-[#340062]"
              } rounded focus:outline-none focus:ring-1`}
            >
              <option value="">Choose your degree</option>
              <option value="B.Tech">B.Tech</option>
              <option value="B.E.">B.E.</option>
              <option value="B.Sc">B.Sc</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MBA">MBA</option>
              <option value="Ph.D">Ph.D</option>
              <option value="Diploma">Diploma</option>
              <option value="High School">High School</option>
            </select>
          </div>
        )}
        <div>
          <label className="block text-[#11014c] mb-2">
            Grade <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="grade"
            value={formData.grade || ""}
            onChange={handleInputChange}
            placeholder="Enter Grade(cgpa)"
            className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
          />
          {errors.grade && (
            <p className="text-red-500 text-xs mt-1">{errors.grade}</p>
          )}
        </div>

        <div>
          <label className="block text-[#11014c] mb-2">Start Year</label>
          <input
            type="number"
            name="startYear"
            value={formData.startYear || ""}
            onChange={handleInputChange}
            placeholder="Choose Starting Year"
            className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
            min="1900"
            max="2100"
          />
        </div>
        <div>
          <label className="block text-[#11014c] mb-2">End Year</label>
          <input
            type="number"
            name="endYear"
            value={formData.endYear || ""}
            onChange={handleInputChange}
            placeholder="Choose Ending Year"
            className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
            min="1900"
            max="2100"
          />
        </div>
      </div>

      {/* Show existing education entries if not in edit mode */}
      {!isEditing && educationList.length > 0 && (
        <div className="mt-8">
          <h3 className="font-bold text-[#340062] mb-4">Your Education</h3>
          <div className="space-y-4">
            {educationList.map((edu) => (
              <div 
                key={edu._id} 
                className="p-4 border border-[#b6cbff] rounded-lg hover:bg-[#f6ebff] transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-[#11014c]">
                      {edu.type === "College" ? edu.university : edu.school}
                    </h4>
                    {edu.type === "College" && (
                      <p className="text-sm text-[#11014c]">
                        {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                      </p>
                    )}
                    <p className="text-sm text-[#11014c]">
                      {edu.startYear} - {edu.endYear || "Present"}
                    </p>
                    <p className="text-sm text-[#11014c] mt-1">
                      Grade: {edu.grade}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setFormData(edu);
                        setEducationType(edu.type);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this education entry?")) {
                          apiRequest('delete', `${API_URL}/education/${edu._id}`)
                            .then(() => fetchEducationData())
                            .catch(error => {
                              console.error("Error deleting:", error);
                              setErrors(prev => ({
                                ...prev,
                                apiError: "Failed to delete education entry."
                              }));
                            });
                        }
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Footer */}
      <div className="bg-[#f6ebff] bg-opacity-30 px-6 py-3 flex justify-end gap-3 rounded-b-lg flex-shrink-0 mt-6">
        {isEditing && (
          <button
            onClick={deleteEducation}
            className="px-4 py-2 text-red-600 hover:bg-red-50 transition-colors rounded"
            type="button"
            disabled={isLoading}
          >
            Delete
          </button>
        )}
        <button
          onClick={onSave && onSave.onClose}
          className="px-4 py-2 text-[#11014c] hover:bg-gray-100 transition-colors rounded"
          type="button"
        >
          Cancel
        </button>
        <button
          onClick={saveEducation}
          className="px-6 py-2 bg-[#340062] text-white font-medium rounded hover:bg-[#11014c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            isEditing ? "Update Details" : "Save Details"
          )}
        </button>
      </div>
    </>
  );
};

export default EducationSection;