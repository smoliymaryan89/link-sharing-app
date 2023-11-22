import { createSlice } from "@reduxjs/toolkit";
import { createLink, deleteLink, getAllLinks } from "./linkOperations";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "../../utils/handlers";

const initialState = {
  links: [],
  previewLinks: [],
};

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    getLinkData: (state, action) => {
      const { id, link, platform } = action.payload;
      const existingLink = state.previewLinks.find(
        (existing) => existing.id === id
      );

      if (existingLink) {
        if (link !== undefined) {
          existingLink.link = link;
        }
        if (platform !== undefined) {
          existingLink.platform = platform;
        }
      } else {
        state.previewLinks.push({ id, link, platform });
      }
    },
    removePreviewLink: (state, action) => {
      state.previewLinks = state.previewLinks.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLink.fulfilled, (state, { payload }) => {
        state.links.push(payload);
      })
      .addCase(getAllLinks.fulfilled, (state, { payload }) => {
        state.links.push(...payload);
      })
      .addCase(deleteLink.fulfilled, (state, { payload }) => {
        const index = state.links[0]?.platform.findIndex(
          (item) => item.id === payload.id
        );
        state.links[0]?.platform.splice(index, 1);

        if (state.links[0]?.platform.length === 0) {
          state.links = [];
        }
      })
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        handleFulfilled
      )
      .addMatcher((action) => action.type.endsWith("/pending"), handlePending)
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        handleRejected
      );
  },
});

export const { getLinkData, removePreviewLink } = linkSlice.actions;
export const linkReducer = linkSlice.reducer;
