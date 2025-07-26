// src/components/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../store/slices/authSlice";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Faqat authenticated bo'lib, user ma'lumoti yo'q bo'lsa profile yuklash
    if (isAuthenticated && !user && !isLoading) {
      dispatch(getProfile()).catch(() => {
        // Agar profile yuklashda xato bo'lsa, logout qilish
        // Bu yerda automatic logout bo'ladi
      });
    }
  }, [isAuthenticated, user, isLoading, dispatch]);

  // Token yo'q bo'lsa login sahifasiga yo'naltirish
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Profile yuklanayotgan bo'lsa loading ko'rsatish
  if (isAuthenticated && !user && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
