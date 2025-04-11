import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-hot-toast';

const OAuthSuccess = () => {
  const location = useLocation();
  const { handleOAuthRedirect } = useAuth();

  useEffect(() => {
    const processOAuth = async () => {
      try {
        console.log("Processing OAuth redirect with query params:", location.search);
        // Process the OAuth redirect with tokens in URL params
        await handleOAuthRedirect(location);
        toast.success("Authentication successful!");
      } catch (error) {
        console.error("OAuth processing error:", error);
        toast.error("Authentication failed. Please try again.");
      }
    };
    
    processOAuth();
  }, [location, handleOAuthRedirect]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Authentication in Progress</h2>
        <p className="text-gray-600 mb-6">Please wait while we sign you in...</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
        </div>
      </div>
    </div>
  );
};

export default OAuthSuccess;