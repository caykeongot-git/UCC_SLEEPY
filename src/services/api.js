import axios from 'axios';

/**
 * 1. XỬ LÝ BASE URL
 * Thêm /api vào cuối để khớp với route Backend (tránh lỗi 404 như trong ảnh)
 */
const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  // Nếu Vite đọc được .env, dùng nó. Nếu không, dùng link dự phòng.
  const base = envUrl || 'https://d133b5da81e5b3.lhr.life';
  
  // Đảm bảo luôn có /api ở cuối
  return base.endsWith('/api') ? base : `${base}/api`;
};

const API_URL = getBaseURL();

// Cảnh báo nếu file .env đang bị lỗi định dạng UTF-16 LE (dẫn đến undefined)
if (!import.meta.env.VITE_API_URL) {
  console.warn('⚠️ Vite không đọc được .env. Hãy đổi định dạng file .env sang UTF-8!');
}

/**
 * 2. KHỞI TẠO AXIOS INSTANCE
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Bắt buộc để vượt qua trang cảnh báo của LocalTunnel
    'bypass-tunnel-remind': 'true', 
  },
  timeout: 15000,
});

// Biến để lưu function lấy State từ Zustand
let getAuthState = null;

export const setAuthStateGetter = (fn) => {
  getAuthState = fn;
};

/**
 * 3. REQUEST INTERCEPTOR
 * Tự động đính kèm Token vào Header mỗi khi gửi yêu cầu
 */
api.interceptors.request.use(
  (config) => {
    if (typeof getAuthState === 'function') {
      const state = getAuthState();
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    }
    
    // Log để bạn kiểm tra chính xác URL đang gọi trong Console
    console.log(`🚀 [API Request]: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 4. RESPONSE INTERCEPTOR
 * Xử lý lỗi tập trung (401, 404, CORS)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      console.error('🚫 Phiên đăng nhập hết hạn!');
      if (typeof getAuthState === 'function') {
        const state = getAuthState();
        if (state?.logout) state.logout();
      }
    } else if (status === 404) {
      // Thông báo lỗi 404 cụ thể đường dẫn
      console.error(`🔍 Lỗi 404: Không tìm thấy endpoint tại ${error.config.baseURL}${error.config.url}`);
    } else if (!status) {
      console.error('🌐 Lỗi mạng: Kiểm tra CORS hoặc link LocalTunnel còn sống không.');
    }

    return Promise.reject(error);
  }
);

export default api;