import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LoginPage } from './pages/LoginPage';

const root = createRoot(document.getElementById('root'));

root.render(
  <LoginPage />
)
