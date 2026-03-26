import "../styles/PerfilPaciente.css";
import moleculaImg from "../assets/molecula.png";

export function PerfilPacientePage({ paciente, alVolver }) {
    const patientData = paciente || {
        nombre: "Jordi Ferré",
        id: "FARR345678911",
        edad: 48,
        tratamiento: "Radioterapia Iodo 131 (Dosis: 150 MBq)"
    };

    return (
        <div className="detalle-container">
            <div className="patient-header">
                <button className="back-btn" onClick={alVolver}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button>
                <div className="patient-title-area">
                    <div className="patient-title-row">
                        <h1 className="patient-name-2">{patientData.nombre}</h1>
                        <span className="badge active">Tractament Actiu</span>
                    </div>
                    <p className="patient-subtitle">
                        ID Paciente: {patientData.id} | {patientData.edad} Años | {patientData.tratamiento}
                    </p>
                </div>
            </div>

            <div className="grid-cards">
                
                <div className="card">
                    <h4 className="card-title">
                        Dispositivo Smartwatch
                    </h4>
                    
                    <div className="watch-content">
                        <div className="watch-icon-box">
                            <i className="fi fi-sr-watch-smart"></i>
                        </div>
                        <div className="watch-info">
                            <strong>Galaxy Watch 8</strong>
                            <div className="status-row">
                                <span className="status-text green">Conectado y transmitiendo</span>
                            </div>
                            <small>Batería 85% | Última sinc: Hace 5 min</small>
                        </div>
                    </div>

                    <div className="watch-actions">
                        <button className="btn-sync">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                            Sincronizacion Remota
                        </button>
                        <button className="btn-disconnect">
                            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path><line x1="4" y1="4" x2="20" y2="20"></line></svg>
                        </button>
                    </div>
                    
                    <p className="watch-note">
                        El paciente no necesita interactuar, la descarga de biometría es automática
                    </p>
                </div>

                <div className="card">
                    <h4 className="card-title">
                        Progreso Radioterapia
                    </h4>
                    
                    <div className="atom-container">
                        <div className="atom-icon">
                            <img src={moleculaImg} alt="Molecula del tratamiento" width="40" height="40" />
                        </div>
                        <p className="atom-text">Iodo 131 (150MBq)</p>
                    </div>

                    <div className="progress-stats">
                        <div className="stat-left">
                            <span className="stat-value green">15/25</span>
                            <span className="stat-label">Sesiones Completadas</span>
                        </div>
                        <div className="stat-right">
                            <span className="stat-value black">60%</span>
                            <span className="stat-label">Avance Total</span>
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{width: '60%'}}></div>
                    </div>
                </div>

                <div className="card">
                    <h4 className="card-title">
                        Consonancia de Salud
                    </h4>
                    <p className="card-desc">Empuja consejos personalizados a la pantalla del reloj del paciente</p>
                    
                    <div className="alert-green">
                        <div className="alert-header">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <strong>Hidratación: Beber 2L de agua hoy</strong>
                        </div>
                        <span className="alert-time">Enviado a las 08:30h</span>
                    </div>

                    <select className="select-input">
                        <option>Seleccionar consejo predefinido...</option>
                    </select>

                    <button className="btn-outline">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        Enviar al SmartWatch
                    </button>
                </div>

                <div className="bottom-row" style={{ gridColumn: 'span 3', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div className="card emot-card">
                    <h4 className="card-title">
                        Monitor Emocional (Evolución semanal)
                    </h4>
                    
                    <div className="emot-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="emoji-row">
                        <div className="emoji-item green-emoji active">
                            <span>😃</span>
                        </div>
                        <div className="emoji-item yellow-emoji">
                            <span>😐</span>
                        </div>
                        <div className="emoji-item orange-emoji">
                            <span>😒</span>
                        </div>
                        <div className="emoji-item red-emoji">
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
                        <div className="mood-pointer" style={{left: '37.5%'}}>▼</div>
                        <div className="mood-labels">
                            <span>EXCELLENT</span>
                            <span>GOOD</span>
                            <span>REGULAR</span>
                            <span className="two-lines">NEEDS<br/>IMPROVEMENT</span>
                        </div>
                    </div>

                    <p className="mood-note">
                        Este es el estado diario del paciente, si no marca ningún estado saldrá a la mitad por defecto.
                    </p>
                    </div>
                </div>

                <div className="card chat-card">
                    <div className="chat-header">
                        <h4 className="card-title">
                            Centro de comunicación directa
                        </h4>
                    </div>
                    
                    <div className="message-list">
                        <div className="msg-item">
                            <div className="msg-icon"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                            <div className="msg-content">
                                <div className="msg-left">
                                    <strong>{patientData.nombre}</strong>
                                    <span className="msg-subject">Asunto: Reloj Roto</span>
                                </div>
                                <span className="msg-preview">Buenos días, necesito que me revisen el reloj no se encie...</span>
                            </div>
                        </div>
                        
                        <div className="msg-item">
                            <div className="msg-icon"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                            <div className="msg-content">
                                <div className="msg-left">
                                    <strong>{patientData.nombre}</strong>
                                    <span className="msg-subject">Asunto: Mal estar</span>
                                </div>
                                <span className="msg-preview">Buenas tardes, últimamente estoy sintiendo mal estar despues de comer...</span>
                            </div>
                        </div>

                        <div className="msg-item">
                            <div className="msg-icon"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                            <div className="msg-content">
                                <div className="msg-left">
                                    <strong>{patientData.nombre}</strong>
                                    <span className="msg-subject">Asunto: Errores app</span>
                                </div>
                                <span className="msg-preview">No me funciona la aplicación, llevo 2 semanas con el mismo problema estoy ya ha...</span>
                            </div>
                        </div>

                        <div className="msg-item">
                            <div className="msg-icon"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                            <div className="msg-content">
                                <div className="msg-left">
                                    <strong>{patientData.nombre}</strong>
                                    <span className="msg-subject">Asunto: SOS</span>
                                </div>
                                <span className="msg-preview">Buenas noches, no me funciona el SOS y me encuentro bast...</span>
                            </div>
                        </div>

                        <div className="msg-item border-0">
                            <div className="msg-icon"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                            <div className="msg-content">
                                <div className="msg-left">
                                    <strong>{patientData.nombre}</strong>
                                    <span className="msg-subject">Asunto: Apetito</span>
                                </div>
                                <span className="msg-preview">Buenas tardes, no se que me pasa, pero no como bien, no tengo apetito...</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

            </div>
        </div>
    );
}