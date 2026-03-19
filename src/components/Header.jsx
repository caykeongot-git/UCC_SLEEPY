import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null; // Chỉ hiện khi đã đăng nhập

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between px-10 border-b-2 border-blue-500">
      <div className="flex gap-6 font-bold">
        <Link to="/" className="text-blue-600">CINEMA WEB</Link>
        <Link to="/profile" className="text-gray-600 hover:text-blue-500">HỒ SƠ</Link>
        <Link to="/membership" className="text-gray-600 hover:text-blue-500">THÀNH VIÊN</Link>
      </div>
      <div className="flex gap-4 items-center">
        <span className="text-sm italic">Chào, {user.fullName}</span>
        <button onClick={() => { logout(); navigate('/login'); }} className="text-red-500 font-bold">ĐĂNG XUẤT</button>
      </div>
    </nav>
  );
};

export default Header;