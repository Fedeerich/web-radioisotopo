import { useState } from "react";
import { loginService } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/CambiarPassword.css";
import logo from "../assets/logo.png"; 

export function CambiarPasswordPage() {
    const [passwords, setPasswords] = useState({ actual: "", nueva: "", confirmar: "" });
    const [estado, setEstado] = useState({ cargando: false, error: "", exito: "" });
    const navigate = useNavigate();

    const manejarCambio = async (e) => {
        e.preventDefault();
        
        if (passwords.nueva !== passwords.confirmar) {
            setEstado({ ...estado, error: "Las contraseñas nuevas no coinciden", exito: "" });
            return;
        }

        if (passwords.nueva.length < 6) {
            setEstado({ ...estado, error: "La nueva contraseña debe tener al menos 6 caracteres", exito: "" });
            return;
        }

        setEstado({ cargando: true, error: "", exito: "" });
        
        try {
            await loginService.cambiarPasswordPerfil(passwords.actual, passwords.nueva);
            setEstado({ cargando: false, exito: "¡Contraseña actualizada con éxito!", error: "" });
            
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

                <h2>Seguridad de la Cuenta</h2>
                <p>Introduce tu contraseña actual y la nueva que deseas utilizar.</p>

                <form onSubmit={manejarCambio} style={{width: '100%'}}>
                    {estado.error && <div className="mensaje-error">{estado.error}</div>}
                    {estado.exito && <div className="mensaje-exito">{estado.exito}</div>}
                    
                    <input 
                        type="password" 
                        placeholder="Contraseña actual" 
                        required 
                        value={passwords.actual}
                        onChange={e => setPasswords({...passwords, actual: e.target.value})}
                    />
                    <input 
                        type="password" 
                        placeholder="Nueva contraseña" 
                        required 
                        value={passwords.nueva}
                        onChange={e => setPasswords({...passwords, nueva: e.target.value})}
                    />
                    <input 
                        type="password" 
                        placeholder="Confirmar nueva contraseña" 
                        required 
                        value={passwords.confirmar}
                        onChange={e => setPasswords({...passwords, confirmar: e.target.value})}
                    />
                    
                    <button type="submit" className="btn-update" disabled={estado.cargando}>
                        {estado.cargando ? "Procesando..." : "Actualizar Contraseña"}
                    </button>
                </form>

                <button type="button" onClick={() => navigate(-1)} className="btn-cancel">
                    Volver atrás
                </button>
            </div>
        </div>
    );
}