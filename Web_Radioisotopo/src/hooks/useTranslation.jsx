/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Hook para el uso de las traducciones]
AUTHOR:        [Marcos, Wael]
UPDATED:       [23/04/2026]
================================================================================
*/

// IMPORTS
import { useAuth } from "../context/AuthContext";
import { textos } from "../constants/traducciones";
import { getCookie, setCookie } from "../utils/cookies";

// HOOK USETRANSLATION
export const useTranslation = () => {
    const { usuario } = useAuth();
    
    let idioma = usuario?.idioma || getCookie('idioma') || "Castellano";
    
    if (idioma === "Catala" || idioma === "Català" || idioma === "Catalán") {
        idioma = "Catala";
    }
    
    const t = (clave) => {
        const textosIdioma = textos[idioma] || textos.Castellano;
        return textosIdioma[clave] || clave;
    };
    
    const changeLanguage = (newIdioma) => {
        let idiomaFinal = newIdioma;
        if (idiomaFinal === "Catala" || idiomaFinal === "Català" || idiomaFinal === "Catalán") {
            idiomaFinal = "Catala";
        }
        setCookie('idioma', idiomaFinal);
        window.location.reload();
    };
    
    return { t, idioma, changeLanguage };
};
