import api from '../lib/api';
export const wishlistService = {
  async getWishlist() {
    try {
      const response = await api.get('/wishlist');
      return response.data;
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      return [];
    }
  },
  async add(productId) {
    try {
      const response = await api.post('/wishlist', { product_id: productId });
      return response.data;
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      throw error;
    }
  },
  async remove(wishlistItemId) {
    try {
      const response = await api.delete(`/wishlist/${wishlistItemId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      throw error;
    }
  }
};
