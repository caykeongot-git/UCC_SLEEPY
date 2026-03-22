import React from 'react';

const MovieAdminIndex = ({ movies, onAdd, onEdit, onDelete, searchQuery = '' }) => {
  const filteredMovies = movies.filter(movie => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (movie.title && movie.title.toLowerCase().includes(searchLower)) ||
      (movie.description && movie.description.toLowerCase().includes(searchLower)) ||
      (movie.genre && movie.genre.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white tracking-tight">
            Quản lý <span className="text-cyan-400">Phim</span>
          </h2>
          <p className="text-sm text-slate-400">
            Hệ thống quản lý thông tin phim và lịch chiếu toàn cầu của Luminary Cinema.
          </p>
        </div>
        
        <button 
          onClick={onAdd}
          className="group ripple-btn px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 rounded-2xl font-black text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] hover:scale-105 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] relative overflow-hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10 transition-transform duration-500 group-hover:rotate-90" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className="relative z-10">Thêm Phim Mới</span>
        </button>
      </div>

      <div className="bg-[#1E293B] rounded-3xl p-8 shadow-xl flex flex-col">

      {/* Table Headers (Visual Only) */}
      <div className="grid grid-cols-12 px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-700/50 mb-2">
        <div className="col-span-4">Poster / Thông tin phim</div>
        <div className="col-span-2 text-center">Thể loại</div>
        <div className="col-span-2 text-center">Ngày khởi chiếu</div>
        <div className="col-span-1 text-center">Độ Tuổi</div>
        <div className="col-span-1 text-center">Thời lượng</div>
        <div className="col-span-2 text-right">Thao tác</div>
      </div>

      {/* Movie List */}
      <div className="flex flex-col">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="grid grid-cols-12 items-center border-b border-slate-700/50 py-5 px-6 hover:bg-[#2A3441] hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] relative z-0 hover:z-10 rounded-2xl hover:border-transparent transition-all duration-300 group animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
              style={{ animationDelay: `${index * 100}ms`, animationDuration: '500ms' }}
            >
              {/* Movie Info */}
              <div className="col-span-4 flex items-center gap-6">
                <div className="w-16 h-24 rounded-xl overflow-hidden shadow-lg border border-slate-700/50 group-hover:scale-105 transition-transform duration-500 flex-none font-bold">
                  <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="space-y-1.5 overflow-hidden font-bold">
                  <h3 className="text-lg font-black text-white group-hover:text-cyan-400 transition-colors leading-tight truncate">
                    {movie.title}
                  </h3>
                  <p className="text-[13px] font-medium text-slate-400 leading-relaxed line-clamp-2 pr-4">
                    {movie.description || "Mô tả phim đang được cập nhật."}
                  </p>
                </div>
              </div>

              {/* Genre */}
              <div className="col-span-2 text-center">
                <span className="text-xs font-black text-slate-400 tracking-wide uppercase leading-tight px-3 py-1 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  {movie.genre || 'Hành động'}
                </span>
              </div>

              {/* Release Date */}
              <div className="col-span-2 text-center">
                <span className="text-[11px] font-black text-slate-300 tracking-widest uppercase">
                  {movie.releaseDate || '23/03/2026'}
                </span>
              </div>

              {/* Age Rating */}
              <div className="col-span-1 flex justify-center">
                <div className="px-3 py-1 bg-yellow-400 text-slate-900 rounded-lg text-[11px] font-black uppercase tracking-wider">
                  {movie.age || 'T16'}
                </div>
              </div>

              {/* Duration */}
              <div className="col-span-1 flex justify-center">
                <div className="flex items-center gap-2 text-slate-300 transition-colors">
                  <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <span className="text-[11px] font-bold tracking-tight">{movie.duration} phút</span>
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex justify-end gap-3 pr-2">
                <button 
                  onClick={() => onEdit(movie)}
                  className="w-10 h-10 rounded-xl bg-[#0F172A] border border-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all active:scale-90 group"
                  title="Sửa phim"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z" /></svg>
                </button>
                <button 
                  onClick={() => onDelete(movie.id)}
                  className="w-10 h-10 rounded-xl bg-[#0F172A] border border-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/50 hover:shadow-[0_0_15px_rgba(244,63,94,0.2)] transition-all active:scale-90 group hover-btn-delete"
                  title="Xóa phim"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12z" /></svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-slate-500 font-bold uppercase tracking-widest">Không có dữ liệu phim.</p>
          </div>
        )}
      </div>


      </div>

    </div>
  );
};

export default MovieAdminIndex;
