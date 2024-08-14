import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute: React.FC = () => {
  const { user, isLoading } = useAuth0();

  // Waiting for Auth0 to load
  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (user?.sub === "google-oauth2|104660242862344822298") {
    return <Outlet />;
  }

 
  return <Navigate to="/not-authorized" />;
};

export default ProtectedRoute;


