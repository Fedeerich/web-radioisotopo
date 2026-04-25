/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Pagina para crear el paciente]
AUTHOR:        [Marcos, Wael]
UPDATED:       [25/04/2026]
================================================================================
*/

// IMPORTS
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker"; 
import { es } from "date-fns/locale";
import { useAuth } from "../context/AuthContext";
import { loginService } from "../services/api";
import { useTranslation } from "../hooks/useTranslation";
import { validateName, validateCIP, validateDosis } from "../utils/validations"; 

registerLocale("es", es);

import "react-datepicker/dist/react-datepicker.css";
import "../styles/CrearPaciente.css";

// PAGE CREAR PACIENTE
export function CrearPacientePage({ alVolver }) {
    const { usuario } = useAuth(); 
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        nombreCompleto: "",
        cip: "",
        fechaNacimiento: new Date(),
        hospitalReferencia: "Hospital del Mar",
        radioisotopo: "",
        dosis: "",
        unidades: "MBq", 
        fechaAdministracion: new Date(),
        watchId: ""
    });

    const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
    const [conectando, setConectando] = useState(false);
    const [errores, setErrores] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errores[e.target.name]) {
            setErrores({ ...errores, [e.target.name]: false });
        }
    };

    const vincularRelojBluetooth = async () => {
        try {
            setConectando(true);
            setMensaje({ texto: t('buscandoDispositivo'), tipo: "info" });

            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: ['device_information']
            });

            setFormData({ ...formData, watchId: device.id });
            setMensaje({ texto: `${t('relojVinculado')}: ${device.name || 'Galaxy Watch'}`, tipo: "exito" });

        } catch (error) {
            console.error("Error Bluetooth:", error);
            setMensaje({ texto: t('errorVinculacionBluetooth'), tipo: "error" });
        } finally {
            setConectando(false);
        }
    };

    const manejarAlta = async () => {
        const nuevosErrores = {};
        
        if (!validateName(formData.nombreCompleto)) nuevosErrores.nombreCompleto = true;
        if (!validateCIP(formData.cip)) nuevosErrores.cip = true;
        if (!formData.radioisotopo) nuevosErrores.radioisotopo = true;
        if (!validateDosis(formData.dosis)) nuevosErrores.dosis = true;

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            setMensaje({ texto: t('porFavorRevisaCampos') || "Revisa los campos marcados en rojo.", tipo: "error" });
            return;
        }
        setErrores({});

        setMensaje({ texto: t('sincronizandoCatsalut'), tipo: "info" });

        try {
            const payload = {
                paciente: {
                    nombreCompleto: formData.nombreCompleto,
                    cip: formData.cip,
                    fechaNacimiento: formData.fechaNacimiento.toISOString().split('T')[0],
                    hospitalReferencia: formData.hospitalReferencia,
                    watchId: formData.watchId
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
            
            setMensaje({ texto: t('altaCompletada'), tipo: "exito" });
            setTimeout(alVolver, 3000);

        } catch (error) {
            setMensaje({ texto: error.message || t('errorProcesoAlta'), tipo: "error" });
        }
    };

    return (
        <div className="crear-paciente-container">
            <div className="header-seccion">
                <button className="btn-back-square" onClick={alVolver}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>
                <div className="header-textos">
                    <h1>{t('altaPacienteNuevo')}</h1>
                    <p>{t('registroSalutCatalunya')}</p>
                </div>
            </div>

            <div className="grid-crear-paciente">
                <div className="columna-formularios">
                    <div className="formulario-card">
                        <div className="card-header-icon">
                            <h3>{t('datosPersonales')}</h3>
                        </div>
                        <div className="form-group">
                            <label>{t('nomCognoms')}</label>
                            <input 
                                type="text" 
                                name="nombreCompleto" 
                                value={formData.nombreCompleto} 
                                onChange={handleChange} 
                                placeholder={t('ejemploNombre')} 
                                className={`form-input ${errores.nombreCompleto ? 'input-error' : ''}`} 
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group half">
                                <label>{t('cipTargetaSanitaria')}</label>
                                <input 
                                    type="text" 
                                    name="cip" 
                                    value={formData.cip} 
                                    onChange={handleChange} 
                                    placeholder={t('ejemploCIP')} 
                                    className={`form-input ${errores.cip ? 'input-error' : ''}`} 
                                />
                            </div>
                            <div className="form-group half">
                                <label>{t('dataNaixement')}</label>
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
                        <div className="form-group">
                            <label>{t('hospitalReferencia')}</label>
                            <select name="hospitalReferencia" value={formData.hospitalReferencia} onChange={handleChange} className="form-input select-styled">
                                <option value="Hospital del Mar">Hospital del Mar</option>
                                <option value="Hospital Clínic">Hospital Clínic</option>
                                <option value="Hospital Vall d'Hebron">Hospital Vall d'Hebron</option>
                                <option value="Hospital de Sant Pau">Hospital de Sant Pau</option>
                            </select>
                        </div>
                    </div>

                    <div className="formulario-card">
                        <div className="card-header-icon">
                            <h3>{t('tractamentRadioisotops')}</h3>
                        </div>
                        <div className="form-group">
                            <label>{t('tipusRadioisotop')}</label>
                            <select 
                                name="radioisotopo" 
                                value={formData.radioisotopo} 
                                onChange={handleChange} 
                                className={`form-input select-styled ${errores.radioisotopo ? 'input-error' : ''}`}
                            >
                                <option value="">{t('seleccionaIsotopo')}</option>
                                <option value="I-131">{t('iodo131')}</option>
                                <option value="Lu-177">{t('lutecio177')}</option>
                                <option value="Co-60">{t('cobalto60')}</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <div className="form-group half">
                                <label>{t('dosiAdministrada')}</label>
                                <input 
                                    type="text"
                                    name="dosis" 
                                    value={formData.dosis} 
                                    onChange={handleChange} 
                                    placeholder={t('ejemploDosis')} 
                                    className={`form-input ${errores.dosis ? 'input-error' : ''}`} 
                                />
                            </div>
                            <div className="form-group half">
                                <label>{t('unitats')}</label>
                                <select name="unidades" value={formData.unidades} onChange={handleChange} className="form-input select-styled">
                                    <option value="MBq">{t('megaBecquerels')}</option>
                                    <option value="mCi">{t('milicurio')}</option>
                                    <option value="Ci">{t('curis')}</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>{t('dataHoraAdministracio')}</label>
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

                <div className="columna-acciones">
                    <div className="formulario-card card-sync">
                        <div className="card-header-icon">
                            <h3>{t('sincronitzacioDispositius')}</h3>
                        </div>
                        <p className="sync-desc">{t('aprobaSmartWatch')}</p>
                        
                        <div className="sync-box">
                            <div className="nfc-icon-wrapper">
                                <svg viewBox="0 0 24 24" width="48" height="48" stroke={formData.watchId ? "#10b981" : "#9ca3af"} strokeWidth="1.5" fill="none">
                                    <path d="M4 8.2a10.9 10.9 0 0 1 16 0"></path>
                                    <path d="M7 11.5a6.5 6.5 0 0 1 10 0"></path>
                                    <path d="M10 14.8a2.1 2.1 0 0 1 4 0"></path>
                                    <circle cx="12" cy="18" r="1"></circle>
                                </svg>
                            </div>
                            
                            <button 
                                className={formData.watchId ? "btn-blue-sync success" : "btn-blue-sync"} 
                                type="button"
                                onClick={vincularRelojBluetooth}
                                disabled={conectando}
                            >
                                {conectando ? t('buscando') : formData.watchId ? t('cambiarReloj') : t('vincularBluetooth')}
                            </button>
                            
                            {formData.watchId && (
                                <p className="watch-id-display">ID: {formData.watchId.substring(0, 15)}...</p>
                            )}
                        </div>
                    </div>

                    <div className="card-resumen-green">
                        <h3>{t('resumAlta')}</h3>
                        {mensaje.texto && (
                            <div className={`mensaje-status ${mensaje.tipo}`} style={{
                                padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '0.9rem',
                                backgroundColor: mensaje.tipo === 'exito' ? '#dcfce7' : mensaje.tipo === 'error' ? '#fee2e2' : '#e0f2fe',
                                color: mensaje.tipo === 'exito' ? '#166534' : mensaje.tipo === 'error' ? '#991b1b' : '#075985',
                                border: `1px solid ${mensaje.tipo === 'exito' ? '#bbf7d0' : mensaje.tipo === 'error' ? '#fecaca' : '#bae6fd'}`
                            }}>
                                {mensaje.texto}
                            </div>
                        )}
                        <ul className="resumen-lista">
                            <li>{t('consentimentInformat')}</li>
                            <li>{t('monitoritzacioZeroConfig')}</li>
                            <li>{t('calculDecayefectiu')}</li>
                            {formData.watchId && <li style={{color: '#166534', fontWeight: 'bold'}}>✓ {t('relojVinculado')}</li>}
                        </ul>
                        <button className="btn-confirmar-verde" onClick={manejarAlta}>
                            <i className="fi fi-sr-disk"></i> {t('confirmarIniciar')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}