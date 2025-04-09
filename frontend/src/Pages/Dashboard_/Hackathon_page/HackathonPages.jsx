import React from "react";

// Miro board placeholder component
export const MiroBoard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Miro Board Integration</h2>
      <div className="bg-light-secondary2 rounded-xl shadow-md p-6">
        <p className="text-dark-secondary1 font-dmsans">
          Collaborate with your team using Miro's virtual whiteboard. Brainstorm ideas, plan your hackathon project, and visualize your solutions.
        </p>
        <div className="bg-gray-100 rounded-lg mt-4 p-4 h-96 flex items-center justify-center border border-gray-300">
          <p className="text-gray-500">Miro board would be embedded here</p>
        </div>
      </div>
    </div>
  );
};

// Excalidraw placeholder component
export const Excalidraw = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Excalidraw Canvas</h2>
      <div className="bg-light-secondary2 rounded-xl shadow-md p-6">
        <p className="text-dark-secondary1 font-dmsans">
          Sketch and design with your team using Excalidraw's collaborative drawing tool. Create wireframes, diagrams, and visual explanations for your project.
        </p>
        <div className="bg-gray-100 rounded-lg mt-4 p-4 h-96 flex items-center justify-center border border-gray-300">
          <p className="text-gray-500">Excalidraw canvas would be embedded here</p>
        </div>
      </div>
    </div>
  );
};

// Resources placeholder component
export const HackathonResources = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Hackathon Resources</h2>
      <div className="bg-light-secondary2 rounded-xl shadow-md p-6">
        <p className="text-dark-secondary1 font-dmsans">
          Access resources specifically curated for this hackathon. Find documentation, APIs, datasets, and tools to help your team succeed.
        </p>
        <ul className="mt-4 space-y-2">
          <li className="p-3 bg-white rounded-lg shadow-sm">API Documentation</li>
          <li className="p-3 bg-white rounded-lg shadow-sm">Sample Datasets</li>
          <li className="p-3 bg-white rounded-lg shadow-sm">Starter Code Templates</li>
          <li className="p-3 bg-white rounded-lg shadow-sm">Design Assets</li>
        </ul>
      </div>
    </div>
  );
};

// Project placeholder component
export const Project = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Project Management</h2>
      <div className="bg-light-secondary2 rounded-xl shadow-md p-6">
        <p className="text-dark-secondary1 font-dmsans">
          Track your hackathon project's progress. Define tasks, assign responsibilities, and monitor your team's advancement.
        </p>
        <div className="bg-gray-100 rounded-lg mt-4 p-4 h-96 flex items-center justify-center border border-gray-300">
          <p className="text-gray-500">Project management board would be displayed here</p>
        </div>
      </div>
    </div>
  );
};

// Submit placeholder component
export const Submit = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-dark-primary font-poppins">Submit Your Project</h2>
      <div className="bg-light-secondary2 rounded-xl shadow-md p-6">
        <p className="text-dark-secondary1 font-dmsans mb-4">
          Submit your final project for the hackathon. Include all required materials and documentation.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-dark-primary mb-1 font-poppins">Project Title</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-dark-secondary1 rounded-lg"
              placeholder="Enter your project title"
            />
          </div>
          <div>
            <label className="block text-dark-primary mb-1 font-poppins">Project Description</label>
            <textarea 
              className="w-full px-4 py-2 border border-dark-secondary1 rounded-lg h-32"
              placeholder="Describe your project and its features"
            ></textarea>
          </div>
          <div>
            <label className="block text-dark-primary mb-1 font-poppins">GitHub Repository URL</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-dark-secondary1 rounded-lg"
              placeholder="https://github.com/username/repository"
            />
          </div>
          <div>
            <label className="block text-dark-primary mb-1 font-poppins">Demo URL (Optional)</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-dark-secondary1 rounded-lg"
              placeholder="https://your-demo-site.com"
            />
          </div>
          <button 
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-dark-primary text-light-secondary2 rounded-lg hover:bg-dark-secondary1 transition-colors duration-300 font-poppins"
          >
            Submit Project
          </button>
        </form>
      </div>
    </div>
  );
};