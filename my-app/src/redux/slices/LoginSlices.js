import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../services/Loginaction";

const initialState = {
  loading: false,
  userInfo: null, // No need to initialize directly from localStorage here
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.userToken = null;
      state.success = true; // Indicating a successful logout
      state.error = null; // Clearing any previous errors
      // Remove user data from localStorage
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.user;
        state.userToken = payload.token;
        state.success = true;

        // Store user info and token in localStorage
        localStorage.setItem("userInfo", JSON.stringify(payload.user));
        localStorage.setItem("userToken", payload.token);
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
