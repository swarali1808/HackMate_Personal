import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { resources } from "../../../Data/ResourceData.js";
import "../../../Styles/Resources.css";
import BackButton from "../../../Component/BackButton.jsx";
import SearchBar from "../../../Component/SearchBar.jsx";

const ResourcePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const resource = resources.find((res) => res.slug === slug);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (!resource) return;
    
    if (searchTerm.trim() === "") {
      setFilteredItems(resource.items);
    } else {
      const searchLower = searchTerm.toLowerCase();
      const filtered = resource.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower)
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, resource]);

  if (!resource) {
    navigate("/dashboard/notfound");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      
      {/* Search Bar positioned in the top right corner */}
      <div className="absolute top-4 right-4 z-10">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-20 pb-12" // Increased padding-top to accommodate the back button and search bar
      >
        <h1 className="text-4xl font-bold text-[#340062] mb-6 font-poppins">
          {resource.title}
        </h1>
        <p className="text-gray-600 mb-10 font-dmsans text-lg">
          {resource.description}
        </p>
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg font-dmsans">No items found matching "{searchTerm}"</p>
          </div>
        ) : (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={index}
                className="resource-item bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-[#f6ebff] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#340062] font-dmsans">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mt-1 font-dmsans">{item.description}</p>
                </div>
                <motion.a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#340062] font-medium flex items-center gap-1 whitespace-nowrap"
                  whileHover={{ x: 5 }}
                >
                  Visit <span>→</span>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ResourcePage;