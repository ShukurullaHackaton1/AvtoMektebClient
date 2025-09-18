// src/store/slices/pricingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Get current pricing
export const getCurrentPricing = createAsyncThunk(
  "pricing/getCurrent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/payments/current-pricing");
      return response.data.data;
    } catch (error) {
      // Agar server ishlamasa, default qiymatlarni qaytarish
      return {
        price: 19999,
        originalPrice: 40000,
        duration: 30,
        displayName: "PRO Plan",
        discountPercentage: 50,
        features: {
          unlimited: true,
          examMode: true,
          premiumSupport: true,
          detailedAnalysis: true,
        },
      };
    }
  }
);

const pricingSlice = createSlice({
  name: "pricing",
  initialState: {
    currentPricing: null,
    isLoading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    clearPricing: (state) => {
      state.currentPricing = null;
      state.error = null;
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentPricing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentPricing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPricing = action.payload;
        state.lastFetched = new Date().toISOString();
        state.error = null;
      })
      .addCase(getCurrentPricing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // Default qiymatlarni set qilish
        state.currentPricing = {
          price: 19999,
          originalPrice: 40000,
          duration: 30,
          displayName: "PRO Plan",
          discountPercentage: 50,
        };
      });
  },
});

export const { clearPricing } = pricingSlice.actions;
export default pricingSlice.reducer;
