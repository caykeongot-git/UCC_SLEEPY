import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { paymentService } from '../../services/paymentService';

const CheckoutPage = () => {
  const navigate = useNavigate(); 
  const [voucher, setVoucher] = useState('');
  const [isApplied, setIsApplied] = useState(false);
  const [total, setTotal] = useState(350000); 
  const [selectedMethod, setSelectedMethod] = useState('vnpay'); 
  const [loading, setLoading] = useState(false);

  // --- LOGIC ĐẾM NGƯỢC 10 PHÚT ---
  const [timeLeft, setTimeLeft] = useState(600); 
  useEffect(() => {
    if (timeLeft <= 0) {
      alert("Hết thời gian giữ chỗ! Vui lòng chọn lại ghế.");
      navigate('/'); // Quay lại trang chủ hoặc trang chọn ghế
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleApplyVoucher = async () => {
    if (!voucher.trim()) return alert("Vui lòng nhập mã!");
    try {
      const result = await paymentService.calculateDiscount(voucher, total);
      
      // VÌ TRONG SERVICE BẠN ĐÃ RETURN RESPONSE.DATA NÊN Ở ĐÂY DÙNG LUÔN 'result'
      if (result && result.success) {
        setTotal(result.newTotal);
        setIsApplied(true);
        alert("Áp dụng mã thành công!");
      } else {
        alert(result?.message || "Mã giảm giá không hợp lệ!");
      }
    } catch (err) {
      console.error("Voucher Error:", err);
      // Kiểm tra nếu Backend trả về message lỗi cụ thể
      const errorMsg = err.response?.data?.message || "Lỗi khi kiểm tra mã giảm giá!";
      alert(errorMsg);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const orderData = {
        amount: total,
        paymentMethod: selectedMethod,
        orderInfo: "Thanh toán vé xem phim Lật Mặt 7",
        returnUrl: `${window.location.origin}/checkout/result`
      };
      
      const response = await paymentService.createPaymentUrl(orderData);
      
      // TƯƠNG TỰ: Dùng thẳng 'response' vì service đã bóc tách .data rồi
      if (response && response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        alert("Không nhận được link thanh toán từ hệ thống!");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      alert(err.response?.data?.message || "Lỗi kết nối thanh toán!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Thanh đếm ngược */}
      <div className={`mb-6 p-4 rounded-xl text-center font-bold shadow-sm transition-colors ${timeLeft < 60 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-blue-50 text-blue-700'}`}>
        ⚡ Vui lòng hoàn tất thanh toán trong: <span className="text-2xl ml-2">{formatTime(timeLeft)}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white rounded-2xl shadow-xl overflow-hidden border">
          <div className="bg-blue-600 p-6 text-white font-bold uppercase text-xl text-center">Chi tiết đơn hàng</div>
          <div className="p-6 space-y-6 text-left">
            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-700 font-medium">Lật Mặt 7 (Ghế: A10, A11)</span>
              <span className="font-bold text-lg">200.000đ</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-700 font-medium">Combo Family (2 Bắp + 1 Nước)</span>
              <span className="font-bold text-lg">150.000đ</span>
            </div>
            <div className="py-2">
              <label className="block text-sm font-bold text-gray-600 mb-2">Mã Giảm Giá</label>
              <div className="flex gap-2">
                <input type="text" className="flex-1 border p-3 rounded-lg outline-none" value={voucher} onChange={(e) => setVoucher(e.target.value)} placeholder="Nhập mã..." disabled={isApplied} />
                <button onClick={handleApplyVoucher} disabled={isApplied} className={`px-6 py-2 rounded-lg font-bold text-white ${isApplied ? 'bg-green-500' : 'bg-gray-800'}`}>
                  {isApplied ? 'ĐÃ DÙNG' : 'ÁP DỤNG'}
                </button>
              </div>
            </div>
            <div className="pt-6 border-t-2 border-dashed flex justify-between text-3xl font-black text-red-600">
              <span>TỔNG:</span>
              <span>{total.toLocaleString()}đ</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-96">
          <div className="bg-white p-6 rounded-2xl shadow-lg border">
            <h2 className="font-bold mb-6 uppercase text-gray-800 border-l-4 border-blue-600 pl-3">Thanh toán qua</h2>
            <div className="space-y-4">
              {['vnpay', 'momo'].map(m => (
                <button key={m} onClick={() => setSelectedMethod(m)} className={`w-full flex justify-between p-4 border-2 rounded-xl ${selectedMethod === m ? 'border-blue-500 bg-blue-50' : 'border-gray-100'}`}>
                  <span className="font-bold uppercase">{m}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === m ? 'border-blue-500' : 'border-gray-300'}`}>
                    {selectedMethod === m && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                  </div>
                </button>
              ))}
            </div>
            <button onClick={handlePayment} disabled={loading} className="w-full mt-10 py-4 rounded-xl font-black text-xl text-white bg-blue-600 shadow-lg hover:bg-blue-700 transition-all">
              {loading ? 'ĐANG XỬ LÝ...' : 'THANH TOÁN NGAY'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;