import axios from 'axios';

/**
 * 🚀 MOSHI'S MASTER API CLIENT
 * Dùng file này để gọi API, cấm tự tạo axios =))
 */

// 1. Khởi tạo Axios
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
});

// 2. Interceptor (Sát thủ ngầm): Tự động nhét Token vào mọi Request
api.interceptors.request.use((config) => {
    // Tự động moi móc token ra từ LocalStorage
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Nhét vào Header
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// ==========================================
// 🔐 NHÓM TÀI KHOẢN (AUTH)
// ==========================================
export const authService = {
    // Gọi: authService.register({ email: '..', password: '..', name: '..', phoneNumber: '..' })
    register: async (data) => {
        const res = await api.post('/auth/register', data);
        return res.data;
    },
    // Trả về { message, token, user }
    login: async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        if (res.data.token) {
            localStorage.setItem('token', res.data.token); // Tự động lưu Token cho FE
        }
        return res.data;
    },
    getMe: async () => {
        const res = await api.get('/auth/me');
        return res.data;
    },
    logout: () => {
        localStorage.removeItem('token');
    }
};

// ==========================================
// 🎬 NHÓM PHIM (MOVIES)
// ==========================================
export const movieService = {
    getAll: async () => {
        const res = await api.get('/movies');
        
        // Format xíu data cho FE dễ thở (Giống code cũ của team)
        return res.data.map(m => ({
            ...m,
            trailerId: m.trailer,   
            duration: m.duration ? `Dự kiến: ${m.duration} phút` : "Đang cập nhật",
            cast: m.cast ? JSON.parse(m.cast) : []
        }));
    },
    // Lấy 1 phim + kèm Lịch chiếu
    getById: async (id) => {
        const res = await api.get(`/movies/${id}`);
        return res.data;
    }
};

// ==========================================
// 🏰 NHÓM RẠP & LỊCH CHIẾU
// ==========================================
export const cinemaService = {
    getCinemas: async () => {
        const res = await api.get('/cinemas');
        return res.data;
    },
    // params = { movieId: 1, cinemaId: 2, date: '2026-03-24' }
    getShowtimes: async (filters = {}) => {
        const res = await api.get('/showtimes', { params: filters });
        return res.data;
    }
};

// ==========================================
// 💺 NHÓM ĐẶT VÉ (BOOKING & SEATS)
// ==========================================
export const bookingService = {
    // Trả về { showtime, room, seats: [...] }
    getRoomLayout: async (showtimeId) => {
        const res = await api.get(`/showtimes/${showtimeId}/seats`);
        return res.data;
    },
    // Bấm vô ghế trống -> Lock 5 phút
    holdSeat: async (showtimeId, seatId) => {
        const res = await api.post('/bookings/hold', { 
            showtimeId: Number(showtimeId), 
            seatId: Number(seatId) 
        });
        return res.data;
    },
    // Thanh toán (Gửi mảng ghế)
    checkout: async (showtimeId, arraySeatIds, paymentMethod) => {
        const res = await api.post('/bookings/checkout', {
            showtimeId: Number(showtimeId),
            seatIds: arraySeatIds,
            paymentMethod
        });
        return res.data; // Trả về { message, bill }
    }
};

export default api;
