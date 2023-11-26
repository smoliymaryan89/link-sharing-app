import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, setAuthHeader } from "../auth/authOperations";

export const addLink = createAsyncThunk(
  "link/addLink",
  async (linkData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    console.log("linkData", linkData);

    try {
      setAuthHeader(token);
      const { data } = await instance.post("api/link/", { links: linkData });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllLinks = createAsyncThunk(
  "link/getLinks",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      setAuthHeader(token);
      const { data } = await instance.get(`api/link`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateLink = createAsyncThunk(
  "link/updateLink",
  async ({ id, links }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      setAuthHeader(token);
      const { data } = await instance.patch(`api/link/${id}`, {
        ...links,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteLink = createAsyncThunk(
  "link/deleteLink",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      setAuthHeader(token);
      const { data } = await instance.delete(`api/link/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
