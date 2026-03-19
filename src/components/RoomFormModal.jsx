import { useState, useEffect, useMemo } from 'react';
import { X, LayoutGrid } from 'lucide-react';

export default function RoomFormModal({ room, cinemas = [], filterCinemaId = 'all', onClose, onSave, isDarkMode = true }) {
  const [formData, setFormData] = useState({
    name: '',
    cinemaId: cinemas.length > 0 ? cinemas[0].id : 1,
    cinemaName: cinemas.length > 0 ? cinemas[0].branchName : '',
    rows: 10,
    columns: 15,
  });

  // 0 = standard, 1 = VIP, 2 = Couple
  const [seatMap, setSeatMap] = useState([]);
  const [quickVip, setQuickVip] = useState({ start: '', end: '' });
  const [quickVipError, setQuickVipError] = useState('');

  useEffect(() => {
    if (room) {
      setFormData({
        name: room.name,
        cinemaId: room.cinemaId,
        cinemaName: room.cinemaName,
        rows: room.rows,
        columns: room.columns
      });
      if (room.seatMap && room.seatMap.length > 0) {
        setSeatMap(room.seatMap);
      } else {
        generateInitialSeatMap(room.rows, room.columns);
      }
    } else {
      generateInitialSeatMap(10, 15);
      
      let defaultCinema = cinemas.length > 0 ? cinemas[0] : null;
      if (filterCinemaId !== 'all') {
        const found = cinemas.find(c => c.id.toString() === filterCinemaId.toString());
        if (found) defaultCinema = found;
      }
      
      if (defaultCinema) {
        setFormData(prev => ({
          ...prev,
          name: '',
          cinemaId: defaultCinema.id,
          cinemaName: defaultCinema.branchName,
          rows: 10,
          columns: 15
        }));
      }
    }
  }, [room, cinemas, filterCinemaId]);

  const generateInitialSeatMap = (rows, cols) => {
    const newMap = Array(rows).fill(null).map((_, rIndex) => 
      Array(cols).fill(rIndex === rows - 1 ? 2 : 0) // Hàng cuối cùng mặc định là Couple (2), còn lại là Thường (0)
    );
    setSeatMap(newMap);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cinemaId') {
      const selectedCinema = cinemas.find(c => c.id === parseInt(value));
      setFormData(prev => ({ 
        ...prev, 
        cinemaId: parseInt(value),
        cinemaName: selectedCinema ? selectedCinema.branchName : ''
      }));
      return;
    }

    const numValue = name === 'rows' || name === 'columns' ? parseInt(value) || 0 : value;
    
    setFormData(prev => ({ ...prev, [name]: numValue }));

    // Regenerate map if dimensions change
    if (name === 'rows' || name === 'columns') {
      const newRows = name === 'rows' ? numValue : formData.rows;
      const newCols = name === 'columns' ? numValue : formData.columns;
      if (newRows > 0 && newCols > 0 && newRows <= 26 && newCols <= 50) {
        generateInitialSeatMap(newRows, newCols);
      }
    }
  };

  const toggleSeat = (rowIndex, colIndex) => {
    const newMap = [...seatMap];
    newMap[rowIndex] = [...newMap[rowIndex]];
    // Chuyển logic toggle 3 loại: 0 (Thường) -> 1 (VIP) -> 2 (Couple) -> 0
    newMap[rowIndex][colIndex] = (newMap[rowIndex][colIndex] + 1) % 3;
    setSeatMap(newMap);
  };

  const setRowAsVIP = (rowIndex) => {
    const newMap = [...seatMap];
    const isCurrentlyAllVIP = newMap[rowIndex].every(seat => seat === 1);
    // Nếu cả hàng đang là VIP -> Đổi về Couple (2)
    // Nếu không -> Đổi thành VIP (1)
    newMap[rowIndex] = Array(formData.columns).fill(isCurrentlyAllVIP ? 2 : 1);
    setSeatMap(newMap);
  };

  const handleQuickVip = () => {
    setQuickVipError('');
    const parseSeat = (str) => {
      const match = str.trim().toUpperCase().match(/^([A-Z])(\d+)$/);
      if (!match) return null;
      return {
        row: match[1].charCodeAt(0) - 65,
        col: parseInt(match[2], 10) - 1
      };
    };

    const start = parseSeat(quickVip.start);
    const end = parseSeat(quickVip.end);

    if (!start || !end) {
      setQuickVipError('Định dạng không hợp lệ (VD: D1, I15).');
      return;
    }

    const minRow = Math.min(start.row, end.row);
    const maxRow = Math.max(start.row, end.row);
    const minCol = Math.min(start.col, end.col);
    const maxCol = Math.max(start.col, end.col);

    if (maxRow >= formData.rows || maxCol >= formData.columns || minRow < 0 || minCol < 0) {
      setQuickVipError('Khoảng ghế vượt giới hạn phòng chiếu.');
      return;
    }

    const newMap = seatMap.map(r => [...r]);
    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        newMap[r][c] = 1; // 1 = VIP
      }
    }
    setSeatMap(newMap);
    setQuickVip({ start: '', end: '' }); // Reset fields on success
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      seatMap,
      totalSeats: formData.rows * formData.columns
    });
  };

  const getRowLetter = (index) => String.fromCharCode(65 + index); // A, B, C...

  // Calculate statistics
  const stats = useMemo(() => {
    let vip = 0;
    let standard = 0;
    let couple = 0;
    seatMap.forEach(row => {
      row.forEach(type => {
        if (type === 1) vip++;
        else if (type === 2) couple++;
        else standard++;
      });
    });
    return { vip, standard, couple, total: vip + standard + couple }; // Ghế đôi tính là 1 vị trí đặt vé
  }, [seatMap]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={`absolute inset-0 backdrop-blur-md transition-colors ${isDarkMode ? 'bg-black/80' : 'bg-slate-900/40'}`} onClick={onClose}></div>
      <div className={`relative w-full max-w-6xl max-h-[90vh] rounded-2xl border shadow-2xl transition-all duration-500 overflow-hidden flex flex-col ${
        isDarkMode ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-gray-200 text-slate-900'
      }`}>
        <div className={`p-6 border-b flex justify-between items-center transition-colors ${
          isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-gray-50'
        }`}>
          <h2 className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            {room ? `Cấu hình sơ đồ ghế - ${room.name}` : 'Thêm phòng mới'}
          </h2>
          <button 
            onClick={onClose}
            className={`p-2 rounded-full transition-colors focus:outline-none ${isDarkMode ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
          >
            <X size={20} />
          </button>
        </div>

        <div className={`overflow-y-auto p-6 flex-1 transition-colors ${isDarkMode ? 'bg-slate-950/20' : 'bg-gray-50/50'}`}>
          <form id="room-form" onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
            
            {/* Basic Info Section */}
            <div className={`grid grid-cols-1 md:grid-cols-4 gap-5 p-6 rounded-xl border shadow-sm transition-all ${
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
            }`}>
              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tên Phòng Chiếu <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors ${
                      isDarkMode ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-slate-900'
                    }`}
                    placeholder="VD: Cinema 1, IMAX..."
                  />
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Thuộc Cụm Rạp <span className="text-red-500">*</span></label>
                  <select 
                    name="cinemaId"
                    value={formData.cinemaId}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors ${
                      isDarkMode ? 'bg-white/10 border-white/10 text-white' : 'bg-white border-gray-300 text-slate-900'
                    }`}
                  >
                    {cinemas.map(c => (
                      <option key={c.id} value={c.id} className={isDarkMode ? 'bg-slate-800' : 'bg-white'}>{c.branchName}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="md:col-span-2 grid grid-cols-2 gap-5">
                <div>
                  <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Số Hàng (Max 26) <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    name="rows"
                    required
                    min="1"
                    max="26"
                    value={formData.rows}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 text-center text-lg font-bold border rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors ${
                      isDarkMode ? 'bg-white/10 border-white/10 text-white' : 'bg-white border-gray-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-bold mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Số Cột (Max 50) <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    name="columns"
                    required
                    min="1"
                    max="50"
                    value={formData.columns}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 text-center text-lg font-bold border rounded-lg focus:ring-2 focus:ring-indigo-500 transition-colors ${
                      isDarkMode ? 'bg-white/10 border-white/10 text-white' : 'bg-white border-gray-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Seat Map Configuration */}
            <div className="space-y-6">
              
              {/* Quick VIP Setup */}
              <div className={`p-5 rounded-xl border shadow-sm transition-all ${
                isDarkMode ? 'bg-indigo-500/5 border-indigo-500/20' : 'bg-indigo-50/50 border-indigo-100'
              }`}>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="flex-1">
                    <h4 className={`font-bold transition-colors mb-1 text-sm ${isDarkMode ? 'text-indigo-400' : 'text-indigo-900'}`}>Thiết lập ghế VIP nhanh</h4>
                    <p className={`text-xs transition-colors ${isDarkMode ? 'text-gray-400' : 'text-indigo-600'}`}>Nhập khoảng ghế muốn đổi thành VIP (Ví dụ: Từ D1 đến I15)</p>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <input 
                      type="text" 
                      placeholder="Từ ghế" 
                      value={quickVip.start}
                      onChange={(e) => setQuickVip(prev => ({...prev, start: e.target.value}))}
                      className={`w-28 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 uppercase transition-all ${
                        isDarkMode ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-slate-900'
                      }`}
                    />
                    <span className="text-indigo-400 font-bold">-</span>
                    <input 
                      type="text" 
                      placeholder="Đến ghế" 
                      value={quickVip.end}
                      onChange={(e) => setQuickVip(prev => ({...prev, end: e.target.value}))}
                      className={`w-28 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 uppercase transition-all ${
                        isDarkMode ? 'bg-white/10 border-white/10 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-slate-900'
                      }`}
                    />
                    <button 
                      type="button" 
                      onClick={handleQuickVip}
                      className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold rounded-lg shadow-sm shadow-pink-500/30 transition-colors whitespace-nowrap"
                    >
                      Áp dụng VIP
                    </button>
                    <button 
                      type="button" 
                      onClick={() => {
                        const newMap = seatMap.map(r => r.map(() => 0));
                        setSeatMap(newMap);
                      }}
                      className={`px-4 py-2 border text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
                        isDarkMode ? 'bg-white/10 border-white/10 text-gray-300 hover:bg-white/20' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                      title="Chuyển tất cả về ghế Thường"
                    >
                      Xóa VIP
                    </button>
                  </div>
                </div>
                {quickVipError && <p className="text-red-500 text-xs mt-2 font-bold">{quickVipError}</p>}
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div className={`border-l-4 pl-3 py-0.5 ${isDarkMode ? 'border-indigo-500' : 'border-[#3c4b96]'}`}>
                  <h3 className={`text-[17px] font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Trình Bày Sơ Đồ Ghế</h3>
                  <p className={`text-[13px] transition-colors ${isDarkMode ? 'text-gray-400' : 'text-slate-500'} mt-1`}>Click vào hàng (VD: A) để đổi nhanh thành VIP.</p>
                </div>
                <div className={`flex gap-4 text-[13px] font-bold px-4 py-2 rounded-[8px] border shadow-sm items-center transition-all ${
                  isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-[4px] border ${isDarkMode ? 'bg-slate-600 border-slate-500' : 'bg-[#e2e8f0] border-[#cbd5e1]'}`}></div>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-slate-700'}>Standard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#ec4899] rounded-[4px]"></div>
                    <span className="text-[#ec4899]">VIP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#3b5998] rounded-[4px]"></div>
                    <span className="text-[#3b5998]">Couple</span>
                  </div>
                </div>
              </div>

              <div className={`rounded-[16px] p-8 overflow-x-auto mx-auto shadow-lg transition-colors ${
                isDarkMode ? 'bg-slate-900/50' : 'bg-[#111827]'
              }`}>
                <div className="min-w-max mx-auto space-y-5">
                  {/* Screen */}
                  <div className="w-full flex justify-center mb-10 pt-4 relative">
                    <div className="w-[85%] max-w-2xl h-10 border-t-[4px] border-blue-400/30 rounded-t-[100%] absolute top-0 flex items-start justify-center pt-2" 
                         style={{ background: 'linear-gradient(180deg, rgba(96,165,250,0.15) 0%, rgba(17,24,39,0) 100%)', boxShadow: 'inset 0 4px 10px rgba(96,165,250,0.1)' }}>
                      <span className="text-blue-200/50 text-xs font-bold tracking-[0.5em] uppercase drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]">
                        Màn Hình
                      </span>
                    </div>
                  </div>

                  {/* Seats Grid */}
                  <div className="flex flex-col gap-2.5">
                    {seatMap.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex gap-3 items-center justify-center group">
                        {/* Row Identifier (Left) */}
                        <button 
                          type="button"
                          onClick={() => setRowAsVIP(rowIndex)}
                          className="w-10 h-10 flex items-center justify-center text-slate-300 font-bold hover:text-white hover:bg-white/10 rounded-lg transition-all focus:outline-none text-sm"
                          title="Click để đổi loại cho cả hàng"
                        >
                          {getRowLetter(rowIndex)}
                        </button>

                        <div className="flex gap-1.5">
                          {row.map((seatType, colIndex) => {
                            let bgClass, textClass, borderClass, shadowClass;
                            
                            if (seatType === 1) { // VIP
                              bgClass = 'bg-[#ec4899]';
                              textClass = 'text-white';
                              borderClass = 'border-[#be185d]';
                              shadowClass = 'shadow-[0_4px_15px_rgba(236,72,153,0.3)] hover:shadow-[0_6px_20px_rgba(236,72,153,0.5)]';
                            } else if (seatType === 2) { // Couple
                              bgClass = 'bg-[#3b5998]';
                              textClass = 'text-white';
                              borderClass = 'border-[#2d4373]';
                              shadowClass = 'shadow-[0_4px_15px_rgba(59,89,152,0.3)] hover:shadow-[0_6px_20px_rgba(59,89,152,0.5)]';
                            } else { // Standard (0)
                              bgClass = isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-[#f1f5f9] hover:bg-white';
                              textClass = isDarkMode ? 'text-gray-200' : 'text-gray-800';
                              borderClass = isDarkMode ? 'border-slate-800' : 'border-gray-300 hover:border-[#cbd5e1]';
                              shadowClass = 'shadow-sm';
                            }

                            return (
                              <button
                                key={`${rowIndex}-${colIndex}`}
                                type="button"
                                onClick={() => toggleSeat(rowIndex, colIndex)}
                                className={`
                                  relative w-[42px] h-[38px] rounded-t-[10px] rounded-b-[4px] border-b-[4px] transition-all duration-300 text-[12px] font-bold flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#111827]
                                  hover:-translate-y-1
                                  ${bgClass} ${textClass} ${borderClass} ${shadowClass}
                                `}
                                title={`${getRowLetter(rowIndex)}${colIndex + 1} - ${seatType === 1 ? 'VIP' : seatType === 2 ? 'Couple' : 'Thường'}`}
                              >
                                <span className="mt-0.5">{colIndex + 1}</span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="w-10 h-10"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className={`p-6 border-t flex flex-col sm:flex-row justify-between items-center shrink-0 rounded-b-2xl gap-4 transition-colors ${
          isDarkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100'
        }`}>
          <div className={`font-medium transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Tổng sức chứa: <span className={`text-2xl font-black transition-colors ml-2 ${isDarkMode ? 'text-blue-400' : 'text-indigo-600'}`}>{stats.total} ghế</span>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              type="button" 
              onClick={onClose}
              className={`px-6 py-2.5 border rounded-lg transition-colors font-bold w-full sm:w-auto ${
                isDarkMode ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Hủy
            </button>
            <button 
              type="submit"
              form="room-form"
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-transform transform hover:-translate-y-0.5 shadow-md shadow-indigo-500/30 font-bold flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <LayoutGrid size={18} />
              {room ? 'Cập nhật Sơ đồ' : 'Lưu Phòng Chiếu'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
