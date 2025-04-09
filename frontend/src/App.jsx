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
import HackathonDetails from "../src/Pages/Dashboard_/Hackathon_page/HackathonDeatils.jsx"; // Ensure this file exists
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

// Error Boundary Component with improved logging
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console for debugging
    console.error("Error caught by ErrorBoundary:", error);
    console.error("Error Info:", errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-light-primary">
          <div className="text-center">
            <h2 className="text-2xl text-dark-primary font-poppins">
              Something went wrong.
            </h2>
            <p className="text-dark-secondary1 mt-2">
              Please try refreshing the page or contact support if the issue persists.
            </p>
            {/* Optional: Display error details in development */}
            {process.env.NODE_ENV === "development" && (
              <pre className="text-red-600 mt-4">
                {this.state.error?.toString()}
                <br />
                {this.state.errorInfo?.componentStack}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  const isAuthenticated = true; // Replace with real auth logic later

  return (
    <div className="min-h-screen max-w-screen m-0 p-0 overflow-x-hidden overflow-y-auto relative transition-all scroll-smooth">
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
        <Route path="/login" element={<ErrorBoundary><LoginPage /></ErrorBoundary>} />
        <Route path="/signup" element={<ErrorBoundary><SignUpPage /></ErrorBoundary>} />

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
          <Route path="hackathons" element={<ErrorBoundary><Hackathons /></ErrorBoundary>} />
          <Route path="resources" element={<ErrorBoundary><Resources /></ErrorBoundary>} />
          <Route path="resources/:slug" element={<ErrorBoundary><ResourcePage /></ErrorBoundary>} />
          <Route path="community" element={<ErrorBoundary><Community /></ErrorBoundary>} />
          <Route path="profile" element={<ErrorBoundary><Profile /></ErrorBoundary>} />
          <Route path="profile/view" element={<ErrorBoundary><ProfileView /></ErrorBoundary>} />
          <Route path="products" element={<div className="p-4">Products Page</div>} />
          <Route path="tags" element={<div className="p-4">Tags Page</div>} />
          <Route path="analytics" element={<div className="p-4">Analytics Page</div>} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<ErrorBoundary><NotFound /></ErrorBoundary>} />
      </Routes>
    </div>
  );
};

export default App;