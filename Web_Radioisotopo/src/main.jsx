import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { App } from './App';
import { AuthProvider } from "./context/AuthContext";
import { CambiarPasswordPage } from './pages/CambiarPasswordPage';
import { LandingPage } from './pages/LandingPage';
import { PrivacidadPage } from './pages/PrivacidadPage';

function Root() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login-page" element={<LoginPage />} />
          
          <Route path="/main-page" element={<App />} />
          <Route path="/paciente" element={<App />} />
          <Route path="/configuracion" element={<App />} />
          <Route path="/admin" element={<App />} /> 
          <Route path="/auditoria" element={<App />} />
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