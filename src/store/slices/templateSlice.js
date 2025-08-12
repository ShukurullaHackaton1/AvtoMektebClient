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

// Check answer WITHOUT session persistence (for regular tests)
export const checkAnswer = createAsyncThunk(
  "templates/checkAnswer",
  async (answerData, { rejectWithValue }) => {
    try {
      const response = await api.post("/templates/check-answer", answerData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to check answer"
      );
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
    // Session-based test state (temporary)
    currentTestSession: null,
    sessionAnswers: {}, // questionId -> answer data (temporary)
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
      state.currentTestSession = null;
      state.sessionAnswers = {};
    },
    // Initialize test session (temporary, not saved)
    initTestSession: (state, action) => {
      const { lang, templateId } = action.payload;
      state.currentTestSession = {
        lang,
        templateId,
        startTime: new Date().toISOString(),
      };
      state.sessionAnswers = {};
      state.currentQuestion = 0;
      state.questionResults = {};
    },
    // Save answer to temporary session
    saveSessionAnswer: (state, action) => {
      const { questionId, selectedAnswer, isCorrect, correctAnswer } =
        action.payload;
      state.sessionAnswers[questionId] = {
        selectedAnswer,
        isCorrect,
        correctAnswer,
        timestamp: new Date().toISOString(),
      };
      state.questionResults[questionId] = isCorrect;
    },
    // Clear session on test exit
    clearTestSession: (state) => {
      state.currentTestSession = null;
      state.sessionAnswers = {};
      state.questionResults = {};
      state.currentQuestion = 0;
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
      });
  },
});

export const {
  setCurrentQuestion,
  resetTest,
  initTestSession,
  saveSessionAnswer,
  clearTestSession,
  addUserAnswer,
  setQuestionResult,
  incrementMistakeCount,
  addTestResult,
  clearError,
  clearTemplatesCache,
} = templateSlice.actions;

export default templateSlice.reducer;
