import { create } from "zustand";
import { persist } from "zustand/middleware";
import { wishlistService } from "../services/wishlistService";
const useWishlistStore = create()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      initWishlist: async () => {
        try {
          set({ isLoading: true });
          const data = await wishlistService.getWishlist();
          if (Array.isArray(data)) {
            const mappedItems = data.map(item => ({
               wishlistItemId: item.id,
               id: item.product_id,
               ...item.product
            }));
            set({ items: mappedItems, isLoading: false });
          } else {
            set({ items: [], isLoading: false });
          }
        } catch (error) {
          console.error("Failed to init wishlist", error);
          set({ isLoading: false });
        }
      },
      addItem: async (product) => {
        if (!get().isInWishlist(product.id)) {
          try {
             set((state) => ({ items: [...state.items, product] }));
             await wishlistService.add(product.id);
          } catch (error) {
             console.error("Failed to add to wishlist", error);
             set((state) => ({ items: state.items.filter((item) => item.id !== product.id) }));
          }
        }
      },
      removeItem: async (productId) => {
        try {
           const itemToRemove = get().items.find(item => item.id === productId);
           if (itemToRemove && itemToRemove.wishlistItemId) {
              await wishlistService.remove(itemToRemove.wishlistItemId);
           }
           set((state) => ({ items: state.items.filter((item) => item.id !== productId) }));
        } catch (error) {
           console.error("Failed to remove from wishlist", error);
        }
      },
      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
      clearWishlist: () => set({ items: [] })
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({ items: state.items })
    }
  )
);
export { useWishlistStore };
