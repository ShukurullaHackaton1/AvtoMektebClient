// src/pages/ExamTest.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiCheck,
  FiX,
  FiClock,
  FiFlag,
  FiArrowLeft,
  FiArrowRight,
  FiAlertTriangle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import api from "../utils/api";
import toast from "react-hot-toast";
import { baseUrl } from "../utils/api";

const ExamTest = () => {
  const { examId, questionIndex } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [examInfo, setExamInfo] = useState(null);
  const [questionNav, setQuestionNav] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  const currentIndex = parseInt(questionIndex) || 0;

  // Fetch question
  useEffect(() => {
    fetchQuestion();
    fetchExamStatus();
  }, [examId, questionIndex]);

  // Timer effect - FIXED
  useEffect(() => {
    if (examInfo?.startTime && examInfo?.duration) {
      const startTime = new Date(examInfo.startTime);
      const duration = examInfo.duration * 60 * 1000; // Convert minutes to milliseconds
      const endTime = new Date(startTime.getTime() + duration);

      const timer = setInterval(() => {
        const now = new Date();
        const remaining = endTime - now;

        if (remaining <= 0) {
          clearInterval(timer);
          setTimeRemaining(0);
          handleCompleteExam(true);
        } else {
          setTimeRemaining(remaining);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examInfo]);

  const fetchQuestion = async () => {
    try {
      setIsLoading(true);
      setShowResult(false);
      setLastResult(null);

      const response = await api.get(
        `/exam/question/${examId}/${currentIndex}`
      );
      const data = response.data.data;

      setCurrentQuestion(data.question);
      setExamInfo(data.examInfo);

      if (data.isAnswered) {
        setSelectedAnswer(data.userAnswer);
        setShowResult(true);
        fetchQuestionResult(data.question.id);
      } else {
        setSelectedAnswer(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Savol yuklanmadi");
      navigate("/exam");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQuestionResult = async (questionId) => {
    setShowResult(true);
  };

  const fetchExamStatus = async () => {
    try {
      const response = await api.get(`/exam/status/${examId}`);
      const data = response.data.data;

      const nav = Array.from({ length: data.totalQuestions }, (_, index) => ({
        index,
        isAnswered: index < data.answeredQuestions,
        isCorrect: null,
      }));
      setQuestionNav(nav);
    } catch (error) {
      console.error("Exam status error:", error);
    }
  };

  const submitAnswer = async () => {
    if (selectedAnswer === null) {
      toast.error("Iltimos javobni tanlang");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await api.post(`/exam/answer/${examId}`, {
        questionId: currentQuestion.id,
        selectedAnswer: selectedAnswer,
      });

      const result = response.data.data;
      setLastResult(result);
      setShowResult(true);

      toast.success(result.isCorrect ? "To'g'ri!" : "Noto'g'ri!");

      setQuestionNav((prev) =>
        prev.map((item, index) =>
          index === currentIndex
            ? {
                ...item,
                isAnswered: true,
                isCorrect: result.isCorrect,
              }
            : item
        )
      );

      setTimeout(() => {
        if (currentIndex < questionNav.length - 1) {
          navigate(`/exam-test/${examId}/${currentIndex + 1}`);
        }
      }, 2000);
    } catch (error) {
      if (
        error.response?.data?.message === "Bu savolga allaqachon javob berilgan"
      ) {
        toast.warning("Bu savolga allaqachon javob berilgan");
        setShowResult(true);
      } else {
        toast.error(error.response?.data?.message || "Xatolik yuz berdi");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteExam = async (autoComplete = false) => {
    if (autoComplete) {
      toast.warning("Vaqt tugadi! Imtihon avtomatik yakunlanmoqda...");
    }

    try {
      const response = await api.post(`/exam/complete/${examId}`);
      const results = response.data.data.results;

      toast.success("Imtihon yakunlandi!");

      navigate("/exam", {
        state: {
          results,
          message: `Natija: ${results.correctAnswers}/${results.totalQuestions} (${results.percentage}%)`,
        },
      });
    } catch (error) {
      toast.error("Imtihonni tugatishda xatolik");
      navigate("/exam");
    }
  };

  const navigateToQuestion = (index) => {
    navigate(`/exam-test/${examId}/${index}`);
  };

  const renderQuestionBody = (body) => {
    return body?.map((item, index) => {
      switch (item.type) {
        case 1: // Text
          return (
            <div
              key={index}
              className="text-gray-800 leading-relaxed text-base md:text-lg mb-3 md:mb-4"
            >
              {item.value}
            </div>
          );
        case 2: // Image
          return (
            <div key={index} className="my-3 md:my-4">
              <img
                src={`${baseUrl}/${item.value}`}
                alt="Question"
                className="max-w-full h-auto rounded-lg shadow-sm mx-auto"
                style={{ maxHeight: "300px" }}
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

  const formatTime = (milliseconds) => {
    if (milliseconds <= 0) return "00:00";
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const getQuestionButtonClass = (item, index) => {
    const baseClass =
      "w-8 h-8 md:w-10 md:h-10 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-xs md:text-sm ";

    if (item.isAnswered) {
      if (item.isCorrect) {
        return (
          baseClass + "bg-green-100 text-green-700 border-2 border-green-300"
        );
      } else if (item.isCorrect === false) {
        return baseClass + "bg-red-100 text-red-700 border-2 border-red-300";
      } else {
        return baseClass + "bg-blue-100 text-blue-700 border-2 border-blue-300";
      }
    } else if (index === currentIndex) {
      return (
        baseClass +
        "bg-yellow-100 text-yellow-700 border-2 border-yellow-300 ring-2 ring-yellow-200"
      );
    } else {
      return baseClass + "bg-white text-gray-400 border-2 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Savol yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  const canSubmit = selectedAnswer !== null && !showResult;
  const answeredCount = questionNav.filter((q) => q.isAnswered).length;
  const isLastQuestion = currentIndex === questionNav.length - 1;
  const allQuestionsAnswered = answeredCount === questionNav.length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Responsive */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-3 md:px-6 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={() => {
                if (window.confirm("Imtihonni tark etmoqchimisiz?")) {
                  navigate("/exam");
                }
              }}
              className="text-gray-600 hover:text-gray-800 transition-colors"
              title="Imtihonni tark etish"
            >
              <FiArrowLeft size={20} />
            </button>
            <div className="hidden md:block w-px h-6 bg-gray-300"></div>
            <h1 className="text-sm md:text-xl font-bold text-gray-800">
              Imtihon{" "}
              {examInfo?.language && `- ${examInfo.language.toUpperCase()}`}
            </h1>
          </div>

          <div className="flex items-center space-x-2 md:space-x-6">
            {/* Timer - Always visible and animated */}
            {timeRemaining !== null && (
              <div
                className={`flex items-center space-x-1 md:space-x-2 text-base md:text-lg font-mono ${
                  timeRemaining < 300000
                    ? "text-red-600 animate-pulse"
                    : "text-gray-700"
                }`}
              >
                <FiClock size={18} className="hidden md:block" />
                <span className="font-bold">{formatTime(timeRemaining)}</span>
              </div>
            )}

            {/* Progress - Desktop only */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <span>
                Savol {currentIndex + 1} / {questionNav.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Responsive */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-3 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Question Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm border border-gray-100">
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                    Savol {currentIndex + 1}
                  </span>
                  {showResult && lastResult && (
                    <span
                      className={`px-2 py-1 md:px-3 rounded-full text-xs md:text-sm font-medium ${
                        lastResult.isCorrect
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {lastResult.isCorrect ? "To'g'ri" : "Noto'g'ri"}
                    </span>
                  )}
                </div>

                <div className="space-y-3 md:space-y-4">
                  {currentQuestion && renderQuestionBody(currentQuestion.body)}
                </div>
              </div>

              {/* Answer Options */}
              <div className="space-y-2 md:space-y-3">
                {currentQuestion?.answers?.map((answer, index) => (
                  <button
                    key={answer.id}
                    onClick={() => !showResult && setSelectedAnswer(answer.id)}
                    disabled={showResult}
                    className={`w-full text-left p-3 md:p-4 rounded-lg border-2 transition-all duration-200 text-sm md:text-base ${
                      showResult
                        ? lastResult?.correctAnswer?.id === answer.id
                          ? "border-green-500 bg-green-50 text-green-700"
                          : selectedAnswer === answer.id &&
                            !lastResult?.isCorrect
                          ? "border-red-500 bg-red-50 text-red-700"
                          : "border-gray-200 bg-gray-50 opacity-50"
                        : selectedAnswer === answer.id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 md:space-x-3">
                        <span className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-medium">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>
                          {answer.body.map((item) => item.value).join(" ")}
                        </span>
                      </div>
                      {showResult && lastResult && (
                        <div>
                          {lastResult.correctAnswer?.id === answer.id && (
                            <FiCheck className="text-green-600" size={18} />
                          )}
                          {selectedAnswer === answer.id &&
                            !lastResult.isCorrect && (
                              <FiX className="text-red-600" size={18} />
                            )}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Mobile Navigation */}
              <div className="mt-4 md:mt-6 space-y-3">
                {/* Submit Button */}
                {!showResult && canSubmit && (
                  <button
                    onClick={submitAnswer}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm md:text-base"
                  >
                    {isSubmitting ? "Yuklanmoqda..." : "Javobni tasdiqlash"}
                  </button>
                )}

                {/* Mobile Navigation Buttons */}
                <div className="flex items-center justify-between md:hidden">
                  <button
                    onClick={() =>
                      currentIndex > 0 && navigateToQuestion(currentIndex - 1)
                    }
                    disabled={currentIndex === 0}
                    className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiChevronLeft size={18} />
                    <span className="text-sm">Oldingi</span>
                  </button>

                  <div className="text-sm font-medium text-gray-700">
                    {currentIndex + 1} / {questionNav.length}
                  </div>

                  {isLastQuestion && allQuestionsAnswered ? (
                    <button
                      onClick={() => handleCompleteExam(false)}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Tugatish
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        currentIndex < questionNav.length - 1 &&
                        navigateToQuestion(currentIndex + 1)
                      }
                      disabled={currentIndex === questionNav.length - 1}
                      className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-sm">Keyingi</span>
                      <FiChevronRight size={18} />
                    </button>
                  )}
                </div>

                {/* Desktop Navigation */}
                {isAnswered && (
                  <div className="hidden md:block">
                    {currentQuestion === totalQuestions - 1 ? (
                      allQuestionsAnswered ? (
                        <button
                          onClick={() => handleCompleteExam(false)}
                          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                          <FiFlag size={18} />
                          <span>Imtihonni tugatish</span>
                        </button>
                      ) : (
                        <div className="text-center text-sm text-gray-600">
                          Testni tugatish uchun barcha savollarga javob bering
                        </div>
                      )
                    ) : (
                      <button
                        onClick={() => navigateToQuestion(currentIndex + 1)}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                      >
                        <span>Keyingi savol</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Navigation Panel */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 sticky top-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">
                Savollar navigatsiyasi
              </h3>

              <div className="grid grid-cols-5 gap-2 mb-6">
                {questionNav.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => navigateToQuestion(index)}
                    className={getQuestionButtonClass(item, index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-green-100 border-2 border-green-300 rounded"></div>
                  <span className="text-gray-600">To'g'ri javob</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-red-100 border-2 border-red-300 rounded"></div>
                  <span className="text-gray-600">Noto'g'ri javob</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-100 border-2 border-yellow-300 rounded"></div>
                  <span className="text-gray-600">Joriy savol</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
                  <span className="text-gray-600">Javob berilgan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-white border-2 border-gray-200 rounded"></div>
                  <span className="text-gray-600">Javobsiz</span>
                </div>
              </div>

              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jami savollar:</span>
                    <span className="font-medium">{questionNav.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Javob berilgan:</span>
                    <span className="font-medium">{answeredCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Qolgan:</span>
                    <span className="font-medium">
                      {questionNav.length - answeredCount}
                    </span>
                  </div>
                </div>

                {allQuestionsAnswered && (
                  <button
                    onClick={() => handleCompleteExam(false)}
                    className="w-full mt-4 px-3 py-2 md:px-4 md:py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-sm md:text-base"
                  >
                    <FiFlag size={16} />
                    <span>Imtihonni yakunlash</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamTest;
