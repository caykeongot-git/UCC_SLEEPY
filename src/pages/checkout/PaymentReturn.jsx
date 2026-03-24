import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { paymentService } from '../../services/paymentService';

const PaymentReturn = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, failed
  const [message, setMessage] = useState('Đang xác thực thanh toán...');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Lấy query parameters từ URL return
        const queryString = searchParams.toString();

        if (!queryString) {
          setStatus('failed');
          setMessage('Không tìm thấy thông tin thanh toán');
          return;
        }

        // Gọi API xác thực kết quả thanh toán
        const result = await paymentService.verifyPaymentResult(`?${queryString}`);

        if (result.success) {
          setStatus('success');
          setMessage('Thanh toán thành công! Đang chuyển hướng...');

          // Chuyển đến trang kết quả sau 2 giây
          setTimeout(() => {
            navigate('/checkout/result', {
              state: {
                success: true,
                data: result.data
              }
            });
          }, 2000);
        } else {
          setStatus('failed');
          setMessage(result.error || 'Thanh toán thất bại');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('failed');
        setMessage('Lỗi xác thực thanh toán. Vui lòng liên hệ hỗ trợ.');
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  const getStatusColor = () => {
    switch (status) {
      case 'verifying': return 'text-[#0066FF]';
      case 'success': return 'text-green-500';
      case 'failed': return 'text-red-500';
      default: return 'text-slate-400';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'verifying': return '⏳';
      case 'success': return '✅';
      case 'failed': return '❌';
      default: return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-[#050a14] flex items-center justify-center p-4">
      <Motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-[#0b1222] border border-slate-700/50 rounded-3xl p-10 text-center shadow-2xl">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl ${getStatusColor()}`}>
            {getStatusIcon()}
          </div>

          <h1 className="text-2xl font-black uppercase italic tracking-tighter mb-4">
            Payment Verification
          </h1>

          <p className={`text-sm font-medium italic ${getStatusColor()}`}>
            {message}
          </p>

          {status === 'failed' && (
            <button
              onClick={() => navigate('/')}
              className="mt-8 w-full py-4 bg-[#0066FF] rounded-xl font-black uppercase italic text-[10px] tracking-widest shadow-lg shadow-[#0066FF]/20"
            >
              Back to Cinema
            </button>
          )}

          {status === 'verifying' && (
            <div className="mt-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0066FF]"></div>
            </div>
          )}
        </div>
      </Motion.div>
    </div>
  );
};

export default PaymentReturn;