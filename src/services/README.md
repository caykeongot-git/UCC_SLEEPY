# 🎬 API Services - Cinema Ticketing System

## 📚 Overview

Tất cả các API service được thiết kế tuân theo:
- ✅ **ZUSTAND ONLY**: Token lưu trong store, không localStorage/sessionStorage
- ✅ **Bearer Token Injection**: Tự động thêm `Authorization: Bearer <token>` vào mọi request
- ✅ **Consistent Error Handling**: Tất cả hàm return `{ success: boolean, data/error }`
- ✅ **Logging**: Chi tiết request/response để debug dễ hơn

## 🚀 Quick Start

### 1. Verify Backend is Running
```bash
curl https://warm-squids-check.loca.lt/api/movies
```
Nên trả về JSON array của phim.

### 2. Check .env Configuration
```env
VITE_API_URL=https://warm-squids-check.loca.lt/api
```
⚠️ **QUAN TRỌNG**: URL phải kết thúc bằng `/api`

### 3. Import Services và Dùng
```javascript
import movieService from '../services/movieService';
import authService from '../services/authService';
import bookingService from '../services/bookingService';

// Lấy danh sách phim
const result = await movieService.getAllMovies();
if (result.success) {
  console.log('Movies:', result.data);
} else {
  console.error('Error:', result.error);
}
```

## 📁 Service Files Structure

```
src/services/
├── api.js (Axios instance + interceptors)
├── authService.js (Register, Login, Logout, Profile)
├── movieService.js (Get all movies, Get movie details)
├── cinemaService.js (Get cinemas list)
├── showtimeService.js (Filter showtimes, Get room layout)
├── bookingService.js (Hold seat, Checkout, History)
├── COPY_PASTE_GUIDE.js (Full page examples)
└── API_QUICK_REFERENCE.js (Cheat sheet)
```

## 🔐 Authentication Flow

```
1. User nhập email/password → authService.login()
   ↓
2. API trả về token → Zustand store lưu token (memory)
   ↓
3. Mọi request tiếp theo → api.js interceptor auto-inject Bearer token
   ↓
4. request headers: Authorization: Bearer <token>
   ↓
5. User logout → Token xóa khỏi Zustand, next requests không có token
   ↓
6. Backend return 401 → api.js auto-call logout từ store
```

## 📊 API Endpoints (10 Official APIs)

### Movies (2)
- `GET /movies` → `movieService.getAllMovies()`
- `GET /movies/:id` → `movieService.getMovieDetails(id)`

### Auth (3)
- `POST /auth/register` → `authService.register(...)`
- `POST /auth/login` → `authService.login(...)`
- `GET /auth/me` → `authService.getMyProfile()`

### Cinemas (1)
- `GET /cinemas` → `cinemaService.getCinemas()`

### Showtimes (2)
- `GET /showtimes?movieId=...&cinemaId=...&date=...` → `showtimeService.getFilteredShowtimes(...)`
- `GET /showtimes/:id/seats` → `showtimeService.getRoomLayout(id)`

### Bookings (2)
- `POST /bookings/hold` → `bookingService.holdSeat(...)`
- `POST /bookings/checkout` → `bookingService.checkoutBooking(...)`

*Bonus endpoints:*
- `GET /bookings/my-bookings` → `bookingService.getUserBookings()`
- `DELETE /bookings/:id` → `bookingService.cancelBooking(id)`

## 🛠️ Usage Examples by Page

### LoginPage.jsx
```javascript
import authService from '../services/authService';

// Đăng ký
const registerResult = await authService.register(email, password, name, phone);
if (registerResult.success) alert('✅ Đăng ký thành công');

// Đăng nhập
const loginResult = await authService.login(email, password);
if (loginResult.success) {
  console.log('✅ Token đã lưu trong Zustand');
  navigate('/home');
}
```

### HomePage.jsx
```javascript
import movieService from '../services/movieService';
import { useEffect, useState } from 'react';

useEffect(() => {
  (async () => {
    const result = await movieService.getAllMovies();
    if (result.success) setMovies(result.data);
  })();
}, []);
```

### SeatSelectionPage.jsx
```javascript
import showtimeService from '../services/showtimeService';
import bookingService from '../services/bookingService';

// Lấy sơ đồ ghế
const layoutResult = await showtimeService.getRoomLayout(showtimeId);
const seats = layoutResult.data.seats;

// Giữ ghế khi click
const holdResult = await bookingService.holdSeat(showtimeId, seatId);
if (holdResult.success) {
  setSelectedSeats([...selectedSeats, seatId]);
}
```

### CheckoutPage.jsx
```javascript
import bookingService from '../services/bookingService';

// Thanh toán
const checkoutResult = await bookingService.checkoutBooking(
  showtimeId,
  [1, 2, 5],  // seatIds
  'VNPAY'      // paymentMethod
);

if (checkoutResult.success) {
  console.log('🎉 Thanh toán thành công!');
  console.log('Bill:', checkoutResult.data.bill);
  navigate('/payment-result', { state: { bill: checkoutResult.data.bill } });
}
```

## 🎨 Seat Status Colors

- `AVAILABLE` → Xám (có thể chọn)
- `BOOKED` → Đỏ (đã bán)
- `HELD` → Cam (đang giữ 5 phút)

## 🚨 Common Errors & Solutions

### Error: "VITE_API_URL chưa được thiết lập"
**Solution**: Thêm `VITE_API_URL` vào `.env`
```env
VITE_API_URL=https://warm-squids-check.loca.lt/api
```

### Error: "CORS error" hoặc "no 'Access-Control-Allow-Origin'"
**Solution**: Backend cần configure CORS headers
- Backend phải thêm: `res.header('Access-Control-Allow-Origin', 'http://localhost:517x')`
- Hoặc dùng `cors` package

### Error: "401 Unauthorized" hoặc "Token hết hạn"
**Solution**: 
- User chưa login → Gọi `authService.login()` trước
- Token expired → User logout tự động, login lại

### Error: "Hold seat thất bại" + status 409
**Solution**: Ghế vừa bị mua bởi người khác → Refresh sơ đồ ghế

### Error: "Checkout thất bại" + "Ghế không được giữ"
**Solution**: 
- Ghế không được giữ sẽ hết hạn sau 5 phút
- User phải chọn lại và giữ ghostế trước khi checkout

## 📝 Response Formats

### Successful Response (2xx)
```javascript
{
  success: true,
  data: {
    // Tuỳ API, có thể là array, object, hoặc primitive
  }
}
```

### Error Response (4xx-5xx)
```javascript
{
  success: false,
  error: "Lỗi chi tiết từ Backend hoặc từ error handler"
}
```

## 🔍 Debugging Tips

### 1. Check Console Logs
Mỗi request sẽ log: `🚀 [API Request]: GET /movies`
Response errors sẽ log: `❌ 404: Không tìm thấy endpoint`

### 2. Open DevTools → Network Tab
- Kiểm tra request headers có Authorization: Bearer token không
- Kiểm tra response headers có CORS headers không
- Kiểm tra response status (200, 401, 404, 500, etc.)

### 3. Verify Backend URL
```bash
# Test API endpoint directly
curl https://warm-squids-check.loca.lt/api/movies -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Check Zustand Store
```javascript
// Trong console
import useAuthStore from './src/context/authStore';
console.log(useAuthStore.getState()); // Xem token, user, isAuthenticated
```

## ✅ Checklist trước Production

- [ ] All VITE_API_URL configured correctly (ends with `/api`)
- [ ] All services imported từ correct paths
- [ ] Token được lưu trong Zustand (không localStorage)
- [ ] Error handling implemented trên tất cả API calls
- [ ] CORS enabled trên backend
- [ ] Seat holding works (5 min timeout)
- [ ] Checkout flow completes end-to-end
- [ ] Logged out user cannot access protected endpoints

## 📞 Support

Nếu gặp lỗi:
1. Kiểm tra F12 Console → Application tab (xem VITE_API_URL)
2. F12 Network tab → xem request/response headers
3. Thêm `console.log()` trong các hàm service để trace flow
4. Verify backend running: `curl https://warm-squids-check.loca.lt/api/movies`
