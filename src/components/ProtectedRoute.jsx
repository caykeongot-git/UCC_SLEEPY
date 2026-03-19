import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);

  // Nếu chưa có user (chưa đăng nhập hoặc context chưa kịp cập nhật)
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