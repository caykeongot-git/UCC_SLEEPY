import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      if (token === 'mock-token') {
        // Tương thích ngược với thiết lập cũ
        setUser({
          fullName: "Lê Phước Hoàng Lân",
          email: "admin@gmail.com",
          role: "admin",
          points: 999
        });
      } else if (token.startsWith('{')) {
        // Hỗ trợ lưu trữ dynamic mock account JSON parsing
        try {
          setUser(JSON.parse(token));
        } catch (e) {
          console.error("Lỗi parse Mock Token JSON");
        }
      } else {
        // JWT thật
        try {
          const decoded = jwtDecode(token);
          setUser({
            id: decoded.id,
            fullName: decoded.fullName,
            email: decoded.email,
            role: decoded.role,
            points: decoded.points || 0,
            avatar: decoded.avatar || null
          });
          // Gắn token mặc định vào axios
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
          console.error("Token không hợp lệ", error);
          localStorage.removeItem('accessToken');
        }
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('accessToken', token);

    if (token === 'test-token' || token === 'mock-token') {
      // Tương thích ngược TEST
      const mockUser = {
        fullName: "Lê Phước Hoàng Lân",
        email: "admin@gmail.com",
        role: "admin",
        points: 999
      };
      localStorage.setItem('accessToken', 'mock-token');
      setUser(mockUser);
      return; 
    }

    if (token.startsWith('{')) {
      // Dynamic Mock logic stringified JSON object!
      setUser(JSON.parse(token));
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.id,
        fullName: decoded.fullName,
        email: decoded.email,
        role: decoded.role,
        points: decoded.points || 0,
        avatar: decoded.avatar || null
      });
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error("Token hợp lệ nhưng không thể decode", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};