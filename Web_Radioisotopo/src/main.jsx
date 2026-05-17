/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Gestion de Root Routes]
AUTHOR:        [Marcos, Wael]
UPDATED:       [23/04/2026]
================================================================================
*/

// IMPORTS
import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CambiarPasswordPage from './pages/CambiarPasswordPage';
import PrivacidadPage from './pages/PrivacidadPage';

const App = lazy(() => import('./App'));

// FUNCIÓN ROOT
function Root() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login-page" element={<LoginPage />} />
          
          <Route path="/main-page" element={<Suspense fallback={<div className="loading-screen">Cargando…</div>}><App /></Suspense>} />
          <Route path="/paciente" element={<Suspense fallback={<div className="loading-screen">Cargando…</div>}><App /></Suspense>} />
          <Route path="/configuracion" element={<Suspense fallback={<div className="loading-screen">Cargando…</div>}><App /></Suspense>} />
          <Route path="/admin" element={<Suspense fallback={<div className="loading-screen">Cargando…</div>}><App /></Suspense>} /> 
          <Route path="/auditoria" element={<Suspense fallback={<div className="loading-screen">Cargando…</div>}><App /></Suspense>} />
          <Route path="/cambiar-password" element={<CambiarPasswordPage />} />
          <Route path="/privacidad" element={<PrivacidadPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Root />
  </StrictMode>
);