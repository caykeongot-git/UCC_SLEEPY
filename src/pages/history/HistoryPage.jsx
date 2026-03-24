import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import OrderHistory from './OrderHistory';
import TransactionHistory from './TransactionHistory';
import { paymentService } from '../../services/paymentService';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tickets');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'transactions') {
      fetchTransactions();
    }
  }, [activeTab]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const result = await paymentService.getPaymentHistory();
      if (result.success) {
        setTransactions(result.data);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050a14] flex flex-col lg:flex-row text-white font-sans">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-[260px] bg-[#0b1222] border-r border-slate-800 p-6 flex-col sticky top-0 h-screen shrink-0">
        <div className="flex items-center gap-3 mb-10 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#0066FF]/20 transition-transform group-hover:scale-110">
            <span className="text-xl">🎬</span>
          </div>
          <h1 className="text-xl font-black uppercase italic tracking-tighter">Cinema <span className="text-[#0066FF]">Quantum</span></h1>
        </div>

        <nav className="flex-1 space-y-3">
          <button
            onClick={() => navigate('/checkout')}
            className="w-full flex items-center gap-3 p-3.5 rounded-xl text-[11px] font-black uppercase text-slate-500 hover:bg-slate-800 transition-all text-left"
          >
            💳 Checkout
          </button>
          <button
            className="w-full flex items-center gap-3 p-3.5 rounded-xl text-[11px] font-black uppercase bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30 text-left"
          >
            📋 My History
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-10">
        {/* MOBILE HEADER */}
        <div className="lg:hidden flex items-center justify-between mb-8">
          <h1 className="text-xl font-black uppercase italic" onClick={() => navigate('/')}>
            Cinema <span className="text-[#0066FF]">Quantum</span>
          </h1>
          <button
            onClick={() => navigate('/checkout')}
            className="px-4 py-2 bg-[#0066FF] rounded-xl font-black uppercase italic text-[10px] tracking-widest"
          >
            Checkout
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-1 mb-8 bg-[#0b1222] p-1 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-6 py-3 rounded-xl font-black uppercase italic text-[10px] tracking-widest transition-all ${
              activeTab === 'tickets'
                ? 'bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🎟️ My Tickets
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-6 py-3 rounded-xl font-black uppercase italic text-[10px] tracking-widest transition-all ${
              activeTab === 'transactions'
                ? 'bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            💳 Transactions
          </button>
        </div>

        {/* CONTENT */}
        <Motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'tickets' ? (
            <OrderHistory />
          ) : (
            <div className="w-full max-w-[450px] mx-auto">
              {loading ? (
                <div className="text-center py-20 text-[#0066FF] font-black tracking-widest animate-pulse uppercase italic">
                  Loading transactions...
                </div>
              ) : (
                <TransactionHistory transactions={transactions} />
              )}
            </div>
          )}
        </Motion.div>
      </main>
    </div>
  );
};

export default HistoryPage;