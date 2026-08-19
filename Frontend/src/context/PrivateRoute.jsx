import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "./AuthProvider";
import Loading from "../components/Loading";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading text="Checking authentication..." />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
