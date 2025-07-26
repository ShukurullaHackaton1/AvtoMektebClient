import axios from "axios";

export const baseUrl = "http://localhost:4521";
const api = axios.create({
  baseURL: "http://localhost:4521/api",
  headers: {
    "Content-Type": "application/json",
  },
});
// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
