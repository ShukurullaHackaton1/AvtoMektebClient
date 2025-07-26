// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/login", { phone, password });
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/sign", userData);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Get Profile
export const getProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/users/profile");
      return response.data.data;
    } catch (error) {
      // Agar 401 xatolik bo'lsa, logout qilish
      if (error.response?.status === 401) {
        dispatch(logout());
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to get profile"
      );
    }
  }
);

// Get Stats
export const getStats = createAsyncThunk(
  "auth/stats",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get("/users/stats");
      return response.data.data;
    } catch (error) {
      // Agar 401 xatolik bo'lsa, faqat xatolikni qaytarish (logout qilmaslik)
      if (error.response?.status === 401) {
        // Stats uchun logout qilmaslik, chunki bu optional ma'lumot
        return rejectWithValue("Unauthorized");
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to get stats"
      );
    }
  }
);

// Token validation
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await api.get("/users/profile");
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logout());
      }
      return rejectWithValue("Invalid token");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    stats: null,
    token: localStorage.getItem("token"),
    isLoading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.stats = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
    // Token mavjudligini tekshirish
    checkToken: (state) => {
      const token = localStorage.getItem("token");
      state.token = token;
      state.isAuthenticated = !!token;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Profile
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload !== "Unauthorized") {
          state.error = action.payload;
        }
      })
      // Stats
      .addCase(getStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(getStats.rejected, (state, action) => {
        // Stats xatoligi uchun global error o'rnatmaslik
        if (action.payload !== "Unauthorized") {
          console.warn("Stats loading failed:", action.payload);
        }
      })
      // Token validation
      .addCase(validateToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(validateToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { logout, clearError, checkToken } = authSlice.actions;
export default authSlice.reducer;
