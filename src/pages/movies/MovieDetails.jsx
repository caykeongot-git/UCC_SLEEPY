import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import movieService from '../../services/movieService';
import ReviewAndRecommend from '../../components/movies/ReviewAndRecommend';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    movieService.getMovieById(id).then(setMovie);
    // Cuộn lên đầu trang khi vào trang chi tiết
    window.scrollTo(0, 0);
  }, [id]);

  if (!movie) return <div className="p-20 text-center text-blue-500 font-bold">Đang tải siêu phẩm...</div>;

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white pb-20 font-sans">
      
      {/* 1. TRAILER SECTION (CHẾ ĐỘ BACKGROUND - LUÔN BẬT TIẾNG) */}
      <div className="relative w-full aspect-video md:h-[75vh] bg-black overflow-hidden shadow-2xl">
        
        {/* Lớp phủ chặn tương tác: Người dùng không thể click, pause hay chuột phải vào video */}
        <div className="absolute inset-0 z-30 pointer-events-none cursor-default"></div>

        {/* Kỹ thuật Scale & Translate để giấu thanh UI của Youtube */}
        <iframe 
          className="w-full h-[125%] -translate-y-[10%] scale-[1.2] border-0" 
          src={`https://www.youtube.com/embed/${movie.trailerId}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${movie.trailerId}`} 
          title={movie.title}
          allow="autoplay; encrypted-media"
          // Quan trọng: Thêm pointer-events-none trực tiếp để khóa tương tác
          style={{ pointerEvents: 'none' }}
        />

        {/* Lớp phủ Gradient để chuyển tiếp mượt mà xuống phần thông tin bên dưới */}
        <div className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent"></div>
      </div>
      
      {/* 2. PHẦN THÔNG TIN CHI TIẾT PHIM */}
      <div className="container mx-auto px-4 -mt-24 md:-mt-40 relative z-50">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          {/* Poster chuẩn tỉ lệ 2/3 rạp phim */}
          <div className="w-72 aspect-[2/3] shrink-0 border-4 border-blue-600 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.4)] bg-zinc-900">
            <img 
              src={movie.poster} 
              className="w-full h-full object-cover" 
              alt={movie.title} 
            />
          </div>

          <div className="flex-1 pt-32 md:pt-0">
             {/* Tên phim với hiệu ứng đổ bóng mạnh */}
             <h1 className="text-5xl md:text-8xl font-black text-blue-500 uppercase italic mb-8 drop-shadow-2xl tracking-tighter">
               {movie.title}
             </h1>

             {/* Nhãn định dạng và thể loại */}
             <div className="flex gap-4 mb-10">
                <span className="bg-blue-600 px-6 py-2 rounded-full font-bold text-xs uppercase shadow-lg">
                  ● {movie.format}
                </span>
                <span className="bg-zinc-800 border border-zinc-700 px-6 py-2 rounded-full text-xs font-bold uppercase">
                  {movie.genre}
                </span>
             </div>

             {/* Mô tả nội dung phim */}
             <p className="text-zinc-400 text-xl leading-relaxed mb-12 border-l-8 border-blue-600 pl-8 bg-zinc-900/30 py-8 rounded-r-3xl italic">
               "{movie.description}"
             </p>

             {/* Component Đánh giá & Gợi ý */}
             <ReviewAndRecommend />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;