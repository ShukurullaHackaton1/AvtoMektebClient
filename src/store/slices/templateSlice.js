// src/store/slices/templateSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Get templates list
export const getTemplates = createAsyncThunk(
  "templates/getTemplates",
  async (lang, { rejectWithValue }) => {
    try {
      const response = await api.get(`/templates/lists/${lang}`);
      return response.data.data;
    } catch (error) {
      // 401 xatolikda logout qilmaslik, faqat xatolikni qaytarish
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
    currentTemplate: null,
    currentQuestion: 0,
    userAnswers: [],
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
      state.testResults = [];
      state.currentTemplate = null;
      state.error = null;
    },
    addUserAnswer: (state, action) => {
      state.userAnswers.push(action.payload);
    },
    addTestResult: (state, action) => {
      state.testResults.push(action.payload);
    },
    clearError: (state) => {
      state.error = null;
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
        state.templates = action.payload;
        state.error = null;
      })
      .addCase(getTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // Templates yuklashda xatolik bo'lsa, bo'sh array qo'yish
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
        state.isLoading = true;
      })
      .addCase(checkAnswer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testResults.push(action.payload);
        state.error = null;
      })
      .addCase(checkAnswer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCurrentQuestion,
  resetTest,
  addUserAnswer,
  addTestResult,
  clearError,
} = templateSlice.actions;

export default templateSlice.reducer;
