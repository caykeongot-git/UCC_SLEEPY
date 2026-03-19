import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const paymentService = {
  // 1. Tạo link thanh toán (MoMo/VNPay)
  createPaymentUrl: async (paymentData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/api/Bill/create-payment`, paymentData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data; 
    } catch (error) {
      console.error("Lỗi tạo thanh toán:", error.response?.data || error.message);
      throw error;
    }
  },

  // 2. Xác thực kết quả sau khi quay lại từ cổng thanh toán
  verifyPaymentResult: async (searchParams) => {
    try {
      const response = await axios.get(`${API_URL}/api/Bill/verify-result${searchParams}`);
      return response.data; 
    } catch (error) {
      console.error("Lỗi xác thực:", error.response?.data || error.message);
      throw error;
    }
  },

  // 3. Lấy lịch sử giao dịch
  getPaymentHistory: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/Bill/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data; 
    } catch (error) {
      console.error("Lỗi lấy lịch sử:", error.response?.data?.Message || error.message);
      return []; 
    }
  },

  // 4. Kiểm tra Voucher từ API Backend
  checkVoucher: async (code) => {
    try {
      const token = localStorage.getItem('token');
      // Ngọc check lại endpoint này với Lead Backend nhé (ví dụ: /api/Voucher/check)
      const response = await axios.post(`${API_URL}/api/Voucher/check`, { code }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data; // Mong đợi trả về { success: true, discountAmount: 50000 }
    } catch (error) {
      console.error("Lỗi voucher:", error.response?.data || error.message);
      throw error;
    }
  }
};