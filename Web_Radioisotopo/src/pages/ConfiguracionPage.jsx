import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/api";
import "../styles/Configuracion.css";
import { useTranslation } from "../hooks/useTranslation";

export function ConfiguracionPage() {
    const { usuario, actualizarUsuario, logout } = useAuth(); 
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Función para enviar los cambios al servidor
    const actualizarPreferencia = async (campo, valor) => {
        // Mapeo de campos del formulario a campos del usuario
        const mapeoCampos = {
            bateriaBaja: 'notifBateria',
            desconexionBiometrica: 'notifDesconexion',
            resumenSemanal: 'notifResumen',
            radiacionSegura: 'notifRadiacion',
            anomaliaVitales: 'notifVitales',
            falloSincronizacion: 'notifSincro'
        };
        
        // Actualizar inmediatamente el estado local para feedback visual instantáneo
        if (campo !== 'idioma' && campo !== 'zonaHoraria') {
            actualizarUsuario({ [mapeoCampos[campo]]: valor });
        }

        try {
            const nuevosAjustes = {
                idioma: campo === 'idioma' ? valor : (usuario?.idioma || "Castellano"),
                zonaHoraria: campo === 'zonaHoraria' ? valor : (usuario?.zonaHoraria || "Europa/Madrid (CET)"),
                bateriaBaja: campo === 'bateriaBaja' ? valor : usuario?.notifBateria,
                desconexionBiometrica: campo === 'desconexionBiometrica' ? valor : usuario?.notifDesconexion,
                resumenSemanal: campo === 'resumenSemanal' ? valor : usuario?.notifResumen,
                radiacionSegura: campo === 'radiacionSegura' ? valor : usuario?.notifRadiacion,
                anomaliaVitales: campo === 'anomaliaVitales' ? valor : usuario?.notifVitales,
                falloSincronizacion: campo === 'falloSincronizacion' ? valor : usuario?.notifSincro
            };

            await loginService.guardarPreferencias(nuevosAjustes);
            
            // Actualizar contexto
            actualizarUsuario({
                idioma: nuevosAjustes.idioma,
                zonaHoraria: nuevosAjustes.zonaHoraria,
                notifBateria: nuevosAjustes.bateriaBaja,
                notifDesconexion: nuevosAjustes.desconexionBiometrica,
                notifResumen: nuevosAjustes.resumenSemanal,
                notifRadiacion: nuevosAjustes.radiacionSegura,
                notifVitales: nuevosAjustes.anomaliaVitales,
                notifSincro: nuevosAjustes.falloSincronizacion
            });
        } catch (error) {
            console.error("Error al guardar preferencia:", error);
            // Revertir cambio local si falla el servidor
            if (campo !== 'idioma' && campo !== 'zonaHoraria') {
                actualizarUsuario({ [mapeoCampos[campo]]: !valor });
            }
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
                    <h1>{t('configuracionSistema')}</h1>
                    <p>{t('ajustesCuentaAlertas')}</p>
                </div>
            </div>

            <div className="grid-configuracion">
                <div className="columna-ajustes">
                    <div className="formulario-card">
                        <div className="card-header-icon"><h3>{t('datosCuenta')}</h3></div>
                        <div className="form-group">
                            <label>{t('nombreProfesional')}</label>
                            <input type="text" value={usuario?.nombreCompleto || ""} className="form-input" readOnly />
                        </div>
                        <div className="form-group">
                            <label>{t('correoElectronicoInput')}</label>
                            <input type="text" value={usuario?.email || ""} className="form-input" readOnly />
                        </div>
                        <div className="form-group">
                            <label>{t('especialidadInput')}</label>
                            <input type="text" value={obtenerEspecialidadInicial()} className="form-input" readOnly />
                        </div>
                        <button className="btn-blue-outline" onClick={() => navigate('/cambiar-password')}>
                            {t('cambiarContrasena')}
                        </button>
                    </div>

                    <div className="formulario-card">
                        <div className="card-header-icon"><h3>{t('preferenciasSistema')}</h3></div>
                        <div className="form-group">
                            <label>{t('idiomaInterfaz')}</label>
                            <select 
                                className="form-input select-styled" 
                                value={usuario?.idioma || "Castellano"}
                                onChange={(e) => actualizarPreferencia('idioma', e.target.value)}
                            >
                                <option value="Castellano">Castellano</option>
                                <option value="Catala">Català</option>
                                <option value="English">English</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>{t('zonaHoraria')}</label>
                            <select 
                                className="form-input select-styled" 
                                value={usuario?.zonaHoraria || "Europa/Madrid (CET)"}
                                onChange={(e) => actualizarPreferencia('zonaHoraria', e.target.value)}
                            >
                                <option>{t('europaMadrid')}</option>
                                <option>{t('europaLondres')}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="columna-ajustes">
                    <div className="formulario-card">
                        <div className="card-header-icon"><h3>{t('notificacionesClinicas')}</h3></div>
                        <div className="toggle-list">
                            
                            {/* Batería */}
                            <div className="toggle-item">
                                <div className="toggle-text">
                                    <strong>{t('bateriaBajaDispositivos')}</strong>
                                    <p>{t('avisarSmartWatchBaja')}</p>
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
                                    <strong>{t('desconexionBiometrica')}</strong>
                                    <p>{t('alertaPerdidaSenal')}</p>
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
                                    <strong>{t('resumenSemanal')}</strong>
                                    <p>{t('recibirInformeCorreo')}</p>
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
                                    <strong>{t('alertaRadiacionSegura')}</strong>
                                    <p>{t('avisarPacienteNiveles')}</p>
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
                                    <strong>{t('anomaliaConstantesVitales')}</strong>
                                    <p>{t('notificarAlteraciones')}</p>
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
                                    <strong>{t('falloSincronizacion')}</strong>
                                    <p>{t('avisarRelojNoEnvia')}</p>
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
                        <h3 className="warning-red">{t('zonaSeguridad')}</h3>
                        <p className="security-desc">{t('gestionarSesionesPermisos')}</p>
                        <button className="btn-danger-outline" onClick={manejarCerrarSesionGlobal}>
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            {t('cerrarSesionTodosTerminales')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}