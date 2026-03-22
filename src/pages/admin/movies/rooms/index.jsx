import React from 'react';

const RoomAdminIndex = ({ rooms, onAdd, onEdit, onDelete, filterCinemaId, onClearFilter, searchQuery = '' }) => {
  const filteredRooms = rooms.filter(room => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (room.name && room.name.toLowerCase().includes(searchLower)) ||
      (room.cinemaName && room.cinemaName.toLowerCase().includes(searchLower))
    );
  });

  const activeRoomsCount = filteredRooms.filter(r => r.status !== 'maintenance').length;
  const maintenanceRoomsCount = filteredRooms.filter(r => r.status === 'maintenance').length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <span>Complexes</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            <span className="text-cyan-400">Quản lý Phòng Chiếu</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">
            Quản lý <span className="text-cyan-400">Phòng Chiếu</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          {filterCinemaId && (
            <button 
              onClick={onClearFilter}
              className="px-6 py-3 bg-[#0F172A] border border-slate-700/50 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:border-slate-500 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              Xóa lọc
            </button>
          )}
          <button 
            onClick={onAdd}
            className="group ripple-btn px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 rounded-2xl font-black text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] hover:scale-105 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] relative overflow-hidden"
          >
            <svg className="w-5 h-5 relative z-10 transition-transform duration-500 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/>
            </svg>
            <span className="relative z-10">Thêm Phòng Chiếu</span>
          </button>
        </div>
      </div>

      {filterCinemaId && (
        <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl flex items-center gap-4">
           <div className="w-2 h-2 rounded-full bg-cyan-400 cyan-glow animate-pulse"></div>
           <p className="text-sm font-medium text-cyan-400">Đang lọc phòng chiếu theo cụm rạp đã chọn</p>
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Rooms */}
        <div className="bg-[#1E293B] rounded-[1.25rem] p-6 relative overflow-hidden flex flex-col justify-between h-32 group hover:scale-[1.03] hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6)] hover:bg-[#2A3441] transition-all duration-300 z-0 hover:z-10 cursor-default">
           <p className="text-[11px] text-slate-400 font-bold tracking-wider uppercase relative z-10">Tổng số phòng</p>
           <p className="text-[2.5rem] font-bold text-white relative z-10 leading-none">{filteredRooms.length}</p>
           <svg className="absolute -right-2 top-8 w-24 h-24 text-white/5 group-hover:text-white/10 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm2 4h2v2H6V8zm0 4h2v2H6v-2zm0 4h2v2H6v-2zM16 8h2v2h-2V8zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zM10 8h4v8h-4V8z"/></svg>
        </div>

        {/* Total Seats */}
        <div className="bg-[#1E293B] rounded-[1.25rem] p-6 relative overflow-hidden flex flex-col justify-between h-32 group hover:scale-[1.03] hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6)] hover:bg-[#2A3441] transition-all duration-300 z-0 hover:z-10 cursor-default">
           <p className="text-[11px] text-slate-400 font-bold tracking-wider uppercase relative z-10">Tổng số ghế</p>
           <p className="text-[2.5rem] font-bold text-white relative z-10 leading-none">
             {filteredRooms.reduce((acc, curr) => acc + (curr.rows * curr.cols), 0).toLocaleString()}
           </p>
           <svg className="absolute right-0 top-10 w-20 h-20 text-white/5 group-hover:text-white/10 transition-colors transform -rotate-12" fill="currentColor" viewBox="0 0 24 24"><path d="M4 18v3h3v-3h10v3h3v-6H4v3zm15-8h3v3h-3v-3zM2 10h3v3H2v-3zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"/></svg>
        </div>

        {/* Active */}
        <div className="bg-[#1E293B] rounded-[1.25rem] p-6 relative overflow-hidden flex flex-col justify-between h-32 group hover:scale-[1.03] hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6)] hover:bg-[#2A3441] transition-all duration-300 z-0 hover:z-10 cursor-default">
           <p className="text-[11px] text-slate-400 font-bold tracking-wider uppercase relative z-10">Đang hoạt động</p>
           <p className="text-[2.5rem] font-bold text-cyan-400 relative z-10 leading-none">{activeRoomsCount}</p>
           <div className="absolute right-6 top-8 w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
           </div>
        </div>

        {/* Maintenance */}
        <div className="bg-[#1E293B] rounded-[1.25rem] p-6 relative overflow-hidden flex flex-col justify-between h-32 group hover:scale-[1.03] hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6)] hover:bg-[#2A3441] transition-all duration-300 z-0 hover:z-10 cursor-default">
           <p className="text-[11px] text-slate-400 font-bold tracking-wider uppercase relative z-10">Đang bảo trì</p>
           <p className="text-[2.5rem] font-bold text-[#E98282] relative z-10 leading-none">{maintenanceRoomsCount}</p>
           <svg className="absolute right-2 top-8 w-20 h-20 text-white/5 group-hover:text-white/10 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M14 6H4v4h4v12h4V10h6L14 6zm4 8v10h-2V14h2z"/></svg>
        </div>
      </div>

      {/* List Section */}
      <div className="flex flex-col space-y-3 mt-4">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-4 py-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">
           <div className="col-span-3">Tên phòng</div>
           <div className="col-span-3">Cụm rạp</div>
           <div className="col-span-2">Kích thước</div>
           <div className="col-span-1 text-center">Tổng số ghế</div>
           <div className="col-span-2 text-center">Trạng thái</div>
           <div className="col-span-1 text-right pr-3">Thao tác</div>
        </div>

        {/* Table Rows */}
        <div className="flex flex-col space-y-3">
           {filteredRooms.length > 0 ? (
             filteredRooms.map((room, idx) => {
               const totalSeats = room.rows * room.cols;
               const roomType = idx % 3 === 0 ? 'PREMIUM' : (idx % 4 === 0 ? 'V.I.P' : 'STANDARD');
               
               const typeBadgeClass = roomType === 'V.I.P' 
                 ? 'bg-[#2A3441] text-amber-500 border border-amber-500/20' 
                 : 'bg-[#2A3441] text-slate-400';
               
               const typeIcon = roomType === 'V.I.P' ? (
                 <svg className="w-5 h-5 text-amber-500 transition-transform duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
               ) : (
                 <svg className="w-5 h-5 text-slate-400 transition-transform duration-500 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v12H4zM2 4v16h20V4H2zm4 4h12v8H6V8zm3 2h2v4H9v-4z"/></svg>
               );

               const rName = room.name || (roomType === 'PREMIUM' ? `IMAX Screen 0${idx + 1}` : `Phòng Chiếu 0${idx + 1}`);
               const cineName = room.cinemaName || `Luminary Center (Q1)`;
               
               return (
                 <div key={room.id} className="grid grid-cols-12 items-center bg-[#1E293B] rounded-2xl p-4 transition-all duration-300 group hover:bg-[#2A3441] hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] relative z-0 hover:z-10 hover:border-transparent">
                   {/* Name Column */}
                   <div className="col-span-3 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0F172A] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                         {typeIcon}
                      </div>
                      <div className="flex flex-col items-start gap-1">
                         <span className="text-white font-bold text-sm tracking-wide truncate max-w-[120px]" title={rName}>{rName}</span>
                         <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${typeBadgeClass}`}>
                           {roomType}
                         </span>
                      </div>
                   </div>

                   {/* Cinema Name */}
                   <div className="col-span-3 text-slate-400 text-sm truncate pr-2" title={cineName}>
                      {cineName}
                   </div>

                   {/* Dimensions */}
                   <div className="col-span-2 flex items-center gap-2 text-slate-400 text-[13px]">
                      <svg className="w-3.5 h-3.5 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16M4 6v12M12 6v12M20 6v12"/></svg>
                      {room.rows} x {room.cols}
                   </div>

                   {/* Total Seats */}
                   <div className="col-span-1 flex justify-center">
                      <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-black/50 text-white font-bold text-[13px]">
                        {totalSeats}
                      </span>
                   </div>

                   {/* Status */}
                   <div className="col-span-2 flex justify-center">
                     {room.status === 'maintenance' ? (
                       <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold tracking-widest uppercase">
                         <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse shadow-[0_0_8px_#f43f5e]"></span>
                         BẢO TRÌ
                       </span>
                     ) : (
                       <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-widest uppercase">
                         <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                         HOẠT ĐỘNG
                       </span>
                     )}
                   </div>

                   {/* Actions */}
                   <div className="col-span-1 flex justify-end gap-2 pr-2">
                       <button onClick={() => onEdit(room)} className="p-2 rounded-xl text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all duration-300" title="Chỉnh sửa">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z" /></svg>
                       </button>
                       <button onClick={() => onDelete(room.id)} className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 hover:shadow-[0_0_15px_rgba(244,63,94,0.25)] transition-all duration-300 hover-btn-delete group-hover/delete" title="Xóa">
                          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12z" /></svg>
                       </button>
                   </div>
                 </div>
               )
             })
           ) : (
             <div className="py-12 bg-[#1E293B] rounded-2xl flex items-center justify-center">
               <p className="text-slate-500 font-bold uppercase tracking-widest">Không tìm thấy phòng chiếu phù hợp.</p>
             </div>
           )}
        </div>


      </div>

    </div>
  );
};

export default RoomAdminIndex;
