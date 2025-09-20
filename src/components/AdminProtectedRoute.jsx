// src/components/AdminProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProfile } from "../store/slices/adminSlice";
import { useTranslation } from "react-i18next";

const AdminProtectedRoute = ({ children }) => {
  const {
    isAuthenticated: adminAuth,
    admin,
    isLoading: adminLoading,
  } = useSelector((state) => state.admin);
  const { isAuthenticated: userAuth, user } = useSelector(
    (state) => state.auth
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const [profileChecked, setProfileChecked] = useState(false);

  useEffect(() => {
    const checkAdminProfile = async () => {
      // Admin token bor lekin admin ma'lumotlari yo'q bo'lsa
      if (adminAuth && !admin && !adminLoading && !profileChecked) {
        try {
          setProfileChecked(true);
          await dispatch(getAdminProfile()).unwrap();
        } catch (error) {
          console.error("Admin profile fetch error:", error);
          setProfileChecked(true);
        }
      } else if (!adminAuth) {
        setProfileChecked(true);
      }
    };

    checkAdminProfile();
  }, [adminAuth, admin, adminLoading, profileChecked, dispatch]);

  // Agar user token bor (phone bilan kirgan user) - admin sahifaga ruxsat yo'q
  if (userAuth && user?.phone) {
    return <Navigate to="/" replace />;
  }

  // Admin token yo'q bo'lsa login sahifasiga yo'naltirish
  if (!adminAuth) {
    return (
      <Navigate to="/login?admin=true" state={{ from: location }} replace />
    );
  }

  // Profile tekshirilmagan bo'lsa kutish
  if (!profileChecked || (adminAuth && !admin && adminLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-600">{t("adminPanelLoading")}</p>
        </div>
      </div>
    );
  }

  // Admin ma'lumotlari mavjud bo'lsa sahifani ko'rsatish
  if (admin) {
    return children;
  }

  // Agar admin ma'lumotlari yuklanmagan bo'lsa login sahifasiga yo'naltirish
  return <Navigate to="/login?admin=true" replace />;
};

export default AdminProtectedRoute;
