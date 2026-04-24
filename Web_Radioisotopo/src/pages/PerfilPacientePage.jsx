/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Pagina para ver el perfil de cada paciente - Reloj Simplificado]
AUTHOR:        [Marcos, Wael]
UPDATED:       [23/04/2026]
================================================================================
*/

import { useEffect, useState } from "react";
import "../styles/PerfilPaciente.css";
import moleculaImg from "../assets/molecula.png";
import { loginService } from "../services/api";
import { useTranslation } from "../hooks/useTranslation";

export function PerfilPacientePage({ paciente, alVolver }) {
    const { t } = useTranslation();
    const [mensajes, setMensajes] = useState([]);
    const [ultimoConsejo, setUltimoConsejo] = useState(null);

    useEffect(() => {
        if (paciente && paciente.cip) {
            loginService.registrarVisitaPaciente(paciente.cip);

            loginService.obtenerConsultasPaciente(paciente.cip)
                .then(data => {
                    const soloConsultasPaciente = data.filter(msg => 
                        msg.asunto !== "Consonancia de Salud" && 
                        msg.asunto !== "Consonancia" && 
                        msg.asunto !== "Instrucción"
                    );
                    setMensajes(soloConsultasPaciente);
                })
                .catch(() => setMensajes([]));
        }
    }, [paciente?.cip]);

    const patientData = paciente || {
        nombre: t('patientNoSeleccionado'),
        cip: "N/A",
        tratamiento: t('sinTratamiento'),
        progreso: 0,
        color: "gray",
        valorEmocional: 2 
    };

    const manejarEnvioConsejo = async () => {
        const select = document.querySelector(".select-input");
        const claveSeleccionada = select.value;

        if (claveSeleccionada && claveSeleccionada !== t('seleccionarConsejo')) {
            try {
                await loginService.enviarInstruccionReloj(patientData.cip, claveSeleccionada);
                
                setUltimoConsejo({
                    texto: claveSeleccionada === 'FASE_ALTA' ? 'Dosi > 400MBq' : 
                           claveSeleccionada === 'FASE_DECAIMIENTO' ? '400MBq - 2MBq' : 'Exempció (0MBq)',
                    hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });

                alert("Enviat amb èxit");
            } catch (error) {
                alert("Error al enviar");
            }
        }
    };

    const tieneReloj = paciente?.watchId && paciente.watchId !== "null" && paciente.watchId.trim() !== "";

    return (
        <div className="detalle-container">
            <div className="patient-header">
                <button className="back-btn" onClick={alVolver}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>
                <div className="patient-title-area">
                    <div className="patient-title-row">
                        <h1 className="patient-name-2">{patientData.nombre}</h1>
                        <span className={`badge badge-tratamiento ${patientData.color}`}>{t('tractamentActiu')}</span>
                    </div>
                    <p className="patient-subtitle">
                        {t('idPaciente')}: {patientData.cip} | {patientData.tratamiento}
                    </p>
                </div>
            </div>

            <div className="grid-cards">
                
                <div className="card">
                    <h4 className="card-title">{t('dispositivoSmartwatch')}</h4>
                    <div className="watch-elegant-container">
                        
                        <div className="watch-elegant-icon">
                            <i className="fi fi-sr-watch-smart"></i>
                            <div className={`watch-elegant-badge ${tieneReloj ? 'connected' : 'disconnected'}`}>
                                <i className={tieneReloj ? "fi fi-rs-check" : "fi fi-rs-cross-small"}></i>
                            </div>
                        </div>
                        
                        <div className="watch-elegant-info">
                            <strong className={tieneReloj ? 'text-connected' : 'text-disconnected'}>
                                {tieneReloj ? t('conectadoTransmitiendo') : t('noVinculado')}
                            </strong>
                            <p>
                                {tieneReloj ? (paciente.watchModel || "Galaxy Watch 8") : "Dispositivo no asignado en el alta."}
                            </p>
                        </div>

                        <div className="watch-note-text">
                            <p>Nota: Actualmente si el dispositivo no ha sido vinculado en el alta no puede, vincularse posteriormente.</p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h4 className="card-title">{t('progresoRadioterapia')}</h4>
                    <div className="atom-container">
                        <div className="atom-icon">
                            <img src={moleculaImg} alt="Molecula" />
                        </div>
                        <p className="atom-text">{patientData.tratamiento}</p>
                    </div>
                    <div className="progress-stats">
                        <div className="stat-left">
                            <span className={`stat-value ${patientData.color}`}>{t('estado')}</span>
                            <span className="stat-label">{paciente?.estado || t('estable')}</span>
                        </div>
                        <div className="stat-right">
                            <span className="stat-value black">{patientData.progreso}%</span>
                            <span className="stat-label">{t('cargaActiva')}</span>
                        </div>
                    </div>
                    <div className="progress-bar-container">
                        <div className={`progress-bar-fill ${patientData.color}`} style={{ width: `${patientData.progreso}%` }}></div>
                    </div>
                </div>

                <div className="card">
                    <h4 className="card-title">{t('consonanciaSalud')}</h4>
                    <p className="card-desc">{t('empujarConsejosReloj')}</p>
                    
                    {ultimoConsejo ? (
                        <div className="alert-green">
                            <div className="alert-header">
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                <strong>{ultimoConsejo.texto}</strong>
                            </div>
                            <span className="alert-time">{t('enviadoALes')} {ultimoConsejo.hora}h</span>
                        </div>
                    ) : (
                        <div className="alert-naranja">
                            <div className="alert-header">
                                <span className="circled-i">i</span>
                                <strong>{t('noHayMensajeEnviado')}</strong>
                            </div>
                            <span className="alert-time">{t('enviaUnConsejo')}</span>
                        </div>
                    )}

                    <select className="select-input">
                        <option>{t('seleccionarConsejo')}</option>
                        <option value="FASE_ALTA">Dosi &gt; 400MBq</option>
                        <option value="FASE_DECAIMIENTO">400MBq - 2MBq</option>
                        <option value="FASE_EXENCION">Exempció (0MBq)</option>
                    </select>
                    <button className="btn-outline" onClick={manejarEnvioConsejo}>{t('enviarSmartWatch')}</button>
                </div>

                <div className="bottom-row" style={{ gridColumn: 'span 3', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
                    <div className="card emot-card">
                        <h4 className="card-title">{t('monitorEmocional')}</h4>
                        <div className="emot-content">
                            <div className="emoji-row">
                                <div className={`emoji-item green-emoji ${patientData.valorEmocional === 1 ? 'active' : ''}`}><span>😃</span></div>
                                <div className={`emoji-item yellow-emoji ${patientData.valorEmocional === 2 ? 'active' : ''}`}><span>😐</span></div>
                                <div className={`emoji-item orange-emoji ${patientData.valorEmocional === 3 ? 'active' : ''}`}><span>😑</span></div>
                                <div className={`emoji-item red-emoji ${patientData.valorEmocional === 4 ? 'active' : ''}`}><span>😟</span></div>
                            </div>
                            <div className="mood-scale-container">
                                <div className="mood-scale">
                                    <div className="scale-segment c-green"></div>
                                    <div className="scale-segment c-yellow"></div>
                                    <div className="scale-segment c-orange"></div>
                                    <div className="scale-segment c-red"></div>
                                </div>
                                <div className="mood-pointer" style={{ left: patientData.valorEmocional === 1 ? '12%' : patientData.valorEmocional === 2 ? '37%' : patientData.valorEmocional === 3 ? '62%' : '87%' }}>▼</div>
                                <div className="mood-labels">
                                    <span>EXCELLENT</span><span>GOOD</span><span>REGULAR</span><span className="two-lines">NEEDS<br/>IMPROVEMENT</span>
                                </div>
                                <div className="mood-text">
                                    <p>Nota: Este es el estado diario del paciente, si no marca ningún estado saldrá a la mitad por defecto.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card chat-card">
                        <h4 className="card-title">{t('centroComunicacion')}</h4>
                        <div className="message-list">
                            {mensajes.length > 0 ? mensajes.map((msg, i) => (
                                <div className="msg-item" key={i}>
                                    <div className="msg-icon"><i className="fi fi-rs-envelope"></i></div>
                                    <div className="msg-content">
                                        <div className="msg-left">
                                            <strong style={{fontSize: '1.05rem', display: 'block'}}>{msg.asunto}</strong>
                                            <span className="msg-subject" style={{color: '#555'}}>{msg.mensaje}</span>
                                        </div>
                                        <small className="msg-preview">{msg.fechaEnvio ? new Date(msg.fechaEnvio).toLocaleString([], {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'}) : ''}</small>
                                    </div>
                                </div>
                            )) : (
                                <div className="msg-item empty-state">
                                    <div className="msg-icon"><i className="fi fi-rs-envelope-open"></i></div>
                                    <div className="msg-content">
                                        <p>{t('noHayMensajesNuevos')}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}