// src/store/slices/templateSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Get templates list with caching
export const getTemplates = createAsyncThunk(
  "templates/getTemplates",
  async (lang, { rejectWithValue, getState }) => {
    try {
      // Check if templates for this language are already loaded
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

// Check answer
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
    templatesCache: {}, // Cache for different languages
    currentTemplate: null,
    currentQuestion: 0,
    userAnswers: [],
    questionResults: {}, // Har bir savol uchun natija
    mistakeCount: 0,
    isLoading: false,
    error: null,
    testResults: [],
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
      state.currentTemplate = null;
      state.error = null;
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
    // Cache ni tozalash uchun
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

        // Cache ga saqlash
        state.templatesCache[lang] = templates;
        state.templates = templates;
        state.error = null;

        if (!fromCache) {
          console.log(`Templates loaded for ${lang}:`, templates.length);
        }
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

        // Agar javob noto'g'ri bo'lsa, mistake count ni oshirish
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
  addUserAnswer,
  setQuestionResult,
  incrementMistakeCount,
  addTestResult,
  clearError,
  clearTemplatesCache,
} = templateSlice.actions;

export default templateSlice.reducer;
