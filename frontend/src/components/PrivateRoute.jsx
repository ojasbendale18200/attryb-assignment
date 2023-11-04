import { Box } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/auth/login" replace={true} />;
  }
  return <Box>{children}</Box>;
};

export default PrivateRoute;
