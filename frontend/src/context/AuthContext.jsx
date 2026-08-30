import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('gym_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('gym_token') || null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('gym_token');
      if (storedToken) {
        try {
          const res = await authAPI.getMe();
          if (res.data.success) {
            setUser(res.data.user);
            localStorage.setItem('gym_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.warn('Session verification failed, logging out');
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('gym_user', JSON.stringify(userData));
    localStorage.setItem('gym_token', authToken);
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('gym_user');
    localStorage.removeItem('gym_token');
  };
  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);