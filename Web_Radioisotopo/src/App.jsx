import { useLocation } from "react-router-dom";
import { SideBar } from './components/SideBar';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { PacientePage } from './pages/PacientePage';
import { ConfiguracionPage } from './pages/ConfiguracionPage';
import { AuthProvider } from "./context/AuthContext";

export function App() {
    const location = useLocation();

    return (
        <AuthProvider>
            <div className="dashboard-layout">
                <SideBar />
                
                <div className="dashboard-main-area">
                    <NavBar />
                    
                    <main className="dashboard-content">
                        {location.pathname === "/main-page" && <HomePage />}
                        {location.pathname === "/paciente" && <PacientePage />}
                        {location.pathname === "/configuracion" && <ConfiguracionPage />}
                    </main>
                </div>
            </div>
        </AuthProvider>
    );
}