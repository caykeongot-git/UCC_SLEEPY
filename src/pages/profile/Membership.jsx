import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Membership = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Thành viên</h2>
      
      {/* Membership Card UI */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 p-6 rounded-2xl shadow-2xl text-white relative overflow-hidden h-52">
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <p className="text-sm opacity-80 uppercase tracking-widest">Cinema Premium Card</p>
            <h3 className="text-2xl font-bold mt-1 uppercase">{user?.fullName}</h3>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-70">Hạng thẻ</p>
              <p className="font-bold text-lg">GOLD MEMBER</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-70">Điểm tích lũy</p>
              <p className="font-mono text-2xl font-bold">{user?.points || 0} PTS</p>
            </div>
          </div>
        </div>
        {/* Trang trí hình tròn mờ phía sau */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
      </div>

      <div className="mt-8 bg-white p-4 rounded shadow">
        <h4 className="font-bold mb-2">Quyền lợi hạng Vàng:</h4>
        <ul className="text-sm space-y-2 text-gray-600">
          <li>• Giảm 10% giá vé khi mua trực tuyến.</li>
          <li>• Tặng 1 phần bắp nước vào ngày sinh nhật.</li>
          <li>• Ưu tiên chọn chỗ ngồi đẹp.</li>
        </ul>
      </div>
    </div>
  );
};

export default Membership;