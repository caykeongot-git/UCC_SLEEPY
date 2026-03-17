import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderHistory from './pages/history/OrderHistory';
import PaymentResult from './pages/checkout/PaymentResult';

// --- HỢP PHẦN BẢO VỆ ROUTE ---
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); 
  // Nếu chưa đăng nhập, đá về trang login (giả sử bạn có route /login)
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 pb-10">
        
        {/* HEADER & NAVIGATION */}
        <header className="bg-white shadow-sm py-8 mb-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-black text-blue-600 tracking-tighter uppercase">
              Cinema System
            </h1>
            <p className="text-gray-400 mt-1 font-medium italic">Hệ thống đặt vé chuẩn quốc tế</p>

            <nav className="flex justify-center gap-3 mt-8">
              <Link to="/checkout" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95">
                ĐẶT VÉ NGAY
              </Link>
              <Link to="/history" className="px-6 py-2.5 bg-white text-gray-700 border-2 border-gray-100 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95">
                LỊCH SỬ VÉ
              </Link>
              <Link to="/" className="px-6 py-2.5 bg-gray-100 text-gray-500 rounded-xl font-bold hover:bg-gray-200 transition-all">
                TRANG CHỦ
              </Link>
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="container mx-auto px-4">
          <Routes>
            {/* Route công khai */}
            <Route path="/checkout/result" element={<PaymentResult />} />
            
            {/* Route bảo vệ - Phải login mới vào được */}
            <Route path="/checkout" element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            } />
            
            <Route path="/history" element={
              <PrivateRoute>
                <OrderHistory />
              </PrivateRoute>
            } />

            {/* Điều hướng mặc định */}
            <Route path="/" element={<Navigate to="/checkout" />} />
            
            {/* Route Login giả định (Bạn hãy tạo file Login sau nhé) */}
            <Route path="/login" element={<div className="text-center mt-20 font-bold">Vui lòng đăng nhập để tiếp tục...</div>} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;