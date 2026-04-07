const API_URL = "https://api-radioisotopo-proxy.m-gongora-carriedo.workers.dev/api"; 

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
});

export const loginService = {
    iniciarSesion: async (email, password) => {
        const respuesta = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password 
            })
        });

        if (!respuesta.ok) throw new Error("Credenciales incorrectas");
        
        const datos = await respuesta.json();
        
        if (datos.token) {
            localStorage.setItem("token", datos.token);
        }
        return datos;
    },

    registrarMedico: async (datosFormulario) => {
        const respuesta = await fetch(`${API_URL}/users/register-doctor`, { 
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(datosFormulario)
        });

        if (!respuesta.ok) {
            const errorTexto = await respuesta.text();
            throw new Error(errorTexto || "Error al registrar el médico");
        }
        return await respuesta.text();
    },

    registrarAltaCompleta: async (datosAlta) => {
        const respuesta = await fetch(`${API_URL}/patients/register-full`, { 
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(datosAlta)
        });

        if (!respuesta.ok) {
            const errorTexto = await respuesta.text();
            throw new Error(errorTexto || "Error en el alta clínica");
        }
        return await respuesta.text();
    },

    obtenerPerfilActual: async () => {
        const token = localStorage.getItem("token");
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

    obtenerTotalPacientes: async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/patients/count-total`, {
            method: "GET",
            headers: getHeaders()
        });
        if (!response.ok) throw new Error("Error al obtener el conteo");
        return await response.json();
    },

    obtenerListaPacientes: async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/patients/lista-gestion`, {
            method: "GET",
            headers: getHeaders()
        });
        if (!response.ok) throw new Error("Error al obtener la lista de gestión");
        return await response.json();
    },
    
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
        } catch (error) {
            console.error("Error en la descarga:", error);
            throw error;
        }
    },

    enviarInstruccionReloj: async (cip, mensaje) => {
        const respuesta = await fetch(`${API_URL}/patients/${cip}/send-instruction`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ mensaje: mensaje })
        });

        if (!respuesta.ok) {
            const errorTexto = await respuesta.text();
            throw new Error(errorTexto || "Error al enviar el mensaje al reloj");
        }
        return await respuesta.text();
    }
};