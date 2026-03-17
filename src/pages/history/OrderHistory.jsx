import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react'; 
import { paymentService } from '../../services/paymentService';

// 1. Đặt dữ liệu mẫu bên ngoài để đảm bảo không bị lỗi "not defined"
const mockData = [{ 
  id: "ORD001", 
  movie: "Lật Mặt 7", 
  date: "20.05.2024", 
  amount: 350000, 
  status: "Thành công", 
  theater: "Rạp 03 - Tầng 5", 
  seats: "A10, A11", 
  combo: "1 Family Combo" 
}];

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); // Khởi tạo mảng rỗng
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await paymentService.getPaymentHistory();
        
        // 2. Kiểm tra dữ liệu trả về từ API của Lead
        // Nếu response là mảng thì dùng, nếu nằm trong .data thì dùng, không thì dùng mockData
        const finalData = Array.isArray(response) 
          ? response 
          : (Array.isArray(response?.data) ? response.data : mockData);
        
        setOrders(finalData);
      } catch (err) { 
        console.error("Lỗi kết nối API:", err);
        // Khi lỗi (ví dụ chưa bật Server Lead) thì hiện mockData để vẫn có giao diện xem
        setOrders(mockData); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchHistory();
  }, []);

  // 3. Hiển thị vòng xoay khi đang tải
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center mt-40">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">Đang tải lịch sử giao dịch...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-2xl font-black text-gray-800 uppercase italic tracking-tighter">Lịch sử giao dịch</h2>
        <button 
          onClick={() => navigate('/checkout')} 
          className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100"
        >
          + ĐẶT VÉ MỚI
        </button>
      </div>

      <div className="overflow-x-auto">
        {/* 4. Bảo vệ hàm .map bằng cách kiểm tra orders có phải mảng không */}
        {Array.isArray(orders) && orders.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="p-4">Mã đơn</th>
                <th className="p-4">Phim</th>
                <th className="p-4">Ngày</th>
                <th className="p-4">Số tiền</th>
                <th className="p-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm text-left">
              {orders.map((o) => (
                <tr key={o.id || o.OrderId} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="p-4 font-bold text-blue-600 font-mono">#{o.id || o.OrderId}</td>
                  <td className="p-4 font-bold text-gray-800 group-hover:text-blue-700">{o.movie || o.MovieName}</td>
                  <td className="p-4 text-gray-500 font-medium">{o.date || o.ShowDate}</td>
                  <td className="p-4 font-black text-gray-900">{o.amount?.toLocaleString() || o.TotalPrice?.toLocaleString()}đ</td>
                  <td className="p-4 text-center">
                    {(o.status === 'Thành công' || o.Status === 'SOLD') ? (
                      <button 
                        onClick={() => { setSelectedOrder(o); setIsModalOpen(true); }} 
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-black text-[10px] uppercase hover:bg-indigo-700 shadow-md transition-all active:scale-90"
                      >
                        XEM CHI TIẾT
                      </button>
                    ) : (
                      <span className="text-red-500 font-black uppercase text-[10px] bg-red-50 px-3 py-1 rounded-full border border-red-100">
                        {o.status || "Chờ xử lý"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-20 text-gray-400 font-medium">
            Bạn chưa có giao dịch nào gần đây.
          </div>
        )}
      </div>

      {/* 5. MODAL CHI TIẾT VÉ */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] p-8 max-w-sm w-full shadow-2xl overflow-hidden relative animate-in zoom-in duration-300">
            <div className="absolute top-0 left-0 w-full h-3 bg-blue-600"></div>
            <h3 className="text-2xl font-black text-center mt-4 uppercase text-gray-800 italic">Vé xem phim</h3>
            
            <div className="mt-8 flex justify-center p-4 bg-white rounded-3xl shadow-inner border-2 border-dashed border-gray-100">
              <QRCodeSVG value={`TICKET:${selectedOrder.id || selectedOrder.OrderId}`} size={180} level="H" />
            </div>
            
            <div className="mt-8 space-y-4 bg-gray-50 p-6 rounded-[24px]">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-gray-400 uppercase">Phim</span>
                <span className="font-bold text-gray-900 text-right text-sm">{selectedOrder.movie || selectedOrder.MovieName}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="text-[10px] font-black text-gray-400 uppercase">Ghế</span>
                <span className="font-bold text-red-600">{selectedOrder.seats || selectedOrder.Seats?.join(', ')}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="text-[10px] font-black text-gray-400 uppercase">Tổng tiền</span>
                <span className="font-black text-blue-600">{(selectedOrder.amount || selectedOrder.TotalPrice)?.toLocaleString()}đ</span>
              </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(false)} 
              className="mt-8 w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-xl"
            >
              ĐÓNG VÉ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;