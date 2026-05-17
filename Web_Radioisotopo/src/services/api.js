/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Servicio para llamar al backend]
AUTHOR:        [Marcos, Wael]
UPDATED:       [06/05/2026]
================================================================================
*/ 

const API_URL = "https://api-radioisotopo-proxy.m-gongora-carriedo.workers.dev/api"; 

const getToken = () => localStorage.getItem("token");

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`
});

// Service Login (API TOTAL)
export const loginService = {
    /**
     * AUTENTICACIÓN
     */
    iniciarSesion: async (email, password) => {
        let respuesta;
        try {
            respuesta = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
        } catch {
            throw new Error("Vuelve a intentarlo de nuevo");
        }

        if (!respuesta.ok) {
            if (respuesta.status === 401) throw new Error("Credenciales incorrectas");
            if (respuesta.status >= 500) throw new Error("El servidor no está disponible, inténtelo de nuevo más tarde");
            throw new Error("Error inesperado al iniciar sesión");
        }
        
        const datos = await respuesta.json();
        if (datos.token) {
            localStorage.setItem("token", datos.token);
            localStorage.setItem("rol", datos.rol);
        }
        return datos;
    },

    obtenerPerfilActual: async () => {
        const token = getToken();
        if (!token) return null;

        const respuesta = await fetch(`${API_URL}/auth/me`, {
            method: "GET",
            headers: getHeaders()
        });

        if (!respuesta.ok) {
            localStorage.removeItem("token");
            return null;
        }
        return await respuesta.json();
    },

    /**
     * CONFIGURACIÓN Y PREFERENCIAS
     */
    guardarPreferencias: async (preferencias) => {
        const respuesta = await fetch(`${API_URL}/auth/preferencias`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(preferencias)
        });

        if (!respuesta.ok) {
            const error = await respuesta.json();
            throw new Error(error.message || "Error al actualizar preferencias");
        }
        return await respuesta.json();
    },

    /**
     * GESTIÓN DE MÉDICOS (ADMIN)
     */
    registrarMedico: async (datosFormulario) => {
        const respuesta = await fetch(`${API_URL}/users/register-doctor`, { 
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(datosFormulario)
        });

        const contenido = await respuesta.text();

        try {
            const datos = JSON.parse(contenido);
            if (!respuesta.ok) throw new Error(datos.error || datos.message || "Error en el servidor");
            return datos;
        } catch (e) {
            if (!respuesta.ok) throw new Error(contenido || "Error crítico del servidor (no JSON)");
            return contenido;
        }
    },

    listarDoctoresAdmin: async () => {
        const resp = await fetch(`${API_URL}/auth/doctores`, { headers: getHeaders() });
        if (!resp.ok) return [];
        return await resp.json();
    },

    actualizarEstadoUsuario: async (id, estado) => {
        const respuesta = await fetch(`${API_URL}/auth/doctor/${id}/status`, {
            method: "POST", 
            headers: getHeaders(),
            body: JSON.stringify({ estado })
        });
        if (!respuesta.ok) throw new Error("No se pudo cambiar el estado");
        return await respuesta.json();
    },

    resetPasswordAdmin: async (id, nuevaPassword) => {
        const respuesta = await fetch(`${API_URL}/auth/doctor/${id}/password`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ password: nuevaPassword })
        });

        const datos = await respuesta.json();
        if (!respuesta.ok) throw new Error(datos.message || "Error al resetear contraseña");
        return datos;
    },

    /**
     * GESTIÓN DE PACIENTES
     */
    registrarAltaCompleta: async (datosAlta) => {
        const respuesta = await fetch(`${API_URL}/patients/register-full`, { 
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(datosAlta)
        });

        const datos = await respuesta.json();
        if (!respuesta.ok) throw new Error(datos.error || "Error en el alta clínica");
        return datos;
    },

    // NUEVO: Obtener detalle completo del paciente (incluyendo watchId y batería)
    obtenerPerfilPaciente: async (cip) => {
        const respuesta = await fetch(`${API_URL}/patients/perfil/${cip}`, {
            method: "GET",
            headers: getHeaders()
        });
        if (!respuesta.ok) throw new Error("No se pudo obtener el perfil detallado");
        return await respuesta.json();
    },

    obtenerTotalPacientes: async () => {
        const response = await fetch(`${API_URL}/patients/count-total`, {
            method: "GET",
            headers: getHeaders()
        });
        if (!response.ok) throw new Error("Error al obtener el conteo");
        const datos = await response.json();
        return datos.count;
    },

    obtenerListaPacientes: async () => {
        try {
            const response = await fetch(`${API_URL}/patients/lista-gestion`, {
                method: "GET",
                headers: getHeaders()
            });
            if (!response.ok) return []; 
            return await response.json();
        } catch (e) {
            return [];
        }
    },

    obtenerPacientesRecientes: async () => {
        try {
            const respuesta = await fetch(`${API_URL}/patients/recent-patients`, {
                method: "GET",
                headers: getHeaders()
            });
            if (!respuesta.ok) return [];
            return await respuesta.json();
        } catch (e) {
            return [];
        }
    },

    registrarVisitaPaciente: async (cip) => {
        return await fetch(`${API_URL}/patients/${cip}/register-view`, {
            method: "POST",
            headers: getHeaders()
        });
    },

    obtenerConsultasPaciente: async (cip) => {
        const respuesta = await fetch(`${API_URL}/notifications/consultas`, { 
            method: "GET",
            headers: getHeaders() 
        });
        if (!respuesta.ok) return [];
        const data = await respuesta.json();
        return data.filter(n => n.patient && n.patient.dni === cip);
    },

    obtenerMensajesPaciente: async (cip) => {
        const respuesta = await fetch(`${API_URL}/notifications/patient/${cip}`, {
            method: "GET",
            headers: getHeaders()
        });
        if (!respuesta.ok) return [];
        return await respuesta.json();
    },

    /**
     * NOTIFICACIONES Y ALERTAS
     */
    obtenerConteoNotificaciones: async () => {
        const respuesta = await fetch(`${API_URL}/notifications/count`, {
            method: "GET",
            headers: getHeaders()
        });
        if (!respuesta.ok) return 0;
        const datos = await respuesta.json();
        return datos.unreadCount || 0;
    },

    obtenerListaNotificaciones: async () => {
        const respuesta = await fetch(`${API_URL}/notifications/me`, { 
            method: "GET",
            headers: getHeaders() 
        });
        if (!respuesta.ok) return [];
        return await respuesta.json();
    },

    marcarNotificacionLeida: async (id) => {
        const respuesta = await fetch(`${API_URL}/notifications/${id}/read`, {
            method: "PUT",
            headers: getHeaders()
        });

        if (!respuesta.ok) throw new Error("No se pudo actualizar");
        return await respuesta.json();
    },

    obtenerAlertasHoy: async () => {
        const respuesta = await fetch(`${API_URL}/notifications/count-today`, {
            method: "GET",
            headers: getHeaders()
        });
        if (!respuesta.ok) return 0;
        const datos = await respuesta.json();
        return datos.todayCount || 0;
    },

    /**
     * OTROS SERVICIOS
     */
    descargarInformePDF: async (cip) => {
        try {
            const respuesta = await fetch(`${API_URL}/patients/${cip}/informe-alta`, {
                method: "GET",
                headers: getHeaders(),
            });

            if (!respuesta.ok) throw new Error("No se pudo generar el PDF");

            const blob = await respuesta.blob();
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Informe_Alta_${cip}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error en la descarga:", error);
            throw error;
        }
    },

    enviarInstruccionReloj: async (cip, clave) => {
        const respuesta = await fetch(`${API_URL}/notifications/patient/${cip}/send-instruction`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ clave: clave }) 
        });

        const datos = await respuesta.json();
        if (!respuesta.ok) throw new Error(datos.error || "Error al enviar mensaje");
        return datos;
    },

    cambiarPasswordPerfil: async (oldPassword, newPassword) => {
        const respuesta = await fetch(`${API_URL}/auth/update-password`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword })
        });

        if (!respuesta.ok) {
            const error = await respuesta.text();
            throw new Error(error || "No se pudo cambiar la contraseña");
        }
        return await respuesta.json();
    },

    actualizarPerfil: async (datosPerfil) => {
        const respuesta = await fetch(`${API_URL}/auth/profile`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(datosPerfil)
        });

        if (!respuesta.ok) {
            const error = await respuesta.json();
            throw new Error(error.message || "Error al actualizar el perfil");
        }
        return await respuesta.json();
    },

    subirAvatar: async (userId, file) => {
        const formData = new FormData();
        formData.append('file', file);

        const respuesta = await fetch(`${API_URL}/users/${userId}/upload-avatar`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            body: formData
        });

        if (!respuesta.ok) {
            const error = await respuesta.json();
            throw new Error(error.error || "Error al subir la imagen");
        }
        return await respuesta.json();
    },
};