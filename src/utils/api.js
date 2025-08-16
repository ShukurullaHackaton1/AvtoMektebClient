// src/utils/api.js
import axios from "axios";
import store from "../store/store";
import { logout } from "../store/slices/authSlice";

export const baseUrl = "https://server.test-avtomaktab.uz";
const api = axios.create({
  baseURL: "https://server.test-avtomaktab.uz/api",
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
    // Faqat 401 va agar login/register sahifasida bo'lmasak
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/register") {
        // Redux store orqali logout qilish
        store.dispatch(logout());
        // Bu yerda hard reload qilmaslik kerak
        // React Router o'zi redirect qiladi
      }
    }
    return Promise.reject(error);
  }
);

export default api;
