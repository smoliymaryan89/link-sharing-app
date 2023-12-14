import { combineReducers } from "@reduxjs/toolkit";

import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth/authSlice";
import { linkReducer } from "./link/linkSlice";
import { sharedReducer } from "./shared/sharedSlice";
import { userReducer } from "./user/userSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const reducer = combineReducers({
  auth: persistedReducer,
  user: userReducer,
  link: linkReducer,
  shared: sharedReducer,
});
