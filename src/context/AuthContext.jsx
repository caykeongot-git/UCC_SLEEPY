/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      if (token === 'mock-token') { // Kiểm tra nếu là token test
        return { fullName: "Admin Test", email: "admin@gmail.com", role: "admin" };
      }
      try {
        return jwtDecode(token);
      } catch (err) {
        localStorage.removeItem('accessToken');
      }
    }
    return null;
  });

  const login = (token) => {
    if (token === 'test-token') {
      // Logic dành riêng cho TEST
      const mockUser = {
        fullName: "Nguyễn Văn Lân (Admin)",
        email: "admin@gmail.com",
        role: "admin",
        points: 999
      };
      localStorage.setItem('accessToken', 'mock-token');
      setUser(mockUser);
      return; // Kết thúc hàm tại đây đối với trường hợp TEST
    }

    // Logic dành cho TOKEN THẬT từ API
    localStorage.setItem('accessToken', token);
    try {
      const decodedLogin = jwtDecode(token);
      setUser(decodedLogin);
    } catch (err) {
      console.error('Lỗi giải mã token:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};