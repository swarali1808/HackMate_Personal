import React, { useState, useEffect, useRef } from "react";
import { FiCalendar, FiX, FiLink, FiCode } from "react-icons/fi";

const FormModal = ({
  isOpen,
  onClose,
  modalType,
  editData,
  isEditing,
  onSave,
  currentDate,
}) => {
  // Ref for modal content
  const modalRef = useRef(null);
  const technologyOptions = [
    "JavaScript",
    "TypeScript",
    "React",
    "Angular",
    "Vue",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Python",
    "Django",
    "Flask",
    "Java",
    "Spring",
    "PHP",
    "Laravel",
    "C#",
    ".NET",
    "Ruby",
    "Ruby on Rails",
    "GraphQL",
    "REST API",
    "AWS",
    "Docker",
    "Kubernetes",
    "Redis",
    "Firebase",
    "Go",
    "Swift",
  ];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const dropdownRef = useRef(null);

  const handleCheckboxChange = (tech) => {
    if (selectedTechnologies.includes(tech)) {
      setSelectedTechnologies(
        selectedTechnologies.filter((item) => item !== tech)
      );
    } else {
      setSelectedTechnologies([...selectedTechnologies, tech]);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      technologies: selectedTechnologies.join(", "),
    });
  }, [selectedTechnologies]);

  // Initialize selectedTechnologies from formData if it exists
  useEffect(() => {
    if (formData.technologies) {
      setSelectedTechnologies(
        formData.technologies.split(", ").filter(Boolean)
      );
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper functions defined early to prevent reference errors
  // Get current year from date
  const getCurrentYear = () => {
    if (!currentDate) return new Date().getFullYear().toString();
    return currentDate.split("-")[0];
  };

  // URL validation helper
  const isValidUrl = (url) => {
    if (!url) return true; // Empty is valid for optional fields

    // Add protocol if missing
    let testUrl = url;
    if (!url.match(/^https?:\/\//)) {
      testUrl = "https://" + url;
    }

    try {
      new URL(testUrl);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Get initial form data based on modal type
  const getInitialFormData = (type) => {
    const currentYear = getCurrentYear();

    switch (type) {
      case "Education":
        return {
          university: "",
          school: "",
          fieldOfStudy: "",
          degree: "",
          grade: "",
          startYear: "",
          endYear: "",
        };
      case "Projects":
        return {
          title: "",
          description: "",
          selectedTechnologies: [],
          repourl: "",
          deployurl: "",
          startDate: "",
          endDate: "",
        };
      case "Work Experience":
        return {
          company: "",
          position: "",
          employmentType: "Full-time",
          description: "",
          startDate: "",
          endDate: "",
        };
      case "Position of Responsibility":
        return {
          title: "",
          organization: "",
          description: "",
          startDate: "",
          endDate: "",
        };
      case "Achievements":
        return {
          title: "",
          issuer: "",
          description: "",
          date: "",
        };
      case "Certifications":
        return {
          title: "",
          issuer: "",
          description: "",
          date: "",
          url: "",
        };
      case "Social Links":
        return {
          linkedin: "",
          portfolio: "",
          twitter: "",
          devfolio: "",
          unstop: "",
          github: "",
        };
      case "Hackathon Preferences":
        return {
          rolePreferences: [],
          domainInterests: [],
          experienceLevel: "Beginner",
          hackathonsParticipated: 0,
          teamSize: "3-4",
          communicationPreference: "Discord",
          workStyle: "Collaborative",
          availability: "Weekends & Evenings",
          timezone: "GMT+0530 (India Standard Time)",
          weeklyCommitment: "10-20 hours",
        };
      case "Tagline":
        return editData || "";
      default:
        return {};
    }
  };

  // State for education form
  const [educationType, setEducationType] = useState("College");

  // State for form data
  const [formData, setFormData] = useState(() => getInitialFormData(modalType));

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State for role selection in order of preference
  const [selectedRoles, setSelectedRoles] = useState([]);

  // State for domain interests checkboxes
  const [domainChecks, setDomainChecks] = useState({});

  // Set form data when editing or reset when adding new
  useEffect(() => {
    if (isEditing && editData) {
      setFormData(editData);
      if (modalType === "Education" && editData.type) {
        setEducationType(editData.type);
      }

      // Handle special state for Hackathon Preferences
      if (modalType === "Hackathon Preferences") {
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
      }
    } else {
      setFormData(getInitialFormData(modalType));
      if (modalType === "Education") {
        setEducationType("College");
      }

      // Reset Hackathon Preferences state
      if (modalType === "Hackathon Preferences") {
        setSelectedRoles([]);
        setDomainChecks({});
      }
    }

    // Reset errors when modal type changes
    setErrors({});
  }, [modalType, editData, isEditing]);

  // Adjust modal position if it goes out of viewport
  useEffect(() => {
    if (isOpen && modalRef.current) {
      setTimeout(() => {
        const modalElement = modalRef.current;
        if (!modalElement) return;

        const rect = modalElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // If modal is taller than viewport, make it scrollable
        if (rect.height > windowHeight - 40) {
          modalElement.style.maxHeight = `${windowHeight - 40}px`;
          modalElement.style.overflowY = "auto";
        } else {
          modalElement.style.maxHeight = "";
          modalElement.style.overflowY = "";
        }
      }, 100);
    }
  }, [isOpen, modalType]);

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

    // Common validations based on modal type
    switch (modalType) {
      case "Education":
        if (educationType === "College" && !formData.university) {
          newErrors.university = "University name is required";
        }
        if (educationType === "School" && !formData.school) {
          newErrors.school = "School name is required";
        }
        if (!formData.grade) {
          newErrors.grade = "Grade is required";
        }
        break;

      case "Projects":
        if (!formData.title) {
          newErrors.title = "Project title is required";
        }
        if (!formData.description) {
          newErrors.description = "Project description is required";
        }
        break;

      case "Work Experience":
        if (!formData.company) {
          newErrors.company = "Company name is required";
        }
        if (!formData.position) {
          newErrors.position = "Position is required";
        }
        break;

      case "Position of Responsibility":
        if (!formData.title) {
          newErrors.title = "Title is required";
        }
        if (!formData.organization) {
          newErrors.organization = "Organization name is required";
        }
        break;

      case "Achievements":
      case "Certifications":
        if (!formData.title) {
          newErrors.title = "Title is required";
        }
        if (!formData.issuer) {
          newErrors.issuer = "Issuer name is required";
        }
        if (formData.url && !isValidUrl(formData.url)) {
          newErrors.url = "Please enter a valid URL";
        }
        break;

      case "Social Links":
        if (!formData.linkedin) {
          newErrors.linkedin = "LinkedIn URL is required";
        } else if (!isValidUrl(formData.linkedin)) {
          newErrors.linkedin = "Please enter a valid URL";
        }

        // Validate optional URLs
        ["portfolio", "twitter", "devfolio", "unstop", "github"].forEach(
          (field) => {
            if (formData[field] && !isValidUrl(formData[field])) {
              newErrors[field] = "Please enter a valid URL";
            }
          }
        );
        break;

      case "Hackathon Preferences":
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
        break;

      case "Tagline":
        return (
          <div>
            <label className="block text-[#11014c] mb-2">
              Your Professional Tagline
            </label>
            <textarea
              value={formData || ""}
              onChange={(e) => setFormData(e.target.value)}
              placeholder="E.g., 'Passionate Frontend Developer crafting seamless user experiences' or 'Data Scientist solving problems with ML'"
              rows="3"
              className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
            />
            <p className="text-sm text-[#11014c] mt-2">
              A brief statement that summarizes your professional identity,
              expertise, or career focus. It's like a headline on your
              professional profile.
            </p>
          </div>
        );

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate form data
    if (!validateForm()) {
      return;
    }

    // Prepare form data for saving
    let dataToSave = { ...formData };

    if (modalType === "Education") {
      dataToSave = { ...dataToSave, type: educationType };
    } 
    
    else if (modalType === "Hackathon Preferences") {
      // Add selected roles and domains to form data
      dataToSave = {
        ...dataToSave,
        rolePreferences: selectedRoles,
        domainInterests: Object.keys(domainChecks).filter(
          (key) => domainChecks[key]
        ),
      };
    }

    // Save the form data
    onSave(dataToSave);

    // Reset form
    setFormData(getInitialFormData(modalType));
    setErrors({});

    // Reset special state
    if (modalType === "Hackathon Preferences") {
      setSelectedRoles([]);
      setDomainChecks({});
    }
  };

  // Render different forms based on modalType
  const renderFormContent = () => {
    switch (modalType) {
      case "Education":
        return (
          <>
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
                  onClick={() => setEducationType("College")}
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
                  onClick={() => setEducationType("School")}
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
          </>
        );

      case "Projects":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">
                Project Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleInputChange}
                placeholder="Enter project title"
                className={`w-full px-3 py-2 border ${
                  errors.title
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#b6cbff] focus:ring-[#340062]"
                } rounded focus:outline-none focus:ring-1`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">
                Project Description <span className="text-red-600">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                placeholder="Describe your project"
                rows="4"
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-[#11014c] mb-2">
                Technologies Used
              </label>
              <div className="relative" ref={dropdownRef}>
                <div
                  className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062] cursor-pointer flex justify-between items-center"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="flex flex-wrap gap-1">
                    {selectedTechnologies.length > 0 ? (
                      selectedTechnologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-[#eef2ff] text-[#11014c] text-sm px-2 py-0.5 rounded-md"
                        >
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">
                        e.g., React, Node.js, MongoDB
                      </span>
                    )}
                  </div>
                  <div className="ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline
                        points={
                          isDropdownOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"
                        }
                      ></polyline>
                    </svg>
                  </div>
                </div>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-[#b6cbff] rounded shadow-lg max-h-60 overflow-y-auto">
                    <div className="p-2">
                      {technologyOptions.map((tech, index) => (
                        <div key={index} className="flex items-center py-1">
                          <input
                            type="checkbox"
                            id={`tech-${index}`}
                            checked={selectedTechnologies.includes(tech)}
                            onChange={() => handleCheckboxChange(tech)}
                            className="mr-2 h-4 w-4 text-[#340062] focus:ring-[#340062] border-[#b6cbff] rounded"
                          />
                          <label
                            htmlFor={`tech-${index}`}
                            className="text-[#11014c] cursor-pointer"
                          >
                            {tech}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[#11014c] mb-2">
                Repository URL
              </label>
              <input
                type="text"
                name="repourl"
                value={formData.repourl || ""}
                onChange={handleInputChange}
                placeholder="https://..."
                className={`w-full px-3 py-2 border ${
                  errors.repourl
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#b6cbff] focus:ring-[#340062]"
                } rounded focus:outline-none focus:ring-1`}
              />
            </div>

            <div>
              <label className="block text-[#11014c] mb-2">
                Deployment URL
              </label>
              <input
                type="text"
                name="deployurl"
                value={formData.deployurl || ""}
                onChange={handleInputChange}
                placeholder="https://..."
                className={`w-full px-3 py-2 border ${
                  errors.deployurl
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#b6cbff] focus:ring-[#340062]"
                } rounded focus:outline-none focus:ring-1`}
              />
            </div>

            <div>
              <label className="block text-[#11014c] mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>

            <div>
              <label className="block text-[#11014c] mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
          </div>
        );

      case "Work Experience":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">
                Company Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company || ""}
                onChange={handleInputChange}
                placeholder="Enter company name"
                className={`w-full px-3 py-2 border ${
                  errors.company
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#b6cbff] focus:ring-[#340062]"
                } rounded focus:outline-none focus:ring-1`}
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">{errors.company}</p>
              )}
            </div>

            <div>
              <label className="block text-[#11014c] mb-2">
                Position <span className="text-red-600">*</span>
              </label>
              <select
                name="position"
                value={formData.position || ""}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  errors.position
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#b6cbff] focus:ring-[#340062]"
                } rounded focus:outline-none focus:ring-1`}
              >
                <option value="" disabled>
                  Select a position
                </option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">
                  Full Stack Developer
                </option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="QA Engineer">QA Engineer</option>
                <option value="Machine Learning Engineer">
                  Machine Learning Engineer
                </option>
                <option value="Mobile Developer">Mobile Developer</option>
              </select>
              {errors.position && (
                <p className="text-red-500 text-xs mt-1">{errors.position}</p>
              )}
            </div>

            <div>
              <label className="block text-[#11014c] mb-2">
                Employment Type
              </label>
              <select
                name="employmentType"
                value={formData.employmentType || "Full-time"}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-[#11014c] mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>

            <div>
              <label className="block text-[#11014c] mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                placeholder="Describe your responsibilities"
                rows="4"
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
          </div>
        );

      case "Position of Responsibility":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">
                Title/Position <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleInputChange}
                placeholder="Enter position title"
                className={`w-full px-3 py-2 border ${
                  errors.title
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#b6cbff] focus:ring-[#340062]"
                } rounded focus:outline-none focus:ring-1`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">
                Organization <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization || ""}
                onChange={handleInputChange}
                placeholder="Organization name"
                className={`w-full px-3 py-2 border ${
                  errors.organization
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#b6cbff] focus:ring-[#340062]"
                } rounded focus:outline-none focus:ring-1`}
              />
              {errors.organization && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.organization}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[#11014c] mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>

            <div>
              <label className="block text-[#11014c] mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                placeholder="Describe your responsibilities"
                rows="4"
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
          </div>
        );

      case "Achievements":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">
                Achievement Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleInputChange}
                placeholder="Enter achievement title"
                className={`w-full px-3 py-2 border ${
                  errors.title
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#b6cbff] focus:ring-[#340062]"
                } rounded focus:outline-none focus:ring-1`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">
                Issuing Organization <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="issuer"
                value={formData.issuer || ""}
                onChange={handleInputChange}
                placeholder="Who awarded this achievement?"
                className={`w-full px-3 py-2 border ${
                  errors.issuer
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#b6cbff] focus:ring-[#340062]"
                } rounded focus:outline-none focus:ring-1`}
              />
              {errors.issuer && (
                <p className="text-red-500 text-xs mt-1">{errors.issuer}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                placeholder="Describe your achievement"
                rows="4"
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
          </div>
        );

      case "Certifications":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">
                Certification Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleInputChange}
                placeholder="Enter certification name"
                className={`w-full px-3 py-2 border ${
                  errors.title
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#b6cbff] focus:ring-[#340062]"
                } rounded focus:outline-none focus:ring-1`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">
                Issuing Organization <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="issuer"
                value={formData.issuer || ""}
                onChange={handleInputChange}
                placeholder="e.g., Coursera, Udemy, etc."
                className={`w-full px-3 py-2 border ${
                  errors.issuer
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#b6cbff] focus:ring-[#340062]"
                } rounded focus:outline-none focus:ring-1`}
              />
              {errors.issuer && (
                <p className="text-red-500 text-xs mt-1">{errors.issuer}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">
                Credential URL
              </label>
              <input
                type="text"
                name="url"
                value={formData.url || ""}
                onChange={handleInputChange}
                placeholder="https://..."
                className={`w-full px-3 py-2 border ${
                  errors.url
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#b6cbff] focus:ring-[#340062]"
                } rounded focus:outline-none focus:ring-1`}
              />
              {errors.url && (
                <p className="text-red-500 text-xs mt-1">{errors.url}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#11014c] mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                placeholder="Describe what you learned"
                rows="4"
                className="w-full px-3 py-2 border border-[#b6cbff] rounded focus:outline-none focus:ring-1 focus:ring-[#340062]"
              />
            </div>
          </div>
        );

      case "Social Links":
        return (
          <div className="grid grid-cols-1 gap-6">
            {/* LinkedIn - Required */}
            <div>
              <label className="block text-[#11014c] mb-2">
                LinkedIn URL <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                  alt="LinkedIn"
                  className="w-6 h-6 mr-2"
                />
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin || ""}
                  onChange={handleInputChange}
                  placeholder="www.linkedin.com/in/username"
                  className={`w-full px-3 py-2 border ${
                    errors.linkedin
                      ? "border-red-500 focus:ring-red-500"
                      : "border-[#b6cbff] focus:ring-[#340062]"
                  } rounded focus:outline-none focus:ring-1`}
                />
              </div>
              {errors.linkedin && (
                <p className="text-red-500 text-xs mt-1">{errors.linkedin}</p>
              )}
            </div>

            {/* GitHub */}
            <div>
              <label className="block text-[#11014c] mb-2">GitHub URL</label>
              <div className="flex items-center">
                <img
                  src="https://github.githubassets.com/favicon.ico"
                  alt="GitHub"
                  className="w-6 h-6 mr-2"
                />
                <input
                  type="text"
                  name="github"
                  value={formData.github || ""}
                  onChange={handleInputChange}
                  placeholder="github.com/username"
                  className={`w-full px-3 py-2 border ${
                    errors.github
                      ? "border-red-500 focus:ring-red-500"
                      : "border-[#b6cbff] focus:ring-[#340062]"
                  } rounded focus:outline-none focus:ring-1`}
                />
              </div>
              {errors.github && (
                <p className="text-red-500 text-xs mt-1">{errors.github}</p>
              )}
            </div>

            {/* Portfolio */}
            <div>
              <label className="block text-[#11014c] mb-2">
                Portfolio Website URL
              </label>
              <div className="flex items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1454/1454827.png"
                  alt="Portfolio"
                  className="w-6 h-6 mr-2"
                />
                <input
                  type="text"
                  name="portfolio"
                  value={formData.portfolio || ""}
                  onChange={handleInputChange}
                  placeholder="your-portfolio-site.com"
                  className={`w-full px-3 py-2 border ${
                    errors.portfolio
                      ? "border-red-500 focus:ring-red-500"
                      : "border-[#b6cbff] focus:ring-[#340062]"
                  } rounded focus:outline-none focus:ring-1`}
                />
              </div>
              {errors.portfolio && (
                <p className="text-red-500 text-xs mt-1">{errors.portfolio}</p>
              )}
            </div>

            {/* Twitter */}
            <div>
              <label className="block text-[#11014c] mb-2">Twitter URL</label>
              <div className="flex items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                  alt="Twitter"
                  className="w-6 h-6 mr-2"
                />
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter || ""}
                  onChange={handleInputChange}
                  placeholder="twitter.com/username"
                  className={`w-full px-3 py-2 border ${
                    errors.twitter
                      ? "border-red-500 focus:ring-red-500"
                      : "border-[#b6cbff] focus:ring-[#340062]"
                  } rounded focus:outline-none focus:ring-1`}
                />
              </div>
              {errors.twitter && (
                <p className="text-red-500 text-xs mt-1">{errors.twitter}</p>
              )}
            </div>

            {/* Devfolio */}
            <div>
              <label className="block text-[#11014c] mb-2">Devfolio URL</label>
              <div className="flex items-center">
                <img
                  src="https://devfolio.co/favicon.png"
                  alt="Devfolio"
                  className="w-6 h-6 mr-2"
                />
                <input
                  type="text"
                  name="devfolio"
                  value={formData.devfolio || ""}
                  onChange={handleInputChange}
                  placeholder="devfolio.co/@username"
                  className={`w-full px-3 py-2 border ${
                    errors.devfolio
                      ? "border-red-500 focus:ring-red-500"
                      : "border-[#b6cbff] focus:ring-[#340062]"
                  } rounded focus:outline-none focus:ring-1`}
                />
              </div>
              {errors.devfolio && (
                <p className="text-red-500 text-xs mt-1">{errors.devfolio}</p>
              )}
            </div>

            {/* Unstop */}
            <div>
              <label className="block text-[#11014c] mb-2">Unstop URL</label>
              <div className="flex items-center">
                <img
                  src="https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/branding/unstop-icon.svg"
                  alt="Unstop"
                  className="w-6 h-6 mr-2"
                />
                <input
                  type="text"
                  name="unstop"
                  value={formData.unstop || ""}
                  onChange={handleInputChange}
                  placeholder="unstop.com/u/username"
                  className={`w-full px-3 py-2 border ${
                    errors.unstop
                      ? "border-red-500 focus:ring-red-500"
                      : "border-[#b6cbff] focus:ring-[#340062]"
                  } rounded focus:outline-none focus:ring-1`}
                />
              </div>
              {errors.unstop && (
                <p className="text-red-500 text-xs mt-1">{errors.unstop}</p>
              )}
            </div>

            <div className="mt-3 text-sm text-[#11014c]">
              <p>
                <span className="text-red-600">*</span> LinkedIn URL is
                required. Other fields are optional.
              </p>
              <p className="mt-1">
                Tip: If you don't have accounts on all platforms, just fill in
                the ones you use.
              </p>
            </div>
          </div>
        );

      case "Hackathon Preferences":
        return (
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
        );

      default:
        return <p className="text-[#11014c]">Form content for {modalType}</p>;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-3xl my-4 flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-[#b6cbff] flex justify-between items-center flex-shrink-0">
          <h3 className="font-bold text-lg text-[#340062]">
            {isEditing ? `Edit ${modalType}` : `Add ${modalType}`}
          </h3>
          <button
            onClick={onClose}
            className="text-[#11014c] hover:text-[#340062] transition-colors"
            aria-label="Close"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto">{renderFormContent()}</div>

        {/* Modal Footer */}
        <div className="bg-[#f6ebff] bg-opacity-30 px-6 py-3 flex justify-end gap-3 rounded-b-lg flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[#11014c] hover:bg-gray-100 transition-colors rounded"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#340062] text-white font-medium rounded hover:bg-[#11014c] transition-colors"
            type="button"
          >
            {isEditing ? "Update Details" : "Save Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
