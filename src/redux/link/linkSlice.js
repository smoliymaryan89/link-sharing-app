import { createSlice } from "@reduxjs/toolkit";
import { addLink, deleteLink, getAllLinks, updateLink } from "./linkOperations";

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
      .addCase(updateLink.fulfilled, (state, { payload }) => {
        payload.links.forEach((updatedLink) => {
          const index = state.links.findIndex(
            (link) => link.id === updatedLink.id
          );
          if (index !== -1) {
            state.links[index] = updatedLink;
          }
        });
      })
      .addCase(deleteLink.fulfilled, (state, action) => {
        const deletedLinkId = action.payload.deletedLinkId;

        const index = state.links.findIndex(
          (item) => item.id === deletedLinkId
        );
        if (index !== -1) {
          state.links.splice(index, 1);
        } else {
          console.log(deletedLinkId);
        }
      });
  },
});

export const { getData, deletePreviewLink } = linkSlice.actions;
export const linkReducer = linkSlice.reducer;
