import React from 'react';
import { useBookingStore } from './useBookingStore';

export default function SeatMatrix() {
  const { seatMap, selectedSeats, toggleSeat, loading, selectedShowtime } = useBookingStore();

  const getSeatColor = (seat) => {
    // 1. Nếu ghế đang nằm trong giỏ hàng hiện tại (được gán HELD hoặc PENDING)
    const isSelected = selectedSeats.some(s => (s.id || s._id) === (seat.id || seat._id));
    if (isSelected) {
      return 'bg-primary-500 text-light-100 border-primary-500 shadow-[0_0_15px_#E50914] animate-seatPop scale-110 z-10 relative';
    }
    
    // 2. Xét Status từ Database Backend
    if (seat.status === 'BOOKED') {
      return 'bg-dark-800 text-error border-error opacity-40 cursor-not-allowed';
    }
    if (seat.status === 'HELD') {
      return 'bg-dark-800 text-warning border-warning opacity-70 cursor-not-allowed'; // Ai đó đang tranh ghế
    }
    
    // 3. AVAILABLE
    const isVip = seat.type?.toUpperCase() === 'VIP';
    if (isVip) {
       return 'bg-dark-800 border-warning text-warning hover:bg-warning hover:text-dark-900 hover:-translate-y-1 hover:scale-110 active:scale-95';
    }
    return 'bg-dark-800 border-success text-success hover:bg-success hover:text-dark-900 hover:-translate-y-1 hover:scale-110 active:scale-95'; // Ghế thường
  };

  const handleSeatClick = (seat) => {
    if (seat.status === 'BOOKED' || seat.status === 'HELD') return;
    toggleSeat(seat);
  };

  // Trạng thái chờ/chưa có Map
  if (!selectedShowtime) {
      return <div className="text-center p-10 font-bold text-light-500">Chưa chọn lịch chiếu hợp lệ</div>;
  }
  if (loading) {
      return <div className="flex justify-center p-10"><div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }
  if (!seatMap || seatMap.length === 0) {
      return <div className="text-center p-10 font-bold text-light-500 uppercase tracking-widest">Không có dữ liệu ghế cho rạp này!</div>;
  }

  // Khai phá layout của API - Thường Backend trả 1 List dài không chứa phân chia, ta tự grid cols
  // Tìm số cột lớn nhất từ cấu trúc id ghế (VD: A1 -> A10, F12)
  return (
    <div className="flex flex-col items-center w-full p-6 glass-effect rounded-md">
      {/* Màn hình */}
      <div className="relative w-full max-w-3xl h-12 border-t-4 border-primary-500 rounded-[50%/10px_10px_0_0] shadow-[0_15px_40px_-5px_rgba(229,9,20,0.6)] mb-16 flex items-center justify-center bg-gradient-to-b from-primary-500/20 to-transparent">
        <div className="absolute -top-10 w-full h-10 bg-primary-500/10 blur-xl"></div>
        <span className="text-light-500 uppercase tracking-widest text-sm font-semibold">Màn Hình Chiếu</span>
      </div>

      {/* Ma trận ghế tự động Auto Fill theo List từ DB */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 lg:gap-4 max-w-4xl mx-auto">
        {seatMap.map((seat) => (
          <button
            key={seat.id || seat._id}
            onClick={() => handleSeatClick(seat)}
            disabled={seat.status === 'BOOKED' || seat.status === 'HELD'}
            className={`w-8 h-8 md:w-10 md:h-10 text-xs md:text-sm font-bold border rounded-t-lg transition-all duration-300 flex items-center justify-center ${getSeatColor(seat)}`}
            title={`Ghế ${seat.id || seat.name || seat.seatNum} - ${(seat.price || 0).toLocaleString()}đ - ${seat.status}`}
          >
            {seat.name || seat.id}
          </button>
        ))}
      </div>

      {/* Chú thích màu sắc */}
      <div className="flex flex-wrap gap-6 mt-12 text-sm text-light-300 font-medium">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border border-success bg-dark-800 rounded-t-sm"></div>
          <span>Ghế Trống (Thường)</span>
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
          <div className="w-5 h-5 bg-warning opacity-70 border border-warning rounded-t-sm"></div>
          <span>Ghế HELD (Đang có người giữ)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-error opacity-40 rounded-t-sm"></div>
          <span>Đã Bán</span>
        </div>
      </div>
    </div>
  );
}