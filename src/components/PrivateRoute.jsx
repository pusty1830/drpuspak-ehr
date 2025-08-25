import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../services/AuthedContext";
import { getUserRole } from "../services/axiosClient";

const PrivateRoute = ({ component: Component, allowedRoles }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const userRole = getUserRole(); // 👈 fetch role from storage or API
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
    // 👆 better UX than redirecting back to login
  }

  return <Component />;
};

export default PrivateRoute;
