/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Cookies para tener guardada la sesion]
AUTHOR:        [Marcos, Wael]
UPDATED:       [23/04/2026]
================================================================================
*/
export function setCookie(name, value, days = 365) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.slice(1);
        if (cookie.startsWith(nameEQ)) return cookie.slice(nameEQ.length);
    }
    return null;
}

function removeCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}