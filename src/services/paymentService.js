import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const paymentService = {
  // 1. Xác thực kết quả thanh toán (Gọi vào BillController của Lead)
  verifyPaymentResult: async (searchParams) => {
    try {
      // Lead dặn gọi vào BillController
      const response = await axios.get(`${API_URL}/api/Bill/verify-result${searchParams}`);
      return response.data; 
    } catch (error) {
      console.error("Lỗi xác thực:", error.response?.data || error.message);
      throw error;
    }
  },

  // 2. Lấy lịch sử giao dịch (Sửa theo CustomerController hoặc BillController tùy Lead)
  getPaymentHistory: async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Thường Backend C# sẽ dùng endpoint /history cho người dùng hiện tại
      const response = await axios.get(`${API_URL}/api/Bill/history`, {
        headers: { 
          Authorization: `Bearer ${token}` // Đây là thứ giúp Backend biết bạn là ai
        }
      });
      
      return response.data; // Trả về List<BillDTO>
    } catch (error) {
      // Bóc lỗi theo chuẩn ApiResponse của Lead (Luật số 5)
      console.error("Lỗi lấy lịch sử:", error.response?.data?.Message || error.message);
      throw error;
    }
  }
};