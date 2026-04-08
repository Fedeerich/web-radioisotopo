import { useState, useEffect } from "react";
import { loginService } from "../services/api";
import "../styles/Home.css";
import { useTranslation } from "../hooks/useTranslation";

export function HomePage({ alSeleccionarPaciente }) {
    const { t } = useTranslation();
    const [totalPacientes, setTotalPacientes] = useState("...");
    const [alertasHoy, setAlertasHoy] = useState(0);
    const [actividadReciente, setActividadReciente] = useState([]);

    const formatearTiempo = (fecha) => {
        const ahora = new Date();
        const registro = new Date(fecha);
        const diffInMinutes = Math.floor((ahora - registro) / 60000);

        if (diffInMinutes < 1) return t('ahoraMismo');
        if (diffInMinutes < 60) return t('haceMin').replace('{min}', diffInMinutes);
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return t('haceH').replace('{horas}', diffInHours);
        return registro.toLocaleDateString();
    };

    useEffect(() => {
        const cargarDatosHome = async () => {
            try {
                const total = await loginService.obtenerTotalPacientes();
                setTotalPacientes(total);

                const alertas = await loginService.obtenerAlertasHoy();
                setAlertasHoy(alertas);

                const recientes = await loginService.obtenerPacientesRecientes();
                setActividadReciente(recientes);
            } catch (error) {
                console.error("Error cargando datos de la Home:", error);
            }
        };

        cargarDatosHome();
        const interval = setInterval(cargarDatosHome, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <header className="content-header">
                <h1>{t('inicio')}</h1>
                <p>{t('resumenDispositivosPacientes')}</p>
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon blue">
                        <i className="fi fi-rs-users"></i>
                    </div>
                    <div className="stat-details">
                        <span className="stat-number">{totalPacientes}</span>
                        <span className="stat-label">{t('pacientesActivos')}</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon red">
                        <i className="fi fi-rs-exclamation"></i>
                    </div>
                    <div className="stat-details">
                        <span className="stat-number">{alertasHoy}</span>
                        <span className="stat-label">{t('alertasDeHoy')}</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green">
                        <i className="fi fi-rs-signal-alt"></i>
                    </div>
                    <div className="stat-details">
                        <span className="stat-number">100%</span>
                        <span className="stat-label">{t('sincronizacion')}</span>
                    </div>
                </div>
            </div>

            <div className="activity-card">
                <div className="activity-header">
                    <h3><i className="fi fi-rs-clock-three"></i> {t('pacientesRevisadosRecientemente')}</h3>
                </div>
                
                <div className="activity-list">
                    {actividadReciente.length === 0 ? (
                        <p className="notif-empty" style={{padding: '20px'}}>{t('noHasRevisadoPacientes')}</p>
                    ) : (
                        actividadReciente.map((act, index) => (
                            <div 
                                key={index} 
                                className="activity-item" 
                                style={{cursor: 'pointer'}}
                                onClick={() => alSeleccionarPaciente(act)}
                            >
                                <div className="status-dot blue-dot"></div>
                                <div className="patient-info">
                                    <span className="patient-name">{act.nombre}</span>
                                    <span className="patient-status">{act.descripcion}</span>
                                </div>
                                <span className="time-ago">{formatearTiempo(act.fecha)}</span>
                                <i className="fi fi-rs-angle-right arrow"></i>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}