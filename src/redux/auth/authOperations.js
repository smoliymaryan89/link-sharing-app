import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const { VITE_BACKEND_BASE_URL } = import.meta.env;

axios.defaults.baseURL = VITE_BACKEND_BASE_URL;

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem("token", token);
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
  localStorage.removeItem("token");
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("api/auth/register", credentials);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("api/auth/login", credentials);

      setAuthHeader(data.token);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("api/auth/logout");
      clearAuthHeader();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (token === null) {
      return rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(token);
      const { data } = await axios.get("api/auth/current");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
