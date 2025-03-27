import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken);
  const [username, setUsername] = useState(null);

  const login = (token, username) => {
    setToken(token);
    setUsername(username);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};
