import React, { useState, useEffect } from "react";
import { fetchData, createData, updateData, deleteData } from "../api";

const CertificationsSection = ({ editData, isEditing, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    description: "",
    date: "",
    url: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
        url: "",
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
    if (formData.url && !isValidUrl(formData.url)) {
      newErrors.url = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // CRUD Operations
  const saveCertification = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      let result;
      if (isEditing && editData._id) {
        result = await updateData('certifications', editData._id, formData);
      } else {
        result = await createData('certifications', formData);
      }
      
      onSave(result);
    } catch (error) {
      console.error('Error saving certification data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCertification = async () => {
    if (!isEditing || !editData || !editData._id) return;
    
    setIsLoading(true);
    try {
      await deleteData('certifications', editData._id);
      onSave(null); // Notify parent that item was deleted
    } catch (error) {
      console.error('Error deleting certification data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    saveCertification();
  };

  return (
    <>
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

      {/* Modal Footer */}
      <div className="bg-[#f6ebff] bg-opacity-30 px-6 py-3 flex justify-end gap-3 rounded-b-lg flex-shrink-0 mt-6">
        {isEditing && (
          <button
            onClick={deleteCertification}
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

export default CertificationsSection;