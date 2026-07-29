import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import api from "./api/api";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SafetyMap from "./pages/SafetyMap";
import CommunityReports from "./pages/CommunityReports";
import Profile from "./pages/Profile";
import AuthorityDashboard from "./components/authority/AuthorityDashboard";

import Layout from "./Layouts/Layout";
import Home from "./pages/Home";
import AuthChoice from "./pages/AuthChoice";
import VerifyOtp from "./pages/VerifyOtp";

import ProtectedAuthorityRoute from "./components/authority/ProtectedAuthorityRoute";
import ProtectedUserRoute from "./components/authority/ProtectedUserRoute";

import { MapProvider } from "./context/MapContext";

function UserPage({ children }) {
  return (
    <ProtectedUserRoute>
      <Layout>{children}</Layout>
    </ProtectedUserRoute>
  );
}

function AuthorityPage({ children }) {
  return (
    <ProtectedAuthorityRoute>
      <Layout>{children}</Layout>
    </ProtectedAuthorityRoute>
  );
}

// 🔑 This keeps SafetyMap ALWAYS mounted (hidden when on other pages)
function AppRoutes() {
  const location = useLocation();
  const isSafetyMap = location.pathname === "/safety-map";

  // ✅ GLOBAL ANDROID SOS LISTENER (Triggered when screen-off voice phrase matches)
  useEffect(() => {
    window.onAndroidSOS = async (contact1, contact2, contact3) => {
      alert("🚨 HERGUARDIAN SOS ACTIVATED — Emergency contacts notified");

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const locationData = JSON.parse(localStorage.getItem("liveLocation") || "null");

      // Send SOS to Spring Boot Backend to dispatch WhatsApp/SMS
      try {
        await api.post("/sos/trigger", {
          email: user.email,
          fullName: user.fullName,
          emergencyContact1: contact1 || user.emergencyContact1,
          emergencyContact2: contact2 || user.emergencyContact2,
          emergencyContact3: contact3 || user.emergencyContact3,
          latitude: locationData?.lat || null,
          longitude: locationData?.lng || null,
        });
      } catch (err) {
        console.error("Failed to dispatch SOS to backend:", err);
      }
    };

    return () => {
      window.onAndroidSOS = null;
    };
  }, []);

  // Only show SafetyMap div when on that route, but keep it mounted forever
  const safetyMapElement = (
    <div style={{ display: isSafetyMap ? "block" : "none" }}>
      <UserPage>
        <SafetyMap />
      </UserPage>
    </div>
  );

  return (
    <>
      {/* Always-mounted SafetyMap */}
      {safetyMapElement}

      {/* Normal routes - but skip safety-map since it's handled above */}
      {!isSafetyMap && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthChoice />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          <Route
            path="/dashboard"
            element={
              <UserPage>
                <Dashboard />
              </UserPage>
            }
          />

          <Route
            path="/reports"
            element={
              <UserPage>
                <CommunityReports />
              </UserPage>
            }
          />

          <Route
            path="/profile"
            element={
              <UserPage>
                <Profile />
              </UserPage>
            }
          />

          <Route
            path="/authority"
            element={
              <AuthorityPage>
                <AuthorityDashboard />
              </AuthorityPage>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MapProvider>
        <AppRoutes />
      </MapProvider>
    </BrowserRouter>
  );
}