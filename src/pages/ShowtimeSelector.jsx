import React from 'react';
import { useBookingStore } from './useBookingStore';

const CINEMAS = ['UCC Sleepy Cinema', 'UCC Galaxy', 'UCC Starlight'];
const DATES = ['Hôm nay', 'Ngày mai', 'Thứ Bảy'];
const SHOWTIMES = ['09:00', '11:30', '14:00', '16:45', '19:30', '22:00'];

export default function ShowtimeSelector() {
  const { cinema, date, showtime, setBookingInfo } = useBookingStore();

  return (
    <div className="w-full glass-effect p-6 rounded-md mb-8">
      <h2 className="border-b border-dark-700 pb-2 mb-6">1. Chọn Lịch Chiếu</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chọn Rạp */}
        <div>
          <label className="text-light-500 text-sm mb-3 block uppercase tracking-wider font-semibold">Chọn Rạp</label>
          <div className="flex flex-col gap-3">
            {CINEMAS.map(c => (
              <button 
                key={c}
                onClick={() => setBookingInfo('cinema', c)}
                className={`py-3 px-4 rounded-md border text-left transition-all duration-300 transform ${cinema === c ? 'border-primary-500 bg-primary-500/20 text-primary-500 font-bold shadow-[0_0_15px_rgba(229,9,20,0.3)] scale-105' : 'border-dark-700 bg-dark-800 text-light-300 hover:border-light-500 hover:-translate-y-1 hover:bg-dark-700'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Chọn Ngày */}
        <div>
          <label className="text-light-500 text-sm mb-3 block uppercase tracking-wider font-semibold">Chọn Ngày</label>
          <div className="flex flex-col gap-3">
            {DATES.map(d => (
              <button 
                key={d}
                onClick={() => setBookingInfo('date', d)}
                className={`py-3 px-4 rounded-md border text-left transition-all duration-300 transform ${date === d ? 'border-primary-500 bg-primary-500/20 text-primary-500 font-bold shadow-[0_0_15px_rgba(229,9,20,0.3)] scale-105' : 'border-dark-700 bg-dark-800 text-light-300 hover:border-light-500 hover:-translate-y-1 hover:bg-dark-700'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Chọn Suất */}
        <div>
          <label className="text-light-500 text-sm mb-3 block uppercase tracking-wider font-semibold">Chọn Suất</label>
          <div className="grid grid-cols-2 gap-3">
            {SHOWTIMES.map(s => (
              <button 
                key={s}
                onClick={() => setBookingInfo('showtime', s)}
                className={`py-3 rounded-md border text-center transition-all duration-300 transform ${showtime === s ? 'border-primary-500 bg-primary-500/20 text-primary-500 font-bold shadow-[0_0_15px_rgba(229,9,20,0.3)] scale-105' : 'border-dark-700 bg-dark-800 text-light-300 hover:border-light-500 hover:-translate-y-1 hover:bg-dark-700'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}