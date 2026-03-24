import "../styles/CrearPaciente.css";

export function CrearPacientePage({ alVolver }) {
    return (
        <div className="crear-paciente-container">
            {/* Cabecera Principal */}
            <div className="header-seccion">
                <button className="btn-back-square" onClick={alVolver}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>
                <div className="header-textos">
                    <h1>Alta de paciente nuevo y tratamiento.</h1>
                    <p>Registro al registro de Salud de Cataluña (CatSalut)</p>
                </div>
            </div>

            <div className="grid-crear-paciente">
                {/* COLUMNA IZQUIERDA: Formularios */}
                <div className="columna-formularios">
                    
                    {/* Tarjeta 1: Datos Personales */}
                    <div className="formulario-card">
                        <div className="card-header-icon">
                            <span className="icon-blue">👤</span>
                            <h3>Datos Personales (CatSalut)</h3>
                        </div>
                        
                        <div className="form-group">
                            <label>Nombre y Apellido</label>
                            <input type="text" placeholder="Ej: Marcos Góngora" className="form-input" />
                        </div>

                        <div className="form-row">
                            <div className="form-group half">
                                <label>CIP (Tarjeta Sanitària)</label>
                                <input type="text" placeholder="FARR000000000" className="form-input" />
                            </div>
                            <div className="form-group half">
                                <label>Fecha de nacimiento</label>
                                <div className="input-with-icon">
                                    <input type="text" placeholder="dd/mm/aaaa" className="form-input" />
                                    <i className="fi fi-sr-calendar icon-right"></i>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Hospital de Referencia</label>
                            <select className="form-input select-styled">
                                <option>Hospital del Mar</option>
                            </select>
                        </div>
                    </div>

                    {/* Tarjeta 2: Tratamiento */}
                    <div className="formulario-card">
                        <div className="card-header-icon">
                            <span className="icon-yellow">💊</span>
                            <h3>Tratamiento de Radioisótopos</h3>
                        </div>
                        
                        <div className="form-group">
                            <label>Tipos de Radioisótopo</label>
                            <select className="form-input select-styled">
                                <option>Selecciona un isótopo...</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-group half">
                                <label>Dosis/Radiación</label>
                                <input type="text" placeholder="0 - 10.000" className="form-input" />
                            </div>
                            <div className="form-group half">
                                <label>Unidades</label>
                                <select className="form-input select-styled">
                                    <option>Curis (Ci)</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Fecha de administración</label>
                            <div className="input-with-icon">
                                <input type="text" placeholder="dd/mm/aaaa --:--" className="form-input" />
                                <i className="fi fi-sr-calendar icon-right"></i>
                            </div>
                        </div>
                    </div>

                </div>

                {/* COLUMNA DERECHA: Acciones */}
                <div className="columna-acciones">
                    
                    {/* Tarjeta 3: Sincronización */}
                    <div className="formulario-card card-sync">
                        <div className="card-header-icon">
                            <span className="icon-blue">⌚</span>
                            <h3>Sincronización de Dispositivos (Zero-Config)</h3>
                        </div>
                        <p className="sync-desc">
                            Acosta el SmartWatch compatible del pacient al terminal per iniciar la sincronització segura.
                        </p>
                        
                        <div className="sync-box">
                            <div className="nfc-icon-wrapper">
                                <svg viewBox="0 0 24 24" width="48" height="48" stroke="#9ca3af" strokeWidth="1.5" fill="none">
                                    <path d="M4 8.2a10.9 10.9 0 0 1 16 0"></path>
                                    <path d="M7 11.5a6.5 6.5 0 0 1 10 0"></path>
                                    <path d="M10 14.8a2.1 2.1 0 0 1 4 0"></path>
                                    <circle cx="12" cy="18" r="1"></circle>
                                </svg>
                            </div>
                            <button className="btn-blue-sync">
                                Cercar dispositiu via NFC/Bluetooth
                            </button>
                        </div>
                    </div>

                    {/* Tarjeta 4: Resumen y Confirmación */}
                    <div className="card-resumen-green">
                        <h3>Resumen del Alta</h3>
                        <ul className="resumen-lista">
                            <li>Registro del consentimiento informado para el uso de datos digitales.</li>
                            <li>Sincronización automática de rutinas de actividad física diaria.</li>
                            <li>Validación del plan de seguimiento personalizado post-alta.</li>
                        </ul>
                        
                        <button className="btn-confirmar-verde">
                            <i className="fi fi-sr-disk"></i> Confirmar alta i iniciar Monitorització
                        </button>
                        <p className="warning-red">Cal vincular un dispositiu</p>
                    </div>

                </div>
            </div>
        </div>
    );
}