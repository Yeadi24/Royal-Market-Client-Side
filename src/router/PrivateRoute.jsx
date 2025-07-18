import React, { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Navigate } from "react-router";
import Loading from "../Pages/Shared/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
