import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";

const PrivateRouter = ({ path, element }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRouter;
