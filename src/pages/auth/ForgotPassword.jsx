import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const schema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');
    setSuccess(false);

    try {
      await api.post('/auth/forgot-password', { email: data.email });
      setSuccess(true);
    } catch (error) {
      setServerError(error.response?.data?.message || 'Email không tồn tại trong hệ thống hoặc xử lý thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-dark-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-dark-800 via-dark-900 to-black p-4 overflow-hidden">
      {/* Cinematic Effects */}
      <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-primary-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 bg-dark-800/80 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-[0_0_40px_rgba(229,9,20,0.15)] border border-dark-700 w-full max-w-md">
        <h2 className="text-light-100 font-bold text-2xl tracking-wide mb-2 text-center">Khôi phục mật khẩu</h2>
        <p className="text-sm text-light-500 mb-8 text-center">Nhập email của bạn, chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu.</p>
        
        {success ? (
          <div className="flex flex-col items-center">
             <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-4 border border-green-500/50">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
             </div>
             <p className="text-light-100 text-center mb-6">Đã gửi hướng dẫn khôi phục đến <br/><span className="font-bold text-primary-400">email của bạn</span>.</p>
             <Link to="/login" className="w-full text-center bg-dark-700 text-light-100 p-3.5 rounded-lg hover:bg-dark-600 transition-colors">
               Quay lại Đăng Nhập
             </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {serverError && (
              <div className="mb-6 p-3 bg-primary-900/30 border border-primary-500/50 rounded-lg text-primary-500 text-sm font-medium text-center">
                {serverError}
              </div>
            )}
            
            <div className="mb-8 relative">
              <label className="block text-xs font-semibold text-light-300 uppercase tracking-wider mb-2">Email</label>
              <input 
                {...register('email')} 
                className={`w-full p-3.5 bg-dark-900 border ${errors.email ? 'border-primary-500 focus:ring-primary-500' : 'border-dark-600 focus:border-light-500 focus:ring-light-500'} rounded-lg text-light-100 placeholder-dark-400 outline-none transition-all duration-300 focus:ring-1`} 
                placeholder="example@cinema.com" 
              />
              {errors.email && <p className="text-primary-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white p-4 rounded-lg font-bold text-lg uppercase tracking-wider shadow-[0_5px_20px_rgba(229,9,20,0.4)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang gửi...' : 'GỬI YÊU CẦU'}
            </button>
            <div className="mt-6 text-center">
              <Link to="/login" className="text-light-500 text-sm hover:text-light-100 transition-colors">Quay lại Đăng Nhập</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;