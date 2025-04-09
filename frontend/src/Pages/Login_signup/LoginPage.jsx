import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 }
  };

  return (
    <div className='min-h-screen max-w-screen m-0 p-0 overflow-x-hidden overflow-y-auto transition-all scroll-smooth bg-gray-950'>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Section with Form (Swapped from right) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-2/5 flex items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-purple-600 via-purple-800 to-indigo-900"
        >
          <div className="w-full max-w-md">
            {/* Brand Logo */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center mb-12 z-10"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-white to-purple-200 flex items-center justify-center mr-3 shadow-lg">
                <div className="w-5 h-5 bg-purple-600 rounded-full"></div>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">HackMate</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-4xl font-bold mb-3 text-white">Welcome Back</h2>
              <p className="text-xl text-purple-200">Log in to access your account.</p>
            </motion.div>
            
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-base font-medium mb-2 text-white">Email</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. johnfrancis@gmail.com" 
                    className="w-full h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 pl-12 text-base focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-base font-medium mb-2 text-white">Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300">
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password" 
                    className="w-full h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 pl-12 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all text-white"
                  />
                  <button 
                    type="button" 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} className="text-purple-200 hover:text-white transition-colors" />
                    ) : (
                      <Eye size={20} className="text-purple-200 hover:text-white transition-colors" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-5 w-5 rounded border-purple-400 bg-white/10 text-white focus:ring-white"
                  />
                  <label htmlFor="remember" className="ml-3 text-sm text-white">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm font-medium text-white hover:text-purple-200">
                  Forgot password?
                </a>
              </div>
              
              <motion.button 
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                type="submit" 
                className="w-full bg-white text-purple-800 rounded-xl py-4 font-semibold text-lg mt-8 transition-all shadow-lg flex items-center justify-center"
              >
                <span>Log In</span>
                <ArrowRight size={20} className="ml-2" />
              </motion.button>
            </motion.form>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-4 my-8"
            >
              <div className="h-px bg-white/20 flex-1"></div>
              <span className="text-white/80 text-base font-medium">Or continue with</span>
              <div className="h-px bg-white/20 flex-1"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button 
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                className="flex-1 bg-white/10 backdrop-blur-md rounded-xl py-4 px-4 flex items-center justify-center gap-3 border border-white/20 hover:bg-white/20 transition-all shadow-lg"
              >
                <Mail size={20} className="text-white" />
                <span className="font-medium text-white">Google</span>
              </motion.button>
              <motion.button 
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                className="flex-1 bg-white/10 backdrop-blur-md rounded-xl py-4 px-4 flex items-center justify-center gap-3 border border-white/20 hover:bg-white/20 transition-all shadow-lg"
              >
                <Github size={20} className="text-white" />
                <span className="font-medium text-white">Github</span>
              </motion.button>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-base text-white mt-10"
            >
              Don't have an account? <Link to="/signup" className="text-white font-semibold hover:text-purple-200 transition-colors">Sign up</Link>
            </motion.p>
          </div>
        </motion.div>
        
        {/* Right Section with Gradient Background (Swapped from left) */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={container}
          className="w-full lg:w-3/5 flex flex-col items-center justify-center bg-gray-950 lg:rounded-l-3xl p-8 lg:p-16 relative overflow-hidden"
        >
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div 
              animate={{ 
                x: [0, 10, -10, 0],
                y: [0, -10, 15, 0]
              }}
              transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-800 rounded-full opacity-20 blur-3xl"
            />
            <motion.div 
              animate={{ 
                x: [0, -15, 15, 0],
                y: [0, 15, -15, 0]
              }}
              transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
              className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gray-700 rounded-full opacity-20 blur-3xl"
            />
          </div>

          {/* Feature Highlights */}
          <motion.div
            variants={item}
            className="w-full max-w-lg text-center mb-16 z-10"
          >
            <h1 className="text-5xl font-bold mb-6 text-white">Discover the Benefits</h1>
            <p className="text-xl text-gray-400">Access your workspace, collaborate with team members, and manage your projects effortlessly.</p>
          </motion.div>
          
          {/* Feature Cards */}
          <div className="w-full max-w-lg grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
            {[
              { 
                title: "Smart Dashboard", 
                description: "Access all your projects and tasks in one unified interface.",
                icon: "📊"
              },
              { 
                title: "Secure Storage", 
                description: "Your data is encrypted and stored with enterprise-grade security.",
                icon: "🔒" 
              },
              { 
                title: "Team Collaboration", 
                description: "Work together with your team in real-time.",
                icon: "👥" 
              },
              { 
                title: "24/7 Support", 
                description: "Our support team is always available to help you.",
                icon: "🛟" 
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-purple-500 transition-all"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Testimonial */}
          <motion.div
            variants={item}
            className="mt-16 bg-gray-900 border border-gray-800 hover:border-purple-500 rounded-2xl p-6 max-w-lg w-full z-10"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 mr-3"></div>
              <div>
                <h3 className="font-semibold text-white">Michael Chen</h3>
                <p className="text-sm text-gray-400">Senior Developer</p>
              </div>
            </div>
            <p className="italic text-sm text-gray-400">"The OnlyRipe platform has transformed how our team collaborates. The login process is seamless, and the security features give us peace of mind when handling sensitive client data."</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;