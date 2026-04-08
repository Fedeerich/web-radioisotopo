import { useEffect } from "react";
import "../styles/PerfilPaciente.css";
import moleculaImg from "../assets/molecula.png";
import { loginService } from "../services/api";
import { useTranslation } from "../hooks/useTranslation";

export function PerfilPacientePage({ paciente, alVolver }) {
    const { t } = useTranslation();
    
    // 1. Registro de actividad al entrar
    useEffect(() => {
        if (paciente && paciente.cip) {
            loginService.registrarVisitaPaciente(paciente.cip);
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
        valorEmocional: 50
    };

    // Función para manejar el envío de consejos (Card 3)
    const manejarEnvioConsejo = async () => {
        const select = document.querySelector(".select-input");
        const consejo = select.value;
        if (consejo && consejo !== t('seleccionarConsejo')) {
            try {
                await loginService.enviarInstruccionReloj(patientData.cip, consejo);
                alert(t('mensajeEnviadoExito'));
            } catch (error) {
                alert(t('errorEnviarConsejo'));
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
                        <div className="watch-icon-box">
                            <i className="fi fi-sr-watch-smart"></i>
                        </div>
                        <div className="watch-info">
                            <strong>{patientData.watchSerie || "Galaxy Watch 8"}</strong>
                            <div className="status-row">
                                <span className={`status-text ${patientData.watchEstado === t('noVinculado') ? 'red' : 'green'}`}>
                                    {patientData.watchEstado === t('noVinculado') ? t('noVinculadoStatus') : t('conectadoTransmitiendo')}
                                </span>
                            </div>
                            <small>
                                {t('bateria')} 85% | {t('ultimaSinc')}: {patientData.watchUltimaSinc ? new Date(patientData.watchUltimaSinc).toLocaleTimeString() : 'N/A'}
                            </small>
                        </div>
                    </div>
                    <div className="watch-actions">
                        <button className="btn-sync">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                            {t('sincronizacionRemota')}
                        </button>
                        <button className="btn-disconnect">
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path><line x1="4" y1="4" x2="20" y2="20"></line></svg>
                        </button>
                    </div>
                    <p className="watch-note">{t('descargaBiometriaAutomatica')}</p>
                </div>

                {/* CARD 2: PROGRESO RADIACTIVO */}
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
                        <div 
                            className={`progress-bar-fill ${patientData.color}`} 
                            style={{ width: `${patientData.progreso}%` }}
                        ></div>
                    </div>
                </div>

                {/* CARD 3: CONSEJOS */}
                <div className="card">
                    <h4 className="card-title">{t('consonanciaSalud')}</h4>
                    <p className="card-desc">{t('empujarConsejosReloj')}</p>
                    <div className="alert-green">
                        <div className="alert-header">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <strong>{t('hidratacionBeberAgua')}</strong>
                        </div>
                        <span className="alert-time">{t('enviadoALes')} 08:30h</span>
                    </div>
                    <select className="select-input">
                        <option>{t('seleccionarConsejo')}</option>
                        <option>{t('evitarContactoNinos')}</option>
                        <option>{t('beberLiquido')}</option>
                        <option>{t('usarBanoExclusivo')}</option>
                    </select>
                    <button className="btn-outline" onClick={manejarEnvioConsejo}>{t('enviarSmartWatch')}</button>
                </div>

                {/* FILA INFERIOR: EMOCIONAL Y CHAT */}
                <div className="bottom-row" style={{ gridColumn: 'span 3', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
                    <div className="card emot-card">
                        <h4 className="card-title">{t('monitorEmocional')}</h4>
                        <div className="emot-content">
                            <div className="emoji-row">
                                <div className={`emoji-item green-emoji ${patientData.valorEmocional >= 75 ? 'active' : ''}`}>
                                    <span>😃</span>
                                </div>
                                <div className={`emoji-item yellow-emoji ${patientData.valorEmocional >= 50 && patientData.valorEmocional < 75 ? 'active' : ''}`}>
                                    <span>😐</span>
                                </div>
                                <div className={`emoji-item orange-emoji ${patientData.valorEmocional >= 25 && patientData.valorEmocional < 50 ? 'active' : ''}`}>
                                    <span>😒</span>
                                </div>
                                <div className={`emoji-item red-emoji ${patientData.valorEmocional < 25 ? 'active' : ''}`}>
                                    <span>😡</span>
                                </div>
                            </div>

                            <div className="mood-scale-container">
                                <div className="mood-scale">
                                    <div className="scale-segment c-green"></div>
                                    <div className="scale-segment c-yellow"></div>
                                    <div className="scale-segment c-orange"></div>
                                    <div className="scale-segment c-red"></div>
                                </div>

                                <div 
                                    className="mood-pointer" 
                                    style={{ left: `${100 - (patientData.valorEmocional || 50)}%` }}
                                >
                                    ▼
                                </div>

                                <div className="mood-labels">
                                    <span>EXCELLENT</span>
                                    <span>GOOD</span>
                                    <span>REGULAR</span>
                                    <span className="two-lines">NEEDS<br/>IMPROVEMENT</span>
                                </div>

                                <p className="mood-note">
                                    {t('esteEsEstadoDiario')}
                                </p>
                            </div>
                        </div>
                    </div>
                    

                    <div className="card chat-card">
                        <h4 className="card-title">{t('centroComunicacion')}</h4>
                        <div className="message-list">
                            {[
                                { sub: t('consultaGeneral'), pre: t('noHayMensajesNuevos') }
                            ].map((msg, i) => (
                                <div className="msg-item" key={i}>
                                    <div className="msg-icon"><i className="fi fi-rs-envelope"></i></div>
                                    <div className="msg-content">
                                        <div className="msg-left">
                                            <strong>{patientData.nombre}</strong>
                                            <span className="msg-subject">Asunto: {msg.sub}</span>
                                        </div>
                                        <span className="msg-preview">{msg.pre}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}