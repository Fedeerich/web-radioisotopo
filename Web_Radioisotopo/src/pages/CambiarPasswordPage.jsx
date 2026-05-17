/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Pagina para Cambiar Contrasena]
AUTHOR:        [Marcos, Wael]
UPDATED:       [06/05/2026]
================================================================================
*/

// IMPORTS
import { useState, useEffect } from "react";
import { loginService } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/CambiarPassword.css";
import logo from "../assets/logo.webp"; 
import { useTranslation } from "../hooks/useTranslation";
import { validatePassword } from "../utils/validations";

// PAGE CAMBIAR PASSWORD
export function CambiarPasswordPage() {
    const [passwords, setPasswords] = useState({ actual: "", nueva: "", confirmar: "" });
    const [estado, setEstado] = useState({ cargando: false, error: "", exito: "" });
    const navigate = useNavigate();
    const { t } = useTranslation();

    const manejarCambio = async (e) => {
        e.preventDefault();

        if (passwords.nueva !== passwords.confirmar) {
            setEstado(prev => ({ ...prev, error: t('contrasenasNoCoinciden'), exito: "" }));
            return;
        }

        if (!validatePassword(passwords.nueva)) {
            setEstado(prev => ({ ...prev, error: t('errorContrasenaInvalida'), exito: "" }));
            return;
        }

        setEstado({ cargando: true, error: "", exito: "" });
        
        try {
            await loginService.cambiarPasswordPerfil(passwords.actual, passwords.nueva);
            
            setEstado({ cargando: false, exito: t('contrasenaActualizadaExito'), error: "" });
            setTimeout(() => navigate("/"), 2000); 
        } catch (err) {
            setEstado({ cargando: false, error: err.message, exito: "" });
        }
    };

    return (
        <main className="password-page-container">
            <div className="password-card">
                <div className="logo-container-cp">
                    <div className="avatar-circle-cp">
                        <img src={logo} alt="Logo" width="80" height="80" /> 
                    </div>
                </div>

                <h2>{t('seguridadCuenta')}</h2>
                <p>{t('introduceContrasenaActual')}</p>

                <form onSubmit={manejarCambio} className="password-form">
                    {estado.error && <div className="mensaje-error">{estado.error}</div>}
                    {estado.exito && <div className="mensaje-exito">{estado.exito}</div>}
                    
                    <input 
                        type="password" 
                        placeholder={t('contrasenaActual')} 
                        required 
                        value={passwords.actual}
                        onChange={e => setPasswords(prev => ({...prev, actual: e.target.value}))}
                    />
                    <input 
                        type="password" 
                        placeholder={t('nuevaContrasena')} 
                        required 
                        value={passwords.nueva}
                        onChange={e => setPasswords(prev => ({...prev, nueva: e.target.value}))}
                        className={ estado.error === t('errorContrasenaInvalida') ? "input-error" : "" }
                    />
                    <input 
                        type="password" 
                        placeholder={t('confirmarNuevaContrasena')} 
                        required 
                        value={passwords.confirmar}
                        onChange={e => setPasswords(prev => ({...prev, confirmar: e.target.value}))}
                        className={ estado.error === t('contrasenasNoCoinciden') ? "input-error" : "" }
                    />
                    
                    <button type="submit" className="btn-update" disabled={estado.cargando}>
                        {estado.cargando ? t('procesar') : t('actualizarContrasena')}
                    </button>
                </form>

                <button type="button" onClick={() => navigate(-1)} className="btn-cancel">
                    {t('volverAtras')}
                </button>
            </div>
        </main>
    );
}