import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { App } from './App';
import { AuthProvider } from "./context/AuthContext";
import { CambiarPasswordPage } from './pages/CambiarPasswordPage';

function Root() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login-page" element={<LoginPage />} />
          
          <Route path="/main-page" element={<App />} />
          <Route path="/paciente" element={<App />} />
          <Route path="/configuracion" element={<App />} />
          <Route path="/admin" element={<App />} /> 
          <Route path="/auditoria" element={<App />} />
          <Route path="/cambiar-password" element={<CambiarPasswordPage />} />

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