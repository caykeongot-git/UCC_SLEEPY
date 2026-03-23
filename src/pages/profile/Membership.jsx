import { useState } from 'react';
import useAuthStore from '../../store/authStore';
import { Link } from 'react-router-dom';

const Membership = () => {
  const user = useAuthStore(state => state.user);
  const [showTierInfo, setShowTierInfo] = useState(false);

  if (!user) return null;

  const points = user.points || 0;

  // Logic tính toán hạng thẻ
  let tier = 'MEMBER';
  let nextTier = 'GOLD';
  let pointsNeeded = 0;
  let bgGradient = 'from-gray-500 via-gray-700 to-dark-800';
  let textAccent = 'text-gray-300';
  let iconColor = 'text-gray-400';

  if (points >= 1000) {
    tier = 'DIAMOND';
    nextTier = null;
    pointsNeeded = 0;
    bgGradient = 'from-purple-500 via-pink-600 to-purple-900';
    textAccent = 'text-purple-200';
    iconColor = 'text-purple-400';
  } else if (points >= 450) {
    tier = 'PLATINUM';
    nextTier = 'DIAMOND';
    pointsNeeded = 1000 - points;
    bgGradient = 'from-blue-400 via-blue-600 to-indigo-900';
    textAccent = 'text-blue-100';
    iconColor = 'text-blue-400';
  } else if (points >= 200) {
    tier = 'GOLD';
    nextTier = 'PLATINUM';
    pointsNeeded = 450 - points;
    bgGradient = 'from-yellow-400 via-yellow-600 to-yellow-800';
    textAccent = 'text-yellow-100';
    iconColor = 'text-yellow-500';
  } else {
    // MEMBER
    pointsNeeded = 200 - points;
  }

  const privileges = {
    MEMBER: [
      "Đăng ký tài khoản hoàn toàn miễn phí.",
      "Tích lũy 5% giá trị giao dịch vào điểm thưởng."
    ],
    GOLD: [
      "Giảm 10% giá vé khi mua trực tuyến trên toàn hệ thống.",
      "Tặng 1 phần Combo Popcorn siêu lớn vào tháng sinh nhật.",
      "Ưu tiên chọn chỗ ngồi đẹp sớm trước 24h đối với phim Bom Tấn.",
      "Hotline ưu tiên 24/7 dành riêng cho hạng khách VIP."
    ],
    PLATINUM: [
      "Giảm 15% tất cả dịch vụ (Vé + F&B).",
      "Tặng 1 vé xem phim 2D định dạng bất kỳ vào tháng sinh nhật.",
      "Tích lũy 10% giá trị giao dịch.",
      "Hotline ưu tiên 24/7 dành riêng cho hạng khách VIP."
    ],
    DIAMOND: [
      "Sử dụng Phòng chờ VIP lounge miễn phí nước ngọt & snacks.",
      "Tặng 2 vé xem phim IMAX/3D mỗi tháng.",
      "Tích lũy lên đến 15% giá trị giao dịch.",
      "Nhận thiệp mời tham gia Gala Premiere sự kiện ra mắt bom tấn."
    ]
  };

  return (
    <div className="relative min-h-screen bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background elements */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-dark-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-b-2 border-dark-700 pb-4">
          <h1 className="text-3xl font-black text-light-100 uppercase tracking-widest border-l-4 border-yellow-500 pl-4 py-1">Thẻ Thành Viên</h1>
          <Link to="/" className="text-sm font-semibold text-light-500 hover:text-light-100 transition-colors hidden sm:block"> &larr; Quay lại trang chủ</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          
          {/* Cột trái: Thẻ */}
          <div className="lg:col-span-3 relative">
            
            {/* Nút Info Đưa Ra Ngoài Thẻ */}
            <div className="absolute -top-3 -right-3 md:-top-5 md:-right-5 z-20">
               <button 
                  onClick={() => setShowTierInfo(true)}
                  className="hover:scale-110 hover:-translate-y-1 transition-all focus:outline-none drop-shadow-xl"
                  title="Xem quy chế hạng thẻ"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/28/Information.svg" alt="Info" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] bg-white/10" />
               </button>
            </div>

            {/* Membership Card UI */}
            <div className={`relative p-6 sm:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-white overflow-hidden aspect-[1.586/1] w-full max-w-[500px] mx-auto group hover:-translate-y-4 hover:-rotate-1 hover:scale-[1.03] hover:shadow-[0_30px_60px_rgba(0,0,0,0.7)] transition-all duration-500 ease-out cursor-pointer`}>
              {/* Backdrops */}
              <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient}`}></div>
              {/* Ánh sáng chạy chéo khi hover */}
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.0)_0%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0)_100%)] w-[200%] opacity-0 group-hover:opacity-100 -translate-x-[150%] group-hover:translate-x-0 transition-all duration-1000 ease-in-out z-0"></div>
              
              {/* Noise texture overlay */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}}></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className={`text-lg font-black tracking-[0.2em] italic opacity-90 ${textAccent} drop-shadow-md`}>SLEEPY</h2>
                    <p className={`text-[10px] tracking-widest ${textAccent} opacity-80 uppercase`}>Cinema Club</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Decorative chip */}
                    <div className="w-10 h-7 md:w-12 md:h-9 bg-white/20 rounded-md border border-white/30 flex items-center justify-center">
                      <div className="w-6 h-4 md:w-8 md:h-5 border border-white/40 rounded-sm"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="mb-4">
                    <p className="font-mono text-xl tracking-[0.3em] text-white drop-shadow-lg opacity-90">
                      {Math.random().toString().slice(2, 6)} {Math.random().toString().slice(2, 6)} {Math.random().toString().slice(2, 6)} {Math.random().toString().slice(2, 6)}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className={`text-[10px] uppercase ${textAccent} opacity-80 tracking-wider mb-0.5`}>Member Name</p>
                      <h3 className="text-lg font-bold uppercase tracking-widest text-shadow-sm truncate max-w-[150px] sm:max-w-[180px]">{user.fullName}</h3>
                    </div>

                    <div className="flex items-end gap-3 sm:gap-4">
                      {/* Mã QR code quét điểm */}
                      <div className="flex flex-col items-center">
                         <div className="bg-white p-1 rounded-md shadow-md hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-300">
                           <img 
                             src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&color=000&bgcolor=fff&data=${user.email || 'customer'}`} 
                             className="w-10 h-10 sm:w-12 sm:h-12 object-contain mix-blend-multiply" 
                             alt="QR Code" 
                           />
                         </div>
                         <p className={`text-[7px] font-bold mt-1 ${textAccent} opacity-80 tracking-widest`}>QUÉT MÃ</p>
                      </div>

                      <div className="text-right">
                        <p className={`text-[10px] uppercase ${textAccent} opacity-80 tracking-wider mb-0.5`}>Tier</p>
                        <p className="font-black text-xl sm:text-2xl italic tracking-widest drop-shadow-md text-white">{tier}</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Thống kê điểm */}
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-[500px] mx-auto">
              <div className="bg-dark-800 border border-dark-700 p-5 rounded-2xl flex flex-col justify-center items-center">
                <p className="text-light-500 text-xs uppercase tracking-wider mb-2">Điểm Tích Lũy</p>
                <p className={`text-3xl font-black ${iconColor}`}>{points}</p>
              </div>
              <div className="bg-dark-800 border border-dark-700 p-5 rounded-2xl flex flex-col justify-center items-center">
                {nextTier ? (
                  <>
                    <p className="text-light-500 text-xs uppercase tracking-wider mb-2">Cần để lên hạng</p>
                    <p className={`text-3xl font-black text-light-100`}>{pointsNeeded}</p>
                    <p className="text-[10px] text-light-500 mt-1">Lên {nextTier}</p>
                  </>
                ) : (
                  <>
                    <p className="text-light-500 text-xs uppercase tracking-wider mb-2">Hạng Thẻ</p>
                    <p className={`text-2xl mt-1 font-black ${iconColor}`}>TỐI ĐA</p>
                    <p className="text-[10px] text-light-500 mt-1">Bạn đã đạt VIP cao nhất</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Cột phải: Quyền lợi */}
          <div className="lg:col-span-2">
            <div className="bg-dark-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-dark-700 h-full">
              <h4 className="font-bold text-lg mb-6 text-light-100 flex items-center">
                <svg className={`w-5 h-5 mr-2 ${iconColor}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                Đặc Quyền Hạng {tier}
              </h4>
              <ul className="space-y-4">
                {privileges[tier].map((privilege, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-dark-700 ${iconColor} border border-dark-600 flex items-center justify-center mr-3 mt-0.5`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <p className="text-light-300 text-sm leading-relaxed">{privilege}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-dark-700">
                <button className={`w-full bg-dark-700 ${iconColor} hover:text-white hover:bg-dark-600 transition-colors py-3 rounded-lg font-bold text-sm tracking-wider uppercase border border-dark-600 shadow-sm`}>
                  Đổi Quà Bằng Điểm
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Hướng dẫn tính điểm */}
        <div className="mt-8 bg-dark-800/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-dark-700 shadow-md">
          <h4 className="font-bold text-lg mb-6 text-light-100 flex items-center">
            <svg className="w-5 h-5 mr-3 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            CÁCH TÍNH ĐIỂM TÍCH LUỸ
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-light-300">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-dark-700 text-yellow-500 flex items-center justify-center flex-shrink-0 font-black border border-dark-600 shadow-inner">1</div>
              <div>
                <p className="font-bold text-light-100 mb-1.5 uppercase tracking-wide text-xs">Quy đổi từ Giao dịch</p>
                <p className="leading-relaxed">Cộng điểm phần trăm dựa theo <strong className="text-light-100 font-semibold">tổng giá trị hóa đơn</strong> (Vé xem phim hoặc Combo) được thanh toán thành công tại hệ thống Sleepy Cinema.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-dark-700 text-yellow-500 flex items-center justify-center flex-shrink-0 font-black border border-dark-600 shadow-inner">2</div>
              <div>
                <p className="font-bold text-light-100 mb-1.5 uppercase tracking-wide text-xs">Tỷ lệ theo Hạng thẻ</p>
                <p className="leading-relaxed font-mono text-xs">Member: <strong className="text-gray-300">5%</strong> | Gold: <strong className="text-yellow-500">7%</strong><br/>Platinum: <strong className="text-blue-400">10%</strong> | Diamond: <strong className="text-purple-400">15%</strong><br/><span className="text-[10px] text-light-500 italic mt-1 inline-block font-sans">(VD: Thẻ Gold mua 100k đc 7 Điểm Thưởng).</span></p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-dark-700 text-yellow-500 flex items-center justify-center flex-shrink-0 font-black border border-dark-600 shadow-inner">3</div>
              <div>
                <p className="font-bold text-light-100 mb-1.5 uppercase tracking-wide text-xs">Cách đổi điểm thưởng</p>
                <p className="leading-relaxed">Mỗi <strong className="text-yellow-500">1 Điểm = 1,000 VNĐ</strong> dùng để giảm giá trực tiếp vào hóa đơn tiếp theo (không áp dụng đồng thời với Gift Vouchers).</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Thông tin hạng thẻ */}
      {showTierInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowTierInfo(false)}
          ></div>
          <div className="relative bg-dark-800 border border-dark-600 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl animate-[fadeInUp_0.3s_ease-out]">
            <div className="sticky top-0 bg-dark-800/95 backdrop-blur-md p-5 sm:p-6 border-b border-dark-700 flex justify-between items-center z-10 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-black text-light-100 tracking-wider flex items-center">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 mr-3 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                CHÍNH SÁCH HẠNG THẺ
              </h3>
              <button 
                onClick={() => setShowTierInfo(false)} 
                className="text-light-500 hover:text-white bg-dark-700 hover:bg-primary-600 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 shadow-md"
              >
                ✕
              </button>
            </div>
            
            <div className="p-5 sm:p-6 space-y-4 sm:space-y-6 bg-dark-900/40">
               {/* Member Tier */}
               <div className="bg-dark-800 p-4 sm:p-5 rounded-xl border border-dark-600 hover:border-gray-500 transition-colors shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                    <h4 className="text-lg font-bold text-gray-300 mb-2 sm:mb-0">🎟️ MEMBER</h4>
                    <span className="text-xs font-mono bg-dark-700 text-gray-300 px-3 py-1 rounded inline-block w-max border border-gray-600/50">0 - 199 PTS</span>
                  </div>
                  <ul className="text-sm text-light-500 space-y-2 ml-4 list-disc marker:text-gray-500">
                    <li>Đăng ký tài khoản hoàn toàn miễn phí.</li>
                    <li>Tích lũy 5% giá trị giao dịch vào điểm thưởng.</li>
                  </ul>
               </div>

               {/* Gold Tier */}
               <div className="bg-gradient-to-r from-yellow-900/40 to-yellow-600/10 p-4 sm:p-5 rounded-xl border border-yellow-700/50 hover:border-yellow-500 transition-colors shadow-[0_4px_15px_rgba(234,179,8,0.1)]">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                    <h4 className="text-lg font-bold text-yellow-500 mb-2 sm:mb-0 drop-shadow-sm">⭐ GOLD</h4>
                    <span className="text-xs font-mono bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded inline-block w-max border border-yellow-500/30">200 - 449 PTS</span>
                  </div>
                  <ul className="text-sm text-yellow-100/70 space-y-2 ml-4 list-disc marker:text-yellow-500/50">
                    <li><strong className="text-yellow-200/90">Giảm 10%</strong> giá vé khi mua trực tuyến.</li>
                    <li>Tặng 1 phần Combo Popcorn siêu lớn vào tháng sinh nhật.</li>
                    <li>Tích lũy 7% giá trị giao dịch.</li>
                  </ul>
               </div>

               {/* Platinum Tier */}
               <div className="bg-gradient-to-r from-blue-900/40 to-blue-600/10 p-4 sm:p-5 rounded-xl border border-blue-700/50 hover:border-blue-400 transition-colors shadow-[0_4px_15px_rgba(59,130,246,0.1)]">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                    <h4 className="text-lg font-bold text-blue-400 mb-2 sm:mb-0 drop-shadow-sm">💎 PLATINUM</h4>
                    <span className="text-xs font-mono bg-blue-500/20 text-blue-300 px-3 py-1 rounded inline-block w-max border border-blue-400/30">450 - 999 PTS</span>
                  </div>
                  <ul className="text-sm text-blue-100/70 space-y-2 ml-4 list-disc marker:text-blue-500/50">
                    <li><strong className="text-blue-200/90">Giảm 15%</strong> tất cả dịch vụ (Vé + F&B).</li>
                    <li>Tặng 1 vé xem phim 2D định dạng bất kỳ vào tháng sinh nhật.</li>
                    <li>Tích lũy 10% giá trị giao dịch.</li>
                  </ul>
               </div>

               {/* Diamond Tier */}
               <div className="bg-gradient-to-r from-purple-900/50 to-pink-600/10 p-4 sm:p-5 rounded-xl border border-purple-500/50 hover:border-purple-400 transition-colors shadow-[0_4px_25px_rgba(168,85,247,0.15)]">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                    <h4 className="text-lg font-black text-purple-400 drop-shadow-md mb-2 sm:mb-0">👑 DIAMOND</h4>
                    <span className="text-xs font-mono bg-purple-500/30 text-purple-200 px-3 py-1 rounded inline-block w-max border border-purple-400/40 shadow-sm">1000+ PTS</span>
                  </div>
                  <ul className="text-sm text-purple-100/80 space-y-2 ml-4 list-disc marker:text-purple-500/70">
                    <li>Sử dụng <strong className="text-purple-200/90">Phòng chờ VIP lounge</strong> miễn phí nước ngọt & snacks.</li>
                    <li>Tặng 2 vé xem phim IMAX/3D mỗi tháng.</li>
                    <li>Tích lũy lên đến 15% giá trị giao dịch.</li>
                    <li>Nhận thiệp mời tham gia Gala Premiere sự kiện ra mắt bom tấn.</li>
                  </ul>
               </div>
            </div>
            {/* Modal Footer (Optional, useful for spacing) */}
            <div className="h-6 bg-dark-900/40 rounded-b-2xl"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Membership;