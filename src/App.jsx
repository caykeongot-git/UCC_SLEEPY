import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import UserProfile from './pages/profile/UserProfile';
import Membership from './pages/profile/Membership';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header'; // 1. Đảm bảo đã import Header

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* 2. Đặt Header ở đây để nó luôn hiển thị sau khi đăng nhập */}
        <Header /> 
        
        <main className="container mx-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/" element={
                <div className="p-10 text-center">
                   <h1 className="text-3xl font-bold text-blue-600">Cinema Web Dashboard</h1>
                   <p className="mt-4">Đăng nhập thành công! Hãy chọn Menu ở trên.</p>
                </div>
              } />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;