import "../styles/Login.css";
import logo from "../assets/logo.png"; 
import { loginService } from "../services/api";
import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [recordarme, setRecordarme] = useState(false);
    const [mensajeError, setMensajeError] = useState(""); 

    // Auto-login si "Recordarme" estaba marcado y hay token
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
            // 1. Llamada al servicio
            const respuesta = await loginService.iniciarSesion(email, password);
            
            // 2. Persistencia de la elección "Recordarme"
            if (recordarme) {
                localStorage.setItem("mantenerSesion", "true");
            } else {
                localStorage.removeItem("mantenerSesion");
            }

            // 3. Guardar datos en el Contexto de Autenticación
            login(respuesta); 

            // 4. LÓGICA DE REDIRECCIÓN (El "salto" que buscamos)
            // Si el backend envía requiereCambioPassword: true, vamos a la página aparte
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
                <h1>Bienvenido/a a la Área Privada</h1>
                <p>Accede a tu cuenta de gestión</p>
            </div>

            <input 
                id="email" 
                type="email" 
                value={ email }
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico..." 
                required 
                className={ mensajeError ? "input-error" : "" }
            />
            
            <div className="passDiv">
                <input 
                    id="passId" 
                    type={mostrarPassword ? "text" : "password"} 
                    value={ password }
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña..." 
                    required 
                    className={ mensajeError ? "input-error" : "" }
                />
                <button 
                    type="button" 
                    className="show-password-btn"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                >
                    {/* Restaurados tus iconos originales de la imagen */}
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
                    <span>Recordarme</span>
                </label>
                <span 
                    className="forgot-password" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/cambiar-password')}
                >
                    ¿Quieres cambiar tu contraseña?
                </span>
            </div>

            {mensajeError && (
                <span className="error-texto-final">
                    {mensajeError}
                </span>
            )}

            <button type="submit" className="submit-btn">
                Iniciar sesión
            </button>
        </form>
    );
}