import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, setAuthHeader } from "../auth/authOperations";

export const createLink = createAsyncThunk(
  "link/addLink",
  async ({ platform }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      setAuthHeader(token);
      const { data } = await instance.post("/api/link/", { platform });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllLinks = createAsyncThunk(
  "link/getAllLinks",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      setAuthHeader(token);
      const { data } = await instance.get("/api/link/");

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteLink = createAsyncThunk(
  "link/deleteLink",
  async ({ id }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      setAuthHeader(token);
      const { data } = await instance.delete(`/api/link/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
