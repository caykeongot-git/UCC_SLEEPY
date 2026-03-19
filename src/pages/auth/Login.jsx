import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

// 1. Validation Schema
const loginSchema = z.object({
  email: z.string().email('Email không đúng định dạng'),
  password: z.string().min(6, 'Mật khẩu phải từ 6 ký tự'),
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  // 2. Hàm xử lý đăng nhập
  const onSubmit = async (data) => {
    const { email, password } = data;

    // --- LOGIC TEST TRƯỚC ---
    const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser || (email === 'admin@gmail.com' && password === '123456')) {
      login('test-token'); 
      alert(`Đăng nhập hệ thống TEST thành công!`);
      navigate('/');
      return;
    }

    // --- GỌI API THẬT (Nếu không phải tài khoản test) ---
    try {
      const response = await api.post('/auth/login', data);
      if (response.data.token) {
        login(response.data.token);
        navigate('/');
      }
    } catch (error) {
      console.error("Lỗi API:", error);
      alert('Lỗi kết nối Server hoặc sai tài khoản!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Đăng Nhập</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            {...register('email')} 
            className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin@gmail.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Mật khẩu</label>
          <input 
            type="password"
            {...register('password')} 
            className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="123456"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2.5 rounded-md font-bold hover:bg-blue-700 transition">
          ĐĂNG NHẬP
        </button>

        <div className="mt-4 flex justify-between text-sm">
          <Link to="/register" className="text-blue-600 hover:underline">Tạo tài khoản</Link>
          <Link to="/forgot-password" element={<p>Quên mật khẩu?</p>} className="text-gray-500 hover:underline">Quên mật khẩu?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;