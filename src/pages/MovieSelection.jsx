import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import api from '../services/api';
import useBookingStore from '../context/bookingStore';
import useAuthStore from '../context/authStore';

const MovieSelection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { setShowtime, selectSeats } = useBookingStore();

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeatsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchMovies();
  }, [isAuthenticated, navigate]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/movies');
      setMovies(response.data);
    } catch {
      // Fix lỗi ESLint unused 'err' (Vị trí 1)
      setError('Failed to load movies');
    } finally {
      setLoading(false);
    }
  };

  const fetchShowtimes = async (movieId) => {
    try {
      const response = await api.get(`/api/showtimes?movieId=${movieId}`);
      setShowtimes(response.data);
    } catch {
      // Fix lỗi ESLint unused 'err' (Vị trí 2)
      setError('Failed to load showtimes');
    }
  };

  const fetchSeats = async (showtimeId) => {
    try {
      const response = await api.get(`/api/showtimes/${showtimeId}/seats`);
      setSeats(response.data);
    } catch {
      // Fix lỗi ESLint unused 'err' (Vị trí 3)
      setError('Failed to load seats');
    }
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setSelectedShowtime(null);
    setSeats([]);
    setSelectedSeatsState([]);
    fetchShowtimes(movie.id);
  };

  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
    setSelectedSeatsState([]);
    fetchSeats(showtime.id);
  };

  const handleSeatSelect = (seat) => {
    if (seat.status !== 'AVAILABLE') return;

    setSelectedSeatsState(prev => {
      if (prev.includes(seat.id)) {
        return prev.filter(id => id !== seat.id);
      } else {
        return [...prev, seat.id];
      }
    });
  };

  const handleProceedToCheckout = () => {
    if (selectedShowtime && selectedSeats.length > 0) {
      setShowtime(selectedShowtime.id);
      selectSeats(selectedSeats);
      navigate('/checkout');
    }
  };

  if (loading) return <div className="min-h-screen bg-[#050a14] flex items-center justify-center text-[#0066FF] font-black uppercase italic">Quantum Loading...</div>;
  
  if (error) return (
    <div className="min-h-screen bg-[#050a14] flex flex-col items-center justify-center text-red-500 gap-4">
      <p className="font-bold uppercase tracking-widest">{error}</p>
      <button onClick={fetchMovies} className="bg-[#0066FF] text-white px-6 py-2 rounded-xl font-black text-xs">RETRY</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050a14] text-white p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-center mb-8 uppercase italic italic tracking-tighter">Select Your <span className="text-[#0066FF]">Movie</span></h1>

        {!selectedMovie ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map(movie => (
              <Motion.div
                key={movie.id}
                whileHover={{ scale: 1.05 }}
                className="bg-[#0b1222] rounded-xl p-4 cursor-pointer border border-slate-800 hover:border-[#0066FF]/50 transition-colors"
                onClick={() => handleMovieSelect(movie)}
              >
                <img src={movie.posterUrl} alt={movie.title} className="w-full h-80 object-cover rounded-lg mb-4 shadow-2xl" />
                <h3 className="text-xl font-black uppercase italic">{movie.title}</h3>
                <p className="text-xs text-slate-500 uppercase mt-1 font-bold tracking-widest">{movie.genre}</p>
              </Motion.div>
            ))}
          </div>
        ) : !selectedShowtime ? (
          <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button onClick={() => setSelectedMovie(null)} className="mb-6 bg-slate-800 hover:bg-slate-700 text-[10px] font-black uppercase px-4 py-2 rounded-lg transition-all tracking-widest">← Back to Movies</button>
            <h2 className="text-2xl font-black uppercase italic mb-6 border-l-4 border-[#0066FF] pl-4">{selectedMovie.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {showtimes.map(showtime => (
                <Motion.div
                  key={showtime.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#0b1222] rounded-xl p-6 cursor-pointer border border-slate-800 hover:border-[#0066FF] transition-all"
                  onClick={() => handleShowtimeSelect(showtime)}
                >
                  <p className="text-lg font-black text-[#0066FF] uppercase italic">{showtime.cinemaName}</p>
                  <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-widest">{showtime.date} • {showtime.time}</p>
                  <div className="mt-4 inline-block bg-[#0066FF]/10 text-[#0066FF] text-[10px] font-black px-3 py-1 rounded border border-[#0066FF]/20 uppercase">
                    {showtime.format}
                  </div>
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        ) : (
          <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button onClick={() => setSelectedShowtime(null)} className="mb-6 bg-slate-800 hover:bg-slate-700 text-[10px] font-black uppercase px-4 py-2 rounded-lg transition-all tracking-widest">← Back to Showtimes</button>
            <h2 className="text-2xl font-black uppercase italic mb-6 border-l-4 border-[#0066FF] pl-4">Select <span className="text-[#0066FF]">Seats</span></h2>
            
            <div className="bg-[#0b1222] p-8 rounded-3xl border border-slate-800 mb-8 shadow-2xl">
              {/* Screen Visual */}
              <div className="w-full h-1 bg-[#0066FF] mb-12 shadow-[0_0_15px_#0066FF] relative">
                <p className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">Screen</p>
              </div>

              <div className="grid grid-cols-10 gap-3 justify-items-center max-w-2xl mx-auto">
                {seats.map(seat => (
                  <Motion.div
                    key={seat.id}
                    whileHover={seat.status === 'AVAILABLE' ? { scale: 1.2 } : {}}
                    className={`w-10 h-10 rounded-lg cursor-pointer flex items-center justify-center text-[10px] font-black transition-all ${
                      seat.status === 'AVAILABLE'
                        ? selectedSeats.includes(seat.id)
                          ? 'bg-[#0066FF] shadow-[0_0_10px_#0066FF]'
                          : 'bg-slate-700 hover:bg-slate-600 border border-slate-600'
                        : seat.status === 'BOOKED'
                        ? 'bg-red-900/40 text-red-500 border border-red-900/50 cursor-not-allowed opacity-50'
                        : 'bg-yellow-600/40 text-yellow-500 border border-yellow-600/50 cursor-not-allowed animate-pulse'
                    }`}
                    onClick={() => handleSeatSelect(seat)}
                  >
                    {seat.row}{seat.number}
                  </Motion.div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 mt-12 pt-8 border-t border-slate-800/50">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500"><div className="w-3 h-3 bg-slate-700 rounded shadow" /> Available</div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500"><div className="w-3 h-3 bg-[#0066FF] rounded shadow-[0_0_5px_#0066FF]" /> Selected</div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500"><div className="w-3 h-3 bg-red-900/40 border border-red-900/50 rounded shadow" /> Booked</div>
              </div>
            </div>

            <AnimatePresence>
              {selectedSeats.length > 0 && (
                <Motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="fixed bottom-10 left-0 right-0 px-4 flex justify-center z-50">
                  <Motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleProceedToCheckout}
                    className="bg-[#0066FF] px-12 py-5 rounded-2xl font-black text-sm uppercase italic shadow-[0_10px_30px_rgba(0,102,255,0.4)] tracking-widest"
                  >
                    Proceed to Checkout ({selectedSeats.length} seats) 💳
                  </Motion.button>
                </Motion.div>
              )}
            </AnimatePresence>
          </Motion.div>
        )}
      </div>
    </div>
  );
};

export default MovieSelection;