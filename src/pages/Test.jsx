import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  FiCheck,
  FiX,
  FiClock,
  FiFlag,
  FiAlertTriangle,
  FiHome,
  FiArrowLeft,
} from "react-icons/fi";
import {
  getTemplate,
  checkAnswer,
  setCurrentQuestion,
  resetTest,
} from "../store/slices/templateSlice";
import toast from "react-hot-toast";
import { baseUrl } from "../utils/api";

const Test = () => {
  const { t } = useTranslation();
  const { lang, templateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentTemplate, currentQuestion, isLoading } = useSelector(
    (state) => state.templates
  );
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [questionResults, setQuestionResults] = useState({}); // Har bir savol uchun natija
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  useEffect(() => {
    dispatch(resetTest());
    dispatch(getTemplate({ lang, templateId }));
    setMistakeCount(0);
    setQuestionResults({});
  }, [dispatch, lang, templateId]);

  useEffect(() => {
    // Reset state when question changes
    setSelectedAnswer(null);
    setShowResult(false);
    setLastResult(null);
    setIsAnswered(false);
  }, [currentQuestion]);

  const handleAnswerSelect = (answerId) => {
    if (!isAnswered) {
      setSelectedAnswer(answerId);
    }
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null) {
      toast.error(t("selectAnswer"));
      return;
    }

    const question = currentTemplate.template.questions[currentQuestion];

    try {
      const result = await dispatch(
        checkAnswer({
          templateLang: lang,
          templateId: Number(templateId),
          questionId: question.id,
          selectedAnswer: selectedAnswer,
        })
      ).unwrap();

      setLastResult(result);
      setShowResult(true);
      setIsAnswered(true);

      // Save user answer
      const newAnswer = {
        questionId: question.id,
        selectedAnswer,
        isCorrect: result.isCorrect,
        correctAnswer: result.correctAnswer,
      };
      setUserAnswers((prev) => [...prev, newAnswer]);

      // Question results ni yangilash
      setQuestionResults((prev) => ({
        ...prev,
        [currentQuestion]: result.isCorrect,
      }));

      if (result.isCorrect) {
        toast.success(t("correct"));
      } else {
        toast.error(t("incorrect"));
        // FREE plan uchun 3 xato chegarasi olib tashlandi
        // Xato count endi server tomonda boshqariladi
      }
    } catch (error) {
      if (error.message === "Kunlik test limiti tugadi") {
        // Plan limit tugagan bo'lsa
        toast.error("Kunlik test limitingiz tugadi. PRO planga o'ting!");
        navigate("/profile"); // Profile sahifasiga yo'naltirish
        return;
      }
      toast.error(t("error"));
    }
  };
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await dispatch(getTemplate({ lang, templateId }));
        if (response.payload?.userPlan) {
          // Plan ma'lumotlarini saqlash
          setUserPlan(response.payload.userPlan);
        }
      } catch (error) {
        if (error.message === "Kunlik test limiti tugadi") {
          toast.error("Kunlik test limitingiz tugadi!");
          navigate("/profile");
        }
      }
    };

    fetchTemplate();
  }, [dispatch, lang, templateId, navigate]);

  const handleQuestionClick = (questionIndex) => {
    // Faqat javob berilgan savollarga o'tish mumkin
    if (
      questionResults.hasOwnProperty(questionIndex) ||
      questionIndex <= currentQuestion
    ) {
      dispatch(setCurrentQuestion(questionIndex));
    }
  };

  const handleFailureModalClose = () => {
    setShowFailureModal(false);
    navigate("/templates");
  };

  const renderQuestionBody = (body) => {
    return body.map((item, index) => {
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

  const getQuestionStatus = (questionIndex) => {
    if (questionResults.hasOwnProperty(questionIndex)) {
      return questionResults[questionIndex] ? "correct" : "incorrect";
    }
    if (questionIndex === currentQuestion) {
      return "current";
    }
    if (questionIndex < currentQuestion) {
      return "skipped";
    }
    return "unanswered";
  };

  const getQuestionButtonClass = (questionIndex) => {
    const status = getQuestionStatus(questionIndex);
    const baseClass =
      "w-10 h-10 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ";

    switch (status) {
      case "correct":
        return (
          baseClass +
          "bg-green-100 text-green-700 border-2 border-green-300 hover:bg-green-200"
        );
      case "incorrect":
        return (
          baseClass +
          "bg-red-100 text-red-700 border-2 border-red-300 hover:bg-red-200"
        );
      case "current":
        return (
          baseClass +
          "bg-blue-100 text-blue-700 border-2 border-blue-300 ring-2 ring-blue-200"
        );
      case "skipped":
        return (
          baseClass +
          "bg-gray-100 text-gray-600 border-2 border-gray-300 hover:bg-gray-200"
        );
      default:
        return (
          baseClass +
          "bg-white text-gray-500 border-2 border-gray-200 hover:bg-gray-50"
        );
    }
  };

  if (isLoading || !currentTemplate) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">{t("loading")}</p>
        </div>
      </div>
    );
  }

  const question = currentTemplate.template.questions[currentQuestion];
  const totalQuestions = currentTemplate.template.questions.length;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/templates")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FiArrowLeft size={20} />
                <span>{t("backToTemplates")}</span>
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-800">
                {currentTemplate.template.title || `Test ${templateId}`}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FiClock size={16} />
                <span>
                  {t("question")} {currentQuestion + 1} {t("of")}{" "}
                  {totalQuestions}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Question and Image */}
            <div className="lg:col-span-2 space-y-6">
              {/* Question Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                      {t("question")} {currentQuestion + 1}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {currentTemplate.template.questions.length}{" "}
                      {t("questionsCount")}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {renderQuestionBody(question.body)}
                  </div>
                </div>
              </div>

              {/* Questions Pagination */}
            </div>

            {/* Right Side - Answer Options and Submit */}
            <div className="lg:col-span-1 space-y-6">
              {/* Answer Options */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {t("selectAnswer")}
                </h3>

                <div className="space-y-3 mb-6">
                  {question.answers.map((answer, index) => {
                    let buttonClass =
                      "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";

                    if (showResult) {
                      if (answer.check === 1) {
                        // Correct answer
                        buttonClass +=
                          "border-green-500 bg-green-50 text-green-700";
                      } else if (answer.id === selectedAnswer) {
                        // Wrong selected answer
                        buttonClass += "border-red-500 bg-red-50 text-red-700";
                      } else {
                        // Other answers
                        buttonClass +=
                          "border-gray-200 bg-gray-50 text-gray-500";
                      }
                    } else {
                      // Before showing result
                      if (selectedAnswer === answer.id) {
                        buttonClass +=
                          "border-blue-500 bg-blue-50 text-blue-700";
                      } else {
                        buttonClass +=
                          "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
                      }
                    }

                    return (
                      <button
                        key={answer.id}
                        onClick={() => handleAnswerSelect(answer.id)}
                        disabled={isAnswered}
                        className={buttonClass}
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
                          {showResult && (
                            <div className="flex items-center">
                              {answer.check === 1 ? (
                                <FiCheck className="text-green-600" size={20} />
                              ) : answer.id === selectedAnswer ? (
                                <FiX className="text-red-600" size={20} />
                              ) : null}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Submit Button */}
                {!isAnswered && (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiCheck size={18} />
                    <span>{t("confirmAnswer")}</span>
                  </button>
                )}

                {/* Result Message */}
                {/* {showResult && lastResult && (
                  <div
                    className={`p-4 rounded-lg ${
                      lastResult.isCorrect
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {lastResult.isCorrect ? (
                        <FiCheck className="text-green-600" size={20} />
                      ) : (
                        <FiX className="text-red-600" size={20} />
                      )}
                      <span
                        className={`font-medium ${
                          lastResult.isCorrect
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {lastResult.isCorrect ? t("correct") : t("incorrect")}
                      </span>
                    </div>

                    {!lastResult.isCorrect && (
                      <p className="text-sm text-red-600 mb-2">
                        {t("correctAnswer")}: {lastResult.correctAnswer.text}
                      </p>
                    )}

                    {lastResult.explanation && (
                      <p className="text-sm text-gray-600">
                        <strong>{t("explanation")}:</strong>{" "}
                        {lastResult.explanation}
                      </p>
                    )}
                  </div>
                )} */}

                {/* Test Completion or Next Question */}
                {isAnswered && mistakeCount < 3 && (
                  <div className="mt-4 space-y-3">
                    {currentQuestion === totalQuestions - 1 ? (
                      <button
                        onClick={() =>
                          navigate("/templates", {
                            state: {
                              message: t("testFinished"),
                              results: userAnswers,
                            },
                          })
                        }
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                      >
                        <FiFlag size={18} />
                        <span>{t("finishTest")}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          dispatch(setCurrentQuestion(currentQuestion + 1))
                        }
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                      >
                        <span>{t("nextQuestion")}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white mt-5 rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t("questionsNavigation")}
            </h3>
            <div className="flex gap-3 items-center justify-center">
              {currentTemplate.template.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(index)}
                  className={getQuestionButtonClass(index)}
                  disabled={
                    index > currentQuestion &&
                    !questionResults.hasOwnProperty(index)
                  }
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Failure Modal */}
      {showFailureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiX className="text-red-600" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t("testFailed")}
              </h2>
              <p className="text-gray-600">{t("tooManyMistakes")}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleFailureModalClose}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <FiHome size={18} />
                <span>{t("backToTemplates")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Test;
