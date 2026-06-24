export type Role = "Customer" | "Seller" | "Admin"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
}

export interface AuthResponse {
  user: User
  token: string
}

// Mock service adding 1s delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    await delay(1000)
    
    if (email === "seller@premium.com" && password === "password") {
      return {
        user: {
          id: "seller-123",
          name: "Premium Seller",
          email,
          role: "Seller",
          avatar: "https://i.pravatar.cc/150?u=seller"
        },
        token: "mock-jwt-seller-token"
      }
    }

    if (email === "admin@premium.com" && password === "password") {
      return {
        user: {
          id: "admin-789",
          name: "Super Admin",
          email,
          role: "Admin",
          avatar: "https://i.pravatar.cc/150?u=admin"
        },
        token: "mock-jwt-admin-token"
      }
    }
    
    if (email === "customer@premium.com" && password === "password") {
      return {
        user: {
          id: "cust-456",
          name: "John Customer",
          email,
          role: "Customer",
          avatar: "https://i.pravatar.cc/150?u=customer"
        },
        token: "mock-jwt-customer-token"
      }
    }
    
    throw new Error("Invalid email or password")
  },

  async signup(data: { name: string; email: string; password: string; role: Role }): Promise<AuthResponse> {
    await delay(1000)
    
    return {
      user: {
        id: `new-${Date.now()}`,
        name: data.name,
        email: data.email,
        role: data.role,
        avatar: `https://i.pravatar.cc/150?u=${data.email}`
      },
      token: "mock-jwt-new-token"
    }
  },

  async logout(): Promise<void> {
    await delay(500)
    return
  }
}
