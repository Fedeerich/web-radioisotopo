import { SideBar } from '../components/SideBar';
import { NavBar } from '../components/NavBar';
import "../styles/Home.css";

export function HomePage() {
    return (
        <div className="dashboard-layout">
            <SideBar />
            
            <div className="dashboard-main-area">
                <NavBar />
                
                <main className="dashboard-content">
                    <header className="content-header">
                        <h1>Inicio</h1>
                        <p>Resumen del estado de los dispositivos y paciente en tratamiento</p>
                    </header>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon blue">
                                <i className="fi fi-rs-users"></i>
                            </div>
                            <div className="stat-details">
                                <span className="stat-number">142</span>
                                <span className="stat-label">Pacientes Activos</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon red">
                                <i className="fi fi-rs-exclamation"></i>
                            </div>
                            <div className="stat-details">
                                <span className="stat-number">12</span>
                                <span className="stat-label">Alertas de hoy</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon green">
                                <i className="fi fi-rs-signal-alt"></i>
                            </div>
                            <div className="stat-details">
                                <span className="stat-number">94%</span>
                                <span className="stat-label">Relojes conectados</span>
                            </div>
                        </div>
                    </div>

                    <div className="activity-card">
                        <div className="activity-header">
                            <h3><i className="fi fi-rs-bell"></i> Actividad reciente</h3>
                            <button className="btn-view-all">Ver todos</button>
                        </div>
                        
                        <div className="activity-list">
                            <div className="activity-item">
                                <div className="status-dot red-dot"></div>
                                <div className="patient-info">
                                    <span className="patient-name">Ana G.</span>
                                    <span className="patient-status">Ansiedad elevada (8/10)</span>
                                </div>
                                <span className="time-ago">Hace 10min</span>
                                <i className="fi fi-rs-angle-right arrow"></i>
                            </div>

                            <div className="activity-item">
                                <div className="status-dot green-dot"></div>
                                <div className="patient-info">
                                    <span className="patient-name">Luis M.</span>
                                    <span className="patient-status">Sincronización manual completada</span>
                                </div>
                                <span className="time-ago">Hace 45min</span>
                                <i className="fi fi-rs-angle-right arrow"></i>
                            </div>

                            <div className="activity-item">
                                <div className="status-dot blue-dot"></div>
                                <div className="patient-info">
                                    <span className="patient-name">Carlos R.</span>
                                    <span className="patient-status">Inicio de nuevo ciclo de radioterapia</span>
                                </div>
                                <span className="time-ago">Hace 2 horas</span>
                                <i className="fi fi-rs-angle-right arrow"></i>
                            </div>

                            <div className="activity-item">
                                <div className="status-dot yellow-dot"></div>
                                <div className="patient-info">
                                    <span className="patient-name">Helena P.</span>
                                    <span className="patient-status">Batería baja en el dispositivo (15%)</span>
                                </div>
                                <span className="time-ago">Hace 3 horas</span>
                                <i className="fi fi-rs-angle-right arrow"></i>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}