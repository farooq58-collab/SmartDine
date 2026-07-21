import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('smartdine_token'));
  const [loading, setLoading] = useState(true);

  // On mount, restore user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('smartdine_user');
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('smartdine_user');
      }
    }
    setLoading(false);
  }, [token]);

  const login = useCallback(async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password });

    const { access_token, user: userData } = res.data;
    localStorage.setItem('smartdine_token', access_token);
    localStorage.setItem('smartdine_user', JSON.stringify(userData));
    setToken(access_token);
    setUser(userData);
    return userData;
  }, []);

  const register = useCallback(async (fullName, restaurantName, email, password) => {
    const res = await api.post('/api/auth/register', {
      full_name: fullName,
      restaurant_name: restaurantName,
      email,
      password,
    });

    const { access_token, user: userData } = res.data;
    // Add restaurant_name to stored user for sidebar display
    const enrichedUser = { ...userData, restaurant_name: restaurantName };
    localStorage.setItem('smartdine_token', access_token);
    localStorage.setItem('smartdine_user', JSON.stringify(enrichedUser));
    setToken(access_token);
    setUser(enrichedUser);
    return enrichedUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('smartdine_token');
    localStorage.removeItem('smartdine_user');
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
