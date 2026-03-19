import React from 'react';

const formatVnd = (value) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);

const TransactionHistory = ({ transactions }) => {
  // Nếu không có dữ liệu truyền vào, dùng dữ liệu mẫu để Ngọc dễ test giao diện
  const displayData = transactions || [
    {
      id: 'TXN-UCC-10293',
      date: '19.03.2026',
      time: '14:20',
      content: 'Thanh toán vé Dune: Part Two',
      amount: 240000,
      method: 'MoMo',
      status: 'Thành công'
    },
    {
      id: 'TXN-UCC-10288',
      date: '15.03.2026',
      time: '09:15',
      content: 'Thanh toán Combo Bắp Nước',
      amount: 150000,
      method: 'VNPAY',
      status: 'Thành công'
    }
  ];

  return (
    <div className="w-full max-w-[450px] mx-auto space-y-4 pb-10">
      <p className="text-[10px] font-black text-light-500 uppercase tracking-[0.3em] mb-6 px-2">
        Giao dịch gần đây
      </p>

      {displayData.map((txn) => (
        <div 
          key={txn.id} 
          className="bg-dark-800 border border-dark-700 p-5 rounded-3xl hover:border-primary-500/50 transition-all shadow-xl group"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[9px] font-bold text-light-600 uppercase">
                {txn.date} • {txn.time}
              </span>
              <h4 className="text-sm font-black text-white uppercase italic mt-1 group-hover:text-primary-500 transition-colors">
                {txn.content}
              </h4>
            </div>
            <div className="text-right">
              <span className={`text-[8px] px-2 py-1 rounded-md font-black uppercase tracking-tighter ${
                txn.status === 'Thành công' ? 'bg-green-500/10 text-green-500' : 'bg-primary-500/10 text-primary-500'
              }`}>
                {txn.status}
              </span>
              <p className="text-[8px] text-light-600 mt-2 font-bold uppercase tracking-tighter">
                ID: {txn.id}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-dark-700/50">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black text-white ${
                txn.method === 'MoMo' ? 'bg-[#A50064]' : 'bg-blue-600'
              }`}>
                {txn.method[0]}
              </div>
              <span className="text-[10px] font-bold text-light-500 uppercase">
                Qua {txn.method}
              </span>
            </div>
            <p className="text-xl font-black text-primary-500 italic">
              -{formatVnd(txn.amount)}
            </p>
          </div>
        </div>
      ))}

      {displayData.length === 0 && (
        <div className="text-center py-20 text-light-600 italic text-sm">
          Chưa có lịch sử giao dịch nào.
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;