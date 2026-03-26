import { useState, useEffect } from "react";
import "../styles/SideBar.css";
import logo from "../assets/logo.png"; 

import { useNavigate } from "react-router-dom";

export function SideBar() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("inicio");
    const [avisoSalir, setAvisoSalir] = useState(false);

    useEffect(() => {
        if (avisoSalir) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [avisoSalir]);

    return (
        <>
            <aside className="sidebar-main">
                <div className="sidebar-top">
                    <div className="logo-box">
                        <img src={logo} alt="Logo" className="logo"/>
                        <span>Radioisótopos</span>
                    </div>
                </div>

                <hr className="sidebar-divider" />

                <nav className="sidebar-menu">
                    <button 
                        className={`menu-item ${activeTab === "inicio" ? "active" : ""}`}
                        onClick={() => {
                            setActiveTab("inicio");
                            navigate("/main-page");   
                        }}
                    >
                        <i className="fi fi-rs-home"></i> <span>Página Principal</span>
                    </button>

                    <button 
                        className={`menu-item ${activeTab === "pacientes" ? "active" : ""}`}
                        onClick={() => {
                            setActiveTab("pacientes");
                            navigate("/paciente"); 
                        }}
                    >
                        <i className="fi fi-rs-users"></i> <span>Pacientes</span>
                    </button>
                </nav>

                <div className="sidebar-bottom-section">
                    <button 
                        className={`menu-item ${activeTab === "config" ? "active" : ""}`}
                        onClick={() => {
                            setActiveTab("config");
                            navigate("/configuracion");
                        }}
                    >
                        <i className="fi fi-rs-settings"></i> <span>Configuración</span>
                    </button>

                    <hr className="sidebar-divider" />

                    <button className="menu-item logout" onClick={() => setAvisoSalir(true)}>
                        <i className="fi fi-rs-exit"></i> <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {avisoSalir && (
                <div className="modal-overlay">
                    <div className="modal-caja">
                        <h3>¿Seguro que quieres cerrar sesión?</h3>
                        <div className="modal-botones">
                            <button onClick={() => setAvisoSalir(false)}>Cancelar</button>
                            <button onClick={() => navigate("/")}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
         </>
    );
}