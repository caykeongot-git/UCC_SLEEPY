import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import UserProfile from './pages/profile/UserProfile';
import Membership from './pages/profile/Membership';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import BookingPage from './pages/BookingPage';

function App() {
  const fetchMe = useAuthStore(state => state.fetchMe);
  
  // Gọi hàm lấy thông tin User tự động khi tải App
  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <Router>
      <div className="min-h-screen bg-dark-900 flex flex-col">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/" element={<BookingPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;