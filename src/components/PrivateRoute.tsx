import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactElement;
};

const PrivateRoute = ({
  children,
}: Props) => {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") ===
    "true";

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;