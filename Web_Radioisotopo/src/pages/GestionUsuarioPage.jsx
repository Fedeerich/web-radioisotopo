import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/GestionUsuario.css";
import { loginService } from "../services/api";

export function GestionUsuarioPage() {
    const { usuario } = useAuth(); 

    const [formData, setFormData] = useState({
        nombreCompleto: "",
        email: "",
        contraseña: "",
        rol: "MEDICO",
        estado: "ACTIVO",
        hospitalRef: "",
        doctor: {
            especialidad: "",
            colegiadoNum: ""
        }
    });

    const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

    const handleChangeUser = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeDoctor = (e) => {
        setFormData({
            ...formData,
            doctor: {
                ...formData.doctor,
                [e.target.name]: e.target.value
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje({ texto: "Conectando con el servidor de Render...", tipo: "info" });

        try {
            const respuestaServidor = await loginService.registrarMedico(formData);
            
            setMensaje({ 
                texto: respuestaServidor || "Médico registrado correctamente.", 
                tipo: "exito" 
            });
            
            setFormData({
                nombreCompleto: "", email: "", contraseña: "", rol: "MEDICO", estado: "ACTIVO", hospitalRef: "",
                doctor: { especialidad: "", colegiadoNum: "" }
            });

        } catch (error) {
            setMensaje({ 
                texto: error.message || "Error al comunicar con el servidor.", 
                tipo: "error" 
            });
        }
    };

    return (
        <div className="gestion-container">
            <div className="gestion-header">
                <h1>Alta de Nuevo Personal Médico</h1>
                <p>Completa los datos para registrar un nuevo especialista en el sistema.</p>
            </div>

            <form className="gestion-form-caja" onSubmit={handleSubmit}>
                
                <h3 className="section-title">Datos de Acceso (Usuario)</h3>
                <div className="form-grid">
                    <div className="input-group">
                        <label>Nombre Completo</label>
                        <input 
                            type="text" 
                            name="nombreCompleto"
                            value={formData.nombreCompleto} 
                            onChange={handleChangeUser} 
                            placeholder="Ej. Carlos Ruiz" 
                            required 
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Correo Electrónico Corporativo</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email} 
                            onChange={handleChangeUser} 
                            placeholder="carlos.ruiz@hospital.com" 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Contraseña Temporal</label>
                        <input 
                            type="password" 
                            name="contraseña"
                            value={formData.contraseña} 
                            onChange={handleChangeUser} 
                            placeholder="Asigna una contraseña" 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Hospital de Referencia</label>
                        <input 
                            type="text" 
                            name="hospitalRef"
                            value={formData.hospitalRef} 
                            onChange={handleChangeUser} 
                            placeholder="Ej. Hospital Clínic" 
                            required 
                        />
                    </div>
                </div>

                <hr className="form-divider" />

                <h3 className="section-title">Datos Profesionales (Médico)</h3>
                <div className="form-grid">
                    <div className="input-group">
                        <label>Especialidad</label>
                        <select 
                            name="especialidad" 
                            value={formData.doctor.especialidad} 
                            onChange={handleChangeDoctor}
                            required
                        >
                            <option value="">Selecciona una especialidad...</option>
                            <option value="Oncología Radioterápica">Oncología Radioterápica</option>
                            <option value="Medicina Nuclear">Medicina Nuclear</option>
                            <option value="Radiología">Radiología</option>
                            <option value="Física Médica">Física Médica</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Número de Colegiado</label>
                        <input 
                            type="text" 
                            name="colegiadoNum"
                            value={formData.doctor.colegiadoNum} 
                            onChange={handleChangeDoctor} 
                            placeholder="Ej. 282893939" 
                            required 
                        />
                    </div>
                </div>

                {mensaje.texto && (
                    <div className={`mensaje-alerta ${mensaje.tipo}`}>
                        {mensaje.texto}
                    </div>
                )}

                <div className="form-footer">
                    <button type="submit" className="btn-green-submit">
                        Registrar Médico en el Sistema
                    </button>
                </div>
            </form>
        </div>
    );
}