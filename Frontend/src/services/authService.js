import api from "../api/api";

export const register = (data) =>
    api.post("/auth/register", data);

export const verifyOtp = (data) =>
    api.post("/auth/verify", data);

export const login = (data) =>
    api.post("/auth/login", data);

export const getProfile = (token) =>
    api.get("/user/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });