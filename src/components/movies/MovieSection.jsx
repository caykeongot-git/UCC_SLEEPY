import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

// Swiper core styles are imported globally or in HeroBanner

const MovieSection = ({ title, movies, linkAll }) => {
  return (
    <div className="w-full py-8 md:py-12 section-container">
      <div className="flex justify-between items-center mb-6 px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-black text-light-100 uppercase border-l-4 border-primary-500 pl-3">
          {title}
        </h2>
        {linkAll && (
          <Link to={linkAll} className="flex items-center text-primary-500 font-bold hover:text-primary-600 transition-colors">
            XEM TẤT CẢ <ChevronRight size={20} />
          </Link>
        )}
      </div>

      <div className="px-4 md:px-8 relative group">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          className="w-full py-4 px-2"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className="h-auto pb-4">
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Navigation Buttons (Visible on hover on desktop) */}
        <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity border border-dark-700 shadow-xl hidden md:flex hover:bg-primary-600 hover:text-white">
          <ChevronRight size={24} className="rotate-180" />
        </div>
        <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-dark-900/80 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity border border-dark-700 shadow-xl hidden md:flex hover:bg-primary-600 hover:text-white">
          <ChevronRight size={24} />
        </div>
      </div>
    </div>
  );
};

export default MovieSection;
