import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import DashApp from "./Pages/Dashboard_/DashApp.jsx";
import LoginPage from "./Pages/Login_signup/LoginPage.jsx";
import SignUpPage from "./Pages/Login_signup/SignUpPage.jsx";
import NotFound from "./Pages/NotFound Page/NotFound.jsx";
import Home from "./Pages/Landing/Home.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

// Dashboard components
import Hackathons from "./Pages/Dashboard_/Hackathon_page/Hackathons.jsx";
import HackathonDetails from "./Pages/Dashboard_/Hackathon_page/HackathonDeatils.jsx";
import Resources from "./Pages/Dashboard_/Resources_page/Resources.jsx";
import ResourcePage from "./Pages/Dashboard_/Resources_page/ResourcePage.jsx";
import Community from "./Pages/Dashboard_/Community_page/Community.jsx";
import Profile from "./Pages/Dashboard_/Profile/Profile.jsx";
import ProfileView from "./Pages/Dashboard_/Profile/ProfileView.jsx";

// Hackathon-specific components
import HackathonLayout from "./Pages/Dashboard_/Hackathon_page/HackathonLayout.jsx";
import { 
  MiroBoard, 
  Excalidraw, 
  HackathonResources, 
  Project, 
  Submit 
} from "./Pages/Dashboard_/Hackathon_page/HackathonPages.jsx";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-light-primary">
          <h2 className="text-2xl text-dark-primary font-poppins">
            Something went wrong. Please try again later.
          </h2>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  // Mock authentication (replace with real auth logic)
  const isAuthenticated = true;

  return (
    <div className="min-h-screen max-w-screen m-0 p-0 overflow-x-hidden overflow-y-auto relative transition-all scroll-smooth">
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Hackathon special routes with custom sidebar */}
        <Route 
          path="/dashboard/hackathon/:id/*" 
          element={isAuthenticated ? <HackathonLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<ErrorBoundary><HackathonDetails /></ErrorBoundary>} />
          <Route path="miro" element={<ErrorBoundary><MiroBoard /></ErrorBoundary>} />
          <Route path="draw" element={<ErrorBoundary><Excalidraw /></ErrorBoundary>} />
          <Route path="resources" element={<ErrorBoundary><HackathonResources /></ErrorBoundary>} />
          <Route path="project" element={<ErrorBoundary><Project /></ErrorBoundary>} />
          <Route path="submit" element={<ErrorBoundary><Submit /></ErrorBoundary>} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={isAuthenticated ? <DashApp /> : <Navigate to="/login" />}
        >
          {/* These routes will be rendered inside the <Outlet /> in DashApp */}
          <Route path="hackathons" element={<ErrorBoundary><Hackathons /></ErrorBoundary>} />
          <Route path="resources" element={<ErrorBoundary><Resources /></ErrorBoundary>} />
          <Route path="resources/:slug" element={<ErrorBoundary><ResourcePage /></ErrorBoundary>} />
          <Route path="community" element={<ErrorBoundary><Community /></ErrorBoundary>} />
          <Route path="profile" element={<ErrorBoundary><Profile /></ErrorBoundary>} />
          <Route path="profile/view" element={<ErrorBoundary><ProfileView /></ErrorBoundary>} />
          
          {/* Placeholder routes for other sidebar items */}
          <Route path="products" element={<div className="p-4">Products Page</div>} />
          <Route path="tags" element={<div className="p-4">Tags Page</div>} />
          <Route path="analytics" element={<div className="p-4">Analytics Page</div>} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;