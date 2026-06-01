import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Role } from "@/features/auth/services/authService"

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  
  setAuth: (user: User, token: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  hasRole: (roles: Role[]) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user, token) => 
        set({ user, token, isAuthenticated: true }),
        
      logout: () => 
        set({ user: null, token: null, isAuthenticated: false }),
        
      setLoading: (loading) => 
        set({ isLoading: loading }),
        
      hasRole: (roles) => {
        const { user } = get()
        if (!user) return false
        return roles.includes(user.role)
      }
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated })
    }
  )
)
