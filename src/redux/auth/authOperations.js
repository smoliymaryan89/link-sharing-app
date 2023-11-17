import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const { VITE_BASE_URL } = import.meta.env;

export const instance = axios.create({
  baseURL: VITE_BASE_URL,
});

export const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem("token", token);
};

export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = "";
  localStorage.removeItem("token");
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("api/auth/register", credentials);

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
      const { data } = await instance.post("api/auth/login", credentials);

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
      await instance.post("api/auth/logout");
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
      const { data } = await instance.get("api/auth/current");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
