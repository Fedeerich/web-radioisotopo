/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Contexto para saber como logearse + uso de JWT]
AUTHOR:        [Marcos, Wael]
UPDATED:       [23/04/2026]
================================================================================
*/

// IMPORT
import { createContext, useState, useEffect, use } from "react";
import { loginService } from "../services/api";

// CONTEXT AUTCH
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const datosPerfil = await loginService.obtenerPerfilActual();
        
        if (datosPerfil) {
          setUsuario(datosPerfil);
        }
      } catch (error) {
        console.error("Error al verificar la sesión inicial:", error);
      } finally {
        setCargando(false);
      }
    };

    verificarSesion();
  }, []);

  const login = (userData) => {
    setUsuario(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
  };

  const actualizarUsuario = (nuevosDatos) => {
    setUsuario(prev => ({ ...prev, ...nuevosDatos }));
  };

  return cargando ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Verificando credenciales cl&iacute;nicas&hellip;</p>
    </div>
  ) : (
    <AuthContext.Provider value={{ usuario, login, logout, actualizarUsuario, isAuthenticated: !!usuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};