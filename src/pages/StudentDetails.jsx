// src/pages/StudentDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiPhone,
  FiCalendar,
  FiTrendingUp,
  FiTarget,
  FiX,
  FiCheck,
  FiArrowLeft,
  FiCreditCard,
  FiActivity,
  FiBookOpen,
  FiCrop,
  FiClock,
  FiBarChart2,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import api from "../utils/api";

const StudentDetails = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchStudentDetails();
  }, [studentId]);

  const fetchStudentDetails = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await api.get(`/admin/users/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudentData(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("uz-UZ");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm";
  };

  const getSuccessRateColor = (rate) => {
    if (rate >= 80) return "text-green-600 bg-green-100";
    if (rate >= 60) return "text-blue-600 bg-blue-100";
    if (rate >= 40) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ma'lumotlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiX className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Xatolik</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Orqaga qaytish
          </button>
        </div>
      </div>
    );
  }

  const { user, payments, mistakes, stats } = studentData;

  // Chart data preparation
  const chartData = [
    { name: "To'g'ri", value: user.totalCorrect, color: "#10B981" },
    { name: "Xato", value: user.totalWrong, color: "#EF4444" },
  ];

  const tabs = [
    { id: "overview", label: "Umumiy", icon: FiUser },
    { id: "tests", label: "Testlar", icon: FiBookOpen },
    { id: "payments", label: "To'lovlar", icon: FiCreditCard },
    { id: "mistakes", label: "Xatolar", icon: FiTarget },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FiArrowLeft size={20} />
              <span>Admin Dashboard</span>
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <h1 className="text-xl font-bold text-gray-800">
              {user.firstname} {user.lastname} - Tafsilotlar
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Student Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
              {/* Avatar and Basic Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUser size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {user.firstname} {user.lastname}
                </h2>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getSuccessRateColor(
                      user.successRate
                    )}`}
                  >
                    {user.successRate}% muvaffaqiyat
                  </span>
                  {user.plan === "pro" && (
                    <FiCrop className="text-yellow-600" size={16} />
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FiPhone className="text-gray-500" size={18} />
                  <div>
                    <div className="text-sm text-gray-500">Telefon</div>
                    <div className="font-medium text-gray-800">
                      +998 {user.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FiCalendar className="text-gray-500" size={18} />
                  <div>
                    <div className="text-sm text-gray-500">
                      Ro'yxatdan o'tgan
                    </div>
                    <div className="font-medium text-gray-800">
                      {formatDate(user.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FiCrop className="text-gray-500" size={18} />
                  <div>
                    <div className="text-sm text-gray-500">Plan</div>
                    <div className="font-medium text-gray-800 capitalize">
                      {user.plan} Plan
                      {user.plan === "pro" && user.planExpiryDate && (
                        <div className="text-xs text-gray-500">
                          {formatDate(user.planExpiryDate)} gacha
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-700">
                    {user.totalTests}
                  </div>
                  <div className="text-blue-600 text-sm">Jami testlar</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-700">
                    {user.totalCorrect}
                  </div>
                  <div className="text-green-600 text-sm">To'g'ri javoblar</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-xl font-bold text-red-700">
                    {user.totalWrong}
                  </div>
                  <div className="text-red-600 text-sm">Noto'g'ri javoblar</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-xl font-bold text-yellow-700">
                    {stats.totalPayments}
                  </div>
                  <div className="text-yellow-600 text-sm">To'lovlar</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <tab.icon size={16} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {/* Success Rate Chart */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Test natijalari taqsimoti
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                              <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {chartData.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                  />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="flex flex-col justify-center space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Jami testlar:</span>
                            <span className="font-bold text-gray-800">
                              {user.totalTests}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">
                              To'g'ri javoblar:
                            </span>
                            <span className="font-bold text-green-600">
                              {user.totalCorrect}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">
                              Noto'g'ri javoblar:
                            </span>
                            <span className="font-bold text-red-600">
                              {user.totalWrong}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Muvaffaqiyat:</span>
                            <span
                              className={`font-bold ${
                                user.successRate >= 80
                                  ? "text-green-600"
                                  : user.successRate >= 60
                                  ? "text-blue-600"
                                  : user.successRate >= 40
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {user.successRate}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Plan Information */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Plan ma'lumotlari
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <FiCrop className="text-yellow-600" size={20} />
                          <div>
                            <div className="font-medium text-gray-800">
                              {user.plan.toUpperCase()} Plan
                            </div>
                            <div className="text-sm text-gray-600">
                              Joriy plan
                            </div>
                          </div>
                        </div>
                        {user.plan === "pro" && user.planExpiryDate && (
                          <div className="flex items-center space-x-3">
                            <FiClock className="text-blue-600" size={20} />
                            <div>
                              <div className="font-medium text-gray-800">
                                {formatDate(user.planExpiryDate)}
                              </div>
                              <div className="text-sm text-gray-600">
                                Tugash sanasi
                              </div>
                            </div>
                          </div>
                        )}
                        {user.plan === "free" && (
                          <div className="flex items-center space-x-3">
                            <FiActivity className="text-gray-600" size={20} />
                            <div>
                              <div className="font-medium text-gray-800">
                                {user.dailyTestsUsed}/20
                              </div>
                              <div className="text-sm text-gray-600">
                                Kunlik testlar
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tests Tab */}
                {activeTab === "tests" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-700">
                          {user.totalTests}
                        </div>
                        <div className="text-blue-600 text-sm">
                          Jami testlar
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-700">
                          {user.totalCorrect}
                        </div>
                        <div className="text-green-600 text-sm">
                          To'g'ri javoblar
                        </div>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-700">
                          {user.totalWrong}
                        </div>
                        <div className="text-red-600 text-sm">
                          Xato javoblar
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Test faoliyati
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FiBarChart2 className="text-blue-600" size={20} />
                            <div>
                              <div className="font-medium text-gray-800">
                                Muvaffaqiyat darajasi
                              </div>
                              <div className="text-sm text-gray-600">
                                Umumiy natija
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`text-xl font-bold ${
                                user.successRate >= 80
                                  ? "text-green-600"
                                  : user.successRate >= 60
                                  ? "text-blue-600"
                                  : "text-yellow-600"
                              }`}
                            >
                              {user.successRate}%
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FiTarget className="text-green-600" size={20} />
                            <div>
                              <div className="font-medium text-gray-800">
                                O'rtacha to'g'ri javoblar
                              </div>
                              <div className="text-sm text-gray-600">
                                Test uchun
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-600">
                              {user.totalTests > 0
                                ? Math.round(
                                    user.totalCorrect / user.totalTests
                                  )
                                : 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payments Tab */}
                {activeTab === "payments" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-700">
                          {formatCurrency(stats.totalPaidAmount)}
                        </div>
                        <div className="text-green-600 text-sm">
                          Jami to'lovlar
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-700">
                          {stats.totalPayments}
                        </div>
                        <div className="text-blue-600 text-sm">
                          To'lovlar soni
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">
                          To'lovlar tarixi
                        </h3>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {payments.length > 0 ? (
                          payments.map((payment) => (
                            <div
                              key={payment._id}
                              className="p-6 flex items-center justify-between"
                            >
                              <div className="flex items-center space-x-4">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    payment.status === "paid"
                                      ? "bg-green-500"
                                      : payment.status === "pending"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                  }`}
                                ></div>
                                <div>
                                  <div className="font-medium text-gray-800">
                                    {payment.description}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {formatDate(payment.createdAt)}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-gray-800">
                                  {formatCurrency(payment.amount)}
                                </div>
                                <div
                                  className={`text-sm capitalize ${
                                    payment.status === "paid"
                                      ? "text-green-600"
                                      : payment.status === "pending"
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {payment.status}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-500">
                            Hech qanday to'lov topilmadi
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Mistakes Tab */}
                {activeTab === "mistakes" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-red-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-700">
                          {stats.totalMistakes}
                        </div>
                        <div className="text-red-600 text-sm">Jami xatolar</div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-700">
                          {user.totalTests > 0
                            ? Math.round(
                                (stats.totalMistakes / user.totalTests) * 100
                              ) / 100
                            : 0}
                        </div>
                        <div className="text-yellow-600 text-sm">
                          O'rtacha xato (test uchun)
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Oxirgi xatolar
                        </h3>
                      </div>
                      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                        {mistakes.length > 0 ? (
                          mistakes.slice(0, 10).map((mistake, index) => (
                            <div key={index} className="p-6">
                              <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <FiX className="text-red-600" size={16} />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-gray-800 mb-1">
                                    Template {mistake.templateId} -{" "}
                                    {mistake.templateLang}
                                  </div>
                                  <div className="text-sm text-gray-600 mb-2">
                                    {formatDate(mistake.createdAt)}
                                  </div>
                                  <div className="text-sm text-red-600">
                                    Savol ID: {mistake.answerId}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-500">
                            Hech qanday xato topilmadi
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
