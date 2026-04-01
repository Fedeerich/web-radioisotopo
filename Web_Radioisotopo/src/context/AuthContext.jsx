import { createContext, useState, useContext, useEffect } from "react";
import { loginService } from "../services/api";

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

  if (cargando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Verificando credenciales clínicas...</p>
      </div>
    );
  }

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