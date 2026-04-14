import { useState, useEffect, useRef } from "react";
import "../styles/NavBar.css";
import { useAuth } from "../context/AuthContext";
import { loginService } from "../services/api";
import { useTranslation } from "../hooks/useTranslation";

export function NavBar() {
    const { usuario, actualizarUsuario } = useAuth();
    const { t } = useTranslation();
    const [notificacionesCount, setNotificacionesCount] = useState(0);
    const [listaNotificaciones, setListaNotificaciones] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [userAvatar, setUserAvatar] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    // URL de tu Cloudflare Worker para rutas locales antiguas
    const BASE_HOST = "https://api-radioisotopo-proxy.m-gongora-carriedo.workers.dev";
    const nombre = usuario?.nombreCompleto || "Invitado";

    /**
     * LÓGICA DE URL INTELIGENTE:
     * Si la imagen viene de Cloudinary (empieza por http), se usa directa.
     * Si es una ruta antigua (/uploads/...), pasa por el proxy de Cloudflare.
     */
    const obtenerUrlFinal = (urlOriginal) => {
        if (!urlOriginal) return null;
        if (urlOriginal.startsWith('http')) return urlOriginal;
        return `${BASE_HOST}${urlOriginal}`;
    };

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Preview local instantánea para mejorar la experiencia de usuario
        const previewUrl = URL.createObjectURL(file);
        setUserAvatar(previewUrl);

        try {
            setIsUploading(true);
            const data = await loginService.subirAvatar(usuario.id, file);
            
            // data.url es la URL de Cloudinary (https://res.cloudinary.com...)
            const urlFinal = obtenerUrlFinal(data.url);
            setUserAvatar(urlFinal);
            
            // Actualizamos el contexto global
            actualizarUsuario({ profilePicUrl: data.url });
        } catch (error) {
            console.error("Fallo en la subida:", error);
            alert(t('errorSubidaImagen'));
            // Si falla, volvemos a poner la que había
            setUserAvatar(obtenerUrlFinal(usuario?.profilePicUrl));
        } finally {
            setIsUploading(false);
        }
    };

    const actualizarNotificaciones = async () => {
        try {
            const conteo = await loginService.obtenerConteoNotificaciones();
            setNotificacionesCount(conteo);
        } catch (error) {
            setNotificacionesCount(0);
        }
    };

    const cargarListaCompleta = async () => {
        try {
            const datos = await loginService.obtenerListaNotificaciones();
            setListaNotificaciones(Array.isArray(datos) ? datos : []);
        } catch (error) {
            setListaNotificaciones([]);
        }
    };

    const marcarComoLeida = async (id) => {
        try {
            await loginService.marcarNotificacionLeida(id);
            setNotificacionesCount(prev => Math.max(0, prev - 1));
            cargarListaCompleta();
        } catch (error) {
            console.error(error);
        }
    };

    const toggleDropdown = () => {
        if (!showDropdown) cargarListaCompleta();
        setShowDropdown(!showDropdown);
        if (showProfileMenu) setShowProfileMenu(false);
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
        if (showDropdown) setShowDropdown(false);
    };

    useEffect(() => {
        if (usuario) {
            actualizarNotificaciones();
            const interval = setInterval(actualizarNotificaciones, 30000);
            
            if (usuario.profilePicUrl) {
                setUserAvatar(obtenerUrlFinal(usuario.profilePicUrl));
            }
            
            return () => clearInterval(interval);
        }
    }, [usuario]);

    return (
        <header className="navbar-main">
            <div className="navbar-left">
                <h1>{t('sistemaCentralClinico')}</h1>
                <div className="connection-status">
                    <i className="fi fi-rs-lock"></i>
                    <span>{t('conexionCifrada')}</span>
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
                                <span>{t('avisosDelSistema')}</span>
                                <span className="notif-count">{notificacionesCount} {t('nuevos')}</span>
                            </div>
                            <div className="notif-list">
                                {listaNotificaciones.length === 0 ? (
                                    <div className="notif-empty">{t('noHayNotificaciones')}</div>
                                ) : (
                                    listaNotificaciones.map((n) => (
                                        <div key={n.id} className={`notif-item ${!n.leida ? 'unread' : ''}`} onClick={() => marcarComoLeida(n.id)}>
                                            <div className="notif-icon"><i className={`fi ${n.leida ? 'fi-rs-check' : 'fi-rs-info'}`}></i></div>
                                            <div className="notif-content">
                                                <p>{n.mensaje}</p>
                                                <span className="notif-time">{n.fechaEnvio ? new Date(n.fechaEnvio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="navbar-divider-vertical"></div>

                <div className="user-profile-container">
                    <div className="user-profile" onClick={toggleProfileMenu}>
                        <div className="user-info">
                            <span className="user-name">{t('dr')} {nombre}</span>
                            <span className="user-role">{usuario?.especialidad || t('especialista')}</span>
                        </div>
                        <div className="user-avatar">
                            {userAvatar ? (
                                <img src={userAvatar} alt="" className="avatar-img" />
                            ) : (
                                <span>{nombre.substring(0, 2).toUpperCase()}</span>
                            )}
                        </div>
                    </div>

                    {showProfileMenu && (
                        <div className="profile-dropdown">
                            <div className="profile-dropdown-header"><p>{t('perfilDelUsuario')}</p></div>
                            <div className="profile-dropdown-content">
                                <div className="avatar-edit-container" onClick={() => fileInputRef.current.click()}>
                                    <div className="avatar-large">
                                        {userAvatar ? (
                                            <img src={userAvatar} alt="" />
                                        ) : (
                                            <span>{nombre.substring(0, 2).toUpperCase()}</span>
                                        )}
                                        <div className="avatar-overlay"><i className="fi fi-rs-camera"></i></div>
                                    </div>
                                    {isUploading && <span className="uploading-text">{t('subiendo')}...</span>}
                                </div>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    style={{ display: 'none' }} 
                                    accept="image/*" 
                                    onChange={handleAvatarChange} 
                                />
                                <button className="logout-btn">{t('cerrarSesion')}</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}