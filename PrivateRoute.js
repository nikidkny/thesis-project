import * as React from "react";
import { Route, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Route {...rest} element={isLoggedIn ? <Component /> : <Navigate to="/login" replace />} />
  );
};

export default PrivateRoute;
