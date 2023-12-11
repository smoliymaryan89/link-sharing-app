import { createSlice } from "@reduxjs/toolkit";
import { getSharedData } from "./sharedOperations";
import { handleFulfilled, handlePending, handleRejected } from "../handlers";

const initialState = {
  data: {
    links: null,
    avatarURL: "",
    firstName: "",
    lastName: "",
    emailPreview: "",
  },
  isLoading: false,
  error: null,
};

const sharedSlice = createSlice({
  name: "shared",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getSharedData.fulfilled, (state, { payload }) => {
        state.data.links = payload.links;
        state.data.avatarURL = payload.avatarURL;
        state.data.firstName = payload.firstName;
        state.data.lastName = payload.lastName;
        state.data.emailPreview = payload.emailPreview;
        handleFulfilled(state);
      })
      .addCase(getSharedData.pending, (state) => {
        handlePending(state);
      })
      .addCase(getSharedData.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      });
  },
});

export const sharedReducer = sharedSlice.reducer;
