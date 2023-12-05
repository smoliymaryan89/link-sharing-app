import PropTypes from "prop-types";

import { useLocation, Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  return token ? children : <Navigate to="/login" state={location} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
