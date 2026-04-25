/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Pagina para la gestion de los usuarios, a nivel de medicos]
AUTHOR:        [Marcos, Wael]
UPDATED:       [25/04/2026]
================================================================================
*/

// IMPORTS
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/GestionUsuario.css";
import { loginService } from "../services/api";
import { validateName, validateEmail, validatePassword, validateNumCol } from "../utils/validations";

// PAGE GESTION DE USUARIO
export function GestionUsuarioPage() {
    const { usuario } = useAuth(); 

    const estadoInicial = {
        nombreCompleto: "",
        email: "",
        password: "",
        rol: "MEDICO",
        estado: "ACTIVO",
        hospitalRef: "",
        doctor: {
            especialidad: "",
            colegiadoNum: ""
        }
    };

    const [formData, setFormData] = useState(estadoInicial);
    const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
    const [enviando, setEnviando] = useState(false);
    
    const [errores, setErrores] = useState({});

    const handleChangeUser = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errores[e.target.name]) {
            setErrores({ ...errores, [e.target.name]: false });
        }
    };

    const handleChangeDoctor = (e) => {
        setFormData({
            ...formData,
            doctor: {
                ...formData.doctor,
                [e.target.name]: e.target.value
            }
        });
        if (errores[e.target.name]) {
            setErrores({ ...errores, [e.target.name]: false });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const nuevosErrores = {};
        
        if (!validateName(formData.nombreCompleto)) nuevosErrores.nombreCompleto = true;
        if (!validateEmail(formData.email)) nuevosErrores.email = true;
        if (!validatePassword(formData.password)) nuevosErrores.password = true;
        if (!formData.hospitalRef.trim()) nuevosErrores.hospitalRef = true; // Comprobamos que no esté vacío
        if (!formData.doctor.especialidad) nuevosErrores.especialidad = true;
        if (!validateNumCol(formData.doctor.colegiadoNum)) nuevosErrores.colegiadoNum = true;

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            setMensaje({ 
                texto: "Revisa los campos en rojo. La contraseña requiere 8 caracteres (mayúscula, minúscula, número) y el Colegiado 9 dígitos.", 
                tipo: "error" 
            });
            return;
        }
        
        setErrores({});

        setEnviando(true);
        setMensaje({ texto: "Conectando con el servidor de Render...", tipo: "info" });

        try {
            const respuesta = await loginService.registrarMedico(formData);
            
            console.log("Respuesta del servidor:", respuesta);

            setMensaje({ 
                texto: respuesta.message || "Médico registrado correctamente.", 
                tipo: "exito" 
            });
            
            setFormData(estadoInicial); 

        } catch (error) {
            console.error("Error capturado en el submit:", error);
            setMensaje({ 
                texto: error.message || "Error al comunicar con el servidor.", 
                tipo: "error" 
            });
        } finally {
            setEnviando(false); 
        }
    };

    return (
        <div className="gestion-container">
            <div className="gestion-header">
                <h1>Alta de Nuevo Personal Médico</h1>
                <p>Completa los datos para registrar un nuevo especialista en el sistema.</p>
            </div>

            <form className="gestion-form-caja" onSubmit={handleSubmit} noValidate>
                
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
                            className={errores.nombreCompleto ? "input-error" : ""}
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
                            className={errores.email ? "input-error" : ""}
                        />
                    </div>

                    <div className="input-group">
                        <label>Contraseña Temporal</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password} 
                            onChange={handleChangeUser} 
                            placeholder="Asigna una contraseña" 
                            required 
                            className={errores.password ? "input-error" : ""}
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
                            className={errores.hospitalRef ? "input-error" : ""}
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
                            className={errores.especialidad ? "input-error" : ""}
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
                            className={errores.colegiadoNum ? "input-error" : ""}
                        />
                    </div>
                </div>

                {mensaje.texto && (
                    <div className={`mensaje-alerta ${mensaje.tipo}`}>
                        {mensaje.texto}
                    </div>
                )}

                <div className="form-footer">
                    <button type="submit" className="btn-green-submit" disabled={enviando}>
                        {enviando ? "Procesando..." : "Registrar Médico en el Sistema"}
                    </button>
                </div>
            </form>
        </div>
    );
}