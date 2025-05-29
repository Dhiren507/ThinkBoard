import axios from "axios";

// In production, use the environment variable or fallback to a default
const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:3000" 
  : import.meta.env.VITE_API_URL || "https://api.your-production-domain.com";

const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to automatically include auth token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;