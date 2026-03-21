import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-blue-500 transition-all duration-700 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-800">
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
        />
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center p-6 text-center">
          <Link to={`/movie/${movie.id}`} className="bg-blue-600 text-white font-black py-3 px-8 rounded-full shadow-neon-blue uppercase italic tracking-tighter">
            XEM CHI TIẾT
          </Link>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-white font-black truncate text-base uppercase italic mb-1">{movie.title}</h3>
        <p className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.2em]">{movie.format}</p>
      </div>
    </div>
  );
};

export default MovieCard;