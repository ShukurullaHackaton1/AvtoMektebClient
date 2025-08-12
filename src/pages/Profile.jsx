import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  FiUser,
  FiPhone,
  FiActivity,
  FiTarget,
  FiTrendingUp,
  FiAward,
  FiCalendar,
  FiBriefcase,
  FiBarChart2,
  FiCrop,
  FiCheck,
  FiX,
  FiCreditCard,
  FiCode,
  FiExternalLink,
  FiClock,
} from "react-icons/fi";
import { getProfile, getStats } from "../store/slices/authSlice";
import api from "../utils/api";
import toast from "react-hot-toast";

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, stats, isLoading } = useSelector((state) => state.auth);
  const [userPlan, setUserPlan] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loadingPayment, setLoadingPayment] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getStats());
    fetchUserPlan();
    fetchPaymentHistory();
  }, [dispatch]);

  const fetchUserPlan = async () => {
    try {
      const response = await api.get("/templates/user-plan");
      setUserPlan(response.data.data);
    } catch (error) {
      console.error("User plan fetch error:", error);
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const response = await api.get("/payments/payment-history");
      setPaymentHistory(response.data.data);
    } catch (error) {
      console.error("Payment history fetch error:", error);
    }
  };

  const createPayment = async () => {
    try {
      setLoadingPayment(true);
      const response = await api.post("/payments/create-payment");
      setPaymentData(response.data.data);
      setShowPaymentModal(true);
    } catch (error) {
      toast.error(error.response?.data?.message || t("error"));
    } finally {
      setLoadingPayment(false);
    }
  };

  const checkPaymentStatus = async (paymentId) => {
    try {
      const response = await api.get(`/payments/payment-status/${paymentId}`);
      if (response.data.data.status === "paid") {
        toast.success(t("paymentSuccessful"));
        setShowPaymentModal(false);
        dispatch(getProfile());
        fetchUserPlan();
        fetchPaymentHistory();
      }
    } catch (error) {
      console.error("Payment status check error:", error);
    }
  };

  const getRatingLevel = (successRate) => {
    if (successRate >= 90)
      return {
        level: t("specialist"),
        color: "text-purple-600",
        bg: "bg-purple-100",
        icon: FiAward,
      };
    if (successRate >= 75)
      return {
        level: t("skilled"),
        color: "text-blue-600",
        bg: "bg-blue-100",
        icon: FiTarget,
      };
    if (successRate >= 60)
      return {
        level: t("good"),
        color: "text-green-600",
        bg: "bg-green-100",
        icon: FiTrendingUp,
      };
    if (successRate >= 40)
      return {
        level: t("average"),
        color: "text-yellow-600",
        bg: "bg-yellow-100",
        icon: FiBarChart2,
      };
    return {
      level: t("beginner"),
      color: "text-gray-600",
      bg: "bg-gray-100",
      icon: FiUser,
    };
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return "from-purple-500 to-purple-600";
    if (percentage >= 75) return "from-blue-500 to-blue-600";
    if (percentage >= 60) return "from-green-500 to-green-600";
    if (percentage >= 40) return "from-yellow-500 to-yellow-600";
    return "from-gray-500 to-gray-600";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">{t("loading")}</p>
        </div>
      </div>
    );
  }

  const rating = stats ? getRatingLevel(stats.successRate) : getRatingLevel(0);
  const isPro = user?.plan === "pro";
  const isExpired =
    user?.planExpiryDate && new Date(user.planExpiryDate) < new Date();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          {t("profileTitle")}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{t("personalInfo")}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="text-center space-y-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <FiUser size={40} className="text-white" />
                </div>
                <div
                  className={`absolute -bottom-2 -right-2 w-8 h-8 ${rating.bg} rounded-full flex items-center justify-center text-sm`}
                >
                  <rating.icon size={16} className={rating.color} />
                </div>
                {isPro && !isExpired && (
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FiCrop size={16} className="text-yellow-600" />
                  </div>
                )}
              </div>

              {/* Name */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {user?.firstname} {user?.lastname}
                </h2>
                <div
                  className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${rating.bg} ${rating.color} mt-2`}
                >
                  <rating.icon size={14} />
                  <span>{rating.level}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FiUser className="text-gray-500" size={18} />
                  <div>
                    <div className="text-sm text-gray-500">
                      {t("firstName")}
                    </div>
                    <div className="font-medium text-gray-800">
                      {user?.firstname}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FiUser className="text-gray-500" size={18} />
                  <div>
                    <div className="text-sm text-gray-500">{t("lastName")}</div>
                    <div className="font-medium text-gray-800">
                      {user?.lastname}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FiPhone className="text-gray-500" size={18} />
                  <div>
                    <div className="text-sm text-gray-500">{t("phone")}</div>
                    <div className="font-medium text-gray-800">
                      +998 {user?.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FiCalendar className="text-gray-500" size={18} />
                  <div>
                    <div className="text-sm text-gray-500">
                      {t("registeredDate")}
                    </div>
                    <div className="font-medium text-gray-800">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("uz-UZ")
                        : t("unknownDate")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics and Plan */}
        <div className="lg:col-span-2 space-y-6">
          {/* Plan Card */}
          <div
            className={`rounded-2xl p-6 border-2 ${
              isPro && !isExpired
                ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {isPro && !isExpired ? (
                  <FiCrop className="text-yellow-600" size={24} />
                ) : (
                  <FiUser className="text-gray-600" size={24} />
                )}
                <h3 className="text-xl font-bold text-gray-800">
                  {isPro && !isExpired ? t("proPlan") : t("freePlan")}
                </h3>
              </div>
              {isPro && !isExpired && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  {t("activePlan")}
                </span>
              )}
            </div>

            {isPro && !isExpired ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-green-600">
                  <FiCheck size={16} />
                  <span>{t("unlimitedTests")}</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <FiCheck size={16} />
                  <span>{t("allFeatures")}</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <FiCheck size={16} />
                  <span>{t("premiumSupport")}</span>
                </div>
                {user?.planExpiryDate && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FiClock size={16} />
                    <span>
                      {t("validityPeriod")}:{" "}
                      {new Date(user.planExpiryDate).toLocaleDateString(
                        "uz-UZ"
                      )}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FiCheck size={16} />
                    <span>{t("testLimit", { count: 20 })}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <FiX size={16} />
                    <span>{t("unlimitedTests")}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <FiX size={16} />
                    <span>{t("premiumSupport")}</span>
                  </div>
                </div>

                {userPlan && (
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        {t("testLimitToday")}
                      </span>
                      <span className="font-semibold text-gray-800">
                        {userPlan.dailyUsed}/20
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(userPlan.dailyUsed / 20) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <button
                  onClick={createPayment}
                  disabled={loadingPayment}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <FiCrop size={18} />
                  <span>
                    {loadingPayment
                      ? t("loading")
                      : t("upgradeProPlan") + " - 35,000 " + t("pricePerMonth")}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-700">
                    {stats?.totalTests || 0}
                  </div>
                  <div className="text-blue-600 text-sm font-medium">
                    {t("totalTests")}
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                  <FiCalendar className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-700">
                    {stats?.totalCorrect || 0}
                  </div>
                  <div className="text-green-600 text-sm font-medium">
                    {t("correctAnswers")}
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                  <FiTarget className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-red-700">
                    {stats?.totalWrong || 0}
                  </div>
                  <div className="text-red-600 text-sm font-medium">
                    {t("wrongAnswers")}
                  </div>
                </div>
                <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center">
                  <FiTrendingUp className="text-red-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Success Rate */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                {t("successRate")}
              </h3>
              <div className="flex items-center space-x-2">
                <FiAward className={rating.color} size={20} />
                <span className={`font-medium ${rating.color}`}>
                  {rating.level}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t("overallSuccess")}</span>
                <span className="text-2xl font-bold text-gray-800">
                  {stats?.successRate || 0}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full bg-gradient-to-r ${getProgressColor(
                    stats?.successRate || 0
                  )} transition-all duration-500`}
                  style={{ width: `${stats?.successRate || 0}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-700">
                    {stats?.totalTests > 0
                      ? Math.round(
                          (stats.totalCorrect / stats.totalTests) * 100
                        )
                      : 0}
                    %
                  </div>
                  <div className="text-green-600 text-sm">
                    {t("correctPercentage")}
                  </div>
                </div>

                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-lg font-bold text-red-700">
                    {stats?.totalTests > 0
                      ? Math.round((stats.totalWrong / stats.totalTests) * 100)
                      : 0}
                    %
                  </div>
                  <div className="text-red-600 text-sm">
                    {t("wrongPercentage")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment History */}
          {paymentHistory.length > 0 && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FiCreditCard className="mr-2" size={24} />
                {t("paymentHistory")}
              </h3>

              <div className="space-y-3">
                {paymentHistory.slice(0, 5).map((payment) => (
                  <div
                    key={payment._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
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
                          {new Date(payment.createdAt).toLocaleDateString(
                            "uz-UZ"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">
                        {payment.amount.toLocaleString()} {t("pricePerMonth")}
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
                        {t(`paymentStatus.${payment.status}`)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && paymentData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCrop className="text-yellow-600" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t("upgradeProPlan")}
              </h2>
              <p className="text-gray-600">35,000 {t("pricePerMonth")}</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">
                  {t("proFeatures")}
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <FiCheck className="text-green-500" size={14} />
                    <span>{t("unlimitedTests")}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FiCheck className="text-green-500" size={14} />
                    <span>{t("allFeatures")}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FiCheck className="text-green-500" size={14} />
                    <span>{t("validityPeriod", { count: 1 })}</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <a
                  href={paymentData.clickUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FiExternalLink size={18} />
                  <span>{t("payViaClick")}</span>
                </a>

                <button
                  onClick={() => window.open(paymentData.qrCode, "_blank")}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FiCode size={18} />
                  <span>{t("payViaQR")}</span>
                </button>

                <button
                  onClick={() => checkPaymentStatus(paymentData.paymentId)}
                  className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  {t("checkPaymentStatus")}
                </button>
              </div>

              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
