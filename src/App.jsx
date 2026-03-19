import { useState } from 'react';
import MovieGrid from './components/MovieGrid';
import MovieAdminTable from './components/MovieAdminTable';
import MovieFormModal from './components/MovieFormModal';
import CinemaAdminTable from './components/CinemaAdminTable';
import CinemaFormModal from './components/CinemaFormModal';
import CinemaMapModal from './components/CinemaMapModal';
import RoomAdminTable from './components/RoomAdminTable';
import RoomFormModal from './components/RoomFormModal';
import FnbAdminTable from './components/FnbAdminTable';
import FnbFormModal from './components/FnbFormModal';
import { mockMovies } from './data/movies';
import { mockCinemas } from './data/cinemas';
import { mockRooms } from './data/rooms';
import { mockFnB } from './data/fnb';
import { 
  Film, LayoutGrid, Settings, Plus, Search, 
  ChevronDown, ChevronUp, Check, ThumbsUp, Heart, Star,
  Building2, MonitorPlay, Moon, Sun, Home
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('movies'); // 'movies' | 'cinemas' | 'rooms' | 'fnb'
  
  // Movie State
  const [movies, setMovies] = useState(mockMovies);
  const [movieViewMode, setMovieViewMode] = useState('grid');
  const [isDarkMode, setIsDarkMode] = useState(true);
 // 'grid' | 'admin'
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  // Cinema State
  const [cinemas, setCinemas] = useState(mockCinemas);
  const [isCinemaModalOpen, setIsCinemaModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [editingCinema, setEditingCinema] = useState(null);
  const [mappingCinema, setMappingCinema] = useState(null);

  // Room State
  const [rooms, setRooms] = useState(mockRooms);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [roomFilterCinemaId, setRoomFilterCinemaId] = useState('all');

  // F&B State
  const [fnbs, setFnbs] = useState(mockFnB);
  const [isFnbModalOpen, setIsFnbModalOpen] = useState(false);
  const [editingFnb, setEditingFnb] = useState(null);

  // Movie Handlers
  const handleSaveMovie = (movieData) => {
    if (editingMovie) {
      setMovies(movies.map(m => m.id === editingMovie.id ? { ...m, ...movieData } : m));
    } else {
      setMovies([{ ...movieData, id: Date.now() }, ...movies]);
    }
    setIsMovieModalOpen(false);
  };
  const handleDeleteMovie = (id) => setMovies(movies.filter(m => m.id !== id));
  const openAddMovieModal = () => { setEditingMovie(null); setIsMovieModalOpen(true); };
  const openEditMovieModal = (movie) => { setEditingMovie(movie); setIsMovieModalOpen(true); };

  // Cinema Handlers
  const handleSaveCinema = (cinemaData) => {
    if (editingCinema) {
      setCinemas(cinemas.map(c => c.id === editingCinema.id ? { ...c, ...cinemaData } : c));
    } else {
      setCinemas([{ ...cinemaData, id: Date.now() }, ...cinemas]);
    }
    setIsCinemaModalOpen(false);
  };
  const handleDeleteCinema = (id) => setCinemas(cinemas.filter(c => c.id !== id));
  const openAddCinemaModal = () => { setEditingCinema(null); setIsCinemaModalOpen(true); };
  const openEditCinemaModal = (cinema) => { setEditingCinema(cinema); setIsCinemaModalOpen(true); };
  const openMapModal = (cinema) => { setMappingCinema(cinema); setIsMapModalOpen(true); };

  // Room Handlers
  const handleSaveRoom = (roomData) => {
    if (editingRoom) {
      setRooms(rooms.map(r => r.id === editingRoom.id ? { ...r, ...roomData } : r));
    } else {
      setRooms([{ ...roomData, id: Date.now() }, ...rooms]);
    }
    setIsRoomModalOpen(false);
  };
  const handleDeleteRoom = (id) => setRooms(rooms.filter(r => r.id !== id));
  const openAddRoomModal = () => { setEditingRoom(null); setIsRoomModalOpen(true); };
  const openEditRoomModal = (room) => { setEditingRoom(room); setIsRoomModalOpen(true); };

  // F&B Handlers
  const handleSaveFnb = (fnbData) => {
    if (editingFnb) {
      setFnbs(fnbs.map(f => f.id === editingFnb.id ? { ...f, ...fnbData } : f));
    } else {
      setFnbs([{ ...fnbData, id: Date.now() }, ...fnbs]);
    }
    setIsFnbModalOpen(false);
  };
  const handleDeleteFnb = (id) => setFnbs(fnbs.filter(f => f.id !== id));
  const handleUpdateFnb = (id, updates) => setFnbs(fnbs.map(f => f.id === id ? { ...f, ...updates } : f));
  const openAddFnbModal = () => { setEditingFnb(null); setIsFnbModalOpen(true); };
  const openEditFnbModal = (fnb) => { setEditingFnb(fnb); setIsFnbModalOpen(true); };

  return (
    <div 
      className={`min-h-screen pb-20 font-sans flex flex-col transition-all duration-700 ${isDarkMode ? 'text-white' : 'text-slate-900 bg-gray-50'}`}
      style={isDarkMode ? { background: 'linear-gradient(135deg, #020617 0%, #051937 30%, #004d7a 65%, #008793 100%)', backgroundAttachment: 'fixed' } : {}}
    >
      {/* Top Application Header / Navigation */}
      <header className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border-b shadow-md z-50 transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-4 w-full h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setActiveTab('movies')}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-xl italic">C</span>
            </div>
            <span className={`text-xl font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Cinema<span className="text-blue-500">Center</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <button 
              onClick={() => setActiveTab('movies')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'movies' 
                  ? (isDarkMode ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-100 text-blue-700 shadow-sm')
                  : (isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-gray-100')
              }`}
            >
              <Film size={18} />
              Quản lý Phim
            </button>
            <button 
              onClick={() => setActiveTab('cinemas')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'cinemas' 
                  ? (isDarkMode ? 'bg-cyan-700 text-white shadow-md' : 'bg-cyan-100 text-cyan-700 shadow-sm')
                  : (isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-gray-100')
              }`}
            >
              <Building2 size={18} />
              Quản lý Cụm Rạp
            </button>
            <button 
              onClick={() => setActiveTab('rooms')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'rooms' 
                  ? (isDarkMode ? 'bg-blue-700 text-white shadow-md' : 'bg-indigo-100 text-indigo-700 shadow-sm')
                  : (isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-gray-100')
              }`}
            >
              <MonitorPlay size={18} />
              Phòng Chiếu & Sơ Đồ
            </button>
            <button 
              onClick={() => setActiveTab('fnb')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'fnb' 
                  ? (isDarkMode ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-800 shadow-sm')
                  : (isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-gray-100')
              }`}
            >
              <LayoutGrid size={18} />
              Quản lý Bắp Nước
            </button>

            <div className={`w-[1px] h-6 mx-2 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'}`}></div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all ${
                isDarkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
              } shadow-inner`}
              title={isDarkMode ? 'Chuyển sang Chế độ Sáng' : 'Chuyển sang Chế độ Tối'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      {activeTab === 'movies' && (
        <>
          <div className="w-full h-[220px] relative flex flex-col justify-center items-center text-center text-white transition-all duration-700 overflow-hidden bg-slate-950 border-b border-white/10">
            {/* Clean Cinematic Backdrop */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950 to-slate-950"></div>
            
            {/* Content Container */}
            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center px-4">
              <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tighter drop-shadow-xl uppercase italic">
                Quản Lý <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Hệ Thống</span> Phim
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-1 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
                <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,1)]"></div>
                <div className="w-8 h-1 bg-gradient-to-l from-transparent to-blue-500 rounded-full"></div>
              </div>
              <p className="text-sm md:text-base font-bold text-gray-300 max-w-xl drop-shadow-md italic">
                Hệ thống quản lý dữ liệu phim, cụm rạp và suất chiếu chuyên nghiệp.
              </p>
            </div>
          </div>

          {/* View Toggle Bar (Only visible when managing movies) */}
          <div className={`transition-all duration-500 border-b sticky top-0 z-40 shadow-2xl ${
            isDarkMode ? 'bg-white/10 backdrop-blur-xl border-white/10' : 'bg-white/80 backdrop-blur-md border-gray-200 shadow-sm'
          }`}>
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
              <div className={`flex gap-2 p-1 rounded-lg border transition-colors ${
                isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'
              }`}>
                <button 
                  onClick={() => setMovieViewMode('grid')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold text-sm transition-all ${
                    movieViewMode === 'grid' 
                      ? (isDarkMode ? 'bg-white/20 text-white shadow-lg border border-white/20' : 'bg-white text-blue-600 shadow-sm border border-gray-100') 
                      : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')
                  }`}
                >
                  <LayoutGrid size={18} />
                  Giao Diện Lưới (Khách hàng)
                </button>
                <button 
                  onClick={() => setMovieViewMode('admin')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold text-sm transition-all ${
                    movieViewMode === 'admin' 
                      ? (isDarkMode ? 'bg-white/20 text-white shadow-lg border border-white/20' : 'bg-white text-blue-600 shadow-sm border border-gray-100') 
                      : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')
                  }`}
                >
                  <Settings size={18} />
                  Bảng Dữ Liệu (Quản trị)
                </button>
              </div>
              
              <div className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Hiển thị: <strong className={isDarkMode ? 'text-white text-base' : 'text-slate-900 text-base'}>{movies.length}</strong> phim
              </div>
            </div>
          </div>

          <div className="pt-6 flex-1">
            {movieViewMode === 'admin' && (
              <MovieAdminTable 
                movies={movies} 
                onEdit={openEditMovieModal} 
                onDelete={handleDeleteMovie}
                onAdd={() => openEditMovieModal(null)}
                isDarkMode={isDarkMode}
              />
            )}
            {movieViewMode === 'grid' && <MovieGrid movies={movies} isDarkMode={isDarkMode} />}
          </div>
          
          {/* Movie Modal Form */}
          {isMovieModalOpen && (
            <MovieFormModal 
              movie={editingMovie}
              onClose={() => setIsMovieModalOpen(false)}
              onSave={handleSaveMovie}
              isDarkMode={isDarkMode}
            />
          )}
        </>
      )}

      {activeTab === 'cinemas' && (
        <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className={`pb-24 pt-12 px-4 text-center transition-all ${
            isDarkMode ? 'bg-gradient-to-b from-slate-900/80 to-transparent' : 'bg-gradient-to-b from-blue-50 to-white border-b border-gray-100'
          }`}>
            <h1 className={`text-3xl font-black mb-2 underline underline-offset-8 transition-colors ${
              isDarkMode ? 'text-white decoration-cyan-500' : 'text-slate-900 decoration-cyan-600'
            }`}>
              Hệ Thống Cụm Rạp
            </h1>
            <p className={`font-medium tracking-wide transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Quản lý và cập nhật thông tin hệ thống các nhánh rạp chiếu phim.
            </p>
          </div>
          <div className="-mt-16 relative z-10 px-4">
            <CinemaAdminTable 
              cinemas={cinemas.map(c => ({
                ...c,
                roomCount: rooms.filter(r => r.cinemaId === c.id).length
              }))}
              onEdit={openEditCinemaModal}
              onDelete={handleDeleteCinema}
              onAdd={() => openEditCinemaModal(null)}
              onViewRooms={(id) => {
                setRoomFilterCinemaId(id.toString());
                setActiveTab('rooms');
              }}
              onViewMap={openMapModal}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Cinema Modal Form */}
          {isCinemaModalOpen && (
            <CinemaFormModal 
              cinema={editingCinema}
              onClose={() => setIsCinemaModalOpen(false)}
              onSave={handleSaveCinema}
              isDarkMode={isDarkMode}
            />
          )}

          {/* Cinema Map & Info Modal */}
          {isMapModalOpen && (
            <CinemaMapModal 
              cinema={mappingCinema}
              onClose={() => setIsMapModalOpen(false)}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
      )}

      {activeTab === 'rooms' && (
        <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className={`pb-24 pt-12 px-4 text-center transition-all ${
            isDarkMode ? 'bg-gradient-to-b from-slate-900/80 to-transparent' : 'bg-gradient-to-b from-indigo-50 to-white border-b border-gray-100'
          }`}>
            <h1 className={`text-3xl font-black mb-2 underline underline-offset-8 transition-colors ${
              isDarkMode ? 'text-white decoration-blue-500' : 'text-slate-900 decoration-blue-600'
            }`}>
              Quản lý Phòng Chiếu
            </h1>
            <p className={`font-medium tracking-wide transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Cấu hình thông tin phòng và tạo sơ đồ ghế ngồi chi tiết.
            </p>
          </div>
          <div className="-mt-16 relative z-10 px-4">
            <RoomAdminTable 
              rooms={rooms}
              cinemas={cinemas}
              filterCinemaId={roomFilterCinemaId}
              onFilterChange={(id) => setRoomFilterCinemaId(id)}
              onEdit={openEditRoomModal}
              onDelete={handleDeleteRoom}
              onAdd={() => openEditRoomModal(null)}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Room Modal Form */}
          {isRoomModalOpen && (
            <RoomFormModal 
              room={editingRoom}
              cinemas={cinemas}
              filterCinemaId={roomFilterCinemaId}
              onClose={() => setIsRoomModalOpen(false)}
              onSave={handleSaveRoom}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
      )}

      {activeTab === 'fnb' && (
        <div 
          className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 relative min-h-screen"
        >
          <div className="relative z-10 px-4 py-4 md:py-8">
            <FnbAdminTable 
              fnbs={fnbs} 
              onEdit={openEditFnbModal} 
              onDelete={handleDeleteFnb}
              onUpdate={handleUpdateFnb}
              onAdd={() => openEditFnbModal(null)}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* F&B Modal Form */}
          {isFnbModalOpen && (
            <FnbFormModal 
              fnb={editingFnb}
              onClose={() => setIsFnbModalOpen(false)}
              onSave={handleSaveFnb}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
      )}

    </div>
  );
}

export default App;