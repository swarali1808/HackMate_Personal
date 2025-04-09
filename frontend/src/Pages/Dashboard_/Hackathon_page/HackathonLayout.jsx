import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import HackathonSidebar from "../../../Component/HackathonSidebar.jsx"; // Adjust the path as needed

const HackathonLayout = () => {
  const location = useLocation();
  const { id } = useParams();

  // Helper function to get the current page title
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === `/dashboard/hackathon/${id}`) {
      return "Hackathon Overview";
    }
    
    const pathSegments = path.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  return (
    <div className="dash-container flex h-screen bg-gray-100">
      {/* Hackathon-specific Sidebar */}
      <HackathonSidebar hackathonId={id} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
        </header>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HackathonLayout;