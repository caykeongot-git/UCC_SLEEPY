import { X, MapPin, Phone, Clock, Info, Globe, MonitorPlay } from 'lucide-react';

export default function CinemaMapModal({ cinema, onClose, isDarkMode = true }) {
  if (!cinema) return null;

  // Generate Google Maps Embed URL based on name and address for a better pin
  // Using "Address (Name)" format is a known trick to force a red pin marker
  const searchQuery = `${cinema.address} (${cinema.complexName} ${cinema.branchName})`;
  const encodedQuery = encodeURIComponent(searchQuery);
  // hl=vi for Vietnamese, iwloc=A to force the pin/info window
  const mapUrl = `https://maps.google.com/maps?q=${encodedQuery}&hl=vi&t=&z=16&ie=UTF8&iwloc=A&output=embed`;

  // Cinema Logo Helper - Using SVGs for 100% reliability
  const getCinemaLogo = (name) => {
    if (!name) return null;
    const s = name.toLowerCase();
    
    // CGV (using a more stable SVG-like path or clear URL)
    if (s.includes('cgv')) return 'https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png';
    
    // Lotte
    if (s.includes('lotte')) return 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20220%2050%22%3E%3Ctext%20x%3D%2210%22%20y%3D%2235%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22900%22%20fill%3D%22%23ED1C24%22%20font-size%3D%2232%22%3ELOTTE%3C%2Ftext%3E%3Ctext%20x%3D%22115%22%20y%3D%2235%22%20font-family%3D%22Arial%2C%20sans-serif%22%20fill%3D%22%23333%22%20font-size%3D%2232%22%3ECINEMA%3C%2Ftext%3E%3C%2Fsvg%3E';
    
    // BHD
    if (s.includes('bhd')) return 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%2050%22%3E%3Crect%20width%3D%22200%22%20height%3D%2250%22%20fill%3D%22%238CC63F%22%20rx%3D%225%22%20%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%2235%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22bold%22%20fill%3D%22%23FFF%22%20font-size%3D%2230%22%20text-anchor%3D%22middle%22%3EBHD%20STAR%3C%2Ftext%3E%3C%2Fsvg%3E';
    
    // Galaxy
    if (s.includes('galaxy')) return 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20220%2050%22%3E%3Ctext%20x%3D%2210%22%20y%3D%2235%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22bold%22%20fill%3D%22%23F58220%22%20font-size%3D%2232%22%3EGalaxy%3C%2Ftext%3E%3Ctext%20x%3D%22115%22%20y%3D%2235%22%20font-family%3D%22Arial%2C%20sans-serif%22%20fill%3D%22%23333%22%20font-size%3D%2232%22%3ECinema%3C%2Ftext%3E%3C%2Fsvg%3E';
    
    // Mega GS
    if (s.includes('mega gs')) return 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20220%2050%22%3E%3Crect%20width%3D%2250%22%20height%3D%2250%22%20fill%3D%22%23E30613%22%20rx%3D%2210%22%20%2F%3E%3Ctext%20x%3D%2225%22%20y%3D%2238%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22bold%22%20fill%3D%22%23FFF%22%20font-size%3D%2235%22%20text-anchor%3D%22middle%22%3EM%3C%2Ftext%3E%3Ctext%20x%3D%2260%22%20y%3D%2235%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22bold%22%20fill%3D%22%23333%22%20font-size%3D%2228%22%3EMEGA%20GS%3C%2Ftext%3E%3C%2Fsvg%3E';
    
    // Beta
    if (s.includes('beta')) return 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%2050%22%3E%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%2220%22%20fill%3D%22%230054A6%22%20%2F%3E%3Ctext%20x%3D%2225%22%20y%3D%2235%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22bold%22%20fill%3D%22%23FFF%22%20font-size%3D%2225%22%20text-anchor%3D%22middle%22%3EB%3C%2Ftext%3E%3Ctext%20x%3D%2255%22%20y%3D%2235%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22bold%22%20fill%3D%22%230054A6%22%20font-size%3D%2230%22%3EBETA%3C%2Ftext%3E%3C%2Fsvg%3E';
    
    // Cinestar
    if (s.includes('cinestar')) return 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20220%2050%22%3E%3Ctext%20x%3D%2210%22%20y%3D%2235%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22bold%22%20fill%3D%22%23662D91%22%20font-size%3D%2230%22%3ECineStar%3C%2Ftext%3E%3C%2Fsvg%3E';
    
    return null;
  };

  const logoUrl = getCinemaLogo(cinema.complexName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 backdrop-blur-md transition-all duration-500 ${
          isDarkMode ? 'bg-black/60' : 'bg-slate-900/40'
        }`} 
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className={`relative w-full max-w-5xl rounded-[32px] border shadow-2xl transition-all duration-700 overflow-hidden flex flex-col h-[750px] ${
        isDarkMode 
          ? 'bg-slate-900/90 border-white/10 text-white backdrop-blur-3xl' 
          : 'bg-white border-gray-200 text-slate-900 shadow-blue-500/10'
      }`}>
        
        {/* Top Header Bar strictly matching user screenshot */}
        <div className={`m-5 p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
          isDarkMode 
            ? 'bg-white/5 border-white/10 backdrop-blur-xl shadow-xl shadow-black/20' 
            : 'bg-gray-50 border-gray-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-4 flex-1">
            {logoUrl && (
              <div className="h-12 px-5 py-2.5 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-white/10 shadow-inner shrink-0">
                <img src={logoUrl} alt={cinema.complexName} className="h-full w-auto object-contain max-w-[220px]" />
              </div>
            )}
            <h2 className={`text-xl md:text-2xl font-black tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              {cinema.branchName}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className={`p-2.5 rounded-full transition-all hover:scale-110 active:scale-90 ${
              isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden px-5 pb-5 gap-5">
          {/* Left Side: Info & Quick Stats */}
          <div className="w-full md:w-[380px] flex flex-col gap-5 h-full overflow-y-auto pr-1 custom-scrollbar">
            {/* Info Cards */}
            <div className="space-y-4">
              <div className={`p-5 rounded-3xl border transition-all hover:translate-x-1 ${
                isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className={`text-[10px] uppercase font-black tracking-widest mb-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Địa chỉ chi nhánh</h4>
                    <p className="text-sm font-bold leading-snug">{cinema.address}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-5 rounded-3xl border transition-all ${
                  isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'
                }`}>
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-500">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className={`text-[8px] uppercase font-black tracking-widest mb-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Hotline</h4>
                      <p className="text-xs font-bold">{cinema.phone}</p>
                    </div>
                  </div>
                </div>

                <div className={`p-5 rounded-3xl border transition-all ${
                  isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'
                }`}>
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-500">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className={`text-[8px] uppercase font-black tracking-widest mb-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Mở cửa</h4>
                      <p className="text-xs font-bold">{cinema.openingHours || '08:00 - 23:00'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-5 rounded-3xl border transition-all ${
                cinema.status === 'Active' 
                  ? 'bg-green-500/10 border-green-500/30 text-green-500' 
                  : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'
              }`}>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${cinema.status === 'Active' ? 'bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-yellow-500'}`}></span>
                      <span className="text-xs font-black uppercase tracking-widest">Trạng thái rạp</span>
                   </div>
                   <span className="text-xs font-bold">{cinema.status === 'Active' ? 'Hoạt động' : 'Bảo trì'}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => window.open(`https://www.google.com/maps/search/${encodedQuery}`, '_blank')}
              className="mt-auto w-full group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-3xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-900/30 active:scale-95"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Globe size={18} className="relative z-10" />
              <span className="relative z-10">Chỉ đường trên Google Maps</span>
            </button>
          </div>

          {/* Right Side: High-End Map Integration */}
          <div className="flex-1 relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
            {/* Iframe for Map */}
            <iframe 
              src={mapUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className={`w-full h-full grayscale-[5%] brightness-[95%] contrast-[105%] transition-all ${isDarkMode ? 'invert-[90%] hue-rotate-180 opacity-80' : ''}`}
            ></iframe>

            {/* Scale/Compass Overlay (Visual Only) */}
            <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2 pointer-events-none">
               <div className={`p-3 rounded-2xl backdrop-blur-md border ${isDarkMode ? 'bg-slate-900/60 border-white/10' : 'bg-white/60 border-gray-200'}`}>
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center">
                     <span className="text-[10px] font-black">N</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
