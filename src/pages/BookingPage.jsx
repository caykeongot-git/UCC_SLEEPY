import React from 'react';
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
      {/* Final Step */}
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
  const { cinema, date, showtime, selectedSeats, fbItems, step, setStep } = useBookingStore();

  // Tính toán tổng tiền
  const seatsTotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const fbTotal = Object.values(fbItems).reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalAmount = seatsTotal + fbTotal;

  const handleFinalCheckout = () => {
    if (!cinema || !date || !showtime) {
      alert("Vui lòng chọn đầy đủ Rạp, Ngày và Suất chiếu!");
      return;
    }
    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất 1 ghế trước khi thanh toán!");
      return;
    }
    alert(`Tiến hành thanh toán tổng cộng: ${totalAmount.toLocaleString()}đ`);
    // Gọi API thanh toán hoặc Redirect sang route thanh toán ở đây
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
      
      {/* Step 1: Flow chọn lịch chiếu */}
      <ShowtimeSelector />

      {/* Stepper để thể hiện các bước */}
      <Stepper />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cột trái: Nội dung thay đổi theo step */}
        <div className="lg:col-span-2 flex flex-col">
          {/* Dùng key để React unmount/remount component, tạo hiệu ứng animation vào */}
          <div key={step} className="animate-fadeInUp">
            {step === 'SEAT' && <SeatMatrix />}
            {step === 'FNB' && <FoodAndBeverage />}
          </div>

          {/* Nút điều hướng giữa các bước */}
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

        {/* Cột phải: Summary & Checkout */}
        <div className="lg:col-span-1">
          <div className="bg-dark-800 p-6 rounded-xl sticky top-6 border border-dark-700 shadow-2xl overflow-hidden">
            <h2 className="border-b border-dark-700 pb-4 mb-4">Tóm tắt đơn hàng</h2>

            {/* Fake Movie Info */}
            <div className="flex gap-4 mb-6">
              <div className="w-16 h-24 bg-dark-700 rounded-md bg-[url('https://placehold.co/100x150/2A2A2A/FFFFFF?text=Poster')] bg-cover bg-center border border-dark-700 shadow-md"></div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg text-light-100 mb-2 leading-tight">Sleepy Cinema: Sự Trỗi Dậy</h3>
                <div><span className="text-xs font-bold px-2 py-1 bg-primary-500/20 text-primary-500 rounded-sm border border-primary-500/30">2D Phụ Đề</span></div>
              </div>
            </div>

            {/* Realtime State: Lịch chiếu */}
            <div className="mb-6 bg-dark-900 p-4 rounded-md border border-dark-700">
              <p className="text-light-500 text-sm">Rạp: <strong className="text-primary-500">{cinema || 'Chưa chọn'}</strong></p>
              <p className="text-light-500 text-sm mt-1">Thời gian: <strong className="text-light-100">{showtime ? `${showtime} | ${date}` : 'Chưa chọn'}</strong></p>
            </div>
            
            <div className="mb-4">
              <span className="text-light-500">Ghế đã chọn: </span>
              <span className="font-bold text-light-100">
                {selectedSeats.length > 0 ? selectedSeats.map(s => s.id).join(', ') : 'Chưa chọn ghế'}
              </span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="text-light-300">Tiền vé:</span>
              <span className="font-semibold">{seatsTotal.toLocaleString()}đ</span>
            </div>
            
            <div className="flex justify-between mb-8 pb-8 border-b-2 border-dashed border-dark-600 relative">
              {/* 2 Lỗ khoét 2 bên tạo cảm giác vé giấy */}
              <div className="absolute -left-9 -bottom-4 w-8 h-8 bg-dark-900 rounded-full border-r border-dark-700"></div>
              <div className="absolute -right-9 -bottom-4 w-8 h-8 bg-dark-900 rounded-full border-l border-dark-700"></div>
              <span className="text-light-300">Tiền F&B:</span>
              <span className="font-semibold">{fbTotal.toLocaleString()}đ</span>
            </div>

            <div className="flex justify-between mb-8 items-center">
              <span className="text-light-100 text-lg font-bold uppercase">Tổng cộng:</span>
              <span className="text-primary-500 text-3xl font-bold">{totalAmount.toLocaleString()}đ</span>
            </div>

            <button onClick={handleFinalCheckout} className="btn-primary w-full py-4 text-lg font-bold uppercase tracking-wider rounded-xl shadow-[0_10px_20px_-10px_rgba(229,9,20,0.5)] hover:shadow-[0_15px_25px_-10px_rgba(229,9,20,0.6)] hover:-translate-y-1">
              Thanh Toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}