import React from 'react'
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark-primary py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-light-secondary1">
        
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-light-primary">HackMate</h2>
          <p className="mt-2 text-sm">
            Supercharge your hackathon projects with intelligent assistance, 
            real-time collaboration, and powerful code generation.
          </p>
          
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 text-light-primary text-lg">
            <FaLinkedin />
            <FaInstagram />
            <FaFacebook />
            <FaTwitter />
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-md font-bold text-light-primary">Company</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#" className="hover:text-light-primary">About Us</a></li>
            <li><a href="#" className="hover:text-light-primary">Careers</a></li>
            <li><a href="#" className="hover:text-light-primary">Press</a></li>
            <li><a href="#" className="hover:text-light-primary">Blog</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-md font-bold text-light-primary">Support</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#" className="hover:text-light-primary">Help Center</a></li>
            <li><a href="#" className="hover:text-light-primary">Contact Us</a></li>
            <li><a href="#" className="hover:text-light-primary">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-light-primary">Terms of Service</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-md font-bold text-light-primary">Subscribe</h3>
          <p className="mt-2 text-sm">Get the latest updates and news.</p>
          
          <div className="flex items-center mt-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="w-full bg-white text-dark-primary rounded-lg px-4 py-2 outline-none border focus:ring-2 focus:ring-dark-primary"
            />
            <button className="ml-2 bg-light-primary text-dark-primary px-4 py-2 rounded-lg hover:bg-light-primary/10">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-light-primary text-sm mt-10 border-t border-light-primary pt-5">
        © 2025 HackMate Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
