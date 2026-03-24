import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import useAuthStore from '../context/authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, register } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData.email, formData.password, formData.name, formData.phoneNumber);
      }

      if (result.success) {
        navigate('/checkout');
      } else {
        setError(result.error);
      }
    } catch {
      // Đã loại bỏ biến 'err' không sử dụng để fix lỗi ESLint
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#050a14] flex items-center justify-center p-4">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0b1222] border border-slate-700 rounded-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black uppercase italic text-white">
            Cinema <span className="text-[#0066FF]">Quantum</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            {isLogin ? 'Welcome back!' : 'Join us!'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#050a14] border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-[#0066FF]"
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full bg-[#050a14] border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-[#0066FF]"
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-[#050a14] border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-[#0066FF]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-[#050a14] border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-[#0066FF]"
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <Motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0066FF] rounded-xl font-black uppercase text-sm shadow-lg shadow-[#0066FF]/20 disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </Motion.button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#0066FF] text-sm hover:underline"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </Motion.div>
    </div>
  );
};

export default LoginPage;