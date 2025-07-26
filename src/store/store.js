import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import templateSlice from "./slices/templateSlice";
import mistakeSlice from "./slices/mistakeSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    templates: templateSlice,
    mistakes: mistakeSlice,
  },
});

export default store;
