import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker"; 
import { es } from "date-fns/locale";
import { useAuth } from "../context/AuthContext";
import { loginService } from "../services/api";

registerLocale("es", es);

import "react-datepicker/dist/react-datepicker.css";
import "../styles/CrearPaciente.css";

export function CrearPacientePage({ alVolver }) {
    const { usuario } = useAuth(); 

    const [formData, setFormData] = useState({
        nombreCompleto: "",
        cip: "",
        fechaNacimiento: new Date(),
        hospitalReferencia: "Hospital del Mar",
        radioisotopo: "",
        dosis: "",
        unidades: "MBq", 
        fechaAdministracion: new Date()
    });

    const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const manejarAlta = async () => {
        if (!formData.nombreCompleto || !formData.cip || !formData.radioisotopo || !formData.dosis) {
            setMensaje({ texto: "Por favor, completa todos los campos técnicos.", tipo: "error" });
            return;
        }

        setMensaje({ texto: "Sincronizando con CatSalut y generando informe...", tipo: "info" });

        try {
            const payload = {
                paciente: {
                    nombreCompleto: formData.nombreCompleto,
                    cip: formData.cip,
                    fechaNacimiento: formData.fechaNacimiento.toISOString().split('T')[0],
                    hospitalReferencia: formData.hospitalReferencia
                },
                tratamiento: {
                    radioisotopo: formData.radioisotopo,
                    dosis: parseFloat(formData.dosis),
                    unidad: formData.unidades,
                    fechaAdministracion: formData.fechaAdministracion.toISOString()
                }
            };

            await loginService.registrarAltaCompleta(payload);

            await loginService.descargarInformePDF(formData.cip);
            
            setMensaje({ texto: "Alta completada e informe descargado con éxito.", tipo: "exito" });
            
            setTimeout(alVolver, 3000);

        } catch (error) {
            setMensaje({ texto: error.message || "Error en el proceso de alta", tipo: "error" });
        }
    };

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
                    <h1>Alta de pacient nou i tractament</h1>
                    <p>Registre al fitxer de Salut de Catalunya (CatSalut)</p>
                </div>
            </div>

            <div className="grid-crear-paciente">
                <div className="columna-formularios">
                    
                    <div className="formulario-card">
                        <div className="card-header-icon">
                            <h3>Dades Personals (CatSalut)</h3>
                        </div>
                        
                        <div className="form-group">
                            <label>Nom i Cognoms</label>
                            <input 
                                type="text" 
                                name="nombreCompleto"
                                value={formData.nombreCompleto}
                                onChange={handleChange}
                                placeholder="Ej: Marcos Góngora" 
                                className="form-input" 
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group half">
                                <label>CIP (Targeta Sanitària)</label>
                                <input 
                                    type="text" 
                                    name="cip"
                                    value={formData.cip}
                                    onChange={handleChange}
                                    placeholder="FARR000000000" 
                                    className="form-input" 
                                />
                            </div>
                            <div className="form-group half">
                                <label>Data de naixement</label>
                                <div className="datepicker-wrapper">
                                    <DatePicker
                                        selected={formData.fechaNacimiento}
                                        onChange={(date) => setFormData({...formData, fechaNacimiento: date})}
                                        dateFormat="dd/MM/yyyy"
                                        className="form-input custom-datepicker"
                                        showYearDropdown
                                        dropdownMode="select"
                                        maxDate={new Date()}
                                        locale="es"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Hospital de Referència</label>
                            <select 
                                name="hospitalReferencia"
                                value={formData.hospitalReferencia}
                                onChange={handleChange}
                                className="form-input select-styled"
                            >
                                <option value="Hospital del Mar">Hospital del Mar</option>
                                <option value="Hospital Clínic">Hospital Clínic</option>
                                <option value="Hospital Vall d'Hebron">Hospital Vall d'Hebron</option>
                                <option value="Hospital de Sant Pau">Hospital de Sant Pau</option>
                            </select>
                        </div>
                    </div>

                    <div className="formulario-card">
                        <div className="card-header-icon">
                            <h3>Tractament de Radioisòtops</h3>
                        </div>
                        
                        <div className="form-group">
                            <label>Tipus de Radioisòtop</label>
                            <select 
                                name="radioisotopo"
                                value={formData.radioisotopo}
                                onChange={handleChange}
                                className="form-input select-styled"
                            >
                                <option value="">Selecciona un isòtop...</option>
                                <option value="I-131">Iodo-131</option>
                                <option value="Lu-177">Lutecio-177</option>
                                <option value="Co-60">Cobalto-60</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-group half">
                                <label>Dosi Administrada</label>
                                <input 
                                    type="number" 
                                    name="dosis"
                                    step="0.01"
                                    value={formData.dosis}
                                    onChange={handleChange}
                                    placeholder="Ej: 370" 
                                    className="form-input" 
                                />
                            </div>
                            <div className="form-group half">
                                <label>Unitats</label>
                                <select 
                                    name="unidades"
                                    value={formData.unidades}
                                    onChange={handleChange}
                                    className="form-input select-styled"
                                >
                                    <option value="MBq">Mega becquerels (MBq)</option>
                                    <option value="mCi">Milicurio (mCi)</option>
                                    <option value="Ci">Curis (Ci)</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Data i hora d'administració</label>
                            <div className="datepicker-wrapper">
                                <DatePicker
                                    selected={formData.fechaAdministracion}
                                    onChange={(date) => setFormData({...formData, fechaAdministracion: date})}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    className="form-input custom-datepicker"
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
                            <h3>Sincronització de Dispositius</h3>
                        </div>
                        <p className="sync-desc">
                            Apropa el SmartWatch compatible del pacient per iniciar la vinculació.
                        </p>
                        
                        <div className="sync-box">
                            <div className="nfc-icon-wrapper">
                                <svg viewBox="0 0 24 24" width="48" height="48" stroke="#9ca3af" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 8.2a10.9 10.9 0 0 1 16 0"></path>
                                    <path d="M7 11.5a6.5 6.5 0 0 1 10 0"></path>
                                    <path d="M10 14.8a2.1 2.1 0 0 1 4 0"></path>
                                    <circle cx="12" cy="18" r="1"></circle>
                                </svg>
                            </div>
                            <button className="btn-blue-sync" type="button">
                                Buscar dispositiu NFC
                            </button>
                        </div>
                    </div>

                    <div className="card-resumen-green">
                        <h3>Resum de l'Alta</h3>
                        {mensaje.texto && (
                            <div className={`mensaje-status ${mensaje.tipo}`} style={{
                                padding: '10px',
                                borderRadius: '6px',
                                marginBottom: '15px',
                                fontSize: '0.9rem',
                                backgroundColor: mensaje.tipo === 'exito' ? '#dcfce7' : mensaje.tipo === 'error' ? '#fee2e2' : '#e0f2fe',
                                color: mensaje.tipo === 'exito' ? '#166534' : mensaje.tipo === 'error' ? '#991b1b' : '#075985',
                                border: `1px solid ${mensaje.tipo === 'exito' ? '#bbf7d0' : mensaje.tipo === 'error' ? '#fecaca' : '#bae6fd'}`
                            }}>
                                {mensaje.texto}
                            </div>
                        )}
                        <ul className="resumen-lista">
                            <li>Consentiment informat registrat.</li>
                            <li>Monitorització Zero-Config activa.</li>
                            <li>Càlcul de decaïment segons Te efectiu.</li>
                        </ul>
                        <button className="btn-confirmar-verde" onClick={manejarAlta}>
                            <i className="fi fi-sr-disk"></i> Confirmar i Iniciar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}