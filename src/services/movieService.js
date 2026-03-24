/**
 * Movie Service - API endpoints cho phim ảnh
 * ✅ Tuân thủ: ZUSTAND ONLY (không localStorage/sessionStorage)
 */

import api from './api';

/**
 * 1. Lấy tất cả danh sách Phim chiếu rạp (Trang Chủ)
 * @returns {Promise} Mảng phim: [{ id, title, poster, trailer, genre, ... }]
 */
export const movieService = {
  getAllMovies: async () => {
    try {
      const res = await api.get('/movies');
      console.log('✅ Lấy danh sách phim thành công:', res.data.length, 'bộ phim');
      return { success: true, data: res.data };
    } catch (err) {
      console.error('❌ Lỗi lấy danh sách phim:', err.message);
      return {
        success: false,
        error: err.response?.data?.error || 'Lỗi lấy danh sách phim',
      };
    }
  },

  /**
   * 2. Lấy Chi Tiết Phim + Lịch Chiếu của nó
   * @param {number} movieId - ID của phim
   * @returns {Promise} Object phim với mảng showtimes
   */
  getMovieDetails: async (movieId) => {
    try {
      const res = await api.get(`/movies/${movieId}`);
      console.log('✅ Lấy chi tiết phim ID:', movieId);
      return { success: true, data: res.data };
    } catch (err) {
      console.error('❌ Lỗi lấy chi tiết phim:', err.message);
      return {
        success: false,
        error: err.response?.data?.error || 'Không tìm thấy phim',
      };
    }
  },
};

export default movieService;
