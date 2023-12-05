import PropTypes from "prop-types";

import { useLocation, Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  return !token ? children : <Navigate to={location.state ?? "/"} />;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
