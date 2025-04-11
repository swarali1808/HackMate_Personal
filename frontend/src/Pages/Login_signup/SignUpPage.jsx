import React, { useState } from "react";
import { Eye, EyeOff, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from 'axios';
import image1 from "../../Assets/signupimg.jpg";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hackmate-personal.onrender.com';
  
  // Direct API signup function (backup method) - REMOVED withCredentials flag
  const directApiSignup = async () => {
    try {
      setIsLoading(true);
      
      console.log("Making direct API call to:", `${API_BASE_URL}/auth/signup`);
      
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        name,
        email,
        password
      });
      
      console.log("Direct signup response:", response.data);
      
      // If successful, try to login
      if (response.data.message === "User created") {
        try {
          const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password
          });
          
          console.log("Direct login response:", loginResponse.data);
          
          // Store tokens
          const { accessToken, refreshToken } = loginResponse.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          
          toast.success("Registration successful!");
          
          // Force refresh page to trigger the auth check
          window.location.href = '/dashboard';
          return;
        } catch (loginErr) {
          console.error("Direct login failed:", loginErr);
          toast.error("Registration successful but login failed. Please try logging in.");
          navigate('/login');
        }
      }
    } catch (err) {
      console.error("Direct signup failed:", err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (!agreeTerms) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }
    
    setIsLoading(true);
    
    try {
      try {
        // Try using the AuthContext first
        console.log("Attempting signup via AuthContext");
        await register(name, email, password);
        toast.success("Registration successful!");
        navigate('/dashboard');
      } catch (contextError) {
        console.error("Registration via context failed, trying direct API", contextError);
        // If that fails, try direct API call
        await directApiSignup();
      }
    } catch (error) {
      console.error("All signup attempts failed:", error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          "Registration failed. Please try again.";
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle social logins
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };
  
  const handleGithubLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/github`;
  };

  // Logo animation variants
  const logoVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      textShadow: "0px 0px 8px rgb(246, 235, 255)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Text animation for the slogan
  const textVariant = {
    initial: { opacity: 0, x: -30 },
    animate: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen font-poppins">
      {/* Left Section with Background Image */}
      <div className="w-full lg:w-2/5 flex flex-col items-start justify-center p-8 relative overflow-hidden min-h-screen lg:min-h-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={image1} alt="" className="w-full h-full object-cover" />
          {/* Dark overlay to enhance text visibility */}
          <div className="absolute inset-0 bg-dark-primary bg-opacity-70"></div>
        </div>

        {/* Back to Home button */}
        <div className="absolute top-8 left-8 z-20 cursor-pointer">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="flex items-center text-light-primary bg-dark-secondary1 bg-opacity-80 px-4 py-2 rounded-full text-sm"
            >
              <Home size={16} className="mr-2" />
              Back to Home
            </Link>
          </motion.div>
        </div>

        {/* Left-center Logo with Animation */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full w-full pl-8">
          <motion.span
            className="font-outfit font-bold text-5xl text-light-primary tracking-wider"
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            HACKMATE
          </motion.span>

          {/* Content */}
          <div className="mt-8 text-light-primary">
            <motion.h2
              custom={0}
              variants={textVariant}
              initial="initial"
              animate="animate"
              className="text-2xl font-dmsans font-bold"
            >
              Building Teams,
            </motion.h2>
            <motion.h2
              custom={1}
              variants={textVariant}
              initial="initial"
              animate="animate"
              className="text-2xl font-dmsans font-bold mb-6"
            >
              Conquering Everything!
            </motion.h2>

            {/* Dots indicators */}
            <motion.div
              className="flex space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.div
                className="w-6 h-1 bg-light-primary rounded-full"
                whileHover={{ scaleX: 1.5, originX: 0 }}
              ></motion.div>
              <motion.div
                className="w-6 h-1 bg-light-primary bg-opacity-50 rounded-full"
                whileHover={{ scaleX: 1.5, originX: 0 }}
              ></motion.div>
              <motion.div
                className="w-6 h-1 bg-light-primary bg-opacity-50 rounded-full"
                whileHover={{ scaleX: 1.5, originX: 0 }}
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right Section with Form - Updated with new background style */}
      <div
        className="w-full lg:w-3/5 flex items-center justify-center relative min-h-screen lg:min-h-full bg-black"
        style={{
          background:
            "radial-gradient(circle at center, #000000 30%, #340776 215%)",
        }}
      >
        <motion.div
          className="w-full max-w-md px-8 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="mb-10">
            <h2 className="text-4xl font-outfit font-bold mb-3 text-white tracking-tight">
              Create an account
            </h2>
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-400 hover:text-purple-300"
              >
                Log in
              </Link>
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full h-12 bg-gray-900 bg-opacity-60 border border-gray-800 rounded-lg p-3 text-white font-poppins focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500"
                required
              />
            </motion.div>

            {/* Email field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full h-12 bg-gray-900 bg-opacity-60 border border-gray-800 rounded-lg p-3 text-white font-poppins focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500"
                required
              />
            </motion.div>

            {/* Password field */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 bg-gray-900 bg-opacity-60 border border-gray-800 rounded-lg p-3 pr-10 text-white font-poppins focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff
                    size={16}
                    className="hover:text-gray-300 transition-colors"
                  />
                ) : (
                  <Eye
                    size={16}
                    className="hover:text-gray-300 transition-colors"
                  />
                )}
              </button>
            </motion.div>

            {/* Terms and conditions checkbox */}
            <motion.div
              className="flex items-center mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-purple-600 focus:ring-purple-500"
              />
              <label
                htmlFor="terms"
                className="ml-2 text-sm text-gray-400 font-poppins"
              >
                I agree to the{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                  Terms & Conditions
                </a>
              </label>
            </motion.div>

            {/* Submit button */}
            <motion.button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3 font-medium mt-8 transition-all font-dmsans text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: "linear-gradient(90deg, #7e22ce 0%, #6d28d9 100%)",
                boxShadow: "0 8px 20px -3px rgba(123, 31, 162, 0.5)",
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span className="ml-2">Creating account...</span>
                </div>
              ) : (
                "Create account"
              )}
            </motion.button>

            {/* Social login section */}
            <motion.div
              className="text-center text-sm text-gray-500 mt-8 font-poppins"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              Or register with
            </motion.div>

            <motion.div
              className="flex gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <motion.button
                type="button"
                className="flex-1 flex justify-center items-center py-2 px-4 border border-gray-800 rounded-lg bg-gray-900 bg-opacity-60 hover:bg-opacity-80 text-white font-poppins"
                whileHover={{ scale: 1.03, borderColor: "#6d28d9" }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGoogleLogin}
              >
                <FaGoogle
                  className="w-5 h-5 mr-2"
                />
                Google
              </motion.button>
              <motion.button
                type="button"
                className="flex-1 flex justify-center items-center py-2 px-4 border border-gray-800 rounded-lg bg-gray-900 bg-opacity-60 hover:bg-opacity-80 text-white font-poppins"
                whileHover={{ scale: 1.03, borderColor: "#6d28d9" }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGithubLogin}
              >
                <FaGithub
                  className="w-5 h-5 mr-2"
                />
                GitHub
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;