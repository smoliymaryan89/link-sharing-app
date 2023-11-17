import { authReducer } from "./auth/authSlice";
import { userReducer } from "./user/userSlice";

export const reducer = {
  auth: authReducer,
  user: userReducer,
};
