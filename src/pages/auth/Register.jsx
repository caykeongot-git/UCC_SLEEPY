import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';

// Định nghĩa luật kiểm tra dữ liệu bằng Zod theo yêu cầu của Leader
const registerSchema = z.object({
  fullName: z.string().min(2, 'Họ tên phải từ 2 ký tự trở lên'),
  email: z.string().email('Email không đúng định dạng'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    // LOGIC TEST: Lưu tài khoản vào localStorage để giả lập Backend
    const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
    
    // Kiểm tra xem email đã tồn tại chưa
    if (users.find(u => u.email === data.email)) {
      alert('Email này đã được đăng ký!');
      return;
    }

    // Thêm user mới vào "hệ thống"
    const newUser = {
      fullName: data.fullName,
      email: data.email,
      password: data.password, // Thực tế không bao giờ lưu pass thô thế này, nhưng đây là bản test
      role: 'staff', // Mặc định đăng ký mới là nhân viên
      points: 0
    };

    users.push(newUser);
    localStorage.setItem('mock_users', JSON.stringify(users));

    alert('Đăng ký tài khoản thành công! Hãy đăng nhập.');
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Tạo Tài Khoản</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
          <input 
            {...register('fullName')} 
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="VD: Nguyễn Văn Lân"
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            {...register('email')} 
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="email@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
          <input 
            type="password"
            {...register('password')} 
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
          <input 
            type="password"
            {...register('confirmPassword')} 
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2.5 rounded-md font-bold hover:bg-blue-700 transition duration-200">
          ĐĂNG KÝ NGAY
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Đã có tài khoản? <Link to="/login" className="text-blue-600 hover:underline font-semibold">Đăng nhập</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;