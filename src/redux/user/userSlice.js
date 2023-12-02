import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserData,
  getProfile,
  updateUserAvatar,
  updateUserProfile,
} from "./userOperations";
import { handleFulfilled, handlePending, handleRejected } from "../handlers";

const initialState = {
  user: {
    id: null,
    firstName: "",
    lastName: "",
    emailPreview: "",
    image: null,
    imagePreview: null,
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, { payload }) => {
      state.user = { ...state.user, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, { payload }) => {
        const { avatarURL, _id } = payload;

        state.user = {
          ...state.user,
          image: avatarURL,
          id: _id,
        };

        handleFulfilled(state);
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        if (payload) {
          const { lastName, firstName, emailPreview } = payload;

          state.user = {
            ...state.user,
            lastName,
            firstName,
            emailPreview,
          };
        }

        handleFulfilled(state);
      })
      .addCase(updateUserAvatar.fulfilled, (state, { payload }) => {
        state.user.image = payload.avatar;

        handleFulfilled(state);
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.user = { ...state.user, ...payload.user };

        handleFulfilled(state);
      })
      .addCase(getProfile.pending, handlePending)
      .addCase(updateUserAvatar.pending, handlePending)
      .addCase(updateUserProfile.pending, handlePending)
      .addCase(getProfile.rejected, handleRejected)
      .addCase(updateUserAvatar.rejected, handleRejected)
      .addCase(updateUserProfile.rejected, handleRejected);
  },
});

export const { updateUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
