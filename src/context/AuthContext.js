import React, { createContext, useState, useContext } from 'react';
import { logout } from '../api/authApi';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggedIn(false);
    }
  };

  const authLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  }

  const membershipChange = () => {
    const nowMem = user.userDto.membership;
    if (nowMem === 0) {
      setUser(prevUser => ({
        ...prevUser,  // 기존 user 객체 유지
        userDto: {
          ...prevUser.userDto,  // 기존 userDto 객체 유지
          membership: 1 // membership 값 변경
        }
      }));
    }
    else{
      setUser(prevUser => ({
        ...prevUser,  // 기존 user 객체 유지
        userDto: {
          ...prevUser.userDto,  // 기존 userDto 객체 유지
          membership: 0 // membership 값 변경
        }
      }));
    }
  }

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    logout: handleLogout,
    authLogin,
    user,
    membershipChange
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