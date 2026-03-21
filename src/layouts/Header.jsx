import React from 'react';
import { Film, LogIn, UserPlus } from 'lucide-react';
import Button from '../components/ui/Button';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-primary-500 p-2 rounded-md">
            <Film className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold text-light-100">
            Cinema Chain
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-light-300">
          <a href="/" className="hover:text-primary-500 transition-colors">Trang chủ</a>
          <a href="/movies" className="hover:text-primary-500 transition-colors">Phim đang chiếu</a>
          <a href="/cinemas" className="hover:text-primary-500 transition-colors">Hệ thống rạp</a>
          <a href="/promotions" className="hover:text-primary-500 transition-colors">Ưu đãi</a>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
            <LogIn size={18} /> Đăng nhập
          </Button>
          <Button variant="primary" size="sm" className="flex items-center gap-2">
            <UserPlus size={18} /> Đăng ký
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
