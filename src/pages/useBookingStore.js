import { create } from 'zustand';

export const useBookingStore = create((set) => ({
  // 0. Luồng đặt vé (Thêm mới)
  step: 'SEAT', // SEAT, FNB

  // 1. Thông tin lịch chiếu
  cinema: null,
  date: null,
  showtime: null,
  
  // 2. Thông tin ghế và F&B
  selectedSeats: [], // mảng chứa các object ghế: { id, type, price }
  fbItems: {},       // object lưu F&B: { itemId: { detail, quantity } }

  // 3. Actions cập nhật lịch chiếu
  setStep: (step) => set({ step }), // (Thêm mới)
  setBookingInfo: (key, value) => set({ [key]: value }),

  // 4. Actions cập nhật ghế (Tối đa 8 ghế)
  toggleSeat: (seat) => set((state) => {
    const isSelected = state.selectedSeats.some(s => s.id === seat.id);
    
    if (isSelected) {
      // Bỏ chọn ghế
      return { selectedSeats: state.selectedSeats.filter(s => s.id !== seat.id) };
    } else {
      // Chọn thêm ghế
      if (state.selectedSeats.length >= 8) {
        alert("Bạn chỉ được chọn tối đa 8 ghế cho mỗi giao dịch!");
        return state;
      }
      return { selectedSeats: [...state.selectedSeats, seat] };
    }
  }),

  // 5. Actions cập nhật F&B
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
  }),
}));