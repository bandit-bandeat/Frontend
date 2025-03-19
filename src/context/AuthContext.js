import React, { createContext, useState, useEffect, useContext } from 'react';
import { logout } from '../api/authApi';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggedIn(false);
    }
  };

  const authLogin = () => {
    setIsLoggedIn(true);
  }

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    logout: handleLogout,
    authLogin
  };


  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};