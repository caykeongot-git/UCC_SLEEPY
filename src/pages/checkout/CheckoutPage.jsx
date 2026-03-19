import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
    format: "IMAX 2D",
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#050a14] flex flex-col items-center py-12 px-4 font-sans text-white"
    >
      <div className="w-full max-w-[1000px] grid md:grid-cols-12 gap-10">
        
        {/* LEFT: SUMMARY */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="md:col-span-7 bg-[#0b1222] border border-slate-700/50 rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-2xl font-black uppercase italic mb-10 tracking-tighter">
            Order <span className="text-[#0066FF]">Summary</span>
          </h2>

          <div className="space-y-6">
            <div className="py-4 border-b border-slate-700/30">
              <div className="flex justify-between font-bold italic text-sm uppercase">
                <span>{bookingData.movie} ({bookingData.seats})</span>
                <span>{formatVnd(bookingData.basePrice)}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{bookingData.concessions}</p>
            </div>

            <div className="py-6">
              <p className="text-[10px] font-black text-slate-500 uppercase mb-3">Voucher</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  placeholder="UCC50"
                  className="flex-1 bg-[#050a14] border border-slate-600 rounded-xl px-4 py-3 outline-none focus:border-[#0066FF] transition-all"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleApplyVoucher} 
                  disabled={isApplying || !voucherCode.trim()} 
                  className="px-6 bg-slate-700 hover:bg-[#0066FF] rounded-xl font-black uppercase text-[10px] transition-all"
                >
                  {isApplying ? '...' : 'Apply'}
                </motion.button>
              </div>
              
              <AnimatePresence mode="wait">
                {voucherMsg.text && (
                  <motion.p
                    key={voucherMsg.text}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`text-[10px] mt-2 font-bold uppercase ${
                      voucherMsg.type === 'success' ? 'text-green-500' : 
                      voucherMsg.type === 'info' ? 'text-blue-400' : 'text-red-500'
                    }`}
                  >
                    {voucherMsg.text}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-6 border-t border-slate-700 flex justify-between items-end">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Total Payment</p>
              <motion.span 
                key={totalPrice}
                initial={{ scale: 1.2, color: "#fff" }}
                animate={{ scale: 1, color: "#0066FF" }}
                className="text-5xl font-black italic tracking-tighter"
              >
                {formatVnd(totalPrice)}
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: PAYMENT */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="md:col-span-5 bg-[#0b1222] border border-slate-700/50 rounded-3xl p-6 shadow-xl h-fit"
        >
          <h3 className="text-[10px] font-black uppercase text-slate-500 text-center mb-6 italic">Payment Method</h3>
          <div className="flex flex-col gap-3">
            {['momo', 'vnpay'].map((method) => (
              <motion.div 
                key={method}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === method ? 'border-[#0066FF] bg-[#0066FF]/10' : 'border-slate-700/50 bg-[#050a14]'
                }`}
                onClick={() => setPaymentMethod(method)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${method === 'momo' ? 'bg-[#A50064]' : 'bg-blue-600'}`}>
                    {method === 'momo' ? 'M' : 'V'}
                  </div>
                  <span className="text-xs font-bold uppercase">{method === 'momo' ? 'Ví MoMo' : 'VNPAY QR'}</span>
                </div>
                {paymentMethod === method && (
                  <motion.div layoutId="activeCheck" className="w-2.5 h-2.5 bg-[#0066FF] rounded-full shadow-[0_0_8px_#0066FF]" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: "#0052cc" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/history')}
            className="w-full py-6 bg-[#0066FF] mt-8 rounded-2xl font-black uppercase italic tracking-widest shadow-lg shadow-[#0066FF]/20"
          >
            Confirm Payment
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;