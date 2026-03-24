/**
 * Auth Service - API endpoints cho xác thực
 * ✅ Tuân thủ: ZUSTAND ONLY (không localStorage/sessionStorage)
 * Note: Dùng Zustand authStore trực tiếp, không cần tạo service wrapper
 */

import useAuthStore from '../context/authStore';

export const authService = {
  /**
   * 3. Đăng Ký Tài Khoản
   */
  register: async (email, password, name, phoneNumber) => {
    const result = await useAuthStore.getState().register(email, password, name, phoneNumber);
    return result;
  },

  /**
   * 4. Đăng Nhập & Lưu Token vào Zustand
   */
  login: async (email, password) => {
    const result = await useAuthStore.getState().login(email, password);
    if (result.success) {
      console.log('✅ Đăng nhập thành công, token lưu trong Zustand store');
    }
    return result;
  },

  /**
   * 5. Lấy Thông Tin Cá Nhân (Xem Profile/Điểm)
   * Bắt buộc phải đăng nhập (request tự động gắn Bearer token)
   */
  getMyProfile: async () => {
    const result = await useAuthStore.getState().fetchUser();
    return result;
  },

  /**
   * Logout - Xóa token khỏi Zustand
   */
  logout: () => {
    useAuthStore.getState().logout();
    console.log('✅ Đã logout, token xóa khỏi Zustand store');
    return { success: true };
  },

  /**
   * Lấy token hiện tại từ Zustand (tuỳ mục đích)
   */
  getToken: () => {
    return useAuthStore.getState().token;
  },

  /**
   * Kiểm tra đã đăng nhập chưa
   */
  isAuthenticated: () => {
    return useAuthStore.getState().isAuthenticated;
  },
};

export default authService;
