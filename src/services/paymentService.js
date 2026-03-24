/**
 * Payment Service - API endpoints cho thanh toán và voucher
 * ✅ Tuân thủ: ZUSTAND ONLY (không localStorage/sessionStorage)
 * Note: Tự động inject Bearer token từ Zustand store
 */

import api from './api';

export const paymentService = {
  /**
   * 1. Tạo link thanh toán (MoMo/VNPay)
   * @param {object} paymentData - { amount, orderInfo, paymentMethod }
   * @returns {Promise} { success, paymentUrl, orderId }
   */
  createPaymentUrl: async (paymentData) => {
    try {
      const response = await api.post('/payments/create-url', paymentData);
      console.log('✅ Tạo link thanh toán thành công');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ Lỗi tạo link thanh toán:', error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Không thể tạo link thanh toán',
      };
    }
  },

  /**
   * 2. Xác thực kết quả thanh toán sau khi quay lại từ cổng
   * @param {string} searchParams - Query string từ return URL
   * @returns {Promise} { success, transactionId, status }
   */
  verifyPaymentResult: async (searchParams) => {
    try {
      const response = await api.get(`/payments/verify${searchParams}`);
      console.log('✅ Xác thực thanh toán thành công');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ Lỗi xác thực thanh toán:', error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Xác thực thất bại',
      };
    }
  },

  /**
   * 3. Lấy lịch sử giao dịch của user
   * @returns {Promise} Array các giao dịch
   */
  getPaymentHistory: async () => {
    try {
      const response = await api.get('/payments/history');
      console.log('✅ Lấy lịch sử thanh toán thành công');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ Lỗi lấy lịch sử thanh toán:', error.message);
      return {
        success: false,
        data: [], // Return empty array on error
      };
    }
  },

  /**
   * 4. Kiểm tra và áp dụng Voucher
   * @param {string} code - Mã voucher
   * @param {number} orderAmount - Tổng tiền đơn hàng
   * @returns {Promise} { success, discountAmount, finalAmount, voucherInfo }
   */
  checkAndApplyVoucher: async (code, orderAmount) => {
    try {
      const response = await api.post('/vouchers/apply', {
        code: code.toUpperCase(),
        orderAmount,
      });
      console.log('✅ Áp dụng voucher thành công');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ Lỗi áp dụng voucher:', error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Mã voucher không hợp lệ',
      };
    }
  },

  /**
   * 5. Lấy danh sách voucher có sẵn của user
   * @returns {Promise} Array các voucher
   */
  getUserVouchers: async () => {
    try {
      const response = await api.get('/vouchers/my-vouchers');
      console.log('✅ Lấy danh sách voucher thành công');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ Lỗi lấy voucher:', error.message);
      return {
        success: false,
        data: [],
      };
    }
  },

  /**
   * 7. Lấy lịch sử vé đã đặt của user
   * @returns {Promise} Array các vé
   */
  getUserTickets: async () => {
    try {
      const response = await api.get('/tickets/my-tickets');
      console.log('✅ Lấy lịch sử vé thành công');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ Lỗi lấy lịch sử vé:', error.message);
      return {
        success: false,
        data: [],
      };
    }
  },
};

export default paymentService;