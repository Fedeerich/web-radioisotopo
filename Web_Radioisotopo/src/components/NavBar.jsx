import { useState, useEffect } from "react";
import "../styles/NavBar.css";
import { useAuth } from "../context/AuthContext";
import { loginService } from "../services/api";

export function NavBar() {
    const { usuario } = useAuth();
    const [notificacionesCount, setNotificacionesCount] = useState(0); // Este es tu estado
    const [listaNotificaciones, setListaNotificaciones] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const nombre = usuario?.nombreCompleto || "Invitado";

    const actualizarNotificaciones = async () => {
        try {
            // El servicio ya devuelve el número (unreadCount) gracias al cambio anterior
            const conteo = await loginService.obtenerConteoNotificaciones();
            setNotificacionesCount(conteo); 
        } catch (error) {
            console.error("Error cargando conteo:", error);
            setNotificacionesCount(0);
        } // <--- AQUÍ FALTABA CERRAR
    };

    const cargarListaCompleta = async () => {
        try {
            const datos = await loginService.obtenerListaNotificaciones();
            setListaNotificaciones(Array.isArray(datos) ? datos : []);
        } catch (error) {
            console.error("Error cargando lista:", error);
            setListaNotificaciones([]);
        }
    };

    const marcarComoLeida = async (id) => {
        try {
            await loginService.marcarNotificacionLeida(id);
            setNotificacionesCount(prev => Math.max(0, prev - 1));
            cargarListaCompleta();
        } catch (error) {
            console.error("Error al marcar como leída:", error);
        }
    };

    const toggleDropdown = () => {
        if (!showDropdown) {
            cargarListaCompleta();
        }
        setShowDropdown(!showDropdown);
    };

    useEffect(() => {
        if (usuario) {
            actualizarNotificaciones();
            const interval = setInterval(actualizarNotificaciones, 30000);
            return () => clearInterval(interval);
        }
    }, [usuario]);

    return (
        <header className="navbar-main">
            <div className="navbar-left">
                <h1>Sistema Central Clínico</h1>
                <div className="connection-status">
                    <i className="fi fi-rs-lock"></i>
                    <span>Conexión cifrada de extremo a extremo</span>
                </div>
            </div>

            <div className="navbar-right">
                <div className="notification-container">
                    <button className="notification-btn" onClick={toggleDropdown}>
                        <i className="fi fi-rs-bell"></i>
                        {notificacionesCount > 0 && (
                            <span className="notification-badge">{notificacionesCount}</span>
                        )}
                    </button>

                    {showDropdown && (
                        <div className="notifications-dropdown">
                            <div className="notif-header">
                                <span>Avisos del Sistema</span>
                                <span className="notif-count">{notificacionesCount} nuevos</span>
                            </div>
                            <div className="notif-list">
                                {listaNotificaciones.length === 0 ? (
                                    <div className="notif-empty">No hay notificaciones pendientes</div>
                                ) : (
                                    listaNotificaciones.map((n) => (
                                        <div 
                                            key={n.id} 
                                            className={`notif-item ${!n.leida ? 'unread' : ''}`}
                                            onClick={() => marcarComoLeida(n.id)}
                                        >
                                            <div className="notif-icon">
                                                <i className={`fi ${n.leida ? 'fi-rs-check' : 'fi-rs-info'}`}></i>
                                            </div>
                                            <div className="notif-content">
                                                <p>{n.mensaje}</p>
                                                <span className="notif-time">
                                                    {n.fechaEnvio ? new Date(n.fechaEnvio).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="navbar-divider-vertical"></div>

                <div className="user-profile">
                    <div className="user-info">
                        <span className="user-name">Dr. {nombre}</span>
                        <span className="user-role">{usuario?.especialidad || "Especialista"}</span>
                    </div>
                    <div className="user-avatar">
                        {nombre.substring(0, 2).toUpperCase()}
                    </div>
                </div>
            </div>
        </header>
    );
}