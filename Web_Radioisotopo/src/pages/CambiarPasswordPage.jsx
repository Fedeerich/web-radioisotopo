/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Pagina para Cambiar Contrasena]
AUTHOR:        [Marcos, Wael]
UPDATED:       [23/04/2026]
================================================================================
*/

// IMPORTS
import { useState } from "react";
import { loginService } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/CambiarPassword.css";
import logo from "../assets/logo.png"; 
import { useTranslation } from "../hooks/useTranslation";

// PAGE CAMBIAR PASSWORD
export function CambiarPasswordPage() {
    const [passwords, setPasswords] = useState({ actual: "", nueva: "", confirmar: "" });
    const [estado, setEstado] = useState({ cargando: false, error: "", exito: "" });
    const navigate = useNavigate();
    const { t } = useTranslation();

    const manejarCambio = async (e) => {
        e.preventDefault();
        
        if (passwords.nueva !== passwords.confirmar) {
            setEstado({ ...estado, error: t('contrasenasNoCoinciden'), exito: "" });
            return;
        }

        if (passwords.nueva.length < 6) {
            setEstado({ ...estado, error: t('contrasenaMinimoCaracteres'), exito: "" });
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
        <div className="password-page-container">
            <div className="password-card">
                <div className="logo-container" style={{marginBottom: '20px'}}>
                    <div className="avatar" style={{backgroundColor: '#e0f2fe', width: '80px', height: '80px', margin: '0 auto', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <img src={logo} alt="Logo" style={{width: '120px'}} /> 
                    </div>
                </div>

                <h2>{t('seguridadCuenta')}</h2>
                <p>{t('introduceContrasenaActual')}</p>

                <form onSubmit={manejarCambio} style={{width: '100%'}}>
                    {estado.error && <div className="mensaje-error">{estado.error}</div>}
                    {estado.exito && <div className="mensaje-exito">{estado.exito}</div>}
                    
                    <input 
                        type="password" 
                        placeholder={t('contrasenaActual')} 
                        required 
                        value={passwords.actual}
                        onChange={e => setPasswords({...passwords, actual: e.target.value})}
                    />
                    <input 
                        type="password" 
                        placeholder={t('nuevaContrasena')} 
                        required 
                        value={passwords.nueva}
                        onChange={e => setPasswords({...passwords, nueva: e.target.value})}
                    />
                    <input 
                        type="password" 
                        placeholder={t('confirmarNuevaContrasena')} 
                        required 
                        value={passwords.confirmar}
                        onChange={e => setPasswords({...passwords, confirmar: e.target.value})}
                    />
                    
                    <button type="submit" className="btn-update" disabled={estado.cargando}>
                        {estado.cargando ? t('procesar') : t('actualizarContrasena')}
                    </button>
                </form>

                <button type="button" onClick={() => navigate(-1)} className="btn-cancel">
                    {t('volverAtras')}
                </button>
            </div>
        </div>
    );
}