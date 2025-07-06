import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem("role"); // or useContext if preferred

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
