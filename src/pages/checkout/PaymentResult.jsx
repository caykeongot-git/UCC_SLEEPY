import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { paymentService } from '../../services/paymentService';
import axios from 'axios';
import { CheckCircle2, XCircle, Loader2, Mail, Ticket, ArrowLeft, RefreshCw, Home } from 'lucide-react';

// --- COMPONENT CON (GIỮ NGUYÊN GIAO DIỆN ĐẸP CỦA BẠN) ---
const LoadingStatus = () => (
  <div className="text-center py-12">
    <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-6" strokeWidth={1.5} />
    <h2 className="text-2xl font-bold text-gray-800">Đang chốt vé cho bạn...</h2>
    <p className="text-gray-500 mt-2 text-sm italic">Hệ thống đang xác thực giao dịch từ ngân hàng...</p>
  </div>
);

const SuccessStatus = ({ email, orderId }) => (
  <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
    <div className="relative mb-8 flex justify-center">
      <div className="absolute inset-0 bg-green-100 rounded-full scale-125 blur-sm opacity-50"></div>
      <CheckCircle2 className="w-24 h-24 text-green-600 relative z-10" strokeWidth={1} />
    </div>
    <h2 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Tuyệt vời!</h2>
    <p className="text-lg font-bold text-green-700 bg-green-50 inline-block px-4 py-1.5 rounded-full mb-6 shadow-sm">Thanh toán thành công</p>
    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 mb-8 text-left space-y-4">
      <div className="flex items-start gap-3 text-sm text-gray-600">
        <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <span>Vé đã gửi tới: <strong className="text-gray-900 block">{email}</strong></span>
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-600 border-t border-gray-200 pt-3">
        <Ticket className="w-5 h-5 text-orange-500 shrink-0" />
        <span>Mã hóa đơn: <strong className="text-gray-900">#{orderId}</strong></span>
      </div>
    </div>
    <div className="space-y-3">
      <Link to="/history" className="group w-full flex items-center justify-center gap-3 bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all">
        <Ticket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        XEM VÉ TRONG LỊCH SỬ
      </Link>
    </div>
  </div>
);

const FailStatus = ({ message }) => (
  <div className="animate-in fade-in duration-500">
    <XCircle className="w-24 h-24 text-red-600 mx-auto mb-8" strokeWidth={1} />
    <h2 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Rất tiếc!</h2>
    <p className="text-lg font-bold text-red-700 bg-red-50 inline-block px-4 py-1.5 rounded-full mb-6">Giao dịch bị từ chối</p>
    <div className="bg-red-50/50 p-5 rounded-2xl border border-red-100 text-red-900/80 mb-8 text-sm text-left font-medium leading-relaxed italic">
      "{message || 'Giao dịch không thành công hoặc đã bị hủy.'}"
    </div>
    <Link to="/checkout" className="group w-full flex items-center justify-center gap-3 bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-black transition-all">
      <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
      THỬ THANH TOÁN LẠI
    </Link>
  </div>
);

// --- COMPONENT CHÍNH ---
const PaymentResult = () => {
  const location = useLocation();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const checkStatus = async () => {
      const queryParams = new URLSearchParams(location.search);
      const vnpRef = queryParams.get('vnp_TxnRef');
      setOrderId(vnpRef);

      try {
        const result = await paymentService.verifyPaymentResult(location.search);
        const apiUrl = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem('token'); // Lấy token theo yêu cầu của Lead

        if (result && (result.success || result.code === "00")) {
          try {
            // Chuẩn hóa DTO: Viết hoa OrderId theo chuẩn C# của Lead
            await Promise.all([
              axios.post(`${apiUrl}/api/Bill/confirm-success`, 
                { OrderId: result.orderId }, 
                { headers: { Authorization: `Bearer ${token}` } }
              ),
              axios.post(`${apiUrl}/api/Notifications/send-ticket-email`, 
                { OrderId: result.orderId, Email: localStorage.getItem('userEmail') },
                { headers: { Authorization: `Bearer ${token}` } }
              )
            ]);
          } catch (internalErr) { 
            console.error("Lỗi đồng bộ DTO:", internalErr); 
          }
          setStatus('success');
        } else {
          try {
            // Nhả ghế qua BillController
            await axios.post(`${apiUrl}/api/Bill/release-seats`, 
              { OrderId: vnpRef },
              { headers: { Authorization: `Bearer ${token}` } }
            );
          } catch (releaseErr) { 
            console.error("Lỗi nhả ghế:", releaseErr); 
          }
          setStatus('fail');
          setMessage(result?.message);
        }
      } catch (externalErr) {
        console.error("Lỗi hệ thống:", externalErr);
        setStatus('fail');
        // Bóc tách message theo chuẩn ApiResponse của Lead
        setMessage(externalErr.response?.data?.Message || 'Lỗi kết nối Server Lead.');
      }
    };

    if (location.search) checkStatus();
  }, [location.search]);

  return (
    <div className="max-w-xl mx-auto mt-16 px-4 pb-12">
      <div className="bg-white p-10 rounded-[32px] shadow-2xl shadow-blue-500/10 border border-gray-100 text-center relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-2 ${status === 'success' ? 'bg-green-500' : status === 'fail' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
        {status === 'loading' && <LoadingStatus />}
        {status === 'success' && <SuccessStatus email={localStorage.getItem('userEmail')} orderId={orderId} />}
        {status === 'fail' && <FailStatus message={message} />}
      </div>
    </div>
  );
};

export default PaymentResult;