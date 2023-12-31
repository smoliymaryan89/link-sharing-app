import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, setAuthHeader } from "../auth/authOperations";

export const getAllLinks = createAsyncThunk(
  "link/getLinks",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    try {
      setAuthHeader(persistedToken);
      const { data } = await instance.get(`api/link`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateLink = createAsyncThunk(
  "link/updateLink",
  async ({ id, links }, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    try {
      setAuthHeader(persistedToken);
      const { data } = await instance.patch(`api/link/${id}`, {
        ...links,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addOrReorderLink = createAsyncThunk(
  "link/reorderLinks",
  async (links, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    try {
      setAuthHeader(persistedToken);
      const { data } = await instance.patch(`api/link/`, links);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteLink = createAsyncThunk(
  "link/deleteLink",
  async (id, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    try {
      setAuthHeader(persistedToken);
      const { data } = await instance.delete(`api/link/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
