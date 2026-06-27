import api from '../../../lib/api';

const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.user && response.data.user.role === "USER") {
        response.data.user.role = "CUSTOMER";
      }
      return response.data; // expects { user, token }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('An error occurred during login');
    }
  },
  
  async signup(data) {
    try {
      const payload = { ...data, role: data.role === "CUSTOMER" ? "USER" : data.role };
      const response = await api.post('/auth/signup', payload);
      if (response.data.user && response.data.user.role === "USER") {
        response.data.user.role = "CUSTOMER";
      }
      return response.data; // expects { user, token }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('An error occurred during signup');
    }
  },
  
  async logout() {
    // Usually frontend just clears the token in store
    return Promise.resolve();
  }
};

export { authService };
