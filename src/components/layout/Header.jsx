import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại để làm sáng menu đang chọn

  // Hàm kiểm tra menu nào đang active
  const isActive = (path) =>
    location.pathname === path
      ? 'text-red-500 font-bold'
      : 'text-blue-200 hover:text-white';

  return (
    // Dùng nền xanh đậm, cố định trên cùng (sticky) và làm mờ (backdrop-blur)
    <header className="bg-blue-950/90 backdrop-blur-md sticky top-0 z-50 border-b border-blue-900 shadow-lg">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo rạp phim */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-4xl font-black text-red-600 tracking-tighter">
            UCC
          </span>
          <span className="text-2xl font-bold text-white tracking-widest">
            SLEEPY
          </span>
        </Link>

        {/* Menu Điều Hướng Chính */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link
            to="/"
            className={`transition-colors uppercase tracking-wide ${isActive('/')}`}
          >
            Trang Chủ
          </Link>
          <Link
            to="/movies"
            className={`transition-colors uppercase tracking-wide ${isActive('/movies')}`}
          >
            Lịch Chiếu & Phim
          </Link>
          <a
            href="#"
            className="text-blue-200 hover:text-white transition-colors uppercase tracking-wide"
          >
            Rạp Giá Vé
          </a>
          <a
            href="#"
            className="text-blue-200 hover:text-white transition-colors uppercase tracking-wide"
          >
            Khuyến Mãi
          </a>
        </nav>

        {/* Cụm Tìm kiếm & Đăng nhập */}
        <div className="flex items-center gap-4">
          <button className="text-blue-200 hover:text-white p-2">🔍</button>
          <button className="hidden md:block bg-transparent border border-blue-700 text-blue-200 hover:border-blue-400 hover:text-white px-6 py-2 rounded-full font-semibold transition-all">
            Đăng Nhập
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
