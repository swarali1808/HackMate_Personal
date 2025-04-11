import React, { useRef, useEffect } from "react";
import { FiX } from "react-icons/fi";
import EducationSection from "./Section/EducationSection";
import ProjectsSection from "./Section/ProjectsSection";
import WorkExperienceSection from "./Section/WorkExperienceSection";
import ResponsibilitySection from "./Section/ResponsibilitySection";
import AchievementsSection from "./Section/AchievementsSection";
import CertificationsSection from "./Section/CertificationsSection";
import SocialLinksSection from "./Section/SocialLinksSection";
import HackathonPreferencesSection from "./Section/HackathonPreferencesSection";
import TaglineSection from "./Section/TaglineSection";


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

  // Render different forms based on modalType
  const renderFormContent = () => {
    switch (modalType) {
      case "Education":
        return (
          <EducationSection
            editData={editData}
            isEditing={isEditing}
            onSave={onSave}
          />
        );
      case "Projects":
        return (
          <ProjectsSection
            editData={editData}
            isEditing={isEditing}
            onSave={onSave}
          />
        );
      case "Work Experience":
        return (
          <WorkExperienceSection
            editData={editData}
            isEditing={isEditing}
            onSave={onSave}
          />
        );
      case "Position of Responsibility":
        return (
          <ResponsibilitySection
            editData={editData}
            isEditing={isEditing}
            onSave={onSave}
          />
        );
      case "Achievements":
        return (
          <AchievementsSection
            editData={editData}
            isEditing={isEditing}
            onSave={onSave}
          />
        );
      case "Certifications":
        return (
          <CertificationsSection
            editData={editData}
            isEditing={isEditing}
            onSave={onSave}
          />
        );
      case "Social Links":
        return (
          <SocialLinksSection
            editData={editData}
            isEditing={isEditing}
            onSave={onSave}
          />
        );
      case "Hackathon Preferences":
        return (
          <HackathonPreferencesSection
            editData={editData}
            isEditing={isEditing}
            onSave={onSave}
          />
        );
      case "Tagline":
        return (
          <TaglineSection
            editData={editData}
            isEditing={isEditing}
            onSave={onSave}
          />
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
      </div>
    </div>
  );
};

export default FormModal;