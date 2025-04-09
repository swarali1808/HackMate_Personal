import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { resources } from "../../../Data/ResourceData.js";
import "../../../Styles/Resources.css";
import SearchBar from "../../../Component/SearchBar.jsx";

const Resources = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResources, setFilteredResources] = useState(resources);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredResources(resources);
    } else {
      const searchLower = searchTerm.toLowerCase();
      const filtered = resources.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchLower) ||
          resource.description.toLowerCase().includes(searchLower)
      );
      setFilteredResources(filtered);
    }
  }, [searchTerm]);

  const handleCardClick = (slug) => {
    navigate(`/dashboard/resources/${slug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Search Bar positioned in the top right corner */}
      <div className="absolute top-4 right-4 z-10">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-20 pb-12"
      >
        <h1 className="text-4xl font-bold text-[#340062] mb-6 font-poppins">
          Resources Dashboard
        </h1>
        <p className="text-gray-600 mb-10 font-dmsans text-lg">
          Explore a curated collection of resources for developers across various domains.
        </p>
        
        {filteredResources.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg font-dmsans">No resources found matching "{searchTerm}"</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filteredResources.map((resource, index) => (
              <motion.div
                key={index}
                className="resource-card bg-white rounded-xl shadow-md p-6 cursor-pointer hover:bg-[#f6ebff] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => handleCardClick(resource.slug)}
              >
                <h2 className="text-xl font-semibold text-[#340062] font-dmsans mb-3">
                  {resource.title}
                </h2>
                <p className="text-gray-600 mb-4 font-dmsans">
                  {resource.description}
                </p>
                <motion.div
                  className="text-[#340062] font-medium flex items-center gap-1"
                  whileHover={{ x: 5 }}
                >
                  Explore →
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Resources;