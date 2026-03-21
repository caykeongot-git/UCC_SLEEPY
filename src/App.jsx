import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/home/Home';
import MoviesDiscovery from './pages/movies/MoviesDiscovery';
import MovieDetails from './pages/movies/MovieDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#0b0b0b] text-white font-sans">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MoviesDiscovery />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;