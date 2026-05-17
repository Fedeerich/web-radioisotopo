import "../styles/Login.css";
import logo from "../assets/logo.webp"; 
import { loginService } from "../services/api";
import { useReducer, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../hooks/useTranslation";
import { validateEmail, validatePassword } from "../utils/validations"; 

const initialState = {
    mostrarPassword: false,
    email: "",
    password: "",
    recordarme: false,
    mensajeError: "",
    cargando: false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'SET_ERROR':
            return { ...state, mensajeError: action.message };
        case 'SET_CARGANDO':
            return { ...state, cargando: action.cargando };
        case 'TOGGLE_PASSWORD':
            return { ...state, mostrarPassword: !state.mostrarPassword };
        default:
            return state;
    }
}

export function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const mantener = localStorage.getItem("mantenerSesion");
        if (token && mantener === "true") {
            navigate("/main-page");
        }
    }, [navigate]);

    const manejarLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: 'SET_ERROR', message: "" });

        if (!validateEmail(state.email)) {
            dispatch({ type: 'SET_ERROR', message: t('errorCorreoInvalido') });
            return;
        }

        if (!validatePassword(state.password)) {
            dispatch({ type: 'SET_ERROR', message: t('errorContrasenaInvalida') });
            return;
        }

        dispatch({ type: 'SET_CARGANDO', cargando: true });

        try {
            const respuesta = await loginService.iniciarSesion(state.email, state.password);
            
            if (state.recordarme) {
                localStorage.setItem("mantenerSesion", "true");
            } else {
                localStorage.removeItem("mantenerSesion");
            }

            login(respuesta); 

            if (respuesta.requiereCambioPassword) {
                navigate("/cambiar-password");
            } else {
                navigate("/main-page");
            }
        } catch (error) {
            dispatch({ type: 'SET_ERROR', message: error.message });
        } finally {
            dispatch({ type: 'SET_CARGANDO', cargando: false });
        }
    };

    return (
        <form className="login-form" onSubmit={manejarLogin} noValidate>
            <div className="header-container">
                <img src={ logo } alt="Logo" className="logo" width="160" height="160" />
                <h1>{t('bienvenidoAreaPrivada')}</h1>
                <p>{t('accederCuentaGestion')}</p>
            </div>

            <input 
                id="email" 
                type="email" 
                value={ state.email }
                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
                placeholder={t('correoElectronico')} 
                required 
                className={ state.mensajeError === t('errorCorreoInvalido') ? "input-error" : "" }
            />
            
            <div className="passDiv">
                <input 
                    id="passId" 
                    type={state.mostrarPassword ? "text" : "password"} 
                    value={ state.password }
                    onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })}
                    placeholder={t('contrasena')} 
                    required 
                    className={ state.mensajeError === t('errorContrasenaInvalida') ? "input-error" : "" }
                />
                <button 
                    type="button" 
                    className="show-password-btn"
                    onClick={() => dispatch({ type: 'TOGGLE_PASSWORD' })}
                    aria-label={state.mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                    {state.mostrarPassword ? (
                        <i className="fi fi-rs-crossed-eye"></i>
                    ) : (
                        <i className="fi fi-rs-eye"></i>
                    )}
                </button>
            </div>

            <div className="addons">
                <label className="remember-me">
                    <input 
                        type="checkbox" 
                        checked={state.recordarme}
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'recordarme', value: e.target.checked })}
                    />
                    <span>{t('recordarme')}</span>
                </label>
                <span 
                    className="forgot-password" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/cambiar-password')}
                    role="button" tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/cambiar-password'); }}
                >
                    {t('quieresCambiarContrasena')}
                </span>
            </div>

            {state.mensajeError && (
                <span className="error-texto-final">
                    {state.mensajeError}
                </span>
            )}

            <button type="submit" className="submit-btn" disabled={state.cargando}>
                {state.cargando ? <span className="spinner"></span> : t('iniciarSesion')}
            </button>
        </form>
    );
}
