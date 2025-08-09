import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiCheck,
  FiX,
  FiClock,
  FiFlag,
  FiArrowLeft,
  FiArrowRight,
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

  const currentIndex = parseInt(questionIndex) || 0;

  useEffect(() => {
    fetchQuestion();
    fetchExamStatus();
  }, [examId, questionIndex]);

  // Timer effect
  useEffect(() => {
    if (examInfo?.startTime) {
      const startTime = new Date(examInfo.startTime);
      const maxDuration = 2 * 60 * 60 * 1000; // 2 soat

      const timer = setInterval(() => {
        const now = new Date();
        const elapsed = now - startTime;
        const remaining = maxDuration - elapsed;

        if (remaining <= 0) {
          // Vaqt tugadi
          handleCompleteExam();
          clearInterval(timer);
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
      const response = await api.get(
        `/exam/question/${examId}/${currentIndex}`
      );
      const data = response.data.data;

      setCurrentQuestion(data.question);
      setExamInfo(data.examInfo);

      // Agar allaqachon javob berilgan bo'lsa
      if (data.isAnswered) {
        setSelectedAnswer(data.userAnswer);
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

  const fetchExamStatus = async () => {
    try {
      const response = await api.get(`/exam/status/${examId}`);
      const data = response.data.data;

      // Navigation uchun savollar holatini yaratish
      const nav = Array.from({ length: data.totalQuestions }, (_, index) => ({
        index,
        isAnswered: false, // Bu ma'lumot alohida olinadi
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

      toast.success(response.data.data.isCorrect ? "To'g'ri!" : "Noto'g'ri!");

      // Navigation ni yangilash
      setQuestionNav((prev) =>
        prev.map((item, index) =>
          index === currentIndex
            ? {
                ...item,
                isAnswered: true,
                isCorrect: response.data.data.isCorrect,
              }
            : item
        )
      );

      // Keyingi savolga o'tish (agar oxirgi savol bo'lmasa)
      if (currentIndex < questionNav.length - 1) {
        setTimeout(() => {
          navigate(`/exam/${examId}/${currentIndex + 1}`);
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteExam = async () => {
    try {
      const response = await api.post(`/exam/complete/${examId}`);
      toast.success("Imtihon tugallandi!");

      // Results sahifasiga yo'naltirish
      navigate(`/exam-results/${examId}`, {
        state: { results: response.data.data.results },
      });
    } catch (error) {
      toast.error("Imtihonni tugatishda xatolik");
    }
  };

  const navigateToQuestion = (index) => {
    // Faqat javob berilgan yoki joriy savolga o'tish mumkin
    if (index <= currentIndex || questionNav[index]?.isAnswered) {
      navigate(`/exam/${examId}/${index}`);
    }
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
                className="max-w-full h-auto rounded-lg shadow-sm"
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
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const getQuestionButtonClass = (item, index) => {
    const baseClass =
      "w-10 h-10 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ";

    if (item.isAnswered) {
      if (item.isCorrect) {
        return (
          baseClass + "bg-green-100 text-green-700 border-2 border-green-300"
        );
      } else {
        return baseClass + "bg-red-100 text-red-700 border-2 border-red-300";
      }
    } else if (index === currentIndex) {
      return (
        baseClass +
        "bg-blue-100 text-blue-700 border-2 border-blue-300 ring-2 ring-blue-200"
      );
    } else if (index < currentIndex) {
      return baseClass + "bg-gray-100 text-gray-600 border-2 border-gray-300";
    } else {
      return (
        baseClass +
        "bg-white text-gray-400 border-2 border-gray-200 cursor-not-allowed"
      );
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

  const isAnswered = questionNav[currentIndex]?.isAnswered;
  const canSubmit = selectedAnswer !== null && !isAnswered;
  const answeredCount = questionNav.filter((q) => q.isAnswered).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/exam")}
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
              <div className="flex items-center space-x-2 text-sm">
                <FiClock size={16} />
                <span
                  className={`font-mono ${
                    timeRemaining < 600000 ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  {formatTime(timeRemaining)}
                </span>
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
          {/* Question */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                    Savol {currentIndex + 1}
                  </span>
                  {isAnswered && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        questionNav[currentIndex]?.isCorrect
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {questionNav[currentIndex]?.isCorrect
                        ? "To'g'ri"
                        : "Noto'g'ri"}
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
                    onClick={() => !isAnswered && setSelectedAnswer(answer.id)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      isAnswered
                        ? "cursor-not-allowed opacity-75"
                        : selectedAnswer === answer.id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>
                        {answer.body.map((item) => item.value).join(" ")}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
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

              <div className="flex items-center space-x-3">
                {!isAnswered && canSubmit && (
                  <button
                    onClick={submitAnswer}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Yuklanmoqda..." : "Javobni tasdiqlash"}
                  </button>
                )}

                {currentIndex === questionNav.length - 1 &&
                  answeredCount === questionNav.length && (
                    <button
                      onClick={handleCompleteExam}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <FiFlag size={16} />
                      <span>Imtihonni tugatish</span>
                    </button>
                  )}
              </div>

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
            </div>
          </div>

          {/* Navigation Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Savollar bo'yicha navigatsiya
              </h3>

              <div className="grid grid-cols-5 gap-2 mb-6">
                {questionNav.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => navigateToQuestion(index)}
                    disabled={index > currentIndex && !item.isAnswered}
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
                  <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
                  <span className="text-gray-600">Joriy savol</span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamTest;
