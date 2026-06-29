import api from '../lib/api';
export const orderService = {
  async getOrders() {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      return [];
    }
  },
  async getOrderById(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      throw error;
    }
  },
  async createOrder(orderData) {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error("Failed to create order:", error);
      throw error;
    }
  },
  async cancelOrder(orderId) {
    try {
      const response = await api.post(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      console.error("Failed to cancel order:", error);
      throw error;
    }
  }
};
