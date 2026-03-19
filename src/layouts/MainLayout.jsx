import { Outlet, Link } from "react-router-dom";
import { User, Search, Film, Home as HomeIcon } from "lucide-react";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col text-light-50">
      {/* Navbar */}
      <header className="w-full bg-dark-800/90 backdrop-blur-md border-b border-dark-700 py-3 px-6 md:px-8 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <Link to="/" className="text-primary-500 font-black text-2xl md:text-3xl tracking-widest uppercase drop-shadow-[0_0_15px_rgba(229,9,20,0.5)] flex-shrink-0">
          UCC
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-light-300 hover:text-white font-medium flex items-center gap-2 transition-colors">
            <HomeIcon size={18} /> Trang Chủ
          </Link>
          <Link to="/movies" className="text-light-300 hover:text-white font-medium flex items-center gap-2 transition-colors">
            <Film size={18} /> Phim
          </Link>
          <Link to="/movies" className="text-light-300 hover:text-white font-medium flex items-center gap-2 transition-colors">
            <Search size={18} /> Khám Phá
          </Link>
        </nav>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-dark-700 py-1.5 px-3 rounded-full transition-colors duration-300 border border-transparent hover:border-dark-600">
          <div className="text-right hidden sm:block">
            <p className="text-light-500 text-xs">Xin chào,</p>
            <p className="text-light-100 font-bold text-sm leading-tight">Moshi</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-full flex items-center justify-center text-white shadow-[0_0_10px_rgba(229,9,20,0.4)]">
            <User size={20} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col pb-[70px] md:pb-0">
        <Outlet />
      </main>

      {/* Footer (Simple placeholder) */}
      <footer className="bg-dark-950 py-8 text-center text-dark-400 border-t border-dark-800 mt-auto">
        <p>&copy; {new Date().getFullYear()} Ultimate Cinema Chain. All rights reserved.</p>
      </footer>

      {/* Mobile Bottom Navigation (Optional but good for SPA) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-700 flex justify-around p-3 z-50 h-[var(--mobile-nav-height,60px)]">
        <Link to="/" className="flex flex-col items-center text-primary-500">
             <HomeIcon size={20} />
             <span className="text-[10px] mt-1 font-semibold">Home</span>
        </Link>
        <Link to="/movies" className="flex flex-col items-center text-light-400 hover:text-white">
             <Film size={20} />
             <span className="text-[10px] mt-1 font-semibold">Movies</span>
        </Link>
        <div className="flex flex-col items-center justify-center -mt-6">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center shadow-lg border-4 border-dark-900 cursor-pointer text-white">
                 <Search size={22} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
