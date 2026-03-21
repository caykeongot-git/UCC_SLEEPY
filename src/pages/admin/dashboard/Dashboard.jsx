import React, { useState, useEffect } from 'react';
import { RevenueChart, OccupancyChart } from './RevenueChart';
import IoTMonitoring from './IoTMonitoring';
import { ShoppingCart, Users, Film, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { apiService } from '../../../services/apiService';
import { cn } from '../../../utils/cn';

const StatCard = ({ title, value, icon: Icon, trend, color, loading }) => {
  const isPositive = trend > 0;
  
  const colorMap = {
    blue: 'from-blue-600/20 to-primary-500/5 text-primary-500 border-primary-500/20',
    emerald: 'from-emerald-600/20 to-emerald-500/5 text-emerald-400 border-emerald-500/20',
    orange: 'from-orange-600/20 to-orange-500/5 text-orange-400 border-orange-500/20',
    purple: 'from-purple-600/20 to-purple-500/5 text-purple-400 border-purple-500/20',
  };

  return (
    <div className="relative group overflow-hidden bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl hover:bg-white/[0.04] transition-all duration-500 hover:border-white/[0.1] hover:-translate-y-1">
      {/* Background Glow */}
      <div className={cn("absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-current", color === 'blue' ? 'text-primary-500' : 'text-' + color + '-500')}></div>
      
      <div className="flex items-start justify-between relative z-10">
        <div className={cn("p-3 rounded-xl bg-gradient-to-br border shadow-inner", colorMap[color])}>
          <Icon size={22} className="group-hover:scale-110 transition-transform duration-500" />
        </div>
        
        {trend && !loading && (
          <div className={cn(
            "flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-black border backdrop-blur-md transition-all",
            isPositive 
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
              : "bg-error/10 text-error border-error/20"
          )}>
            {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      <div className="mt-6 relative z-10">
        <p className="text-dark-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 opacity-70 group-hover:opacity-100 transition-opacity">{title}</p>
        <div className="flex items-baseline space-x-2">
          {loading ? (
            <div className="h-9 w-32 bg-white/[0.03] rounded-lg animate-pulse"></div>
          ) : (
            <>
              <h3 className="text-3xl font-black text-light-100 tracking-tighter leading-none">{value}</h3>
              <Activity size={14} className="text-dark-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </div>
        
        {/* Sparkline Simulation (Static for now, but looks premium) */}
        <div className="mt-4 h-1 w-full bg-dark-800 rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full transition-all duration-1000 bg-current", color === 'blue' ? 'text-primary-500' : 'text-' + color + '-400')}
            style={{ width: loading ? '0%' : (isPositive ? '75%' : '45%') }}
          ></div>
        </div>
      </div>
    </div>
  );
};

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
    <div className="space-y-12 animate-fadeInUp">
      {/* Header with Glassmorphism */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10B981]"></div>
            <span className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase">Hệ thống đang hoạt động</span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
            Trung tâm <span className="text-primary-500">Điều hành</span>
          </h2>
          <p className="text-light-500 text-sm font-medium tracking-tight max-w-lg">
            Quản lý tập trung toàn bộ dữ liệu kinh doanh và hệ thống rạp Cinema Quantum.
          </p>
        </div>
        
        <div className="flex items-center p-1.5 bg-white/[0.03] border border-white/[0.05] rounded-2xl backdrop-blur-xl">
          {['24H', '7D', '30D', 'YTD'].map((period, i) => (
            <button 
              key={period}
              className={cn(
                "px-6 py-2.5 text-[10px] font-black tracking-widest uppercase transition-all duration-300 rounded-xl",
                i === 0 
                  ? "bg-primary-500 text-white shadow-[0_4px_15px_rgba(14,165,233,0.3)]" 
                  : "text-dark-500 hover:text-light-300"
              )}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid - High Density */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Doanh thu tổng" 
          value={stats?.revenue} 
          icon={TrendingUp} 
          trend={stats?.trends.revenue} 
          color="blue" 
          loading={loading}
        />
        <StatCard 
          title="Khách hàng" 
          value={stats?.customers} 
          icon={Users} 
          trend={stats?.trends.customers} 
          color="orange" 
          loading={loading}
        />
        <StatCard 
          title="Vé đã phát hành" 
          value={stats?.tickets} 
          icon={ShoppingCart} 
          trend={stats?.trends.tickets} 
          color="emerald" 
          loading={loading}
        />
        <StatCard 
          title="Năng suất rạp" 
          value={stats?.movies} 
          icon={Film} 
          color="purple" 
          loading={loading}
        />
      </div>

      {/* Analytical Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          <RevenueChart />
        </div>
        <div className="group relative">
           <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
           <OccupancyChart />
        </div>
      </div>

      {/* IoT Sub-System */}
      <div className="pt-4">
        <IoTMonitoring />
      </div>
    </div>
  );
};

export default Dashboard;
