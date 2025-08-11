// src/store/slices/adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Admin login
export const loginAdmin = createAsyncThunk(
  "admin/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/login", { username, password });
      localStorage.setItem("adminToken", response.data.data.token);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Admin login failed"
      );
    }
  }
);

// Get admin profile
export const getAdminProfile = createAsyncThunk(
  "admin/profile",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        dispatch(logoutAdmin());
        return rejectWithValue("No admin token found");
      }

      const response = await api.get("/admin/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logoutAdmin());
        return rejectWithValue("Unauthorized");
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to get admin profile"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    token: localStorage.getItem("adminToken"),
    isLoading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem("adminToken"),
    profileFetched: false, // Profile yuklanganligini kuzatish uchun
  },
  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.profileFetched = false;
      localStorage.removeItem("adminToken");
    },
    clearAdminError: (state) => {
      state.error = null;
    },
    checkAdminToken: (state) => {
      const token = localStorage.getItem("adminToken");
      state.token = token;
      state.isAuthenticated = !!token;
      if (!token) {
        state.profileFetched = false;
        state.admin = null;
      }
    },
    setProfileFetched: (state, action) => {
      state.profileFetched = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Admin login
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        state.profileFetched = true; // Login da profile ma'lumotlari keladi
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.profileFetched = false;
      })
      // Admin profile
      .addCase(getAdminProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdminProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload;
        state.error = null;
        state.profileFetched = true;
      })
      .addCase(getAdminProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.profileFetched = true; // Xato bo'lsa ham fetched deb belgilash
        if (action.payload === "Unauthorized") {
          // logoutAdmin allaqachon dispatch qilingan
          state.error = null;
        } else {
          state.error = action.payload;
        }
      });
  },
});

export const {
  logoutAdmin,
  clearAdminError,
  checkAdminToken,
  setProfileFetched,
} = adminSlice.actions;
export default adminSlice.reducer;
