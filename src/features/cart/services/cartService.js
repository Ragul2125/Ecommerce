import api from '../../../lib/api';
export const cartService = {
  async getCart() {
    try {
      const response = await api.get('/cart');
      return response.data; // { cart, items }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      return { cart: null, items: [] };
    }
  },
  async addItem(productId, quantity = 1) {
    try {
      const response = await api.post('/cart/items', { productId, quantity });
      return response.data;
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      throw error;
    }
  },
  async updateItemQuantity(cartItemId, quantity) {
    try {
      const response = await api.put(`/cart/items/${cartItemId}`, { quantity });
      return response.data;
    } catch (error) {
      console.error("Failed to update cart item:", error);
      throw error;
    }
  },
  async removeItem(cartItemId) {
    try {
      const response = await api.delete(`/cart/items/${cartItemId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      throw error;
    }
  },
  async clearCart() {
    try {
      const response = await api.delete('/cart');
      return response.data;
    } catch (error) {
      console.error("Failed to clear cart:", error);
      throw error;
    }
  }
};
