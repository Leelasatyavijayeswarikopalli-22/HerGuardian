import { BrowserRouter, Routes, Route } from "react-router-dom";

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

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthChoice />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />

                {/* USER ONLY routes */}
                <Route
                    path="/dashboard"
                    element={
                        <UserPage>
                            <Dashboard />
                        </UserPage>
                    }
                />

                <Route
                    path="/safety-map"
                    element={
                        <UserPage>
                            <SafetyMap />
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

                {/* AUTHORITY ONLY route */}
                <Route
                    path="/authority"
                    element={
                        <AuthorityPage>
                            <AuthorityDashboard />
                        </AuthorityPage>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}