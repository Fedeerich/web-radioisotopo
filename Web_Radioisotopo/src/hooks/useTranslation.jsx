import { useAuth } from "../context/AuthContext";
import { textos } from "../constants/traducciones";

export const useTranslation = () => {
    const { usuario } = useAuth();
    
    const idioma = usuario?.idioma || "Castellano";
    
    const t = (clave) => {
        const textosIdioma = textos[idioma] || textos.Castellano;
        return textosIdioma[clave] || clave;
    };
    
    return { t, idioma };
};
