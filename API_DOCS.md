# 📖 TÀI LIỆU API CHUẨN (HƯỚNG DẪN COPY & PASTE CHO TỤI BÂY)

Anh em Frontend thân mến, thấy anh em gọi API lỗi tùm lum tà la nên Lead (Moshi) đã ép tớ phải viết hẳn file Document này. 
Dưới đây là TOÀN BỘ danh sách API đã được Backend mở cửa và Code Axios mẫu để anh em **COPY & PASTE** thẳng vào file `Service` hoặc `Component` của màn hình tương ứng. Đừng tự chế code nữa nhé! 

*(Nhớ đảm bảo file `.env` đã có `VITE_API_URL` trỏ đúng vào link hầm của Moshi đưa).*

---

### IMPORT CHUNG DÙNG CHO MỌI FILE
```javascript
import axios from 'axios';

// Copy cục này khởi tạo đầu file
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true 
});

// Hàm lấy Token (Dùng cho các hàm đòi Auth)
const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // Hoặc lấy từ Zustand tuỳ anh em
  return { headers: { Authorization: `Bearer ${token}` } };
};
```

---

## 🎬 NHÓM API: PHIM ẢNH (MOVIES)

### 1. Lấy tất cả danh sách Phim chiếu rạp (Trang Chủ)
```javascript
export const getAllMovies = async () => {
  try {
    const res = await api.get('/movies');
    return res.data; // Trả về mảng: [{ id, title, poster, trailer, genre, ... }]
  } catch (err) {
    console.error("Lỗi lấy danh sách phim:", err);
  }
};
```

### 2. Lấy Chi Tiết Phim + Lịch Chiếu của nó (Trang Detail / Booking)
```javascript
export const getMovieDetails = async (movieId) => {
  try {
    const res = await api.get(`/movies/${movieId}`);
    return res.data; // Trả về 1 Object Phim, có kèm luôn mảng `showtimes` bên trong!
  } catch (err) {
    console.error("Lỗi lấy chi tiết phim:", err);
  }
};
```

---

## 👤 NHÓM API: TÀI KHOẢN (AUTH)

### 3. Đăng Ký Tài Khoản
```javascript
export const registerUser = async (email, password, name, phoneNumber) => {
  try {
    const res = await api.post('/auth/register', {
      email, password, name, phoneNumber
    });
    alert(res.data.message); // Đăng ký thành công
  } catch (err) {
    alert(err.response?.data?.error || "Lỗi đăng ký!");
  }
};
```

### 4. Đăng Nhập & Lưu Token (QUAN TRỌNG)
```javascript
export const loginUser = async (email, password) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    
    // Lưu token này vào Giỏ hàng / LocalStorage / Zustand để xài cho bước đặt vé
    localStorage.setItem('token', res.data.token); 
    
    alert("Đăng nhập thành công!");
    return res.data.user; // Trả về { id, name, email }
  } catch (err) {
    alert(err.response?.data?.error || "Sai tài khoản / mật khẩu!");
  }
};
```

### 5. Lấy Thông Tin Cá Nhân (Xem Profile/Điểm) -> Bắt buộc có Token
```javascript
export const getMyProfile = async () => {
  try {
    const res = await api.get('/auth/me', getAuthHeaders());
    return res.data; // Trả về { id, name, email, phoneNumber, points }
  } catch (err) {
    console.error("Chưa đăng nhập, không có quyền lấy Profile", err);
  }
};
```

---

## 🏰 NHÓM API: RẠP CHIẾU & SUẤT CHIẾU

### 6. Lấy Danh Sách Cụm Rạp (Trang Chọn Rạp)
```javascript
export const getCinemas = async () => {
  try {
    const res = await api.get('/cinemas');
    return res.data; // Trả về Mảng Rạp: [{ id, name, address: {...}, rooms: [...] }]
  } catch (err) {
    console.error("Lỗi lấy cụm rạp:", err);
  }
};
```

### 7. Bộ Lọc Tìm Kiếm Suất Chiếu Nhiều Mục Tiêu
```javascript
export const getFilteredShowtimes = async (movieId = null, cinemaId = null, dateString = null) => {
  try {
    // Có thể truyền null nếu chỉ muốn lọc theo ngày hoặc rạp!
    const params = {};
    if (movieId) params.movieId = movieId;
    if (cinemaId) params.cinemaId = cinemaId;
    if (dateString) params.date = dateString; // VD: '2026-03-24'

    const res = await api.get('/showtimes', { params });
    return res.data; // Trả về mảng suất chiếu khớp điều kiện
  } catch (err) {
    console.error("Lỗi kiếm suất chiếu:", err);
  }
};
```

---

## 💺 NHÓM API: CHỌN GHẾ TỚI THANH TOÁN (CORE CỰC CĂNG)

### 8. Lấy Sơ Đồ Phòng Chiếu + Trạng Thái Từng Ghế (Màu sắc)
API này Backend đã mất não Code để check dùm anh em trạng thái từng cái ghế là Xanh, Đỏ hay Xám. Chỉ việc render!
```javascript
export const getRoomLayout = async (showtimeId) => {
  try {
    const res = await api.get(`/showtimes/${showtimeId}/seats`);
    return res.data; // Trả về { showtime: {...}, room: "Tên phòng", seats: [Mảng 50 Ghế] }
    /* QUAN TRỌNG NHẤT:
       Mảng `seats` có sẵn biến `status`. 
       - Nếu status === 'AVAILABLE' -> Tô màu Xám Bạc (Trống)
       - Nếu status === 'BOOKED' -> Tô màu Đỏ (Đã có thằng mua)
       - Nếu status === 'HELD' -> Tô màu Cam (Đang bị giữ tạm, đéo cho mua)
    */
  } catch (err) {
    console.error("Lỗi tải sơ đồ ghế:", err);
  }
};
```

### 9. Giữ Ghế (Click vô ghế trống -> Lock ghế lại 5 phút)
Hàm này đòi Đăng nhập! Khi bấm vào cái ghế, gọi ngay!
```javascript
export const holdSeat = async (showtimeId, seatId) => {
  try {
    const res = await api.post('/bookings/hold', {
      showtimeId: Number(showtimeId),
      seatId: Number(seatId)
    }, getAuthHeaders());
    
    alert("Giữ ghế thành công! Bạn có 5 phút để thanh toán.");
  } catch (err) {
    // Nó sẽ báo lỗi nếu xui xẻo có đứa khác bấm nhanh tay hơn 0.5s!
    alert(err.response?.data?.error || "Giữ ghế thất bại!");
  }
};
```

### 10. Thanh Toán (Tạo Hóa Đơn & Mã Vé)
Cục chót! Bấm nút "Purchase" để rớt tiền ra vé. Đòi Đăng nhập!
```javascript
export const checkoutBooking = async (showtimeId, arraySeatIds, paymentMethod) => {
  try {
    // arraySeatIds nhớ đổi ra mảng số nhé: [1, 2, 5]
    // paymentMethod truyền 1 trong 3 chữ: "VNPAY", "MOMO", "CASH"
    const res = await api.post('/bookings/checkout', {
      showtimeId: Number(showtimeId),
      seatIds: arraySeatIds,
      paymentMethod: paymentMethod 
    }, getAuthHeaders());

    alert("MUA VÉ THÀNH CÔNG RỰC RỠ!");
    console.log("Xem Bill mọc ra nè:", res.data.bill);
  } catch (err) {
    alert(err.response?.data?.error || "Thất bại, tiền chưa đi");
  }
};
```

---
**YÊU CẦU CỦA TECH LEAD MOSHI:** Mọi người bám cứng vào 10 cục API mẫu trên này nhé! Lỗi lầm gì cấm đổ thừa BE chết API!
