/**
 * Showtime Service - API endpoints cho suất chiếu
 * ✅ Tuân thủ: ZUSTAND ONLY (không localStorage/sessionStorage)
 */

import api from './api';

export const showtimeService = {
  /**
   * 7. Bộ Lọc Tìm Kiếm Suất Chiếu Nhiều Mục Tiêu
   * @param {number} movieId - (tuỳ chọn) Lọc theo phim
   * @param {number} cinemaId - (tuỳ chọn) Lọc theo rạp
   * @param {string} dateString - (tuỳ chọn) Lọc theo ngày (VD: '2026-03-24')
   * @returns {Promise} Mảng suất chiếu khớp điều kiện
   */
  getFilteredShowtimes: async (movieId = null, cinemaId = null, dateString = null) => {
    try {
      const params = {};
      if (movieId) params.movieId = movieId;
      if (cinemaId) params.cinemaId = cinemaId;
      if (dateString) params.date = dateString;

      const res = await api.get('/showtimes', { params });
      console.log('✅ Lấy suất chiếu thành công:', res.data.length, 'suất');
      return { success: true, data: res.data };
    } catch (err) {
      console.error('❌ Lỗi lấy suất chiếu:', err.message);
      return {
        success: false,
        error: err.response?.data?.error || 'Lỗi lấy suất chiếu',
      };
    }
  },

  /**
   * 8. Lấy Sơ Đồ Phòng Chiếu + Trạng Thái Từng Ghế
   * Backend trả về trạng thái ghế:
   * - AVAILABLE: Trống (màu xám)
   * - BOOKED: Đã bán (màu đỏ)
   * - HELD: Đang giữ 5 phút (màu cam)
   *
   * @param {number} showtimeId - ID suất chiếu
   * @returns {Promise} { showtime, room, seats: [...] }
   */
  getRoomLayout: async (showtimeId) => {
    try {
      const res = await api.get(`/showtimes/${showtimeId}/seats`);
      console.log('✅ Lấy sơ đồ phòng chiếu ID:', showtimeId);
      console.log('   📊 Tổng ghế:', res.data.seats?.length);

      // Phân tích trạng thái ghế
      const seatStats = {
        available: res.data.seats?.filter((s) => s.status === 'AVAILABLE').length || 0,
        booked: res.data.seats?.filter((s) => s.status === 'BOOKED').length || 0,
        held: res.data.seats?.filter((s) => s.status === 'HELD').length || 0,
      };
      console.log('   📈 Ghế còn trống:', seatStats.available, '| Đã bán:', seatStats.booked, '| Đang giữ:', seatStats.held);

      return { success: true, data: res.data };
    } catch (err) {
      console.error('❌ Lỗi tải sơ đồ ghế:', err.message);
      return {
        success: false,
        error: err.response?.data?.error || 'Lỗi tải sơ đồ ghế',
      };
    }
  },
};

export default showtimeService;
