import axios from 'axios';
import useAuthStore from '../store/authStore';

const baseURL = import.meta.env.VITE_API_URL || 'https://d133b5da81e5b3.lhr.life/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    'Bypass-Tunnel-Reminder': 'true'
  }
});

// Request Interceptor: Tự động trích xuất token từ Zustand Store và đính kèm vào Header
api.interceptors.request.use(
  (config) => {
    // Trích xuất state token động hiện tại
    const token = useAuthStore.getState().token;
    
    if (token) {
      // Yêu cầu bắt buộc: Authorization: Bearer <token>
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Xử lý lỗi hệ thống chung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Nếu API trả về 401 Unauthorized do token sai hoặc hết hạn -> Tự động xoá trắng App Context / Store
    if (error.response && error.response.status === 401) {
      console.warn("Token hết hạn hoặc bị từ chối, tự động đăng xuất.");
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;