import React, { useState } from 'react';

const CinemaAdminEdit = ({ cinema, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    id: cinema.id,
    name: cinema.name,
    location: cinema.location,
    description: cinema.description || '',
    type: cinema.type || 'Standard',
    status: cinema.status || 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1E293B] border border-slate-700/50 flex items-center justify-center group-hover:border-slate-500 transition-all shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </div>
          <span className="text-xs font-black uppercase tracking-widest">Trở lại</span>
        </button>

        <h2 className="text-3xl font-black text-white uppercase tracking-tighter drop-shadow-sm">
          <span className="opacity-90">Chỉnh Sửa</span> <span className="text-cyan-gradient text-glow-cyan">Cụm Rạp</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-[#1E293B] p-10 rounded-[2.5rem] border border-slate-700/50 space-y-8 shadow-xl">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 cyan-glow"></span>
            Thông tin cụm rạp
          </h3>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên cụm rạp</label>
            <input 
              type="text" 
              required
              placeholder="VD: Luminary Cinema Quận 1"
              className="w-full bg-[#0F172A] border border-slate-700/50 rounded-2xl px-6 py-4 text-sm text-white focus:border-cyan-500/50 outline-none transition-all font-bold placeholder:text-slate-600"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Địa chỉ</label>
            <input 
              type="text" 
              required
              placeholder="VD: 123 Lê Lợi, P. Bến Thành, Quận 1"
              className="w-full bg-[#0F172A] border border-slate-700/50 rounded-2xl px-6 py-4 text-sm text-white focus:border-cyan-500/50 outline-none transition-all font-bold placeholder:text-slate-600"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Loại rạp</label>
              <select 
                className="w-full bg-[#0F172A] border border-slate-700/50 rounded-2xl px-6 py-4 text-sm text-white focus:border-cyan-500/50 outline-none transition-all font-bold appearance-none cursor-pointer"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="Premium Gold" className="bg-[#0F172A]">Premium Gold</option>
                <option value="IMAX Experience" className="bg-[#0F172A]">IMAX Experience</option>
                <option value="Standard" className="bg-[#0F172A]">Standard</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Trạng thái</label>
              <select 
                className="w-full bg-[#0F172A] border border-slate-700/50 rounded-2xl px-6 py-4 text-sm text-white focus:border-cyan-500/50 outline-none transition-all font-bold appearance-none cursor-pointer"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="active" className="bg-[#0F172A]">Hoạt động</option>
                <option value="maintenance" className="bg-[#0F172A]">Bảo trì</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mô tả cụm rạp</label>
            <textarea 
              rows="4"
              className="w-full bg-[#0F172A] border border-slate-700/50 rounded-2xl px-6 py-4 text-sm text-white focus:border-cyan-500/50 outline-none transition-all font-medium resize-none shadow-inner"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-5 bg-cyan-gradient rounded-[2.5rem] font-black text-white uppercase tracking-[0.3em] text-xs shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:opacity-90 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all active:scale-[0.98]"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default CinemaAdminEdit;
