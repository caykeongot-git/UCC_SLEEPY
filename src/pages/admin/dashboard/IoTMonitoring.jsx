import React, { useState, useEffect } from 'react';
import { Thermometer, Monitor, Power, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { apiService } from '../../../services/apiService';

const DeviceCard = ({ name, type, status, value, unit }) => {
  const isOnline = status === 'active';
  
  return (
    <div className="p-5 bg-dark-800 rounded-lg border border-dark-700 shadow-lg group hover:border-primary-500/50 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className={cn(
          "p-3 rounded-md",
          type === 'temp' ? "bg-orange-500/10 text-orange-500" : "bg-blue-500/10 text-blue-500"
        )}>
          {type === 'temp' ? <Thermometer size={24} /> : <Monitor size={24} />}
        </div>
        <div className={cn(
          "flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
          isOnline ? "bg-emerald-500/20 text-emerald-400" : "bg-error/20 text-error"
        )}>
          {isOnline ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
          <span>{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>
      
      <div className="mt-6 flex items-end justify-between">
        <div>
          <h4 className="text-light-500 text-[10px] font-bold uppercase tracking-widest">{name}</h4>
          <p className="text-3xl font-black text-light-100 mt-1">
            {value}<span className="text-xs font-medium text-light-500 ml-1">{unit}</span>
          </p>
        </div>
        <button className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-all",
          isOnline ? "bg-dark-900 border border-dark-600 text-light-300 hover:text-white hover:border-primary-500" : "bg-dark-700 text-dark-600 pointer-events-none"
        )}>
          <Power size={18} />
        </button>
      </div>
    </div>
  );
};

const IoTMonitoring = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy dữ liệu khởi tạo từ Backend
    apiService.getIoTDevices().then(res => {
      setDevices(res);
      setLoading(false);
    });

    // Giữ hiệu ứng giả lập realtime sau khi có dữ liệu từ backend
    const interval = setInterval(() => {
      setDevices(prev => prev.map(d => 
        d.type === 'temp' && d.status === 'active'
          ? { ...d, value: parseFloat((d.value + (Math.random() * 0.4 - 0.2)).toFixed(1)) }
          : d
      ));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="h-48 flex items-center justify-center text-light-500 font-bold italic animate-pulse">ĐANG KIỂM TRA TRẠNG THÁI THIẾT BỊ...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-dark-700 pb-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-light-100">Giám sát hệ thống IoT (Dữ liệu Backend)</h3>
        <span className="text-[10px] font-bold text-primary-500 uppercase tracking-widest bg-primary-500/10 px-3 py-1 rounded-full animate-pulse">Live Update</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {devices.map(device => (
          <DeviceCard key={device.id} {...device} />
        ))}
      </div>
    </div>
  );
};

export default IoTMonitoring;
