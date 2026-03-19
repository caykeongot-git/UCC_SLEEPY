import { useState, useEffect } from 'react';
import { X, Coffee } from 'lucide-react';

export default function FnbFormModal({ fnb, onClose, onSave, isDarkMode = true }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    image: '',
  });

  useEffect(() => {
    if (fnb) {
      setFormData({
        name: fnb.name,
        category: fnb.category || 'combo',
        description: fnb.description,
        price: fnb.price,
        image: fnb.image,
      });
    }
  }, [fnb]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numValue = name === 'price' ? (parseInt(value, 10) || 0) : value;
    setFormData(prev => ({ ...prev, [name]: numValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={`absolute inset-0 backdrop-blur-md transition-colors ${isDarkMode ? 'bg-black/80' : 'bg-slate-900/40'}`} onClick={onClose}></div>
      <div className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl transition-all duration-500 overflow-hidden animate-in fade-in zoom-in duration-200 ${
        isDarkMode ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-gray-200 text-slate-900'
      }`}>
        <div className={`p-6 border-b flex justify-between items-center transition-colors shrink-0 rounded-t-2xl ${
          isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-gray-50'
        }`}>
          <h2 className={`text-xl font-bold flex items-center gap-2 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            <Coffee className="text-amber-600" />
            {fnb ? 'Cập nhật Combo F&B' : 'Thêm Combo Mới'}
          </h2>
          <button 
            onClick={onClose}
            className={`p-2 rounded-full transition-colors focus:outline-none ${isDarkMode ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-1">
          <form id="fnb-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tên Combo/Đồ Ăn <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 transition-colors ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400 focus:bg-white'
                  }`}
                  placeholder="VD: Nước Suối Dasani"
                />
              </div>

              <div>
                <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Danh mục <span className="text-red-500">*</span></label>
                <select 
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 transition-colors appearance-none ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/10 text-white' 
                      : 'bg-white border-gray-300 text-slate-900 focus:bg-white'
                  }`}
                >
                  <option value="" disabled className={isDarkMode ? 'bg-slate-800' : 'bg-white'}>-- Cần chọn phân loại --</option>
                  <option value="drink" className={isDarkMode ? 'bg-slate-800' : 'bg-white'}>Nước Uống</option>
                  <option value="combo" className={isDarkMode ? 'bg-slate-800' : 'bg-white'}>Combo Bắp Nước</option>
                  <option value="snack" className={isDarkMode ? 'bg-slate-800' : 'bg-white'}>Snacks - Kẹo</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Mô tả sản phẩm <span className="text-red-500">*</span></label>
                <textarea 
                  name="description"
                  required
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 transition-colors resize-none ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400 focus:bg-white'
                  }`}
                  placeholder="VD: 1 Bắp lớn (Ngọt/Mặn) + 2 Nước ngọt lớn"
                ></textarea>
              </div>

              <div>
                <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Giá bán (VNĐ) <span className="text-red-500">*</span></label>
                <input 
                  type="number" 
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 transition-colors font-medium ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 text-amber-700 placeholder-gray-400 focus:bg-white'
                  }`}
                  placeholder="VD: 105000"
                />
              </div>

              <div>
                <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Hình ảnh (URL) <span className="text-red-500">*</span></label>
                <input 
                  type="url" 
                  name="image"
                  required
                  value={formData.image}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 transition-colors ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400 focus:bg-white'
                  }`}
                  placeholder="https://example.com/image.png"
                />
                
                {formData.image && (
                  <div className="mt-4 border border-gray-200 rounded-lg p-2 bg-gray-50 inline-block">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="h-32 w-auto object-contain bg-white rounded shadow-sm"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Invalid+Image'; }}
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className={`p-6 border-t flex justify-end gap-3 shrink-0 rounded-b-2xl transition-colors ${
          isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-gray-50'
        }`}>
          <button 
            type="button" 
            onClick={onClose}
            className={`px-6 py-2.5 border rounded-lg font-bold transition-all ${
              isDarkMode 
                ? 'border-white/20 text-gray-300 hover:bg-white/10 hover:text-white' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Hủy bỏ
          </button>
          <button 
            type="submit"
            form="fnb-form"
            className="px-6 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-transform transform hover:-translate-y-0.5 shadow-md shadow-amber-500/30 font-bold flex items-center gap-2"
          >
            <Coffee size={18} />
            {fnb ? 'Cập nhật Combo' : 'Thêm Combo'}
          </button>
        </div>
      </div>
    </div>
  );
}
