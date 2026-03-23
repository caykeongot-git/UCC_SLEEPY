import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const loginSchema = z.object({
  email: z.string().email('Email không đúng định dạng'),
  password: z.string().min(6, 'Mật khẩu phải từ 6 ký tự'),
});

const Login = () => {
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [role, setRole] = useState('customer');

  // States cho Google Modal mock
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleStep, setGoogleStep] = useState(1);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googlePassword, setGooglePassword] = useState('');
  const [googleError, setGoogleError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');
    
    // Gọi action login từ Zustand (thực hiện call POST /api/auth/login)
    const success = await login(data.email, data.password);
    
    if (success) {
      navigate('/');
    } else {
      const authError = useAuthStore.getState().error;
      setServerError(authError || 'Đăng nhập thất bại. Vui lòng kiểm tra lại email/mật khẩu.');
    }
    
    setLoading(false);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-dark-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-dark-800 via-dark-900 to-black p-4 overflow-hidden">
      {/* Cinematic Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary-900/20 rounded-full blur-[100px] pointer-events-none"></div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 bg-dark-800/80 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-[0_0_40px_rgba(229,9,20,0.15)] border border-dark-700 w-full max-w-md">
        <div className="text-center mb-6 relative">
          <style>{`
            @keyframes textShimmer {
              0% { background-position: 0% 50%; }
              100% { background-position: 200% 50%; }
            }
            .animate-text-shimmer {
              background-size: 200% auto;
              animation: textShimmer 4s linear infinite;
            }
          `}</style>
          <h1 className="font-black text-3xl tracking-widest uppercase drop-shadow-[0_0_15px_rgba(14,165,233,0.3)] mb-2 bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 text-transparent bg-clip-text animate-text-shimmer">
            SLEEPY CINEMA
          </h1>
          <p className="text-light-500 text-sm">Đăng nhập để trải nghiệm điện ảnh đỉnh cao</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex bg-dark-900/50 p-1 mb-6 rounded-lg border border-dark-700">
          {[
            { id: 'customer', label: 'Customer' },
            { id: 'staff', label: 'Staff' },
            { id: 'admin', label: 'Admin' }
          ].map(r => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300 ${role === r.id ? 'bg-primary-600 text-white shadow-[0_0_10px_rgba(229,9,20,0.3)]' : 'text-light-500 hover:text-light-100'}`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {serverError && (
          <div className="mb-6 p-3 bg-primary-900/30 border border-primary-500/50 rounded-lg text-primary-500 text-sm font-medium text-center">
            {serverError}
          </div>
        )}
        
        <div className="mb-5 relative group">
          <label className="block text-xs font-semibold text-light-300 uppercase tracking-wider mb-2">Email</label>
          <div className="relative">
            <input 
              {...register('email')} 
              className={`w-full p-3.5 bg-dark-900 border ${errors.email ? 'border-primary-500 focus:ring-primary-500' : 'border-dark-600 focus:border-light-500 focus:ring-light-500'} rounded-lg text-light-100 placeholder-dark-400 outline-none transition-all duration-300 focus:ring-1`}
              placeholder="example@cinema.com"
            />
          </div>
          {errors.email && <p className="text-primary-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
        </div>

        <div className="mb-8 relative group">
          <label className="block text-xs font-semibold text-light-300 uppercase tracking-wider mb-2">Mật khẩu</label>
          <input 
            type="password"
            {...register('password')} 
            className={`w-full p-3.5 bg-dark-900 border ${errors.password ? 'border-primary-500 focus:ring-primary-500' : 'border-dark-600 focus:border-light-500 focus:ring-light-500'} rounded-lg text-light-100 placeholder-dark-400 outline-none transition-all duration-300 focus:ring-1`}
            placeholder="••••••••"
          />
          {errors.password && <p className="text-primary-500 text-xs mt-1.5 font-medium">{errors.password.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white p-4 rounded-lg font-bold text-lg uppercase tracking-wider shadow-[0_5px_20px_rgba(229,9,20,0.4)] hover:shadow-[0_8px_25px_rgba(229,9,20,0.6)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Đang xác thực...' : 'Đăng Nhập'}
        </button>

        {/* Divider Hoặc */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-dark-600"></div>
          <p className="px-4 text-xs font-semibold text-light-500 uppercase tracking-widest">Hoặc</p>
          <div className="flex-1 border-t border-dark-600"></div>
        </div>

        {/* Nút đăng nhập Google */}
        <button 
          type="button" 
          onClick={() => setShowGoogleModal(true)}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-dark-900 p-3.5 rounded-lg font-bold text-sm tracking-wider shadow-[0_4px_10px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-0.5 border border-transparent hover:border-gray-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          ĐĂNG NHẬP BẰNG GMAIL
        </button>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-sm gap-4">
          <p className="text-light-500">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-light-100 font-semibold hover:text-primary-400 transition-colors">Đăng ký ngay</Link>
          </p>
          <Link to="/forgot-password" className="text-light-500 hover:text-light-100 transition-colors">Quên mật khẩu?</Link>
        </div>
      </form>

      {/* Modal đăng nhập bằng Google mô phỏng 2 Bước */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeInUp_0.3s_ease-out]">
          <div className="bg-dark-800 border border-dark-600 p-8 rounded-2xl w-full max-w-md shadow-[0_0_50px_rgba(66,133,244,0.15)] relative">
            <button 
              onClick={() => { setShowGoogleModal(false); setGoogleStep(1); setGoogleError(''); setGoogleEmail(''); setGooglePassword(''); }}
              className="absolute top-4 right-4 text-light-600 hover:text-light-100 flex items-center justify-center w-8 h-8 rounded-full hover:bg-dark-700 transition-colors"
            >✕</button>
            
            <div className="flex flex-col items-center text-center mb-8">
              <svg className="w-10 h-10 mb-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <h3 className="text-2xl font-black text-light-100 tracking-wider">
                 {googleStep === 1 ? 'ĐĂNG NHẬP' : 'CHÀO MỪNG'}
              </h3>
              
              {googleStep === 1 ? (
                <p className="text-light-400 text-sm mt-2">Tiếp tục đến Sleepy Cinema bằng Google</p>
              ) : (
                <div 
                  className="mt-4 flex items-center justify-center gap-2 border border-dark-600 rounded-full pl-1 pr-3 py-1 cursor-pointer hover:bg-dark-700 transition-colors" 
                  onClick={() => { setGoogleStep(1); setGoogleError(''); }}
                >
                   <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                     {googleEmail.charAt(0)}
                   </div>
                   <span className="text-sm font-medium tracking-wide text-light-300 ml-1">{googleEmail}</span>
                   <svg className="w-4 h-4 text-light-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              )}
            </div>
            
            <div className="mb-10 min-h-[80px]">
              {googleStep === 1 ? (
                <input 
                  type="email" 
                  autoFocus
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  className={`w-full p-4 bg-dark-900 border ${googleError ? 'border-primary-500' : 'border-dark-600'} focus:border-[#4285F4] rounded-lg text-light-100 placeholder-dark-400 outline-none transition-colors`}
                  placeholder="Email hoặc số điện thoại"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') document.getElementById('googleNextBtn').click();
                  }}
                />
              ) : (
                <input 
                  type="password" 
                  autoFocus
                  value={googlePassword}
                  onChange={(e) => setGooglePassword(e.target.value)}
                  className={`w-full p-4 bg-dark-900 border ${googleError ? 'border-primary-500' : 'border-dark-600'} focus:border-[#4285F4] rounded-lg text-light-100 placeholder-dark-400 outline-none transition-colors`}
                  placeholder="Nhập mật khẩu của bạn"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') document.getElementById('googleNextBtn').click();
                  }}
                />
              )}
              {googleError && (
                <div className="flex items-start gap-2 mt-2">
                  <svg className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  <p className="text-primary-500 text-xs font-medium">{googleError}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <button type="button" className="text-[#4285F4] hover:text-[#3367D6] text-sm font-bold tracking-wide transition-colors">
                {googleStep === 1 ? 'Bạn quên địa chỉ email?' : 'Bạn quên mật khẩu?'}
              </button>
              
              <button 
                id="googleNextBtn"
                onClick={() => {
                  setGoogleError('');
                  if (googleStep === 1) {
                    if (!googleEmail || !googleEmail.trim()) {
                      setGoogleError('Vui lòng nhập email của bạn.');
                      return;
                    }
                    if (!googleEmail.includes('@gmail.com') && !googleEmail.includes('@googlemail.com')) {
                      setGoogleError('Hệ thống chỉ hỗ trợ liên kết đuôi @gmail.com hợp lệ.');
                      return;
                    }
                    setGoogleStep(2);
                  } else {
                    if (!googlePassword || googlePassword.length < 6) {
                      setGoogleError('Mật khẩu của bạn không chính xác. Hãy nhập lại.');
                      return;
                    }
                    setGoogleError('Sử dụng API thực tế nên đăng nhập Google phụ trợ đang tạm khóa để đảm bảo an toàn.');
                    return;
                  }
                }}
                className="bg-[#4285F4] hover:bg-[#3367D6] text-white px-7 py-3 rounded-lg font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                Tiếp theo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;