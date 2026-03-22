import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import { getDynamicMovies } from '../../data/movies';

const mockTopMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    genre: "Action/Sci-Fi",
    rating: 8.8,
    poster: "https://wsrv.nl/?url=image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8vTF9T4699.jpg",
  },
  {
    id: 2,
    title: "Mai",
    genre: "Drama/Romance",
    rating: 7.5,
    poster: "https://d1j8r0kxyu9tj8.cloudfront.net/images/1709605704E2Lg66aO2QzS4u1.jpg",
  },
  {
    id: 3,
    title: "Kung Fu Panda 4",
    genre: "Animation/Comedy",
    rating: 7.2,
    poster: "https://wsrv.nl/?url=image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjwvTEuhvW2f.jpg",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const TopMoviesSection = () => {
  const dynamicMovies = getDynamicMovies();
  const displayMovies = dynamicMovies.length >= 3 ? dynamicMovies.slice(0, 3) : dynamicMovies.length > 0 ? dynamicMovies : mockTopMovies;

  return (
    <div className="w-full py-12 md:py-16 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 border-y border-dark-800 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="px-4 md:px-8 max-w-[1400px] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-1 bg-primary-500 rounded-full" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-light-100 to-primary-100 uppercase tracking-wide">
              Top Phim Đề Xuất
            </h2>
          </div>
          <p className="text-light-500 mt-2 text-sm md:text-base">Những bộ phim đang được xem nhiều nhất tuần qua</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10"
        >
          {displayMovies.map((movie, index) => (
            <motion.div 
              key={movie.id} 
              variants={itemVariants}
              className={`relative ${index === 0 ? 'md:-translate-y-4' : index === 2 ? 'md:translate-y-4' : ''}`}
            >
              {/* Giant Number Behind */}
              <div className="absolute -left-4 md:-left-8 -top-8 md:-top-16 text-[120px] md:text-[180px] font-black leading-none text-dark-800/80 drop-shadow-2xl select-none italic font-sans z-0 pointer-events-none mix-blend-color-dodge text-stroke z-0">
                {index + 1}
              </div>

              {/* Movie Card */}
              <div className="group relative z-10 w-full rounded-2xl overflow-hidden bg-dark-800 hover:shadow-[0_20px_40px_rgba(14,165,233,0.3)] transition-all duration-500 border border-dark-700/50 hover:border-primary-500/50">
                <div className="aspect-[2/3] w-full relative overflow-hidden">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    src={movie.poster} 
                    alt={movie.title} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Actions */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 gap-3 scale-90 group-hover:scale-100">
                    <Link to={`/movie/${movie.id}`} className="bg-primary-600 hover:bg-primary-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(14,165,233,0.5)] transition-colors">
                      <Play fill="currentColor" size={28} />
                    </Link>
                  </div>

                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 bg-dark-900/80 backdrop-blur-md px-2 py-1 rounded-md border border-dark-700 text-warning text-xs font-bold">
                      <Star size={12} fill="currentColor" />
                      {movie.rating}
                    </div>
                  </div>
                </div>

                {/* Info Block */}
                <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-dark-900 via-dark-900/95 to-transparent pt-12">
                   <h3 className="text-light-100 font-bold text-xl md:text-2xl leading-tight mb-1 truncate group-hover:text-primary-400 transition-colors">
                     {movie.title}
                   </h3>
                   <p className="text-light-400 text-sm truncate">{movie.genre}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Custom Styles using Tailwind Arbitrary values for text stroke might be better, or just inline CSS for text-stroke */}
      <style>{`
        .text-stroke {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.05);
          color: transparent;
        }
      `}</style>
    </div>
  );
};

export default TopMoviesSection;
