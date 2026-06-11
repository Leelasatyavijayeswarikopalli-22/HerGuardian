import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import SafetyMap from "./pages/SafetyMap";
import CommunityReports from "./pages/CommunityReports";
import MobilityReport from "./pages/MobilityReport";
import Profile from "./pages/Profile";

import Layout from "./layouts/Layout";
import Home from "./pages/Home";
export default function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/safety-map"
          element={
            <Layout>
              <SafetyMap />
            </Layout>
          }
        />

        <Route
          path="/reports"
          element={
            <Layout>
              <CommunityReports />
            </Layout>
          }
        />

        <Route
          path="/mobility"
          element={
            <Layout>
              <MobilityReport />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}