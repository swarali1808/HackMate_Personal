import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Dashboard from "../../Pages/Landing/Landing_Dashboard/Dashboard.jsx";
import Sidebar from "../../Component/Sidebar.jsx";

const DashApp = () => {
  const location = useLocation();

  // Helper function to get the current page title
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === "/dashboard") {
      return "Dashboard";
    }
    
    const pathSegments = path.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    // For paths with dynamic params like /resources/:slug
    if (pathSegments.length > 2 && (lastSegment.includes(":") || !isNaN(lastSegment))) {
      // Get the parent route name
      const parentSegment = pathSegments[pathSegments.length - 2];
      return parentSegment.charAt(0).toUpperCase() + parentSegment.slice(1);
    }
    
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  // Determine if we should show the Dashboard component
  const showDashboard = location.pathname === "/dashboard";

  return (
    <div className="dash-container flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="routes flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
        </header>
        <main className="flex-1 overflow-y-auto">
          {showDashboard ? <Dashboard /> : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashApp;