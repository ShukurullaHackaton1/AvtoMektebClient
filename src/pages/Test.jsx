import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiX,
  FiClock,
  FiFlag,
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

  useEffect(() => {
    dispatch(resetTest());
    dispatch(getTemplate({ lang, templateId }));
  }, [dispatch, lang, templateId]);

  useEffect(() => {
    // Reset state when question changes
    setSelectedAnswer(null);
    setShowResult(false);
    setLastResult(null);
    setIsAnswered(false);
    console.log(currentQuestion);
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

      if (result.isCorrect) {
        toast.success(t("correct"));
      } else {
        toast.error(t("incorrect"));
      }
    } catch (error) {
      toast.error(t("error"));
    }
  };

  const handleNextQuestion = () => {
    const totalQuestions = currentTemplate.template.questions.length;

    if (currentQuestion < totalQuestions - 1) {
      dispatch(setCurrentQuestion(currentQuestion + 1));
    } else {
      // Test finished
      navigate("/templates", {
        state: {
          message: t("testFinished"),
          results: userAnswers,
        },
      });
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      dispatch(setCurrentQuestion(currentQuestion - 1));
    }
  };

  const renderQuestionBody = (body) => {
    return body.map((item, index) => {
      switch (item.type) {
        case 1: // Text
          return (
            <div key={index} className="text-gray-800 leading-relaxed">
              {item.value}
            </div>
          );
        case 2: // Image
          return (
            <div key={index} className="my-4">
              <img
                src={item.value}
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
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  console.log(question);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {currentTemplate.template.title || `Test ${templateId}`}
          </h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <FiClock size={16} />
            <span>
              {t("question")} {currentQuestion + 1} {t("of")} {totalQuestions}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="space-y-6">
          {/* Question Number & Body */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {t("question")} {currentQuestion + 1}
              </span>
            </div>

            <div className="text-lg space-y-4">
              {renderQuestionBody(question.body)}
            </div>
          </div>
          <div className="w-[100%]">
            {question.body.map(
              (item) =>
                item.type === 2 ? (
                  <img
                    key={item.order}
                    src={`${baseUrl}/${item.value}`}
                    alt={`image-${item.order}`}
                    className=""
                  />
                ) : null // yoki boshqa element, agar kerak bo‘lsa
            )}
          </div>

          {/* Answers */}
          <div className="space-y-3">
            {question.answers.map((answer) => {
              let buttonClass =
                "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";

              if (showResult) {
                if (answer.check === 1) {
                  // Correct answer
                  buttonClass += "border-green-500 bg-green-50 text-green-700";
                } else if (answer.id === selectedAnswer) {
                  // Wrong selected answer
                  buttonClass += "border-red-500 bg-red-50 text-red-700";
                } else {
                  // Other answers
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                }
              } else {
                // Before showing result
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
                  <div className="flex items-center justify-between">
                    {answer.body.map((item) => (
                      <span> {item.value} </span>
                    ))}
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

          {/* Result Message */}
          {showResult && lastResult && (
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
                    lastResult.isCorrect ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {lastResult.isCorrect ? t("correct") : t("incorrect")}
                </span>
              </div>

              {!lastResult.isCorrect && (
                <p className="text-sm text-red-600">
                  {t("correctAnswer")} {lastResult.correctAnswer.text}
                </p>
              )}

              {lastResult.explanation && (
                <p className="text-sm text-gray-600 mt-2">
                  {lastResult.explanation}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestion === 0}
          className="flex items-center space-x-2 px-6 py-3 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiArrowLeft size={18} />
          <span>{t("back")}</span>
        </button>

        <div className="flex space-x-3">
          {!isAnswered && (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiCheck size={18} />
              <span>{t("confirmAnswer")}</span>
            </button>
          )}

          {isAnswered && (
            <button
              onClick={handleNextQuestion}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              <span>
                {currentQuestion === totalQuestions - 1
                  ? t("finishTest")
                  : t("nextQuestion")}
              </span>
              {currentQuestion === totalQuestions - 1 ? (
                <FiFlag size={18} />
              ) : (
                <FiArrowRight size={18} />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;
