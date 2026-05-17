import { useReducer, useEffect } from "react";
import "../styles/Paciente.css";

import { PerfilPacientePage } from './PerfilPacientePage';
import { CrearPacientePage } from './CrearPacientePage';
import { loginService } from "../services/api";
import { useTranslation } from "../hooks/useTranslation";

const initialState = {
    pacienteSeleccionado: null,
    creandoPaciente: false,
    pacientes: [],
    busqueda: "",
    cargando: true,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_PACIENTES':
            return { ...state, pacientes: action.pacientes, cargando: false };
        case 'SET_CARGANDO':
            return { ...state, cargando: action.cargando };
        case 'SET_BUSQUEDA':
            return { ...state, busqueda: action.busqueda };
        case 'SELECCIONAR_PACIENTE':
            return { ...state, pacienteSeleccionado: action.paciente };
        case 'VOLVER_LISTA':
            return { ...state, pacienteSeleccionado: null };
        case 'CREAR_PACIENTE':
            return { ...state, creandoPaciente: true };
        case 'VOLVER_CREAR':
            return { ...state, creandoPaciente: false };
        default:
            return state;
    }
}

export function PacientePage() {
    const { t } = useTranslation();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const data = await loginService.obtenerListaPacientes();
                dispatch({ type: 'SET_PACIENTES', pacientes: data });
            } catch (error) {
                console.error("Error cargando pacientes:", error);
                dispatch({ type: 'SET_CARGANDO', cargando: false });
            }
        };
        cargarDatos();
    }, []);

    const pacientesFiltrados = state.pacientes.filter(p => 
        p.nombre?.toLowerCase().includes(state.busqueda.toLowerCase()) || 
        p.cip?.toLowerCase().includes(state.busqueda.toLowerCase())
    );

    if (state.pacienteSeleccionado) {
        return <PerfilPacientePage paciente={state.pacienteSeleccionado} alVolver={() => dispatch({ type: 'VOLVER_LISTA' })} />;
    }

    return state.creandoPaciente ? (
        <CrearPacientePage alVolver={() => dispatch({ type: 'VOLVER_CREAR' })} />
    ) : (
        <div className="pacientes-container">
            <header className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>{t('gestionDePacientes')}</h1>
                    <p>{t('gestionDispositivosTratamientos')}</p>
                </div>
                <button className="btn-add-patient" onClick={() => dispatch({ type: 'CREAR_PACIENTE' })}>
                    <i className="fi fi-sr-user-add"></i> {t('anadirPaciente')}
                </button>
            </header>

            <div className="filter-bar">
                <div className="search-input">
                    <i className="fi fi-rs-search"></i>
                    <input 
                        type="text" 
                        placeholder={t('buscarPorTarjetaSanitaria')} 
                        value={state.busqueda}
                        onChange={(e) => dispatch({ type: 'SET_BUSQUEDA', busqueda: e.target.value })}
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
                        {state.cargando ? (
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
                                            onClick={() => dispatch({ type: 'SELECCIONAR_PACIENTE', paciente: p })}
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
