import axios from "axios";
import React, { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  token: null,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  setUser: (user) => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const isLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const setUserData = (user) => {
    setUser(user);
    localStorage.setItem("user", user);
  };

  const authContextValue = {
    token: token,
    user: user,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    setUser: setUserData,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
