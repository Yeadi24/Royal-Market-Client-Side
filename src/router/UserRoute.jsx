import React, { use } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import Loading from "../Pages/Shared/Loading";
import useGetRole from "../Hooks/useGetRole";

const UserRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { role, loading: roleLoading } = useGetRole(user?.email);

  console.log(user, role);

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (!user || role !== "user") {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default UserRoute;
