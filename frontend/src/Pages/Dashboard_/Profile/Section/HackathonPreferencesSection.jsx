import React, { useState, useEffect } from "react";
import { FiCode } from "react-icons/fi";
import { fetchData, createData, updateData, deleteData } from "../api";

const HackathonPreferencesSection = ({ editData, isEditing, onSave }) => {
  const [formData, setFormData] = useState({
    experienceLevel: "Beginner",
    hackathonsParticipated: 0,
    teamSize: "3-4",
    communicationPreference: "Discord",
    workStyle: "Collaborative",
    availability: "Weekends & Evenings",
    timezone: "GMT+0530 (India Standard Time)",
    weeklyCommitment: "10-20 hours",
  });
  
  // State for role selection in order of preference
  const [selectedRoles, setSelectedRoles] = useState([]);

  // State for domain interests checkboxes
  const [domainChecks, setDomainChecks] = useState({});
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Set form data when editing or reset when adding new
  useEffect(() => {
    if (isEditing && editData) {
      setFormData(editData);
      
      // Initialize role preferences
      if (editData.rolePreferences && editData.rolePreferences.length > 0) {
        setSelectedRoles(editData.rolePreferences);
      } else {
        setSelectedRoles([]);
      }

      // Initialize domain interests
      const initialDomains = {};
      if (editData.domainInterests && editData.domainInterests.length > 0) {
        editData.domainInterests.forEach((domain) => {
          initialDomains[domain] = true;
        });
      }
      setDomainChecks(initialDomains);
    } else {
      setFormData({
        experienceLevel: "Beginner",
        hackathonsParticipated: 0,
        teamSize: "3-4",
        communicationPreference: "Discord",
        workStyle: "Collaborative",
        availability: "Weekends & Evenings",
        timezone: "GMT+0530 (India Standard Time)",
        weeklyCommitment: "10-20 hours",
      });
      setSelectedRoles([]);
      setDomainChecks({});
    }
    setErrors({});
  }, [editData, isEditing]);

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

  // Handle role selection change
  const handleRoleChange = (role) => {
    if (selectedRoles.includes(role)) {
      // Remove role if already selected
      setSelectedRoles((prev) => prev.filter((r) => r !== role));
    } else {
      // Add role if not at limit (max 3)
      if (selectedRoles.length < 3) {
        setSelectedRoles((prev) => [...prev, role]);
      }
    }
  };

  // Handle domain interest checkbox change
  const handleDomainCheck = (domain) => {
    setDomainChecks((prev) => ({
      ...prev,
      [domain]: !prev[domain],
    }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (selectedRoles.length === 0) {
      newErrors.rolePreferences =
        "Please select at least one role preference";
    }

    const selectedDomains = Object.keys(domainChecks).filter(
      (key) => domainChecks[key]
    );
    if (selectedDomains.length === 0) {
      newErrors.domainInterests =
        "Please select at least one domain interest";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // CRUD Operations
  const saveHackathonPreferences = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Add selected roles and domains to form data
      const dataToSave = {
        ...formData,
        rolePreferences: selectedRoles,
        domainInterests: Object.keys(domainChecks).filter(
          (key) => domainChecks[key]
        ),
      };
      
      let result;
      if (isEditing && editData._id) {
        result = await updateData('hackathon-preferences', editData._id, dataToSave);
      } else {
        result = await createData('hackathon-preferences', dataToSave);
      }
      
      onSave(result);
    } catch (error) {
      console.error('Error saving hackathon preferences data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHackathonPreferences = async () => {
    if (!isEditing || !editData || !editData._id) return;
    
    setIsLoading(true);
    try {
      await deleteData('hackathon-preferences', editData._id);
      onSave(null); // Notify parent that item was deleted
    } catch (error) {
      console.error('Error deleting hackathon preferences data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    saveHackathonPreferences();
  };

  return (
    <>
      <div className="space-y-8">
        {/* Role Preferences */}
        <div>
          <h3 className="font-bold text-[#340062] mb-4">
            Role Preferences <span className="text-red-600">*</span>
          </h3>
          <p className="text-sm text-[#11014c] mb-3">
            Select up to 3 roles in order of your preference. Drag to
            reorder.
          </p>
          <div
            className={`space-y-2 p-4 rounded-lg border ${
              errors.rolePreferences ? "border-red-500" : "border-[#b6cbff]"
            }`}
          >
            <p className="text-sm font-medium text-[#11014c] mb-2">
              Select your preferred roles (1st, 2nd, 3rd choice):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Frontend Developer",
                "Backend Developer",
                "Full Stack Developer",
                "UI/UX Designer",
                "Mobile Developer",
                "DevOps Engineer",
                "Data Scientist",
                "Machine Learning Engineer",
                "Product Manager",
                "QA Engineer",
              ].map((role) => (
                <div
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  className={`px-4 py-3 rounded-lg cursor-pointer flex items-center ${
                    selectedRoles.includes(role)
                      ? "bg-[#340062] text-white"
                      : "bg-[#f6ebff] text-[#11014c] hover:bg-[#e3d1ff]"
                  }`}
                >
                  <div className="mr-3 flex-shrink-0">
                    {selectedRoles.includes(role) && (
                      <div className="w-6 h-6 rounded-full bg-white text-[#340062] flex items-center justify-center font-bold">
                        {selectedRoles.indexOf(role) + 1}
                      </div>
                    )}
                  </div>
                  <span>{role}</span>
                </div>
              ))}
            </div>

            {selectedRoles.length > 0 && (
              <div className="mt-4 p-3 bg-[#f6ebff] rounded-lg">
                <p className="font-medium text-[#340062]">
                  Your preferences:
                </p>
                <ol className="mt-2 pl-5 list-decimal">
                  {selectedRoles.map((role, index) => (
                    <li key={index} className="text-[#11014c]">
                      {role}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {errors.rolePreferences && (
              <p className="text-red-500 text-xs mt-2">
                {errors.rolePreferences}
              </p>
            )}
          </div>
        </div>

        {/* Domain Interests */}
        <div>
          <h3 className="font-bold text-[#340062] mb-4">
            Domain Interests <span className="text-red-600">*</span>
          </h3>
          <p className="text-sm text-[#11014c] mb-3">
            Select all domains you're interested in working on during
            hackathons.
          </p>
          <div
            className={`p-4 rounded-lg border ${
              errors.domainInterests ? "border-red-500" : "border-[#b6cbff]"
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "AI/ML",
                "Web Development",
                "Mobile Apps",
                "Blockchain",
                "AR/VR",
                "IoT",
                "Cybersecurity",
                "FinTech",
                "HealthTech",
                "EdTech",
                "Gaming",
                "Social Impact",
                "Sustainability",
                "DevOps",
                "Cloud Computing",
                "Data Science",
              ].map((domain) => (
                <div key={domain} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`domain-${domain}`}
                    checked={!!domainChecks[domain]}
                    onChange={() => handleDomainCheck(domain)}
                    className="w-4 h-4 text-[#340062] border-[#b6cbff] rounded focus:ring-[#340062]"
                  />
                  <label
                    htmlFor={`domain-${domain}`}
                    className="ml-2 text-[#11014c] cursor-pointer"
                  >
                    {domain}
                  </label>
                </div>
              ))}
            </div>

            {errors.domainInterests && (
              <p className="text-red-500 text-xs mt-2">
                {errors.domainInterests}
              </p>
            )}
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <h3 className="font-bold text-[#340062] mb-4">
            Hackathon Experience
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#11014c] mb-2">
                Experience Level
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel || "Beginner"}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              >
                <option value="Beginner">Beginner (0-1 hackathons)</option>
                <option value="Intermediate">
                  Intermediate (2-5 hackathons)
                </option>
                <option value="Advanced">Advanced (6-10 hackathons)</option>
                <option value="Expert">Expert (10+ hackathons)</option>
              </select>
            </div>

            <div>
              <label className="block text-[#11014c] mb-2">
                Hackathons Participated
              </label>
              <input
                type="number"
                name="hackathonsParticipated"
                value={formData.hackathonsParticipated || 0}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
          </div>
        </div>

        {/* Collaboration Preferences */}
        <div>
          <h3 className="font-bold text-[#340062] mb-4">
            Collaboration Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#11014c] mb-2">
                Preferred Team Size
              </label>
              <select
                name="teamSize"
                value={formData.teamSize || "3-4"}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              >
                <option value="2">2 members</option>
                <option value="3-4">3-4 members</option>
                <option value="5-6">5-6 members</option>
                <option value="Any">Any size</option>
              </select>
            </div>

            <div>
              <label className="block text-[#11014c] mb-2">
                Communication Preference
              </label>
              <select
                name="communicationPreference"
                value={formData.communicationPreference || "Discord"}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              >
                <option value="Discord">Discord</option>
                <option value="Slack">Slack</option>
                <option value="Teams">Microsoft Teams</option>
                <option value="Zoom">Zoom</option>
                <option value="In-person">In-person</option>
                <option value="WhatsApp">WhatsApp</option>
              </select>
            </div>

            <div>
              <label className="block text-[#11014c] mb-2">
                Work Style
              </label>
              <select
                name="workStyle"
                value={formData.workStyle || "Collaborative"}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              >
                <option value="Collaborative">
                  Collaborative (work together)
                </option>
                <option value="Independent">
                  Independent (divide and conquer)
                </option>
                <option value="Flexible">Flexible (mix of both)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div>
          <h3 className="font-bold text-[#340062] mb-4">Availability</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#11014c] mb-2">
                Typical Availability
              </label>
              <select
                name="availability"
                value={formData.availability || "Weekends & Evenings"}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              >
                <option value="Weekends Only">Weekends Only</option>
                <option value="Weekends & Evenings">
                  Weekends & Evenings
                </option>
                <option value="Evenings Only">Evenings Only</option>
                <option value="Flexible">Flexible Schedule</option>
                <option value="Full-time">Full-time Availability</option>
              </select>
            </div>

            <div>
              <label className="block text-[#11014c] mb-2">Time Zone</label>
              <select
                name="timezone"
                value={
                  formData.timezone || "GMT+0530 (India Standard Time)"
                }
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              >
                <option value="GMT+0530 (India Standard Time)">
                  GMT+0530 (India Standard Time)
                </option>
                <option value="GMT+0000 (Greenwich Mean Time)">
                  GMT+0000 (Greenwich Mean Time)
                </option>
                <option value="GMT-0500 (Eastern Standard Time)">
                  GMT-0500 (Eastern Standard Time)
                </option>
                <option value="GMT-0800 (Pacific Standard Time)">
                  GMT-0800 (Pacific Standard Time)
                </option>
                <option value="GMT-0700 (Mountain Standard Time)">
                  GMT-0700 (Mountain Standard Time)
                </option>
                <option value="GMT-0600 (Central Standard Time)">
                  GMT-0600 (Central Standard Time)
                </option>
                <option value="GMT+0100 (Central European Time)">
                  GMT+0100 (Central European Time)
                </option>
                <option value="GMT+0200 (Eastern European Time)">
                  GMT+0200 (Eastern European Time)
                </option>
                <option value="GMT+0300 (Moscow Time)">
                  GMT+0300 (Moscow Time)
                </option>
                <option value="GMT+0800 (China Standard Time)">
                  GMT+0800 (China Standard Time)
                </option>
                <option value="GMT+0900 (Japan Standard Time)">
                  GMT+0900 (Japan Standard Time)
                </option>
                <option value="GMT+1000 (Australian Eastern Standard Time)">
                  GMT+1000 (Australian Eastern Standard Time)
                </option>
                <option value="GMT-0300 (Argentina Standard Time)">
                  GMT-0300 (Argentina Standard Time)
                </option>
                <option value="GMT-0400 (Atlantic Standard Time)">
                  GMT-0400 (Atlantic Standard Time)
                </option>
                <option value="GMT+0200 (South Africa Standard Time)">
                  GMT+0200 (South Africa Standard Time)
                </option>
                <option value="GMT+0330 (Iran Standard Time)">
                  GMT+0330 (Iran Standard Time)
                </option>
                <option value="GMT+0430 (Afghanistan Time)">
                  GMT+0430 (Afghanistan Time)
                </option>
                <option value="GMT+0545 (Nepal Time)">
                  GMT+0545 (Nepal Time)
                </option>
                <option value="GMT+0630 (Myanmar Time)">
                  GMT+0630 (Myanmar Time)
                </option>
                <option value="GMT+0700 (Indochina Time)">
                  GMT+0700 (Indochina Time)
                </option>
                <option value="GMT+1100 (Solomon Islands Time)">
                  GMT+1100 (Solomon Islands Time)
                </option>
                <option value="GMT+1200 (New Zealand Standard Time)">
                  GMT+1200 (New Zealand Standard Time)
                </option>
                <option value="GMT-1000 (Hawaii-Aleutian Standard Time)">
                  GMT-1000 (Hawaii-Aleutian Standard Time)
                </option>
                <option value="GMT-0900 (Alaska Standard Time)">
                  GMT-0900 (Alaska Standard Time)
                </option>
                <option value="GMT-0200 (South Georgia Time)">
                  GMT-0200 (South Georgia Time)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[#11014c] mb-2">
                Weekly Commitment
              </label>
              <select
                name="weeklyCommitment"
                value={formData.weeklyCommitment || "10-20 hours"}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              >
                <option value="<10 hours">Less than 10 hours/week</option>
                <option value="10-20 hours">10-20 hours/week</option>
                <option value="20-30 hours">20-30 hours/week</option>
                <option value="30+ hours">30+ hours/week</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-[#f6ebff] rounded-lg">
          <p className="text-[#340062] font-medium">
            <FiCode className="inline-block mr-2" />
            These preferences help our AI to better match you with team
            members and projects that align with your interests and working
            style.
          </p>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="bg-[#f6ebff] bg-opacity-30 px-6 py-3 flex justify-end gap-3 rounded-b-lg flex-shrink-0 mt-6">
        {isEditing && (
          <button
            onClick={deleteHackathonPreferences}
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
          onClick={handleSubmit}
          className="px-6 py-2 bg-[#340062] text-white font-medium rounded hover:bg-[#11014c] transition-colors"
          type="button"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : isEditing ? "Update Details" : "Save Details"}
        </button>
      </div>
    </>
  );
};

export default HackathonPreferencesSection;