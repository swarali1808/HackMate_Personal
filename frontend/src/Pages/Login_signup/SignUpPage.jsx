import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import image1 from "../../Assets/image1.jpg" // Placeholder for the image
const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div className="flex flex-col lg:flex-row w-full bg-gray-800 min-h-screen">
      {/* Left Section with Background Image */}
      <div className="w-full lg:w-2/5 flex flex-col items-center justify-center p-8 relative overflow-hidden min-h-screen lg:min-h-full">
        {/* Background Image - In production, replace with the actual sand dunes image from Pinterest */}
        <div className="absolute inset-0 z-0">
          <img 
            src={image1} 
            alt="" 
            className="w-full h-full object-cover"
          />
          {/* Dark overlay to enhance text visibility */}
          <div className="absolute inset-0 bg-purple-900 bg-opacity-40"></div>
        </div>

        {/* Back to website button */}
        <div className="absolute top-8 left-8 z-10">
          <Link to="/" className="flex items-center text-white bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
            Back to website
          </Link>
        </div>

        {/* Logo */}
        <div className="absolute top-8 left-8 flex items-center z-10">
          <span className="font-bold text-2xl text-white">HACKMATE</span>
        </div>

        {/* Content */}
        <div className="relative z-10 mt-auto mb-16 text-white px-4 w-full">
          <h2 className="text-2xl font-bold">Building Teams,</h2>
          <h2 className="text-2xl font-bold mb-6">Conquering Everything!</h2>
          
          {/* Dots indicators */}
          <div className="flex space-x-2">
            <div className="w-6 h-1 bg-white rounded-full"></div>
            <div className="w-6 h-1 bg-white bg-opacity-50 rounded-full"></div>
            <div className="w-6 h-1 bg-white bg-opacity-50 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Right Section with Form */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-6 lg:p-12 bg-gray-900 min-h-screen lg:min-h-full">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 text-white">Create an account</h2>
            <p className="text-gray-400">Already have an account? <Link to="/login" className="text-indigo-400">Log in</Link></p>
          </div>
          
          <form className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name" 
                  className="w-full h-12 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name" 
                  className="w-full h-12 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" 
                className="w-full h-12 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" 
                className="w-full h-12 bg-gray-800 border border-gray-700 rounded-lg p-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={16} className="text-gray-400 hover:text-white transition-colors" />
                ) : (
                  <Eye size={16} className="text-gray-400 hover:text-white transition-colors" />
                )}
              </button>
            </div>
            
            <div className="flex items-center mt-4">
              <input 
                type="checkbox" 
                id="terms" 
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                I agree to the <a href="#" className="text-indigo-400">Terms & Conditions</a>
              </label>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 font-medium mt-6 transition-all"
            >
              Create account
            </button>

            <div className="text-center text-sm text-gray-400 mt-4">
              Or register with
            </div>

            <div className="flex gap-4 mt-4">
              <button 
                type="button" 
                className="flex-1 flex justify-center items-center py-2 px-4 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700"
              >
                <img src="/api/placeholder/20/20" alt="Google" className="w-5 h-5 mr-2" />
                Google
              </button>
              <button 
                type="button" 
                className="flex-1 flex justify-center items-center py-2 px-4 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700"
              >
                <img src="/api/placeholder/20/20" alt="Apple" className="w-5 h-5 mr-2" />
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;