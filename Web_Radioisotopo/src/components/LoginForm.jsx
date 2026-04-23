/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Componente LoginForm]
AUTHOR:        [Marcos, Wael]
UPDATED:       [23/04/2026]
================================================================================
*/

// IMPORTS
import "../styles/Login.css";
import logo from "../assets/logo.png"; 
import { loginService } from "../services/api";
import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../hooks/useTranslation";

// COMPONENTE LOGIN FORM
export function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [recordarme, setRecordarme] = useState(false);
    const [mensajeError, setMensajeError] = useState(""); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        const mantener = localStorage.getItem("mantenerSesion");
        if (token && mantener === "true") {
            navigate("/main-page");
        }
    }, [navigate]);

    const manejarLogin = async (e) => {
        e.preventDefault();
        setMensajeError(""); 

        try {
            const respuesta = await loginService.iniciarSesion(email, password);
            
            if (recordarme) {
                localStorage.setItem("mantenerSesion", "true");
            } else {
                localStorage.removeItem("mantenerSesion");
            }

            login(respuesta); 

            if (respuesta.requiereCambioPassword) {
                navigate("/cambiar-password");
            } else {
                navigate("/main-page");
            }
        } catch (error) {
            setMensajeError(error.message); 
        }
    };

    return (
        <form className="login-form" onSubmit={manejarLogin}>
            <div className="header-container">
                <img src={ logo } alt="Logo" className="logo" />
                <h1>{t('bienvenidoAreaPrivada')}</h1>
                <p>{t('accederCuentaGestion')}</p>
            </div>

            <input 
                id="email" 
                type="email" 
                value={ email }
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('correoElectronico')} 
                required 
                className={ mensajeError ? "input-error" : "" }
            />
            
            <div className="passDiv">
                <input 
                    id="passId" 
                    type={mostrarPassword ? "text" : "password"} 
                    value={ password }
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('contrasena')} 
                    required 
                    className={ mensajeError ? "input-error" : "" }
                />
                <button 
                    type="button" 
                    className="show-password-btn"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                >
                    {mostrarPassword ? (
                        <i className="fi-rs-crossed-eye"></i>
                    ) : (
                        <i className="fi fi-rs-eye"></i>
                    )}
                </button>
            </div>

            <div className="addons">
                <label className="remember-me">
                    <input 
                        type="checkbox" 
                        checked={recordarme}
                        onChange={(e) => setRecordarme(e.target.checked)}
                    />
                    <span>{t('recordarme')}</span>
                </label>
                <span 
                    className="forgot-password" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/cambiar-password')}
                >
                    {t('quieresCambiarContrasena')}
                </span>
            </div>

            {mensajeError && (
                <span className="error-texto-final">
                    {mensajeError}
                </span>
            )}

            <button type="submit" className="submit-btn">
                {t('iniciarSesion')}
            </button>
        </form>
    );
}