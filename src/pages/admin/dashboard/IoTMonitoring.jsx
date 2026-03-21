import React, { useState, useEffect } from 'react';
import { Thermometer, Monitor, Power, AlertCircle, CheckCircle2, Activity, Cpu, Database } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { apiService } from '../../../services/apiService';

const DeviceCard = ({ name, type, status, value, unit }) => {
  const isOnline = status === 'active';
  
  return (
    <div className={cn(
      "relative p-6 rounded-2xl border transition-all duration-500 group overflow-hidden shadow-2xl backdrop-blur-md",
      isOnline 
        ? "bg-white/[0.03] border-white/[0.05] hover:border-primary-500/30 hover:bg-white/[0.05]" 
        : "bg-error/5 border-error/20 grayscale pointer-events-none opacity-60"
    )}>
      {/* Decorative Glow */}
      <div className={cn(
        "absolute -right-10 -bottom-10 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-1000",
        type === 'temp' ? "bg-orange-500" : "bg-primary-500"
      )}></div>

      <div className="flex items-center justify-between mb-8">
        <div className={cn(
          "p-3 rounded-xl border shadow-inner transition-transform duration-500 group-hover:scale-110",
          type === 'temp' 
            ? "bg-orange-600/10 border-orange-500/20 text-orange-400" 
            : "bg-primary-600/10 border-primary-500/20 text-primary-400"
        )}>
          {type === 'temp' ? <Thermometer size={22} /> : <Monitor size={22} />}
        </div>
        
        <div className={cn(
          "flex items-center space-x-2 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all",
          isOnline 
            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
            : "bg-error/10 text-error border-error/20"
        )}>
           <div className={cn("w-1.5 h-1.5 rounded-full", isOnline ? "bg-emerald-400 animate-pulse" : "bg-error")}></div>
           <span>{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-dark-500 text-[9px] font-black uppercase tracking-[0.3em] mb-1 opacity-70 group-hover:opacity-100 transition-opacity">{name}</h4>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-black text-white tracking-tighter tabular-nums leading-none">
              {value}
            </p>
            <span className="text-xs font-bold text-dark-500 uppercase tracking-widest italic">{unit}</span>
          </div>
        </div>

        {/* Realtime Terminal Effect */}
        <div className="bg-black/40 rounded-lg p-2.5 font-mono text-[9px] text-emerald-500/60 flex items-center justify-between border border-white/5">
           <div className="flex items-center gap-2">
             <Activity size={10} className="animate-pulse" />
             <span className="opacity-80">STABLE_FEED</span>
           </div>
           <span className="font-bold opacity-100 italic">{isOnline ? '200_OK' : 'ERR_404'}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.05]">
        <button className={cn(
          "p-2.5 rounded-xl transition-all duration-300",
          isOnline ? "bg-white/[0.03] text-dark-500 hover:text-primary-500 hover:bg-primary-500/10 border border-transparent hover:border-primary-500/20 shadow-lg" : "text-dark-700 cursor-not-allowed"
        )}>
          <Power size={18} />
        </button>
        <div className="flex items-center gap-2 text-[10px] font-black text-dark-600 uppercase tracking-widest italic group-hover:text-primary-500/40 transition-colors">
          <Database size={10} />
          <span>UUID: {Math.floor(Math.random() * 9000) + 1000}</span>
        </div>
      </div>
    </div>
  );
};

const IoTMonitoring = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getIoTDevices().then(res => {
      setDevices(res);
      setLoading(false);
    });

    const interval = setInterval(() => {
      setDevices(prev => prev.map(d => 
        d.type === 'temp' && d.status === 'active'
          ? { ...d, value: parseFloat((d.value + (Math.random() * 0.4 - 0.2)).toFixed(1)) }
          : d
      ));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.05] pb-6 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="p-1.5 bg-primary-500/10 rounded-lg border border-primary-500/20 text-primary-500">
                <Cpu size={16} />
             </div>
             <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white">Quản lý thiết bị IoT</h3>
          </div>
          <p className="text-xs text-dark-500 font-medium tracking-tight">Giám sát thông số kỹ thuật thời gian thực của máy móc và môi trường rạp.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-emerald-500/5 px-4 py-2.5 rounded-xl border border-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.05)] animate-pulse">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Dữ liệu đã đồng bộ</span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
            {[...Array(4)].map((_, i) => (
               <div key={i} className="h-64 bg-white/[0.02] border border-white/[0.05] rounded-2xl animate-pulse"></div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-1">
          {devices.map(device => (
            <DeviceCard key={device.id} {...device} />
          ))}
        </div>
      )}
    </div>
  );
};

export default IoTMonitoring;
