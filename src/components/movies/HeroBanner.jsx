import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const mockBanners = [
  {
    id: 1,
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    backdrop: "https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vtecsmEZzVNwv.jpg",
    age: "C16",
    genre: "Action/Sci-Fi",
  },
  {
    id: 2,
    title: "Mai",
    description: "Khám phá cuộc sống thăng trầm của Mai, một phụ nữ có số phận éo le, bị xã hội chỉ trích nhưng luôn khao khát yêu thương.",
    backdrop: "https://d1j8r0kxyu9tj8.cloudfront.net/images/1709605704E2Lg66aO2QzS4u1.jpg",
    age: "C18",
    genre: "Drama/Romance",
  },
  {
    id: 3,
    title: "Kung Fu Panda 4",
    description: "Po must train a new warrior when he's chosen to become the spiritual leader of the Valley of Peace.",
    backdrop: "https://image.tmdb.org/t/p/original/k0hc1XkXQz5P6eLz3z0V8k34I6Q.jpg",
    age: "P",
    genre: "Animation/Comedy",
  }
];

const HeroBanner = () => {
  return (
    <div className="w-full relative h-[60vh] md:h-[80vh] bg-dark-900">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {mockBanners.map((movie) => (
          <SwiperSlide key={movie.id} className="relative w-full h-full">
            {/* Backdrop Image */}
            <img 
              src={movie.backdrop} 
              alt={movie.title} 
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlays for matching UI */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/50 to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-16 md:pb-24 max-w-4xl animate-fadeInUp">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 text-xs font-bold bg-primary-600 text-white rounded">{movie.age}</span>
                <span className="text-light-300 text-sm font-medium">{movie.genre}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-light-100 mb-4 tracking-wide uppercase drop-shadow-lg">
                {movie.title}
              </h1>
              
              <p className="text-light-300 text-sm md:text-lg mb-6 md:mb-8 line-clamp-2 md:line-clamp-3 max-w-2xl drop-shadow">
                {movie.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <Link to={`/booking?movie=${movie.id}`} className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-5 md:px-8 py-2.5 md:py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)] text-sm md:text-base flex-1 sm:flex-none">
                  <Play size={18} fill="currentColor" /> MUA VÉ
                </Link>
                <Link to={`/movie/${movie.id}`} className="flex items-center justify-center gap-2 bg-dark-800/80 hover:bg-dark-700 backdrop-blur-md border border-dark-600 text-light-100 px-5 md:px-8 py-2.5 md:py-3 rounded-full font-bold transition-all text-sm md:text-base flex-1 sm:flex-none">
                  <Info size={18} /> CHI TIẾT
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Styles for Swiper Navigation/Pagination inside index.css or tailored here */}
      <style>{`
        .swiper-button-next, .swiper-button-prev {
          color: #0EA5E9;
          transform: scale(0.7);
        }
        .swiper-pagination-bullet {
          background-color: #CBD5E1;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background-color: #0EA5E9;
          opacity: 1;
          width: 24px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;
