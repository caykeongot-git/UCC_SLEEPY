import React, { useState, useEffect } from 'react';

const SEAT_TYPES = {
  NORMAL: { id: 'NORMAL', label: 'Ghế thường', color: 'bg-blue-500', iconColor: 'text-blue-500' },
  VIP: { id: 'VIP', label: 'Ghế VIP', color: 'bg-orange-400', iconColor: 'text-orange-400' },
  DOUBLE: { id: 'DOUBLE', label: 'Ghế Đôi', color: 'bg-cyan-400', iconColor: 'text-cyan-400' },
  EMPTY: { id: 'EMPTY', label: 'Trống', color: 'bg-transparent border border-dashed border-gray-300', iconColor: 'text-gray-300' },
};

const RoomAdminEdit = ({ cinemas, room, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    id: room.id,
    name: room.name,
    cinemaId: room.cinemaId,
    rows: room.rows,
    cols: room.cols,
    status: room.status || 'active',
  });

  const [layout, setLayout] = useState(() => {
    if (room.layout && room.layout.length > 0) return room.layout;
    const newLayout = [];
    for (let r = 0; r < room.rows; r++) {
      const row = [];
      for (let c = 0; c < room.cols; c++) {
        row.push({ id: `${String.fromCharCode(65 + r)}${c + 1}`, type: 'NORMAL' });
      }
      newLayout.push(row);
    }
    return newLayout;
  });
  const [vipRange, setVipRange] = useState('');

  const handleQuickVip = () => {
    if (!vipRange) return;
    const parts = vipRange.trim().toUpperCase().split('-');
    if (parts.length !== 2) {
      alert('Định dạng không hợp lệ. Ví dụ: C1-G10');
      return;
    }

    const parseSeat = (seatId) => {
      const rowMatch = seatId.match(/[A-Z]+/);
      const colMatch = seatId.match(/[0-9]+/);
      if (!rowMatch || !colMatch) return null;
      
      const rowStr = rowMatch[0];
      let rowIdx = 0;
      for (let i = 0; i < rowStr.length; i++) {
        rowIdx = rowIdx * 26 + (rowStr.charCodeAt(i) - 64);
      }
      return {
        r: rowIdx - 1,
        c: parseInt(colMatch[0]) - 1
      };
    };

    const start = parseSeat(parts[0]);
    const end = parseSeat(parts[1]);

    if (!start || !end) {
      alert('Vị trí ghế không hợp lệ.');
      return;
    }

    const updatedLayout = [...layout];
    const rStart = Math.min(start.r, end.r);
    const rEnd = Math.max(start.r, end.r);
    const cStart = Math.min(start.c, end.c);
    const cEnd = Math.max(start.c, end.c);

    let count = 0;
    for (let r = rStart; r <= rEnd; r++) {
      if (r >= 0 && r < formData.rows) {
        for (let c = cStart; c <= cEnd; c++) {
          if (c >= 0 && c < formData.cols) {
            updatedLayout[r][c].type = 'VIP';
            count++;
          }
        }
      }
    }
    
    if (count === 0) {
      alert('Không có ghế nào trong vùng đã chọn nằm trong sơ đồ.');
    } else {
      setLayout(updatedLayout);
      setVipRange('');
    }
  };

  useEffect(() => {
    if (formData.rows !== room.rows || formData.cols !== room.cols) {
        const newLayout = [];
        for (let r = 0; r < formData.rows; r++) {
          const row = [];
          for (let c = 0; c < formData.cols; c++) {
            row.push({
              id: `${String.fromCharCode(65 + r)}${c + 1}`,
              type: 'NORMAL'
            });
          }
          newLayout.push(row);
        }
        setLayout(newLayout);
    }
  }, [formData.rows, formData.cols]);

  const toggleSeatType = (rowIndex, colIndex) => {
    const updatedLayout = [...layout];
    const currentType = updatedLayout[rowIndex][colIndex].type;
    
    let nextType = 'NORMAL';
    if (currentType === 'NORMAL') nextType = 'VIP';
    else if (currentType === 'VIP') nextType = 'DOUBLE';
    else if (currentType === 'DOUBLE') nextType = 'EMPTY';
    else if (currentType === 'EMPTY') nextType = 'NORMAL';
    
    updatedLayout[rowIndex][colIndex].type = nextType;
    setLayout(updatedLayout);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCinema = cinemas.find(c => c.id === parseInt(formData.cinemaId));
    onSave({
      ...formData,
      cinemaName: selectedCinema?.name || 'Unknown Cinema',
      seatCount: layout.flat().filter(s => s.type !== 'EMPTY').length,
      layout: layout
    });
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1E293B] border border-slate-700/50 flex items-center justify-center group-hover:border-slate-500 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </div>
          <span className="text-xs font-black uppercase tracking-widest">Trở lại</span>
        </button>

        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Chỉnh Sửa <span className="text-cyan-400">Phòng</span></h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
        {/* Left Side: Controls */}
        <div className="xl:col-span-1 space-y-8">
          <div className="bg-[#1E293B] p-8 rounded-[2rem] border border-slate-700/50 space-y-10 shadow-xl">
            {/* Info Section */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 cyan-glow"></span>
                Thông tin phòng
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Tên phòng</label>
                  <input 
                    type="text" 
                    required
                    placeholder="VD: Phòng 1"
                    className="w-full bg-[#0F172A] border border-slate-700/50 rounded-2xl px-5 py-4 text-sm text-white focus:border-cyan-500/50 outline-none transition-all font-bold"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Cụm rạp</label>
                  <select 
                    className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-slate-950 dark:text-white outline-none cursor-pointer appearance-none focus:border-cyan-500/50 transition-all font-bold"
                    value={formData.cinemaId}
                    onChange={(e) => setFormData({...formData, cinemaId: parseInt(e.target.value)})}
                  >
                    {cinemas.map(c => (
                      <option key={c.id} value={c.id} className="bg-[#0F172A] text-white">{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Trạng thái phòng</label>
                  <select 
                    className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-slate-950 dark:text-white outline-none cursor-pointer appearance-none focus:border-cyan-500/50 transition-all font-bold"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="active" className="bg-[#0F172A] text-white">Hoạt động</option>
                    <option value="maintenance" className="bg-[#0F172A] text-white">Bảo trì</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Layout Section */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 cyan-glow"></span>
                Kích thước (R x C)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" 
                  min="1" max="20"
                  className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 rounded-2xl px-4 py-4 text-sm text-slate-950 dark:text-white outline-none focus:border-cyan-500/50 transition-all text-center font-bold"
                  value={formData.rows}
                  onChange={(e) => setFormData({...formData, rows: parseInt(e.target.value) || 1})}
                />
                <input 
                  type="number" 
                  min="1" max="25"
                  className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 rounded-2xl px-4 py-4 text-sm text-slate-950 dark:text-white outline-none focus:border-cyan-500/50 transition-all text-center font-bold"
                  value={formData.cols}
                  onChange={(e) => setFormData({...formData, cols: parseInt(e.target.value) || 1})}
                />
              </div>
            </div>

            {/* Quick Setup */}
            <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-white/5">
              <h3 className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                Thiết lập VIP nhanh
              </h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="C1-G10"
                  className="flex-1 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-4 text-xs text-slate-950 dark:text-white focus:border-orange-500/50 outline-none transition-all placeholder:text-slate-700 font-bold uppercase"
                  value={vipRange}
                  onChange={(e) => setVipRange(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleQuickVip())}
                />
                <button 
                  type="button"
                  onClick={handleQuickVip}
                  className="w-12 bg-orange-500 hover:bg-orange-400 text-slate-950 dark:text-white rounded-2xl transition-all active:scale-90 flex items-center justify-center shadow-lg shadow-orange-500/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full py-5 bg-cyan-gradient rounded-[2rem] font-black text-white uppercase tracking-[0.3em] text-xs shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:opacity-90 transition-all active:scale-[0.98]"
          >
            Lưu thay đổi
          </button>
        </div>

        {/* Right Side: Layout Preview */}
        <div className="xl:col-span-3 bg-[#1E293B] border border-slate-700/50 rounded-[3rem] p-12 flex flex-col items-center overflow-x-auto min-h-[700px] relative shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none rounded-t-[3rem]"></div>
          
          {/* Screen */}
          <div className="w-full max-w-2xl h-1.5 bg-cyan-500 rounded-full mb-32 relative shadow-[0_0_30px_rgba(34,211,238,0.4)]">
             <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-black tracking-[1.5em] text-cyan-500/30 uppercase">Màn hình</div>
             <div className="absolute top-min left-1/2 -translate-x-1/2 w-full h-20 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-50 blur-xl"></div>
          </div>

          {/* Seats Grid */}
          <div className="space-y-5 w-full flex flex-col items-center select-none">
            {layout.map((row, rIdx) => (
              <div key={rIdx} className="flex items-center justify-center gap-3">
                <div className="w-8 text-[10px] font-black text-slate-700 text-right mr-2">{String.fromCharCode(65 + rIdx)}</div>
                <div className="flex gap-2">
                  {row.map((seat, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => toggleSeatType(rIdx, cIdx)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-black transition-all transform hover:scale-125 hover:-translate-y-1 active:scale-90 border shadow-md ${SEAT_TYPES[seat.type].color} ${seat.type === 'EMPTY' ? 'border-dashed border-slate-600 text-transparent' : 'border-white/10 text-white shadow-xl'}`}
                    >
                      {seat.type !== 'EMPTY' ? (cIdx + 1) : ''}
                    </button>
                  ))}
                </div>
                <div className="w-8 text-[10px] font-black text-slate-700 text-left ml-2">{String.fromCharCode(65 + rIdx)}</div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-auto pt-20 grid grid-cols-4 gap-10">
            {Object.entries(SEAT_TYPES).map(([key, config]) => (
              <div key={key} className="flex items-center gap-3 group">
                <div className={`w-4 h-4 rounded-md ${config.color} ${key === 'EMPTY' ? 'border border-dashed border-slate-600' : 'shadow-lg border border-slate-700/50 group-hover:scale-110 transition-transform'}`}></div>
                <span className="text-[10px] font-black text-slate-400 group-hover:text-white transition-colors uppercase tracking-widest">{config.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomAdminEdit;
