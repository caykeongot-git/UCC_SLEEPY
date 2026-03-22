import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { getDynamicMovies } from '../../data/movies';

const RankingList = () => {
  const dynamicMovies = getDynamicMovies();
  // We'll take the top 5 movies based on rating
  const topMovies = [...dynamicMovies].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div className="w-full flex flex-col">
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-light-100 to-light-400 uppercase italic tracking-wide drop-shadow-md">
          BẢNG XẾP HẠNG
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        {topMovies.map((movie, index) => {
          const isTop1 = index === 0;
          return (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Link
                to={`/movie/${movie.id}`}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group
                  ${isTop1 ? 'bg-white/5 border border-white/10 shadow-lg' : 'hover:bg-white/5'}
                `}
              >
                {/* Rank Number */}
                <div className={`w-10 text-center font-black italic text-5xl leading-none drop-shadow-md z-10 transition-colors
                  ${isTop1 ? 'text-blue-600 group-hover:text-blue-500' : 'text-gray-500/50 group-hover:text-gray-400'}
                `}>
                  {index + 1}
                </div>

                {/* Poster */}
                <div className="w-16 h-24 md:w-20 md:h-[120px] rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Movie Info */}
                <div className="flex flex-col py-1 flex-1 min-w-0">
                  <h3 className={`font-black uppercase italic leading-tight mb-1 truncate transition-colors
                    ${isTop1 ? 'text-lg md:text-xl text-white group-hover:text-primary-400' : 'text-base md:text-lg text-gray-200 group-hover:text-white'}
                  `}>
                    {movie.title}
                  </h3>
                  
                  <p className="text-gray-400 text-xs md:text-sm mb-2 truncate">
                    Chiếu rạp • {movie.genre.split(',')[0]}
                  </p>
                  
                  <div className="flex items-center gap-1.5 text-warning font-bold text-sm">
                    <Star size={14} fill="currentColor" className="drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" />
                    <span className="text-orange-400">{movie.rating}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RankingList;
