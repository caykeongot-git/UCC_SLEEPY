import React from 'react';
import { X, Mail, Phone, User, ShieldCheck } from 'lucide-react';

export default function ManagerProfileModal({ manager, onClose, isDarkMode = true }) {
  if (!manager) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={`relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 ${
        isDarkMode ? 'bg-slate-900 border border-white/10' : 'bg-white border border-gray-200'
      }`}>
        {/* Header/Banner */}
        <div className="h-24 bg-gradient-to-r from-blue-600 to-cyan-500 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-8 pt-0 relative">
          {/* Avatar Area */}
          <div className="flex justify-center -translate-y-12">
            <div className={`p-1 rounded-full ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500/20 shadow-xl relative group">
                {manager.managerAvatar ? (
                  <img 
                    src={manager.managerAvatar} 
                    alt={manager.manager} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white text-3xl font-bold">
                    {manager.manager?.charAt(0)}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <User className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Name & Title */}
          <div className="text-center -mt-8 mb-8">
            <h3 className={`text-2xl font-black italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {manager.manager}
            </h3>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <ShieldCheck size={16} className="text-blue-500" />
              <span className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Người Quản Lý Hệ Thống
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
              isDarkMode 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
            }`}>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Mail size={20} />
              </div>
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-500/80' : 'text-gray-400'}`}>
                  Email Liên Hệ
                </p>
                <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-slate-700'}`}>
                  {manager.managerEmail || 'Chưa cập nhật'}
                </p>
              </div>
            </div>

            <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
              isDarkMode 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
            }`}>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                <Phone size={20} />
              </div>
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-500/80' : 'text-gray-400'}`}>
                  Số Điện Thoại
                </p>
                <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-slate-700'}`}>
                  {manager.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button 
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-lg shadow-blue-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Đóng Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
