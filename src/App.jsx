import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderHistory from './pages/history/OrderHistory';
import PaymentResult from './pages/checkout/PaymentResult';

// --- BƯỚC 1: NAVBAR ĐỒNG BỘ MÀU XANH ---
const Navbar = () => {
  const location = useLocation(); 
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="hidden md:flex gap-10 text-[11px] font-black uppercase tracking-[0.2em]">
      <Link 
        to="/checkout" 
        className={`transition-all duration-300 pb-1 border-b-2 ${
          isActive('/checkout') 
          ? 'text-white border-[#0066FF]' 
          : 'text-light-500 border-transparent hover:text-white'
        }`}
      >
        Checkout
      </Link>

      <Link 
        to="/history" 
        className={`transition-all duration-300 pb-1 border-b-2 ${
          isActive('/history') 
          ? 'text-white border-[#0066FF]' 
          : 'text-light-500 border-transparent hover:text-white'
        }`}
      >
        My Tickets
      </Link>
    </nav>
  );
};

// --- BƯỚC 2: COMPONENT APP CHÍNH (ĐÚNG MÀU DARK-900) ---
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-900 text-light-100 font-sans selection:bg-[#0066FF]/30">
        
        {/* HEADER CHUẨN RẠP PHIM */}
        <header className="bg-dark-950/80 backdrop-blur-md border-b border-dark-700 py-5 sticky top-0 z-50">
          <div className="container mx-auto px-6 flex justify-between items-center">
            
            {/* LOGO - Đã chuyển sang màu Xanh (#0066FF) */}
            <Link to="/checkout" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#0066FF] rounded-lg flex items-center justify-center shadow-lg shadow-[#0066FF]/20 transition-transform group-hover:scale-105">
                <span className="text-xl">🎬</span>
              </div>
              <h1 className="text-xl font-black tracking-tighter uppercase italic text-white leading-none">
                Ultimate <span className="text-[#0066FF]">Cinema</span>
              </h1>
            </Link>

            {/* NAVBAR */}
            <Navbar />

            {/* USER PROFILE - Cập nhật border và text màu xanh */}
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-3 bg-dark-800 p-1.5 pr-5 rounded-full border border-dark-700 hover:border-[#0066FF]/50 transition-colors cursor-pointer">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ngoc&backgroundColor=0066FF" 
                    alt="User" 
                    className="w-8 h-8 rounded-full bg-dark-700 border border-dark-600"
                  />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white uppercase tracking-tighter">Ngọc Nguyễn</span>
                    <span className="text-[8px] font-bold text-[#0066FF] uppercase leading-none">VIP Member</span>
                  </div>
               </div>
            </div>

          </div>
        </header>

        {/* CẤU HÌNH ROUTES */}
        <main className="relative">
          <Routes>
            <Route path="/checkout/result" element={<PaymentResult />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/history" element={<OrderHistory />} />
            <Route path="/" element={<Navigate to="/checkout" />} />
          </Routes>
        </main>

        {/* FOOTER ĐƠN GIẢN */}
        <footer className="py-10 border-t border-dark-800 flex justify-center mt-auto">
          <p className="text-[10px] font-bold text-light-500 uppercase tracking-[0.3em]">
            © 2026 UCC_SLEEPY PROJECT • DESIGNED BY NGOC
          </p>
        </footer>

      </div>
    </Router>
  );
}

export default App;