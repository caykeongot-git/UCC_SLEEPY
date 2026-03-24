import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderHistory from './pages/history/OrderHistory';
import PaymentResult from './pages/checkout/PaymentResult';
import LoginPage from './pages/LoginPage';
// import MovieSelection from './pages/MovieSelection'; // Ngọc có thể mở comment nếu dùng đến route này

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
          : 'text-slate-500 border-transparent hover:text-white'
        }`}
      >
        Checkout
      </Link>

      <Link 
        to="/history" 
        className={`transition-all duration-300 pb-1 border-b-2 ${
          isActive('/history') 
          ? 'text-white border-[#0066FF]' 
          : 'text-slate-500 border-transparent hover:text-white'
        }`}
      >
        My Tickets
      </Link>
    </nav>
  );
};

// --- BƯỚC 2: COMPONENT APP CHÍNH ---
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050a14] text-white font-sans selection:bg-[#0066FF]/30 flex flex-col">
        
        {/* HEADER CHUẨN RẠP PHIM */}
        <header className="bg-[#0b1222]/80 backdrop-blur-md border-b border-slate-800 py-5 sticky top-0 z-50">
          <div className="container mx-auto px-6 flex justify-between items-center">
            
            {/* LOGO */}
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

            {/* USER PROFILE */}
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-3 bg-slate-900 p-1.5 pr-5 rounded-full border border-slate-800 hover:border-[#0066FF]/50 transition-colors cursor-pointer">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ngoc&backgroundColor=0066FF" 
                    alt="User" 
                    className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">Ngọc Nguyễn</span>
                    <span className="text-[8px] font-bold text-[#0066FF] uppercase tracking-widest mt-0.5">VIP Member</span>
                  </div>
               </div>
            </div>

          </div>
        </header>

        {/* CẤU HÌNH ROUTES */}
        <main className="relative flex-1">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/checkout/result" element={<PaymentResult />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/history" element={<OrderHistory />} />
            <Route path="/" element={<Navigate to="/checkout" />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className="py-10 border-t border-slate-800 flex justify-center bg-[#0b1222]">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
            © 2026 UCC_SLEEPY PROJECT • DESIGNED BY NGOC
          </p>
        </footer>

      </div>
    </Router>
  );
}

export default App;