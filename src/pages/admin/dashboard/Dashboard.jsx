import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { RevenueChart, OccupancyChart } from './RevenueChart';
import IoTMonitoring from './IoTMonitoring';
import { ShoppingCart, Users, Film, TrendingUp } from 'lucide-react';
import { apiService } from '../../../services/apiService';

const StatCard = ({ title, value, icon: Icon, trend, color, loading }) => (
  <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 shadow-xl group hover:border-primary-500/30 transition-all">
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-md bg-${color}-500/10 text-${color}-500`}>
        <Icon size={24} />
      </div>
      {trend && !loading && (
        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
          +{trend}%
        </span>
      )}
    </div>
    <div className="mt-4">
      <p className="text-light-500 text-[10px] font-bold uppercase tracking-[0.2em]">{title}</p>
      {loading ? (
        <div className="h-8 w-24 bg-dark-700 rounded animate-pulse mt-1"></div>
      ) : (
        <p className="text-2xl font-black text-light-100 mt-1">{value}</p>
      )}
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getDashboardStats().then(res => {
      setStats(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-10 animate-fadeInUp">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-light-100 tracking-tight italic uppercase">Hệ thống quản trị</h2>
          <p className="text-light-500 text-sm font-medium mt-1">Dữ liệu tổng hợp từ các cụm rạp (Kết nối Backend).</p>
        </div>
        <div className="flex items-center space-x-3 bg-dark-800 p-1.5 rounded-lg border border-dark-700">
          <button className="px-4 py-2 text-xs font-bold text-white bg-primary-500 rounded-md shadow-lg shadow-primary-500/20">Hôm nay</button>
          <button className="px-4 py-2 text-xs font-bold text-light-500 hover:text-light-100 transition-colors">7 ngày qua</button>
          <button className="px-4 py-2 text-xs font-bold text-light-500 hover:text-light-100 transition-colors">30 ngày qua</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Tổng doanh thu" 
          value={stats?.revenue} 
          icon={TrendingUp} 
          trend={stats?.trends.revenue} 
          color="blue" 
          loading={loading}
        />
        <StatCard 
          title="Vé đã bán" 
          value={stats?.tickets} 
          icon={ShoppingCart} 
          trend={stats?.trends.tickets} 
          color="emerald" 
          loading={loading}
        />
        <StatCard 
          title="Khách hàng mới" 
          value={stats?.customers} 
          icon={Users} 
          trend={stats?.trends.customers} 
          color="orange" 
          loading={loading}
        />
        <StatCard 
          title="Phim đang chiếu" 
          value={stats?.movies} 
          icon={Film} 
          color="purple" 
          loading={loading}
        />
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
