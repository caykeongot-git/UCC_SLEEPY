import React, { useState, useEffect } from 'react';
import MovieBanner from '../../components/movies/MovieBanner';
import MovieCard from '../../components/movies/MovieCard';
import movieService from '../../services/movieService';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieService.getMovies().then(data => setMovies(data));
  }, []);

  return (
    <div className="pb-20">
      <MovieBanner movies={movies} />
      <div className="container mx-auto px-4 mt-16">
        <h2 className="text-3xl font-bold mb-10 border-l-4 border-blue-600 pl-4 uppercase italic">Phim Đang Chiếu</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;