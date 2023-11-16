import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { selectToken } from "../redux/auth/authSelectors";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector(selectToken);
  const location = useLocation();

  return isAuth ? children : <Navigate to="/login" state={location} />;
};

export default PrivateRoute;
