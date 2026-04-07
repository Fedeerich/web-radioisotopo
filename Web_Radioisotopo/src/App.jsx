import { useLocation, useNavigate } from "react-router-dom"; // Añadimos useNavigate
import { SideBar } from './components/SideBar';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { PacientePage } from './pages/PacientePage';
import { ConfiguracionPage } from './pages/ConfiguracionPage';
import { GestionUsuarioPage } from './pages/GestionUsuarioPage';
import { AuditoriaPage } from './pages/AuditoriaPage';

export function App() {
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