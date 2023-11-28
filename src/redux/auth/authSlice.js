import { createSlice } from "@reduxjs/toolkit";
import { logOut, login, refreshUser, register } from "./authOperations";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "../../utils/handlers";

const initialState = {
  user: {
    name: null,
    email: null,
    avatarURL: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user.email = payload.email;
        state.isLoggedIn = true;
        handleFulfilled(state);
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
        handleFulfilled(state);
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null, avatarURL: null };
        state.token = null;
        state.isLoggedIn = false;
        handleFulfilled(state);
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isLoggedIn = true;
        state.token = payload.token;
        state.isRefreshing = false;
        handleFulfilled(state);
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        handlePending(state);
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoading = false;
      })
      .addCase(register.pending, handlePending)
      .addCase(login.pending, handlePending)
      .addCase(logOut.pending, handlePending)
      .addCase(register.rejected, handleRejected)
      .addCase(login.rejected, handleRejected)
      .addCase(logOut.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
