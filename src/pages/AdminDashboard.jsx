import axios from "../utils/api";
import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiCreditCard,
  FiTrendingUp,
  FiDollarSign,
  FiCalendar,
  FiCrop,
  FiUser,
  FiBarChart2,
  FiActivity,
  FiEye,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Real API dan ma'lumot olish
  useEffect(() => {
    fetchDashboardData();
    fetchAnalytics();
  }, [selectedPeriod]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("Admin token topilmadi");
      }

      const { data } = await axios.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);

      setDashboardData(data.data);
    } catch (error) {
      console.error("Dashboard error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      // Revenue analytics
      const revenueResponse = await fetch(
        `/api/admin/analytics/revenue?period=${selectedPeriod}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (revenueResponse.ok) {
        const revenueResult = await revenueResponse.json();
        setRevenueData(revenueResult.data || []);
      }

      // User growth analytics
      const userGrowthResponse = await fetch(
        `/api/admin/analytics/user-growth?period=${selectedPeriod}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (userGrowthResponse.ok) {
        const userGrowthResult = await userGrowthResponse.json();
        setUserGrowthData(userGrowthResult.data || []);
      }
    } catch (error) {
      console.error("Analytics error:", error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("uz-UZ");
  };

  const getSuccessRate = (correct, total) => {
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  // Colors for charts
  const chartColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Dashboard yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUsers className="text-red-600" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Xatolik yuz berdi
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Qayta urinish
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Ma'lumot topilmadi</p>
      </div>
    );
  }

  // Pie chart data for plan distribution
  const planDistribution = [
    { name: "FREE", value: dashboardData.overview.freeUsers, color: "#6B7280" },
    { name: "PRO", value: dashboardData.overview.proUsers, color: "#F59E0B" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Tizim statistikasi va boshqaruv
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="week">So'nggi hafta</option>
                <option value="month">So'nggi oy</option>
                <option value="year">So'nggi yil</option>
              </select>
              <button
                onClick={fetchDashboardData}
                className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Yangilash
              </button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiUsers className="text-blue-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Jami foydalanuvchilar
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {dashboardData.overview.totalUsers.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  Bugun: +{dashboardData.overview.todayUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FiCrop className="text-yellow-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  PRO foydalanuvchilar
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {dashboardData.overview.proUsers}
                </p>
                <p className="text-xs text-gray-500">
                  {dashboardData.overview.totalUsers > 0
                    ? Math.round(
                        (dashboardData.overview.proUsers /
                          dashboardData.overview.totalUsers) *
                          100
                      )
                    : 0}
                  % umumiy
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiDollarSign className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Bugungi daromad
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {formatCurrency(dashboardData.overview.todayRevenue)}
                </p>
                <p className="text-xs text-gray-500">
                  {dashboardData.overview.todayPayments} ta to'lov
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="text-purple-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Oylik daromad
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {formatCurrency(dashboardData.overview.monthlyRevenue)}
                </p>
                <p className="text-xs text-gray-500">
                  Haftalik:{" "}
                  {formatCurrency(dashboardData.overview.weeklyRevenue)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Daromad dinamikasi
              </h3>
              <FiBarChart2 className="text-gray-400" size={20} />
            </div>
            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="_id"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      try {
                        return new Date(value).toLocaleDateString("uz-UZ", {
                          month: "short",
                          day: "numeric",
                        });
                      } catch {
                        return value;
                      }
                    }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      formatCurrency(value),
                      name === "revenue" ? "Daromad" : "Tranzaksiyalar",
                    ]}
                    labelFormatter={(value) => {
                      try {
                        return formatDate(value);
                      } catch {
                        return value;
                      }
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                Ma'lumot topilmadi
              </div>
            )}
          </div>

          {/* User Growth Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Foydalanuvchilar o'sishi
              </h3>
              <FiActivity className="text-gray-400" size={20} />
            </div>
            {userGrowthData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="_id"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      try {
                        return new Date(value).toLocaleDateString("uz-UZ", {
                          month: "short",
                          day: "numeric",
                        });
                      } catch {
                        return value;
                      }
                    }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value, name) => [
                      value,
                      name === "newUsers"
                        ? "Yangi foydalanuvchilar"
                        : "PRO foydalanuvchilar",
                    ]}
                    labelFormatter={(value) => {
                      try {
                        return formatDate(value);
                      } catch {
                        return value;
                      }
                    }}
                  />
                  <Bar
                    dataKey="newUsers"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="proUsers"
                    fill="#F59E0B"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                Ma'lumot topilmadi
              </div>
            )}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Plan Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Plan taqsimoti
            </h3>
            {planDistribution.some((item) => item.value > 0) ? (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={planDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {planDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [value, "Foydalanuvchilar"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4 mt-4">
                  {planDistribution.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-sm text-gray-600">
                        {entry.name} ({entry.value})
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-48 flex items-center justify-center text-gray-500">
                Ma'lumot topilmadi
              </div>
            )}
          </div>

          {/* Top Users */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Top foydalanuvchilar
            </h3>
            <div className="space-y-4">
              {dashboardData.topUsers && dashboardData.topUsers.length > 0 ? (
                dashboardData.topUsers.slice(0, 5).map((user, index) => (
                  <Link
                    key={user._id}
                    to={`/admin/students/${user._id}`}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-gray-600">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {user.firstname} {user.lastname}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {user.totalTests} test
                          </span>
                          {user.plan === "pro" && (
                            <FiCrop className="text-yellow-500" size={12} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">
                        {getSuccessRate(user.totalCorrect, user.totalTests)}%
                      </p>
                      <FiEye className="text-gray-400 ml-2" size={14} />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Foydalanuvchilar topilmadi
                </div>
              )}
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Oxirgi to'lovlar
            </h3>
            <div className="space-y-4">
              {dashboardData.recentPayments &&
              dashboardData.recentPayments.length > 0 ? (
                dashboardData.recentPayments.slice(0, 5).map((payment) => (
                  <div
                    key={payment._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <FiCreditCard className="text-green-600" size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {payment.userId?.firstname} {payment.userId?.lastname}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(payment.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">
                        {formatCurrency(payment.amount)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  To'lovlar topilmadi
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
