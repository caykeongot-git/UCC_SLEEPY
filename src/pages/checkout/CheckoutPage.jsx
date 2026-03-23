import React, { useState } from 'react'; 
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

  const handleApplyVoucher = async () => {
    const code = voucherCode.trim().toUpperCase();
    if (!code) return;
    setIsApplying(true);
    setVoucherMsg({ text: 'Checking...', type: 'info' });
    await new Promise(resolve => setTimeout(resolve, 800));
    if (code === 'UCC50') {
      setDiscount(50000);
      setVoucherMsg({ text: 'Voucher applied! -50k', type: 'success' });
    } else {
      setDiscount(0);
      setVoucherMsg({ text: 'Invalid voucher.', type: 'error' });
    }
    setIsApplying(false);
  };

  const totalPrice = Math.max(0, bookingData.basePrice - discount);

  return (
    <div className="min-h-screen bg-[#050a14] flex flex-col lg:flex-row text-white font-sans">
      
      {/* SIDEBAR: Hidden on Mobile */}
      <aside className="hidden lg:flex w-[260px] bg-[#0b1222] border-r border-slate-800 p-6 flex-col sticky top-0 h-screen z-10 shrink-0">
        <div className="flex items-center gap-3 mb-10 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#0066FF]/20 transition-transform group-hover:scale-110">
            <span className="text-xl">🎬</span>
          </div>
          <h1 className="text-xl font-black uppercase italic tracking-tighter">Cinema <span className="text-[#0066FF]">Quantum</span></h1>
        </div>
        <nav className="flex-1 space-y-3">
          <button className="w-full flex items-center gap-3 p-3.5 rounded-xl text-[11px] font-black uppercase bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30">💳 Checkout</button>
          <button onClick={() => navigate('/history')} className="w-full flex items-center gap-3 p-3.5 rounded-xl text-[11px] font-black uppercase text-slate-500 hover:bg-slate-800 transition-all">🎟️ My Tickets</button>
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
                  <span className="truncate">{bookingData.movie} ({bookingData.seats})</span>
                  <span className="shrink-0">{formatVnd(bookingData.basePrice)}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 not-italic">{bookingData.format}</p>
                <p className="text-[10px] text-slate-400 mt-1 not-italic">{bookingData.concessions}</p>
              </div>

              <div className="py-4">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-3 tracking-widest">Voucher</p>
                <div className="flex gap-2">
                  <input
                    type="text" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="UCC50"
                    className="flex-1 bg-[#050a14] border border-slate-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0066FF]"
                  />
                  <Motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleApplyVoucher} disabled={isApplying}
                    className="px-6 bg-slate-700 hover:bg-[#0066FF] rounded-xl font-black uppercase text-[10px] transition-colors"
                  >
                    {isApplying ? '...' : 'Apply'}
                  </Motion.button>
                </div>
                <AnimatePresence>
                  {voucherMsg.text && (
                    <Motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0 }}
                      className={`text-[10px] mt-2 font-bold uppercase ${voucherMsg.type === 'success' ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {voucherMsg.text}
                    </Motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-6 border-t border-slate-700 flex justify-between items-end">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total</p>
                <Motion.span 
                  key={totalPrice}
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="text-3xl md:text-5xl font-black text-[#0066FF] italic"
                >
                  {formatVnd(totalPrice)}
                </Motion.span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0b1222] border border-slate-700/50 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-xl h-fit">
            <h4 className="text-[10px] font-black uppercase text-slate-500 text-center mb-6 italic tracking-widest">Payment Method</h4>
            <div className="flex flex-col gap-3">
              {['momo', 'vnpay'].map((method) => (
                <Motion.div 
                  key={method} 
                  onClick={() => setPaymentMethod(method)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={paymentMethod === method ? {
                    borderColor: "#0066FF",
                    boxShadow: "0px 0px 15px rgba(0,102,255,0.2)"
                  } : { borderColor: "rgba(51, 65, 85, 0.5)" }}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === method ? 'bg-[#0066FF]/10' : 'bg-[#050a14]'}`}
                >
                  <div className="flex items-center gap-3">
                    <img src={method === 'momo' ? 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/momo.svg' : 'https://vinadesign.vn/uploads/thumbnails/800/2023/05/vnpay-logo-vinadesign-25-12-59-16.jpg'} 
                         className="w-8 h-8 object-contain rounded-md bg-white p-1" alt={method} />
                    <span className="text-[10px] font-bold uppercase">{method === 'momo' ? 'Ví MoMo' : 'VNPAY QR'}</span>
                  </div>
                  {paymentMethod === method && <Motion.div layoutId="dot" className="w-2 h-2 bg-[#0066FF] rounded-full shadow-[0_0_8px_#0066FF]" />}
                </Motion.div>
              ))}
            </div>
            <Motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "#0052cc" }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => navigate('/history')}
              className="w-full py-5 bg-[#0066FF] mt-8 rounded-xl md:rounded-2xl font-black uppercase italic text-sm shadow-lg shadow-[#0066FF]/20"
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