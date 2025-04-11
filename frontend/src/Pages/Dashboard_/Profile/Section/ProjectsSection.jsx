import React, { useState, useEffect, useRef } from "react";
import { FiCode } from "react-icons/fi";
import { fetchData, createData, updateData, deleteData } from "../api";

const ProjectsSection = ({ editData, isEditing, onSave }) => {
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
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    repourl: "",
    deployurl: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  // Set form data when editing or reset when adding new
  useEffect(() => {
    if (isEditing && editData) {
      setFormData(editData);
      if (editData.technologies) {
        setSelectedTechnologies(
          editData.technologies.split(", ").filter(Boolean)
        );
      }
    } else {
      setFormData({
        title: "",
        description: "",
        technologies: "",
        repourl: "",
        deployurl: "",
        startDate: "",
        endDate: "",
      });
      setSelectedTechnologies([]);
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

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = "Project title is required";
    }
    if (!formData.description) {
      newErrors.description = "Project description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // CRUD Operations
  const saveProject = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const dataToSave = { 
        ...formData,
        technologies: selectedTechnologies.join(", ")
      };
      
      let result;
      if (isEditing && editData._id) {
        result = await updateData('projects', editData._id, dataToSave);
      } else {
        result = await createData('projects', dataToSave);
      }
      
      onSave(result);
    } catch (error) {
      console.error('Error saving project data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async () => {
    if (!isEditing || !editData || !editData._id) return;
    
    setIsLoading(true);
    try {
      await deleteData('projects', editData._id);
      onSave(null); // Notify parent that item was deleted
    } catch (error) {
      console.error('Error deleting project data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    saveProject();
  };

  return (
    <>
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

      {/* Modal Footer */}
      <div className="bg-[#f6ebff] bg-opacity-30 px-6 py-3 flex justify-end gap-3 rounded-b-lg flex-shrink-0 mt-6">
        {isEditing && (
          <button
            onClick={deleteProject}
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

export default ProjectsSection;