// src/pages/Exam.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  FiClock,
  FiFileText,
  FiGlobe,
  FiPlay,
  FiAward,
  FiAlertCircle,
  FiCheck,
  FiBookOpen,
  FiTarget,
} from "react-icons/fi";
import api from "../utils/api";
import toast from "react-hot-toast";

const Exam = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [selectedLang, setSelectedLang] = useState("uz");
  const [isLoading, setIsLoading] = useState(false);
  const [examStats, setExamStats] = useState(null);

  const languages = [
    { code: "uz", name: "O'zbekcha", flag: "🇺🇿" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "kiril", name: "Ўзбекча", flag: "🇺🇿" },
    { code: "kaa", name: "Qaraqalpaqsha", flag: "🇰🇿" },
  ];

  const examTypes = [
    {
      id: "20",
      title: "Tezkor Imtihon",
      questions: 20,
      duration: 20,
      description: "Tez va samarali bilimlaringizni sinab ko'ring",
      features: [
        "20 ta savol",
        "20 daqiqa vaqt",
        "Barcha mavzulardan",
        "Tezkor natija",
      ],
      icon: FiFileText,
      color: "blue",
      bgGradient: "from-blue-500 to-cyan-500",
      recommended: false,
    },
    {
      id: "50",
      title: "To'liq Imtihon",
      questions: 50,
      duration: 45,
      description: "Chuqur va keng qamrovli bilim darajangizni aniqlang",
      features: [
        "50 ta savol",
        "45 daqiqa vaqt",
        "Keng qamrovli",
        "Batafsil tahlil",
      ],
      icon: FiAward,
      color: "purple",
      bgGradient: "from-purple-500 to-pink-500",
      recommended: true,
    },
  ];

  useEffect(() => {
    // Check if user is PRO
    const isPro = user?.plan === "pro";
    const isExpired =
      user?.planExpiryDate && new Date(user.planExpiryDate) < new Date();

    if (!isPro || isExpired) {
      toast.error("Imtihon rejimi faqat PRO foydalanuvchilar uchun!");
      navigate("/plans");
    }
  }, [user, navigate]);

  const handleStartExam = async (questionCount) => {
    if (!selectedLang) {
      toast.error("Iltimos tilni tanlang!");
      return;
    }

    try {
      setIsLoading(true);

      const response = await api.post("/exam/create-exam", {
        language: selectedLang,
        questionCount: parseInt(questionCount),
      });

      const { examId } = response.data.data;

      // Navigate to exam test page
      navigate(`/exam-test/${examId}/0`);

      toast.success("Imtihon boshlandi! Omad!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Imtihon yaratishda xatolik"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg animate-pulse">
            <FiAward className="text-white" size={48} />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Imtihon Rejimi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional bilim darajangizni sinab ko'ring! Turli mavzulardan
            tasodifiy tanlangan savollar orqali o'z bilimlaringizni baholang
          </p>
        </div>

        {/* User Stats */}
        {user && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {user.totalTests || 0}
                </div>
                <div className="text-sm text-gray-600 mt-1">Jami testlar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {user.totalCorrect || 0}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  To'g'ri javoblar
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {user.totalWrong || 0}
                </div>
                <div className="text-sm text-gray-600 mt-1">Xato javoblar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {user.totalTests > 0
                    ? Math.round((user.totalCorrect / user.totalTests) * 100)
                    : 0}
                  %
                </div>
                <div className="text-sm text-gray-600 mt-1">Muvaffaqiyat</div>
              </div>
            </div>
          </div>
        )}

        {/* Language Selector */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 text-center mb-6">
            <FiGlobe className="inline mr-2" size={24} />
            Imtihon tilini tanlang
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedLang === lang.code
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
                }`}
              >
                <span className="text-lg mr-2">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Exam Types */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {examTypes.map((exam) => (
            <div
              key={exam.id}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                exam.recommended ? "ring-2 ring-yellow-400" : ""
              }`}
            >
              {exam.recommended && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                  Tavsiya etiladi
                </div>
              )}

              <div className={`h-2 bg-gradient-to-r ${exam.bgGradient}`}></div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${exam.bgGradient} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <exam.icon className="text-white" size={36} />
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                      {exam.questions}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      savol
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {exam.title}
                </h3>
                <p className="text-gray-600 mb-6">{exam.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {exam.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <FiCheck className="text-green-500" size={16} />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center space-x-2">
                      <FiClock className="text-blue-500" size={18} />
                      <div>
                        <div className="text-lg font-bold text-gray-800">
                          {exam.duration}
                        </div>
                        <div className="text-xs text-gray-500">daqiqa</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center space-x-2">
                      <FiTarget className="text-purple-500" size={18} />
                      <div>
                        <div className="text-lg font-bold text-gray-800">
                          {exam.questions * 5}
                        </div>
                        <div className="text-xs text-gray-500">max ball</div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleStartExam(exam.questions)}
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r ${exam.bgGradient} text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <FiPlay size={20} />
                  <span>{isLoading ? "Tayyorlanmoqda..." : "Boshlash"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
                <FiAlertCircle className="text-yellow-700" size={24} />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                Imtihon qoidalari
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span className="text-sm">
                      Imtihon boshlanishi bilan vaqt hisoblanadi
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span className="text-sm">
                      Har bir savolga faqat bir marta javob berish mumkin
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span className="text-sm">
                      Savollarni o'tkazib yuborishingiz mumkin
                    </span>
                  </li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span className="text-sm">
                      Vaqt tugashi bilan imtihon avtomatik yakunlanadi
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span className="text-sm">
                      Natijalar darhol ko'rsatiladi
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span className="text-sm">
                      Xatolar tahlili uchun saqlanadi
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
