import { useSelector } from "react-redux";
import {
  selectError,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectUser,
} from "../redux/auth/authSelectors";

const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const error = useSelector(selectError);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    error,
  };
};

export default useAuth;
