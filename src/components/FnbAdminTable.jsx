import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, PowerOff, Power, ImageOff } from 'lucide-react';

const ImageWithFallback = ({ src, alt, name, className, isDarkMode }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center rounded uppercase transition-colors ${
        isDarkMode ? 'bg-white/5 text-gray-500' : 'bg-gray-100 text-gray-400'
      } text-[10px] font-bold text-center p-1 ${className.includes('grayscale') ? 'opacity-30' : ''}`}>
        <ImageOff size={24} className="mb-1 opacity-50" />
        <span className="leading-tight px-1 line-clamp-2">{name}</span>
      </div>
    );
  }

  return (
    <img 
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

export default function FnbAdminTable({ fnbs, onEdit, onDelete, onUpdate, onAdd, isDarkMode = true }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFnbs = fnbs.filter(fnb => 
    fnb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (fnb.description && fnb.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = [
    { id: 'drink', title: 'NƯỚC UỐNG' },
    { id: 'snack', title: 'SNACKS - KẸO' },
    { id: 'combo', title: 'COMBO BẮP NƯỚC' }
  ];

  return (
    <div className={`max-w-6xl mx-auto transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Search and Add Header */}
      <div className={`flex flex-col md:flex-row justify-between items-center mb-16 gap-6 p-4 rounded-xl backdrop-blur-md border shadow-lg transition-all duration-500 ${
        isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <h2 className={`text-2xl font-black italic tracking-widest drop-shadow-md uppercase transition-colors ${
          isDarkMode ? 'text-[#cfd4d8]' : 'text-slate-800'
        }`}>
          Quản Lý Bắp Nước & Đồ Ăn
        </h2>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm transition-all font-medium ${
                isDarkMode 
                  ? 'bg-white/10 border-transparent text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400 shadow-sm'
              }`}
            />
          </div>
          <button 
            onClick={onAdd}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-transform transform hover:-translate-y-0.5 shrink-0 text-sm font-bold shadow-lg"
          >
            <Plus size={18} />
            Thêm Mới
          </button>
        </div>
      </div>

      <div className="space-y-20">
        {categories.map(cat => {
          const items = filteredFnbs.filter(f => f.category === cat.id);
          if (items.length === 0) return null;

          return (
            <div key={cat.id}>
              {/* Category Title */}
              <h3 className={`text-center font-black text-[32px] md:text-[36px] mb-12 uppercase transition-colors ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`} style={{ fontFamily: 'Impact, Arial Black, sans-serif', textShadow: isDarkMode ? '0px 2px 4px rgba(0,0,0,0.5)' : 'none', letterSpacing: '0.05em' }}>
                {cat.title}
              </h3>

              {/* Grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 place-items-center md:place-items-start">
                {items.map(fnb => (
                  <div key={fnb.id} className={`flex gap-4 group w-full max-w-[340px] p-3 rounded-xl border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/30' 
                      : 'bg-white border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-400'
                  }`}>
                    {/* Image Container */}
                    <div className={`w-[100px] h-[120px] rounded p-2 flex items-center justify-center shrink-0 shadow-lg hover:scale-105 transition-transform cursor-pointer relative ${
                      isDarkMode ? 'bg-[#efefef]' : 'bg-gray-100'
                    }`} title="Di chuột để xem thao tác">
                      <ImageWithFallback 
                        src={fnb.image}
                        alt={fnb.name}
                        name={fnb.name}
                        isDarkMode={isDarkMode}
                        className={`max-w-full max-h-full object-contain drop-shadow-md ${fnb.isOutOfStock ? 'opacity-30 grayscale' : ''}`}
                      />
                      {fnb.isOutOfStock && (
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-black/80 text-white text-[10px] font-bold text-center py-1 rounded-sm mx-1 drop-shadow-lg scale-110">
                          HẾT HÀNG
                        </div>
                      )}
                    </div>
                    
                    {/* Info Container */}
                    <div className="flex flex-col py-0.5 uppercase flex-1 relative">
                      <h4 className={`font-bold text-[13px] leading-snug tracking-wide line-clamp-2 transition-colors ${
                        isDarkMode ? 'text-white' : 'text-slate-800'
                      }`}>
                        {fnb.name}
                      </h4>
                      <p className={`text-[10px] normal-case line-clamp-2 leading-tight mt-1 transition-colors ${
                        isDarkMode ? 'text-gray-400' : 'text-slate-500'
                      } ${fnb.isOutOfStock ? 'opacity-40' : 'opacity-70'}`}>
                        {fnb.description || ''}
                      </p>
                      
                      <div className={`text-[12px] font-bold mt-1 tracking-wider transition-colors ${
                        fnb.isOutOfStock ? (isDarkMode ? 'text-gray-500' : 'text-gray-400') : (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                      }`}>
                        {fnb.price.toLocaleString('vi-VN')} VND
                      </div>

                      <div className="flex items-center mt-auto mb-1 gap-2">
                        {/* + / - Control */}
                        <div className={`w-[84px] h-[26px] rounded border-none shadow-inner flex font-bold text-[14px] p-0 overflow-hidden select-none items-center mt-2 transition-colors ${
                          isDarkMode ? 'bg-[#8493a5] text-slate-900' : 'bg-gray-100 text-slate-700'
                        } ${fnb.isOutOfStock ? 'opacity-50' : ''}`}>
                          <button 
                            disabled={fnb.isOutOfStock}
                            onClick={() => onUpdate && onUpdate(fnb.id, { stock: Math.max(0, (fnb.stock || 0) - 1) })}
                            className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >−</button>
                          <div className="flex-1 h-full flex items-center justify-center border-x border-slate-700/10 bg-transparent text-[13px]">{fnb.stock || 0}</div>
                          <button 
                            disabled={fnb.isOutOfStock}
                            onClick={() => onUpdate && onUpdate(fnb.id, { stock: (fnb.stock || 0) + 1 })}
                            className="flex-1 h-full flex items-center justify-center hover:bg-black/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >+</button>
                        </div>

                        {/* Admin Action Buttons */}
                        <div className="flex gap-1.5 mt-2 ml-auto">
                          <button 
                            onClick={() => onEdit(fnb)}
                            className="w-[26px] h-[26px] flex items-center justify-center bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow-sm"
                            title="Sửa"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button 
                            onClick={() => {
                              if (window.confirm(`Bạn có chắc muốn xóa '${fnb.name}'?`)) {
                                onDelete(fnb.id);
                              }
                            }}
                            className="w-[26px] h-[26px] flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600 transition-colors shadow-sm"
                            title="Xóa"
                          >
                            <Trash2 size={12} />
                          </button>
                          <button 
                            onClick={() => onUpdate && onUpdate(fnb.id, { isOutOfStock: !fnb.isOutOfStock })}
                            className={`w-[26px] h-[26px] flex items-center justify-center rounded transition-colors shadow-sm ${
                              fnb.isOutOfStock ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-[#eab308] hover:bg-yellow-400 text-white'
                            }`}
                            title={fnb.isOutOfStock ? "Mở bán lại" : "Tạm thời hết"}
                          >
                            {fnb.isOutOfStock ? <Power size={12} /> : <PowerOff size={12} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
