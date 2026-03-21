import React from 'react';
import Sidebar from './Sidebar';
import { Bell, Search, Settings, Command } from 'lucide-react';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#070A13] font-sans selection:bg-primary-500/30">
      {/* Premium Sidebar Overlay Effect */}
      <Sidebar />
      
      <div className="flex-grow relative flex flex-col">
        {/* Artistic Background Accent */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        {/* Global Action Bar */}
        <header className="h-20 bg-dark-900/20 backdrop-blur-3xl border-b border-white/[0.03] px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-6">
            <div className="relative group w-[400px]">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="text-dark-500 group-focus-within:text-primary-500 transition-colors" size={17} />
              </div>
              <input 
                type="text" 
                placeholder="Tìm kiếm báo cáo, thiết bị hoặc lệnh (Cmd + K)..."
                className="w-full pl-12 pr-12 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-sm text-light-100 placeholder:text-dark-500 focus:bg-white/[0.05] focus:border-primary-500/30 outline-none transition-all duration-500"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <div className="px-1.5 py-0.5 bg-dark-800 border border-dark-700 rounded text-[10px] font-black text-dark-500 flex items-center gap-1">
                  <Command size={10} /> K
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-3 text-light-500 hover:text-primary-500 hover:bg-primary-500/10 rounded-xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-primary-500 rounded-full ring-2 ring-dark-900 animate-ping"></span>
              <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-primary-500 rounded-full ring-2 ring-dark-900"></span>
            </button>
            <button className="p-3 text-light-500 hover:text-light-100 hover:bg-white/5 rounded-xl transition-all">
              <Settings size={20} />
            </button>
            <div className="w-[1px] h-8 bg-white/[0.05] mx-4"></div>
            <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.05] px-4 py-2 rounded-xl cursor-not-allowed">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-[10px] font-black text-emerald-400">
                LIVE
              </div>
              <p className="text-[10px] font-black tracking-[0.1em] text-light-500">API: <span className="text-emerald-400">STABLE</span></p>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="p-10 max-w-screen-2xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
