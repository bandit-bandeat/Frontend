import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      console.log('Sending logout request');
      const response = await axios.post('http://18.139.20.145:8080/auth/logout', {}, {
        withCredentials: true,
      });
      console.log('Logout response:', response.data);
      setIsLoggedIn(false);
      console.log('User logged out, isLoggedIn:', isLoggedIn);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);