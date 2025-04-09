import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  XMarkIcon, 
  EnvelopeIcon, 
  ClipboardDocumentIcon,
  CheckCircleIcon,
  UserPlusIcon,
  LinkIcon
} from "@heroicons/react/24/outline";

const InviteMembersModal = ({ isOpen, onClose, onSubmit, teamId, inviteCode }) => {
  const [emails, setEmails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [activeTab, setActiveTab] = useState("email");
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyLinkSuccess, setCopyLinkSuccess] = useState(false);
  
  // Add refs for modal and inputs
  const modalRef = useRef(null);
  const emailsInputRef = useRef(null);
  
  // Focus management
  useEffect(() => {
    if (isOpen && emailsInputRef.current && activeTab === "email") {
      setTimeout(() => {
        emailsInputRef.current.focus();
      }, 100);
    }
  }, [isOpen, activeTab]);
  
  // Click outside handler
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    // Only add the listener if the modal is open
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Basic validation
    const emailList = emails.split(",").map(email => email.trim()).filter(email => email !== "");
    
    // Check if there are any emails
    if (emailList.length === 0) {
      setEmailError("Please enter at least one email address");
      return;
    }
    
    // Simple email validation
    const invalidEmails = emailList.filter(email => !validateEmail(email));
    if (invalidEmails.length > 0) {
      setEmailError(`Invalid email(s): ${invalidEmails.join(", ")}`);
      return;
    }
    
    setEmailError("");
    setIsSubmitting(true);
    
    try {
      // Submit the form
      onSubmit(emailList);
      
      // Reset form
      setEmails("");
      onClose();
    } catch (error) {
      console.error("Error sending invitations:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const copyInviteCode = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(inviteCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const copyInviteLink = (e) => {
    e.stopPropagation();
    // Create a link with the invite code - in a real app, this would be a shareable URL
    const inviteLink = `${window.location.origin}/join-team?code=${inviteCode}`;
    navigator.clipboard.writeText(inviteLink);
    setCopyLinkSuccess(true);
    setTimeout(() => setCopyLinkSuccess(false), 2000);
  };
  
  const handleTabChange = (tab) => (e) => {
    e.stopPropagation();
    setActiveTab(tab);
  };
  
  const handleEmailsChange = (e) => {
    e.stopPropagation();
    setEmails(e.target.value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <motion.div
            ref={modalRef}
            className="relative bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg sm:w-full mx-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold leading-6 text-dark-primary font-poppins">
                  Invite Team Members
                </h3>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="text-dark-secondary1 hover:text-dark-primary focus:outline-none"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-dark-secondary1 font-dmsans">
                  Invite your teammates to join your team for this hackathon.
                </p>
              </div>

              {/* Tabs for different invite methods */}
              <div className="border-b border-dark-secondary1 mb-6">
                <nav className="flex -mb-px space-x-6">
                  <button
                    type="button"
                    className={`py-2 px-1 border-b-2 font-medium text-sm font-poppins transition-colors duration-200 ${
                      activeTab === "email"
                        ? "border-dark-primary text-dark-primary"
                        : "border-transparent text-dark-secondary1 hover:text-dark-primary hover:border-dark-secondary1"
                    }`}
                    onClick={handleTabChange("email")}
                  >
                    <div className="flex items-center">
                      <EnvelopeIcon className="w-4 h-4 mr-2" />
                      Email Invites
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`py-2 px-1 border-b-2 font-medium text-sm font-poppins transition-colors duration-200 ${
                      activeTab === "code"
                        ? "border-dark-primary text-dark-primary"
                        : "border-transparent text-dark-secondary1 hover:text-dark-primary hover:border-dark-secondary1"
                    }`}
                    onClick={handleTabChange("code")}
                  >
                    <div className="flex items-center">
                      <UserPlusIcon className="w-4 h-4 mr-2" />
                      Invite Code
                    </div>
                  </button>
                </nav>
              </div>

              {activeTab === "email" && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="emails" className="block text-sm font-medium text-dark-primary font-poppins mb-1">
                      Send Email Invitations
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <EnvelopeIcon className="w-5 h-5 text-dark-secondary1" />
                      </div>
                      <textarea
                        id="emails"
                        ref={emailsInputRef}
                        rows="3"
                        className={`w-full pl-10 pr-3 py-2 border ${emailError ? 'border-red-500' : 'border-dark-secondary1'} rounded-lg focus:ring-dark-primary focus:border-dark-primary`}
                        placeholder="Enter email addresses separated by commas"
                        value={emails}
                        onChange={handleEmailsChange}
                        onClick={(e) => e.stopPropagation()}
                      ></textarea>
                    </div>
                    {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
                    <p className="text-xs text-dark-secondary1 mt-1 font-dmsans">
                      Enter multiple email addresses separated by commas (e.g., person1@example.com, person2@example.com)
                    </p>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                      }}
                      className="px-4 py-2 border border-dark-secondary1 rounded-lg text-dark-primary hover:bg-light-secondary1 transition-colors duration-300 font-poppins"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-dark-primary text-light-secondary2 rounded-lg hover:bg-dark-secondary1 transition-colors duration-300 font-poppins flex items-center"
                      disabled={isSubmitting}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {isSubmitting ? "Sending..." : "Send Invitations"}
                    </button>
                  </div>
                </form>
              )}

              {activeTab === "code" && (
                <div>
                  <div className="p-4 bg-light-secondary1 rounded-lg mb-4">
                    <h4 className="text-sm font-medium mb-2 text-dark-primary font-poppins">Team Invite Code</h4>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={inviteCode}
                        readOnly
                        className="w-full px-3 py-2 border border-dark-secondary1 rounded-lg bg-white text-dark-primary font-mono"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button
                        type="button"
                        onClick={copyInviteCode}
                        className={`p-2 ${copySuccess ? 'bg-green-500' : 'bg-dark-primary'} text-light-secondary2 rounded-lg hover:bg-dark-secondary1 transition-colors duration-300 focus:outline-none`}
                        title="Copy invite code"
                        aria-label="Copy invite code"
                      >
                        {copySuccess ? <CheckCircleIcon className="w-5 h-5" /> : <ClipboardDocumentIcon className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-dark-secondary1 mt-2 font-dmsans">
                      Share this code with your teammates. They can use it to join your team.
                    </p>
                  </div>

                  <div className="p-4 bg-light-secondary1 rounded-lg mb-6">
                    <h4 className="text-sm font-medium mb-2 text-dark-primary font-poppins">Invite Link</h4>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={`${window.location.origin}/join-team?code=${inviteCode}`}
                        readOnly
                        className="w-full px-3 py-2 border border-dark-secondary1 rounded-lg bg-white text-dark-primary text-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button
                        type="button"
                        onClick={copyInviteLink}
                        className={`p-2 ${copyLinkSuccess ? 'bg-green-500' : 'bg-dark-primary'} text-light-secondary2 rounded-lg hover:bg-dark-secondary1 transition-colors duration-300 focus:outline-none`}
                        title="Copy invite link"
                        aria-label="Copy invite link"
                      >
                        {copyLinkSuccess ? <CheckCircleIcon className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-dark-secondary1 mt-2 font-dmsans">
                      Share this link with your teammates for quick access.
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="text-sm font-medium text-blue-800 mb-2 font-poppins flex items-center">
                      <UserPlusIcon className="w-4 h-4 mr-1" />
                      How to Join
                    </h4>
                    <ol className="text-xs text-blue-700 list-decimal pl-4 space-y-1 font-dmsans">
                      <li>Share the invite code or link with your teammates</li>
                      <li>They should go to the Hackathon details page</li>
                      <li>Click on "Join Team" button</li>
                      <li>Enter the invite code or use the link you shared</li>
                    </ol>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                      }}
                      className="px-4 py-2 border border-dark-secondary1 rounded-lg text-dark-primary hover:bg-light-secondary1 transition-colors duration-300 font-poppins"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InviteMembersModal;