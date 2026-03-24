import { create } from 'zustand';
import api, { setAuthStateGetter } from '../services/api';

const useAuthStore = create((set, get) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  // Login function
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { token } = response.data;
      set({ token, isAuthenticated: true });

      // Fetch user data
      await get().fetchUser();

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  },

  // Register function
  register: async (email, password, name, phoneNumber) => {
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        name,
        phoneNumber,
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  },

  // Fetch current user
  fetchUser: async () => {
    try {
      const response = await api.get('/auth/me');
      set({ user: response.data });
    } catch (error) {
      console.error('Fetch user error:', error);
      // If token is invalid, logout
      if (error.response?.status === 401) {
        get().logout();
      }
    }
  },

  // Logout
  logout: () => {
    set({ token: null, user: null, isAuthenticated: false });
  },

  // Initialize auth state (no persistent storage)
  initializeAuth: () => {
    // No persistent storage, auth state resets on page reload
  },
}));

// Đăng ký getState function với API interceptor
setAuthStateGetter(() => useAuthStore.getState());

export default useAuthStore;