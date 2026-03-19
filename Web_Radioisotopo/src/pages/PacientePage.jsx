import { useState } from "react";
import "../styles/Paciente.css";

import { PerfilPacientePage } from './PerfilPacientePage';

export function PacientePage() {
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

    const pacientes = [
        { id: "FARR345678911", nombre: "Jordi Farré", emotional: "ESTABLE", tratamiento: "Iodo 131 (150MBq)", progreso: 95, color: "green", edad: 84 },
        { id: "VILA343123211", nombre: "Montserrat Vila", emotional: "ANSIEDAD LEVE", tratamiento: "Lutenci 177 (200MBq)", progreso: 61, color: "yellow", edad: 36 },
        { id: "MART349978927", nombre: "Laia Martí", emotional: "DEPRESIÓN", tratamiento: "Lutenci 177 (200MBq)", progreso: 79, color: "red", edad: 22 },
        { id: "PUIG269483104", nombre: "Marc Puig", emotional: "ESTABLE", tratamiento: "Iodo 131 (50 Ci)", progreso: 26, color: "green", edad: 48 },
    ];

    if (pacienteSeleccionado) {
        return (
            <PerfilPacientePage 
                paciente={pacienteSeleccionado} 
                alVolver={() => setPacienteSeleccionado(null)} 
            />
        );
    }

    return (
        <div className="pacientes-container">
            <header className="content-header">
                <h1>Gestión de pacientes</h1>
                <p>Gestión de dispositivos y supervisión de tratamientos</p>
            </header>

            <div className="filter-bar">
                <div className="search-input">
                    <i className="fi fi-rs-search"></i>
                    <input type="text" placeholder="Buscar por tarjeta sanitaria del paciente o nombre..." />
                </div>
                
                <div className="filter-group">
                    <select className="filter-select">
                        <option>Estado Emocional (Todos)</option>
                        <option>Estable / Positivo</option>
                        <option>Ansiedad / Depresión</option>
                    </select>
                </div>

                <div className="filter-group">
                    <select className="filter-select">
                        <option>Tratamiento (Todos)</option>
                        <option>Iodo 131</option>
                        <option>Lutenci 177</option>
                    </select>
                </div>
            </div>

            <div className="table-card">
                <table className="patients-table">
                    <thead>
                        <tr>
                            <th>PACIENTE</th>
                            <th>ESTADO EMOCIONAL</th>
                            <th>TRATAMIENTO</th>
                            <th>PROGRESO</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.map((p, index) => (
                            <tr key={index}>
                                <td className="user-cell">
                                    <div className={`avatar ${p.id.toLowerCase()}`}>
                                        {p.nombre.split(" ").map(n => n[0]).join("").toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="user-name">{p.nombre}</div>
                                        <div className="user-id">{p.id}</div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge ${p.color}`}>{p.emotional}</span>
                                </td>
                                <td className="treatment-cell">{p.tratamiento}</td>
                                <td>
                                    <div className="progress-container">
                                        <div className="progress-bar-bg">
                                            <div className={`progress-fill ${p.color}`} style={{ width: `${p.progreso}%` }}></div>
                                        </div>
                                        <span className={`progress-text ${p.color}`}>{p.progreso}%</span>
                                    </div>
                                </td>
                                <td>
                                    <button 
                                        className="btn-perfil" 
                                        onClick={() => setPacienteSeleccionado(p)}
                                    >
                                        Ver Perfil
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}