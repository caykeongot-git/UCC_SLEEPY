import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Film } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-800 text-light-300 py-12 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-light-100">
            <Film size={28} className="text-primary-500" />
            <span className="text-2xl font-bold">Cinema Chain</span>
          </div>
          <p className="text-sm leading-relaxed text-light-500">
            Hệ thống quản lý rạp chiếu phim hiện đại nhất, tích hợp công nghệ IoT để mang lại trải nghiệm tuyệt vời nhất cho khách hàng.
          </p>
          <div className="flex space-x-4">
            <Facebook className="hover:text-light-100 cursor-pointer transition-colors" size={20} />
            <Instagram className="hover:text-light-100 cursor-pointer transition-colors" size={20} />
            <Twitter className="hover:text-light-100 cursor-pointer transition-colors" size={20} />
            <Youtube className="hover:text-light-100 cursor-pointer transition-colors" size={20} />
          </div>
        </div>

        <div>
          <h4 className="text-light-100 font-bold mb-6 uppercase tracking-wider text-xs">Liên kết nhanh</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-light-100 transition-colors">Giới thiệu</a></li>
            <li><a href="#" className="hover:text-light-100 transition-colors">Tuyển dụng</a></li>
            <li><a href="#" className="hover:text-light-100 transition-colors">Liên hệ</a></li>
            <li><a href="#" className="hover:text-light-100 transition-colors">Chính sách bảo mật</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-light-100 font-bold mb-6 uppercase tracking-wider text-xs">Dịch vụ</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-light-100 transition-colors">Đặt vé trực tuyến</a></li>
            <li><a href="#" className="hover:text-light-100 transition-colors">Rạp chiếu phim kỹ thuật số</a></li>
            <li><a href="#" className="hover:text-light-100 transition-colors">Bắp nước & Combo</a></li>
            <li><a href="#" className="hover:text-light-100 transition-colors">Thành viên ưu tiên</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-light-100 font-bold mb-6 uppercase tracking-wider text-xs">Địa chỉ</h4>
          <p className="text-sm text-light-500">
            Khu phố 6, P. Linh Trung, Tp. Thủ Đức, TP. Hồ Chí Minh.<br /><br />
            Email: contact@cinemachain.vn<br />
            Hotline: 1900 1234
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-dark-700 text-center text-[10px] text-light-500 font-bold uppercase tracking-widest">
        © 2024 Cinema Chain Management System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
