import React from 'react';
import Sidebar from './Sidebar';
import { Bell, Search, UserCircle } from 'lucide-react';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-dark-900">
      <Sidebar />
      <div className="flex-grow">
        {/* Topbar */}
        <header className="h-20 bg-dark-800 border-b border-dark-700 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-light-500" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm báo cáo, thiết bị..."
              className="w-full pl-10 pr-4 py-2 bg-dark-900 border-none rounded-md text-sm text-light-100 focus:ring-1 focus:ring-primary-500 outline-none"
            />
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-light-500 hover:text-primary-500 transition-colors">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full ring-2 ring-dark-800"></span>
            </button>
            <div className="h-10 w-[1px] bg-dark-700"></div>
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-light-100 leading-none">An Ninh</p>
                <p className="text-[10px] text-primary-500 font-bold tracking-widest uppercase mt-1">Lead Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-dark-700 border border-dark-600 flex items-center justify-center overflow-hidden group-hover:border-primary-500 transition-all">
                <UserCircle className="text-light-500" size={28} />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
