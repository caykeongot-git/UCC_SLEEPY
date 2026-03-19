import { useState, useEffect } from 'react';
import { X, Building } from 'lucide-react';

export default function CinemaFormModal({ cinema, onClose, onSave, isDarkMode = true }) {
  const [formData, setFormData] = useState({
    complexName: '',
    branchName: '',
    address: '',
    phone: '',
    status: 'Active',
    openingHours: ''
  });

  useEffect(() => {
    if (cinema) {
      setFormData(cinema);
    }
  }, [cinema]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={`absolute inset-0 backdrop-blur-md transition-colors ${isDarkMode ? 'bg-black/80' : 'bg-slate-900/40'}`} onClick={onClose}></div>
      <div className={`relative w-full max-w-md rounded-2xl border shadow-2xl transition-all duration-500 overflow-hidden ${
        isDarkMode ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-gray-200 text-slate-900'
      }`}>
        <div className={`p-6 border-b flex justify-between items-center transition-colors ${
          isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-gray-50'
        }`}>
          <h2 className={`text-xl font-bold flex items-center gap-2 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <Building className="text-purple-600" />
            {cinema ? 'Chỉnh sửa Cụm Rạp' : 'Thêm Cụm Rạp Mới'}
          </h2>
          <button 
            onClick={onClose}
            className={`p-2 rounded-full transition-colors focus:outline-none ${isDarkMode ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tên Cụm Rạp <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="complexName"
                required
                value={formData.complexName}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-300 text-slate-900 placeholder-gray-400 focus:bg-white'
                }`}
                placeholder="VD: CGV, Lotte, BHD..."
                list="complex-names"
              />
              <datalist id="complex-names">
                <option value="CGV" />
                <option value="Lotte Cinema" />
                <option value="BHD Star" />
                <option value="Galaxy Cinema" />
                <option value="CineStar" />
                <option value="Mega GS" />
                <option value="Beta Cinemas" />
              </datalist>
            </div>
            
            <div>
              <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tên Chi Nhánh <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="branchName"
                required
                value={formData.branchName}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-300 text-slate-900 placeholder-gray-400 focus:bg-white'
                }`}
                placeholder="VD: CGV Vincom Center Landmark 81"
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Địa chỉ đầy đủ <span className="text-red-500">*</span></label>
            <textarea 
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              rows="2"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors resize-none ${
                isDarkMode 
                  ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                  : 'bg-gray-50 border-gray-300 text-slate-900 placeholder-gray-400 focus:bg-white'
              }`}
              placeholder="Nhập địa chỉ của chi nhánh..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Người Quản Lý <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="manager"
                required
                value={formData.manager}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-300 text-slate-900 placeholder-gray-400 focus:bg-white'
                }`}
                placeholder="Tên người quản lý"
              />
            </div>
            <div>
              <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Số Điện Thoại <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                    : 'bg-gray-50 border-gray-300 text-slate-900 placeholder-gray-400 focus:bg-white'
                }`}
                placeholder="VD: 1900 6017"
              />
            </div>
            <div>
              <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Trạng thái <span className="text-red-500">*</span></label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors appearance-none ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/10 text-white' 
                      : 'bg-gray-50 border-gray-300 text-slate-900 focus:bg-white'
                  }`}
              >
                <option value="Active" className={isDarkMode ? 'bg-slate-800' : 'bg-white'}>Hoạt động</option>
                <option value="Maintenance" className={isDarkMode ? 'bg-slate-800' : 'bg-white'}>Bảo trì / Đóng cửa</option>
              </select>
            </div>
          </div>

          <div className="mt-5">
            <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Giờ Mở/Đóng Cửa <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="openingHours"
              required
              value={formData.openingHours}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors ${
                isDarkMode 
                  ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                  : 'bg-gray-50 border-gray-300 text-slate-900 placeholder-gray-400 focus:bg-white'
              }`}
              placeholder="VD: 08:30 - 23:30"
            />
          </div>

          <div className={`mt-8 pt-6 border-t flex justify-end gap-3 flex-wrap transition-colors ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
            <button 
              type="button" 
              onClick={onClose}
              className={`px-6 py-2.5 border rounded-lg font-bold transition-all w-full sm:w-auto ${
                isDarkMode 
                  ? 'border-white/20 text-gray-300 hover:bg-white/10 hover:text-white' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Hủy Bỏ
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md shadow-purple-500/30 font-bold transition-all w-full sm:w-auto transform hover:-translate-y-0.5"
            >
              {cinema ? 'Lưu Thay Đổi' : 'Thêm Chi Nhánh Mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
