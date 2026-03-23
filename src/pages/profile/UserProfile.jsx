import { useState } from 'react';
import useAuthStore from '../../store/authStore';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../../services/api';

const passwordSchema = z.object({
  oldPassword: z.string().min(1, 'Vui lòng nhập mật khẩu cũ'),
  newPassword: z.string().min(6, 'Mật khẩu mới từ 6 ký tự'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Xác nhận mật khẩu không khớp",
  path: ["confirmPassword"],
});

const UserProfile = () => {
  const user = useAuthStore(state => state.user);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(passwordSchema)
  });

  const onChangePassword = async (data) => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    // GỌI API THẬT
    try {
      await api.post('/user/change-password', data);
      setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' });
      reset();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Mật khẩu cũ không đúng hoặc có lỗi nội bộ' });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      // Tích hợp api upload thật ở đây
    }
  };

  if (!user) return null;

  return (
    <div className="relative min-h-screen bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Cinematic Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-b-2 border-dark-700 pb-4">
          <h1 className="text-3xl font-black text-light-100 uppercase tracking-widest border-l-4 border-primary-500 pl-4 py-1">Hồ Sơ Cá Nhân</h1>
          <Link to="/" className="text-sm font-semibold text-light-500 hover:text-light-100 transition-colors hidden sm:block"> &larr; Quay lại trang chủ</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cột 1: Avatar & Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-dark-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-dark-700 flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-dark-700 to-dark-900 z-0"></div>

              <div className="relative z-10 mt-12 flex flex-col items-center w-full">
                <div className="relative group cursor-pointer mb-6">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                  <img
                    src={avatar || `https://ui-avatars.com/api/?name=${user.fullName}&background=E50914&color=fff&size=150`}
                    className="relative w-36 h-36 rounded-full object-cover border-4 border-dark-800 shadow-2xl transition-transform duration-300 group-hover:scale-105"
                    alt="Avatar"
                  />
                  <label className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                    <svg className="w-8 h-8 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span className="text-white text-xs font-semibold">Tải ảnh lên</span>
                    <input type="file" onChange={handleAvatarChange} className="hidden" accept="image/*" />
                  </label>
                </div>

                <h2 className="text-2xl font-bold text-light-100 text-center mb-1">{user.fullName}</h2>
                <p className="text-light-500 text-sm mb-4">{user.email}</p>
                <div className="inline-block px-4 py-1.5 bg-primary-500/20 border border-primary-500/30 text-primary-400 rounded-full text-xs font-black uppercase tracking-wider shadow-[0_0_10px_rgba(229,9,20,0.2)]">
                  {user.role}
                </div>
              </div>
            </div>
          </div>

          {/* Cột 2: Đổi mật khẩu */}
          <div className="lg:col-span-2">
            <div className="bg-dark-800/80 backdrop-blur-xl p-8 lg:p-10 rounded-2xl shadow-xl border border-dark-700 h-full">
              <h3 className="text-xl font-bold text-light-100 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Bảo mật tài khoản
              </h3>

              {message.text && (
                <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-primary-900/30 text-primary-400 border border-primary-500/50'}`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit(onChangePassword)} className="space-y-6 max-w-lg">
                <div className="relative">
                  <label className="block text-xs font-semibold text-light-300 uppercase tracking-wider mb-2">Mật khẩu cũ</label>
                  <input
                    type="password"
                    {...register('oldPassword')}
                    className={`w-full p-3.5 bg-dark-900 border ${errors.oldPassword ? 'border-primary-500 focus:ring-primary-500' : 'border-dark-600 focus:border-light-500'} rounded-lg text-light-100 placeholder-dark-400 outline-none transition-all duration-300 focus:ring-1`}
                    placeholder="••••••••"
                  />
                  {errors.oldPassword && <p className="text-primary-500 text-xs mt-1.5 font-medium">{errors.oldPassword.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-xs font-semibold text-light-300 uppercase tracking-wider mb-2">Mật khẩu mới</label>
                    <input
                      type="password"
                      {...register('newPassword')}
                      className={`w-full p-3.5 bg-dark-900 border ${errors.newPassword ? 'border-primary-500 focus:ring-primary-500' : 'border-dark-600 focus:border-light-500'} rounded-lg text-light-100 placeholder-dark-400 outline-none transition-all duration-300 focus:ring-1`}
                      placeholder="••••••••"
                    />
                    {errors.newPassword && <p className="text-primary-500 text-xs mt-1.5 font-medium">{errors.newPassword.message}</p>}
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-semibold text-light-300 uppercase tracking-wider mb-2">Xác nhận mật khẩu</label>
                    <input
                      type="password"
                      {...register('confirmPassword')}
                      className={`w-full p-3.5 bg-dark-900 border ${errors.confirmPassword ? 'border-primary-500 focus:ring-primary-500' : 'border-dark-600 focus:border-light-500'} rounded-lg text-light-100 placeholder-dark-400 outline-none transition-all duration-300 focus:ring-1`}
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && <p className="text-primary-500 text-xs mt-1.5 font-medium">{errors.confirmPassword.message}</p>}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-dark-700 text-light-100 px-8 py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-dark-600 hover:text-white border border-dark-600 hover:border-light-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;