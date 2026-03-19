import { Sparkles } from "lucide-react";
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const mockRecommendations = [
  { id: 11, title: "Oppenheimer", genre: "Tâm lý/Tiểu sử", ageRating: "C18", duration: 180, rating: 8.9, is3D: false, poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
  { id: 12, title: "Tenet", genre: "Hành Động/Viễn Tưởng", ageRating: "C13", duration: 150, rating: 7.3, is3D: false, poster: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg" },
  { id: 13, title: "Interstellar", genre: "Viễn Tưởng", ageRating: "C13", duration: 169, rating: 8.7, is3D: false, poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
];

const AIRecommendations = ({ movieId }) => {
  return (
    <div className="w-full mt-12 bg-gradient-to-br from-dark-800 to-indigo-900/20 p-6 md:p-8 rounded-2xl border border-indigo-500/30 relative overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.1)]">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="flex gap-3 items-center mb-6 relative z-10">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]">
           <Sparkles size={22} className="animate-pulse" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-light-100 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
            Dành Riêng Cho Bạn
          </h3>
          <p className="text-indigo-300/80 text-sm">AI phân tích sở thích & lịch sử xem của bạn</p>
        </div>
      </div>

      <div className="relative z-10 w-full">
        <Swiper
          modules={[FreeMode]}
          freeMode={true}
          spaceBetween={16}
          slidesPerView={1.5}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full pb-4"
        >
          {mockRecommendations.map((movie) => (
            <SwiperSlide key={movie.id} className="h-auto">
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default AIRecommendations;
