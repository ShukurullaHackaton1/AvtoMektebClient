import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  FiAlertCircle,
  FiX,
  FiCheck,
  FiCalendar,
  FiFileText,
  FiRefreshCw,
  FiBook,
  FiTrendingUp,
} from "react-icons/fi";
import { getMistakes } from "../store/slices/mistakeSlice";
import toast from "react-hot-toast";

const Mistakes = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { mistakes, isLoading, error } = useSelector((state) => state.mistakes);

  useEffect(() => {
    dispatch(getMistakes());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderQuestionBody = (body) => {
    return body?.map((item, index) => {
      switch (item.type) {
        case 1: // Text
          return (
            <span key={index} className="text-gray-700">
              {item.value}
            </span>
          );
        case 2: // Image
          return (
            <div key={index} className="my-2">
              <img
                src={item.value}
                alt="Question"
                className="max-w-xs h-auto rounded-md shadow-sm"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          );
        default:
          return null;
      }
    });
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

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          {t("mistakesTitle")}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t("analyzeMistakes")}
        </p>
      </div>

      {/* Mistakes List */}
      {mistakes.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck size={48} className="text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {t("excellent")}
          </h3>
          <p className="text-gray-600 mb-8">{t("noMistakes")}</p>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="text-green-600" size={24} />
              </div>
              <p className="text-gray-700 font-medium">{t("continueText")}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Statistics */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {mistakes.length}
                </div>
                <div className="text-red-500 text-sm">{t("totalMistakes")}</div>
              </div>
              <div className="w-px h-12 bg-red-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {new Set(mistakes.map((m) => m.templateId)).size}
                </div>
                <div className="text-orange-500 text-sm">
                  {t("differentTemplates")}
                </div>
              </div>
            </div>
          </div>

          {/* Mistakes Cards */}
          <div className="space-y-4">
            {mistakes.map((mistake) => (
              <div
                key={mistake.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                {/* Mistake Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <FiAlertCircle className="text-red-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {mistake.templateTitle}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FiCalendar size={14} />
                        <span>{formatDate(mistake.date)}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <FiFileText size={14} />
                          <span>{mistake.templateLang.toUpperCase()}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Question */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Savol:</h4>
                  <div className="text-gray-700 space-y-2">
                    {renderQuestionBody(mistake.question.body)}
                  </div>
                </div>

                {/* Answers Comparison */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* User's Wrong Answer */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <FiX className="text-red-600" size={18} />
                      <h5 className="font-medium text-red-700">
                        {t("yourAnswer")}
                      </h5>
                    </div>
                    <p className="text-red-600">{mistake.userAnswer.text}</p>
                  </div>

                  {/* Correct Answer */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <FiCheck className="text-green-600" size={18} />
                      <h5 className="font-medium text-green-700">
                        {t("rightAnswer")}
                      </h5>
                    </div>
                    <p className="text-green-600">
                      {mistake.correctAnswer.text}
                    </p>
                  </div>
                </div>

                {/* Explanation if available */}
                {mistake.question.explanation && (
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-700 mb-2">
                      {t("explanation")}:
                    </h5>
                    <p className="text-blue-600 text-sm">
                      {mistake.question.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Learning Tips */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              {t("learningTips")}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiRefreshCw className="text-blue-600" size={24} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {t("repeat")}
                </h4>
                <p className="text-sm text-gray-600">{t("repeatDesc")}</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiBook className="text-green-600" size={24} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {t("deepLearning")}
                </h4>
                <p className="text-sm text-gray-600">{t("deepLearningDesc")}</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiTrendingUp className="text-purple-600" size={24} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {t("practice")}
                </h4>
                <p className="text-sm text-gray-600">{t("practiceDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mistakes;
