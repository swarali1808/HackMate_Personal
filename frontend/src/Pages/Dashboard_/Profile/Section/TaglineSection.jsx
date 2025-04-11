import React, { useState, useEffect } from "react";
import { fetchData, createData, updateData, deleteData } from "../api";

const TaglineSection = ({ editData, isEditing, onSave }) => {
  const [formData, setFormData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Set form data when editing or reset when adding new
  useEffect(() => {
    if (isEditing && editData) {
      setFormData(editData);
    } else {
      setFormData("");
    }
  }, [editData, isEditing]);

  // CRUD Operations
  const saveTagline = async () => {
    setIsLoading(true);
    try {
      let result;
      if (isEditing && editData._id) {
        result = await updateData('tagline', editData._id, { tagline: formData });
      } else {
        result = await createData('tagline', { tagline: formData });
      }
      
      onSave(result);
    } catch (error) {
      console.error('Error saving tagline data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTagline = async () => {
    if (!isEditing || !editData || !editData._id) return;
    
    setIsLoading(true);
    try {
      await deleteData('tagline', editData._id);
      onSave(null); // Notify parent that item was deleted
    } catch (error) {
      console.error('Error deleting tagline data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    saveTagline();
  };

  return (
    <>
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

      {/* Modal Footer */}
      <div className="bg-[#f6ebff] bg-opacity-30 px-6 py-3 flex justify-end gap-3 rounded-b-lg flex-shrink-0 mt-6">
        {isEditing && (
          <button
            onClick={deleteTagline}
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

export default TaglineSection;