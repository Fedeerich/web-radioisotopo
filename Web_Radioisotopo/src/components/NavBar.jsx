import "../styles/NavBar.css";
import { useAuth } from "../context/AuthContext";

export function NavBar() {
    const { usuario } = useAuth();

    const nombre = usuario?.nombreCompleto || "Invitado";

    return (
        <header className="navbar-main">
            <div className="navbar-left">
                <h1>Sistema Central Clínico</h1>
                <div className="connection-status">
                    <i className="fi fi-rs-lock"></i>
                    <span>Conexión cifrada de extremo a extremo</span>
                </div>
            </div>

            <div className="navbar-right">
                <button className="notification-btn">
                    <i className="fi fi-rs-bell"></i>
                </button>
                
                <div className="navbar-divider-vertical"></div>

                <div className="user-profile">
                    <div className="user-info">
                        <span className="user-name">Dr. {nombre}</span>
                        <span className="user-role">{usuario?.especialidad || "Oncología Radioterápica"}</span>
                    </div>
                    <div className="user-avatar">
                        {nombre.substring(0, 2).toUpperCase()}
                    </div>
                </div>
            </div>
        </header>
    );
}