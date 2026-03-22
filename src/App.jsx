import React, { useState, useEffect } from 'react';
import MovieAdminIndex from './pages/admin/movies/index.jsx';
import MovieAdminCreate from './pages/admin/movies/create.jsx';
import MovieAdminEdit from './pages/admin/movies/edit.jsx';
import CinemaAdminIndex from './pages/admin/movies/cinemas/index.jsx';
import CinemaAdminCreate from './pages/admin/movies/cinemas/create.jsx';
import CinemaAdminEdit from './pages/admin/movies/cinemas/edit.jsx';
import RoomAdminIndex from './pages/admin/movies/rooms/index.jsx';
import RoomAdminCreate from './pages/admin/movies/rooms/create.jsx';
import RoomAdminEdit from './pages/admin/movies/rooms/edit.jsx';
import FandBAdminIndex from './pages/admin/fandb/index.jsx';
import FandBAdminCreate from './pages/admin/fandb/create.jsx';
import FandBAdminEdit from './pages/admin/fandb/edit.jsx';

const MOCK_MOVIES = [
  { 
    id: 1, 
    title: 'Spider-Man: No Way Home', 
    poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1R80vEMJi1w6fA.jpg', 
    description: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero.', 
    age: 'T13', 
    duration: 148 
  },
  { 
    id: 2, 
    title: 'The Batman', 
    poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg', 
    description: 'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.', 
    age: 'T16', 
    duration: 176 
  },
  { 
    id: 3, 
    title: 'Doctor Strange 2', 
    poster: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg', 
    description: 'Doctor Strange traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.', 
    age: 'T13', 
    duration: 126 
  },
];

const MOCK_CINEMAS = [
  { 
    id: 1, 
    name: 'Luminary District 1', 
    location: '65 Lê Lợi, Phường Bến Nghé, Quận 1, TP. HCM', 
    type: 'Premium Gold', 
    status: 'active',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=200'
  },
  { 
    id: 2, 
    name: 'Luminary IMAX Landmark', 
    location: 'Landmark 81, Quận Bình Thạnh, TP. HCM', 
    type: 'IMAX Experience', 
    status: 'active',
    image: 'https://images.unsplash.com/photo-1517604401157-538a9663ecf4?auto=format&fit=crop&q=80&w=200'
  },
  { 
    id: 3, 
    name: 'Luminary Riverside', 
    location: 'Khu đô thị Sala, Quận 2, TP. HCM', 
    type: 'Standard', 
    status: 'maintenance',
    image: 'https://images.unsplash.com/photo-1542204172-3c32ff4bc039?auto=format&fit=crop&q=80&w=200'
  },
  { 
    id: 4, 
    name: 'Luminary West Lake', 
    location: 'Lotte Mall West Lake, Tây Hồ, Hà Nội', 
    type: 'Premium Gold', 
    status: 'active',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=200'
  },
];

const MOCK_ROOMS = [
  { id: 1, name: 'Phòng Chiếu 1', cinemaId: 1, cinemaName: 'Ultimate Cinema - Quận 1', rows: 8, cols: 10, seatCount: 80 },
  { id: 2, name: 'Phòng Chiếu Imax', cinemaId: 2, cinemaName: 'Ultimate Cinema - Quận 7', rows: 12, cols: 15, seatCount: 180 },
];

const MOCK_FANDB = [
  { id: 1, name: 'Combo Single', description: '1 bắp lớn + 1 nước ngọt (L)', price: 85000, type: 'combo', image: 'https://images.unsplash.com/photo-1572177641504-4765170ecc6d?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: 2, name: 'Combo Double', description: '1 bắp lớn + 2 nước ngọt (L)', price: 105000, type: 'combo', image: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: 3, name: 'Combo Family', description: '2 bắp lớn + 3 nước ngọt (L)', price: 185000, type: 'combo', image: 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: 4, name: 'Bắp Rang Bơ (L)', description: 'Bắp rang bơ truyền thống size lớn', price: 55000, type: 'popcorn', image: 'https://images.unsplash.com/photo-1578849278619-e734c5ce7c81?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: 5, name: 'Coca Cola (L)', description: 'Nước ngọt Coca Cola size L', price: 35000, type: 'drink', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: 6, name: 'Snack Khoai Tây', description: 'Snack khoai tây chiên giòn', price: 40000, type: 'snack', image: 'https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?auto=format&fit=crop&q=80&w=100&h=100' },
];

function App() {
  const [activeModule, setActiveModule] = useState('movies'); 
  const [view, setView] = useState('list'); 
  const [globalSearch, setGlobalSearch] = useState('');
  
  // Always enforce Dark Mode
  useEffect(() => {
    try {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } catch (err) {
      console.error('[Theme] Error enforcing dark theme:', err);
    }
  }, []);

  // Movie States
  const [movies, setMovies] = useState(MOCK_MOVIES);
  const [editingMovie, setEditingMovie] = useState(null);

  // Cinema States
  const [cinemas, setCinemas] = useState(MOCK_CINEMAS);
  const [editingCinema, setEditingCinema] = useState(null);

  // Room States
  const [rooms, setRooms] = useState(MOCK_ROOMS);
  const [editingRoom, setEditingRoom] = useState(null);
  const [cinemaRoomFilter, setCinemaRoomFilter] = useState(null);

  // F&B States
  const [fandbItems, setFandbItems] = useState(MOCK_FANDB);
  const [editingFandb, setEditingFandb] = useState(null);

  // Movie Handlers
  const handleAddMovie = (newMovie) => {
    setMovies([{ ...newMovie, id: Date.now() }, ...movies]);
    setView('list');
  };
  const handleUpdateMovie = (updatedMovie) => {
    setMovies(movies.map(m => m.id === updatedMovie.id ? updatedMovie : m));
    setView('list');
    setEditingMovie(null);
  };
  const handleDeleteMovie = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phim này không?')) {
      setMovies(movies.filter(m => m.id !== id));
    }
  };

  // Cinema Handlers
  const handleAddCinema = (newCinema) => {
    setCinemas([{ ...newCinema, id: Date.now() }, ...cinemas]);
    setView('list');
  };
  const handleUpdateCinema = (updatedCinema) => {
    setCinemas(cinemas.map(c => c.id === updatedCinema.id ? updatedCinema : c));
    setView('list');
    setEditingCinema(null);
  };
  const handleDeleteCinema = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cụm rạp này không?')) {
      setCinemas(cinemas.filter(c => c.id !== id));
    }
  };

  // Room Handlers
  const handleAddRoom = (newRoom) => {
    setRooms([{ ...newRoom, id: Date.now() }, ...rooms]);
    setView('list');
  };
  const handleUpdateRoom = (updatedRoom) => {
    setRooms(rooms.map(r => r.id === updatedRoom.id ? updatedRoom : r));
    setView('list');
    setEditingRoom(null);
  };
  const handleDeleteRoom = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phòng này không?')) {
      setRooms(rooms.filter(r => r.id !== id));
    }
  };

  // F&B Handlers
  const handleAddFandb = (newFandb) => {
    setFandbItems([{ ...newFandb, id: Date.now() }, ...fandbItems]);
    setView('list');
  };
  const handleUpdateFandb = (updatedFandb) => {
    setFandbItems(fandbItems.map(f => f.id === updatedFandb.id ? updatedFandb : f));
    setView('list');
    setEditingFandb(null);
  };
  const handleDeleteFandb = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa combo này không?')) {
      setFandbItems(fandbItems.filter(f => f.id !== id));
    }
  };

  const startEditMovie = (movie) => {
    setEditingMovie(movie);
    setView('edit');
  };

  const startEditCinema = (cinema) => {
    setEditingCinema(cinema);
    setView('edit');
  };

  const startEditRoom = (room) => {
    setEditingRoom(room);
    setView('edit');
  };

  const startEditFandb = (item) => {
    setEditingFandb(item);
    setView('edit');
  };

  const handleViewCinemaRooms = (cinemaId) => {
    setCinemaRoomFilter(cinemaId);
    setActiveModule('rooms');
    setView('list');
  };

  const navItems = [
    { id: 'movies', label: 'Movies', icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z' },
    { id: 'cinemas', label: 'Complexes', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'rooms', label: 'Rooms', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'fandb', label: 'F&B', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
  ];

  return (
    <div className="min-h-screen dark bg-slate-900 flex font-sans text-slate-200 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] border-r border-slate-800 flex flex-col sticky top-0 h-screen z-50">
        <div className="p-8">
          <div className="mb-12 px-2">
            <button
              onClick={() => {
                setActiveModule('movies');
                setView('list');
                setCinemaRoomFilter(null);
                setGlobalSearch('');
              }}
              className="text-left group focus:outline-none flex flex-col items-start"
            >
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none text-neon-radiate mb-1 group-hover:scale-105 transition-transform duration-300">
                LUMINARY
              </h1>
              <span className="text-3xl font-black text-cyan-400 tracking-tighter uppercase leading-none text-neon-radiate group-hover:scale-105 transition-transform duration-300">
                CINEMA
              </span>
            </button>
          </div>

          <nav className="space-y-2 relative">
            {/* Sliding Indicator */}
            <div 
              className="absolute left-[-2rem] w-1 bg-cyan-400 rounded-r-md transition-all duration-300 ease-out z-10 shadow-[0_0_12px_#22d3ee]"
              style={{
                height: '48px',
                top: `${navItems.findIndex(i => i.id === activeModule) * 56}px`
              }}
            />

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveModule(item.id);
                  setView('list');
                  setCinemaRoomFilter(null);
                  setGlobalSearch('');
                }}
                className={`w-full flex items-center gap-4 px-4 h-12 font-bold rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  activeModule === item.id 
                    ? 'bg-cyan-500/10 text-cyan-400' 
                    : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/5'
                }`}
              >
                {/* Subtle Hover Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <svg 
                  className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${
                    activeModule === item.id 
                      ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' 
                      : 'text-slate-400 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                <span className="font-bold text-sm tracking-wide z-10">{item.label}</span>
                {activeModule === item.id && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse"></div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom part of sidebar removed as requested */}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 dark:bg-cyan-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none transition-colors duration-300"></div>

        {/* TopBar */}
        <header className="h-20 px-10 flex items-center justify-between sticky top-0 bg-slate-900 border-b border-transparent z-40 relative">
          
          {/* Centered Search Bar */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[400px]">
            <div className="relative group w-full">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
              <input 
                type="text" 
                placeholder="Tìm kiếm tên phim..."
                className="w-full bg-[#111827] border border-transparent rounded-2xl pl-12 pr-4 py-2.5 text-xs text-white focus:border-slate-700 outline-none placeholder:text-slate-500"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Right Section: Status & Icons */}
          <div className="flex items-center gap-4 flex-none ml-auto">
            <button className="p-2 text-slate-400 hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg></button>
            <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden ml-2 ring-2 ring-transparent hover:ring-cyan-500 cursor-pointer">
              <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" alt="User" />
            </div>
          </div>
        </header>

        {/* Content Section */}
        <main className="flex-1 overflow-y-auto p-10 relative">
        {activeModule === 'movies' && (
          <>
            {view === 'list' && <MovieAdminIndex movies={movies} onAdd={() => setView('create')} onEdit={startEditMovie} onDelete={handleDeleteMovie} searchQuery={globalSearch} />}
            {view === 'create' && <MovieAdminCreate onBack={() => setView('list')} onSave={handleAddMovie} />}
            {view === 'edit' && <MovieAdminEdit movie={editingMovie} onBack={() => setView('list')} onSave={handleUpdateMovie} />}
          </>
        )}
        {activeModule === 'cinemas' && (
          <>
            {view === 'list' && <CinemaAdminIndex cinemas={cinemas} rooms={rooms} onAdd={() => setView('create')} onEdit={startEditCinema} onDelete={handleDeleteCinema} onViewRooms={handleViewCinemaRooms} searchQuery={globalSearch} />}
            {view === 'create' && <CinemaAdminCreate onBack={() => setView('list')} onSave={handleAddCinema} />}
            {view === 'edit' && <CinemaAdminEdit cinema={editingCinema} onBack={() => setView('list')} onSave={handleUpdateCinema} />}
          </>
        )}
        {activeModule === 'rooms' && (
          <>
            {view === 'list' && (
              <RoomAdminIndex 
                rooms={cinemaRoomFilter ? rooms.filter(r => Number(r.cinemaId) === cinemaRoomFilter) : rooms} 
                onAdd={() => setView('create')} 
                onEdit={startEditRoom} 
                onDelete={handleDeleteRoom} 
                filterCinemaId={cinemaRoomFilter}
                onClearFilter={() => setCinemaRoomFilter(null)}
                searchQuery={globalSearch}
              />
            )}
            {view === 'create' && <RoomAdminCreate cinemas={cinemas} onBack={() => setView('list')} onSave={handleAddRoom} />}
            {view === 'edit' && <RoomAdminEdit cinemas={cinemas} room={editingRoom} onBack={() => setView('list')} onSave={handleUpdateRoom} />}
          </>
        )}
        {activeModule === 'fandb' && (
          <>
            {view === 'list' && <FandBAdminIndex items={fandbItems} onAdd={() => setView('create')} onEdit={startEditFandb} onDelete={handleDeleteFandb} searchQuery={globalSearch} />}
            {view === 'create' && <FandBAdminCreate onBack={() => setView('list')} onSave={handleAddFandb} />}
            {view === 'edit' && <FandBAdminEdit item={editingFandb} onBack={() => setView('list')} onSave={handleUpdateFandb} />}
          </>
        )}
        </main>
      </div>
    </div>
  )
}

export default App;