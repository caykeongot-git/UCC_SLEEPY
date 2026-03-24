/**
 * Booking Service - API endpoints cho đặt vé
 * ✅ Tuân thủ: ZUSTAND ONLY (không localStorage/sessionStorage)
 * ⚠️ CẢ HAI HÀM ĐỀU ĐÒI TỔN ĐĂNG NHẬP (Bearer token auto-inject)
 */

import api from './api';

export const bookingService = {
  /**
   * 9. Giữ Ghế (Click vô ghế trống -> Lock ghế lại 5 phút)
   * ⚠️ BẮT BUỘC: Phải đăng nhập trước
   *
   * @param {number} showtimeId - ID suất chiếu
   * @param {number} seatId - ID ghế
   * @returns {Promise} { success, data/error }
   */
  holdSeat: async (showtimeId, seatId) => {
    try {
      const res = await api.post('/bookings/hold', {
        showtimeId: Number(showtimeId),
        seatId: Number(seatId),
      });
      console.log('✅ Giữ ghế thành công! Bạn có 5 phút để thanh toán.');
      return { success: true, data: res.data };
    } catch (err) {
      console.error('❌ Giữ ghế thất bại:', err.message);
      const errorMsg = err.response?.data?.error || 'Giữ ghế thất bại!';

      // Kiểm tra nếu có người khác nhanh tay hơn
      if (err.response?.status === 409) {
        console.warn('⚠️ Ghế này vừa bị mua bởi người khác rồi!');
      }

      return {
        success: false,
        error: errorMsg,
      };
    }
  },

  /**
   * 10. Thanh Toán (Tạo Hóa Đơn & Mã Vé)
   * ⚠️ BẮT BUỘC: Phải đăng nhập trước
   *
   * @param {number} showtimeId - ID suất chiếu
   * @param {array} seatIds - Mảng ID ghế (VD: [1, 2, 5])
   * @param {string} paymentMethod - Phương thức thanh toán: "VNPAY" | "MOMO" | "CASH"
   * @returns {Promise} { success, data (chứa bill)/error }
   */
  checkoutBooking: async (showtimeId, seatIds, paymentMethod) => {
    try {
      // Validate input
      if (!Array.isArray(seatIds) || seatIds.length === 0) {
        throw new Error('Phải chọn ít nhất 1 ghế');
      }

      if (!['VNPAY', 'MOMO', 'CASH'].includes(paymentMethod)) {
        throw new Error('Phương thức thanh toán không hợp lệ');
      }

      const res = await api.post('/bookings/checkout', {
        showtimeId: Number(showtimeId),
        seatIds: seatIds.map((id) => Number(id)),
        paymentMethod: paymentMethod.toUpperCase(),
      });

      console.log('🎉 MUA VÉ THÀNH CÔNG RỰC RỠ!');
      console.log('📋 Hóa đơn:', res.data.bill);

      return { success: true, data: res.data };
    } catch (err) {
      console.error('❌ Thanh toán thất bại:', err.message);
      return {
        success: false,
        error: err.response?.data?.error || err.message || 'Thất bại, tiền chưa đi',
      };
    }
  },

  /**
   * Lấy lịch sử đặt vé của user (tuỳ chọn)
   */
  getUserBookings: async () => {
    try {
      const res = await api.get('/bookings/my-bookings');
      console.log('✅ Lấy lịch sử đặt vé thành công');
      return { success: true, data: res.data };
    } catch (err) {
      console.error('❌ Lỗi lấy lịch sử đặt vé:', err.message);
      return {
        success: false,
        error: err.response?.data?.error || 'Lỗi lấy lịch sử',
      };
    }
  },

  /**
   * Hủy đặt vé (tuỳ chọn)
   */
  cancelBooking: async (bookingId) => {
    try {
      const res = await api.delete(`/bookings/${bookingId}`);
      console.log('✅ Hủy đặt vé thành công');
      return { success: true, data: res.data };
    } catch (err) {
      console.error('❌ Lỗi hủy đặt vé:', err.message);
      return {
        success: false,
        error: err.response?.data?.error || 'Lỗi hủy đặt vé',
      };
    }
  },
};

export default bookingService;
