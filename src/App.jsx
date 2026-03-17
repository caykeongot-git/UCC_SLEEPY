import BookingPage from './pages/BookingPage';

function App() {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      {/* Thanh Header Điều Hướng */}
      <header className="w-full bg-dark-800/90 backdrop-blur-md border-b border-dark-700 py-3 px-6 md:px-8 flex justify-between items-center sticky top-0 z-50 shadow-lg">
        <div className="text-primary-500 font-black text-2xl md:text-3xl tracking-widest uppercase drop-shadow-[0_0_15px_rgba(229,9,20,0.5)] cursor-pointer">
          Ultimate Cinema
        </div>
        
        {/* Thông tin User */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-dark-700 py-1.5 px-3 rounded-full transition-colors duration-300 border border-transparent hover:border-dark-600">
          <div className="text-right hidden sm:block">
            <p className="text-light-500 text-xs">Xin chào,</p>
            <p className="text-light-100 font-bold text-sm leading-tight">Loan</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-full flex items-center justify-center text-white font-bold text-lg border border-dark-900 shadow-[0_0_10px_rgba(229,9,20,0.4)]">
            L
          </div>
        </div>
      </header>

      {/* Nội dung chính của trang */}
      <main className="flex-1">
        <BookingPage />
      </main>
    </div>
  )
}

export default App;