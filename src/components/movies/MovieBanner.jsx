import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MovieBanner = ({ movies }) => {
  return (
    <div className="w-full h-[450px] md:h-[600px] bg-black">
      <Swiper navigation pagination autoplay={{ delay: 5000 }} modules={[Navigation, Pagination, Autoplay]} className="h-full">
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-full h-full">
              {/* object-cover: Ép ảnh phủ kín khung, không bị méo */}
              <img src={movie.poster} className="w-full h-full object-cover" alt={movie.title} />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0b] via-black/30 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 max-w-4xl">
                <h2 className="text-4xl md:text-7xl font-black text-blue-500 uppercase italic mb-4">{movie.title}</h2>
                <p className="text-white mb-8 line-clamp-2 italic">{movie.description}</p>
                <button className="bg-blue-600 px-10 py-4 rounded-xl font-bold uppercase w-fit">Đặt Vé Ngay</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieBanner;