import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { apiService } from '../../../services/apiService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

export const RevenueChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getRevenueData().then(res => {
      setData({
        labels: res.map(item => item.theater),
        datasets: [
          {
            label: 'Doanh thu',
            data: res.map(item => item.amount),
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, '#0EA5E9');
              gradient.addColorStop(1, 'rgba(14, 165, 233, 0.1)');
              return gradient;
            },
            borderRadius: 8,
            hoverBackgroundColor: '#38BDF8',
          },
        ],
      });
      setLoading(false);
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleFont: { size: 12, weight: 'bold', family: 'Inter' },
        bodyFont: { size: 12, family: 'Inter' },
        padding: 12,
        cornerRadius: 12,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        displayColors: false,
      }
    },
    scales: {
      y: { 
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false }, 
        ticks: { color: '#64748B', font: { size: 10, weight: 'bold' }, padding: 10 } 
      },
      x: { 
        grid: { display: false }, 
        ticks: { color: '#64748B', font: { size: 10, weight: 'bold' }, padding: 10 } 
      },
    },
  };

  return (
    <div className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-2xl shadow-2xl backdrop-blur-md relative h-[450px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-light-100">Báo cáo doanh thu</h3>
          <p className="text-[10px] text-dark-500 font-bold uppercase mt-1 italic">Dữ liệu tính theo triệu VNĐ</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary-500 shadow-[0_0_10px_#0EA5E9]"></div>
          <span className="text-[10px] font-black text-light-300 uppercase tracking-widest">Toàn hệ thống</span>
        </div>
      </div>
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="h-full pb-16">
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export const OccupancyChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getOccupancyData().then(res => {
      setData({
        labels: res.map(item => item.movie),
        datasets: [
          {
            data: res.map(item => item.rate),
            backgroundColor: ['#0EA5E9', '#10B981', '#F59E0B', '#EF4444'],
            hoverBackgroundColor: ['#38BDF8', '#34D399', '#FBBF24', '#F87171'],
            borderWidth: 0,
            hoverOffset: 20
          },
        ],
      });
      setLoading(false);
    });
  }, []);

  const options = {
    plugins: {
      legend: { 
        position: 'bottom',
        labels: { 
          color: '#94A3B8', 
          font: { size: 10, weight: 'bold' }, 
          padding: 20, 
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        cornerRadius: 12,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      }
    },
    cutout: '82%',
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-2xl shadow-2xl backdrop-blur-md h-[450px] flex flex-col">
       <div className="mb-8">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-light-100">Tỷ lệ lấp đầy</h3>
          <p className="text-[10px] text-dark-500 font-bold uppercase mt-1 italic">Top 4 phim ăn khách</p>
        </div>
      {loading ? (
        <div className="flex-grow flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="relative flex-grow pb-4">
          <Doughnut data={data} options={options} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <p className="text-[10px] font-black text-dark-500 uppercase tracking-[0.2em] mb-1">Avg</p>
            <p className="text-3xl font-black text-white leading-none">82<span className="text-xs">%</span></p>
          </div>
        </div>
      )}
    </div>
  );
};
