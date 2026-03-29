const API_URL = "https://api-radioisotopo-proxy.m-gongora-carriedo.workers.dev/api"; 

export const loginService = {
    iniciarSesion: async (emailIngresado, passwordIngresado) => {
        const respuesta = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: emailIngresado,
                contraseña: passwordIngresado
            })
        });

        if (respuesta.status === 401) {
            throw new Error("Email o contraseña incorrectos");
        }

        if (!respuesta.ok) {
            throw new Error("Error en el servidor Java");
        }

        return respuesta.json(); 
    }
};