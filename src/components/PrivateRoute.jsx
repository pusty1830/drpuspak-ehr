import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../services/AuthedContext";
import { getUserRole } from "../services/axiosClient";

const PrivateRoute = ({ component: Component, allowedRoles }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const userRole = getUserRole();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified and user's role is not allowed, redirect to login
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

export default PrivateRoute;
