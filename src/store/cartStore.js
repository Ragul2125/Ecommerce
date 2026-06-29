import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartService } from "../features/cart/services/cartService";
const useCartStore = create()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      initCart: async () => {
        try {
          set({ isLoading: true });
          const data = await cartService.getCart();
          if (data && data.items) {
             const mappedItems = data.items.map(item => ({
                id: item.id, // Cart item ID
                product: {
                   id: item.product.id || item.product_id,
                   name: item.product.name,
                   price: item.product.price,
                   salePrice: item.product.sale_price || item.product.salePrice,
                   images: item.product.images?.map(i => i.url || i) || [],
                },
                quantity: item.quantity
             }));
             set({ items: mappedItems, isLoading: false });
          } else {
             set({ items: [], isLoading: false });
          }
        } catch (error) {
          console.error("Failed to init cart", error);
          set({ isLoading: false });
        }
      },
      addItem: async (product, quantity = 1) => {
        try {
          const result = await cartService.addItem(product.id, quantity);
          set((state) => {
            const existingItem = state.items.find((item) => item.product.id === product.id);
            if (existingItem) {
              return {
                items: state.items.map(
                  (item) => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                )
              };
            }
            return { items: [...state.items, { id: result?.id, product, quantity }] };
          });
        } catch (error) {
           console.error("Failed to add item", error);
        }
      },
      removeItem: async (productId, cartItemId) => {
        try {
          const itemToRemove = get().items.find((item) => item.product.id === productId);
          if (itemToRemove && itemToRemove.id) {
             await cartService.removeItem(itemToRemove.id);
          }
          set((state) => ({
            items: state.items.filter((item) => item.product.id !== productId)
          }));
        } catch (error) {
          console.error("Failed to remove item", error);
        }
      },
      updateQuantity: async (productId, quantity) => {
        try {
           const itemToUpdate = get().items.find((item) => item.product.id === productId);
           if (quantity <= 0) {
              if (itemToUpdate && itemToUpdate.id) await cartService.removeItem(itemToUpdate.id);
              set((state) => ({
                items: state.items.filter((item) => item.product.id !== productId)
              }));
           } else {
              if (itemToUpdate && itemToUpdate.id) await cartService.updateItemQuantity(itemToUpdate.id, quantity);
              set((state) => ({
                items: state.items.map(
                  (item) => item.product.id === productId ? { ...item, quantity } : item
                )
              }));
           }
        } catch (error) {
           console.error("Failed to update quantity", error);
        }
      },
      clearCart: async () => {
        try {
          await cartService.clearCart();
          set({ items: [] });
        } catch(error) {
          console.error("Failed to clear cart", error);
          set({ items: [] });
        }
      },
      get totalItems() {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      get subtotal() {
        return get().items.reduce((total, item) => {
          const price = item.product.salePrice || item.product.price;
          return total + price * item.quantity;
        }, 0);
      }
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }) // only persist items for offline/guest support
    }
  )
);
export { useCartStore };
