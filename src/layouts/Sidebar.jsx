import React from 'react';
import { 
  LayoutDashboard, 
  Film, 
  Monitor, 
  Users, 
  Settings, 
  LogOut, 
  ChevronRight
} from 'lucide-react';
import { cn } from '../utils/cn';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard', active: true },
  { icon: Film, label: 'Lịch chiếu', path: '/admin/movies' },
  { icon: Monitor, label: 'Giám sát IoT', path: '/admin/iot' },
  { icon: Users, label: 'Người dùng', path: '/admin/users' },
  { icon: Settings, label: 'Cài đặt', path: '/admin/settings' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen sticky top-0 bg-dark-800 border-r border-dark-700 flex flex-col">
      <div className="p-6 flex items-center space-x-3 border-b border-dark-700">
        <div className="w-10 h-10 bg-primary-500 rounded-md flex items-center justify-center shadow-lg shadow-primary-500/20">
          <Film className="text-white" size={20} />
        </div>
        <span className="font-bold text-light-100 text-lg">Cinema Admin</span>
      </div>

      <nav className="flex-grow p-4 space-y-2 mt-4">
        {menuItems.map((item, idx) => (
          <a
            key={idx}
            href={item.path}
            className={cn(
              "flex items-center justify-between p-3 rounded-md transition-all duration-300 group",
              item.active 
                ? "bg-primary-500/10 text-primary-500" 
                : "text-light-500 hover:bg-dark-700 hover:text-light-100"
            )}
          >
            <div className="flex items-center space-x-3">
              <item.icon size={20} className={cn(
                item.active ? "text-primary-500" : "text-light-500 group-hover:text-light-100"
              )} />
              <span className="font-semibold text-sm">{item.label}</span>
            </div>
            {item.active && <ChevronRight size={16} />}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-dark-700">
        <button className="flex items-center space-x-3 w-full p-3 text-light-500 hover:text-error hover:bg-error/10 rounded-md transition-all">
          <LogOut size={20} />
          <span className="font-bold text-sm">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
