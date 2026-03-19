import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { paymentService } from '../../services/paymentService';

// 1. DỮ LIỆU MẪU CHUẨN MÀU TỐI
const mockTickets = [{
  id: 'ORD-UCC-777',
  status: 'Thành công',
  posterThumbnail: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjS3KyUjZ.jpg",
  movieTitle: 'Lật Mặt 7: Một Điều Ước',
  format: '2D • Rạp 03',
  showDate: '20.05.2024',
  showTime: '19:30',
  seats: 'A10, A11',
  qrCodeValue: 'UCC-777-LATMAT7',
}];

const mockTransactions = [
  {
    id: 'TXN-UCC-10293',
    date: '19.03.2026',
    time: '14:20',
    content: 'Thanh toán vé Dune: Part Two',
    amount: 240000,
    method: 'MoMo',
    status: 'Thành công'
  }
];

const OrderHistory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tickets');
  const [tickets, setTickets] = useState(mockTickets);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [qrCountdown, setQrCountdown] = useState(30);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setQrCountdown(p => p <= 1 ? 30 : p - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await paymentService.getPaymentHistory();
        const finalData = Array.isArray(response) ? response : (response?.data || []);
        
        if (finalData.length > 0) {
          setTickets(finalData);
          setTransactions(finalData.map(item => ({
            id: `TXN-${item.id}`,
            date: item.showDate,
            time: item.showTime,
            content: `Vé phim: ${item.movieTitle}`,
            amount: 120000, 
            method: 'MoMo',
            status: 'Thành công'
          })));
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatVnd = (value) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  return (
    <div className="min-h-screen bg-dark-900 text-light-100 flex flex-col items-center pt-10 px-4 pb-20 font-sans transition-colors duration-300">
      <div className="w-full max-w-[420px]">
        
        {/* HEADER & TAB SWITCHER */}
        <div className="mb-10 text-center">
          {/* ĐỔI SANG XANH: border-[#0066FF] và text-[#0066FF] */}
          <h2 className="text-3xl font-black uppercase italic mb-8 border-l-8 border-[#0066FF] pl-6 text-left text-white tracking-tighter leading-none">
            History <span className="text-[#0066FF]">& Tickets</span>
          </h2>
          
          <div className="flex bg-dark-800 rounded-full p-1 shadow-inner border border-dark-700">
            <button 
              onClick={() => setActiveTab('tickets')}
              className={`flex-1 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'tickets' 
                  ? 'bg-dark-700 text-[#0066FF] shadow-md border border-[#0066FF]/20' 
                  : 'text-light-600 hover:text-white'
              }`}
            >
              🎟️ My Tickets
            </button>
            <button 
              onClick={() => setActiveTab('transactions')}
              className={`flex-1 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'transactions' 
                  ? 'bg-dark-700 text-[#0066FF] shadow-md border border-[#0066FF]/20' 
                  : 'text-light-600 hover:text-white'
              }`}
            >
              💳 Transactions
            </button>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="text-center py-20 animate-pulse text-[#0066FF] font-bold uppercase text-xs tracking-widest">
            LOADING DATA...
          </div>
        )}

        {/* TAB 1: MY TICKETS */}
        {!loading && activeTab === 'tickets' && (
          <div className="space-y-10">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="shadow-2xl group transition-all duration-500 hover:-translate-y-1 relative">
                
                <div className="bg-dark-800 rounded-t-3xl border-x border-t border-dark-700 p-8 relative overflow-hidden">
                  {/* ĐỔI SANG XANH: bg-[#0066FF]/5 */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#0066FF]/5 blur-[60px] rounded-full"></div>
                  
                  <div className="flex gap-5 relative z-10">
                    <img src={ticket.posterThumbnail} className="w-20 h-28 object-cover rounded-lg border border-dark-600 shadow-xl" alt="poster" />
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] font-black text-[#0066FF] uppercase mb-1 tracking-widest animate-pulse">● {ticket.status}</span>
                      <h3 className="text-xl font-black uppercase text-white italic leading-tight mb-1">{ticket.movieTitle}</h3>
                      <p className="text-[10px] text-light-500 font-bold uppercase tracking-tight">{ticket.format}</p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4 bg-dark-950/50 p-4 rounded-xl border border-dark-700/50 backdrop-blur-sm">
                    <div>
                      <p className="text-[8px] font-black text-light-600 uppercase mb-1 tracking-widest">Showtime</p>
                      <p className="text-xs font-bold text-white">{ticket.showDate} <br/> {ticket.showTime}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-light-600 uppercase mb-1 tracking-widest">Your Seats</p>
                      <p className="text-xs font-black text-[#0066FF] tracking-tighter">{ticket.seats}</p>
                    </div>
                  </div>
                </div>

                <div className="relative h-6 bg-dark-800 border-x border-dark-700 flex items-center">
                  <div className="absolute -left-3 w-6 h-6 bg-dark-900 rounded-full border border-dark-700 shadow-inner"></div>
                  <div className="w-full border-t-2 border-dashed border-dark-600/50 mx-4"></div>
                  <div className="absolute -right-3 w-6 h-6 bg-dark-900 rounded-full border border-dark-700 shadow-inner"></div>
                </div>

                <div className="bg-dark-800 rounded-b-3xl border-x border-b border-dark-700 p-8 pt-4 flex flex-col items-center shadow-xl">
                  <div className="bg-white p-3 rounded-2xl mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)] border-2 border-[#0066FF]/20">
                    <QRCodeSVG value={ticket.qrCodeValue || 'UCC-777-LATMAT7'} size={150} level="H" includeMargin={false} />
                  </div>
                  <p className="text-[9px] font-black text-light-500 tracking-[0.3em] mb-1">REF ID: <span className="text-white font-black">{ticket.id}</span></p>
                  <p className="text-[8px] text-[#0066FF] font-bold italic uppercase tracking-tighter animate-pulse">Cập nhật sau {qrCountdown} giây</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: TRANSACTION HISTORY */}
        {!loading && activeTab === 'transactions' && (
          <div className="space-y-4">
            {transactions.map((txn) => (
              <div key={txn.id} className="bg-dark-800 border border-dark-700 p-6 rounded-3xl hover:border-[#0066FF] transition-all shadow-xl group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[9px] font-bold text-light-600 uppercase tracking-widest">{txn.date} • {txn.time}</span>
                    <h4 className="text-base font-black text-white uppercase italic mt-1 leading-tight group-hover:text-[#0066FF] transition-colors">
                      {txn.content}
                    </h4>
                  </div>
                  <span className="text-[8px] px-2.5 py-1 bg-green-500/10 text-green-500 rounded-md font-black uppercase tracking-widest italic animate-pulse">
                    Success
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-dark-700/50">
                  <span className="text-[10px] font-bold text-light-600 uppercase tracking-wider">Via {txn.method}</span>
                  <p className="text-2xl font-black text-[#0066FF] italic tracking-tighter leading-none">
                    -{formatVnd(txn.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && (tickets.length === 0 || (activeTab === 'transactions' && transactions.length === 0)) && (
          <div className="text-center py-20 text-light-600 font-bold uppercase text-xs italic tracking-widest">
            NO DATA FOUND
          </div>
        )}

        {/* NÚT ĐẶT VÉ MỚI: Đổi bg-[#0066FF] và hover:bg-blue-700 */}
        <button 
          onClick={() => navigate('/checkout')} 
          className="w-full py-5 bg-[#0066FF] hover:bg-blue-700 text-white rounded-2xl font-black uppercase italic mt-10 shadow-lg shadow-[#0066FF]/20 active:scale-95 transition-all flex items-center justify-center gap-3 tracking-widest"
        >
          <span>+ Book New Ticket</span>
          <span className="text-xl">🎟️</span>
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;