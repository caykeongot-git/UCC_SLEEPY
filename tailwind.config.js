/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0F172A', // Nền tổng (Xanh đen sẫm mát mẻ - Slate 900)
          800: '#1E293B', // Nền Card, Header, Footer (Slate 800)
          700: '#334155', // Hover (Slate 700)
        },
        primary: {
          500: '#0EA5E9', // Xanh da trời (Nút bấm chính - Sky 500)
          600: '#0284C7', // Hover nút chính (Sky 600)
        },
        light: {
          100: '#F8FAFC', // Tiêu đề (Trắng ánh xanh nhạt)
          300: '#CBD5E1', // Chữ nội dung (Xám xanh - Slate 300)
          500: '#94A3B8', // Ghi chú, placeholder (Slate 400)
        },
        success: '#10B981', // Xanh lá cây ngọc (Emerald 500)
        error: '#EF4444',   // Đỏ (Vẫn giữ đỏ cho lỗi)
        warning: '#F59E0B', // Vàng (Cảnh báo)
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