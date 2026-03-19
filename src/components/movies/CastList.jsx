import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

const CastList = ({ casts }) => {
  if (!casts || casts.length === 0) return null;

  return (
    <div className="w-full mt-8">
      <h3 className="text-xl font-bold text-light-100 mb-4 border-l-4 border-primary-500 pl-3">Diễn viên</h3>
      
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        spaceBetween={16}
        slidesPerView="auto"
        className="w-full"
      >
        {casts.map((cast, index) => (
          <SwiperSlide key={index} className="w-[120px] md:w-[150px]">
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-dark-700 group-hover:border-primary-500 transition-colors duration-300 mb-3 relative">
                <img 
                  src={cast.avatar || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} 
                  alt={cast.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-light-100 font-bold text-center text-sm md:text-base mb-1 line-clamp-1 group-hover:text-primary-400">{cast.name}</p>
              <p className="text-light-400 text-xs md:text-sm text-center italic line-clamp-1">{cast.role}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CastList;
