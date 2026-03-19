import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, MonitorPlay, Building2 } from 'lucide-react';

export default function RoomAdminTable({ rooms, cinemas = [], filterCinemaId = 'all', onFilterChange, onEdit, onDelete, onAdd, isDarkMode = true }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          room.cinemaName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCinema = filterCinemaId === 'all' || room.cinemaId.toString() === filterCinemaId.toString();
    return matchesSearch && matchesCinema;
  });

  // Create a map for cinema names for easier lookup
  const cinemaMap = cinemas.reduce((acc, cinema) => {
    acc[cinema.id] = cinema.branchName;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className={`rounded-xl shadow-2xl overflow-hidden border transition-all duration-500 ${
        isDarkMode ? 'bg-white/10 backdrop-blur-xl border-white/10' : 'bg-white border-gray-200'
      }`}>
        <div className={`p-6 border-b flex flex-col md:flex-row justify-between items-center gap-4 transition-colors ${
          isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-gray-50'
        }`}>
          <div>
            <h2 className={`text-xl font-bold flex items-center gap-2 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              <MonitorPlay className={isDarkMode ? 'text-indigo-400' : 'text-blue-600'} />
              Bảng dữ liệu Phòng Chiếu
            </h2>
            <p className={`text-sm mt-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Quản lý sơ đồ ghế và thông tin cài đặt phòng chiếu</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto flex-wrap md:flex-nowrap">
            {cinemas && cinemas.length > 0 && (
              <div className="relative w-full md:w-48">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select 
                  value={filterCinemaId} 
                  onChange={(e) => onFilterChange && onFilterChange(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all appearance-none cursor-pointer ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/20 text-white' 
                      : 'bg-white border-gray-300 text-slate-900 shadow-sm'
                  }`}
                >
                  <option value="all">Tất cả Cụm Rạp</option>
                  {cinemas.map(c => (
                    <option key={c.id} value={c.id.toString()} className={isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-slate-900'}>{c.branchName}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm kiếm phòng chiếu..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400 shadow-sm'
                }`}
              />
            </div>
            <button 
              onClick={onAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shrink-0 text-sm font-medium shadow-lg shadow-blue-900/20"
            >
              <Plus size={18} />
              Thêm Phòng
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-xs uppercase tracking-wider transition-colors ${
                isDarkMode ? 'bg-white/5 text-gray-300 border-white/10' : 'bg-gray-100 text-slate-500 border-gray-200'
              }`}>
                <th className="p-4 font-bold">Phòng Chiếu</th>
                <th className="p-4 font-bold">Thuộc Cụm Rạp</th>
                <th className="p-4 font-bold text-center">Định dạng (Hàng × Cột)</th>
                <th className="p-4 font-bold text-center">Tổng Số Ghế</th>
                <th className="p-4 font-bold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className={`divide-y transition-colors ${isDarkMode ? 'divide-white/5' : 'divide-gray-100'}`}>
              {filteredRooms.length === 0 ? (
                <tr>
                  <td colSpan="5" className={`p-12 text-center transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Không tìm thấy dữ liệu phòng chiếu.
                  </td>
                </tr>
              ) : (
                filteredRooms.map(room => (
                  <tr key={room.id} className={`transition-colors group ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-blue-50'}`}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded flex items-center justify-center font-bold shadow-inner border transition-colors ${
                          isDarkMode ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/20' : 'bg-indigo-100 text-indigo-600 border-indigo-200'
                        }`}>
                          {room.name.charAt(0)}
                        </div>
                        <span className={`font-bold text-sm transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{room.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`font-medium transition-colors ${isDarkMode ? 'text-gray-200 bg-white/10 px-3 py-1 rounded-full text-xs border border-white/5' : 'text-slate-700 bg-gray-100 px-3 py-1 rounded-full text-xs border border-gray-200'}`}>
                        {room.cinemaName}
                      </span>
                    </td>
                    <td className={`p-4 text-center transition-colors ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                      <span className={`px-2 py-1 rounded-md text-xs font-mono transition-colors ${
                        isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-100 border border-gray-200'
                      }`}>
                        {room.rows} × {room.columns}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                        isDarkMode ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-blue-50 text-blue-600 border border-blue-100'
                      }`}>
                        {room.totalSeats} Ghế
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => onEdit(room)}
                          className={`p-2 text-gray-400 hover:text-indigo-600 rounded-lg transition-colors border border-transparent ${
                            isDarkMode ? 'hover:bg-indigo-500/20 hover:border-indigo-500/20' : 'hover:bg-indigo-50 hover:border-indigo-100'
                          }`}
                          title="Cấu hình sơ đồ ghế / Sửa"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm(`Bạn có chắc chắn muốn xóa phòng chiếu ${room.name}?`)) {
                              onDelete(room.id);
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className={`p-4 border-t text-right text-xs font-medium transition-colors ${
          isDarkMode ? 'border-white/10 bg-white/5 text-gray-400' : 'border-gray-100 bg-gray-50 text-slate-500'
        }`}>
          Hiển thị <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>{filteredRooms.length}</strong> phòng chiếu
        </div>
      </div>
    </div>
  );
}
