/**
 * 🚀 HƯỚNG DẪN COPY & PASTE TỪNG TRANG
 * ===================================
 * Lưu ý: Các hàm service tự động inject Bearer token từ Zustand store
 *       ✅ KHÔNG cần khác gì - chỉ gọi, token sẽ tự thêm!
 */

/* eslint-disable no-undef, no-unused-vars */

// ============================================================================
// 📄 TRANG ĐĂNG NHẬP / ĐĂNG KÝ (LoginPage.jsx)
// ============================================================================

import authService from '../services/authService';

// ✏️ HÀM ĐĂNG KÝ
const handleRegister = async (email, password, name, phoneNumber) => {
  const registerResult = await authService.register(email, password, name, phoneNumber);
  if (registerResult.success) {
    alert('✅ Đăng ký thành công! Vui lòng đăng nhập.');
  } else {
    alert('❌ ' + registerResult.error);
  }
};

// ✏️ HÀM ĐĂNG NHẬP
const handleLogin = async (email, password) => {
  const loginResult = await authService.login(email, password);
  if (loginResult.success) {
    alert('✅ Đăng nhập thành công!');
    // Navigate tới trang chủ
  } else {
    alert('❌ ' + loginResult.error);
  }
};

// ✏️ HÀM LOGOUT
const handleLogout = () => {
  authService.logout();
  alert('✅ Đã logout');
  // Navigate tới trang chủ
};

// ============================================================================
// 🎬 TRANG CHÍNH / DANH SÁCH PHIM (HomePage.jsx hoặc MoviePage.jsx)
// ============================================================================

import movieService from '../services/movieService';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✏️ GỌI API LẤY DANH SÁCH PHIM KHI COMPONENT LOAD
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const moviesResult = await movieService.getAllMovies();
      if (moviesResult.success) {
        setMovies(moviesResult.data);
      } else {
        console.error(moviesResult.error);
      }
      setLoading(false);
    };
    fetchMovies();
  }, []);

  if (loading) return <div>Đang tải phim...</div>;

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <img src={movie.poster} alt={movie.title} />
          <p>{movie.genre}</p>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// 🎫 TRANG CHỌN SUẤT CHIẾU / RẠPS (MovieDetailPage.jsx hoặc BookingPage.jsx)
// ============================================================================

import cinemaService from '../services/cinemaService';
import showtimeService from '../services/showtimeService';

const MovieDetailPage = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  const [cinemas, setCinemas] = useState([]);
  const [showtimes, setShowtimes] = useState([]);

  // ✏️ LẤY CHI TIẾT PHIM + SUẤT CHIẾU
  useEffect(() => {
    const fetchDetails = async () => {
      // Lấy thông tin phim (bao gồm showtimes)
      const movieResult = await movieService.getMovieDetails(movieId);
      if (movieResult.success) {
        setMovie(movieResult.data);
      }

      // Lấy danh sách rạp
      const cinemaResult = await cinemaService.getCinemas();
      if (cinemaResult.success) {
        setCinemas(cinemaResult.data);
      }

      // Lấy tất cả suất chiếu của phim này
      const showtimeResult = await showtimeService.getFilteredShowtimes(
        movieId,
        null, // cinemaId tuỳ chọn
        null  // dateString tuỳ chọn
      );
      if (showtimeResult.success) {
        setShowtimes(showtimeResult.data);
      }
    };
    fetchDetails();
  }, [movieId]);

  return (
    <div>
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <img src={movie.poster} alt={movie.title} />
          <p>Lịch chiếu:</p>
          {showtimes.map((showtime) => (
            <div key={showtime.id}>
              <p>{showtime.cinemaName} - {showtime.time}</p>
              <button onClick={() => handleSelectShowtime(showtime.id)}>
                Chọn suất này
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

// ============================================================================
// 💺 TRANG CHỌN GHẾ + LÀM PHIM (SeatSelectionPage.jsx)
// ============================================================================

import bookingService from '../services/bookingService';

const SeatSelectionPage = ({ showtimeId }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✏️ GỌI API LẤY SƠ ĐỒ PHÒNG & TRẠNG THÁI GHẾ
  useEffect(() => {
    const fetchSeats = async () => {
      setLoading(true);
      const layoutResult = await showtimeService.getRoomLayout(showtimeId);
      if (layoutResult.success) {
        setSeats(layoutResult.data.seats);
      }
      setLoading(false);
    };
    fetchSeats();
  }, [showtimeId]);

  // ✏️ KHI CLICK VÀO GHẾ - GỌI API GIỮ GHẾ
  const handleSelectSeat = async (seatId) => {
    if (selectedSeats.includes(seatId)) {
      // Bỏ chọn
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      // Giữ ghế
      const holdResult = await bookingService.holdSeat(showtimeId, seatId);
      if (holdResult.success) {
        setSelectedSeats([...selectedSeats, seatId]);
        console.log('✅ Ghế được giữ 5 phút');
      } else {
        alert('❌ ' + holdResult.error);
      }
    }
  };

  if (loading) return <div>Đang tải sơ đồ...</div>;

  return (
    <div>
      <h2>Chọn ghế</h2>
      <div className="theater-seats">
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => handleSelectSeat(seat.id)}
            disabled={seat.status !== 'AVAILABLE'}
            className={`seat ${seat.status} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>
      <p>Ghế chọn: {selectedSeats.join(', ')}</p>
      <button onClick={handleCheckout}>Thanh toán</button>
    </div>
  );
};

// ============================================================================
// 💳 TRANG THANH TOÁN (CheckoutPage.jsx)
// ============================================================================

const CheckoutPage = ({ showtimeId, selectedSeats }) => {
  const [paymentMethod, setPaymentMethod] = useState('VNPAY');
  const [processing, setProcessing] = useState(false);

  // ✏️ KHI CLICK NÚT "THANH TOÁN" - GỌI API CHECKOUT
  const handleConfirmPayment = async () => {
    setProcessing(true);
    const checkoutResult = await bookingService.checkoutBooking(
      showtimeId,
      selectedSeats,
      paymentMethod
    );

    if (checkoutResult.success) {
      console.log('✅ Thanh toán thành công!');
      console.log('Bill:', checkoutResult.data.bill);
      // ✏️ SAVE BILL VÀO ZUSTAND STORE NẾU CẦN, RỒI NAVIGATE TỚI PAYMENT RESULT PAGE
    } else {
      alert('❌ ' + checkoutResult.error);
    }
    setProcessing(false);
  };

  return (
    <div>
      <h2>Thanh toán vé</h2>
      <p>Ghế: {selectedSeats.join(', ')}</p>

      <label>
        Chọn phương thức thanh toán:
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="VNPAY">VNPay</option>
          <option value="MOMO">MoMo</option>
          <option value="CASH">Tiền mặt</option>
        </select>
      </label>

      <button onClick={handleConfirmPayment} disabled={processing}>
        {processing ? 'Đang xử lý...' : 'Xác nhận thanh toán'}
      </button>
    </div>
  );
};

// ============================================================================
// 📊 TRANG LỊCH SỬ ĐẶT VÉ (OrderHistoryPage.jsx)
// ============================================================================

const OrderHistoryPage = () => {
  const [bookings, setBookings] = useState([]);

  // ✏️ GỌI API LẤY LỊCH SỬ ĐẶT VÉ
  useEffect(() => {
    const fetchBookings = async () => {
      const bookingsResult = await bookingService.getUserBookings();
      if (bookingsResult.success) {
        setBookings(bookingsResult.data);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Lịch sử đặt vé</h2>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>{booking.movieTitle}</p>
          <p>Ghế: {booking.seatNumbers}</p>
          <button onClick={() => handleCancelBooking(booking.id)}>Hủy vé</button>
        </div>
      ))}
    </div>
  );
};

// ✏️ HÀM HỦY VÉ
const handleCancelBooking = async (bookingId) => {
  const cancelResult = await bookingService.cancelBooking(bookingId);
  if (cancelResult.success) {
    alert('✅ Hủy vé thành công');
  } else {
    alert('❌ ' + cancelResult.error);
  }
};

// ============================================================================
// ✨ QUICK REFERENCE - NHẬP NHANH
// ============================================================================

/*
🎬 PHIM:
  movieService.getAllMovies()           → Tất cả phim
  movieService.getMovieDetails(id)      → Chi tiết phim

👤 AUTH:
  authService.register(...)             → Đăng ký
  authService.login(...)                → Đăng nhập
  authService.logout()                  → Đăng xuất
  authService.getToken()                → Lấy token từ store
  authService.isAuthenticated()         → Kiểm tra auth

🏰 RẠP:
  cinemaService.getCinemas()            → Danh sách rạp

📅 SUẤT CHIẾU:
  showtimeService.getFilteredShowtimes(...) → Tìm suất chiếu
  showtimeService.getRoomLayout(id)     → Sơ đồ ghế

💺 ĐẶT VÉ:
  bookingService.holdSeat(...)          → Giữ ghế 5 phút
  bookingService.checkoutBooking(...)   → Thanh toán
  bookingService.getUserBookings()      → Lịch sử vé
  bookingService.cancelBooking(...)     → Hủy vé
*/
