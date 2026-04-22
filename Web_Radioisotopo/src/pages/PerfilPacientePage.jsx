import { useEffect, useState } from "react";
import "../styles/PerfilPaciente.css";
import moleculaImg from "../assets/molecula.png";
import { loginService } from "../services/api";
import { useTranslation } from "../hooks/useTranslation";

export function PerfilPacientePage({ paciente, alVolver }) {
    const { t } = useTranslation();
    const [mensajes, setMensajes] = useState([]);
    // Estado para la caja verde de "último consejo enviado"
    const [ultimoConsejo, setUltimoConsejo] = useState(null);
    
    // 1. Registro de actividad y carga de mensajes
    useEffect(() => {
        if (paciente && paciente.cip) {
            loginService.registrarVisitaPaciente(paciente.cip);
            // Usamos la función que filtra consultas (mensajes de soporte/instrucciones)
            loginService.obtenerConsultasPaciente(paciente.cip)
                .then(setMensajes)
                .catch(() => setMensajes([]));
        }
    }, [paciente]);

    const patientData = paciente || {
        nombre: t('patientNoSeleccionado'),
        cip: "N/A",
        tratamiento: t('sinTratamiento'),
        progreso: 0,
        color: "gray",
        watchEstado: t('noVinculado'),
        watchUltimaSinc: null,
        valorEmocional: 2 
    };

    // Función para manejar el envío de consejos (Card 3)
    const manejarEnvioConsejo = async () => {
        const select = document.querySelector(".select-input");
        const claveSeleccionada = select.value;

        if (claveSeleccionada && claveSeleccionada !== t('seleccionarConsejo')) {
            try {
                // Enviamos la clave al backend
                await loginService.enviarInstruccionReloj(patientData.cip, claveSeleccionada);
                
                // Actualizamos la caja verde localmente
                setUltimoConsejo({
                    texto: claveSeleccionada, // Aquí podrías mapear la clave a un texto amigable
                    hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });

                alert("Enviat amb èxit");
            } catch (error) {
                alert("Error al enviar");
            }
        }
    };

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
                        <span className={`badge ${patientData.color}`}>{t('tractamentActiu')}</span>
                    </div>
                    <p className="patient-subtitle">
                        {t('idPaciente')}: {patientData.cip} | {patientData.tratamiento}
                    </p>
                </div>
            </div>

            <div className="grid-cards">
                
                {/* CARD 1: SMARTWATCH */}
                <div className="card">
                    <h4 className="card-title">{t('dispositivoSmartwatch')}</h4>
                    <div className="watch-content">
                        <div className="watch-icon-box"><i className="fi fi-sr-watch-smart"></i></div>
                        <div className="watch-info">
                            <strong>{patientData.watchSerie || "Galaxy Watch 8"}</strong>
                            <div className="status-row">
                                <span className={`status-text ${patientData.watchEstado === t('noVinculado') ? 'red' : 'green'}`}>
                                    {patientData.watchEstado === t('noVinculado') ? t('noVinculadoStatus') : t('conectadoTransmitiendo')}
                                </span>
                            </div>
                            <small>{t('bateria')} 85% | {t('ultimaSinc')}: {patientData.watchUltimaSinc ? new Date(patientData.watchUltimaSinc).toLocaleTimeString() : 'N/A'}</small>
                        </div>
                    </div>
                    <div className="watch-actions">
                        <button className="btn-sync">{t('sincronizacionRemota')}</button>
                        <button className="btn-disconnect">
                             <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path><line x1="4" y1="4" x2="20" y2="20"></line></svg>
                        </button>
                    </div>
                    <p className="watch-note">{t('descargaBiometriaAutomatica')}</p>
                </div>

                {/* CARD 2: PROGRESO */}
                <div className="card">
                    <h4 className="card-title">{t('progresoRadioterapia')}</h4>
                    <div className="atom-container">
                        <div className="atom-icon">
                            <img src={moleculaImg} alt="Molecula" width="40" height="40" />
                        </div>
                        <p className="atom-text">{patientData.tratamiento}</p>
                    </div>
                    <div className="progress-stats">
                        <div className="stat-left">
                            <span className={`stat-value ${patientData.color}`}>{t('estado')}</span>
                            <span className="stat-label">{patientData.estado || t('estable')}</span>
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

                {/* CARD 3: CONSEJOS (CON CAJA VERDE DINÁMICA) */}
                <div className="card">
                    <h4 className="card-title">{t('consonanciaSalud')}</h4>
                    <p className="card-desc">{t('empujarConsejosReloj')}</p>
                    
                    {/* Solo mostramos la caja si hay un consejo enviado o cargado */}
                    {ultimoConsejo && (
                        <div className="alert-green">
                            <div className="alert-header">
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                <strong>{ultimoConsejo.texto === 'FASE_ALTA' ? 'Dosi > 400MBq' : ultimoConsejo.texto}</strong>
                            </div>
                            <span className="alert-time">{t('enviadoALes')} {ultimoConsejo.hora}h</span>
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

                {/* FILA INFERIOR */}
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
                                            <strong>{msg.asunto || t('mensajeMedico')}</strong>
                                            <span className="msg-subject">{msg.mensaje}</span>
                                        </div>
                                        <span className="msg-preview">{msg.fechaEnvio ? new Date(msg.fechaEnvio).toLocaleString() : ''}</span>
                                    </div>
                                </div>
                            )) : (
                                <div className="msg-item">
                                    <div className="msg-icon"><i className="fi fi-rs-envelope"></i></div>
                                    <div className="msg-content">
                                        <div className="msg-left">
                                            <strong>{t('consultaGeneral')}</strong>
                                            <span className="msg-subject">{t('noHayMensajesNuevos')}</span>
                                        </div>
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