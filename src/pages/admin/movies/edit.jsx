import React, { useState } from 'react';

const MovieAdminEdit = ({ movie, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    id: movie.id,
    title: movie.title,
    description: movie.description || movie.desc || '',
    age: movie.age || 'T13',
    duration: movie.duration,
    poster: movie.poster,
    genre: movie.genre || '',
    releaseDate: movie.releaseDate || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
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
          <span className="opacity-90">Chỉnh Sửa</span> <span className="text-cyan-gradient text-glow-cyan">Phim</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left: Poster Preview */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-[#1E293B] p-6 rounded-[2.5rem] border border-slate-700/50 shadow-xl">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 cyan-glow"></span>
              Ảnh đại diện
            </h3>
            <div className="aspect-[2/3] bg-[#0F172A] rounded-[2rem] border-2 border-dashed border-slate-700/50 flex flex-col items-center justify-center p-8 text-center group hover:border-cyan-500/50 transition-all relative overflow-hidden">
              {formData.poster ? (
                <img src={formData.poster} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-[#1E293B] border border-slate-700/50 flex items-center justify-center mb-4 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all shadow-lg">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tải lên poster</p>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-[#1E293B] p-6 rounded-[2rem] border border-slate-700/50 shadow-xl">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">URL Poster</label>
              <input 
                type="text" 
                placeholder="URL Poster phim..."
                className="w-full bg-[#0F172A] border border-slate-700/50 rounded-xl px-5 py-4 text-xs text-white focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-600 font-bold"
                value={formData.poster}
                onChange={(e) => setFormData({...formData, poster: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Right: Info Fields */}
        <div className="md:col-span-2 space-y-8">
           <div className="bg-[#1E293B] p-8 rounded-[2.5rem] border border-slate-700/50 space-y-8 shadow-xl">
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 cyan-glow"></span>
                  Thông tin phim
                </h3>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên phim</label>
                  <input 
                    type="text" 
                    required
                    placeholder="VD: Avengers: Endgame"
                    className="w-full bg-[#0F172A] border border-slate-700/50 rounded-2xl px-6 py-4 text-sm text-white focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-600 font-bold"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Thời lượng (phút)</label>
                    <input 
                      type="number" 
                      required
                      placeholder="VD: 120"
                      className="w-full bg-[#0F172A] border border-slate-700/50 rounded-2xl px-6 py-4 text-sm text-white focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-600 font-bold"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Độ Tuổi</label>
                    <select 
                      className="w-full bg-[#0F172A] border border-slate-700/50 rounded-2xl px-6 py-4 text-sm text-white focus:border-cyan-500/50 outline-none transition-all font-bold appearance-none cursor-pointer"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                    >
                      <option value="P" className="bg-[#0F172A]">P - Mọi lứa tuổi</option>
                      <option value="T13" className="bg-[#0F172A]">T13 - Trên 13 tuổi</option>
                      <option value="T16" className="bg-[#0F172A]">T16 - Trên 16 tuổi</option>
                      <option value="T18" className="bg-[#0F172A]">T18 - Trên 18 tuổi</option>
                      <option value="K" className="bg-[#0F172A]">K - Dưới 13 tuổi (có người giám hộ)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Thể loại</label>
                    <input 
                      type="text" 
                      placeholder="VD: Hành động, Viễn tưởng"
                      className="w-full bg-[#0F172A] border border-slate-700/50 rounded-2xl px-6 py-4 text-sm text-white focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-600 font-bold"
                      value={formData.genre}
                      onChange={(e) => setFormData({...formData, genre: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ngày khởi chiếu</label>
                    <input 
                      type="text" 
                      placeholder="VD: 23/03/2026"
                      className="w-full bg-[#0F172A] border border-slate-700/50 rounded-2xl px-6 py-4 text-sm text-white focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-600 font-bold"
                      value={formData.releaseDate}
                      onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mô tả phim</label>
                  <textarea 
                    rows="4"
                    placeholder="Nhập nội dung mô tả phim..."
                    className="w-full bg-[#0F172A] border border-slate-700/50 rounded-2xl px-6 py-4 text-sm text-white focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-600 font-medium resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
              </div>
           </div>

           <button 
             type="submit"
             className="w-full py-5 bg-cyan-gradient rounded-[2.5rem] font-black text-white uppercase tracking-[0.3em] text-xs shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:opacity-90 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all active:scale-[0.98] mt-4"
           >
             Lưu thay đổi
           </button>
        </div>
      </form>
    </div>
  );
};

export default MovieAdminEdit;
