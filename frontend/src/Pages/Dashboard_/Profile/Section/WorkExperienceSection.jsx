import React, { useState, useEffect } from "react";
import { fetchData, createData, updateData, deleteData } from "../api";

const WorkExperienceSection = ({ editData, isEditing, onSave }) => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    employmentType: "Full-time",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Set form data when editing or reset when adding new
  useEffect(() => {
    if (isEditing && editData) {
      setFormData(editData);
    } else {
      setFormData({
        company: "",
        position: "",
        employmentType: "Full-time",
        description: "",
        startDate: "",
        endDate: "",
      });
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

    if (!formData.company) {
      newErrors.company = "Company name is required";
    }
    if (!formData.position) {
      newErrors.position = "Position is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // CRUD Operations
  const saveWorkExperience = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      let result;
      if (isEditing && editData._id) {
        result = await updateData('work-experience', editData._id, formData);
      } else {
        result = await createData('work-experience', formData);
      }
      
      onSave(result);
    } catch (error) {
      console.error('Error saving work experience data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWorkExperience = async () => {
    if (!isEditing || !editData || !editData._id) return;
    
    setIsLoading(true);
    try {
      await deleteData('work-experience', editData._id);
      onSave(null); // Notify parent that item was deleted
    } catch (error) {
      console.error('Error deleting work experience data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    saveWorkExperience();
  };

  return (
    <>
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

      {/* Modal Footer */}
      <div className="bg-[#f6ebff] bg-opacity-30 px-6 py-3 flex justify-end gap-3 rounded-b-lg flex-shrink-0 mt-6">
        {isEditing && (
          <button
            onClick={deleteWorkExperience}
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

export default WorkExperienceSection;