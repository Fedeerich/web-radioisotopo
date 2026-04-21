import { useEffect, useState } from "react";
import "../styles/PerfilPaciente.css";
import moleculaImg from "../assets/molecula.png";
import { loginService } from "../services/api";
import { useTranslation } from "../hooks/useTranslation";

export function PerfilPacientePage({ paciente, alVolver }) {
    const { t } = useTranslation();
    const [mensajes, setMensajes] = useState([]);
    
    // 1. Registro de actividad y Carga de Mensajes
    useEffect(() => {
        if (paciente && paciente.cip) {
            loginService.registrarVisitaPaciente(paciente.cip);
            cargarHistorialConsultas();
        }
    }, [paciente]);

    const cargarHistorialConsultas = async () => {
        try {
            // Llamada al endpoint de historial que devuelve las notificaciones del paciente
            const data = await loginService.obtenerConsultasPaciente(paciente.cip);
            
            // Validamos que la data sea un array antes de setearla
            if (data && Array.isArray(data)) {
                setMensajes(data);
            } else {
                setMensajes([]);
            }
        } catch (error) {
            console.error("Error cargando mensajes:", error);
            setMensajes([]);
        }
    };

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
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
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
                    </div>
                </div>

                {/* CARD 2: PROGRESO */}
                <div className="card">
                    <h4 className="card-title">{t('progresoRadioterapia')}</h4>
                    <div className="atom-container">
                        <img src={moleculaImg} alt="Molecula" width="40" height="40" />
                        <p className="atom-text">{patientData.tratamiento}</p>
                    </div>
                    <div className="progress-bar-container">
                        <div className={`progress-bar-fill ${patientData.color}`} style={{ width: `${patientData.progreso}%` }}></div>
                    </div>
                </div>

                {/* CARD 3: CONSEJOS */}
                <div className="card">
                    <h4 className="card-title">{t('consonanciaSalud')}</h4>
                    <select className="select-input">
                        <option>{t('seleccionarConsejo')}</option>
                        <option>{t('evitarContactoNinos')}</option>
                        <option>{t('beberLiquido')}</option>
                    </select>
                    <button className="btn-outline" onClick={manejarEnvioConsejo}>{t('enviarSmartWatch')}</button>
                </div>

                {/* FILA INFERIOR */}
                <div className="bottom-row" style={{ gridColumn: 'span 3', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
                    
                    {/* MONITOR EMOCIONAL */}
                    <div className="card emot-card">
                        <h4 className="card-title">{t('monitorEmocional')}</h4>
                        <div className="emoji-row">
                            <div className={`emoji-item ${patientData.valorEmocional === 1 ? 'active green-emoji' : ''}`}><span>😃</span></div>
                            <div className={`emoji-item ${patientData.valorEmocional === 2 ? 'active yellow-emoji' : ''}`}><span>😐</span></div>
                            <div className={`emoji-item ${patientData.valorEmocional === 3 ? 'active orange-emoji' : ''}`}><span>😑</span></div>
                            <div className={`emoji-item ${patientData.valorEmocional === 4 ? 'active red-emoji' : ''}`}><span>😟</span></div>
                        </div>
                        <div className="mood-scale-container">
                            <div className="mood-pointer" style={{ left: patientData.valorEmocional === 1 ? '12%' : patientData.valorEmocional === 2 ? '37%' : patientData.valorEmocional === 3 ? '62%' : '87%' }}>▼</div>
                            <div className="mood-scale">
                                <div className="scale-segment c-green"></div>
                                <div className="scale-segment c-yellow"></div>
                                <div className="scale-segment c-orange"></div>
                                <div className="scale-segment c-red"></div>
                            </div>
                        </div>
                    </div>

                    {/* CENTRO DE COMUNICACIÓN (REAL) */}
                    <div className="card chat-card">
                        <h4 className="card-title">{t('centroComunicacion')}</h4>
                        <div className="message-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {mensajes && mensajes.length > 0 ? (
                                mensajes.map((msg, i) => (
                                    <div className={`msg-item ${msg.leida ? 'read' : 'unread'}`} key={msg.id || i}>
                                        <div className="msg-icon">
                                            <i className={msg.leida ? "fi fi-rr-envelope-open" : "fi fi-sr-envelope"}></i>
                                        </div>
                                        <div className="msg-content">
                                            <div className="msg-left">
                                                <strong>{patientData.nombre}</strong>
                                                <span className="msg-subject">Asunto: {msg.asunto || 'Sin asunto'}</span>
                                            </div>
                                            <span className="msg-preview">{msg.mensaje}</span>
                                            <small className="msg-date">
                                                {msg.fechaEnvio ? new Date(msg.fechaEnvio).toLocaleString() : 'Fecha no disponible'}
                                            </small>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="msg-item empty">
                                    <p style={{ textAlign: 'center', width: '100%', color: '#999', padding: '20px' }}>
                                        {t('noHayMensajesNuevos')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}