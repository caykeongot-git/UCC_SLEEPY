import React from 'react';
import { useNavigate } from 'react-router-dom';
import SeatMatrix from './SeatMatrix';
import FoodAndBeverage from './FoodAndBeverage';
import ShowtimeSelector from './ShowtimeSelector';
import { useBookingStore } from './useBookingStore';

const Stepper = () => {
  const step = useBookingStore(s => s.step);
  const steps = [
    { id: 'SEAT', title: 'Chọn Ghế' },
    { id: 'FNB', title: 'Chọn Bắp Nước' },
  ];
  const finalStepTitle = 'Thanh Toán';

  const currentStepIndex = steps.findIndex(s => s.id === step);

  return (
    <div className="flex items-center w-full mb-10">
      {steps.map((s, index) => (
        <React.Fragment key={s.id}>
          <div className="flex flex-col items-center text-center">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300 ${
                index <= currentStepIndex
                  ? 'border-primary-500 bg-primary-500/20 text-primary-500'
                  : 'border-dark-700 text-light-500'
              }`}
            >
              {index < currentStepIndex ? '✓' : `0${index + 1}`}
            </div>
            <p className={`mt-2 text-xs md:text-sm font-semibold transition-colors duration-300 ${index <= currentStepIndex ? 'text-light-100' : 'text-light-500'}`}>{s.title}</p>
          </div>
          <div
            className={`flex-1 h-1 mx-2 md:mx-4 rounded transition-colors duration-500 ${
              index < currentStepIndex ? 'bg-primary-500' : 'bg-dark-700'
            }`}
          />
        </React.Fragment>
      ))}
      <div className="flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300 border-dark-700 text-light-500">
          03
        </div>
        <p className="mt-2 text-xs md:text-sm font-semibold text-light-500">{finalStepTitle}</p>
      </div>
    </div>
  );
};

export default function BookingPage() {
  const navigate = useNavigate();
  const { 
    selectedMovie, 
    selectedCinema, 
    selectedDate, 
    selectedShowtime, 
    selectedSeats, 
    fbItems, 
    step, 
    setStep,
    checkout,
    loading
  } = useBookingStore();

  const seatsTotal = selectedSeats.reduce((sum, seat) => sum + (seat.price || 0), 0);
  const fbTotal = Object.values(fbItems).reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalAmount = seatsTotal + fbTotal;

  const mName = selectedMovie ? (selectedMovie.title || selectedMovie.name) : 'Chưa chọn phim';
  const cName = selectedCinema ? (selectedCinema.name || `Cinema ${selectedCinema.id}`) : 'Chưa chọn';
  const sTime = selectedShowtime ? (selectedShowtime.startTime || selectedShowtime.time) : '';

  const handleFinalCheckout = async () => {
    if (!selectedShowtime) {
      alert("Vui lòng kích hoạt lại Suất chiếu hợp lệ!"); return;
    }
    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất 1 ghế trước khi thanh toán!"); return;
    }
    
    // Gọi Checkout thông qua Zustand Store
    const isSuccess = await checkout('VNPay');
    if (isSuccess) {
       alert(`THANH TOÁN THÀNH CÔNG!\nTổng hóa đơn: ${totalAmount.toLocaleString()}đ.\nMã Vé điện tử sẽ được cập nhật trong Email hoặc Hồ Sơ của bạn.`);
       navigate('/profile');
    }
  };

  const handleNextStep = () => {
    if (step === 'SEAT') {
      if (selectedSeats.length === 0) {
        alert("Vui lòng chọn ít nhất 1 ghế!");
        return;
      }
      setStep('FNB');
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 max-w-7xl mx-auto">
      <ShowtimeSelector />
      <Stepper />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col">
          <div key={step} className="animate-fadeInUp">
            {step === 'SEAT' && <SeatMatrix />}
            {step === 'FNB' && <FoodAndBeverage />}
          </div>

          <div className="flex justify-between items-center mt-8">
            {step === 'FNB' && (
              <button onClick={() => setStep('SEAT')} className="bg-dark-800 text-light-300 px-6 py-3 rounded-md border border-dark-700 hover:bg-dark-700 hover:border-light-500 transition-all duration-300 font-semibold">
                &larr; Quay lại chọn ghế
              </button>
            )}
            {step === 'SEAT' && (
              <button onClick={handleNextStep} disabled={selectedSeats.length === 0} className="btn-primary ml-auto px-8 py-3 text-base font-semibold disabled:bg-dark-700 disabled:text-light-500 disabled:cursor-not-allowed">
                Tiếp tục: Chọn bắp nước &rarr;
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-dark-800 p-6 rounded-xl sticky top-6 border border-dark-700 shadow-2xl overflow-hidden">
            <h2 className="border-b border-dark-700 pb-4 mb-4">Tóm tắt đơn hàng</h2>

            <div className="flex gap-4 mb-6">
              <div 
                className="w-16 h-24 bg-dark-700 rounded-md bg-cover bg-center border border-dark-700 shadow-md"
                style={{ backgroundImage: `url(${selectedMovie?.posterUrl || selectedMovie?.image || "https://placehold.co/100x150/2A2A2A/FFFFFF?text=Poster"})`}}
              ></div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg text-light-100 mb-2 leading-tight">{mName}</h3>
                <div><span className="text-xs font-bold px-2 py-1 bg-primary-500/20 text-primary-500 rounded-sm border border-primary-500/30">{selectedMovie?.format || '2D / IMAX'}</span></div>
              </div>
            </div>

            <div className="mb-6 bg-dark-900 p-4 rounded-md border border-dark-700">
              <p className="text-light-500 text-sm">Rạp: <strong className="text-primary-500">{cName}</strong></p>
              <p className="text-light-500 text-sm mt-1">Lịch: <strong className="text-light-100">{selectedDate || 'Chưa chọn'} {sTime ? `| ${sTime}` : ''}</strong></p>
            </div>
            
            <div className="mb-4">
              <span className="text-light-500">Ghế đã chọn: </span>
              <span className="font-bold text-light-100">
                {selectedSeats.length > 0 ? selectedSeats.map(s => s.name || s.id).join(', ') : 'Chưa chọn ghế'}
              </span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="text-light-300">Tiền vé:</span>
              <span className="font-semibold">{seatsTotal.toLocaleString()}đ</span>
            </div>
            
            <div className="flex justify-between mb-8 pb-8 border-b-2 border-dashed border-dark-600 relative">
              <div className="absolute -left-9 -bottom-4 w-8 h-8 bg-dark-900 rounded-full border-r border-dark-700"></div>
              <div className="absolute -right-9 -bottom-4 w-8 h-8 bg-dark-900 rounded-full border-l border-dark-700"></div>
              <span className="text-light-300">Tiền F&B:</span>
              <span className="font-semibold">{fbTotal.toLocaleString()}đ</span>
            </div>

            <div className="flex justify-between mb-8 items-center">
              <span className="text-light-100 text-lg font-bold uppercase">Tổng cộng:</span>
              <span className="text-primary-500 text-2xl md:text-3xl font-bold">{totalAmount.toLocaleString()}đ</span>
            </div>

            <button 
              onClick={handleFinalCheckout} 
              disabled={loading || selectedSeats.length === 0}
              className="btn-primary w-full py-4 text-lg font-bold uppercase tracking-wider rounded-xl shadow-[0_10px_20px_-10px_rgba(229,9,20,0.5)] hover:shadow-[0_15px_25px_-10px_rgba(229,9,20,0.6)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Đang Xử Lý Giao Dịch...' : 'Xác Nhận Thanh Toán'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}