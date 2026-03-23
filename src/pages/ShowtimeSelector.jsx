import React, { useEffect, useState } from 'react';
import { useBookingStore } from './useBookingStore';

export default function ShowtimeSelector() {
  const { movies, cinemas, showtimes, selectedMovie, selectedCinema, selectedDate, selectedShowtime, setSelection, fetchInitial } = useBookingStore();
  
  // Quick dates for UI since backend requires string format
  const generateDates = () => {
    const dates = [];
    for(let i=0; i<3; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        // Format to YYYY-MM-DD for backend
        dates.push({ label: i===0?'Hôm nay':i===1?'Ngày mai':'Tới nữa', value: d.toISOString().split('T')[0] });
    }
    return dates;
  };
  const DATES = generateDates();

  useEffect(() => {
     fetchInitial();
  }, [fetchInitial]);

  return (
    <div className="w-full glass-effect p-6 rounded-md mb-8">
      <h2 className="border-b border-dark-700 pb-2 mb-6 text-light-100 font-bold tracking-wide">1. Chọn Phim & Suất Chiếu</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Chọn Phim */}
        <div>
          <label className="text-light-500 text-sm mb-3 block uppercase tracking-wider font-semibold">Chọn Phim</label>
          <div className="flex flex-col gap-3 max-h-60 overflow-y-auto custom-scrollbar">
            {movies.map(m => (
              <button 
                key={m.id || m._id}
                onClick={() => setSelection('selectedMovie', m)}
                className={`py-3 px-4 rounded-md border text-left transition-all duration-300 transform ${selectedMovie?.id === m.id || selectedMovie?._id === m._id ? 'border-primary-500 bg-primary-500/20 text-primary-500 font-bold shadow-[0_0_15px_rgba(229,9,20,0.3)] scale-105' : 'border-dark-700 bg-dark-800 text-light-300 hover:border-light-500 hover:-translate-y-1 hover:bg-dark-700'}`}
              >
                {m.title || m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Chọn Rạp */}
        <div>
          <label className="text-light-500 text-sm mb-3 block uppercase tracking-wider font-semibold">Chọn Rạp</label>
          <div className="flex flex-col gap-3 max-h-60 overflow-y-auto custom-scrollbar">
            {cinemas.map(c => (
              <button 
                key={c.id || c._id}
                onClick={() => setSelection('selectedCinema', c)}
                className={`py-3 px-4 rounded-md border text-left transition-all duration-300 transform ${selectedCinema?.id === c.id || selectedCinema?._id === c._id ? 'border-primary-500 bg-primary-500/20 text-primary-500 font-bold shadow-[0_0_15px_rgba(229,9,20,0.3)] scale-105' : 'border-dark-700 bg-dark-800 text-light-300 hover:border-light-500 hover:-translate-y-1 hover:bg-dark-700'}`}
              >
                {c.name || "Cinema " + (c.id || c._id)}
              </button>
            ))}
          </div>
        </div>

        {/* Chọn Ngày */}
        <div>
          <label className="text-light-500 text-sm mb-3 block uppercase tracking-wider font-semibold">Chọn Ngày Lọc</label>
          <div className="flex flex-col gap-3">
            {DATES.map(d => (
              <button 
                key={d.value}
                onClick={() => setSelection('selectedDate', d.value)}
                className={`py-3 px-4 rounded-md border text-left transition-all duration-300 transform ${selectedDate === d.value ? 'border-primary-500 bg-primary-500/20 text-primary-500 font-bold shadow-[0_0_15px_rgba(229,9,20,0.3)] scale-105' : 'border-dark-700 bg-dark-800 text-light-300 hover:border-light-500 hover:-translate-y-1 hover:bg-dark-700'}`}
              >
                {d.label} - {d.value}
              </button>
            ))}
          </div>
        </div>

        {/* Chọn Suất */}
        <div>
          <label className="text-light-500 text-sm mb-3 block uppercase tracking-wider font-semibold">Suất Chiếu (API)</label>
          {(!selectedMovie || !selectedCinema || !selectedDate) ? (
             <p className="text-xs text-dark-400 mt-5 text-center italic">Hoàn tất mốc cấu hình trên để lấy dữ liệu suất chiếu</p>
          ) : showtimes.length === 0 ? (
             <p className="text-xs text-primary-500 mt-5 text-center font-bold">Không có lịch chiếu thỏa mãn!</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto custom-scrollbar">
             {showtimes.map(s => {
                const timeString = s.startTime || s.time || "00:00"; // Phụ thuộc Schema Node của bạn
                return (
                 <button 
                   key={s.id || s._id}
                   onClick={() => setSelection('selectedShowtime', s)}
                   className={`py-3 rounded-md border text-center transition-all duration-300 transform font-mono ${(selectedShowtime?.id || selectedShowtime?._id) === (s.id || s._id) ? 'border-primary-500 bg-primary-500/20 text-primary-500 font-bold shadow-[0_0_15px_rgba(229,9,20,0.3)] scale-105' : 'border-dark-700 bg-dark-800 text-light-300 hover:border-light-500 hover:-translate-y-1 hover:bg-dark-700'}`}
                 >
                   {timeString}
                 </button>
               )
             })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}