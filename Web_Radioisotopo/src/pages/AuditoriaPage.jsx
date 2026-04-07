import { useState, useEffect } from "react";
import { loginService } from "../services/api";
import "../styles/Paciente.css";

export function AuditoriaPage() {
    const [medicos, setMedicos] = useState([]);
    const [cargando, setCargando] = useState(true);
    // Estado para controlar el envío (opcional, para feedback visual)
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
        if (window.confirm(`¿Seguro que quieres cambiar el estado a ${nuevoEstado}?`)) {
            try {
                await loginService.actualizarEstadoUsuario(id, nuevoEstado);
                await cargarDatosAuditoria();
            } catch (error) {
                alert("Error al cambiar el estado.");
            }
        }
    };

    // --- NUEVA FUNCIÓN PARA EL RESET DE PASSWORD ---
    const manejarResetPassword = async (id, nombre) => {
        const nuevaPass = window.prompt(`Asigna una nueva contraseña temporal para ${nombre}:`, "Temp1234!");
        
        if (nuevaPass && nuevaPass.trim().length > 0) {
            setProcesando(true);
            try {
                // Llamamos a la API que acabamos de configurar en Java
                const respuesta = await fetch(`https://api-radioisotopo-proxy.m-gongora-carriedo.workers.dev/api/auth/doctor/${id}/password`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ password: nuevaPass })
                });

                if (respuesta.ok) {
                    alert(`✅ Éxito: Contraseña de ${nombre} actualizada. El correo se enviará en segundo plano.`);
                } else {
                    const errorMsg = await respuesta.text();
                    throw new Error(errorMsg);
                }
            } catch (error) {
                console.error("Error en reset:", error);
                alert("❌ Error: No se pudo actualizar la contraseña o enviar el correo.");
            } finally {
                setProcesando(false);
            }
        }
    };

    return (
        <div className="pacientes-container">
            <header className="content-header">
                <h1>Panel de Auditoría</h1>
                <p>Control de acceso, seguridad y gestión de personal médico</p>
            </header>

            <div className="table-card">
                <table className="patients-table">
                    <thead>
                        <tr>
                            <th>FACULTATIVO</th>
                            <th>ESPECIALIDAD</th>
                            <th>HOSPITAL</th>
                            <th>ESTADO</th>
                            <th style={{ textAlign: 'center' }}>ACCIONES SEGURIDAD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cargando ? (
                            <tr><td colSpan="5" style={{textAlign: 'center', padding: '30px'}}>Accediendo a registros de seguridad...</td></tr>
                        ) : medicos.length === 0 ? (
                            <tr><td colSpan="5" style={{textAlign: 'center', padding: '30px'}}>No hay facultativos registrados.</td></tr>
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
                                                {m.estado === "ACTIVO" ? "Suspender" : "Activar"}
                                            </button>
                                            
                                            <button 
                                                className="btn-perfil" 
                                                style={{ backgroundColor: '#f59e0b', opacity: procesando ? 0.6 : 1 }}
                                                onClick={() => manejarResetPassword(m.id, m.nombreCompleto)}
                                                disabled={procesando}
                                            >
                                                {procesando ? "Enviando..." : "Reset PWD"}
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