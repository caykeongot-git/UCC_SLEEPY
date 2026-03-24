import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { success, data } = location.state || { success: false, data: null };

  const formatVnd = (value) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="min-h-screen bg-[#050a14] flex items-center justify-center p-4">
      <Motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        {success ? (
          <div className="bg-[#0b1222] border border-green-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-green-500/10">
            {/* Header Success */}
            <div className="bg-green-500/10 p-8 text-center border-b border-green-500/20">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                <span className="text-4xl text-white">✓</span>
              </div>
              <h1 className="text-2xl font-black uppercase italic text-green-500 tracking-tighter">Booking Successful!</h1>
              <p className="text-slate-400 text-xs mt-2 uppercase font-bold tracking-widest">Transaction ID: {data?.bookingId || 'QT-88921'}</p>
            </div>

            {/* Ticket Info */}
            <div className="p-8 space-y-4 relative">
              {/* Cắt răng cưa trang trí 2 bên cho giống vé */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#050a14] rounded-full" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#050a14] rounded-full" />

              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Movie</p>
                  <h2 className="text-lg font-black uppercase italic text-white">{data?.movieTitle || 'Quantum Movie'}</h2>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Seats</p>
                  <p className="text-lg font-black text-[#0066FF] italic">{data?.seats?.join(', ') || 'N/A'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/50">
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Date & Time</p>
                  <p className="text-sm font-bold text-slate-300">{data?.showtimeDate || 'Today'} • {data?.showtimeTime || '19:00'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Total Paid</p>
                  <p className="text-sm font-bold text-slate-300">{formatVnd(data?.totalAmount || 0)}</p>
                </div>
              </div>

              {/* QR Code với data thực */}
              <div className="mt-8 flex flex-col items-center justify-center p-6 bg-white rounded-2xl">
                <QRCodeSVG
                  value={JSON.stringify({
                    bookingId: data?.bookingId || 'QT-88921',
                    movieTitle: data?.movieTitle || 'Quantum Movie',
                    seats: data?.seats || [],
                    showtimeDate: data?.showtimeDate || 'Today',
                    showtimeTime: data?.showtimeTime || '19:00',
                    totalAmount: data?.totalAmount || 0,
                    timestamp: new Date().toISOString(),
                  })}
                  size={128}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                  includeMargin={true}
                />
                <p className="text-[10px] text-black font-black uppercase mt-4 tracking-[0.3em]">Scan at Cinema</p>
              </div>
            </div>

            <div className="p-6 bg-slate-900/50 flex gap-3">
              <button 
                onClick={() => navigate('/')}
                className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-black uppercase italic text-[10px] tracking-widest transition-all"
              >
                Home
              </button>
              <button 
                onClick={() => window.print()}
                className="flex-1 py-4 bg-[#0066FF] hover:bg-[#005ce6] rounded-xl font-black uppercase italic text-[10px] tracking-widest shadow-lg shadow-[#0066FF]/20 transition-all"
              >
                Save Ticket
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#0b1222] border border-red-500/30 rounded-3xl p-10 text-center shadow-2xl">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-red-500">✕</span>
            </div>
            <h1 className="text-2xl font-black uppercase italic text-red-500 tracking-tighter">Payment Failed</h1>
            <p className="text-slate-400 text-sm mt-4 font-medium italic">
              Something went wrong with your transaction. Please check your balance and try again.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="mt-8 w-full py-4 bg-[#0066FF] rounded-xl font-black uppercase italic text-[10px] tracking-widest"
            >
              Back to Cinema
            </button>
          </div>
        )}
      </Motion.div>
    </div>
  );
};

export default PaymentResult;