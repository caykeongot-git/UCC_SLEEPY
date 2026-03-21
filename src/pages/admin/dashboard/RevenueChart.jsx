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
            label: 'Doanh thu (Triệu VNĐ)',
            data: res.map(item => item.amount),
            backgroundColor: '#0EA5E9',
            borderRadius: 4,
          },
        ],
      });
      setLoading(false);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'DOANH THU THEO CỤM RẠP (DỮ LIỆU TỪ BACKEND)',
        color: '#F8FAFC',
        font: { size: 14, weight: 'bold', family: 'Inter' },
        padding: 20,
      },
    },
    scales: {
      y: { grid: { color: '#334155' }, ticks: { color: '#94A3B8' } },
      x: { grid: { display: false }, ticks: { color: '#94A3B8' } },
    },
  };

  if (loading) return <div className="h-64 flex items-center justify-center text-light-500 font-bold animate-pulse">ĐANG TẢI DỮ LIỆU...</div>;

  return (
    <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 shadow-xl">
      <Bar data={data} options={options} />
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
            borderWidth: 0,
            hoverOffset: 15
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
        labels: { color: '#CBD5E1', font: { size: 11, weight: 'bold' }, padding: 20 }
      },
      title: {
        display: true,
        text: 'TỶ LỆ LẤP ĐẦY',
        color: '#F8FAFC',
        font: { size: 14, weight: 'bold' },
        padding: 10,
      },
    },
    cutout: '75%',
  };

  if (loading) return <div className="h-64 flex items-center justify-center text-light-500 font-bold animate-pulse">...</div>;

  return (
    <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 shadow-xl flex flex-col items-center">
      <div className="w-full max-w-[240px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};
