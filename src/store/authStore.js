import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  loading: true,
  error: null,

  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token });
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });
      
      const token = response.data.token || response.data.accessToken;
      if (!token) throw new Error("Server không trả về Token");
      
      get().setToken(token);
      await get().fetchMe();
      
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || error.response?.data?.error || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.';
      set({ error: msg, loading: false });
      return false;
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      await api.post('/auth/register', userData);
      set({ loading: false });
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || error.response?.data?.error || 'Đăng ký thất bại. Vui lòng kiểm tra lại.';
      set({ error: msg, loading: false });
      return false;
    }
  },

  fetchMe: async () => {
    const token = get().token;
    if (!token) {
      set({ loading: false });
      return;
    }
    
    try {
      set({ loading: true });
      const response = await api.get('/auth/me');
      // Tương thích với JSON trả về: either { user: {...} } or {...user}
      set({ user: response.data.user || response.data, loading: false, error: null });
    } catch (error) {
      console.error("Lỗi xác thực Token GET /auth/me:", error);
      get().setToken(null);
      set({ user: null, loading: false });
    }
  },

  logout: () => {
    get().setToken(null);
    set({ user: null });
  }
}));

export default useAuthStore;
