import { Outlet, Link } from "react-router-dom";
import { User, Search, Film, Home as HomeIcon } from "lucide-react";
import Header from "../components/layout/Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col text-light-50">
      <Header />

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
