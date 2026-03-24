/**
 * Booking Store - State management cho đặt vé
 * ✅ Tuân thủ: ZUSTAND ONLY (không localStorage/sessionStorage)
 * Note: Các methods API-heavy nên dùng bookingService thay vì gọi trực tiếp
 */

import { create } from 'zustand';
import { paymentService } from '../services/paymentService';

const useBookingStore = create((set, get) => ({
  // State
  selectedSeats: [],
  howtimeId: null,
  heldSeats: [],
  movieId: null,
  cinemaId: null,
  showtimeDetails: null, // { id, time, price, cinemaName, movieTitle, ... }
  roomLayout: null, // { showtime, room, seats: [...] }

  // ✏️ SET SHOWTIME & RESET BOOKING
  setShowtime: (showtimeId, movieId = null, cinemaId = null) => {
    set({
      showtimeId,
      movieId,
      cinemaId,
      selectedSeats: [],
      heldSeats: [],
      showtimeDetails: null,
    });
    console.log(`✅ Showtime set: ${showtimeId}`);
  },

  // ✏️ SET ROOM LAYOUT (Từ getRoomLayout API)
  setRoomLayout: (roomLayout) => {
    set({ roomLayout });
    console.log(`✅ Room layout loaded: ${roomLayout.room}`);
  },

  // ✏️ SET SHOWTIME DETAILS (Từ getMovieDetails hoặc getFilteredShowtimes)
  setShowtimeDetails: (details) => {
    set({ showtimeDetails: details });
  },

  // ✏️ SELECT A SEAT (Thêm vào selectedSeats, không gọi API)
  selectSeat: (seatId) => {
    set((state) => ({
      selectedSeats: [...state.selectedSeats, seatId],
    }));
    console.log(`✅ Seat selected: ${seatId}`);
  },

  // ✏️ DESELECT A SEAT
  deselectSeat: (seatId) => {
    set((state) => ({
      selectedSeats: state.selectedSeats.filter((id) => id !== seatId),
    }));
    console.log(`✅ Seat deselected: ${seatId}`);
  },

  // ✏️ SELECT MULTIPLE SEATS
  selectSeats: (seatIds) => {
    set({ selectedSeats: seatIds });
    console.log(`✅ Selected ${seatIds.length} seats`);
  },

  // ✏️ ADD TO HELD SEATS (When holdSeat API succeeds)
  addHeldSeat: (seatId) => {
    set((state) => ({
      heldSeats: [...state.heldSeats, seatId],
    }));
  },

  // ✏️ REMOVE FROM HELD SEATS (When hold expires or released)
  removeHeldSeat: (seatId) => {
    set((state) => ({
      heldSeats: state.heldSeats.filter((id) => id !== seatId),
    }));
  },

  // ✏️ CLEAR ALL BOOKING DATA
  clearBooking: () => {
    set({
      selectedSeats: [],
      showtimeId: null,
      heldSeats: [],
      movieId: null,
      cinemaId: null,
      showtimeDetails: null,
      roomLayout: null,
    });
    console.log('✅ Booking cleared');
  },

  // ✏️ GET CURRENT BOOKING STATE
  getBookingState: () => {
    const state = get();
    return {
      showtimeId: state.showtimeId,
      selectedSeats: state.selectedSeats,
      heldSeats: state.heldSeats,
      showtimeDetails: state.showtimeDetails,
    };
  },

  // ✏️ CHECKOUT - Tạo đơn hàng và thanh toán
  checkout: async (selectedSeats, paymentMethod) => {
    try {
      const state = get();
      
      if (!state.showtimeId || selectedSeats.length === 0) {
        return { success: false, error: 'Invalid booking data' };
      }

      // Tạo dữ liệu thanh toán
      const paymentData = {
        showtimeId: state.showtimeId,
        seats: selectedSeats,
        paymentMethod: paymentMethod.toLowerCase(),
        amount: selectedSeats.length * 100000, // Giả sử 100k/ghế
      };

      // Gọi API tạo link thanh toán
      const result = await paymentService.createPaymentUrl(paymentData);

      if (result.success) {
        // Clear booking sau khi thành công
        get().clearBooking();
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Checkout error:', error);
      return { success: false, error: 'Payment processing failed' };
    }
  },
}));

export default useBookingStore;