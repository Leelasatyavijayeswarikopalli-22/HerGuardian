import { Navigate } from "react-router-dom";

export default function ProtectedUserRoute({ children }) {
    const token = localStorage.getItem("token");
    const role = String(localStorage.getItem("role") || "").toUpperCase();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (role === "AUTHORITY") {
        return <Navigate to="/authority" replace />;
    }

    if (role !== "USER") {
        return <Navigate to="/login" replace />;
    }

    return children;
}