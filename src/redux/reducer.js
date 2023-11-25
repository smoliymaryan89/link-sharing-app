import { authReducer } from "./auth/authSlice";
import { linkReducer } from "./link/linkSlice";
import { userReducer } from "./user/userSlice";

export const reducer = {
  auth: authReducer,
  user: userReducer,
  link: linkReducer,
};
