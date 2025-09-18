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

  // Timer effect
  useEffect(() => {
    if (examInfo?.startTime && examInfo?.duration) {
      const startTime = new Date(examInfo.startTime);
      const duration = examInfo.duration * 60 * 1000; // Convert minutes to milliseconds
      const expiresAt = new Date(examInfo.expiresAt);

      const timer = setInterval(() => {
        const now = new Date();
        const remaining = expiresAt - now;

        if (remaining <= 0) {
          // Vaqt tugadi
          clearInterval(timer);
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

      // Agar allaqachon javob berilgan bo'lsa
      if (data.isAnswered) {
        setSelectedAnswer(data.userAnswer);
        setShowResult(true);
        // Fetch the result
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
    // This would need a separate endpoint to get the result
    // For now, we'll just mark it as answered
    setShowResult(true);
  };

  const fetchExamStatus = async () => {
    try {
      const response = await api.get(`/exam/status/${examId}`);
      const data = response.data.data;

      // Navigation uchun savollar holatini yaratish
      const nav = Array.from({ length: data.totalQuestions }, (_, index) => ({
        index,
        isAnswered: index < data.answeredQuestions,
        isCorrect: null, // This would need more info from backend
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

      // Navigation ni yangilash
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

      // Automatically go to next question after 2 seconds
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

      // Navigate to results page or back to exam page
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
              className="text-gray-800 leading-relaxed text-lg mb-4"
            >
              {item.value}
            </div>
          );
        case 2: // Image
          return (
            <div key={index} className="my-4">
              <img
                src={`${baseUrl}/${item.value}`}
                alt="Question"
                className="max-w-full h-auto rounded-lg shadow-sm mx-auto"
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
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const getQuestionButtonClass = (item, index) => {
    const baseClass =
      "w-10 h-10 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ";

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                if (window.confirm("Imtihonni tark etmoqchimisiz?")) {
                  navigate("/exam");
                }
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FiArrowLeft size={20} />
              <span>Imtihonni tark etish</span>
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <h1 className="text-xl font-bold text-gray-800">
              Imtihon - {examInfo?.language?.toUpperCase()}
            </h1>
          </div>

          <div className="flex items-center space-x-6">
            {/* Timer */}
            {timeRemaining && (
              <div
                className={`flex items-center space-x-2 text-lg font-mono ${
                  timeRemaining < 300000
                    ? "text-red-600 animate-pulse"
                    : "text-gray-700"
                }`}
              >
                <FiClock size={20} />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            )}

            {/* Progress */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>
                Savol {currentIndex + 1} / {questionNav.length}
              </span>
              <span>•</span>
              <span>Javob berilgan: {answeredCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                    Savol {currentIndex + 1}
                  </span>
                  {showResult && lastResult && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        lastResult.isCorrect
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {lastResult.isCorrect ? "To'g'ri" : "Noto'g'ri"}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {currentQuestion && renderQuestionBody(currentQuestion.body)}
                </div>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestion?.answers?.map((answer, index) => (
                  <button
                    key={answer.id}
                    onClick={() => !showResult && setSelectedAnswer(answer.id)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
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
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-medium">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>
                          {answer.body.map((item) => item.value).join(" ")}
                        </span>
                      </div>
                      {showResult && lastResult && (
                        <div>
                          {lastResult.correctAnswer?.id === answer.id && (
                            <FiCheck className="text-green-600" size={20} />
                          )}
                          {selectedAnswer === answer.id &&
                            !lastResult.isCorrect && (
                              <FiX className="text-red-600" size={20} />
                            )}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() =>
                    currentIndex > 0 && navigateToQuestion(currentIndex - 1)
                  }
                  disabled={currentIndex === 0}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiArrowLeft size={16} />
                  <span>Oldingi</span>
                </button>

                {!showResult && canSubmit && (
                  <button
                    onClick={submitAnswer}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Yuklanmoqda..." : "Javobni tasdiqlash"}
                  </button>
                )}

                {isLastQuestion && allQuestionsAnswered ? (
                  <button
                    onClick={() => handleCompleteExam(false)}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <FiFlag size={16} />
                    <span>Imtihonni tugatish</span>
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      currentIndex < questionNav.length - 1 &&
                      navigateToQuestion(currentIndex + 1)
                    }
                    disabled={currentIndex === questionNav.length - 1}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Keyingi</span>
                    <FiArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
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

              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
                  <span className="text-gray-600">To'g'ri javob</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
                  <span className="text-gray-600">Noto'g'ri javob</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-300 rounded"></div>
                  <span className="text-gray-600">Joriy savol</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
                  <span className="text-gray-600">Javob berilgan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-white border-2 border-gray-200 rounded"></div>
                  <span className="text-gray-600">Javobsiz</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2 text-sm">
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
                    className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <FiFlag size={18} />
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
