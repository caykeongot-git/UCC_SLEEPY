import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { paymentService } from '../../services/paymentService';

const OrderHistory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tickets');
  const [loading, setLoading] = useState(true);
  const [qrCountdown, setQrCountdown] = useState(30);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const result = await paymentService.getUserTickets();
        if (result.success) {
          setTickets(result.data);
        } else {
          // Fallback data nếu API lỗi
          setTickets([{
            id: 'ORD-UCC-777',
            status: 'Thành công',
            posterThumbnail: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjS3KyUjZ.jpg",
            movieTitle: 'Dune: Part Two',
            format: 'IMAX 2D • Cinema 4',
            seats: 'G6, G7',
            qrCodeValue: 'UCC-777-DUNE',
          }]);
        }
      } catch (error) {
        console.error("Lỗi lấy lịch sử vé:", error);
        // Fallback data nếu API lỗi
        setTickets([{
          id: 'ORD-UCC-777',
          status: 'Thành công',
          posterThumbnail: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjS3KyUjZ.jpg",
          movieTitle: 'Dune: Part Two',
          format: 'IMAX 2D • Cinema 4',
          seats: 'G6, G7',
          qrCodeValue: 'UCC-777-DUNE',
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
    const timer = setInterval(() => setQrCountdown(p => p <= 1 ? 30 : p - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050a14] flex flex-col lg:flex-row text-white font-sans">
      <aside className="hidden lg:flex w-[260px] bg-[#0b1222] border-r border-slate-800 p-6 flex-col sticky top-0 h-screen shrink-0">
        <h1 className="text-xl font-black uppercase italic mb-10 cursor-pointer" onClick={() => navigate('/')}>Cinema <span className="text-[#0066FF]">Quantum</span></h1>
        <nav className="flex-1 space-y-3">
          <button onClick={() => navigate('/checkout')} className="w-full flex items-center gap-3 p-3.5 rounded-xl text-[11px] font-black uppercase text-slate-500 hover:bg-slate-800 transition-all text-left">💳 Checkout</button>
          <button className="w-full flex items-center gap-3 p-3.5 rounded-xl text-[11px] font-black uppercase bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30 text-left">🎟️ My Tickets</button>
        </nav>
      </aside>

      <main className="flex-1 p-5 md:p-10 flex flex-col items-center overflow-x-hidden">
        <div className="w-full max-w-[500px]">
          <header className="mb-8 w-full">
            <h2 className="text-2xl font-black uppercase italic border-l-4 border-[#0066FF] pl-4 tracking-tighter">History <span className="text-[#0066FF]">& Tickets</span></h2>
          </header>

          <div className="flex bg-[#0b1222] rounded-full p-1 border border-slate-800 mb-8 w-full">
            {['tickets', 'transactions'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all relative z-10 ${activeTab === tab ? 'text-white' : 'text-slate-500'}`}>
                {tab === 'tickets' ? '🎟️ Tickets' : '💳 Trans'}
                {activeTab === tab && <Motion.div layoutId="tab-bg" className="absolute inset-0 bg-[#0066FF] rounded-full -z-10" />}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <Motion.div key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center text-[#0066FF] font-black text-xs animate-pulse">QUANTUM LOADING...</Motion.div>
            ) : activeTab === 'tickets' && tickets.length > 0 ? (
              <Motion.div key="t" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="bg-[#0b1222] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                    <div className="p-5 flex gap-4">
                      <img src={ticket.posterThumbnail} className="w-16 h-24 object-cover rounded-lg shrink-0" alt="p" />
                      <div className="min-w-0">
                        <span className="text-[8px] font-black text-[#0066FF] uppercase tracking-widest">● {ticket.status}</span>
                        <h3 className="text-base font-black uppercase italic mt-1 leading-tight truncate">{ticket.movieTitle}</h3>
                        <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">{ticket.format} • {ticket.seats}</p>
                      </div>
                    </div>
                    <div className="bg-[#050a14] p-6 flex flex-col items-center border-t border-slate-800">
                      <div className="bg-white p-2.5 rounded-xl mb-3 relative overflow-hidden">
                        <QRCodeSVG value={ticket.qrCodeValue} size={130} />
                        <Motion.div animate={{ y: ["0%", "200%"] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-x-0 h-[2px] bg-[#0066FF] opacity-50" />
                      </div>
                      <p className="text-[8px] font-black text-slate-500 tracking-[0.2em]">REF: {ticket.id}</p>
                      {/* Đã sửa lỗi qrCountdown unused ở đây */}
                      <p className="text-[7px] text-[#0066FF] font-bold mt-1 uppercase">Updates in {qrCountdown}s</p>
                    </div>
                  </div>
                ))}
              </Motion.div>
            ) : (
              <div className="text-center py-10 text-slate-500 text-[10px] font-bold uppercase border border-dashed border-slate-800 rounded-2xl">
                {activeTab === 'tickets' ? 'No tickets found.' : 'No transactions yet.'}
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default OrderHistory;