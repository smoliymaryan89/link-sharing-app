import { authReducer } from "./auth/authSlice";
import { userReducer } from "./user/userSlice";
import { linkReducer } from "./link/linkSlice";

export const reducer = {
  auth: authReducer,
  user: userReducer,
  link: linkReducer,
};
