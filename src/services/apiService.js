/**
 * API Service - Quản lý các yêu cầu HTTP tới Backend.
 * Hiện tại sử dụng URL placeholder, AE sau này thay đổi vào file .env
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Lỗi không xác định' }));
    throw new Error(error.message || 'Yêu cầu thất bại');
  }
  return response.json();
};

export const apiService = {
  // Thống kê doanh thu
  getRevenueData: async () => {
    // Trong môi trường thực tế sẽ gọi: return fetch(`${API_BASE_URL}/stats/revenue`).then(handleResponse);
    // Tạm thời giả lập fetch để đảm bảo luồng không bị lỗi nếu chưa có backend
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { theater: 'Rạp Hùng Vương', amount: 450 },
          { theater: 'Rạp Thủ Đức', amount: 620 },
          { theater: 'Rạp Landmark 81', amount: 850 },
          { theater: 'Rạp Aeon Mall', amount: 580 },
          { theater: 'Rạp Crescent Mall', amount: 720 },
        ]);
      }, 1000);
    });
  },

  // Thống kê tỷ lệ lấp đầy
  getOccupancyData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { movie: 'Ghostbusters', rate: 75 },
          { movie: 'Dune: Part Two', rate: 92 },
          { movie: 'Godzilla x Kong', rate: 68 },
          { movie: 'Exhuma', rate: 85 },
        ]);
      }, 800);
    });
  },

  // Dữ liệu thiết bị IoT
  getIoTDevices: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Phòng chiếu 01', type: 'temp', status: 'active', value: 24.5, unit: '°C' },
          { id: 2, name: 'Phòng chiếu 02', type: 'temp', status: 'active', value: 23.8, unit: '°C' },
          { id: 3, name: 'Máy chiếu P01', type: 'projector', status: 'active', value: '4K', unit: 'Status' },
          { id: 4, name: 'Máy chiếu P02', type: 'projector', status: 'offline', value: '-', unit: 'Err' },
        ]);
      }, 500);
    });
  },

  // Thống kê tổng hợp (Cards)
  getDashboardStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          revenue: '2.84B',
          tickets: '12,450',
          customers: '1,204',
          movies: '18',
          trends: { revenue: 12, tickets: 8, customers: 15 }
        });
      }, 1200);
    });
  }
};
