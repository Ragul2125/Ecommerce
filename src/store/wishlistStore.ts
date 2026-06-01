import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/utils/mockData"

interface WishlistState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  toggleItem: (product: Product) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        if (!get().isInWishlist(product.id)) {
          set((state) => ({ items: [...state.items, product] }))
        }
      },
      
      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter(item => item.id !== productId) }))
      },
      
      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      },
      
      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId)
      },
      
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
    }
  )
)
