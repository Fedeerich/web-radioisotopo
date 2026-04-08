import { useState, useEffect } from "react";
import { loginService } from "../services/api";
import "../styles/Paciente.css";
import { useTranslation } from "../hooks/useTranslation";

export function AuditoriaPage() {
    const { t } = useTranslation();
    const [medicos, setMedicos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [procesando, setProcesando] = useState(false);

    const cargarDatosAuditoria = async () => {
        try {
            const data = await loginService.listarDoctoresAdmin();
            setMedicos(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error en auditoría:", error);
            setMedicos([]);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDatosAuditoria();
    }, []);

    const manejarCambioEstado = async (id, estadoActual) => {
        const nuevoEstado = estadoActual === "ACTIVO" ? "INACTIVO" : "ACTIVO";
        if (window.confirm(t('seguroCambiarEstado').replace('{nuevoEstado}', nuevoEstado))) {
            try {
                await loginService.actualizarEstadoUsuario(id, nuevoEstado);
                await cargarDatosAuditoria();
            } catch (error) {
                alert(t('errorCambiarEstado'));
            }
        }
    };

    const manejarResetPassword = async (id, nombre) => {
        const nuevaPass = window.prompt(t('asignarNuevaContrasena').replace('{nombre}', nombre), "Temp1234!");
        
        if (nuevaPass && nuevaPass.trim().length > 0) {
            setProcesando(true);
            try {
                const respuesta = await loginService.resetPasswordAdmin(id, nuevaPass);
                
                alert(t('exitoContrasenaActualizada').replace('{nombre}', nombre));
                
                await cargarDatosAuditoria();
            } catch (error) {
                console.error("Error en reset:", error);
                alert(`Error: ${error.message || t('errorCambiarEstado')}`);
            } finally {
                setProcesando(false);
            }
        }
    };

    useEffect(() => {
        cargarDatosAuditoria();
    }, []);

    return (
        <div className="pacientes-container">
            <header className="content-header">
                <h1>{t('panelAuditoria')}</h1>
                <p>{t('controlAccesoSeguridad')}</p>
            </header>

            <div className="table-card">
                <table className="patients-table">
                    <thead>
                        <tr>
                            <th>{t('facultativo')}</th>
                            <th>{t('especialidadHeader')}</th>
                            <th>{t('hospital')}</th>
                            <th>{t('estadoHeader')}</th>
                            <th style={{ textAlign: 'center' }}>{t('accionesSeguridad')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cargando ? (
                            <tr><td colSpan="5" style={{textAlign: 'center', padding: '30px'}}>{t('accediendoRegistros')}</td></tr>
                        ) : medicos.length === 0 ? (
                            <tr><td colSpan="5" style={{textAlign: 'center', padding: '30px'}}>{t('noHayFacultativos')}</td></tr>
                        ) : (
                            medicos.map((m) => (
                                <tr key={m.id}>
                                    <td className="user-cell">
                                        <div className="avatar" style={{backgroundColor: '#eef2ff', color: '#4f46e5'}}>
                                            {m.nombreCompleto ? m.nombreCompleto.substring(0,2).toUpperCase() : "??"}
                                        </div>
                                        <div>
                                            <div className="user-name">{m.nombreCompleto}</div>
                                            <div className="user-id">{m.email}</div>
                                        </div>
                                    </td>
                                    <td>{m.doctor?.especialidad || "N/A"}</td>
                                    <td>{m.hospitalRef}</td>
                                    <td>
                                        <span className={`badge ${m.estado === 'ACTIVO' ? 'green' : 'red'}`}>
                                            {m.estado}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                            <button 
                                                className="btn-sync" 
                                                onClick={() => manejarCambioEstado(m.id, m.estado)}
                                                disabled={procesando}
                                            >
                                                {m.estado === "ACTIVO" ? t('suspend') : t('activar')}
                                            </button>
                                            
                                            <button 
                                                className="btn-perfil" 
                                                style={{ backgroundColor: '#f59e0b', opacity: procesando ? 0.6 : 1 }}
                                                onClick={() => manejarResetPassword(m.id, m.nombreCompleto)}
                                                disabled={procesando}
                                            >
                                                {procesando ? t('enviando') : t('resetPWD')}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}