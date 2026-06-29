import api from '../lib/api';
export const userService = {
  async getProfile() {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      throw error;
    }
  },
  async updateProfile(profileData) {
    try {
      const response = await api.put('/users/me', profileData);
      return response.data;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  },
  async getAddresses() {
    try {
      const response = await api.get('/users/addresses');
      return response.data;
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
      return [];
    }
  },
  async addAddress(addressData) {
    try {
      const response = await api.post('/users/addresses', addressData);
      return response.data;
    } catch (error) {
      console.error("Failed to add address:", error);
      throw error;
    }
  },
  async updateAddress(addressId, addressData) {
    try {
      const response = await api.put(`/users/addresses/${addressId}`, addressData);
      return response.data;
    } catch (error) {
      console.error("Failed to update address:", error);
      throw error;
    }
  },
  async deleteAddress(addressId) {
    try {
      const response = await api.delete(`/users/addresses/${addressId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to delete address:", error);
      throw error;
    }
  }
};
