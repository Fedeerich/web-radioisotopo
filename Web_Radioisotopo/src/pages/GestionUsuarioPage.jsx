import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/GestionUsuario.css";
import { loginService } from "../services/api";
import { useTranslation } from "../hooks/useTranslation";

export function GestionUsuarioPage() {
    const { usuario } = useAuth(); 
    const { t } = useTranslation();

    const estadoInicial = {
        nombreCompleto: "",
        email: "",
        password: "", // Asegúrate de que se llame password como en Java
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
    const [enviando, setEnviando] = useState(false); // Estado para bloquear el botón

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
        setEnviando(true);
        setMensaje({ texto: t('conectandoServidor'), tipo: "info" });

        try {
            const respuesta = await loginService.registrarMedico(formData);
            
            console.log("Respuesta del servidor:", respuesta);

            setMensaje({ 
                texto: respuesta.message || t('medicoRegistrado'), 
                tipo: "exito" 
            });
            
            setFormData(estadoInicial); 

        } catch (error) {
            console.error("Error capturado en el submit:", error);
            setMensaje({ 
                texto: error.message || t('errorComunicarServidor'), 
                tipo: "error" 
            });
        } finally {
            setEnviando(false); 
        }
    };

    return (
        <div className="gestion-container">
            <div className="gestion-header">
                <h1>{t('altaNuevoPersonalMedico')}</h1>
                <p>{t('completaDatosRegistrar')}</p>
            </div>

            <form className="gestion-form-caja" onSubmit={handleSubmit}>
                
                <h3 className="section-title">{t('datosAcceso')}</h3>
                <div className="form-grid">
                    <div className="input-group">
                        <label>{t('nombreCompleto')}</label>
                        <input 
                            type="text" 
                            name="nombreCompleto"
                            value={formData.nombreCompleto} 
                            onChange={handleChangeUser} 
                            placeholder={t('ejemploNombreCompleto')} 
                            required 
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>{t('correoCorporativo')}</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email} 
                            onChange={handleChangeUser} 
                            placeholder={t('ejemploCorreo')} 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>{t('contrasenaTemporal')}</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password} 
                            onChange={handleChangeUser} 
                            placeholder={t('asignaContrasena')} 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>{t('hospitalReferenciaInput')}</label>
                        <input 
                            type="text" 
                            name="hospitalRef"
                            value={formData.hospitalRef} 
                            onChange={handleChangeUser} 
                            placeholder={t('ejemploHospital')} 
                            required 
                        />
                    </div>
                </div>

                <hr className="form-divider" />

                <h3 className="section-title">{t('datosProfesionales')}</h3>
                <div className="form-grid">
                    <div className="input-group">
                        <label>{t('especialidad')}</label>
                        <select 
                            name="especialidad" 
                            value={formData.doctor.especialidad} 
                            onChange={handleChangeDoctor}
                            required
                        >
                            <option value="">{t('seleccionaEspecialidad')}</option>
                            <option value="Oncología Radioterápica">{t('oncologiaRadioterapica')}</option>
                            <option value="Medicina Nuclear">{t('medicinaNuclear')}</option>
                            <option value="Radiología">{t('radiologia')}</option>
                            <option value="Física Médica">{t('fisicaMedica')}</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>{t('numeroColegiado')}</label>
                        <input 
                            type="text" 
                            name="colegiadoNum"
                            value={formData.doctor.colegiadoNum} 
                            onChange={handleChangeDoctor} 
                            placeholder={t('ejemploColegiado')} 
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
                    <button type="submit" className="btn-green-submit" disabled={enviando}>
                        {enviando ? t('procesar') : t('registrarMedicoSistema')}
                    </button>
                </div>
            </form>
        </div>
    );
}