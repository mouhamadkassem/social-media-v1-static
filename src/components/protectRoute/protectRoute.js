import React from "react";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const userLogin = JSON.parse(localStorage.getItem("user-auth"));

  if (userLogin) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default ProtectRoute;
