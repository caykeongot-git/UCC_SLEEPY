import { useState, useRef, useEffect } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

export default function MovieFormModal({ movie, onClose, onSave, isDarkMode = true }) {
  const [formData, setFormData] = useState({
    title: '',
    releaseDate: '',
    rating: '0%',
    description: '',
    ageRating: 'P',
    duration: '',
    genre: '',
    status: 'Now Showing',
    format: '2D',
    country: 'Việt Nam',
    poster: ''
  });
  
  const [previewImage, setPreviewImage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (movie) {
      setFormData(movie);
      setPreviewImage(movie.poster);
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData(prev => ({ ...prev, poster: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={`absolute inset-0 backdrop-blur-md transition-colors ${isDarkMode ? 'bg-black/80' : 'bg-slate-900/40'}`} onClick={onClose}></div>
      <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl transition-all duration-500 ${
        isDarkMode ? 'bg-slate-900/95 border-white/10 text-white' : 'bg-white border-gray-200 text-slate-900'
      }`}>
        <div className={`p-6 border-b flex justify-between items-center transition-colors ${
          isDarkMode ? 'border-white/10' : 'border-gray-100'
        }`}>
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {movie ? 'Chỉnh sửa Phim' : 'Thêm Phim Mới'}
          </h2>
          <button 
            onClick={onClose}
            className={`p-2 rounded-full transition-colors focus:outline-none ${isDarkMode ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Poster Section */}
            <div className="w-full md:w-[240px] shrink-0">
              <label className={`block text-sm font-bold mb-2 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Poster Ảnh Bìa</label>
              <div 
                className={`w-full aspect-[2/3] border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all group relative overflow-hidden shadow-sm ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-blue-500/50' 
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-blue-400'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                {previewImage ? (
                  <>
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/90 text-gray-800 text-sm font-medium px-4 py-2 rounded-full flex gap-2 items-center">
                        <Upload size={16} /> Thay đổi
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-3 group-hover:scale-110 transition-transform">
                      <ImageIcon className="text-gray-400" size={24} />
                    </div>
                    <span className="text-sm font-medium text-gray-600 block">Chọn ảnh poster</span>
                    <span className="text-xs text-gray-400 mt-1 block">Tỷ lệ 2:3 (Tối đa 5MB)</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="flex-1 space-y-5">
              <div>
                <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tên Phim <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-300 text-slate-900 placeholder-gray-400 focus:bg-white'
                  }`}
                  placeholder="Nhập tên phim"
                />
              </div>

              <div>
                <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Thể loại <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="genre"
                  required
                  value={formData.genre}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-300 text-slate-900 placeholder-gray-400 focus:bg-white'
                  }`}
                  placeholder="VD: Hành động, Phiêu lưu"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Độ tuổi <span className="text-red-500">*</span></label>
                  <select 
                    name="ageRating"
                    value={formData.ageRating}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors appearance-none ${
                        isDarkMode 
                          ? 'bg-white/10 border-white/10 text-white' 
                          : 'bg-gray-50 border-gray-300 text-slate-900 focus:bg-white'
                      }`}
                  >
                    <option value="P" className={isDarkMode ? 'bg-slate-800' : 'bg-white'}>P</option>
                    <option value="T13" className={isDarkMode ? 'bg-slate-800' : 'bg-white'}>T13</option>
                    <option value="T16" className={isDarkMode ? 'bg-slate-800' : 'bg-white'}>T16</option>
                    <option value="T18" className={isDarkMode ? 'bg-slate-800' : 'bg-white'}>T18</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Thời lượng (Phút) <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    name="duration"
                    required
                    min="1"
                    value={formData.duration}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border-gray-300 text-slate-900 placeholder-gray-400 focus:bg-white'
                      }`}
                    placeholder="VD: 120"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ngày KHởi Chiếu</label>
                  <input 
                    type="text" 
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border-gray-300 text-slate-900 placeholder-gray-400 focus:bg-white'
                      }`}
                    placeholder="VD: 27/02"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Điểm đánh giá (%)</label>
                  <input 
                    type="text" 
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border-gray-300 text-slate-900 placeholder-gray-400 focus:bg-white'
                      }`}
                    placeholder="VD: 86%"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Trạng thái <span className="text-red-500">*</span></label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors appearance-none ${
                        isDarkMode 
                          ? 'bg-white/10 border-white/10 text-white' 
                          : 'bg-gray-50 border-gray-300 text-slate-900 focus:bg-white'
                      }`}
                  >
                    <option value="Now Showing" className={isDarkMode ? 'bg-slate-800' : 'bg-white'}>Đang chiếu</option>
                    <option value="Coming Soon" className={isDarkMode ? 'bg-slate-800' : 'bg-white'}>Sắp chiếu</option>
                    <option value="Ended" className={isDarkMode ? 'bg-slate-800' : 'bg-white'}>Ngừng chiếu</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Quốc gia <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border-gray-300 text-slate-900 placeholder-gray-400 focus:bg-white'
                      }`}
                    placeholder="VD: Việt Nam, Mỹ"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Định dạng (Format) <span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                  {['2D', '3D', 'IMAX'].map(fmt => (
                    <label key={fmt} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="format"
                        value={fmt}
                        checked={formData.format === fmt}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded-full border-gray-300 focus:ring-blue-500"
                      />
                      <span className={`text-sm font-bold transition-colors ${isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-black'}`}>{fmt}</span>
                    </label>
                  ))}
                </div>
              </div>


              <div>
                <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Mô tả nội dung</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
                    isDarkMode 
                      ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-300 text-slate-900 placeholder-gray-400 focus:bg-white'
                  }`}
                  placeholder="Viết nội dung giới thiệu phim..."
                />
              </div>
            </div>
          </div>

          <div className={`mt-8 pt-6 border-t flex justify-end gap-3 flex-wrap transition-colors ${
            isDarkMode ? 'border-white/10' : 'border-gray-100'
          }`}>
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
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md shadow-blue-500/30 font-bold transition-all w-full sm:w-auto transform hover:-translate-y-0.5"
            >
              {movie ? 'Lưu Thay Đổi' : 'Thêm Phim Mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
