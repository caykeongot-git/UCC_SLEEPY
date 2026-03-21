import React from 'react';
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
  const data = {
    labels: ['Rạp Hùng Vương', 'Rạp Thủ Đức', 'Rạp Landmark 81', 'Rạp Aeon Mall', 'Rạp Crescent Mall'],
    datasets: [
      {
        label: 'Doanh thu (Triệu VNĐ)',
        data: [450, 620, 850, 580, 720],
        backgroundColor: '#0EA5E9',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'DOANH THU THEO CỤM RẠP',
        color: '#F8FAFC',
        font: { size: 14, weight: 'bold', family: 'Inter' },
        padding: 20,
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleColor: '#F8FAFC',
        bodyColor: '#CBD5E1',
        borderColor: '#334155',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        grid: { color: '#334155' },
        ticks: { color: '#94A3B8' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94A3B8' }
      },
    },
  };

  return (
    <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 shadow-xl">
      <Bar data={data} options={options} />
    </div>
  );
};

export const OccupancyChart = () => {
  const data = {
    labels: ['Ghostbusters', 'Dune: Part Two', 'Godzilla x Kong', 'Exhuma'],
    datasets: [
      {
        data: [75, 92, 68, 85],
        backgroundColor: ['#0EA5E9', '#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 0,
        hoverOffset: 15
      },
    ],
  };

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

  return (
    <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 shadow-xl flex flex-col items-center">
      <div className="w-full max-w-[240px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};
