import axios from 'axios';

const api = axios.create({
  // Sử dụng biến môi trường hoặc fallback về localhost
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// 1. Request Interceptor: Tự động đính kèm Token vào mọi yêu cầu gửi đi
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Lấy token từ kho lưu trữ
    if (token) {
      // Kẹp Token vào Header theo chuẩn Bearer như yêu cầu của Leader
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. Response Interceptor: Xử lý phản hồi từ Server
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Nếu Server trả về lỗi 401 (Unauthorized) nghĩa là Token đã hết hạn hoặc lỏ
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken'); // Xóa token cũ
      window.location.href = '/login'; // Đá người dùng về trang đăng nhập
    }
    return Promise.reject(error);
  }
);

export default api;