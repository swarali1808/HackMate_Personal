import React, { useState, useEffect } from "react";
import { fetchData, createData, updateData, deleteData } from "../api";

const SocialLinksSection = ({ editData, isEditing, onSave }) => {
  const [formData, setFormData] = useState({
    linkedin: "",
    portfolio: "",
    twitter: "",
    devfolio: "",
    unstop: "",
    github: "",
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
        linkedin: "",
        portfolio: "",
        twitter: "",
        devfolio: "",
        unstop: "",
        github: "",
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // CRUD Operations
  const saveSocialLinks = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      let result;
      if (isEditing && editData._id) {
        result = await updateData('social-links', editData._id, formData);
      } else {
        result = await createData('social-links', formData);
      }
      
      onSave(result);
    } catch (error) {
      console.error('Error saving social links data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSocialLinks = async () => {
    if (!isEditing || !editData || !editData._id) return;
    
    setIsLoading(true);
    try {
      await deleteData('social-links', editData._id);
      onSave(null); // Notify parent that item was deleted
    } catch (error) {
      console.error('Error deleting social links data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    saveSocialLinks();
  };

  return (
    <>
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

      {/* Modal Footer */}
      <div className="bg-[#f6ebff] bg-opacity-30 px-6 py-3 flex justify-end gap-3 rounded-b-lg flex-shrink-0 mt-6">
        {isEditing && (
          <button
            onClick={deleteSocialLinks}
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

export default SocialLinksSection;