import { createSlice } from "@reduxjs/toolkit";
import { addLink, deleteLink, getAllLinks } from "./linkOperations";

const initialState = {
  links: [],
  previewLinks: [],
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
      })
      .addCase(getAllLinks.fulfilled, (state, { payload }) => {
        payload.forEach((item) => {
          item.links.forEach((link) => {
            if (!state.links.some((stateLink) => stateLink.id === link.id)) {
              state.links.push(link);
            }
          });
        });
      })
      .addCase(deleteLink.fulfilled, (state, { payload }) => {
        const index = state.links.findIndex((item) => item.id === payload.id);
        state.links.splice(index, 1);
      });
  },
});

export const { getData, deletePreviewLink } = linkSlice.actions;
export const linkReducer = linkSlice.reducer;
