import api from '../lib/api';
export const reviewService = {
  async getProductReviews(productId) {
    try {
      const response = await api.get(`/reviews/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      return [];
    }
  },
  async addReview(reviewData) {
    try {
      const response = await api.post('/reviews', reviewData);
      return response.data;
    } catch (error) {
      console.error("Failed to add review:", error);
      throw error;
    }
  },
  async updateReview(reviewId, reviewData) {
    try {
      const response = await api.put(`/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (error) {
      console.error("Failed to update review:", error);
      throw error;
    }
  },
  async deleteReview(reviewId) {
    try {
      const response = await api.delete(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to delete review:", error);
      throw error;
    }
  }
};
