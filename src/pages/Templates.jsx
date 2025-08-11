import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiPlay, FiFileText, FiGlobe } from "react-icons/fi";
import { getTemplates } from "../store/slices/templateSlice";
import toast from "react-hot-toast";

const Templates = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { templates, isLoading, error } = useSelector(
    (state) => state.templates
  );
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const [loadingCache, setLoadingCache] = useState({});

  const languages = [
    { code: "uz", name: "O'zbekcha", flag: "🇺🇿" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "uz_kiril", name: "Ўзбекча", flag: "🇺🇿" },
  ];

  useEffect(() => {
    // Faqat hozirgi til uchun templates yuklaymiz
    if (!loadingCache[selectedLang]) {
      dispatch(getTemplates(selectedLang));
      setLoadingCache((prev) => ({ ...prev, [selectedLang]: true }));
    }
  }, [dispatch, selectedLang, loadingCache]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleLanguageChange = (langCode) => {
    setSelectedLang(langCode);
    // Agar bu til uchun ma'lumot yuklanmagan bo'lsa, yuklaymiz
    if (!loadingCache[langCode]) {
      dispatch(getTemplates(langCode));
      setLoadingCache((prev) => ({ ...prev, [langCode]: true }));
    }
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
          {t("templatesTitle")}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{t("chooseTemplate")}</p>
      </div>

      {/* Language Selector */}
      <div className="flex justify-center">
        <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-200">
          <div className="flex space-x-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedLang === lang.code
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      {templates.length === 0 ? (
        <div className="text-center py-12">
          <FiFileText size={64} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {t("noTemplatesFound")}
          </h3>
          <p className="text-gray-500">{t("noTemplatesDesc")}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Template Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {template.title ||
                      `${selectedLang.toUpperCase()} ${t("template")} ${
                        template.id
                      }`}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FiFileText size={16} />
                    <span>
                      {template.questionCount} {t("questionsCount")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                  <FiGlobe size={12} />
                  <span>{selectedLang.toUpperCase()}</span>
                </div>
              </div>

              {/* Template Body */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">
                        {t("questionCount2")}
                      </span>
                      <div className="font-semibold text-gray-800">
                        {template.questionCount} {t("piece")}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">{t("language")}:</span>
                      <div className="font-semibold text-gray-800">
                        {languages.find((l) => l.code === selectedLang)?.name}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={`/test/${selectedLang}/${template.id}`}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <FiPlay size={18} />
                  <span>{t("startTest")}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">{t("testInfo")}</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">{t("testInfoDesc")}</p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiPlay className="text-blue-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {t("easyStart")}
              </h4>
              <p className="text-sm text-gray-600">{t("easyStartDesc")}</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiFileText className="text-green-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {t("variousTopics")}
              </h4>
              <p className="text-sm text-gray-600">{t("variousTopicsDesc")}</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiGlobe className="text-purple-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {t("multiLanguage")}
              </h4>
              <p className="text-sm text-gray-600">{t("multiLanguageDesc")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
