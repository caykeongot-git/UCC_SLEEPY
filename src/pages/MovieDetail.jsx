import { Play, Star, Clock, Calendar, Globe } from "lucide-react";
import TrailerIframe from "../components/movies/TrailerIframe";
import CastList from "../components/movies/CastList";
import ReviewSection from "../components/reviews/ReviewSection";
import AIRecommendations from "../components/movies/AIRecommendations";
import { Link, useParams } from "react-router-dom";

// Mock movie data for demonstration
const mockMovie = {
  id: "1",
  title: "Dune: Part Two",
  originalTitle: "Dune: Part Two",
  description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
  backdrop: "https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vtecsmEZzVNwv.jpg",
  poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8vTF9T4699.jpg",
  genre: "Hành Động, Viễn Tưởng",
  ageRating: "C16",
  duration: 166,
  releaseDate: "01/03/2024",
  country: "Mỹ",
  rating: 8.8,
  trailerId: "Way9Dexny3w", // YouTube video ID
  casts: [
    { name: "Timothée Chalamet", role: "Paul Atreides", avatar: "https://image.tmdb.org/t/p/w200/BE2sdjpgsa2rNTFa66f7upkaOP.jpg" },
    { name: "Zendaya", role: "Chani", avatar: "https://image.tmdb.org/t/p/w200/r3AEEjAew1HjB81Q6cO5O4pLzG9.jpg" },
    { name: "Rebecca Ferguson", role: "Lady Jessica Atreides", avatar: "https://image.tmdb.org/t/p/w200/agkSOQj0D0aXndD7G1w4pQvWvO3.jpg" },
    { name: "Javier Bardem", role: "Stilgar", avatar: "https://image.tmdb.org/t/p/w200/uB2n7e29T8K7R4q6fI6jJbWXXoN.jpg" },
    { name: "Austin Butler", role: "Feyd-Rautha Harkonnen", avatar: "https://image.tmdb.org/t/p/w200/qwswx0K9A7yYvA7M14W8T9e62gV.jpg" },
  ]
};

import { getDynamicMovies } from "../data/movies";
import { mockMovies as staticMovies } from "./Movies";

const MovieDetail = () => {
  const { id } = useParams();
  
  // Fetch all movies 
  const dynamicMovies = getDynamicMovies();
  const allMovies = [...dynamicMovies, ...staticMovies];
  const foundMovie = allMovies.find(m => String(m.id) === String(id));
  
  // Check if it's our rich mock movie (Dune)
  const isDune = String(id) === "1";
  
  // Create a template avoiding Dune's specifics bleeding into other movies
  const template = {
    ...mockMovie,
    originalTitle: foundMovie?.title || "Đang Cập Nhật",
    description: foundMovie?.description || "Nội dung phim đang được cập nhật...",
    casts: isDune ? mockMovie.casts : (foundMovie?.casts || []),
    trailerId: isDune ? mockMovie.trailerId : (foundMovie?.trailerId || ""),
    country: isDune ? "Mỹ" : (foundMovie?.country || "Đang cập nhật"),
    releaseDate: isDune ? "01/03/2024" : (foundMovie?.releaseDate || "Đang cập nhật"),
    director: isDune ? "Denis Villeneuve" : foundMovie?.director,
    backdrop: foundMovie?.backdrop || foundMovie?.poster || mockMovie.backdrop,
  };

  // Merge found movie properties on top of the generic template
  const movie = foundMovie ? { ...template, ...foundMovie } : mockMovie;

  return (
    <div className="w-full pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[70vh] bg-dark-900">
        <img 
          src={movie.backdrop} 
          alt={movie.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/40 to-transparent"></div>
        
        {/* Play Trailer Button (Desktop mainly) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <a href="#trailer" className="pointer-events-auto flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-primary-600/80 hover:bg-primary-500 backdrop-blur-sm rounded-full text-white transition-all transform hover:scale-110 shadow-[0_0_30px_rgba(14,165,233,0.6)]">
             <Play size={40} fill="currentColor" className="ml-2" />
           </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-24 sm:-mt-32 md:-mt-48 relative z-10 flex flex-col md:flex-row gap-6 md:gap-12">
        {/* Left Column: Poster & CTA */}
        <div className="w-[140px] sm:w-[180px] md:w-[300px] flex-shrink-0 mx-auto md:mx-0">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-dark-800 mb-4 md:mb-6 group cursor-pointer bg-dark-900">
            <img src={movie.poster} alt={movie.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 aspect-[2/3]" />
          </div>
          <Link to={`/booking?movie=${movie.id}`} className="flex items-center justify-center w-full py-3 md:py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold text-base md:text-lg transition-colors shadow-[0_0_15px_rgba(14,165,233,0.4)]">
            MUA VÉ NGAY
          </Link>
        </div>

        {/* Right Column: Info, Cast, Trailer */}
        <div className="flex-1 text-light-100 flex flex-col pt-0 md:pt-16 items-center text-center md:items-start md:text-left">
          <div className="mb-6 w-full">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase mb-1 md:mb-2 drop-shadow-md leading-tight">{movie.title}</h1>
            <p className="text-light-400 text-base md:text-xl font-medium mb-4">{movie.originalTitle}</p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4 text-xs md:text-sm text-light-300 font-medium mb-6">
              <span className="flex items-center gap-1.5 px-2 md:px-3 py-1 bg-dark-800 rounded-lg border border-dark-700">
                <Star size={16} className="text-warning" fill="currentColor" />
                <span className="text-white font-bold">{movie.rating}</span>/10
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-dark-800 rounded-lg border border-dark-700">
                 <Clock size={16} className="text-primary-500" />
                 {movie.duration} phút
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-dark-800 rounded-lg border border-dark-700">
                 <Calendar size={16} className="text-primary-500" />
                 {movie.releaseDate}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-dark-800 rounded-lg border border-dark-700">
                 <Globe size={16} className="text-primary-500" />
                 {movie.country}
              </span>
              <span className="px-3 py-1 bg-primary-600 text-white rounded-lg font-bold border border-primary-500">
                 {movie.ageRating}
              </span>
            </div>

            <div className="border-l-4 border-primary-500 pl-4 py-1 mb-6">
              <p className="text-light-100 font-medium text-lg">{movie.genre}</p>
              {movie.director && <p className="text-light-400 font-medium text-md mt-2">Đạo diễn: <span className="text-white">{movie.director}</span></p>}
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3">Nội dung bộ phim</h3>
              <p className="text-light-300 leading-relaxed text-justify md:text-left text-lg p-4 bg-dark-800/50 rounded-xl border border-dark-700">{movie.description}</p>
            </div>

            {movie.casts && movie.casts.length > 0 && (
              <CastList casts={movie.casts} />
            )}
            
            {movie.trailerId && (
              <div id="trailer" className="mt-12 w-full">
                 <h3 className="text-xl font-bold mb-4 border-l-4 border-primary-500 pl-3">Trailer</h3>
                 <TrailerIframe videoId={movie.trailerId} />
              </div>
            )}

            <div className="mt-16 w-full flex flex-col gap-12">
               <AIRecommendations movieId={movie.id} />
               <ReviewSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
