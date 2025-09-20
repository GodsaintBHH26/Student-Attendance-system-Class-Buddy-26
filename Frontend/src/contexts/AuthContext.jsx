import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/ini_axios";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const userLogin = async (unique_id, upassword) => {
    const res = await api.post("/auth/login", { unique_id, upassword });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const createUser = async (
    uname,
    unique_id,
    upassword,
    class_assigned,
    role
  ) => {
    try {
      const res = await api.post("/auth/register", {
        uname,
        unique_id,
        upassword,
        class_assigned,
        role,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  return (
    <AuthContext.Provider value={{ userLogin, user, token, createUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
