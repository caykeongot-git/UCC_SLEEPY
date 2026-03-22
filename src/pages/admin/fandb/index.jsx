import React, { useState } from 'react';

const FandBAdminIndex = ({ items, onAdd, onEdit, onDelete, searchQuery = '' }) => {
  const [filterType, setFilterType] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'combo', name: 'Combo' },
    { id: 'popcorn', name: 'Bắp rang' },
    { id: 'drink', name: 'Nước uống' },
    { id: 'snack', name: 'Snack' }
  ];

  const filteredItems = items.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = (item.name && item.name.toLowerCase().includes(searchLower)) ||
                          (item.description && item.description.toLowerCase().includes(searchLower));
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">
            Quản lý <span className="text-cyan-400">F&B</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-4 flex-wrap">
          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-all shadow-inner ${
                filterType !== 'all' 
                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' 
                : 'bg-[#1E293B] border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50'
              }`}
              title="Lọc sản phẩm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            
            {showFilterDropdown && (
              <div className="absolute right-0 top-full mt-3 w-56 bg-[#1E293B] border border-slate-700/50 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setFilterType(cat.id);
                      setShowFilterDropdown(false);
                    }}
                    className={`w-full text-left px-5 py-3 text-[11px] font-bold transition-all uppercase tracking-wider flex items-center justify-between ${
                      filterType === cat.id 
                      ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border-l-2 border-transparent'
                    }`}
                  >
                    {cat.name}
                    {filterType === cat.id && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={onAdd}
            className="group ripple-btn px-6 py-3 bg-cyan-400 hover:bg-cyan-300 rounded-xl font-black text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] hover:scale-105 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.15em] whitespace-nowrap relative overflow-hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10 transition-transform duration-500 group-hover:rotate-90" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span className="relative z-10">Thêm Mới</span>
          </button>
        </div>
      </div>



      {/* Data Table */}
      <div className="bg-[#1E293B] rounded-[2rem] shadow-xl overflow-hidden mt-6 p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-[11px] uppercase font-black tracking-[0.2em] border-b border-slate-700/50">
                <th className="p-6 font-semibold w-32">Hình ảnh</th>
                <th className="p-6 font-semibold">Tên Combo</th>
                <th className="p-6 font-semibold">Mô tả</th>
                <th className="p-6 font-semibold text-right">Giá bán</th>
                <th className="p-6 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="border-b border-slate-700/50 hover:bg-[#2A3441] hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 group relative z-0 hover:z-10 hover:border-transparent">
                    <td className="p-6">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 group-hover:scale-105 transition-transform duration-500">
                        <img src={item.image || 'https://images.unsplash.com/photo-1572177641504-4765170ecc6d?auto=format&fit=crop&q=80&w=100&h=100'} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                    </td>
                    <td className="p-6 text-left">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-wide leading-tight">{item.name}</h3>
                        {item.type && (
                          <span className="inline-flex mt-1 items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-800/50 border border-slate-700/50 text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all duration-500 w-fit">
                             <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_#22d3ee] transition-all"></span>
                             {categories.find(c => c.id === item.type)?.name || item.type}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="text-xs text-slate-400 font-medium line-clamp-2 max-w-sm">{item.description}</p>
                    </td>
                    <td className="p-6 text-right">
                      <span className="text-lg font-black text-cyan-400">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-3 translate-x-3">
                        <button 
                          onClick={() => onEdit(item)}
                          className="w-10 h-10 rounded-xl bg-[#0F172A] border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-500 hover:border-cyan-500 transition-all active:scale-90"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z" /></svg>
                        </button>
                        <button 
                          onClick={() => onDelete(item.id)}
                          className="w-10 h-10 rounded-xl bg-[#0F172A] border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-rose-500 hover:border-rose-500 transition-all active:scale-90"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12z" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-slate-500 font-bold uppercase tracking-widest">
                    Không tìm thấy combo phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FandBAdminIndex;
