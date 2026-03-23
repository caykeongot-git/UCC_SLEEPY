import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const formatVnd = (value) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isApplying, setIsApplying] = useState(false);
  const [voucherMsg, setVoucherMsg] = useState({ text: '', type: '' });

  const bookingData = {
    movie: "DUNE: PART TWO",
    format: "IMAX 2D • Cinema 4",
    seats: "G6, G7",
    concessions: "1x Caramel Popcorn, 2x Pepsi Large",
    basePrice: 240000
  };

  useEffect(() => {
    if (!voucherCode) {
      setDiscount(0);
      setVoucherMsg({ text: '', type: '' });
    }
  }, [voucherCode]);

  const handleApplyVoucher = async () => {
    const code = voucherCode.trim().toUpperCase();
    if (!code) return;

    setIsApplying(true);
    setVoucherMsg({ text: 'Checking...', type: 'info' });

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      if (code === 'UCC50') {
        setDiscount(50000);
        setVoucherMsg({ text: 'Voucher applied! -50k', type: 'success' });
      } else {
        setDiscount(0);
        setVoucherMsg({ text: 'Invalid voucher code.', type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setVoucherMsg({ text: 'System error.', type: 'error' });
    } finally {
      setIsApplying(false);
    }
  };

  const totalPrice = Math.max(0, bookingData.basePrice - discount);

  return (
    <div className="min-h-screen bg-[#050a14] flex text-white font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-[260px] bg-[#0b1222] border-r border-slate-800 p-6 flex flex-col sticky top-0 h-screen z-10">
        <div className="flex items-center gap-3 mb-10 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#0066FF]/20 transition-transform group-hover:scale-105">
            <span className="text-xl">🎬</span>
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic text-white leading-none">
            Cinema <span className="text-[#0066FF]">Quantum</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-3">
          <button className="w-full flex items-center gap-3 p-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30">
            <span>💳</span> Checkout
          </button>

          <button onClick={() => navigate('/history')} className="w-full flex items-center gap-3 p-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:bg-slate-800 hover:text-slate-200 transition-all">
            <span>🎟️</span> My Tickets
          </button>
        </nav>

        <div className="flex items-center gap-3 bg-dark-800 p-1.5 pr-5 rounded-full border border-dark-700 mt-auto">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ngoc&backgroundColor=ff4b4b" alt="User" className="w-8 h-8 rounded-full bg-dark-700 border border-dark-600" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-white uppercase tracking-tighter">Ngọc Nguyễn</span>
            <span className="text-[8px] font-bold text-[#0066FF] uppercase leading-none">VIP Member</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-10 text-left">
          <h2 className="text-3xl font-black uppercase italic border-l-8 border-[#0066FF] pl-6 text-white tracking-tighter leading-none">
            Secure <span className="text-[#0066FF]">Checkout</span>
          </h2>
        </header>

        <Motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-12 gap-10">

          {/* LEFT */}
          <div className="md:col-span-7 bg-[#0b1222] border border-slate-700/50 rounded-3xl p-8 shadow-2xl h-fit">
            <h3 className="text-xl font-black uppercase italic mb-8 tracking-tighter">
              Order <span className="text-[#0066FF]">Summary</span>
            </h3>

            <div className="space-y-6">
              <div className="py-4 border-b border-slate-700/30">
                <div className="flex justify-between font-bold italic text-sm uppercase">
                  <span>{bookingData.movie} ({bookingData.seats})</span>
                  <span>{formatVnd(bookingData.basePrice)}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{bookingData.format}</p>
                <p className="text-[11px] text-slate-400 mt-1">{bookingData.concessions}</p>
              </div>

              {/* Voucher */}
              <div className="py-6">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-3 tracking-widest">Voucher</p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="UCC50"
                    className="flex-1 bg-[#050a14] border border-slate-600 rounded-xl px-4 py-3 outline-none focus:border-[#0066FF]"
                  />

                  <Motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleApplyVoucher}
                    disabled={isApplying || !voucherCode.trim()}
                    className="px-6 bg-slate-700 hover:bg-[#0066FF] rounded-xl font-black uppercase text-[10px] disabled:opacity-50"
                  >
                    {isApplying ? '...' : 'Apply'}
                  </Motion.button>
                </div>

                <AnimatePresence mode="wait">
                  {voucherMsg.text && (
                    <Motion.p
                      key={voucherMsg.text}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`text-[10px] mt-2 font-bold uppercase ${
                        voucherMsg.type === 'success' ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {voucherMsg.text}
                    </Motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Total */}
              <div className="pt-6 border-t border-slate-700 flex justify-between items-end">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Total Payment
                </p>

                <Motion.span
                  key={totalPrice}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-5xl font-black text-[#0066FF] italic tracking-tighter"
                >
                  {formatVnd(totalPrice)}
                </Motion.span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-5 bg-[#0b1222] border border-slate-700/50 rounded-3xl p-6 shadow-xl h-fit">
            <h4 className="text-[10px] font-black uppercase text-slate-500 text-center mb-6 italic tracking-widest">
              Payment Method
            </h4>

            <div className="flex flex-col gap-3">
              {['momo', 'vnpay'].map((method) => (
                <Motion.div
                  key={method}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setPaymentMethod(method)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer ${
                    paymentMethod === method
                      ? 'border-[#0066FF] bg-[#0066FF]/10'
                      : 'border-slate-700/50 bg-[#050a14]'
                  }`}
                >
                  <div className="flex items-center gap-3">
  <img
    src={
      method === 'momo'
        ? 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/momo.svg' // icon MoMo “na ná” từ Simple Icons
        : 'https://vinadesign.vn/uploads/thumbnails/800/2023/05/vnpay-logo-vinadesign-25-12-59-16.jpg'
    }
    alt={method}
    className="w-8 h-8 object-contain rounded-md bg-white p-1"
  />
  <span className="text-xs font-bold uppercase tracking-tight">
    {method === 'momo' ? 'Ví MoMo' : 'VNPAY QR'}
  </span>
</div>

                  {paymentMethod === method && (
                    <div className="w-2.5 h-2.5 bg-[#0066FF] rounded-full" />
                  )}
                </Motion.div>
              ))}
            </div>

            <Motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/history')}
              className="w-full py-6 bg-[#0066FF] mt-8 rounded-2xl font-black uppercase italic tracking-widest"
            >
              Confirm Payment 🎟️
            </Motion.button>
          </div>

        </Motion.div>
      </main>
    </div>
  );
};

export default CheckoutPage;