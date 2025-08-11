import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiBookOpen,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { loginUser, clearError } from "../store/slices/authSlice";
import { loginAdmin, clearAdminError } from "../store/slices/adminSlice";
import toast from "react-hot-toast";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const isAdminMode = searchParams.get("admin") === "true";

  const { isLoading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const {
    isLoading: adminLoading,
    error: adminError,
    isAuthenticated: adminAuthenticated,
    admin,
  } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [redirectHandled, setRedirectHandled] = useState(false);

  useEffect(() => {
    // Redirect logic faqat bir marta ishlashi uchun
    if (!redirectHandled) {
      if (adminAuthenticated && admin) {
        setRedirectHandled(true);
        navigate("/admin/dashboard", { replace: true });
        return;
      }

      if (isAuthenticated && user?.phone) {
        setRedirectHandled(true);
        navigate("/", { replace: true });
        return;
      }
    }
  }, [
    adminAuthenticated,
    admin,
    isAuthenticated,
    user,
    navigate,
    redirectHandled,
  ]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (adminError) {
      toast.error(adminError);
      dispatch(clearAdminError());
    }
  }, [adminError, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "identifier" && !isAdminMode) {
      // Client uchun faqat raqamlar va 9 ta raqam
      const phoneValue = value.replace(/\D/g, "").slice(0, 9);
      setFormData((prev) => ({ ...prev, [name]: phoneValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if ((isAdminMode && adminLoading) || (!isAdminMode && isLoading)) {
      return;
    }

    if (isAdminMode) {
      // Admin login
      if (!formData.identifier || !formData.password) {
        toast.error("Username va password kiritilishi shart");
        return;
      }

      try {
        const result = await dispatch(
          loginAdmin({
            username: formData.identifier,
            password: formData.password,
          })
        ).unwrap();

        toast.success("Admin panelga muvaffaqiyatli kirildi!");
        // Redirect handled by useEffect
      } catch (error) {
        // Error is handled by useEffect
      }
    } else {
      // Client login
      if (formData.identifier.length !== 9) {
        toast.error(t("phoneValidation"));
        return;
      }

      if (formData.password.length < 6) {
        toast.error(t("passwordValidation"));
        return;
      }

      try {
        const result = await dispatch(
          loginUser({
            phone: formData.identifier,
            password: formData.password,
          })
        ).unwrap();

        toast.success(t("loginSuccess"));
        // Redirect handled by useEffect
      } catch (error) {
        // Error is handled by useEffect
      }
    }
  };

  const toggleMode = () => {
    setFormData({ identifier: "", password: "" });
    setRedirectHandled(false);
    if (isAdminMode) {
      navigate("/login", { replace: true });
    } else {
      navigate("/login?admin=true", { replace: true });
    }
  };

  const currentLoading = isAdminMode ? adminLoading : isLoading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div
            className={`w-16 h-16 ${
              isAdminMode
                ? "bg-gradient-to-r from-red-600 to-orange-600"
                : "bg-gradient-to-r from-blue-600 to-purple-600"
            } rounded-xl flex items-center justify-center mx-auto mb-4`}
          >
            {isAdminMode ? (
              <FiShield className="text-white" size={32} />
            ) : (
              <span className="text-white font-bold text-2xl">A</span>
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {isAdminMode ? "Admin Panel" : t("welcomeToIntalim")}
          </h2>
          <p className="mt-2 text-gray-600">
            {isAdminMode ? "Tizim boshqaruviga kirish" : t("welcomeDesc")}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center justify-center">
          <button
            onClick={toggleMode}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
            disabled={currentLoading}
          >
            {isAdminMode ? "Client sifatida kirish" : "Admin sifatida kirish"}
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Identifier Input */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {isAdminMode ? "Username" : t("phone")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {isAdminMode ? (
                    <FiUser className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                {!isAdminMode && (
                  <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">+998</span>
                  </div>
                )}
                <input
                  id="identifier"
                  name="identifier"
                  type={isAdminMode ? "text" : "tel"}
                  required
                  value={formData.identifier}
                  onChange={handleChange}
                  disabled={currentLoading}
                  className={`block w-full ${
                    isAdminMode ? "pl-10" : "pl-20"
                  } pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50`}
                  placeholder={isAdminMode ? "Admin username" : t("enterPhone")}
                />
              </div>
              {!isAdminMode && (
                <p className="mt-1 text-xs text-gray-500">{t("enterPhone")}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t("password")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={currentLoading}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50"
                  placeholder={
                    isAdminMode ? "Admin password" : t("enterPassword")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={currentLoading}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={currentLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                isAdminMode
                  ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 focus:ring-red-500"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                currentLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
            >
              {currentLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isAdminMode ? "Tekshirilmoqda..." : t("loading")}
                </div>
              ) : isAdminMode ? (
                "Admin Panelga Kirish"
              ) : (
                t("login")
              )}
            </button>
          </form>

          {/* Register Link - faqat client uchun */}
          {!isAdminMode && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Hisobingiz yo'qmi?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Ro'yxatdan o'ting
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Security Notice - faqat admin uchun */}
        {isAdminMode && (
          <div className="text-center">
            <p className="text-xs text-gray-500">
              🔒 Xavfsizlik uchun: Ushbu sahifa faqat admin foydalanuvchilar
              uchun mo'ljallangan
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
