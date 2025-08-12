// src/components/OptionalProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";

const OptionalProtectedRoute = ({ children, requireAuth = false }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Agar auth talab qilinsa va user login qilmagan bo'lsa
  if (requireAuth && !isAuthenticated) {
    // Login sahifasiga yo'naltirish o'rniga, login modal yoki formani ko'rsatish
    return children; // Yoki login modal component
  }

  return children;
};

export default OptionalProtectedRoute;
