import { createSlice } from "@reduxjs/toolkit";
import { addLink, deleteLink, getAllLinks, updateLink } from "./linkOperations";
import { handlePending, handleRejected, handleFulfilled } from "../handlers";

const initialState = {
  links: [],
  previewLinks: [],
  isLoading: false,
  error: null,
};

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    getData: (state, { payload }) => {
      const { id, url, platform } = payload;
      const existingLink = state.previewLinks.find(
        (existing) => existing.id === id
      );
      if (existingLink) {
        if (url !== undefined) {
          existingLink.url = url;
        }
        if (platform !== undefined) {
          existingLink.platform = platform;
        }
      } else {
        state.previewLinks.push({ id, url, platform });
      }
    },
    deletePreviewLink: (state, action) => {
      state.previewLinks = state.previewLinks.filter(
        (item) => item.id !== action.payload
      );
    },
    reorder: (state, action) => {
      state.links = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLink.fulfilled, (state, { payload }) => {
        payload.links.forEach((link) => {
          if (!state.links.some((stateLink) => stateLink.id === link.id)) {
            state.links.push(link);
          }
        });

        state.previewLinks = [];

        handleFulfilled(state);
      })
      .addCase(getAllLinks.fulfilled, (state, { payload }) => {
        payload.forEach((item) => {
          item.links.forEach((link) => {
            if (!state.links.some((stateLink) => stateLink.id === link.id)) {
              state.links.push(link);
            }
          });
        });

        handleFulfilled(state);
      })
      .addCase(updateLink.fulfilled, (state, { payload }) => {
        payload.links.forEach((updatedLink) => {
          const index = state.links.findIndex(
            (link) => link.id === updatedLink.id
          );
          if (index !== -1) {
            state.links[index] = updatedLink;
          }
        });

        handleFulfilled(state);
      })
      .addCase(deleteLink.fulfilled, (state, action) => {
        const deletedLinkId = action.payload.deletedLinkId;

        const index = state.links.findIndex(
          (item) => item.id === deletedLinkId
        );
        if (index !== -1) {
          state.links.splice(index, 1);
        } else {
          state.previewLinks = [];
        }

        handleFulfilled(state);
      })
      .addCase(addLink.pending, handlePending)
      .addCase(getAllLinks.pending, handlePending)
      .addCase(updateLink.pending, handlePending)
      .addCase(deleteLink.pending, handlePending)
      .addCase(addLink.rejected, handleRejected)
      .addCase(getAllLinks.rejected, handleRejected)
      .addCase(updateLink.rejected, handleRejected)
      .addCase(deleteLink.rejected, handleRejected);
  },
});

export const { getData, deletePreviewLink, reorder } = linkSlice.actions;
export const linkReducer = linkSlice.reducer;
