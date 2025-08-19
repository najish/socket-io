import React, { createContext, useState, useEffect } from 'react';

// 1. Create the context
export const UserContext = createContext();

// 2. Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Optional: fetch user and token from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token');

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
  }, []);

  // Individual handlers
  const setUserHandler = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  const setTokenHandler = (tokenData) => {
    setToken(tokenData);
    if (tokenData) {
      localStorage.setItem('token', tokenData);
    } else {
      localStorage.removeItem('token');
    }
  };

  // Combined handler for login
  const loginUser = (userData, tokenData) => {
    setUserHandler(userData);
    setTokenHandler(tokenData);
  };

  // Combined handler for logout
  const logoutUser = () => {
    setUserHandler(null);
    setTokenHandler(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        setUser: setUserHandler,
        setToken: setTokenHandler,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
