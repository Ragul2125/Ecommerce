import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import type { Role } from "@/features/auth/services/authService"

interface ProtectedRouteProps {
  allowedRoles?: Role[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, hasRole } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login but save the attempted url
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    // Role not authorized
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
