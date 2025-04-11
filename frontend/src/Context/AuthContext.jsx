import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  
  // Configure axios instance - REMOVED withCredentials: true to fix CORS
  const api = axios.create({
    baseURL: API_BASE_URL
  });
  
  // Add interceptor for token refresh
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      // If error is 401 and we haven't already tried refreshing
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) throw new Error('No refresh token available');
          
          const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refreshToken
          });
          
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          
          // Store new tokens
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          
          // Update auth header and retry
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // If refresh failed, logout user
          logout();
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
  
  // Check if user is authenticated on load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        
        if (accessToken) {
          // Set default auth header
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          
          try {
            // Fetch user profile
            const response = await api.get('/auth/profile');
            setCurrentUser(response.data.user);
          } catch (profileError) {
            console.warn("Could not fetch profile, using decoded token data");
            // If profile endpoint doesn't exist, manually create user object from token payload
            try {
              const payload = JSON.parse(atob(accessToken.split('.')[1]));
              setCurrentUser({
                id: payload.id || payload.sub,
                email: payload.email || "User",
                name: payload.name || "User"
              });
            } catch (decodeError) {
              console.error("Failed to decode token:", decodeError);
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
            }
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  // Register new user
  const register = async (name, email, password) => {
    try {
      console.log("Register attempt with:", { name, email });
      setError(null);
      
      const response = await api.post('/auth/signup', {
        name,
        email,
        password
      });
      
      console.log("Signup response:", response.data);
      
      // If the backend returns tokens directly with the signup
      if (response.data.accessToken && response.data.refreshToken) {
        const { accessToken, refreshToken, user } = response.data;
        
        // Store tokens
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        // Set auth header
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        // Set current user
        setCurrentUser(user || { email });
        
        return response.data;
      } 
      // If the backend returns a user created message
      else if (response.data.message === "User created" && response.data.user) {
        console.log("User created successfully, attempting login");
        // Perform login with the newly created credentials
        return await login(email, password);
      }
      
      return response.data;
    } catch (err) {
      console.error("Signup error details:", {
        status: err.response?.status,
        message: err.response?.data?.message,
        error: err.message,
        response: err.response?.data
      });
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Registration failed';
      setError(errorMessage);
      throw err;
    }
  };
  
  // Login user
  const login = async (email, password) => {
    try {
      console.log("Login attempt with email:", email);
      setError(null);
      const response = await api.post('/auth/login', {
        email,
        password
      });
      
      console.log("Login response received", response.data);
      
      const { accessToken, refreshToken } = response.data;
      
      if (!accessToken || !refreshToken) {
        throw new Error("Invalid response from server - missing tokens");
      }
      
      // Store tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Set default auth header
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      // If user data is already in the response, use it
      if (response.data.user) {
        setCurrentUser(response.data.user);
        return response.data;
      }
      
      // Otherwise, try to fetch user profile or extract from token
      try {
        console.log("Fetching user profile");
        const userResponse = await api.get('/auth/profile');
        console.log("User profile received", userResponse.data);
        setCurrentUser(userResponse.data.user);
      } catch (profileError) {
        console.warn("Could not fetch profile, using token data");
        // Extract user info from JWT token payload
        try {
          const payload = JSON.parse(atob(accessToken.split('.')[1]));
          setCurrentUser({
            id: payload.id || payload.sub,
            email: email,
            name: payload.name || "User"
          });
        } catch (decodeError) {
          console.error("Failed to decode token:", decodeError);
          // Still set a minimal user object to allow authentication
          setCurrentUser({ email });
        }
      }
      
      return response.data;
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Login failed';
      setError(errorMessage);
      throw err;
    }
  };
  
  // Logout user
  const logout = async () => {
    try {
      // Call logout endpoint if user is logged in and we have a token
      const accessToken = localStorage.getItem('accessToken');
      if (currentUser && accessToken) {
        await api.post('/auth/logout', {}, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      }
    } catch (err) {
      console.error("Logout API error:", err);
    } finally {
      // Clear local storage and state regardless of API response
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      delete api.defaults.headers.common['Authorization'];
      setCurrentUser(null);
      navigate('/login');
    }
  };
  
  // Handle OAuth success redirect
  const handleOAuthRedirect = async (location) => {
    try {
      console.log("Processing OAuth redirect with query params:", location.search);
      // Extract tokens from URL params after OAuth callback
      const urlParams = new URLSearchParams(location.search);
      const accessToken = urlParams.get('accessToken');
      const refreshToken = urlParams.get('refreshToken');
      
      if (accessToken && refreshToken) {
        // Store tokens
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        // Set default auth header
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        try {
          // Try to fetch user profile
          const response = await api.get('/auth/profile');
          console.log("OAuth profile fetch successful:", response.data);
          setCurrentUser(response.data.user);
        } catch (profileError) {
          console.warn("Could not fetch profile from OAuth, using token data");
          // Extract user info from JWT token payload
          try {
            const payload = JSON.parse(atob(accessToken.split('.')[1]));
            setCurrentUser({
              id: payload.id || payload.sub,
              email: payload.email || "User",
              name: payload.name || "User"
            });
          } catch (decodeError) {
            console.error("Failed to decode OAuth token:", decodeError);
            // Set a minimal user object to allow authentication
            setCurrentUser({ id: "unknown", name: "User" });
          }
        }
        
        // Navigate to dashboard
        navigate('/dashboard');
        return true;
      } else {
        console.error("Missing tokens in OAuth redirect");
        navigate('/login');
        throw new Error("Authentication failed - missing tokens");
      }
    } catch (err) {
      console.error("Error handling OAuth redirect:", err);
      navigate('/login');
      throw err;
    }
  };
  
  // Values to provide through context
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
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};