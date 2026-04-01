import "../styles/Login.css";
import logo from "../assets/logo.png"; 
import { loginService } from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensajeError, setMensajeError] = useState(""); 

    const manejarCambioEmail = (event) => {
        setEmail(event.target.value);
    };

    const manejarCambioPassword = (event) => {
        setPassword(event.target.value);
    };

    const manejarLogin = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await loginService.iniciarSesion(email, password);
            login(respuesta); 
            navigate("/main-page");
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
                onChange={ manejarCambioEmail }
                placeholder="Correo electrónico..." 
                required 
                className={ mensajeError ? "input-error" : "" }
            />
            
            <div className="passDiv">
                <input 
                    id="passId" 
                    type={mostrarPassword ? "text" : "password"} 
                    value={ password }
                    onChange={ manejarCambioPassword }
                    placeholder="Contraseña..." 
                    required 
                    className={ mensajeError ? "input-error" : "" }
                />
                <button 
                    type="button" 
                    className="show-password-btn"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                >
                    {mostrarPassword ? <i className="fi-rs-crossed-eye"></i> : <i className="fi fi-rs-eye"></i>}
                </button>
            </div>

            <div className="addons">
                <label className="remember-me">
                    <input type="checkbox" />
                    <span>Recordarme</span>
                </label>
                <a href="#" className="forgot-password">
                    ¿Olvidaste tu contraseña?
                </a>
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