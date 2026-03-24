/**
 * 🎯 QUICK REFERENCE - API SERVICE CHEAT SHEET
 * ============================================
 * Copy-paste nhanh gọn cho mỗi trang
 */

/* eslint-disable no-undef, no-unused-vars */

// ============================================================================
// 【1】 TRANG LOGIN - LoginPage.jsx
// ============================================================================

import authService from '../services/authService';

// Đăng ký
const registerResult = await authService.register(email, password, name, phoneNumber);
console.log(registerResult.success ? '✅ Đăng ký ok' : '❌ ' + registerResult.error);

// Đăng nhập
const loginResult = await authService.login(email, password);
if (loginResult.success) {
  console.log('✅ Token đã lưu trong Zustand store');
  // Navigate tới trang chủ
}

// Logout
authService.logout(); // ✅ token xóa khỏi store

// ============================================================================
// 【2】 TRANG CHÍNH - HomePage.jsx
// ============================================================================

import movieService from '../services/movieService';

// Tất cả phim
const moviesResult = await movieService.getAllMovies();
// moviesResult.data = [ { id, title, poster, genre, ... }, ... ]

// ============================================================================
// 【3】 TRANG CHI TIẾT PHIM - MovieDetailPage.jsx
// ============================================================================

import cinemaService from '../services/cinemaService';
import showtimeService from '../services/showtimeService';

// Thông tin phim
const movieResult = await movieService.getMovieDetails(movieId);
// movieResult.data = { id, title, poster, showtimes: [...], ... }

// Danh sách rạp
const cinemaResult = await cinemaService.getCinemas();
// cinemaResult.data = [ { id, name, address, rooms }, ... ]

// Suất chiếu (lọc theo phim)
const showtimeResult = await showtimeService.getFilteredShowtimes(movieId);
// showtimeResult.data = [ { id, time, cinema, price, ... }, ... ]

// ============================================================================
// 【4】 TRANG CHỌN GHẾ - SeatSelectionPage.jsx
// ============================================================================

import bookingService from '../services/bookingService';

// Sơ đồ ghế & trạng thái
const layoutResult = await showtimeService.getRoomLayout(showtimeId);
// layoutResult.data = {
//   showtime: {...},
//   room: "Phòng 1",
//   seats: [
//     { id: 1, seatNumber: "A1", status: "AVAILABLE" },
//     { id: 2, seatNumber: "A2", status: "BOOKED" },
//     { id: 3, seatNumber: "A3", status: "HELD" },
//     ...
//   ]
// }

// Khi click ghế → Giữ ghế
const holdResult = await bookingService.holdSeat(showtimeId, seatId);
if (holdResult.success) {
  console.log('✅ Ghế được giữ 5 phút');
  // Thêm ghế vào mảng selectedSeats (sử dụng Zustand store)
  // Ví dụ: useBookingStore.getState().selectSeat(seatId);
}

// ============================================================================
// 【5】 TRANG THANH TOÁN - CheckoutPage.jsx
// ============================================================================

// Click nút Thanh toán
const checkoutResult = await bookingService.checkoutBooking(
  showtimeId,  // ID suất chiếu
  [1, 2, 5],   // Mảng ID ghế
  'VNPAY'      // 'VNPAY' | 'MOMO' | 'CASH'
);

if (checkoutResult.success) {
  console.log('🎉 Thanh toán thành công!');
  // checkoutResult.data.bill = { id, code, movieTitle, seatNumbers, price, ... }
  // checkoutResult.data.transactionId = "TXN_123456"
  // Lưu bill vào store rồi navigate tới PaymentResult page
  // Ví dụ: usePaymentStore.getState().setBill(checkoutResult.data.bill);
}

// ============================================================================
// 【6】 TRANG LỊCH SỬ - TransactionHistoryPage.jsx
// ============================================================================

// Lấy tất cả đặt vé của user
const bookingsResult = await bookingService.getUserBookings();
// bookingsResult.data = [
//   { id, movieTitle, seatNumbers, price, status, createdAt },
//   ...
// ]

// Hủy vé
const cancelResult = await bookingService.cancelBooking(bookingId);
if (cancelResult.success) {
  console.log('✅ Hủy vé thành công');
}

// ============================================================================
// 【KEY POINTS】- ĐỌC KỸ NHÉ!
// ============================================================================

/*
✅ TOKEN:
   - Tự động inject vào tất cả requests (Bearer token)
   - Lưu trong Zustand store (authStore), KHÔNG localStorage
   - api.js đã bắt error 401 → auto logout

✅ ERROR HANDLING:
   Tất cả hàm return: { success: boolean, data/error: any }
   
   Cách dùng:
   const result = await serviceFunc(...);
   if (result.success) {
     // Xử lý data: result.data
   } else {
     // Xử lý lỗi: result.error
   }

✅ STATUS GHẾ (Rất quan trọng!):
   'AVAILABLE' → Trống, có thể chọn
   'BOOKED'    → Đã bán, không thể chọn
   'HELD'      → Được giữ 5 phút, không thể chọn (sắp hết hạn)

✅ PAYMENT METHODS:
   'VNPAY'  → chuyển tiền
   'MOMO'   → Mobile wallet
   'CASH'   → Tiền mặt (thanh toán tại quầy)

✅ CẤM DÙNG:
   ❌ localStorage.setItem()
   ❌ sessionStorage
   ❌ Fetch API (dùng axios từ api.js)
   ❌ Hardcode URLs (dùng VITE_API_URL trong .env)
*/

// ============================================================================
// 【IMPORT CẢM LẠI】
// ============================================================================

// import movieService from '../services/movieService';
// import authService from '../services/authService';
// import cinemaService from '../services/cinemaService';
// import showtimeService from '../services/showtimeService';
// import bookingService from '../services/bookingService';
