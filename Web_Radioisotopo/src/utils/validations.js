/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Archivo para validaciones]
AUTHOR:        [Marcos, Wael]
UPDATED:       [25/04/2026]
================================================================================
*/

// VALIDATE NAME AND SURNAME (Letras, tildes, ñ, espacios. Mínimo 3 caracteres, máximo 50)
export const validateName = (name) => {
    const re = /^(?=.{3,50}$)[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/;
    return re.test(name);
}

// VALIDATE EMAIL (Formato estándar: usuario@dominio.extensión de mínimo 2 letras)
export const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

// VALIDATE PASSWORD (Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número)
export const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
}

// VALIDATE DATE (Adaptado a tu diseño visual: Formato DD/MM/AAAA)
const validateDate = (date) => {
    const re = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return re.test(date);
}

// VALIDATE DATETIME (Formato DD/MM/AAAA HH:MM para la administración del isótopo)
const validateDateTime = (datetime) => {
    const re = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4} ([01][0-9]|2[0-3]):[0-5][0-9]$/;
    return re.test(datetime);
}

// VALIDATE URL (Soporta http/https, localhost, dominios estándar, puertos y rutas complejas)
const validateUrl = (url) => {
    const re = /^https?:\/\/(localhost|((www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}))(:\d+)?\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    return re.test(url);
}

// VALIDATE NUM COL (Número de Colegiado Médico en España: 9 dígitos exactos)
export const validateNumCol = (numCol) => {
    const re = /^\d{9}$/;
    return re.test(numCol);
}

// VALIDATE CIP - CATSALUT (Tarjeta Sanitaria: 4 letras mayúsculas seguidas de 10 números)
export const validateCIP = (cip) => {
    const re = /^[A-Z]{4}\d{10}$/i;
    return re.test(cip);
}

// VALIDATE DOSIS (Solo números positivos, permitiendo decimales con punto)
export const validateDosis = (dosis) => {
    const re = /^(0*[1-9]\d*(\.\d+)?|0+\.\d*[1-9]\d*)$/;
    return re.test(dosis);
}