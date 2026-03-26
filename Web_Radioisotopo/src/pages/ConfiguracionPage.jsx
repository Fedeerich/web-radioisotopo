import "../styles/Configuracion.css";

export function ConfiguracionPage({ alVolver }) {
    return (
        <div className="configuracion-container">
            <div className="header-seccion">
                <button className="btn-back-square" onClick={alVolver}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>
                <div className="header-textos">
                    <h1>Configuración del Sistema</h1>
                    <p>Ajustes de cuenta, alertas y preferencias del entorno clínico</p>
                </div>
            </div>

            <div className="grid-configuracion">
                
                <div className="columna-ajustes">
                    
                    <div className="formulario-card">
                        <div className="card-header-icon">
                            <h3>Datos de la Cuenta</h3>
                        </div>
                        <div className="form-group">
                            <label>Nombre del Profesional</label>
                            <input type="text" value="Dr. Nombre Apellido" disabled className="form-input disabled-input" />
                        </div>
                        <div className="form-group">
                            <label>Correo Electrónico</label>
                            <input type="text" value="doctor@hospital.cat" disabled className="form-input disabled-input" />
                        </div>
                        <div className="form-group">
                            <label>Especialidad</label>
                            <input type="text" value="Oncología Radioterápica" disabled className="form-input disabled-input" />
                        </div>
                        <button className="btn-blue-outline">Cambiar contraseña</button>
                    </div>

                    <div className="formulario-card">
                        <div className="card-header-icon">
                            <h3>Preferencias del Sistema</h3>
                        </div>
                        <div className="form-group">
                            <label>Idioma de la interfaz</label>
                            <select className="form-input select-styled">
                                <option>Castellano</option>
                                <option>Català</option>
                                <option>English</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Zona Horaria</label>
                            <select className="form-input select-styled">
                                <option>Europa/Madrid (CET)</option>
                                <option>Europa/Londres (GMT)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="columna-ajustes">
                    
                    <div className="formulario-card">
                        <div className="card-header-icon">
                            <h3>Notificaciones Clínicas</h3>
                        </div>
                        
                        <div className="toggle-list">
                            <div className="toggle-item">
                                <div className="toggle-text">
                                    <strong>Batería baja en dispositivos</strong>
                                    <p>Avisar cuando un SmartWatch baje del 15%</p>
                                </div>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            
                            <div className="toggle-item">
                                <div className="toggle-text">
                                    <strong>Desconexión biométrica</strong>
                                    <p>Alerta inmediata si se pierde la señal del paciente</p>
                                </div>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            
                            <div className="toggle-item">
                                <div className="toggle-text">
                                    <strong>Resumen semanal</strong>
                                    <p>Recibir informe de evolución por correo</p>
                                </div>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div className="toggle-item">
                                <div className="toggle-text">
                                    <strong>Alerta de Radiación Segura</strong>
                                    <p>Avisar cuando el paciente alcance niveles seguros para el contacto</p>
                                </div>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider round"></span>
                                </label>
                            </div>

                            <div className="toggle-item">
                                <div className="toggle-text">
                                    <strong>Anomalía en Constantes Vitales</strong>
                                    <p>Notificar alteraciones graves en el ritmo cardíaco o temperatura</p>
                                </div>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider round"></span>
                                </label>
                            </div>

                            <div className="toggle-item">
                                <div className="toggle-text">
                                    <strong>Fallo de sincronización</strong>
                                    <p>Avisar si un reloj no envía datos durante más de 12 horas</p>
                                </div>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="card-resumen-green danger-zone">
                        <h3 className="warning-red">Zona de Seguridad</h3>
                        <p className="security-desc">Gestiona las sesiones activas y los permisos de acceso de tu cuenta clínica.</p>
                        <button className="btn-danger-outline">
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            Cerrar sesión en todos los terminales
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}