import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);
  const verifyToken = async (token) => {
    try {
      const response = await api.get('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Token verification error', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };
  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', {
        email, password
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      toast.success('Login successful!');
      return true;
    } catch (error) {
      console.error('Login error', error);
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };
  const register = async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      toast.success('Registration successful! Please log in.');
      return true;
    } catch (error) {
      console.error('Registration error', error);
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
