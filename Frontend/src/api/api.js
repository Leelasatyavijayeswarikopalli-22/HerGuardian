import axios from "axios";

const api = axios.create({
  baseURL: "https://herguardian-production-2950.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const isAuthRequest =
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/register") ||
      config.url?.includes("/auth/verify") ||
      config.url?.includes("/auth/verify-login-otp") ||
      config.url?.includes("/auth/voice-phrase");

    if (token && !isAuthRequest) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;