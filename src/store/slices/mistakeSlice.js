import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Get mistakes
export const getMistakes = createAsyncThunk(
  "mistakes/getMistakes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/templates/mistakes");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get mistakes"
      );
    }
  }
);

const mistakeSlice = createSlice({
  name: "mistakes",
  initialState: {
    mistakes: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMistakes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMistakes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mistakes = action.payload;
      })
      .addCase(getMistakes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = mistakeSlice.actions;
export default mistakeSlice.reducer;
