import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Component/Loader';

// Create auth context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Base API URL from environment variables
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hackmate-personal.onrender.com';
  
  // Configure axios instance
  const api = axios.create({
    baseURL: API_BASE_URL
  });
  
  // Add interceptor for token refresh (keeping your existing implementation)
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Your existing interceptor code...
      return Promise.reject(error);
    }
  );
  
  // Store complete user profile in sessionStorage (not localStorage)
  // This is more secure and will be cleared when the browser is closed
  const saveUserToSession = (user) => {
    if (user) {
      sessionStorage.setItem('userProfile', JSON.stringify(user));
    }
  };
  
  // Get user from sessionStorage
  const getUserFromSession = () => {
    const userData = sessionStorage.getItem('userProfile');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        console.error('Failed to parse user data from session storage:', e);
      }
    }
    return null;
  };
  
  // Check if user is authenticated on load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
          console.log('No access token found');
          setCurrentUser(null);
          setLoading(false);
          return;
        }
        
        console.log('Access token found, setting auth header');
        // Set default auth header
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        // First try to get user from session storage (maintains across refreshes but not browser close)
        const sessionUser = getUserFromSession();
        if (sessionUser) {
          console.log('User found in session storage:', sessionUser);
          setCurrentUser(sessionUser);
          
          // Validate the session user with a silent API call
          try {
            const response = await api.get('/auth/profile');
            const freshUserData = response.data.user;
            console.log('Profile validation successful:', freshUserData);
            
            // Update session and state if user data changed
            if (JSON.stringify(freshUserData) !== JSON.stringify(sessionUser)) {
              saveUserToSession(freshUserData);
              setCurrentUser(freshUserData);
            }
          } catch (validationError) {
            console.warn('Session validation failed, but continuing with session data:', validationError);
            // Keep using session data even if validation fails
          }
        } else {
          // No session data, try API
          try {
            console.log('Fetching user profile from API');
            const response = await api.get('/auth/profile');
            const userData = response.data.user;
            console.log('Profile fetch successful:', userData);
            
            // Save to session storage and state
            saveUserToSession(userData);
            setCurrentUser(userData);
          } catch (profileError) {
            console.warn('Profile fetch failed:', profileError);
            
            // Last resort: try to decode token
            try {
              console.log('Attempting to decode token');
              const payload = JSON.parse(atob(accessToken.split('.')[1]));
              console.log('Token payload:', payload);
              
              // Create a user object from token data
              // Use actual data from token instead of fallbacks whenever possible
              const userData = {
                id: payload.id || payload.sub || payload.userId || 'unknown',
                email: payload.email || payload.mail || `${payload.sub || 'user'}@example.com`,
                name: payload.name || payload.username || (payload.email ? payload.email.split('@')[0] : 'User')
              };
              
              console.log('Created user from token:', userData);
              saveUserToSession(userData);
              setCurrentUser(userData);
            } catch (decodeError) {
              console.error('Failed to decode token:', decodeError);
              // Clear invalid tokens
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              sessionStorage.removeItem('userProfile');
              setCurrentUser(null);
            }
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('userProfile');
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  // Login user - storing profile in session storage
  const login = async (email, password) => {
    try {
      console.log('Login attempt with email:', email);
      setError(null);
      const response = await api.post('/auth/login', {
        email,
        password
      });
      
      console.log('Login response received:', response.data);
      
      const { accessToken, refreshToken } = response.data;
      
      if (!accessToken || !refreshToken) {
        throw new Error('Invalid response from server - missing tokens');
      }
      
      // Store tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Set default auth header
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      let userData;
      
      // If user data is in the response
      if (response.data.user) {
        userData = response.data.user;
        console.log('User data from login response:', userData);
      } else {
        // Try to fetch user profile
        try {
          console.log('Fetching user profile');
          const userResponse = await api.get('/auth/profile');
          userData = userResponse.data.user;
          console.log('User profile received:', userData);
        } catch (profileError) {
          console.warn('Could not fetch profile, using token data:', profileError);
          
          // Extract from token
          const payload = JSON.parse(atob(accessToken.split('.')[1]));
          userData = {
            id: payload.id || payload.sub || 'unknown',
            email: email || payload.email || 'User',
            name: payload.name || (email ? email.split('@')[0] : 'User')
          };
          console.log('User data from token:', userData);
        }
      }
      
      // Save to session storage and state
      saveUserToSession(userData);
      setCurrentUser(userData);
      
      return response.data;
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Login failed';
      setError(errorMessage);
      throw err;
    }
  };
  
  // Logout - clear session storage
  const logout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (currentUser && accessToken) {
        await api.post('/auth/logout', {}, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      }
    } catch (err) {
      console.error('Logout API error:', err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('userProfile');
      delete api.defaults.headers.common['Authorization'];
      setCurrentUser(null);
      navigate('/login');
    }
  };
  
  // Handle OAuth with session storage
  const handleOAuthRedirect = async (location) => {
    try {
      console.log('Processing OAuth redirect with query params:', location.search);
      const urlParams = new URLSearchParams(location.search);
      const accessToken = urlParams.get('accessToken');
      const refreshToken = urlParams.get('refreshToken');
      
      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        try {
          const response = await api.get('/auth/profile');
          console.log('OAuth profile fetch successful:', response.data);
          const userData = response.data.user;
          saveUserToSession(userData);
          setCurrentUser(userData);
        } catch (profileError) {
          console.warn('Could not fetch profile from OAuth, using token data:', profileError);
          const payload = JSON.parse(atob(accessToken.split('.')[1]));
          const userData = {
            id: payload.id || payload.sub || 'unknown',
            email: payload.email || 'User',
            name: payload.name || (payload.email ? payload.email.split('@')[0] : 'User')
          };
          saveUserToSession(userData);
          setCurrentUser(userData);
        }
        
        navigate('/dashboard');
        return true;
      } else {
        console.error('Missing tokens in OAuth redirect');
        navigate('/login');
        throw new Error('Authentication failed - missing tokens');
      }
    } catch (err) {
      console.error('Error handling OAuth redirect:', err);
      navigate('/login');
      throw err;
    }
  };
  
  // Your existing register function with session storage added
  const register = async (name, email, password) => {
    // Existing implementation with added saveUserToSession
    try {
      // Your existing code...
      
      // If user data exists in response
      if (response.data.user) {
        saveUserToSession(response.data.user);
      }
      
      // Rest of your implementation...
    } catch (err) {
      // Your error handling...
    }
  };
  
  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    handleOAuthRedirect,
    api
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <Loader/>}
    </AuthContext.Provider>
  );
};