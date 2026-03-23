import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import useAuthStore from '../../store/authStore';

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
  const registerUser = useAuthStore(state => state.register);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');
    
    const { fullName, email, password } = data;
    
    // API yêu cầu gửi kèm cả name. SD phoneNumber placeholder nếu Backend requires.
    const success = await registerUser({ email, password, name: fullName, phoneNumber: '0000000000' });
    
    if (success) {
      navigate('/login');
    } else {
      const errorMsg = useAuthStore.getState().error;
      setServerError(errorMsg || 'Đăng ký thất bại. Email có thể đã tồn tại.');
    }
    
    setLoading(false);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-dark-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-dark-800 via-dark-900 to-black p-4 overflow-hidden py-10">
      {/* Cinematic Effects */}
      <div className="absolute top-[10%] right-[-10%] w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-96 h-96 bg-primary-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 bg-dark-800/80 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-[0_0_40px_rgba(229,9,20,0.15)] border border-dark-700 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-light-100 font-bold text-2xl tracking-wide mb-2">Tạo Tài Khoản</h2>
          <p className="text-light-500 text-sm">Gia nhập vũ trụ điện ảnh Ultimate</p>
        </div>

        {serverError && (
          <div className="mb-6 p-3 bg-primary-900/30 border border-primary-500/50 rounded-lg text-primary-500 text-sm font-medium text-center">
            {serverError}
          </div>
        )}
        
        <div className="mb-5 relative">
          <label className="block text-xs font-semibold text-light-300 uppercase tracking-wider mb-2">Họ và tên</label>
          <input 
            {...register('fullName')} 
            className={`w-full p-3.5 bg-dark-900 border ${errors.fullName ? 'border-primary-500 focus:ring-primary-500' : 'border-dark-600 focus:border-light-500 focus:ring-light-500'} rounded-lg text-light-100 placeholder-dark-400 outline-none transition-all duration-300 focus:ring-1`}
            placeholder="VD: Nguyễn Văn Lân"
          />
          {errors.fullName && <p className="text-primary-500 text-xs mt-1.5 font-medium">{errors.fullName.message}</p>}
        </div>

        <div className="mb-5 relative">
          <label className="block text-xs font-semibold text-light-300 uppercase tracking-wider mb-2">Email</label>
          <input 
            {...register('email')} 
            className={`w-full p-3.5 bg-dark-900 border ${errors.email ? 'border-primary-500 focus:ring-primary-500' : 'border-dark-600 focus:border-light-500 focus:ring-light-500'} rounded-lg text-light-100 placeholder-dark-400 outline-none transition-all duration-300 focus:ring-1`}
            placeholder="example@cinema.com"
          />
          {errors.email && <p className="text-primary-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
        </div>

        <div className="mb-5 relative">
          <label className="block text-xs font-semibold text-light-300 uppercase tracking-wider mb-2">Mật khẩu</label>
          <input 
            type="password"
            {...register('password')} 
            className={`w-full p-3.5 bg-dark-900 border ${errors.password ? 'border-primary-500 focus:ring-primary-500' : 'border-dark-600 focus:border-light-500 focus:ring-light-500'} rounded-lg text-light-100 placeholder-dark-400 outline-none transition-all duration-300 focus:ring-1`}
            placeholder="••••••••"
          />
          {errors.password && <p className="text-primary-500 text-xs mt-1.5 font-medium">{errors.password.message}</p>}
        </div>

        <div className="mb-8 relative">
          <label className="block text-xs font-semibold text-light-300 uppercase tracking-wider mb-2">Xác nhận mật khẩu</label>
          <input 
            type="password"
            {...register('confirmPassword')} 
            className={`w-full p-3.5 bg-dark-900 border ${errors.confirmPassword ? 'border-primary-500 focus:ring-primary-500' : 'border-dark-600 focus:border-light-500 focus:ring-light-500'} rounded-lg text-light-100 placeholder-dark-400 outline-none transition-all duration-300 focus:ring-1`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && <p className="text-primary-500 text-xs mt-1.5 font-medium">{errors.confirmPassword.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white p-4 rounded-lg font-bold text-lg uppercase tracking-wider shadow-[0_5px_20px_rgba(229,9,20,0.4)] hover:shadow-[0_8px_25px_rgba(229,9,20,0.6)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Đang tạo...' : 'Đăng Ký Ngay'}
        </button>

        <div className="mt-8 text-center text-sm">
          <p className="text-light-500">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-light-100 font-semibold hover:text-primary-400 transition-colors">Đăng nhập</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;