import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, MapPin, Building2, MonitorPlay, UserSquare2 } from 'lucide-react';
import ManagerProfileModal from './ManagerProfileModal';

export default function CinemaAdminTable({ cinemas, onEdit, onDelete, onAdd, onViewRooms, onViewMap, isDarkMode = true }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManager, setSelectedManager] = useState(null);

  const filteredCinemas = cinemas.filter(cinema => 
    cinema.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cinema.complexName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cinema.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCinemaLogo = (name) => {
    const logos = {
      'CGV': 'https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png',
      'Lotte Cinema': 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%2050%22%3E%3Ctext%20x%3D%2210%22%20y%3D%2235%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22900%22%20fill%3D%22%23ED1C24%22%20font-size%3D%2232%22%3ELOTTE%3C%2Ftext%3E%3Ctext%20x%3D%22115%22%20y%3D%2235%22%20font-family%3D%22Arial%2C%20sans-serif%22%20fill%3D%22%23555%22%20font-size%3D%2232%22%3ECINEMA%3C%2Ftext%3E%3C%2Fsvg%3E',
      'BHD Star': 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%2050%22%3E%3Crect%20width%3D%22200%22%20height%3D%2250%22%20fill%3D%22%238CC63F%22%20rx%3D%225%22%20%2F%3E%3Ctext%20x%3D%22100%22%20y%3D%2235%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22bold%22%20font-style%3D%22italic%22%20fill%3D%22%23FFF%22%20font-size%3D%2232%22%20text-anchor%3D%22middle%22%3EBHD%20STAR%3C%2Ftext%3E%3C%2Fsvg%3E',
      'Galaxy Cinema': 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%2050%22%3E%3Ctext%20x%3D%2210%22%20y%3D%2235%22%20font-family%3D%22Arial%2C%20sans-serif%22%20font-weight%3D%22bold%22%20fill%3D%22%23F58220%22%20font-size%3D%2232%22%3EGalaxy%3C%2Ftext%3E%3Ctext%20x%3D%22115%22%20y%3D%2235%22%20font-family%3D%22Arial%2C%20sans-serif%22%20fill%3D%22%23555%22%20font-size%3D%2232%22%3ECinema%3C%2Ftext%3E%3C%2Fsvg%3E',
      'Beta Cinemas': 'https://betacinemas.vn/Assets/Common/logo/logo.png',
      'CineStar': 'https://cinestar.com.vn/assets/images/header-logo.png',
      'Mega GS': 'https://megagscinemas.vn/Images/mega-gs-logo.png'
    };
    return logos[name] || null;
  };

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
              <Building2 className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
              Bảng dữ liệu Cụm Rạp
            </h2>
            <p className={`text-sm mt-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Quản lý thêm, sửa, xóa thông tin chi nhánh và cụm rạp</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm kiếm rạp hoặc địa chỉ..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition-all ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400 shadow-sm'
                }`}
              />
            </div>
            <button 
              onClick={onAdd}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shrink-0 text-sm font-medium shadow-lg shadow-cyan-900/20"
            >
              <Plus size={18} />
              Thêm Rạp
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-xs uppercase tracking-wider transition-colors ${
                isDarkMode ? 'bg-white/5 text-gray-300 border-white/10' : 'bg-gray-100 text-slate-500 border-gray-200'
              }`}>
                <th className="p-4 font-bold">Cụm Rạp</th>
                <th className="p-4 font-bold">Tên Chi Nhánh & Địa Chỉ</th>
                <th className="p-4 font-bold">Người Quản Lý</th>
                <th className="p-4 font-bold text-center">Số Phòng</th>
                <th className="p-4 font-bold">Giờ Mở Cửa</th>
                <th className="p-4 font-bold text-center">Trạng Thái</th>
                <th className="p-4 font-bold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className={`divide-y transition-colors ${isDarkMode ? 'divide-white/5' : 'divide-gray-100'}`}>
              {filteredCinemas.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-gray-400">
                    Không tìm thấy dữ liệu.
                  </td>
                </tr>
              ) : (
                filteredCinemas.map(cinema => (
                  <tr key={cinema.id} className={`transition-colors group ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-blue-50'}`}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {getCinemaLogo(cinema.complexName) ? (
                          <div className="w-12 h-12 rounded bg-white border border-gray-100 flex items-center justify-center p-1 shadow-sm shrink-0">
                            <img 
                              src={getCinemaLogo(cinema.complexName)} 
                              alt={cinema.complexName}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded bg-gray-100 border border-gray-200 flex items-center justify-center shadow-sm shrink-0">
                            <span className="text-xs font-bold text-gray-500 text-center leading-tight">
                              {cinema.complexName.substring(0, 4).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <span className={`font-bold text-sm hidden sm:block transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                          {cinema.complexName}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 max-w-sm">
                      <div className={`font-bold mb-1 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{cinema.branchName}</div>
                      <div className={`text-xs flex items-start gap-1 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} title={cinema.address}>
                        <MapPin size={14} className={`shrink-0 mt-0.5 transition-colors ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`} />
                        <span className={`line-clamp-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>{cinema.address}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => setSelectedManager(cinema)}
                        className={`group/manager flex items-center gap-2 font-medium transition-all px-2 py-1 rounded-lg border border-transparent ${
                          isDarkMode 
                            ? 'text-gray-200 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/20' 
                            : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100'
                        }`}
                        title="Xem Profile Người Quản Lý"
                      >
                        <UserSquare2 size={16} className={`transition-transform group-hover/manager:scale-110 ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`} />
                        <span className="border-b border-dotted border-current group-hover/manager:border-solid">
                          {cinema.manager}
                        </span>
                      </button>
                    </td>
                    <td className={`p-4 text-center font-black transition-colors ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {cinema.roomCount || 0}
                    </td>
                    <td className={`p-4 text-xs font-medium transition-colors ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                      {cinema.openingHours || 'Chưa cập nhật'}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        cinema.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {cinema.status === 'Active' ? 'Hoạt động' : 'Bảo trì'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        {onViewRooms && (
                          <button 
                            onClick={() => onViewRooms(cinema.id)}
                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100 flex items-center gap-1"
                            title="Xem Phòng Chiếu"
                          >
                            <MonitorPlay size={16} />
                          </button>
                        )}
                        <button 
                          onClick={() => onEdit(cinema)}
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors border border-transparent hover:border-purple-100"
                          title="Sửa"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                           onClick={() => onViewMap(cinema)}
                           className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                           title="Xem Bản Đồ & Thông Tin"
                        >
                           <MapPin size={16} />
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm(`Bạn có chắc chắn muốn xóa rạp ${cinema.branchName}?`)) {
                              onDelete(cinema.id);
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
          Hiển thị <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>{filteredCinemas.length}</strong> kết quả
        </div>
      </div>
      {/* Manager Profile Modal */}
      <ManagerProfileModal 
        manager={selectedManager}
        onClose={() => setSelectedManager(null)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
