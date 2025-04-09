// src/components/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../Component/Sidebar.jsx"; // Adjust path as needed

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-light-primary">
        {/* Sidebar will be rendered by SidebarProvider */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet /> {/* This renders the nested routes */}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;