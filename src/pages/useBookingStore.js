import { create } from 'zustand';
import api from '../services/api';

export const useBookingStore = create((set, get) => ({
  step: 'SEAT',

  // 1. Data Dictionary
  movies: [],
  cinemas: [],
  showtimes: [],
  seatMap: [],
  
  // 2. Transitory Selections
  selectedMovie: null,
  selectedCinema: null,
  selectedDate: null,
  selectedShowtime: null,
  selectedSeats: [],
  fbItems: {},
  
  loading: false,

  // 3. Khởi tạo danh sách Phim và Rạp
  fetchInitial: async () => {
    try {
      set({ loading: true });
      const [mRes, cRes] = await Promise.all([
        api.get('/movies'),
        api.get('/cinemas')
      ]);
      const moviesList = mRes.data.movies || mRes.data || [];
      const cinemasList = cRes.data.cinemas || cRes.data || [];
      
      set({ movies: moviesList, cinemas: cinemasList, loading: false });
    } catch (error) {
       console.error("Init Request Error", error);
       set({ loading: false });
    }
  },

  // 4. Lắng nghe cập nhật thông tin chiếu và cascade
  setSelection: (key, value) => {
    set({ [key]: value });
    
    // Nếu Reset lại Phim hoặc Rạp hoặc Ngày 
    if (['selectedMovie', 'selectedCinema', 'selectedDate'].includes(key)) {
       set({ selectedShowtime: null, showtimes: [], selectedSeats: [], seatMap: [] });
       
       const { selectedMovie, selectedCinema, selectedDate } = get();
       if (selectedMovie && selectedCinema && selectedDate) {
          get().fetchShowtimes();
       }
    }
    // Nếu Reset lại Suất chiếu
    if (key === 'selectedShowtime') {
       set({ selectedSeats: [], seatMap: [] });
       if (value) get().fetchSeats(value.id || value._id);
    }
  },

  fetchShowtimes: async () => {
    const { selectedMovie, selectedCinema, selectedDate } = get();
    const mId = selectedMovie?.id || selectedMovie?._id;
    const cId = selectedCinema?.id || selectedCinema?._id;
    
    try {
       // Query đúng cấu trúc Backend yêu cầu
       const res = await api.get(`/showtimes?movieId=${mId}&cinemaId=${cId}&date=${selectedDate}`);
       set({ showtimes: res.data.showtimes || res.data || [] });
    } catch (e) {
       console.error("Lỗi lấy suất chiếu:", e);
    }
  },

  fetchSeats: async (showtimeId) => {
    try {
      set({ loading: true });
      const res = await api.get(`/showtimes/${showtimeId}/seats`);
      set({ seatMap: res.data.seats || res.data || [], loading: false });
    } catch (e) {
      console.error(e);
      set({ loading: false });
    }
  },

  // Khóa ghế (giữ tạm 5 phút)
  toggleSeat: async (seat) => {
    if (seat.status !== 'AVAILABLE') return;
    
    const state = get();
    const isSelected = state.selectedSeats.some(s => (s.id || s._id) === (seat.id || seat._id));
    
    if (isSelected) {
      set({ selectedSeats: state.selectedSeats.filter(s => (s.id || s._id) !== (seat.id || seat._id)) });
    } else {
      if (state.selectedSeats.length >= 8) {
        alert("Bạn chỉ được chọn tối đa 8 ghế!");
        return;
      }
      
      try {
        const sid = state.selectedShowtime.id || state.selectedShowtime._id;
        // Bắn API Khóa ghế 5 phút theo tài liệu (Yêu cầu phải ép kiểu Number)
        await api.post('/bookings/hold', { 
          showtimeId: Number(sid), 
          seatId: Number(seat.id || seat._id) 
        });
        
        set({ selectedSeats: [...state.selectedSeats, { ...seat, status: 'HELD' }] });
        
        // Cập nhật ma trận ghế local mượt mà
        const updatedMap = state.seatMap.map(s => 
           (s.id === seat.id || s._id === seat._id) ? { ...s, status: 'HELD' } : s
        );
        set({ seatMap: updatedMap });
      } catch (err) {
        alert(err.response?.data?.message || "Lỗi giữ ghế (có thể người khác vừa giành lấy)!");
        // Refresh lại map ngay lập tức
        if (state.selectedShowtime) get().fetchSeats(state.selectedShowtime.id || state.selectedShowtime._id);
      }
    }
  },

  checkout: async (paymentMethod) => {
    const state = get();
    try {
      set({ loading: true });
      // Yêu cầu mảng Số nguyên và phương thức thanh toán in hoa ("VNPAY")
      const seatIds = state.selectedSeats.map(s => Number(s.id || s._id));
      const sid = Number(state.selectedShowtime.id || state.selectedShowtime._id);
      
      await api.post('/bookings/checkout', { 
         showtimeId: sid, 
         seatIds, 
         paymentMethod: paymentMethod.toUpperCase() 
      });
      set({ loading: false });
      return true;
    } catch (err) {
      set({ loading: false });
      alert(err.response?.data?.message || "Thanh toán thất bại, giao dịch đã Rollback!");
      return false;
    }
  },

  setStep: (step) => set({ step }),

  updateFBItem: (item, change) => set((state) => {
    const currentQty = state.fbItems[item.id]?.quantity || 0;
    const newQty = currentQty + change;
    
    if (newQty <= 0) {
      const newFbItems = { ...state.fbItems };
      delete newFbItems[item.id];
      return { fbItems: newFbItems };
    }

    return {
      fbItems: {
        ...state.fbItems,
        [item.id]: { ...item, quantity: newQty }
      }
    };
  })
}));