import React from 'react';
import { useBookingStore } from './useBookingStore';

// Giả lập API trả về sơ đồ ghế (6 hàng x 10 cột) - Đưa ra ngoài Component để tránh lỗi Impure Function
const seats = Array.from({ length: 60 }, (_, i) => {
  const row = String.fromCharCode(65 + Math.floor(i / 10)); // A, B, C, D, E, F
  const num = (i % 10) + 1;
  const id = `${row}${num}`;
  const isVip = row === 'D' || row === 'E';
  // Giả lập random 15% ghế đã có người đặt
  const status = Math.random() < 0.15 ? 'booked' : 'available'; 
  return { id, row, num, type: isVip ? 'vip' : 'regular', status, price: isVip ? 90000 : 70000 };
});

export default function SeatMatrix() {
  const { selectedSeats, toggleSeat } = useBookingStore();

  const getSeatColor = (seat) => {
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    
    if (isSelected) return 'bg-primary-500 text-light-100 border-primary-500 shadow-[0_0_15px_#E50914] animate-seatPop scale-110 z-10 relative';
    if (seat.status === 'booked') return 'bg-dark-800 text-error border-error opacity-40 cursor-not-allowed';
    if (seat.type === 'vip') return 'bg-dark-800 border-warning text-warning hover:bg-warning hover:text-dark-900 hover:-translate-y-1 hover:scale-110 active:scale-95';
    return 'bg-dark-800 border-success text-success hover:bg-success hover:text-dark-900 hover:-translate-y-1 hover:scale-110 active:scale-95'; // Ghế trống bình thường
  };

  const handleSeatClick = (seat) => {
    if (seat.status === 'booked') return;
    toggleSeat(seat);
  };

  return (
    <div className="flex flex-col items-center w-full p-6 glass-effect rounded-md">
      {/* Màn hình */}
      <div className="relative w-full max-w-3xl h-12 border-t-4 border-primary-500 rounded-[50%/10px_10px_0_0] shadow-[0_15px_40px_-5px_rgba(229,9,20,0.6)] mb-16 flex items-center justify-center bg-gradient-to-b from-primary-500/20 to-transparent">
        <div className="absolute -top-10 w-full h-10 bg-primary-500/10 blur-xl"></div>
        <span className="text-light-500 uppercase tracking-widest text-sm font-semibold">Màn Hình Chiếu</span>
      </div>

      {/* Ma trận ghế bằng Grid */}
      <div className="grid grid-cols-10 gap-2 md:gap-3 lg:gap-4">
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => handleSeatClick(seat)}
            disabled={seat.status === 'booked'}
            className={`w-8 h-8 md:w-10 md:h-10 text-xs md:text-sm font-bold border rounded-t-md transition-all duration-300 flex items-center justify-center ${getSeatColor(seat)}`}
            title={`Ghế ${seat.id} - ${seat.price.toLocaleString()}đ`}
          >
            {seat.id}
          </button>
        ))}
      </div>

      {/* Chú thích màu sắc */}
      <div className="flex gap-6 mt-8 text-sm text-light-300">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border border-success bg-dark-800 rounded-t-sm"></div>
          <span>Ghế Trống</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border border-warning bg-dark-800 rounded-t-sm"></div>
          <span>Ghế VIP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-primary-500 rounded-t-sm"></div>
          <span>Đang Chọn</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-error opacity-50 rounded-t-sm"></div>
          <span>Đã Bán</span>
        </div>
      </div>
    </div>
  );
}