// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import adminSlice from "./slices/adminSlice";
import templateSlice from "./slices/templateSlice";
import mistakeSlice from "./slices/mistakeSlice";
import pricingSlice from "./slices/pricingSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    admin: adminSlice,
    templates: templateSlice,
    mistakes: mistakeSlice,
    pricing: pricingSlice,
  },
});

export default store;
