import { authReducer } from "./auth/authSlice";
import { linkReducer } from "./link/linkSlice";
import { sharedReducer } from "./shared/sharedSlice";
import { userReducer } from "./user/userSlice";

export const reducer = {
  auth: authReducer,
  user: userReducer,
  link: linkReducer,
  shared: sharedReducer,
};
