import { Link } from "react-router-dom";
import { Play, Star, Calendar } from "lucide-react";

const MovieCard = ({ movie }) => {
  return (
    <div className="group relative w-full rounded-2xl overflow-hidden bg-dark-800 cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-2 shadow-lg hover:shadow-[0_10px_30px_rgba(14,165,233,0.3)]">
      {/* Poster */}
      <div className="aspect-[2/3] w-full overflow-hidden relative">
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        
        {/* Hover Actions */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-3 z-10">
          <Link to={`/movie/${movie.id}`} className="bg-primary-600 hover:bg-primary-500 text-white p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_15px_rgba(14,165,233,0.5)]">
            <Play fill="currentColor" size={24} />
          </Link>
          <Link to={`/movie/${movie.id}`} className="px-5 py-2 bg-dark-800/80 backdrop-blur-sm border border-dark-700 rounded-full text-light-100 font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:border-primary-500">
            Chi tiết
          </Link>
        </div>
        
        {/* Top Badges */}
        <div className="absolute top-2 md:top-3 left-2 md:left-3 flex gap-1.5 flex-wrap z-10">
          <span className="bg-primary-600 text-white text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded">2D</span>
          {movie.is3D && <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded">3D</span>}
        </div>
        <div className="absolute top-2 md:top-3 right-2 md:right-3 z-10">
          <span className="bg-dark-900/80 backdrop-blur-sm text-warning text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded flex items-center gap-1 border border-dark-700">
            <Star size={10} md:size={12} fill="currentColor" /> {movie.rating}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 relative z-10 bg-dark-900/90 backdrop-blur-md">
        <h3 className="text-light-100 font-bold text-lg leading-tight mb-1 truncate group-hover:text-primary-500 transition-colors">{movie.title}</h3>
        <p className="text-light-300 text-sm mb-3 truncate">{movie.genre}</p>
        
        <div className="flex items-center justify-between text-xs text-light-500 mb-4 font-medium px-2 py-1.5 bg-dark-800 rounded-lg">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{movie.duration} phút</span>
          </div>
          <div className="font-semibold text-primary-500">{movie.ageRating}</div>
        </div>

        <Link to={`/booking?movie=${movie.id}`} className="block w-full text-center py-2.5 rounded-xl border border-primary-600 text-primary-500 font-bold hover:bg-primary-600 hover:text-white transition-colors duration-300">
          ĐẶT VÉ
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
