/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [La página principal para App.jsx]
AUTHOR:        [Marcos, Wael]
UPDATED:       [23/04/2026]
================================================================================
*/

// IMPORTS
import { useLocation, useNavigate } from "react-router-dom"; // Añadimos useNavigate
import { SideBar } from './components/SideBar';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { PacientePage } from './pages/PacientePage';
import { ConfiguracionPage } from './pages/ConfiguracionPage';
import { GestionUsuarioPage } from './pages/GestionUsuarioPage';
import { AuditoriaPage } from './pages/AuditoriaPage';

// PAGINA PRINCIPAL APP
export default function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const manejarSeleccionDesdeHome = (paciente) => {
        navigate("/paciente", { state: { pacienteSeleccionado: paciente } });
    };

    return (
        <div className="dashboard-layout">
            <SideBar />
            
            <div className="dashboard-main-area">
                <NavBar />
                
                <main className="dashboard-content">
                    {location.pathname === "/main-page" && (
                        <HomePage alSeleccionarPaciente={manejarSeleccionDesdeHome} />
                    )}
                    {location.pathname === "/paciente" && <PacientePage />}
                    {location.pathname === "/configuracion" && <ConfiguracionPage />}
                    {location.pathname === "/admin" && <GestionUsuarioPage />}
                    {location.pathname === "/auditoria" && <AuditoriaPage />}
                </main>
            </div>
        </div>
    );
}