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

// HOOK USETRANSLATION
export const useTranslation = () => {
    const { usuario } = useAuth();
    
    let idioma = usuario?.idioma || "Castellano";
    
    if (idioma === "Catala" || idioma === "Català") {
        idioma = "Catala";
    }
    
    const t = (clave) => {
        const textosIdioma = textos[idioma] || textos.Castellano;
        return textosIdioma[clave] || clave;
    };
    
    return { t, idioma };
};
