import HeroBanner from "../components/movies/HeroBanner";
import MovieSection from "../components/movies/MovieSection";

const mockNowShowing = [
  { id: 1, title: "Dune: Part Two", genre: "Action/Sci-Fi", ageRating: "C16", duration: 166, rating: 8.8, is3D: false, poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8vTF9T4699.jpg" },
  { id: 2, title: "Mai", genre: "Drama/Romance", ageRating: "C18", duration: 131, rating: 7.5, is3D: false, poster: "https://d1j8r0kxyu9tj8.cloudfront.net/images/1709605704E2Lg66aO2QzS4u1.jpg" },
  { id: 3, title: "Kung Fu Panda 4", genre: "Animation/Comedy", ageRating: "P", duration: 94, rating: 7.2, is3D: true, poster: "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjwvTEuhvW2f.jpg" },
  { id: 4, title: "Godzilla x Kong", genre: "Action/Sci-Fi", ageRating: "C13", duration: 115, rating: 7.0, is3D: true, poster: "https://image.tmdb.org/t/p/w500/bQ2ywkchIiaKLSEaMrcT6e29f91.jpg" },
  { id: 5, title: "Exhuma", genre: "Horror/Thriller", ageRating: "C16", duration: 134, rating: 8.1, is3D: false, poster: "https://image.tmdb.org/t/p/w500/pQYHouPsMw3mjd84bQe5GfXJtX3.jpg" },
  { id: 6, title: "Ghostbusters", genre: "Comedy/Fantasy", ageRating: "C13", duration: 115, rating: 6.8, is3D: false, poster: "https://image.tmdb.org/t/p/w500/stmYfCUGd8Iy6ISFAWGv1zL1Gls.jpg" },
];

const mockComingSoon = [
  { id: 7, title: "Furiosa", genre: "Action/Sci-Fi", ageRating: "C18", duration: 148, rating: "N/A", is3D: false, poster: "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg" },
  { id: 8, title: "Inside Out 2", genre: "Animation/Family", ageRating: "P", duration: 100, rating: "N/A", is3D: true, poster: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg" },
  { id: 9, title: "Deadpool & Wolverine", genre: "Action/Comedy", ageRating: "C18", duration: 120, rating: "N/A", is3D: true, poster: "https://image.tmdb.org/t/p/w500/fTq43u3EhhzEDD0l6O9y3Otz1rX.jpg" },
  { id: 10, title: "A Quiet Place: Day One", genre: "Horror/Sci-Fi", ageRating: "C16", duration: 110, rating: "N/A", is3D: false, poster: "https://image.tmdb.org/t/p/w500/yrpPYKijwdMvUBWe45asCdL9nIf.jpg" },
];

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-6 md:gap-12">
      <HeroBanner />
      
      <MovieSection 
        title="Phim Đang Chiếu" 
        movies={mockNowShowing} 
        linkAll="/movies?status=now-showing" 
      />
      
      <MovieSection 
        title="Phim Sắp Chiếu" 
        movies={mockComingSoon} 
        linkAll="/movies?status=coming-soon" 
      />
    </div>
  );
};

export default Home;
