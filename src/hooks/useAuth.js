import { useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectUser,
} from "../redux/auth/authSelectors";

const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  return {
    isLoggedIn,
    isRefreshing,
    isLoading,
    user,
    error,
  };
};

export default useAuth;
