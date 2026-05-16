/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Componente Sidebar]
AUTHOR:        [Marcos, Wael]
UPDATED:       [23/04/2026]
================================================================================
*/

// IMPORTS
import { useState, useEffect } from "react";
import "../styles/SideBar.css";
import logo from "../assets/logo.webp"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../hooks/useTranslation";

// COMPONENTE SIDE BAR
export function SideBar() {
    const navigate = useNavigate();
    const { logout, usuario } = useAuth();
    const { t } = useTranslation();
    
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

    const manejarCierreSesion = () => {
        logout();
        setAvisoSalir(false);
        navigate("/");
    };

    return (
        <>
            <aside className="sidebar-main">
                <div className="sidebar-top">
                    <div className="logo-box">
                        <div className="logo-circle">
                            <img src={logo} alt="Logo" className="logo"/>
                        </div>
                        <span>{t('radioisotopos')}</span>
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
                        <i className="fi fi-rs-home"></i> <span>{t('paginaPrincipal')}</span>
                    </button>

                    <button 
                        className={`menu-item ${activeTab === "pacientes" ? "active" : ""}`}
                        onClick={() => {
                            setActiveTab("pacientes");
                            navigate("/paciente"); 
                        }}
                    >
                        <i className="fi fi-rs-users"></i> <span>{t('pacientes')}</span>
                    </button>

                    {usuario?.rol === "ADMIN" && (
                        <>
                            <button 
                                className={`menu-item ${activeTab === "admin" ? "active" : ""}`}
                                onClick={() => {
                                    setActiveTab("admin");
                                    navigate("/admin");
                                }}
                            >
                                <i className="fi fi-rs-user-add"></i> 
                                <span>{t('gestionUsuarios')}</span>
                            </button>

                            <button 
                                className={`menu-item ${activeTab === "auditoria" ? "active" : ""}`}
                                onClick={() => {
                                    setActiveTab("auditoria");
                                    navigate("/auditoria");
                                }}
                            >
                                <i className="fi fi-rs-shield-check"></i>
                                <span>{t('auditoria')}</span>
                            </button>
                        </>
                    )}

                    <button 
                        className={`menu-item ${activeTab === "config" ? "active" : ""}`}
                        onClick={() => {
                            setActiveTab("config");
                            navigate("/configuracion");
                        }}
                    >
                        <i className="fi fi-rs-settings"></i> <span>{t('configuracion')}</span>
                    </button>
                </nav>

                <div className="sidebar-bottom-section">

                    <hr className="sidebar-divider" />

                    <button className="menu-item logout" onClick={() => setAvisoSalir(true)}>
                        <i className="fi fi-rs-exit"></i> <span>{t('cerrarSesion')}</span>
                    </button>
                </div>
            </aside>

            {avisoSalir && (
                <div className="modal-overlay">
                    <div className="modal-caja">
                        <h3>{t('seguroCerrarSesion')}</h3>
                        <div className="modal-botones">
                            <button onClick={() => setAvisoSalir(false)}>{t('cancelar')}</button>
                            <button className="btn-confirmar" onClick={manejarCierreSesion}>{t('confirmar')}</button>
                        </div>
                    </div>
                </div>
            )}
         </>
    );
}