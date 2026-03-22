import React from 'react';

const CinemaAdminIndex = ({ cinemas, rooms, onAdd, onEdit, onDelete, onViewRooms, searchQuery = '' }) => {
  const filteredCinemas = cinemas.filter(cinema => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (cinema.name && cinema.name.toLowerCase().includes(searchLower)) ||
      (cinema.location && cinema.location.toLowerCase().includes(searchLower)) ||
      (cinema.type && cinema.type.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">
            Quản lý <span className="text-cyan-400">Cụm Rạp</span>
          </h2>
          <p className="text-slate-400 text-sm font-medium">Giám sát và cấu hình các điểm chiếu phim trên toàn hệ thống.</p>
        </div>
        
        <button 
          onClick={onAdd}
          className="group ripple-btn px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 rounded-2xl font-black text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] hover:scale-105 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] relative overflow-hidden"
        >
          <svg className="w-5 h-5 relative z-10 transition-transform duration-500 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/>
          </svg>
          <span className="relative z-10">Thêm Cụm Rạp Mới</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Cinemas */}
        <div className="bg-[#1E293B] p-8 rounded-[2.5rem] relative overflow-hidden group hover:bg-[#2A3441] transition-all">
          <div className="relative z-10">
            <p className="text-slate-400 text-xs font-bold mb-4">Tổng Số Cụm Rạp</p>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-black text-white tracking-tighter">{cinemas.length}</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-cyan-500/10 transition-all"></div>
        </div>

        {/* Total Rooms */}
        <div className="bg-[#1E293B] p-8 rounded-[2.5rem] relative overflow-hidden group hover:bg-[#2A3441] transition-all">
          <div className="relative z-10">
            <p className="text-slate-400 text-xs font-bold mb-4">Tổng Số Phòng Chiếu</p>
            <div className="flex items-center gap-4">
              <span className="text-5xl font-black text-white tracking-tighter">{rooms.length}</span>
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors shadow-inner">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-cyan-500/10 transition-all"></div>
        </div>
      </div>

      {/* Cinema List Table Section */}
      <div className="bg-[#1E293B] rounded-3xl p-8 shadow-xl flex flex-col mt-12">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-700/50 mb-2">
           <div className="col-span-5">Cụm rạp / Địa chỉ</div>
           <div className="col-span-2 text-center">Loại rạp</div>
           <div className="col-span-2 text-center">Số phòng</div>
           <div className="col-span-2 text-center">Trạng thái</div>
           <div className="col-span-1 text-right">Thao tác</div>
        </div>

        {/* Table Rows */}
        <div className="flex flex-col">
           {filteredCinemas.length > 0 ? (
             filteredCinemas.map((cinema, index) => {
               const roomCount = rooms.filter(r => Number(r.cinemaId) === cinema.id).length;
             return (
               <div 
                 key={cinema.id} 
                 className="grid grid-cols-12 items-center border-b border-slate-700/50 py-5 px-6 hover:bg-[#2A3441] hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] relative z-0 hover:z-10 rounded-2xl hover:border-transparent transition-all duration-300 group animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                 style={{ animationDelay: `${index * 100}ms`, animationDuration: '500ms' }}
               >
                 {/* Name & Address with Image */}
                 <div className="col-span-5 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex-none overflow-hidden border border-slate-700/50 group-hover:scale-105 transition-transform duration-500 shadow-inner">
                       {cinema.image ? (
                         <img src={cinema.image} alt={cinema.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
                       ) : (
                         <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                            <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                         </div>
                       )}
                    </div>
                    <div>
                       <h3 className="text-white font-bold group-hover:text-cyan-400 transition-colors leading-tight">{cinema.name}</h3>
                       <p className="text-xs text-slate-400 mt-1 line-clamp-1 group-hover:text-slate-300 transition-colors">{cinema.location}</p>
                    </div>
                 </div>

                 {/* Cinema Type */}
                 <div className="col-span-2 flex justify-center">
                    <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-700/50 
                       ${cinema.type === 'Premium Gold' ? 'bg-emerald-500/10 text-emerald-400' : 
                         cinema.type === 'IMAX Experience' ? 'bg-amber-500/10 text-amber-500' : 
                         'bg-slate-800 text-slate-400'}`}>
                       {cinema.type}
                    </div>
                 </div>

                 {/* Number of Rooms */}
                 <div className="col-span-2 text-center text-2xl font-black text-slate-300 group-hover:text-white transition-colors tracking-tighter">
                    {roomCount < 10 ? `0${roomCount}` : roomCount}
                 </div>

                 {/* Status */}
                 <div className="col-span-2 flex justify-center">
                    <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border border-slate-700/50 
                       ${cinema.status === 'active' ? 'bg-emerald-500/5 text-emerald-500/80' : 'bg-amber-500/5 text-amber-500/80'}`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${cinema.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b]'}`}></div>
                       {cinema.status === 'active' ? 'Hoạt động' : 'Bảo trì'}
                    </div>
                 </div>

                 {/* Actions */}
                 <div className="col-span-1 flex justify-end gap-3">
                    <button 
                      onClick={() => onViewRooms(cinema.id)}
                      className="w-10 h-10 rounded-xl bg-[#0F172A] border border-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-sky-500/20 hover:text-sky-400 hover:border-sky-500/50 hover:shadow-[0_0_15px_rgba(14,165,233,0.2)] transition-all active:scale-90 group"
                      title="Xem phòng chiếu"
                    >
                       <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                       </svg>
                    </button>
                    <button 
                      onClick={() => onEdit(cinema)}
                      className="w-10 h-10 rounded-xl bg-[#0F172A] border border-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all active:scale-90 group"
                      title="Sửa cụm rạp"
                    >
                       <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                    </button>
                    <button 
                      onClick={() => onDelete(cinema.id)}
                      className="w-10 h-10 rounded-xl bg-[#0F172A] border border-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/50 hover:shadow-[0_0_15px_rgba(244,63,94,0.2)] transition-all active:scale-90 group hover-btn-delete"
                      title="Xóa cụm rạp"
                    >
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                 </div>
               </div>
             )
           })
           ) : (
             <div className="py-20 text-center">
               <p className="text-slate-500 font-bold uppercase tracking-widest">Không tìm thấy cụm rạp phù hợp.</p>
             </div>
           )}
        </div>


      </div>
    </div>
  );
};

export default CinemaAdminIndex;
