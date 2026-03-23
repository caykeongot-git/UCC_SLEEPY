import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Header = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  if (!user) return null; // Chỉ hiện khi đã đăng nhập

  return (
    <header className="w-full bg-dark-800/90 backdrop-blur-md border-b border-dark-700 py-3 px-6 md:px-8 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
        <Link to="/" className="text-primary-500 font-black text-2xl md:text-3xl tracking-widest uppercase drop-shadow-[0_0_15px_rgba(229,9,20,0.5)] cursor-pointer hover:text-primary-400 transition-colors">
          SLEEPY CINEMA
        </Link>
      </div>

      <nav className="flex items-center gap-6 font-semibold">
        <Link to="/profile" className="text-light-500 hover:text-light-100 transition-colors text-sm uppercase tracking-wider">Hồ Sơ</Link>
        <Link to="/membership" className="text-light-500 hover:text-light-100 transition-colors text-sm uppercase tracking-wider">Thành Viên</Link>
        
        <div className="w-px h-6 bg-dark-600 hidden md:block mx-2"></div>
        
        <div className="flex items-center gap-4 cursor-pointer hover:bg-dark-700 py-1.5 px-3 rounded-full transition-colors duration-300 border border-transparent hover:border-dark-600 group">
          <div className="text-right hidden sm:block">
            <p className="text-light-500 text-[10px] uppercase tracking-wider">Xin chào,</p>
            <p className="text-light-100 font-bold text-sm leading-tight group-hover:text-primary-400 transition-colors">{user.fullName}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-full flex items-center justify-center text-white font-bold text-lg border border-dark-900 shadow-[0_0_10px_rgba(229,9,20,0.4)]">
            {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>

        <button 
          onClick={() => { logout(); navigate('/login'); }} 
          className="ml-4 bg-dark-700 hover:bg-primary-600 text-light-100 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border border-dark-600 hover:border-primary-500 transition-all duration-300"
        >
          Đăng Xuất
        </button>
      </nav>
    </header>
  );
};

export default Header;