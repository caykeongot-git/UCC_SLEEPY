import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-950 border-t border-blue-900 pt-16 pb-8 text-blue-200">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 className="text-white font-bold text-xl mb-6">
            UCC SLEEPY CINEMA
          </h3>
          <p className="text-sm leading-relaxed mb-4">
            Hệ thống rạp chiếu phim hiện đại, mang đến trải nghiệm điện ảnh đẳng
            cấp với công nghệ IMAX, 4DX hàng đầu.
          </p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-6">Chính Sách</h3>
          <ul className="space-y-3 text-sm flex flex-col">
            <a href="#" className="hover:text-white transition-colors">
              Điều khoản sử dụng
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Câu hỏi thường gặp
            </a>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-6">Dịch Vụ</h3>
          <ul className="space-y-3 text-sm flex flex-col">
            <a href="#" className="hover:text-white transition-colors">
              Khách hàng VIP
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Liên hệ quảng cáo
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Tuyển dụng
            </a>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-6">Chăm Sóc Khách Hàng</h3>
          <p className="text-xl text-red-500 font-bold mb-2">1900 1234</p>
          <p className="text-sm mb-4">Email: support@uccsleepy.vn</p>
        </div>
      </div>
      <div className="text-center border-t border-blue-900 pt-8 text-sm text-blue-500">
        &copy; 2026 UCC Sleepy Cinema. Bản quyền thuộc về Team Sleepy.
      </div>
    </footer>
  );
};

export default Footer;
