import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  FiHome,
  FiFileText,
  FiAlertCircle,
  FiUser,
  FiLogOut,
  FiGlobe,
  FiMenu,
  FiX,
  FiCrop,
} from "react-icons/fi";
import { logout } from "../../store/slices/authSlice";
import api from "../../utils/api";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [userPlan, setUserPlan] = useState(null);

  const languages = [
    { code: "uz", name: "O'zbekcha", flag: "🇺🇿" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "uz_kiril", name: "Ўзбекча", flag: "🇺🇿" },
    { code: "kaa", name: "Qaraqalpaqsha", flag: "🇰aa" },
  ];

  // User plan ma'lumotlarini olish
  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const response = await api.get("/templates/user-plan");
        setUserPlan(response.data.data);
      } catch (error) {
        console.error("User plan fetch error:", error);
      }
    };

    if (user) {
      fetchUserPlan();
    }
  }, [user]);

  // Base navigation items
  const baseNavItems = [
    { path: "/", label: t("home"), icon: FiHome },
    { path: "/templates", label: t("templates"), icon: FiFileText },
    { path: "/mistakes", label: t("mistakes"), icon: FiAlertCircle },
    { path: "/profile", label: t("profile"), icon: FiUser },
  ];

  // Exam item faqat PRO plan uchun
  const examItem = {
    path: "/exam",
    label: "Imtihon",
    icon: FiCrop,
    isPro: true,
  };

  // Final nav items - PRO bo'lsa exam qo'shish
  const navItems =
    user?.plan === "pro"
      ? [
          baseNavItems[0], // Home
          baseNavItems[1], // Templates
          examItem, // Exam (PRO only)
          baseNavItems[2], // Mistakes
          baseNavItems[3], // Profile
        ]
      : baseNavItems;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  const isPro = user?.plan === "pro";
  const isExpired =
    user?.planExpiryDate && new Date(user.planExpiryDate) < new Date();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-gray-800">AvtoTest</span>
            {isPro && !isExpired && (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                PRO
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon, isPro: isProItem }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === path
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                } ${isProItem ? "relative" : ""}`}
              >
                <Icon size={18} />
                <span className="font-medium">{label}</span>
                {isProItem && (
                  <FiCrop size={14} className="text-yellow-600 ml-1" />
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Plan info for FREE users */}
            {user?.plan === "free" && userPlan && (
              <div className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                Bugun: {userPlan.dailyUsed}/20
              </div>
            )}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              >
                <FiGlobe size={18} />
                <span className="text-sm font-medium">
                  {languages.find((lang) => lang.code === i18n.language)?.flag}
                </span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-3 ${
                        i18n.language === lang.code
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-800">
                    {user?.firstname} {user?.lastname}
                  </p>
                  {isPro && !isExpired && (
                    <FiCrop className="text-yellow-600" size={14} />
                  )}
                </div>
                <p className="text-xs text-gray-500">{user?.phone}</p>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <FiLogOut size={18} />
                <span className="text-sm font-medium">{t("logout")}</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navItems.map(({ path, label, icon: Icon, isPro: isProItem }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                    location.pathname === path
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                  {isProItem && (
                    <FiCrop size={14} className="text-yellow-600 ml-auto" />
                  )}
                </Link>
              ))}

              <div className="border-t border-gray-200 pt-4 mt-4">
                {/* Plan info for mobile */}
                {user?.plan === "free" && userPlan && (
                  <div className="px-3 py-2 mb-2">
                    <div className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full inline-block">
                      Bugungi testlar: {userPlan.dailyUsed}/20
                    </div>
                  </div>
                )}

                <div className="px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-800">
                      {user?.firstname} {user?.lastname}
                    </p>
                    {isPro && !isExpired && (
                      <FiCrop className="text-yellow-600" size={14} />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{user?.phone}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
                >
                  <FiLogOut size={20} />
                  <span className="font-medium">{t("logout")}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Close language dropdown when clicking outside */}
      {isLangMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsLangMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
