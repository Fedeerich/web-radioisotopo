import { useAuth } from "../context/AuthContext";
import { textos } from "../constants/traducciones";

export const useTranslation = () => {
    const { usuario } = useAuth();
    
    // El idioma puede venir del backend como "Castellano", "Català", "English"
    // Aseguramos que coincida con las keys del objeto textos
    let idioma = usuario?.idioma || "Castellano";
    
    // Normalizar el idioma (asegurar que coincida con las keys)
    if (idioma === "Catala" || idioma === "Català") {
        idioma = "Catala";
    }
    
    const t = (clave) => {
        const textosIdioma = textos[idioma] || textos.Castellano;
        return textosIdioma[clave] || clave;
    };
    
    return { t, idioma };
};
