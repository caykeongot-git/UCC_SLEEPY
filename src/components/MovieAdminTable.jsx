import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Film, Calendar, Globe, Monitor, Clock } from 'lucide-react';

export default function MovieAdminTable({ movies, onEdit, onDelete, onAdd, isDarkMode = true }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className={`rounded-xl shadow-2xl overflow-hidden border transition-all duration-500 ${
        isDarkMode ? 'bg-white/10 backdrop-blur-xl border-white/10' : 'bg-white border-gray-200'
      }`}>
        <div className={`p-6 border-b flex flex-col md:flex-row justify-between items-center gap-4 transition-colors ${
          isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-gray-50'
        }`}>
          <div>
            <h2 className={`text-xl font-bold flex items-center gap-2 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              <Film className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
              Bảng dữ liệu Phim
            </h2>
            <p className={`text-sm mt-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Quản lý thêm, sửa, xóa thông tin các bộ phim</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm kiếm phim..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400 shadow-sm'
                }`}
              />
            </div>
            <button 
              onClick={onAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shrink-0 text-sm font-medium shadow-sm"
            >
              <Plus size={18} />
              Thêm Phim
            </button>
          </div>
        </div>

        <div className="p-6">
          {filteredMovies.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              <Film size={48} className="mx-auto mb-4 opacity-20" />
              <p>Không tìm thấy dữ liệu phim nào.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-x-6">
              {filteredMovies.map((movie, index) => (
                <div 
                  key={movie.id} 
                  className={`group flex flex-col relative rounded-xl border overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10 hover:border-blue-500/30' 
                      : 'bg-white border-gray-200 hover:border-blue-400'
                  }`}
                >
                  {/* Action Button (Style like MUA VE in image) */}
                  <div className="absolute top-2 right-2 z-20">
                    <button 
                      onClick={() => onEdit(movie)}
                      className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-3 py-1.5 rounded flex items-center gap-1.5 shadow-lg transform transition-transform hover:-translate-y-0.5 uppercase tracking-wider"
                    >
                      <Edit2 size={12} strokeWidth={3} />
                      Sửa
                    </button>
                  </div>

                  {/* Poster Container */}
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img 
                      src={movie.poster} 
                      alt={movie.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'; }}
                    />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                       <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                         movie.ageRating === 'T18' ? 'bg-red-600 text-white border-red-500' :
                         movie.ageRating === 'T16' ? 'bg-orange-500 text-white border-orange-400' :
                         movie.ageRating === 'T13' ? 'bg-yellow-500 text-white border-yellow-400' :
                         'bg-green-600 text-white border-green-500'
                       }`}>
                         {movie.ageRating}
                       </span>
                       
                       {/* Status Badge */}
                       <span className={`px-1.5 py-0.5 rounded text-[9px] font-black border uppercase tracking-wider flex items-center gap-1 shadow-lg ${
                         movie.status === 'Now Showing' ? 'bg-green-500/90 text-white border-green-400' :
                         movie.status === 'Coming Soon' ? 'bg-yellow-500/90 text-white border-yellow-400' :
                         'bg-red-500/90 text-white border-red-400'
                       }`}>
                         <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                           movie.status === 'Now Showing' ? 'bg-white' :
                           movie.status === 'Coming Soon' ? 'bg-white' :
                           'bg-white'
                         }`}></span>
                         {movie.status === 'Now Showing' ? 'Đang chiếu' :
                          movie.status === 'Coming Soon' ? 'Sắp chiếu' : 'Ngừng chiếu'}
                       </span>
                    </div>


                    {/* Delete Button (Overlay on hover) */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('Bạn có chắc chắn muốn xóa phim này?')) {
                            onDelete(movie.id);
                          }
                        }}
                        className="bg-white/20 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-md transition-all transform scale-90 group-hover:scale-100 border border-white/30"
                        title="Xóa Phim"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="p-3 flex flex-col flex-1">
                    <h3 className={`font-bold text-[13px] mb-2 uppercase line-clamp-2 leading-tight min-h-[2.5rem] transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`} title={movie.title}>
                      {movie.title}
                    </h3>
                    
                    <div className="space-y-1.5 mt-auto">
                      <div className="flex items-center gap-2 text-[10px] leading-relaxed">
                        <span className={`font-bold w-14 shrink-0 transition-colors flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                          <Calendar size={10} /> Ngày:
                        </span>
                        <span className={`font-black transition-colors ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{movie.releaseDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] leading-relaxed">
                        <span className={`font-bold w-14 shrink-0 transition-colors flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                          <Globe size={10} /> Quốc gia:
                        </span>
                        <span className={`transition-colors truncate ${isDarkMode ? 'text-gray-200' : 'text-slate-700'}`}>{movie.country || 'Việt Nam'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] leading-relaxed">
                        <span className={`font-bold w-14 shrink-0 transition-colors flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                          <Monitor size={10} /> Định dạng:
                        </span>
                        <span className={`font-black transition-colors ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>{movie.format || '2D'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] leading-relaxed">
                        <span className={`font-bold w-14 shrink-0 transition-colors flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                          <Clock size={10} /> Thời lượng:
                        </span>
                        <span className={`transition-colors ${isDarkMode ? 'text-gray-200' : 'text-slate-700'}`}>{movie.duration} phút</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] leading-relaxed pt-1 border-t border-dashed border-gray-500/30">
                        <span className={`font-bold w-14 shrink-0 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>Thể loại:</span>
                        <span className={`line-clamp-1 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-slate-700'}`}>{movie.genre || 'Chưa xác định'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={`p-4 border-t flex justify-between items-center text-xs font-medium transition-colors ${
          isDarkMode ? 'border-white/10 bg-white/5 text-gray-400' : 'border-gray-100 bg-gray-50 text-slate-500'
        }`}>
          <div>Tổng số: <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>{filteredMovies.length}</strong> phim</div>
          <div>Cập nhật lần cuối: {new Date().toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
}
