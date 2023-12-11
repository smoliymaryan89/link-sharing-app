import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/authOperations";

export const getSharedData = createAsyncThunk(
  "link/getSharedData",
  async (owner, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`api/shared/${owner}`);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
