import React, { useEffect } from "react";
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
} from "react-icons/fi";
import { getProfile, getStats } from "../store/slices/authSlice";

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, stats, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getStats());
  }, [dispatch]);

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
        icon: FiBarChart3,
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

        {/* Statistics */}
        <div className="lg:col-span-2 space-y-6">
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

          {/* Achievements */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FiAward className="mr-2" size={24} />
              {t("achievements")}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-lg border-2 ${
                  (stats?.totalTests || 0) >= 10
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FiTarget
                    className={`text-2xl ${
                      (stats?.totalTests || 0) >= 10
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                    size={24}
                  />
                  <div>
                    <div className="font-medium text-gray-800">
                      {t("testEnthusiast")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("testEnthusiastDesc")}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 ${
                  (stats?.successRate || 0) >= 80
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FiAward
                    className={`text-2xl ${
                      (stats?.successRate || 0) >= 80
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                    size={24}
                  />
                  <div>
                    <div className="font-medium text-gray-800">
                      {t("teacher")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("teacherDesc")}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 ${
                  (stats?.totalCorrect || 0) >= 50
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FiBriefcase
                    className={`text-2xl ${
                      (stats?.totalCorrect || 0) >= 50
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                    size={24}
                  />
                  <div>
                    <div className="font-medium text-gray-800">
                      {t("knowledgeable")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("knowledgeableDesc")}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg border-2 ${
                  (stats?.totalTests || 0) >= 100
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FiTrendingUp
                    className={`text-2xl ${
                      (stats?.totalTests || 0) >= 100
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                    size={24}
                  />
                  <div>
                    <div className="font-medium text-gray-800">
                      {t("marathonRunner")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("marathonRunnerDesc")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
