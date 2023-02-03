import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";

const PrivateRoute = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);

  return user?.email ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
