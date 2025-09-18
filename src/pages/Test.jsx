import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  FiCheck,
  FiX,
  FiClock,
  FiFlag,
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import {
  getTemplate,
  checkAnswer,
  setCurrentQuestion,
  initTestSession,
  saveSessionAnswer,
  clearTestSession,
} from "../store/slices/templateSlice";
import toast from "react-hot-toast";
import { baseUrl } from "../utils/api";

const Test = () => {
  const { t } = useTranslation();
  const { lang, templateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    currentTemplate,
    currentQuestion,
    isLoading,
    currentTestSession,
    sessionAnswers,
  } = useSelector((state) => state.templates);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Initialize test session
  useEffect(() => {
    dispatch(initTestSession({ lang, templateId }));
    dispatch(getTemplate({ lang, templateId }));

    return () => {
      dispatch(clearTestSession());
    };
  }, [dispatch, lang, templateId]);

  useEffect(() => {
    if (currentTemplate && currentTestSession) {
      const question = currentTemplate.template.questions[currentQuestion];
      if (question && sessionAnswers[question.id]) {
        const savedAnswer = sessionAnswers[question.id];
        setSelectedAnswer(savedAnswer.selectedAnswer);
        setIsAnswered(true);
        setShowResult(true);
        setLastResult({
          isCorrect: savedAnswer.isCorrect,
          correctAnswer: savedAnswer.correctAnswer,
        });
      } else {
        setSelectedAnswer(null);
        setShowResult(false);
        setLastResult(null);
        setIsAnswered(false);
      }
    }
  }, [currentQuestion, currentTemplate, currentTestSession, sessionAnswers]);

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

      dispatch(
        saveSessionAnswer({
          questionId: question.id,
          selectedAnswer: selectedAnswer,
          isCorrect: result.isCorrect,
          correctAnswer: result.correctAnswer,
        })
      );

      setLastResult(result);
      setShowResult(true);
      setIsAnswered(true);

      if (result.isCorrect) {
        toast.success(t("correct"));
      } else {
        toast.error(t("incorrect"));
      }
    } catch (error) {
      if (error.message === "Lifetime test limiti tugadi") {
        toast.error("Test limitingiz tugadi. PRO planga o'ting!");
        navigate("/profile");
        return;
      }
      toast.error(t("error"));
    }
  };

  const handleQuestionClick = (questionIndex) => {
    const question = currentTemplate.template.questions[questionIndex];
    const isAnswered = sessionAnswers[question.id];

    if (isAnswered || questionIndex <= currentQuestion) {
      dispatch(setCurrentQuestion(questionIndex));
    }
  };

  const getQuestionStatus = (questionIndex) => {
    const question = currentTemplate.template.questions[questionIndex];
    const isAnswered = sessionAnswers[question.id];

    if (isAnswered) {
      return isAnswered.isCorrect ? "correct" : "incorrect";
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
      "w-8 h-8 md:w-10 md:h-10 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-xs md:text-sm ";

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
          "bg-white text-gray-500 border-2 border-gray-200 hover:bg-gray-50 cursor-not-allowed"
        );
    }
  };

  const renderQuestionBody = (body) => {
    return body.map((item, index) => {
      switch (item.type) {
        case 1: // Text
          return (
            <div
              key={index}
              className="text-gray-800 leading-relaxed text-sm md:text-base lg:text-lg mb-3 md:mb-4"
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
                loading="lazy"
                className="mx-auto rounded-lg shadow-sm max-w-full"
                style={{
                  maxHeight: window.innerWidth < 768 ? "200px" : "300px",
                }}
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

  const getCompletedQuestions = () => {
    return Object.keys(sessionAnswers).length;
  };

  const getTotalQuestions = () => {
    return currentTemplate?.template?.questions?.length || 0;
  };

  const canFinishTest = () => {
    const completed = getCompletedQuestions();
    const total = getTotalQuestions();
    return completed === total;
  };

  const handleExitTest = () => {
    dispatch(clearTestSession());
    navigate("/templates");
  };

  const getAnswerText = (answer) => {
    return answer.body.map((item) => item.value).join(" ");
  };

  const isAnswerLong = (answer) => {
    const text = getAnswerText(answer);
    return text.length > 200;
  };

  const hasLongAnswers = () => {
    if (!question) return false;
    return question.answers.some((answer) => isAnswerLong(answer));
  };

  if (isLoading || !currentTemplate) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">{t("loading")}</p>
        </div>
      </div>
    );
  }

  const question = currentTemplate.template.questions[currentQuestion];
  const totalQuestions = currentTemplate.template.questions.length;
  const completedQuestions = getCompletedQuestions();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Responsive */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-3 md:px-6 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={handleExitTest}
              className="text-gray-600 hover:text-gray-800 transition-colors"
              title={t("backToTemplates")}
            >
              <FiArrowLeft size={20} />
            </button>
            <div className="hidden md:block w-px h-6 bg-gray-300"></div>
            <h1 className="text-sm md:text-xl font-bold text-gray-800 truncate">
              {currentTemplate.template.title || `Test ${templateId}`}
            </h1>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="text-xs md:text-sm text-gray-500">
              <span className="hidden md:inline">{t("question")} </span>
              <span className="font-medium text-gray-700">
                {currentQuestion + 1}/{totalQuestions}
              </span>
            </div>
            <div className="text-xs md:text-sm text-gray-500">
              <span className="hidden md:inline">Tugallangan: </span>
              <span className="font-medium text-gray-700">
                {completedQuestions}/{totalQuestions}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Responsive */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-3 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Question Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                    {t("question")} {currentQuestion + 1}
                  </span>
                  {isAnswered && (
                    <span
                      className={`px-2 py-1 md:px-3 rounded-full text-xs md:text-sm font-medium ${
                        lastResult?.isCorrect
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {lastResult?.isCorrect ? t("correct") : t("incorrect")}
                    </span>
                  )}
                </div>

                <div className="space-y-3 md:space-y-4">
                  {renderQuestionBody(question.body)}
                </div>
              </div>
            </div>
          </div>

          {/* Answer Options */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">
                {t("selectAnswer")}
              </h3>

              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                {question.answers.map((answer, index) => {
                  const answerText = getAnswerText(answer);
                  const isLong = isAnswerLong(answer);

                  let buttonClass =
                    "w-full text-left p-3 md:p-4 rounded-lg border-2 transition-all duration-200 text-sm md:text-base ";

                  if (showResult) {
                    if (lastResult?.isCorrect && answer.id === selectedAnswer) {
                      buttonClass +=
                        "border-green-500 bg-green-50 text-green-700";
                    } else if (
                      answer.id === selectedAnswer &&
                      !lastResult?.isCorrect
                    ) {
                      buttonClass += "border-red-500 bg-red-50 text-red-700";
                    } else {
                      buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                    }
                  } else {
                    if (selectedAnswer === answer.id) {
                      buttonClass += "border-blue-500 bg-blue-50 text-blue-700";
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
                      <div
                        className={`flex items-${
                          isLong ? "start" : "center"
                        } justify-between`}
                      >
                        <div
                          className={`flex items-${
                            isLong ? "start" : "center"
                          } space-x-2 md:space-x-3 flex-1`}
                        >
                          <span
                            className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-medium ${
                              isLong ? "mt-1 flex-shrink-0" : ""
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span
                            className={`${isLong ? "leading-relaxed" : ""}`}
                          >
                            {answerText}
                          </span>
                        </div>
                        {showResult && (
                          <div
                            className={`flex items-center ${
                              isLong ? "mt-1" : ""
                            }`}
                          >
                            {answer.id === lastResult?.correctAnswer ? (
                              <FiCheck className="text-green-600" size={18} />
                            ) : answer.id === selectedAnswer &&
                              !lastResult?.isCorrect ? (
                              <FiX className="text-red-600" size={18} />
                            ) : null}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Submit/Navigation Buttons */}
              <div className="space-y-3">
                {!isAnswered && (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2.5 md:px-6 md:py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    <FiCheck size={16} />
                    <span>{t("confirmAnswer")}</span>
                  </button>
                )}

                {/* Mobile Navigation */}
                <div className="flex items-center justify-between md:hidden">
                  <button
                    onClick={() =>
                      currentQuestion > 0 &&
                      dispatch(setCurrentQuestion(currentQuestion - 1))
                    }
                    disabled={currentQuestion === 0}
                    className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiChevronLeft size={18} />
                    <span className="text-sm">Oldingi</span>
                  </button>

                  <div className="text-sm font-medium text-gray-700">
                    {currentQuestion + 1} / {totalQuestions}
                  </div>

                  {currentQuestion === totalQuestions - 1 ? (
                    canFinishTest() ? (
                      <button
                        onClick={() => {
                          toast.success(t("testFinished"));
                          handleExitTest();
                        }}
                        className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        <FiFlag size={14} />
                        <span>Tugatish</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-3 py-2 text-gray-400 text-sm"
                      >
                        Javob bering
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() =>
                        dispatch(setCurrentQuestion(currentQuestion + 1))
                      }
                      className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-800"
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
                      canFinishTest() ? (
                        <button
                          onClick={() => {
                            toast.success(t("testFinished"));
                            handleExitTest();
                          }}
                          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                          <FiFlag size={18} />
                          <span>{t("finishTest")}</span>
                        </button>
                      ) : (
                        <div className="text-center text-sm text-gray-600">
                          Testni tugatish uchun barcha savollarga javob bering
                        </div>
                      )
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
        </div>

        {/* Questions Navigation - Desktop only */}
        <div className="hidden md:block bg-white mt-5 rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">
            {t("questionsNavigation")}
          </h3>
          <div className="flex gap-2 md:gap-3 items-center justify-center flex-wrap">
            {currentTemplate.template.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(index)}
                className={getQuestionButtonClass(index)}
                disabled={
                  index > currentQuestion &&
                  !sessionAnswers[currentTemplate.template.questions[index].id]
                }
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
