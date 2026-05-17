import { useReducer, useEffect, useRef } from "react";
import "../styles/NavBar.css";
import UserProfile from "./UserProfile";
import { useAuth } from "../context/AuthContext";
import { loginService } from "../services/api";
import { useTranslation } from "../hooks/useTranslation";

const initialState = {
    notificacionesCount: 0,
    listaNotificaciones: [],
    showDropdown: false,
    showProfileMenu: false,
    userAvatar: null,
    isUploading: false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_NOTIFICACIONES':
            return { ...state, notificacionesCount: action.count, listaNotificaciones: action.list || state.listaNotificaciones };
        case 'SET_NOTIFICACIONES_COUNT':
            return { ...state, notificacionesCount: action.count };
        case 'SET_LISTA_NOTIFICACIONES':
            return { ...state, listaNotificaciones: action.list };
        case 'TOGGLE_DROPDOWN':
            return { ...state, showDropdown: !state.showDropdown, showProfileMenu: false };
        case 'TOGGLE_PROFILE_MENU':
            return { ...state, showProfileMenu: !state.showProfileMenu, showDropdown: false };
        case 'SET_AVATAR':
            return { ...state, userAvatar: action.url };
        case 'SET_UPLOADING':
            return { ...state, isUploading: action.uploading };
        default:
            return state;
    }
}

export function NavBar() {
    const { usuario, actualizarUsuario } = useAuth();
    const { t } = useTranslation();
    const [state, dispatch] = useReducer(reducer, initialState);
    const fileInputRef = useRef(null);

    const BASE_HOST = "https://api-radioisotopo-proxy.m-gongora-carriedo.workers.dev";
    const nombre = usuario?.nombreCompleto || "Invitado";

    const obtenerUrlFinal = (urlOriginal) => {
        if (!urlOriginal) return null;
        if (urlOriginal.startsWith('http')) return urlOriginal;
        return `${BASE_HOST}${urlOriginal}`;
    };

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        dispatch({ type: 'SET_AVATAR', url: previewUrl });

        try {
            dispatch({ type: 'SET_UPLOADING', uploading: true });
            const data = await loginService.subirAvatar(usuario.id, file);
            const urlFinal = obtenerUrlFinal(data.url);
            dispatch({ type: 'SET_AVATAR', url: urlFinal });
            actualizarUsuario({ profilePicUrl: data.url });
        } catch (error) {
            console.error("Fallo en la subida:", error);
            alert(t('errorSubidaImagen'));
            dispatch({ type: 'SET_AVATAR', url: obtenerUrlFinal(usuario?.profilePicUrl) });
        } finally {
            dispatch({ type: 'SET_UPLOADING', uploading: false });
        }
    };

    const actualizarNotificaciones = async () => {
        if (!usuario || !localStorage.getItem("token")) return;

        try {
            const conteo = await loginService.obtenerConteoNotificaciones();
            dispatch({ type: 'SET_NOTIFICACIONES_COUNT', count: conteo });
        } catch (error) {
            dispatch({ type: 'SET_NOTIFICACIONES_COUNT', count: 0 });
        }
    };

    const cargarListaCompleta = async () => {
        if (!usuario) return;
        try {
            const datos = await loginService.obtenerListaNotificaciones();
            dispatch({ type: 'SET_LISTA_NOTIFICACIONES', list: Array.isArray(datos) ? datos : [] });
        } catch (error) {
            dispatch({ type: 'SET_LISTA_NOTIFICACIONES', list: [] });
        }
    };

    const marcarComoLeida = async (id) => {
        try {
            await loginService.marcarNotificacionLeida(id);
            dispatch({ type: 'SET_NOTIFICACIONES_COUNT', count: Math.max(0, state.notificacionesCount - 1) });
            cargarListaCompleta();
        } catch (error) {
            console.error(error);
        }
    };

    const toggleDropdown = () => {
        if (!state.showDropdown) cargarListaCompleta();
        dispatch({ type: 'TOGGLE_DROPDOWN' });
    };

    const toggleProfileMenu = () => {
        dispatch({ type: 'TOGGLE_PROFILE_MENU' });
    };

    const notificacionesConFecha = state.listaNotificaciones.map(n => ({
        ...n,
        tiempoFormateado: n.fechaEnvio ? new Date(n.fechaEnvio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'
    }));

    useEffect(() => {
        if (usuario?.id) {
            actualizarNotificaciones();
            
            const interval = setInterval(() => {
                actualizarNotificaciones();
            }, 30000);

            if (usuario.profilePicUrl) {
                dispatch({ type: 'SET_AVATAR', url: obtenerUrlFinal(usuario.profilePicUrl) });
            }

            return () => clearInterval(interval);
        }
    }, [usuario?.id]);

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
                        {state.notificacionesCount > 0 && (
                            <span className="notification-badge">{state.notificacionesCount}</span>
                        )}
                    </button>

                    {state.showDropdown && (
                        <div className="notifications-dropdown">
                            <div className="notif-header">
                                <span>{t('avisosDelSistema')}</span>
                                <span className="notif-count">{state.notificacionesCount} {t('nuevos')}</span>
                            </div>
                            <div className="notif-list">
                                {state.listaNotificaciones.length === 0 ? (
                                    <div className="notif-empty">{t('noHayNotificaciones')}</div>
                                ) : (
                                    notificacionesConFecha.map((n) => (
                                        <div key={n.id} className={`notif-item ${!n.leida ? 'unread' : ''}`} onClick={() => marcarComoLeida(n.id)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') marcarComoLeida(n.id); }}>
                                            <div className="notif-icon"><i className={`fi ${n.leida ? 'fi-rs-check' : 'fi-rs-info'}`}></i></div>
                                            <div className="notif-content">
                                                <p>{n.mensaje}</p>
                                                <span className="notif-time">{n.tiempoFormateado}</span>
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
                    <div className="user-profile" onClick={toggleProfileMenu} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') toggleProfileMenu(); }}>
                        <div className="user-info">
                            <span className="user-name">{t('dr')} {nombre}</span>
                            <span className="user-role">{usuario?.especialidad || t('especialista')}</span>
                        </div>
                        <div className="user-avatar">
                            {state.userAvatar ? (
                                <img src={state.userAvatar} alt="" className="avatar-img" />
                            ) : (
                                <span>{nombre.substring(0, 2).toUpperCase()}</span>
                            )}
                        </div>
                    </div>

                    {state.showProfileMenu && (
                        <div className="profile-dropdown">
                            <div className="profile-dropdown-header"><p>{t('perfilDelUsuario')}</p></div>
                            <div className="profile-dropdown-content">
                                <UserProfile
                                    avatarUrl={state.userAvatar}
                                    nombre={nombre}
                                    onClick={() => fileInputRef.current.click()}
                                    isUploading={state.isUploading}
                                />
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
