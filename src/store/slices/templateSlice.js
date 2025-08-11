// src/store/slices/templateSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Test session key generator
const getTestSessionKey = (lang, templateId) =>
  `test_session_${lang}_${templateId}`;

// Get templates list with caching
export const getTemplates = createAsyncThunk(
  "templates/getTemplates",
  async (lang, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const cachedTemplates = state.templates.templatesCache[lang];

      if (cachedTemplates && cachedTemplates.length > 0) {
        return { lang, templates: cachedTemplates, fromCache: true };
      }

      const response = await api.get(`/templates/lists/${lang}`);
      return { lang, templates: response.data.data, fromCache: false };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get templates"
      );
    }
  }
);

// Get single template
export const getTemplate = createAsyncThunk(
  "templates/getTemplate",
  async ({ lang, templateId }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/templates/template/${lang}/${templateId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get template"
      );
    }
  }
);

// Check answer with session persistence
export const checkAnswer = createAsyncThunk(
  "templates/checkAnswer",
  async (answerData, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await api.post("/templates/check-answer", answerData);
      const result = response.data.data;

      // Save to session storage
      const sessionKey = getTestSessionKey(
        answerData.templateLang,
        answerData.templateId
      );
      const state = getState();
      const currentSession = state.templates.testSessions[sessionKey] || {};

      const updatedSession = {
        ...currentSession,
        lang: answerData.templateLang,
        templateId: answerData.templateId,
        answers: {
          ...currentSession.answers,
          [answerData.questionId]: {
            selectedAnswer: answerData.selectedAnswer,
            isCorrect: result.isCorrect,
            correctAnswer: result.correctAnswer,
            timestamp: new Date().toISOString(),
          },
        },
        lastUpdate: new Date().toISOString(),
      };

      // Update session in store
      dispatch(updateTestSession({ sessionKey, session: updatedSession }));

      return result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to check answer"
      );
    }
  }
);

// Load test session
export const loadTestSession = createAsyncThunk(
  "templates/loadTestSession",
  async ({ lang, templateId }, { rejectWithValue }) => {
    try {
      const sessionKey = getTestSessionKey(lang, templateId);
      const savedSession = localStorage.getItem(sessionKey);

      if (savedSession) {
        return { sessionKey, session: JSON.parse(savedSession) };
      }

      return { sessionKey, session: null };
    } catch (error) {
      return rejectWithValue("Failed to load test session");
    }
  }
);

const templateSlice = createSlice({
  name: "templates",
  initialState: {
    templates: [],
    templatesCache: {},
    currentTemplate: null,
    currentQuestion: 0,
    userAnswers: [],
    questionResults: {},
    mistakeCount: 0,
    isLoading: false,
    error: null,
    testResults: [],
    testSessions: {}, // Test sessions for different templates
    currentSessionKey: null,
  },
  reducers: {
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    resetTest: (state) => {
      state.currentQuestion = 0;
      state.userAnswers = [];
      state.questionResults = {};
      state.mistakeCount = 0;
      state.testResults = [];
      state.error = null;
      // Don't reset currentTemplate and sessions
    },
    addUserAnswer: (state, action) => {
      state.userAnswers.push(action.payload);
    },
    setQuestionResult: (state, action) => {
      const { questionIndex, isCorrect } = action.payload;
      state.questionResults[questionIndex] = isCorrect;
    },
    incrementMistakeCount: (state) => {
      state.mistakeCount += 1;
    },
    addTestResult: (state, action) => {
      state.testResults.push(action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
    clearTemplatesCache: (state) => {
      state.templatesCache = {};
    },
    // Test session management
    updateTestSession: (state, action) => {
      const { sessionKey, session } = action.payload;
      state.testSessions[sessionKey] = session;
      state.currentSessionKey = sessionKey;

      // Save to localStorage
      try {
        localStorage.setItem(sessionKey, JSON.stringify(session));
      } catch (error) {
        console.warn("Failed to save test session to localStorage:", error);
      }
    },
    setCurrentSession: (state, action) => {
      const { sessionKey } = action.payload;
      state.currentSessionKey = sessionKey;
    },
    clearTestSession: (state, action) => {
      const { sessionKey } = action.payload;
      delete state.testSessions[sessionKey];

      // Remove from localStorage
      try {
        localStorage.removeItem(sessionKey);
      } catch (error) {
        console.warn("Failed to remove test session from localStorage:", error);
      }
    },
    // Load question results from session
    loadQuestionResults: (state, action) => {
      const { session } = action.payload;
      if (session && session.answers) {
        state.questionResults = {};
        Object.keys(session.answers).forEach((questionId) => {
          const answer = session.answers[questionId];
          state.questionResults[questionId] = answer.isCorrect;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Get templates
      .addCase(getTemplates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        const { lang, templates, fromCache } = action.payload;
        state.templatesCache[lang] = templates;
        state.templates = templates;
        state.error = null;
      })
      .addCase(getTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.templates = [];
      })
      // Get template
      .addCase(getTemplate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTemplate = action.payload;
        state.error = null;
      })
      .addCase(getTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.currentTemplate = null;
      })
      // Check answer
      .addCase(checkAnswer.pending, (state) => {
        // Answer check uchun loading ko'rsatmaslik
      })
      .addCase(checkAnswer.fulfilled, (state, action) => {
        state.testResults.push(action.payload);
        state.error = null;

        if (!action.payload.isCorrect) {
          state.mistakeCount += 1;
        }
      })
      .addCase(checkAnswer.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Load test session
      .addCase(loadTestSession.fulfilled, (state, action) => {
        const { sessionKey, session } = action.payload;
        if (session) {
          state.testSessions[sessionKey] = session;
          state.currentSessionKey = sessionKey;

          // Load question results
          if (session.answers) {
            state.questionResults = {};
            Object.keys(session.answers).forEach((questionId) => {
              const answer = session.answers[questionId];
              state.questionResults[questionId] = answer.isCorrect;
            });
          }
        }
      });
  },
});

export const {
  setCurrentQuestion,
  resetTest,
  addUserAnswer,
  setQuestionResult,
  incrementMistakeCount,
  addTestResult,
  clearError,
  clearTemplatesCache,
  updateTestSession,
  setCurrentSession,
  clearTestSession,
  loadQuestionResults,
} = templateSlice.actions;

export default templateSlice.reducer;
