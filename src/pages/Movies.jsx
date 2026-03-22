import { useState } from "react";
import MovieCard from "../components/movies/MovieCard";
import MovieFilter from "../components/movies/MovieFilter";

import { getDynamicMovies } from "../data/movies";

// Using the same mock data for simulation
export const mockMovies = [
  { id: 1, title: "Dune: Part Two", genre: "Hành Động", ageRating: "C16", duration: 166, rating: 8.8, is3D: false, poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8vTF9T4699.jpg" },
  { id: 2, title: "Mai", genre: "Tình Cảm", ageRating: "C18", duration: 131, rating: 7.5, is3D: false, poster: "https://d1j8r0kxyu9tj8.cloudfront.net/images/1709605704E2Lg66aO2QzS4u1.jpg" },
  { id: 3, title: "Kung Fu Panda 4", genre: "Hoạt Hình", ageRating: "P", duration: 94, rating: 7.2, is3D: true, poster: "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjwvTEuhvW2f.jpg" },
  { id: 4, title: "Godzilla x Kong", genre: "Hành Động", ageRating: "C13", duration: 115, rating: 7.0, is3D: true, poster: "https://image.tmdb.org/t/p/w500/bQ2ywkchIiaKLSEaMrcT6e29f91.jpg" },
  { id: 5, title: "Exhuma", genre: "Kinh Dị", ageRating: "C16", duration: 134, rating: 8.1, is3D: false, poster: "https://image.tmdb.org/t/p/w500/pQYHouPsMw3mjd84bQe5GfXJtX3.jpg" },
  { id: 6, title: "Ghostbusters", genre: "Hài Hước", ageRating: "C13", duration: 115, rating: 6.8, is3D: false, poster: "https://image.tmdb.org/t/p/w500/stmYfCUGd8Iy6ISFAWGv1zL1Gls.jpg" },
  { id: 7, title: "Furiosa", genre: "Hành Động", ageRating: "C18", duration: 148, rating: "N/A", is3D: false, poster: "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg" },
  { id: 8, title: "Inside Out 2", genre: "Hoạt Hình", ageRating: "P", duration: 100, rating: "N/A", is3D: true, poster: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg" },
];

const Movies = () => {
  const allMovies = getDynamicMovies();

  const [filteredMovies, setFilteredMovies] = useState(allMovies);

  const handleFilterChange = (filters) => {
    let result = allMovies;

    if (filters.keyword) {
      result = result.filter(m => m.title.toLowerCase().includes(filters.keyword.toLowerCase()));
    }
    if (filters.genre !== "Tất cả") {
      result = result.filter(m => m.genre === filters.genre);
    }
    if (filters.rating !== "Tất cả") {
      result = result.filter(m => m.ageRating === filters.rating);
    }
    if (filters.format !== "Tất cả") {
      if (filters.format === "3D") result = result.filter(m => m.is3D);
      if (filters.format === "2D") result = result.filter(m => !m.is3D);
    }

    setFilteredMovies(result);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-light-100 uppercase mb-3">Khám Phá Phim</h1>
        <p className="text-light-400 text-lg">Tìm kiếm danh sách phim theo sở thích của bạn</p>
      </div>

      <MovieFilter onFilterChange={handleFilterChange} />

      {filteredMovies.length === 0 ? (
        <div className="text-center py-20 bg-dark-800 rounded-2xl border border-dark-700">
          <p className="text-light-300 text-lg font-medium">Không tìm thấy phim nào phù hợp với bộ lọc của bạn.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
