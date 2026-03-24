/**
 * Cinema Service - API endpoints cho cụm rạp
 * ✅ Tuân thủ: ZUSTAND ONLY (không localStorage/sessionStorage)
 */

import api from './api';

export const cinemaService = {
  /**
   * 6. Lấy Danh Sách Cụm Rạp (Trang Chọn Rạp)
   * @returns {Promise} Mảng rạp: [{ id, name, address: {...}, rooms: [...] }]
   */
  getCinemas: async () => {
    try {
      const res = await api.get('/cinemas');
      console.log('✅ Lấy danh sách rạp thành công:', res.data.length, 'cụm rạp');
      return { success: true, data: res.data };
    } catch (err) {
      console.error('❌ Lỗi lấy danh sách rạp:', err.message);
      return {
        success: false,
        error: err.response?.data?.error || 'Lỗi lấy danh sách rạp',
      };
    }
  },

  /**
   * Lấy chi tiết 1 rạp (nếu cần)
   */
  getCinemaById: async (cinemaId) => {
    try {
      const res = await api.get(`/cinemas/${cinemaId}`);
      console.log('✅ Lấy chi tiết rạp ID:', cinemaId);
      return { success: true, data: res.data };
    } catch (err) {
      console.error('❌ Lỗi lấy chi tiết rạp:', err.message);
      return {
        success: false,
        error: err.response?.data?.error || 'Không tìm thấy rạp',
      };
    }
  },
};

export default cinemaService;
