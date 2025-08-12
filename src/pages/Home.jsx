import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  FiFileText,
  FiAlertCircle,
  FiUser,
  FiPlay,
  FiTrendingUp,
  FiBook,
  FiTarget,
  FiArrowRight,
  FiZap,
  FiShield,
  FiBarChart,
  FiGlobe,
  FiCheck,
  FiStar,
  FiCrop,
  FiCreditCard,
} from "react-icons/fi";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [selectedPlan, setSelectedPlan] = useState("free");

  const cards = [
    {
      title: t("viewTemplates"),
      description: t("testDescription"),
      icon: FiFileText,
      link: "/templates",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: t("checkMistakes"),
      description: t("mistakesDescription"),
      icon: FiAlertCircle,
      link: "/mistakes",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
    },
    {
      title: t("viewProfile"),
      description: t("profileDescription"),
      icon: FiUser,
      link: "/profile",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
  ];

  const features = [
    {
      icon: FiTarget,
      title: t("featuredTitle1"),
      description: t("featuredDesc1"),
    },
    {
      icon: FiTrendingUp,
      title: t("featuredTitle2"),
      description: t("featuredDesc2"),
    },
    {
      icon: FiBook,
      title: t("featuredTitle3"),
      description: t("featuredDesc3"),
    },
  ];

  const handlePlanAction = (planType) => {
    if (!isAuthenticated) {
      // Register sahifasiga yo'naltirish
      navigate("/register");
      return;
    }

    if (planType === "free") {
      // Templates sahifasiga o'tish
      navigate("/templates");
    } else if (planType === "pro") {
      // To'lov sahifasiga o'tish
      navigate("/profile"); // Profile da to'lov qismi bor
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            {t("welcome")}
          </h1>
          <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 blur-xl"></div>
        </div>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {t("homeDescription")}
        </p>
      </div>

      {/* Plans Section */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Test Planlarini Tanlang
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            O'zingizga mos plan tanlang va test yechishni boshlang
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* FREE Plan */}
          <div
            className={`bg-white rounded-2xl p-8 border-2 transition-all duration-300 ${
              selectedPlan === "free"
                ? "border-blue-500 shadow-lg transform scale-105"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedPlan("free")}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiStar className="text-gray-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                FREE Plan
              </h3>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                0 <span className="text-lg text-gray-500">so'm</span>
              </div>
              <p className="text-gray-600">
                Boshlang'ich foydalanuvchilar uchun
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <FiCheck className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-gray-700">20 ta test limiti</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiCheck className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-gray-700">Barcha tillar</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiCheck className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-gray-700">Xatolar tahlili</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiCheck className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-gray-700">Statistika</span>
              </div>
            </div>

            <button
              onClick={() => handlePlanAction("free")}
              className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
            >
              <FiPlay size={18} />
              <span>
                {isAuthenticated ? "Testni Boshlash" : "Ro'yxatdan O'tish"}
              </span>
            </button>
          </div>

          {/* PRO Plan */}
          <div
            className={`bg-white rounded-2xl p-8 border-2 transition-all duration-300 relative ${
              selectedPlan === "pro"
                ? "border-yellow-500 shadow-lg transform scale-105"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedPlan("pro")}
          >
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Mashhur
              </span>
            </div>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCrop className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                PRO Plan
              </h3>
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                35,000 <span className="text-lg text-gray-500">so'm/oy</span>
              </div>
              <p className="text-gray-600">
                Professional foydalanuvchilar uchun
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <FiCheck className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-gray-700 font-medium">
                  Cheksiz testlar
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FiCheck className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-gray-700">Barcha tillar</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiCheck className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-gray-700">Imtihon rejimi</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiCheck className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-gray-700">Batafsil tahlil</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiCheck className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-gray-700">
                  Premium qo'llab-quvvatlash
                </span>
              </div>
            </div>

            <button
              onClick={() => handlePlanAction("pro")}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <FiCreditCard size={18} />
              <span>
                {isAuthenticated ? "PRO ga O'tish" : "Ro'yxatdan O'tish"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions - FAQAT authenticated foydalanuvchilar uchun */}
      {isAuthenticated && (
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link key={index} to={card.link} className="group block">
                <div
                  className={`${card.bgColor} rounded-2xl p-8 border border-gray-100 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 h-full`}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon size={32} className="text-white" />
                  </div>

                  <h3 className={`text-2xl font-bold ${card.textColor} mb-4`}>
                    {card.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {card.description}
                  </p>

                  <div className="mt-6 flex items-center text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
                    <span>{t("viewMore")}</span>
                    <FiArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <feature.icon size={32} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <FiBook size={24} className="mb-2" />
            <div className="text-4xl font-bold mb-2">1000+</div>
            <div className="text-blue-100">{t("testQuestions")}</div>
          </div>
          <div className="flex flex-col items-center">
            <FiGlobe size={24} className="mb-2" />
            <div className="text-4xl font-bold mb-2">5</div>
            <div className="text-blue-100">{t("languageVariants")}</div>
          </div>
          <div className="flex flex-col items-center">
            <FiZap size={24} className="mb-2" />
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">{t("availability")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
