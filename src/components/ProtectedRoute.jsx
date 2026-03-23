import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ allowedRoles }) => {
  const user = useAuthStore(state => state.user);
  const loading = useAuthStore(state => state.loading);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-900">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Nếu chưa có user (chưa đăng nhập)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có yêu cầu quyền cụ thể (ví dụ chỉ Admin) mà user không có quyền đó
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Đá về trang chủ thay vì đứng yên
  }

  return <Outlet />;
};

export default ProtectedRoute;