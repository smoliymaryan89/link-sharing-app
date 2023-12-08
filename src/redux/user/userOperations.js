import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, setAuthHeader } from "../auth/authOperations";

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      setAuthHeader(token);
      const { data } = await instance.get("api/profile/");

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserAvatar = createAsyncThunk(
  "user/getAvatar",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      setAuthHeader(token);
      const { data } = await instance.get("api/auth/current");

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (credentials, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      setAuthHeader(token);
      const { data } = await instance.patch("api/auth/avatars", credentials, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ emailPreview, lastName, firstName, id }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    const profileData = {
      lastName,
      firstName,
      emailPreview,
    };

    for (const key in profileData) {
      if (profileData[key].trim() === "") {
        delete profileData[key];
      }
    }

    try {
      setAuthHeader(token);
      const { data } = await instance.patch(`api/profile/${id}`, profileData);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
