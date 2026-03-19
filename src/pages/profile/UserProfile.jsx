import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import api from '../../services/api';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  // 1. Xử lý đổi mật khẩu
  const onChangePassword = async (data) => {
    try {
      await api.post('/user/change-password', data);
      alert('Đổi mật khẩu thành công!');
      reset();
    } catch {
      alert('Mật khẩu cũ không đúng hoặc lỗi server');
    }
  };

  // 2. Xử lý Upload Avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // Xem trước ảnh
      // Thực tế: dùng api.post gửi FormData lên server
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Cột 1: Thông tin & Avatar */}
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
        <div className="relative">
          <img src={avatar || "https://via.placeholder.com/150"} className="w-32 h-32 rounded-full object-cover border-4 border-blue-500" alt="Avatar" />
          <input type="file" onChange={handleAvatarChange} className="mt-4 text-xs" />
        </div>
        <h2 className="text-2xl font-bold mt-4">{user?.fullName}</h2>
        <p className="text-gray-500">{user?.email}</p>
        <span className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">{user?.role}</span>
      </div>

      {/* Cột 2: Đổi mật khẩu */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold mb-4 border-b pb-2">Đổi mật khẩu</h3>
        <form onSubmit={handleSubmit(onChangePassword)} className="space-y-4">
          <input type="password" {...register('oldPassword')} placeholder="Mật khẩu cũ" className="w-full p-2 border rounded" required />
          <input type="password" {...register('newPassword')} placeholder="Mật khẩu mới" className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full bg-gray-800 text-white p-2 rounded hover:bg-black transition">CẬP NHẬT MẬT KHẨU</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;