import { useState } from 'react';
import { ChevronDown, ChevronUp, Check, ThumbsUp, Heart, Star } from 'lucide-react';

export default function MovieGrid({ movies, isDarkMode = true }) {
  const [expandedFilters, setExpandedFilters] = useState({
    popular: false,
    genre: false,
    language: true // Default open in the image
  });

  const toggleFilter = (key) => {
    setExpandedFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex items-start gap-8">
      {/* Left Sidebar Filters */}
      <div className="w-[240px] shrink-0 space-y-4">
        {/* Phổ biến */}
        <div className={`border rounded text-sm overflow-hidden shadow-2xl transition-all duration-500 ${
          isDarkMode ? 'bg-white/10 backdrop-blur-md border-white/10' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <button 
            onClick={() => toggleFilter('popular')}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 hover:bg-white/5 transition-colors ${
              isDarkMode ? 'text-gray-200' : 'text-slate-700 hover:bg-gray-50'
            } ${expandedFilters.popular ? `border-b font-bold ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-100 text-blue-600'}` : ''}`}
          >
            Phổ biến {expandedFilters.popular ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Thể loại */}
        <div className={`border rounded text-sm overflow-hidden shadow-2xl transition-all duration-500 ${
          isDarkMode ? 'bg-white/10 backdrop-blur-md border-white/10' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <button 
            onClick={() => toggleFilter('genre')}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 hover:bg-white/5 transition-colors ${
              isDarkMode ? 'text-gray-200' : 'text-slate-700 hover:bg-gray-50'
            } ${expandedFilters.genre ? `border-b font-bold ${isDarkMode ? 'border-white/10 text-white' : 'border-gray-100 text-blue-600'}` : ''}`}
          >
            Thể loại {expandedFilters.genre ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Ngôn ngữ */}
        <div className={`border rounded text-sm overflow-hidden shadow-2xl transition-all duration-500 ${
          isDarkMode ? 'bg-white/10 backdrop-blur-md border-white/10' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <button 
            onClick={() => toggleFilter('language')}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 hover:bg-white/5 transition-colors ${
              isDarkMode ? 'text-gray-200' : 'text-slate-700 hover:bg-gray-50'
            } ${expandedFilters.language ? `border-b font-bold ${isDarkMode ? 'text-cyan-400 border-white/10' : 'text-blue-600 border-gray-100'}` : ''}`}
          >
            Ngôn ngữ {expandedFilters.language ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {expandedFilters.language && (
            <div className="flex flex-col py-2 px-4 space-y-3 bg-transparent">
              <label className={`font-bold border-b pb-2 transition-colors ${isDarkMode ? 'text-cyan-400 border-white/5' : 'text-blue-600 border-gray-100'}`}>
                <span>Tất cả</span>
              </label>
              {['Tiếng Anh', 'Tiếng Việt', 'Tiếng Trung', 'Tiếng Hàn'].map(lang => (
                <label key={lang} className={`flex items-center gap-2 cursor-pointer transition-colors ${
                  isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-600 hover:text-blue-600 font-medium'
                }`}>
                  {lang}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className={`group flex flex-col relative rounded-lg overflow-hidden border transition-all duration-300 pb-3 shadow-sm hover:shadow-2xl ${
              isDarkMode 
                ? 'bg-white/10 backdrop-blur-md border-white/10 hover:shadow-blue-500/20 hover:border-blue-500/40' 
                : 'bg-white border-gray-200 hover:border-blue-400'
            }`}>
              <div className="relative aspect-[2/3] overflow-hidden">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'; }}
                />
                
                
                {/* Heart & Star */}
                <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
                  <button className={`p-1 rounded backdrop-blur-sm transition-colors shadow-lg border ${
                    isDarkMode ? 'bg-black/40 hover:bg-black/60 border-white/10' : 'bg-white/80 hover:bg-white border-gray-100'
                  }`}>
                    <Heart size={14} className={isDarkMode ? 'text-white hover:text-red-500' : 'text-slate-600 hover:text-red-500'} />
                  </button>
                  <button className={`p-1 rounded backdrop-blur-sm transition-colors shadow-lg border ${
                    isDarkMode ? 'bg-black/40 hover:bg-black/60 border-white/10' : 'bg-white/80 hover:bg-white border-gray-100'
                  }`}>
                    <Star size={14} className={isDarkMode ? 'text-white hover:text-yellow-500' : 'text-slate-600 hover:text-yellow-500'} />
                  </button>
                </div>

                {/* Status & Format Overlay */}
                <div className="absolute bottom-2 left-2 flex flex-col gap-1 z-10">
                   <span className={`px-1.5 py-0.5 rounded-[4px] text-[9px] font-black border uppercase tracking-wider flex items-center gap-1 shadow-2xl ${
                      movie.status === 'Now Showing' ? 'bg-green-500/90 text-white border-green-400' :
                      movie.status === 'Coming Soon' ? 'bg-yellow-500/90 text-white border-yellow-400' :
                      'bg-red-500/90 text-white border-red-400'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${movie.status === 'Now Showing' ? 'bg-white animate-pulse' : 'bg-white'}`}></span>
                      {movie.status === 'Now Showing' ? 'Đang chiếu' :
                       movie.status === 'Coming Soon' ? 'Sắp chiếu' : 'Ngừng chiếu'}
                    </span>
                    <span className="bg-blue-600/90 text-white text-[9px] font-black px-1.5 py-0.5 rounded-[4px] border border-blue-400/50 uppercase w-fit shadow-2xl">
                      {movie.format || '2D'}
                    </span>
                </div>
              </div>

              <div className="p-3 bg-transparent flex flex-col flex-1">
                <h3 className={`font-bold text-[15px] leading-tight mb-2 line-clamp-2 uppercase transition-colors ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`} title={movie.title}>
                  {movie.title}
                </h3>
                
                <div className="mt-auto flex justify-between items-center text-sm">
                  <div className="flex flex-col">
                    <span className={`font-medium transition-colors ${isDarkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                      {movie.releaseDate}
                    </span>
                    <span className={`text-[11px] transition-colors leading-tight ${isDarkMode ? 'text-blue-400/80' : 'text-blue-600/80'}`}>
                      {movie.duration} phút
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 font-black transition-colors ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}>
                    <ThumbsUp size={14} className="mb-0.5" />
                    <span>{movie.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
