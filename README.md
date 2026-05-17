# RadiSync - Hospital Management System

## Description

RadiaSync is a web application for hospital management specialized in radiotherapy oncology, nuclear medicine, and radiology. The system allows the administration of patients, doctors, clinical notifications, and wearable device monitoring.

## Technologies Used

### Main Framework
- **React 19.2.0** - Library for building user interfaces
- **React DOM 19.2.0** - DOM rendering for React

### Build Tool
- **Vite 7.3.1** - Build tool and development server
- **@vitejs/plugin-react-swc** - Plugin for React support with SWC

### Routing
- **React Router DOM 7.13.1** - Route handling and navigation

### UI Components
- **React DatePicker 9.1.0** - Date selector for clinical forms
- **date-fns 4.1.0** - Utilities for date manipulation

### Language
- **JavaScript (JSX)** - Main development language
- **CSS3** - Custom component styles

## Project Structure

```
Web_Radioisotopo/
├── src/
│   ├── main.jsx                    # Entry point and route configuration
│   ├── App.jsx                     # Main component with dashboard layout
│   ├── components/                 # Reusable components
│   │   ├── LoginForm.jsx          # Login form
│   │   ├── NavBar.jsx             # Top navigation bar
│   │   ├── SideBar.jsx            # Side navigation menu
│   │   └── UserProfile.jsx        # User profile in the interface
│   ├── pages/                      # Application pages
│   │   ├── LandingPage.jsx        # Public landing page
│   │   ├── LoginPage.jsx          # System access page
│   │   ├── HomePage.jsx           # Main dashboard
│   │   ├── PacientePage.jsx       # Patient management
│   │   ├── CrearPacientePage.jsx  # New patient registration
│   │   ├── PerfilPacientePage.jsx # Patient detailed view
│   │   ├── ConfiguracionPage.jsx  # User settings
│   │   ├── CambiarPasswordPage.jsx# Password change
│   │   ├── GestionUsuarioPage.jsx # Doctor administration
│   │   ├── AuditoriaPage.jsx      # Audit and security panel
│   │   └── PrivacidadPage.jsx     # Privacy information
│   ├── services/
│   │   └── api.js                 # Backend communication services
│   ├── context/
│   │   └── AuthContext.jsx         # Global authentication context
│   ├── hooks/
│   │   └── useTranslation.jsx     # Internationalization hook
│   ├── utils/
│   │   ├── validations.js         # Form validation functions
│   │   └── cookies.js             # Cookie handling utilities
│   ├── constants/
│   │   └── traducciones.js       # Texts in Spanish, Catalan, and English
│   ├── assets/                    # Images and static resources
│   └── styles/                    # Component-specific CSS files
├── package.json
└── vite.config.js
```

## Pages and Functionalities

### LandingPage.jsx
**Route:** `/`
**Description:** Public presentation page for the system. Displays general information about RADIOISOTOPO and access links.

### LoginPage.jsx
**Route:** `/login-page`
**Description:** System access page containing the LoginForm component.
**Component:** LoginForm.jsx

#### LoginForm.jsx Functions
- **manejarLogin(e)** (line 41): Validates email and password credentials, authenticates the user via `loginService.iniciarSesion()`, manages the "remember me" option, and redirects accordingly.
- **validateEmail(email)** (imported from validations.js): Validates email format.
- **validatePassword(password)** (imported from validations.js): Validates password security requirements.

### HomePage.jsx
**Route:** `/main-page`
**Description:** Main dashboard displaying patient summaries, recent alerts, and system metrics.
**Functions:**
- **alSeleccionarPaciente(paciente)** (in App.jsx line 26): Handles navigation to the patient page when a patient is selected from the dashboard.

### PacientePage.jsx
**Route:** `/paciente`
**Description:** Complete patient management. Allows searching, viewing, and managing patient clinical information, including smartwatch data (watchId) and battery level.

### CrearPacientePage.jsx
**Route:** Access from PacientePage
**Description:** Form for new patient registration with CIP validation (Catalan Health Card), personal data, and device linking.

### PerfilPacientePage.jsx
**Route:** `/paciente` (with state parameters)
**Description:** Detailed view of a specific patient's profile, showing consultation history, notifications, and wearable device status.

### ConfiguracionPage.jsx
**Route:** `/configuracion`
**Description:** User settings page where notification preferences, language, timezone, and profile picture can be modified.
**Functions:**
- Preference management via `loginService.guardarPreferencias()`
- Profile update with `loginService.actualizarPerfil()`
- Avatar upload via `loginService.subirAvatar()`

### CambiarPasswordPage.jsx
**Route:** `/cambiar-password`
**Description:** Allows the user to change their password by providing the current and new password.
**Functions:**
- **manejarCambio(e)** (line 38): Validates that passwords match, verifies security requirements, and sends the request to the backend via `loginService.cambiarPasswordPerfil(oldPassword, newPassword)`.
- **loginService.cambiarPasswordPerfil(oldPassword, newPassword)** (api.js line 292): Sends POST request to `/auth/update-password` with the old and new password.

### GestionUsuarioPage.jsx
**Route:** `/admin` (through App.jsx)
**Description:** Administrative panel for medical staff registration and management. Allows registering doctors with their specialties and medical license numbers.
**Functions:**
- **handleChangeUser(e)** (line 41): Handles changes in user fields (name, email, password, hospital).
- **handleChangeDoctor(e)** (line 51): Handles changes in doctor-specific fields (specialty, medical license number).
- **handleSubmit(e)** (line 64): Validates all fields, verifies formats via validation functions, and registers the doctor via `loginService.registrarMedico(formData)`.
- **validateName(name)** (validations.js line 12): Validates names and surnames (3-50 characters, letters and spaces).
- **validateNumCol(numCol)** (validations.js line 48): Validates medical license number (exactly 9 digits).

### AuditoriaPage.jsx
**Route:** `/auditoria` (through App.jsx)
**Description:** Audit panel for administrators. Allows managing doctor status (ACTIVE/INACTIVE) and resetting passwords.
**Functions:**
- **cargarDatosAuditoria()** (line 38): Loads the list of doctors via `loginService.listarDoctoresAdmin()` and processes their avatars.
- **manejarCambioEstado(id, estadoActual)** (line 70): Changes a doctor's status between ACTIVE and INACTIVE using `loginService.actualizarEstadoUsuario(id, nuevoEstado)`.
- **manejarResetPassword(id, nombre)** (line 82): Resets a doctor's password via `loginService.resetPasswordAdmin(id, nuevaPass)`. Sends a temporary password and notifies via email.
- **loginService.resetPasswordAdmin(id, nuevaPassword)** (api.js line 111): Sends POST request to `/auth/doctor/:id/password` to reset a doctor's password.
- **cargarImagenComoBlob(url)** (line 20): Loads avatar images as Blob objects for local display.

### PrivacidadPage.jsx
**Route:** `/privacidad`
**Description:** Informative page about privacy policy and personal data processing in accordance with GDPR.

## API Services (api.js)

Location: `src/services/api.js`

Base URL: `https://api-radioisotopo-proxy.m-gongora-carriedo.workers.dev/api`

### Authentication
- **iniciarSesion(email, password)** (line 23): POST `/auth/login` - Authenticates the user and stores the JWT token.
- **obtenerPerfilActual()** (line 40): GET `/auth/me` - Gets the current user's profile based on the token.
- **guardarPreferencias(preferencias)** (line 59): PUT `/auth/preferencias` - Updates notification preferences and language.
- **actualizarPerfil(datosPerfil)** (line 306): PUT `/auth/profile` - Updates user profile data.

### Doctor Management (Administrator)
- **registrarMedico(datosFormulario)** (line 76): POST `/users/register-doctor` - Registers a new doctor in the system.
- **listarDoctoresAdmin()** (line 95): GET `/auth/doctores` - Lists all registered doctors.
- **actualizarEstadoUsuario(id, estado)** (line 101): POST `/auth/doctor/:id/status` - Changes a doctor's status.
- **resetPasswordAdmin(id, nuevaPassword)** (line 111): POST `/auth/doctor/:id/password` - Resets a doctor's password and sends email.
- **cambiarPasswordPerfil(oldPassword, newPassword)** (line 292): POST `/auth/update-password` - Changes the authenticated user's password.

### Patient Management
- **registrarAltaCompleta(datosAlta)** (line 126): POST `/patients/register-full` - Complete patient registration with clinical data.
- **obtenerPerfilPaciente(cip)** (line 139): GET `/patients/perfil/:cip` - Gets detailed profile with smartwatch data.
- **obtenerTotalPacientes()** (line 148): GET `/patients/count-total` - Counts total patients.
- **obtenerListaPacientes()** (line 158): GET `/patients/lista-gestion` - Patient list for management.
- **obtenerPacientesRecientes()** (line 171): GET `/patients/recent-patients` - Recently registered patients.
- **registrarVisitaPaciente(cip)** (line 184): POST `/patients/:cip/register-view` - Registers a view visit.
- **obtenerConsultasPaciente(cip)** (line 191): GET `/notifications/consultas` - Gets consultations for a specific patient.
- **obtenerMensajesPaciente(cip)** (line 201): GET `/notifications/patient/:cip` - Gets messages/notifications for a patient.

### Notifications and Alerts
- **obtenerConteoNotificaciones()** (line 213): GET `/notifications/count` - Counts unread notifications.
- **obtenerListaNotificaciones()** (line 223): GET `/notifications/me` - Lists all user notifications.
- **marcarNotificacionLeida(id)** (line 232): PUT `/notifications/:id/read` - Marks a notification as read.
- **obtenerAlertasHoy()** (line 242): GET `/notifications/count-today` - Counts alerts generated today.

### Other Services
- **descargarInformePDF(cip)** (line 255): GET `/patients/:cip/informe-alta` - Downloads discharge report in PDF.
- **enviarInstruccionReloj(cip, clave)** (line 280): POST `/notifications/patient/:cip/send-instruction` - Sends instructions to the patient's smartwatch.
- **subirAvatar(userId, file)** (line 320): POST `/users/:userId/upload-avatar` - Uploads profile image.

## Authentication Context (AuthContext.jsx)

Location: `src/context/AuthContext.jsx`

### Context Functions
- **AuthProvider({ children })** (line 18): Context provider that verifies the initial session when loading the application.
- **verificarSesion()** (line 23): Checks if there is a valid token via `loginService.obtenerPerfilActual()`.
- **login(userData)** (line 40): Updates user state after login.
- **logout()** (line 44): Removes the token and resets user state.
- **actualizarUsuario(nuevosDatos)** (line 49): Partially updates user data.
- **useAuth()** (line 68): Custom hook to consume the authentication context.

## Validations (validations.js)

Location: `src/utils/validations.js`

### Validation Functions
- **validateName(name)** (line 12): Validates names and surnames (3-50 characters, letters with accents, ñ, spaces).
- **validateEmail(email)** (line 18): Validates standard email format.
- **validatePassword(password)** (line 24): Validates password (minimum 8 characters, at least one uppercase, one lowercase, and one number).
- **validateDate(date)** (line 30): Validates dates in DD/MM/YYYY format.
- **validateDateTime(datetime)** (line 36): Validates date and time in DD/MM/YYYY HH:MM format.
- **validateUrl(url)** (line 42): Validates URLs with support for http/https, localhost, and ports.
- **validateNumCol(numCol)** (line 48): Validates medical license number (exactly 9 digits).
- **validateCIP(cip)** (line 54): Validates CatSalut CIP (4 uppercase letters + 10 numbers).
- **validateDosis(dosis)** (line 60): Validates medical dosages (positive numbers, allows decimals).

## Internationalization (useTranslation.jsx)

Location: `src/hooks/useTranslation.jsx`

### Hook Functions
- **useTranslation()** (line 17): Hook that returns functions and state for translation.
- **t(clave)** (line 26): Function that returns the translated text according to the user's language.
- **changeLanguage(newIdioma)** (line 31): Changes the application language and reloads the page.

### Supported Languages (traducciones.js)
- **Castellano** - Default language
- **Catala** - Catalan
- **English** - English

## Available Scripts

```bash
npm run dev        # Starts the development server with Vite
npm run build      # Builds the application for production
npm run lint       # Runs ESLint to check the code
npm run preview    # Previews the production build locally
```

## Development Setup

### Requirements
- Node.js (recommended version: 18 or higher)
- npm or yarn

### Installation
```bash
cd Web_Radioisotopo
npm install
npm run dev
```

The application will be available at `http://localhost:5173` (Vite default port).

## Authors

- **Marcos Gongora Carriedo**
- **Wael Zerrouk El Kasri**

---

## Related Repositories

| Project | Repository |
|---|---|
| Mobile App (this project) | [app-radioisotopo](https://github.com/Fedeerich/app-radioisotopo) |
| Backend API (Node.js) | [web-radioisotopo](https://github.com/Fedeerich/web-radioisotopo) |
| API Service (Java) | [RadioisotopsAPI](https://github.com/Waeeeell/RadioisotopsAPI) |
| Smartwatch App (Wear OS) | [WearOs_Radioisotops](https://github.com/Waeeeell/WearOs_Radiois-tops.git) |

---

## Documentation & Media

- **Project Report (Google Docs):** [View Document](https://docs.google.com/document/d/1R-SAZtx4eSSWveYiFlreRSbVty9Dd-G1S0sTAU66yrk/edit?usp=sharing)
- **Demo Video:** *(link pending)*

## Version

1.0.0 (Updated: May 2026)