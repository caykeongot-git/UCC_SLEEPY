import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const mockTickets = [{
  id: 'ORD-UCC-777',
  status: 'Thành công',
  posterThumbnail: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjS3KyUjZ.jpg",
  movieTitle: 'Dune: Part Two',
  format: 'IMAX 2D • Cinema 4',
  showDate: 'Today, 07:30 PM',
  seats: 'G6, G7',
  qrCodeValue: 'UCC-777-DUNE',
}];

const mockTransactions = [
  { id: 'TXN-1', content: 'Dune: Part Two', amount: 240000, date: '19.03.2026', method: 'MoMo', status: 'Success' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

const OrderHistory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tickets');
  const [tickets, setTickets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [qrCountdown, setQrCountdown] = useState(30);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timer = setInterval(() => setQrCountdown(p => p <= 1 ? 30 : p - 1), 1000);
    
    const loadData = setTimeout(() => {
      setTickets(mockTickets);
      setTransactions(mockTransactions);
      setLoading(false);
    }, 1500); // Tăng thời gian load một chút để thấy hiệu ứng loading đẹp hơn

    return () => {
      clearInterval(timer);
      clearTimeout(loadData);
    };
  }, []);

  const formatVnd = (value) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  return (
    <div className="min-h-screen bg-[#050a14] flex text-white font-sans">
      
      <aside className="w-[260px] bg-[#0b1222] border-r border-slate-800 p-6 flex flex-col sticky top-0 h-screen z-10 shrink-0">
        <div className="flex items-center gap-3 mb-10 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#0066FF]/20 transition-transform group-hover:scale-105">
            <span className="text-xl">🎬</span>
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic text-white leading-none">
            Cinema <span className="text-[#0066FF]">Quantum</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-3">
          <button onClick={() => navigate('/checkout')} className="w-full flex items-center gap-3 p-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:bg-slate-800 hover:text-slate-200 transition-all">
            <span>💳</span> Checkout
          </button>
          <button className="w-full flex items-center gap-3 p-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30">
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

      <main className="flex-1 p-10 overflow-y-auto flex flex-col items-center">
        <div className="w-full max-w-[800px]">
          
          <header className="mb-10 text-left w-full">
            <h2 className="text-3xl font-black uppercase italic border-l-8 border-[#0066FF] pl-6 tracking-tighter leading-none">
              History <span className="text-[#0066FF]">& Tickets</span>
            </h2>
          </header>

          <div className="mb-10 w-full flex justify-start">
            <div className="flex bg-[#0b1222] rounded-full p-1 border border-slate-800 w-full max-w-[420px]">
              {['tickets', 'transactions'].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)} 
                  className={`flex-1 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab ? 'bg-[#0066FF] text-white shadow-lg' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {tab === 'tickets' ? '🎟️ My Tickets' : '💳 Transactions'}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full flex justify-start">
            {loading ? (
              // HIỆU ỨNG LOADING QUANTUM
              <div className="py-24 w-full text-center">
                <Motion.div
                  initial={{ opacity: 0, filter: "blur(5px)" }}
                  animate={{ 
                    opacity: [0, 1, 1, 0], 
                    filter: ["blur(5px)", "blur(0px)", "blur(0px)", "blur(5px)"] 
                  }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-[#0066FF] font-black uppercase tracking-[0.3em] text-sm"
                >
                  Quantum Loading...
                </Motion.div>
                <Motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-[#0066FF] border-t-transparent rounded-full mx-auto mt-6"
                />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {activeTab === 'tickets' ? (
                  <Motion.div 
                    key="tkt" 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="space-y-10 w-full max-w-[420px]"
                  >
                    {tickets.length === 0 ? (
                      <div className="p-10 text-center text-slate-400 border border-dashed border-slate-700 rounded-2xl font-bold uppercase text-[10px]">
                        No tickets found.
                      </div>
                    ) : (
                      tickets.map((ticket) => (
                        <Motion.div 
                          key={ticket.id} 
                          variants={itemVariants}
                          whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0, 102, 255, 0.2)", borderColor: "#0066FF" }}
                          className="bg-[#0b1222] rounded-3xl border border-slate-800 overflow-hidden shadow-2xl transition-colors duration-300"
                        >
                          <div className="p-8">
                            <div className="flex gap-5">
                              <img src={ticket.posterThumbnail} className="w-20 h-28 object-cover rounded-lg border border-slate-700 shadow-md" alt="p" />
                              <div>
                                <span className="text-[10px] font-black text-[#0066FF] uppercase tracking-widest animate-pulse">● {ticket.status}</span>
                                <h3 className="text-xl font-black uppercase italic mt-1 leading-tight">{ticket.movieTitle}</h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">{ticket.format}</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* HIỆU ỨNG QUÉT QR */}
                          <div className="bg-[#050a14] p-8 flex flex-col items-center border-t border-slate-800 relative overflow-hidden">
                            <div className="bg-white p-3 rounded-2xl mb-4 border-2 border-[#0066FF]/20 relative overflow-hidden">
                              <QRCodeSVG value={ticket.qrCodeValue} size={140} />
                              
                              {/* ĐƯỜNG QUÉT CHẠY DỌC */}
                              <Motion.div
                                initial={{ y: "-100%" }}
                                animate={{ y: "150%" }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="absolute inset-x-0 h-[2px] bg-[#0066FF] shadow-[0_0_10px_#0066FF] opacity-60"
                              />
                            </div>
                            
                            <p className="text-[9px] font-black text-slate-500 tracking-[0.3em] relative z-10">REF: {ticket.id}</p>
                            <p className="text-[8px] text-[#0066FF] font-bold mt-1 uppercase relative z-10">Updates in {qrCountdown}s</p>
                          </div>
                        </Motion.div>
                      ))
                    )}
                  </Motion.div>
                ) : (
                  <Motion.div 
                    key="txn" 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="space-y-4 w-full max-w-[600px]"
                  >
                    {transactions.length === 0 ? (
                      <div className="p-10 text-center text-slate-400 border border-dashed border-slate-700 rounded-2xl font-bold uppercase text-[10px]">
                        No transactions found.
                      </div>
                    ) : (
                      transactions.map((txn) => (
                        <Motion.div 
                          key={txn.id} 
                          variants={itemVariants}
                          whileHover={{ scale: 1.02, borderColor: "#0066FF", backgroundColor: "rgba(0, 102, 255, 0.05)" }}
                          className="bg-[#0b1222] border border-slate-800 p-6 rounded-3xl transition-all group shadow-xl"
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="font-black uppercase italic group-hover:text-[#0066FF] transition-colors">{txn.content}</h4>
                            <p className="text-2xl font-black text-[#0066FF] italic">{formatVnd(txn.amount)}</p>
                          </div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase mt-2">{txn.date} • {txn.method}</p>
                        </Motion.div>
                      ))
                    )}
                  </Motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default OrderHistory;