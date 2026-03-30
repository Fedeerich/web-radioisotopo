import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const savedUser = sessionStorage.getItem("user_session");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUsuario(userData);
    sessionStorage.setItem("user_session", JSON.stringify(userData));
  };

  const logout = () => {
    setUsuario(null);
    sessionStorage.removeItem("user_session");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isAuthenticated: !!usuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};