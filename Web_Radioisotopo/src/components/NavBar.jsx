import "../styles/NavBar.css";

export function NavBar() {
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
                        <span className="user-name">Dr. Nombre Apellido</span>
                        <span className="user-role">Oncología Radioterápica</span>
                    </div>
                    <div className="user-avatar">
                        DX
                    </div>
                </div>
            </div>
        </header>
    );
}