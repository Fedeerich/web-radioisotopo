/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Pagina que llama al componente Login para iniciar sesion]
AUTHOR:        [Marcos, Wael]
UPDATED:       [23/04/2026]
================================================================================
*/
// IMPORTS
import { LoginForm } from "../components/LoginForm";

// PAGE LOGIN
export default function LoginPage() {
    return(
        <main className="login-page-container">
            <LoginForm /> 
        </main>
    )
}