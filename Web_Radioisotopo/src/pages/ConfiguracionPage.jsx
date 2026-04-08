import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/api"; // Asegúrate de tener aquí tus llamadas fetch
import "../styles/Configuracion.css";

export function ConfiguracionPage() {
    const { usuario, actualizarUsuario, logout } = useAuth(); 
    const navigate = useNavigate();

    // Función para enviar los cambios al servidor
    const actualizarPreferencia = async (campo, valor) => {
        try {
            // Estructura del DTO que espera Java
            const nuevosAjustes = {
                idioma: campo === 'idioma' ? valor : (usuario.idioma || "Castellano"),
                zonaHoraria: campo === 'zonaHoraria' ? valor : (usuario.zonaHoraria || "Europa/Madrid (CET)"),
                bateriaBaja: campo === 'bateriaBaja' ? valor : usuario.notifBateria,
                desconexionBiometrica: campo === 'desconexionBiometrica' ? valor : usuario.notifDesconexion,
                resumenSemanal: campo === 'resumenSemanal' ? valor : usuario.notifResumen,
                radiacionSegura: campo === 'radiacionSegura' ? valor : usuario.notifRadiacion,
                anomaliaVitales: campo === 'anomaliaVitales' ? valor : usuario.notifVitales,
                falloSincronizacion: campo === 'falloSincronizacion' ? valor : usuario.notifSincro
            };

            // Llamada al backend (AuthController -> @PutMapping("/preferencias"))
            const exito = await loginService.guardarPreferencias(nuevosAjustes);
            
            if (exito) {
                // Actualizamos el contexto global para que los switches se muevan visualmente
                actualizarUsuario({ ...usuario, ...nuevosAjustes });
            }
        } catch (error) {
            console.error("Error al guardar preferencia:", error);
        }
    };

    const obtenerEspecialidadInicial = () => {
        if (usuario?.rol === "ADMIN") return "Administración de Sistemas";
        return usuario?.especialidad || "Especialidad no definida";
    };

    const manejarCerrarSesionGlobal = () => {
        localStorage.removeItem("mantenerSesion");
        logout();
        navigate("/");
    };

    return (
        <div className="configuracion-container">
            <div className="header-seccion">
                <div className="header-textos">
                    <h1>Configuración del Sistema</h1>
                    <p>Ajustes de cuenta, alertas y preferencias del entorno clínico</p>
                </div>
            </div>

            <div className="grid-configuracion">
                <div className="columna-ajustes">
                    <div className="formulario-card">
                        <div className="card-header-icon"><h3>Datos de la Cuenta</h3></div>
                        <div className="form-group">
                            <label>Nombre del Profesional</label>
                            <input type="text" value={usuario?.nombreCompleto || ""} className="form-input" readOnly />
                        </div>
                        <div className="form-group">
                            <label>Correo Electrónico</label>
                            <input type="text" value={usuario?.email || ""} className="form-input" readOnly />
                        </div>
                        <div className="form-group">
                            <label>Especialidad</label>
                            <input type="text" value={obtenerEspecialidadInicial()} className="form-input" readOnly />
                        </div>
                        <button className="btn-blue-outline" onClick={() => navigate('/cambiar-password')}>
                            Cambiar contraseña
                        </button>
                    </div>

                    <div className="formulario-card">
                        <div className="card-header-icon"><h3>Preferencias del Sistema</h3></div>
                        <div className="form-group">
                            <label>Idioma de la interfaz</label>
                            <select 
                                className="form-input select-styled" 
                                value={usuario?.idioma || "Castellano"}
                                onChange={(e) => actualizarPreferencia('idioma', e.target.value)}
                            >
                                <option>Castellano</option>
                                <option>Català</option>
                                <option>English</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Zona Horaria</label>
                            <select 
                                className="form-input select-styled" 
                                value={usuario?.zonaHoraria || "Europa/Madrid (CET)"}
                                onChange={(e) => actualizarPreferencia('zonaHoraria', e.target.value)}
                            >
                                <option>Europa/Madrid (CET)</option>
                                <option>Europa/Londres (GMT)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="columna-ajustes">
                    <div className="formulario-card">
                        <div className="card-header-icon"><h3>Notificaciones Clínicas</h3></div>
                        <div className="toggle-list">
                            
                            {/* Batería */}
                            <div className="toggle-item">
                                <div className="toggle-text">
                                    <strong>Batería baja en dispositivos</strong>
                                    <p>Avisar cuando un SmartWatch baje del 15%</p>
                                </div>
                                <label className="switch">
                                    <input 
                                        type="checkbox" 
                                        checked={usuario?.notifBateria || false} 
                                        onChange={(e) => actualizarPreferencia('bateriaBaja', e.target.checked)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>

                            {/* Desconexión */}
                            <div className="toggle-item">
                                <div className="toggle-text">
                                    <strong>Desconexión biométrica</strong>
                                    <p>Alerta inmediata si se pierde la señal</p>
                                </div>
                                <label className="switch">
                                    <input 
                                        type="checkbox" 
                                        checked={usuario?.notifDesconexion || false}
                                        onChange={(e) => actualizarPreferencia('desconexionBiometrica', e.target.checked)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>

                            {/* Resumen */}
                            <div className="toggle-item">
                                <div className="toggle-text">
                                    <strong>Resumen semanal</strong>
                                    <p>Recibir informe de evolución por correo</p>
                                </div>
                                <label className="switch">
                                    <input 
                                        type="checkbox" 
                                        checked={usuario?.notifResumen || false}
                                        onChange={(e) => actualizarPreferencia('resumenSemanal', e.target.checked)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>

                            {/* Radiación */}
                            <div className="toggle-item">
                                <div className="toggle-text">
                                    <strong>Alerta de Radiación Segura</strong>
                                    <p>Avisar cuando el paciente alcance niveles seguros</p>
                                </div>
                                <label className="switch">
                                    <input 
                                        type="checkbox" 
                                        checked={usuario?.notifRadiacion || false}
                                        onChange={(e) => actualizarPreferencia('radiacionSegura', e.target.checked)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>

                            {/* Constantes Vitales */}
                            <div className="toggle-item">
                                <div className="toggle-text">
                                    <strong>Anomalía en Constantes Vitales</strong>
                                    <p>Notificar alteraciones graves cardíacas</p>
                                </div>
                                <label className="switch">
                                    <input 
                                        type="checkbox" 
                                        checked={usuario?.notifVitales || false}
                                        onChange={(e) => actualizarPreferencia('anomaliaVitales', e.target.checked)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>

                            {/* Sincronización */}
                            <div className="toggle-item">
                                <div className="toggle-text">
                                    <strong>Fallo de sincronización</strong>
                                    <p>Avisar si un reloj no envía datos (12h)</p>
                                </div>
                                <label className="switch">
                                    <input 
                                        type="checkbox" 
                                        checked={usuario?.notifSincro || false}
                                        onChange={(e) => actualizarPreferencia('falloSincronizacion', e.target.checked)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="card-resumen-green danger-zone">
                        <h3 className="warning-red">Zona de Seguridad</h3>
                        <p className="security-desc">Gestiona las sesiones activas y los permisos de acceso.</p>
                        <button className="btn-danger-outline" onClick={manejarCerrarSesionGlobal}>
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            Cerrar sesión en todos los terminales
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}