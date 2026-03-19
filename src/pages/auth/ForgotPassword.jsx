import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../../services/api';

const schema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await api.post('/auth/forgot-password', data);
      alert('Vui lòng kiểm tra email để đặt lại mật khẩu!');
    } catch {
      alert('Email không tồn tại trong hệ thống');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Khôi phục mật khẩu</h2>
        <p className="text-sm text-gray-600 mb-4">Nhập email của bạn, chúng tôi sẽ gửi hướng dẫn khôi phục.</p>
        <input {...register('email')} className="w-full p-2 border mb-4" placeholder="Email của bạn" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">GỬI YÊU CẦU</button>
      </form>
    </div>
  );
};

export default ForgotPassword;