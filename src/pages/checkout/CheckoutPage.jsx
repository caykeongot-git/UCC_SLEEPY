import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import useBookingStore from '../../context/bookingStore';
import useAuthStore from '../../context/authStore';
import api from '../../services/api';
import { paymentService } from '../../services/paymentService';

const formatVnd = (value) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { selectedSeats, showtimeId, checkout } = useBookingStore();
  const { isAuthenticated } = useAuthStore();

  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isApplying, setIsApplying] = useState(false);
  const [voucherMsg, setVoucherMsg] = useState({ text: '', type: '' });
  
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!showtimeId || selectedSeats.length === 0) {
      navigate('/');
      return;
    }

    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Lấy thông tin suất chiếu từ API
        const showtimeResponse = await api.get(`/api/showtimes/${showtimeId}`);
        const showtimeData = showtimeResponse.data;

        // 2. Lấy thông tin phim từ API dựa trên movieId của suất chiếu
        const movieResponse = await api.get(`/api/movies/${showtimeData.movieId}`);
        const movieData = movieResponse.data;

        // 3. Tính toán giá tiền (Giả sử 100k/ghế)
        const basePrice = selectedSeats.length * 100000;

        setBookingData({
          movie: movieData.title,
          format: `${showtimeData.format} • ${showtimeData.cinemaName}`,
          seats: selectedSeats.join(', '),
          basePrice,
          showtime: showtimeData,
        });
      } catch (err) {
        console.error('Error fetching booking details:', err);
        setError(err.response?.data?.message || 'Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [isAuthenticated, showtimeId, selectedSeats, navigate]);

  const handleApplyVoucher = async () => {
    const code = voucherCode.trim().toUpperCase();
    if (!code) return;
    setIsApplying(true);
    setVoucherMsg({ text: 'Đang kiểm tra voucher...', type: 'info' });
    
    try {
      const result = await paymentService.checkAndApplyVoucher(code, bookingData?.basePrice || 0);
      
      if (result.success) {
        setDiscount(result.data.discountAmount || 0);
        setVoucherMsg({ 
          text: `✅ Áp dụng voucher thành công! Giảm ${formatVnd(result.data.discountAmount)}`, 
          type: 'success' 
        });
      } else {
        setDiscount(0);
        setVoucherMsg({ text: `❌ ${result.error}`, type: 'error' });
      }
    } catch (err) {
      console.error('Voucher error:', err);
      setDiscount(0);
      setVoucherMsg({ text: '❌ Lỗi hệ thống voucher. Vui lòng thử lại.', type: 'error' });
    } finally {
      setIsApplying(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!bookingData || isProcessing) return;

    setIsProcessing(true);
    setError(null);

    try {
      const result = await checkout(selectedSeats, paymentMethod);

      if (result.success) {
        navigate('/checkout/result', { state: { success: true, data: result.data } });
      } else {
        setError(result.error);
      }
    } catch {
      // Đ đã sửa lỗi ESLint unused 'err'
      setError('Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050a14] flex items-center justify-center text-[#0066FF] font-black tracking-widest animate-pulse uppercase italic">
      Quantum Loading...
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#050a14] flex items-center justify-center p-6">
      <div className="text-center bg-[#0b1222] p-10 rounded-3xl border border-red-500/20 shadow-2xl">
        <p className="text-red-500 font-bold mb-6 uppercase tracking-tighter text-sm italic">{error}</p>
        <button onClick={() => navigate('/')} className="bg-[#0066FF] px-8 py-3 rounded-xl font-black uppercase italic text-[10px] tracking-widest shadow-lg shadow-[#0066FF]/20">
          Go Back
        </button>
      </div>
    </div>
  );

  const totalPrice = Math.max(0, (bookingData?.basePrice || 0) - discount);

  return (
    <div className="min-h-screen bg-[#050a14] flex flex-col lg:flex-row text-white font-sans">
      
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-[260px] bg-[#0b1222] border-r border-slate-800 p-6 flex-col sticky top-0 h-screen z-10 shrink-0">
        <div className="flex items-center gap-3 mb-10 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#0066FF]/20 transition-transform group-hover:scale-110">
            <span className="text-xl">🎬</span>
          </div>
          <h1 className="text-xl font-black uppercase italic tracking-tighter">Cinema <span className="text-[#0066FF]">Quantum</span></h1>
        </div>
        <nav className="flex-1 space-y-3">
          <button className="w-full flex items-center gap-3 p-3.5 rounded-xl text-[11px] font-black uppercase bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30 text-left">
            💳 Checkout
          </button>
          <button onClick={() => navigate('/history')} className="w-full flex items-center gap-3 p-3.5 rounded-xl text-[11px] font-black uppercase text-slate-500 hover:bg-slate-800 transition-all text-left">
            🎟️ My Tickets
          </button>
        </nav>
      </aside>

      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#0b1222] border-b border-slate-800 sticky top-0 z-50">
        <h1 className="text-sm font-black uppercase italic">Cinema <span className="text-[#0066FF]">Quantum</span></h1>
        <button onClick={() => navigate('/history')} className="text-xs font-black text-[#0066FF] uppercase">My Tickets 🎟️</button>
      </div>

      <main className="flex-1 p-5 md:p-10 overflow-y-auto">
        <header className="mb-8">
          <h2 className="text-2xl md:text-3xl font-black uppercase italic border-l-4 md:border-l-8 border-[#0066FF] pl-4 md:pl-6 tracking-tighter">
            Secure <span className="text-[#0066FF]">Checkout</span>
          </h2>
        </header>

        <Motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-12 gap-6 md:gap-10">
          
          <div className="lg:col-span-7 bg-[#0b1222] border border-slate-700/50 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-2xl">
            <h3 className="text-lg font-black uppercase italic mb-6">Order <span className="text-[#0066FF]">Summary</span></h3>
            <div className="space-y-6">
              <div className="py-4 border-b border-slate-700/30 font-bold italic text-sm uppercase">
                <div className="flex justify-between gap-4">
                  <span className="truncate">{bookingData?.movie} ({bookingData?.seats})</span>
                  <span className="shrink-0 text-[#0066FF]">{formatVnd(bookingData?.basePrice)}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 not-italic font-medium">{bookingData?.format}</p>
              </div>

              <div className="py-4">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-3 tracking-widest">Discount Code</p>
                <div className="flex gap-2">
                  <input
                    type="text" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="ENTER CODE"
                    className="flex-1 bg-[#050a14] border border-slate-600 rounded-xl px-4 py-3 text-xs font-bold uppercase outline-none focus:border-[#0066FF] transition-all"
                  />
                  <Motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleApplyVoucher} disabled={isApplying}
                    className="px-6 bg-slate-800 hover:bg-[#0066FF] rounded-xl font-black uppercase text-[10px] transition-colors shadow-lg"
                  >
                    {isApplying ? '...' : 'Apply'}
                  </Motion.button>
                </div>
                <AnimatePresence mode="wait">
                  {voucherMsg.text && (
                    <Motion.p 
                      key={voucherMsg.text}
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: 10 }}
                      className={`text-[10px] mt-2 font-bold uppercase italic ${voucherMsg.type === 'success' ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {voucherMsg.text}
                    </Motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-6 border-t border-slate-700/50 flex justify-between items-end">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Total Amount</p>
                <div className="text-right">
                  <AnimatePresence mode="wait">
                    <Motion.span 
                      key={totalPrice}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-3xl md:text-5xl font-black text-[#0066FF] italic shadow-[#0066FF]/10 drop-shadow-xl"
                    >
                      {formatVnd(totalPrice)}
                    </Motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0b1222] border border-slate-700/50 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-xl h-fit">
            <h4 className="text-[10px] font-black uppercase text-slate-500 text-center mb-6 italic tracking-widest">Select Payment Method</h4>
            <div className="flex flex-col gap-3">
              {['momo', 'vnpay'].map((method) => (
                <Motion.div 
                  key={method} 
                  onClick={() => setPaymentMethod(method)}
                  animate={paymentMethod === method ? { borderColor: "#0066FF", background: "rgba(0,102,255,0.05)" } : { borderColor: "rgba(51, 65, 85, 0.3)", background: "rgba(5, 10, 20, 1)" }}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-md">
                      <img 
                        src={method === 'momo' ? 'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png' : 'https://vnpay.vn/s1/statics.vnpay.vn/2023/9/06n8zf6s4m3s1693985341795.png'} 
                        className="w-full h-full object-contain" 
                        alt={method} 
                      />
                    </div>
                    <span className="text-[11px] font-black uppercase italic">{method === 'momo' ? 'Ví MoMo' : 'VNPAY QR'}</span>
                  </div>
                  {paymentMethod === method && <div className="w-2.5 h-2.5 bg-[#0066FF] rounded-full shadow-[0_0_10px_#0066FF] animate-pulse" />}
                </Motion.div>
              ))}
            </div>
            <Motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.95 }} 
              onClick={handleConfirmPayment}
              disabled={isProcessing}
              className="w-full py-5 bg-[#0066FF] mt-8 rounded-xl md:rounded-2xl font-black uppercase italic text-sm shadow-lg shadow-[#0066FF]/30 disabled:opacity-50 transition-all"
            >
              {isProcessing ? 'Processing Transaction...' : 'Confirm & Pay Now 🎫'}
            </Motion.button>
            <p className="text-[9px] text-slate-500 text-center mt-4 font-bold uppercase tracking-widest">Your transaction is encrypted & secure</p>
          </div>
        </Motion.div>
      </main>
    </div>
  );
};

export default CheckoutPage;