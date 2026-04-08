import { useState, useEffect } from "react";
import "../styles/Paciente.css";

import { PerfilPacientePage } from './PerfilPacientePage';
import { CrearPacientePage } from './CrearPacientePage';
import { loginService } from "../services/api";
import { useTranslation } from "../hooks/useTranslation";

export function PacientePage() {
    const { t } = useTranslation();
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [creandoPaciente, setCreandoPaciente] = useState(false);
    
    const [pacientes, setPacientes] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Ahora recibe los datos calculados: tratamiento con MBq actual, progreso y color
                const data = await loginService.obtenerListaPacientes();
                setPacientes(data);
            } catch (error) {
                console.error("Error cargando pacientes:", error);
            } finally {
                setCargando(false);
            }
        };
        cargarDatos();
    }, []);

    const pacientesFiltrados = pacientes.filter(p => 
        p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) || 
        p.cip?.toLowerCase().includes(busqueda.toLowerCase())
    );

    if (creandoPaciente) {
        return <CrearPacientePage alVolver={() => setCreandoPaciente(false)} />;
    }

    if (pacienteSeleccionado) {
        return <PerfilPacientePage paciente={pacienteSeleccionado} alVolver={() => setPacienteSeleccionado(null)} />;
    }

    return (
        <div className="pacientes-container">
            <header className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>{t('gestionDePacientes')}</h1>
                    <p>{t('gestionDispositivosTratamientos')}</p>
                </div>
                <button className="btn-add-patient" onClick={() => setCreandoPaciente(true)}>
                    <i className="fi fi-sr-user-add"></i> {t('anadirPaciente')}
                </button>
            </header>

            <div className="filter-bar">
                <div className="search-input">
                    <i className="fi fi-rs-search"></i>
                    <input 
                        type="text" 
                        placeholder={t('buscarPorTarjetaSanitaria')} 
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <select className="filter-select">
                        <option>{t('estadoTodos')}</option>
                        <option>{t('establePositivo')}</option>
                        <option>{t('ansiedadDepresion')}</option>
                    </select>
                </div>
                <div className="filter-group">
                    <select className="filter-select">
                        <option>{t('tratamientoTodos')}</option>
                        <option>{t('iodo')}</option>
                        <option>{t('cobalto')}</option>
                    </select>
                </div>
            </div>

            <div className="table-card">
                <table className="patients-table">
                    <thead>
                        <tr>
                            <th>{t('paciente')}</th>
                            <th>{t('estado')}</th>
                            <th>{t('tratamiento')}</th>
                            <th>{t('progreso')}</th>
                            <th>{t('acciones')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cargando ? (
                            <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>{t('cargandoDatosClinicos')}</td></tr>
                        ) : (
                            pacientesFiltrados.map((p, index) => (
                                <tr key={p.cip || index}>
                                    <td className="user-cell">
                                        <div className="avatar">
                                            {p.nombre ? p.nombre.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2) : "??"}
                                        </div>
                                        <div>
                                            <div className="user-name">{p.nombre}</div>
                                            <div className="user-id">{p.cip}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${p.color || 'green'}`}>
                                            {p.estado || t('estable')}
                                        </span>
                                    </td>
                                    <td className="treatment-cell">
                                        {p.tratamiento}
                                    </td>
                                    <td>
                                        <div className="progress-container">
                                            <div className="progress-bar-bg">
                                                <div 
                                                    className={`progress-fill ${p.color || 'green'}`} 
                                                    style={{ width: `${p.progreso}%` }}
                                                ></div>
                                            </div>
                                            <span className={`progress-text ${p.color || 'green'}`}>
                                                {p.progreso}%
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn-perfil" 
                                            onClick={() => setPacienteSeleccionado(p)}
                                        >
                                            {t('verPerfil')}
                                        </button>
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