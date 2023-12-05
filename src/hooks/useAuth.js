import { useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectToken,
} from "../redux/auth/authSelectors";

const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const token = useSelector(selectToken);

  return {
    isLoggedIn,
    isRefreshing,
    isLoading,
    error,
    token,
  };
};

export default useAuth;
