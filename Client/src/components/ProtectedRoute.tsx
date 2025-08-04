import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const location = useLocation();

  if (!isLoggedIn && location.pathname !== "/auth") {
    return <Navigate to="/auth" replace />;
  }

  if (isLoggedIn && location.pathname === "/auth") {
    return <Navigate to="/dashboard" replace />;
  }

  // Allow access to the route
  return children;
};

export default ProtectedRoute;
