import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker"; 
import { es } from "date-fns/locale";

registerLocale("es", es);

import "react-datepicker/dist/react-datepicker.css";
import "../styles/CrearPaciente.css";

export function CrearPacientePage({ alVolver }) {
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
    const [fechaAdministracion, setFechaAdministracion] = useState(new Date());

    return (
        <div className="crear-paciente-container">
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
                <div className="columna-formularios">
                    
                    <div className="formulario-card">
                        <div className="card-header-icon">
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
                                <div className="datepicker-wrapper">
                                    <DatePicker
                                        selected={fechaNacimiento}
                                        onChange={(date) => setFechaNacimiento(date)}
                                        dateFormat="dd/MM/yyyy"
                                        className="form-input custom-datepicker"
                                        showYearDropdown
                                        dropdownMode="select"
                                        maxDate={new Date()}
                                    />
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

                    <div className="formulario-card">
                        <div className="card-header-icon">
                            <h3>Tratamiento de Radioisótopos</h3>
                        </div>
                        
                        <div className="form-group">
                            <label>Tipos de Radioisótopo</label>
                            <select className="form-input select-styled">
                                <option>Selecciona un isótopo...</option>
                                <option>Iode 131</option>
                                <option>Lutenci 177</option>
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
                                    <option>Mega becquerels (MBq)</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Fecha de administración</label>
                            <div className="datepicker-wrapper">
                                <DatePicker
                                    selected={fechaAdministracion}
                                    onChange={(date) => setFechaAdministracion(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    className="form-input custom-datepicker"
                                    popperClassName="custom-datepicker-popper"
                                    locale="es"
                                    timeCaption="Hora"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="columna-acciones">
                    
                    <div className="formulario-card card-sync">
                        <div className="card-header-icon">
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
                                Buscar dispositivo via NFC/Bluetooth
                            </button>
                        </div>
                    </div>

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