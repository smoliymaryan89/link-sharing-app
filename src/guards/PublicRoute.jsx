import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { selectToken } from "../redux/auth/authSelectors";

const PublicRoute = ({ children }) => {
  const isAuth = useSelector(selectToken);
  const location = useLocation();

  return !isAuth ? children : <Navigate to={location.state ?? "/"} />;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
