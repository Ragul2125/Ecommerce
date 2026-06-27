import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, hasRole } = useAuthStore();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
export {
  ProtectedRoute
};
