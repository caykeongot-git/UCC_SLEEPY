function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <h1 className="text-primary-500">Cinema Web Setup Complete!</h1>
      <p className="text-light-300">Hệ thống rạp phim chuẩn Design System đã được ốp xong.</p>
      
      <div className="flex gap-4">
        <button className="btn-primary">
          Mua Vé Ngay
        </button>
        <button className="bg-dark-800 text-light-100 px-6 py-2 rounded-md hover:bg-dark-700 transition-all duration-300">
          Xem Chi Tiết
        </button>
      </div>

      <div className="w-64 p-4 bg-dark-800 border border-dark-700 rounded-md">
        <h2 className="text-lg mb-2">Đăng nhập thử</h2>
        <input 
          type="text" 
          placeholder="Tên đăng nhập..." 
          className="w-full input-cinema"
        />
      </div>
    </div>
  )
}

export default App;