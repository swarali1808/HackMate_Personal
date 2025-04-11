import React, { useState, useEffect } from "react";
import { fetchData, createData, updateData, deleteData } from "../api";

const AchievementsSection = ({ editData, isEditing, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    description: "",
    date: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Set form data when editing or reset when adding new
  useEffect(() => {
    if (isEditing && editData) {
      setFormData(editData);
    } else {
      setFormData({
        title: "",
        issuer: "",
        description: "",
        date: "",
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

    if (!formData.title) {
      newErrors.title = "Title is required";
    }
    if (!formData.issuer) {
      newErrors.issuer = "Issuer name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // CRUD Operations
  const saveAchievement = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      let result;
      if (isEditing && editData._id) {
        result = await updateData('achievements', editData._id, formData);
      } else {
        result = await createData('achievements', formData);
      }
      
      onSave(result);
    } catch (error) {
      console.error('Error saving achievement data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAchievement = async () => {
    if (!isEditing || !editData || !editData._id) return;
    
    setIsLoading(true);
    try {
      await deleteData('achievements', editData._id);
      onSave(null); // Notify parent that item was deleted
    } catch (error) {
      console.error('Error deleting achievement data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    saveAchievement();
  };

  return (
    <>
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

      {/* Modal Footer */}
      <div className="bg-[#f6ebff] bg-opacity-30 px-6 py-3 flex justify-end gap-3 rounded-b-lg flex-shrink-0 mt-6">
        {isEditing && (
          <button
            onClick={deleteAchievement}
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

export default AchievementsSection;