import React from 'react';
import { 
  LayoutDashboard, 
  Film, 
  Monitor, 
  Users, 
  Settings, 
  LogOut, 
  ChevronRight,
  TrendingUp,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../utils/cn';

const menuGroups = [
  {
    title: 'Hệ thống',
    items: [
      { icon: LayoutDashboard, label: 'Tổng quan', path: '/admin/dashboard', active: true },
      { icon: Monitor, label: 'Giám sát IoT', path: '/admin/iot' },
    ]
  },
  {
    title: 'Quản lý',
    items: [
      { icon: Film, label: 'Phim & Lịch chiếu', path: '/admin/movies' },
      { icon: CreditCard, label: 'Giao dịch', path: '/admin/transactions' },
      { icon: Users, label: 'Người dùng', path: '/admin/users' },
    ]
  },
  {
    title: 'Cấu hình',
    items: [
      { icon: Settings, label: 'Cài đặt hệ thống', path: '/admin/settings' },
      { icon: ShieldCheck, label: 'Bảo mật', path: '/admin/security' },
    ]
  }
];

const Sidebar = () => {
  return (
    <aside className="w-72 h-screen sticky top-0 bg-[#0B0F1A] border-r border-dark-700/50 flex flex-col shadow-2xl z-50">
      {/* Brand Logo */}
      <div className="p-8 flex items-center space-x-4">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-blue-600 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center border border-dark-700">
            <Film className="text-primary-500" size={22} />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-black text-light-100 text-lg tracking-tighter uppercase italic">Cinema</span>
          <span className="text-[10px] text-primary-500 font-bold tracking-[0.3em] uppercase -mt-1 opacity-80">Quantum</span>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-grow overflow-y-auto px-4 py-4 space-y-8 scrollbar-hide">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-3">
            <h4 className="px-4 text-[10px] font-black text-dark-500 uppercase tracking-[0.2em] opacity-50">
              {group.title}
            </h4>
            <div className="space-y-1">
              {group.items.map((item, idx) => (
                <a
                  key={idx}
                  href={item.path}
                  className={cn(
                    "relative flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-500 group overflow-hidden",
                    item.active 
                      ? "bg-primary-500/10 text-primary-500 border border-primary-500/20 shadow-[0_0_20px_rgba(14,165,233,0.1)]" 
                      : "text-light-500 hover:bg-white/5 hover:text-light-100"
                  )}
                >
                  {item.active && (
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary-500 rounded-full shadow-[0_0_10px_#0EA5E9]"></div>
                  )}
                  <div className="flex items-center space-x-3">
                    <item.icon size={20} className={cn(
                      "transition-transform duration-500 group-hover:scale-110",
                      item.active ? "text-primary-500" : "text-light-500"
                    )} />
                    <span className="font-bold text-sm tracking-tight">{item.label}</span>
                  </div>
                  {item.active && (
                    <div className="bg-primary-500/20 p-1 rounded-full animate-pulse">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* User Quick Access */}
      <div className="p-6 bg-dark-900/50 border-t border-dark-700/30">
        <div className="flex items-center p-3 rounded-2xl bg-dark-800/50 border border-dark-700/50 group cursor-pointer hover:bg-dark-800 transition-all">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-sm opacity-20"></div>
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Avatar" 
              className="w-10 h-10 rounded-full border border-dark-600 group-hover:border-emerald-500 transition-all"
            />
          </div>
          <div className="ml-3 flex-grow overflow-hidden">
            <p className="text-xs font-black text-light-100 truncate">AN NINH</p>
            <p className="text-[9px] text-light-500 font-bold truncate uppercase tracking-tighter">Super Administrator</p>
          </div>
          <LogOut size={16} className="text-light-700 group-hover:text-error transition-colors" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
