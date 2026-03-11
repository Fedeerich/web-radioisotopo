import "../styles/Login.css";
import logo from "../assets/logo.png"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    
    const handleSubmit = (event ) => {
        event.preventDefault();
        console.log("Intentando iniciar sesión...");

        console.log("Intentando entrar con: " + email) // En un futuro aquí irá la parte base de datos
        navigate("/main-page");
    };

    const manejarCambioEmail = (event) => {
        setEmail(event.target.value)
    };

    const manejarCambioPassword = (event) => {
        setPassword(event.target.value)
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
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
            />
            
            <div className="passDiv">
                <input 
                    id="passId" 
                    type={mostrarPassword ? "text" : "password"} 
                    value={ password }
                    onChange={ manejarCambioPassword }
                    placeholder="Contraseña..." 
                    required 
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

            <button type="submit" className="submit-btn">
                Iniciar sesión
            </button>
        </form>
    );
}