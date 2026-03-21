import React from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { RevenueChart, OccupancyChart } from './RevenueChart';
import IoTMonitoring from './IoTMonitoring';
import { ShoppingCart, Users, Film, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 shadow-xl group hover:border-primary-500/30 transition-all">
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-md bg-${color}-500/10 text-${color}-500`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
          +{trend}%
        </span>
      )}
    </div>
    <div className="mt-4">
      <p className="text-light-500 text-[10px] font-bold uppercase tracking-[0.2em]">{title}</p>
      <p className="text-2xl font-black text-light-100 mt-1">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-10 animate-fadeInUp">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-light-100 tracking-tight italic uppercase">Hệ thống quản trị</h2>
          <p className="text-light-500 text-sm font-medium mt-1">Dữ liệu tổng hợp từ 5 cụm rạp trên toàn hệ thống.</p>
        </div>
        <div className="flex items-center space-x-3 bg-dark-800 p-1.5 rounded-lg border border-dark-700">
          <button className="px-4 py-2 text-xs font-bold text-white bg-primary-500 rounded-md shadow-lg shadow-primary-500/20">Hôm nay</button>
          <button className="px-4 py-2 text-xs font-bold text-light-500 hover:text-light-100 transition-colors">7 ngày qua</button>
          <button className="px-4 py-2 text-xs font-bold text-light-500 hover:text-light-100 transition-colors">30 ngày qua</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tổng doanh thu" value="2.84B" icon={TrendingUp} trend="12" color="blue" />
        <StatCard title="Vé đã bán" value="12,450" icon={ShoppingCart} trend="8" color="emerald" />
        <StatCard title="Khách hàng mới" value="+1,204" icon={Users} trend="15" color="orange" />
        <StatCard title="Phim đang chiếu" value="18" icon={Film} color="purple" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <OccupancyChart />
        </div>
      </div>

      {/* IoT Section */}
      <IoTMonitoring />
    </div>
  );
};

export default Dashboard;
