/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0B0B0B', // Nền tổng của cả trang web (Đen nhám)
          800: '#1A1A1A', // Nền của mấy cái Card, Header, Footer
          700: '#2A2A2A', // Xài khi hover vô mấy cái card hoặc thẻ
        },
        primary: {
          500: '#E50914', // Đỏ rạp phim (Nút bấm chính)
          600: '#B10610', // Hover chuột vô nút chính
        },
        light: {
          100: '#FFFFFF', // Chữ tiêu đề (Trắng bóc)
          300: '#D1D5DB', // Chữ nội dung bình thường (Xám nhạt)
          500: '#9CA3AF', // Chữ ghi chú, placeholder
        },
        success: '#22C55E', // Xanh lá (Mua vé thành công, ghế trống)
        error: '#EF4444',   // Đỏ (Lỗi, ghế đã có người đặt)
        warning: '#F59E0B', // Vàng (Ghế VIP, cảnh báo)
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'md': '0.375rem', // Bo góc vừa phải theo yêu cầu
      },
      keyframes: {
        seatPop: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        fadeInUp: {
          'from': { opacity: 0, transform: 'translateY(15px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        }
      },
      animation: {
        seatPop: 'seatPop 0.25s ease-out',
        fadeInUp: 'fadeInUp 0.4s ease-out forwards',
      }
    },
  },
  plugins: [],
}