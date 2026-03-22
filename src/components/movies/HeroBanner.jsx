import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getDynamicMovies } from '../../data/movies';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const mockBanners = [
  {
    id: 1,
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    backdrop: "https://wsrv.nl/?url=image.tmdb.org/t/p/original/8rpDcsfLJypbO6vtecsmEZzVNwv.jpg",
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
    backdrop: "https://wsrv.nl/?url=image.tmdb.org/t/p/original/k0hc1XkXQz5P6eLz3z0V8k34I6Q.jpg",
    age: "P",
    genre: "Animation/Comedy",
  }
];

const HeroBanner = () => {
  const dynamicMovies = getDynamicMovies();
  const displayBanners = dynamicMovies.length > 0 ? dynamicMovies.slice(0, 5) : mockBanners;

  return (
    <div className="w-full relative h-[70vh] md:h-[85vh] bg-dark-900 border-b border-dark-800">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {displayBanners.map((movie) => (
          <SwiperSlide key={movie.id} className="relative w-full h-full overflow-hidden">
            {({ isActive }) => (
              <>
                {/* Animated Backdrop Image */}
                <motion.img 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: isActive ? 1 : 1.1 }}
                  transition={{ duration: 7, ease: "linear" }}
                  src={movie.backdrop} 
                  alt={movie.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlays for matching UI */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-dark-900/95 via-dark-900/60 to-transparent z-10"></div>

                {/* Content */}
                <motion.div 
                  initial="hidden"
                  animate={isActive ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1, 
                      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
                    }
                  }}
                  className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-16 md:pb-24 max-w-4xl z-20 pointer-events-none"
                >
                  <motion.div 
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex items-center gap-3 mb-4 pointer-events-auto"
                  >
                    <span className="px-2 py-1 text-xs font-bold bg-primary-600 text-white rounded">{movie.age}</span>
                    <span className="text-light-300 text-sm font-medium">{movie.genre}</span>
                  </motion.div>
                  
                  <motion.h1 
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-light-300 mb-4 tracking-wide uppercase drop-shadow-2xl pointer-events-auto"
                  >
                    {movie.title}
                  </motion.h1>
                  
                  <motion.p 
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-light-300 text-sm md:text-lg mb-8 max-w-2xl drop-shadow-md leading-relaxed pointer-events-auto"
                  >
                    {movie.description}
                  </motion.p>
                  
                  <motion.div 
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-wrap items-center gap-4 pointer-events-auto"
                  >
                    <Link to={`/booking?movie=${movie.id}`} className="group flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] hover:-translate-y-1">
                      <Play size={20} fill="currentColor" className="group-hover:scale-110 transition-transform" /> MUA VÉ
                    </Link>
                    <Link to={`/movie/${movie.id}`} className="flex items-center justify-center gap-2 bg-dark-800/80 hover:bg-dark-700 backdrop-blur-md border border-dark-600 text-light-100 px-8 py-3.5 rounded-full font-bold transition-all hover:border-light-500 hover:-translate-y-1">
                      <Info size={20} /> CHI TIẾT
                    </Link>
                  </motion.div>
                </motion.div>
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Styles for Swiper Navigation/Pagination */}
      <style>{`
        .swiper-button-next, .swiper-button-prev {
          color: #0EA5E9 !important;
          transform: scale(0.6);
          background: rgba(30, 41, 59, 0.5);
          width: 60px !important;
          height: 60px !important;
          border-radius: 50%;
          backdrop-filter: blur(8px);
          transition: all 0.3s;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background: #0EA5E9;
          color: white !important;
          transform: scale(0.7);
        }
        .swiper-pagination-bullet {
          background-color: #CBD5E1 !important;
          opacity: 0.4 !important;
          width: 10px !important;
          height: 10px !important;
          transition: all 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          background-color: #0EA5E9 !important;
          opacity: 1 !important;
          width: 32px !important;
          border-radius: 5px !important;
          box-shadow: 0 0 10px rgba(14,165,233, 0.5);
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;
