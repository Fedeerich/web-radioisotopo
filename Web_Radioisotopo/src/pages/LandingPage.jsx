import React, { useEffect, useState } from 'react';
import '../styles/Landing.css';
import imgMedicos from '../assets/images/medicos.jpg';
import imgPanellPacients from '../assets/images-demo/gestion-pacientes.png';
import imgPerfilPacients from '../assets/images-demo/perfil-usuario.png';
import imgAuditoriaAdmin from '../assets/images-demo/auditoria-admin.png';
import { AtomIcon, UsersIcon, ShieldIcon, ChartIcon, BellIcon, DocumentIcon, CheckIcon, ArrowIcon, LockIcon, MoonIcon, SunIcon } from '../constants/iconosLanding';
import { useTranslation } from '../hooks/useTranslation';
import { getCookie, setCookie } from '../utils/cookies';

export function LandingPage() {
    const [scrolled, setScrolled] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const { t } = useTranslation();

    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        document.body.classList.toggle('dark-mode', newMode);
        setCookie('theme', newMode ? 'dark' : 'light', 365);
    };

    useEffect(() => {
        const savedTheme = getCookie('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.body.classList.add('dark-mode');
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (getCookie('cookiesAccepted')) {
            const banner = document.getElementById('cookies-banner');
            if (banner) banner.style.display = 'none';
        }
    }, []);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-element').forEach(el => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div id="top" className="landing-wrapper">
            <header className={`landing-header ${scrolled ? 'scrolled' : ''}`}>
                <a href="#top" className="landing-logo">
                    <div className="landing-logo-icon">
                        <AtomIcon />
                    </div>
                    <span>{t('radioisotopos')}</span>
                </a>
                <nav className="landing-nav">
                    <a href="#demo">{t('demo')}</a>
                    <a href="#caracteristiques">{t('caracteristiques')}</a>
                    <a href="#contacte">{t('contacte')}</a>
                </nav>
                <div className="header-actions">
                    <button className="theme-toggle" onClick={toggleTheme} title={darkMode ? "Modo claro" : "Modo oscuro"}>
                        {darkMode ? <SunIcon /> : <MoonIcon />}
                    </button>
                    <a href="/login-page" className="btn-login-header">
                        {t('iniciarSesion')}
                    </a>
                </div>
            </header>

            <section className="landing-hero">
                <div className="hero-bg-grid"></div>
                <div className="hero-bg-glow hero-bg-glow-1"></div>
                <div className="hero-bg-glow hero-bg-glow-2"></div>
                
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-badge fade-in-element stagger-1">
                            <span className="hero-badge-dot"></span>
                            {t('tecnologiaNuclear')}
                        </div>
                        <h1 className="hero-title fade-in-element stagger-2">
                            {t('gestioInteligent')} 
                            <span className="hero-title-gradient">{t('radiofarmacsClinics')}</span>
                        </h1>
                        <p className="hero-description fade-in-element stagger-3">
                            {t('plataformaIntegral')}
                        </p>
                        <div className="hero-actions fade-in-element stagger-4">
                            <a href="https://mail.google.com/mail/?view=cm&to=radioisotopo.portal@gmail.com&su=Información%20sobre%20Radioisòtops" target="_blank" rel="noopener noreferrer" className="btn-primary">
                                {t('demanaInformacio')}
                                <ArrowIcon />
                            </a>
                            <a href="#demo" className="btn-secondary">
                                {t('veureDemo')}
                            </a>
                        </div>
                    </div>

                    <div className="hero-visual fade-in-element stagger-3">
                        <div className="hero-image-wrapper">
                            <img src={ imgMedicos } alt="Professionals mèdics" />
                            <div className="hero-image-overlay"></div>
                        </div>
                        <div className="hero-floating-card hero-floating-card-1">
                            <div className="floating-card-icon">
                                <ShieldIcon />
                            </div>
                            <div className="floating-card-title">{t('seguretatTotal')}</div>
                            <div className="floating-card-subtitle">{t('protocolsCertificats')}</div>
                        </div>
                        <div className="hero-floating-card hero-floating-card-2">
                            <div className="floating-card-icon">
                                <ChartIcon />
                            </div>
                            <div className="floating-card-title">{t('precisio')}</div>
                            <div className="floating-card-subtitle">{t('dadesRealTime')}</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="landing-stats">
                <div className="landing-stats-grid">
                    <div className="landing-stat-item fade-in-element stagger-1">
                        <div className="landing-stat-icon">
                            <UsersIcon />
                        </div>
                        <div className="landing-stat-number">50+</div>
                        <div className="landing-stat-label">{t('hospitalsConnectats')}</div>
                    </div>
                    <div className="landing-stat-item fade-in-element stagger-2">
                        <div className="landing-stat-icon">
                            <ChartIcon />
                        </div>
                        <div className="landing-stat-number">12K</div>
                        <div className="landing-stat-label">{t('pacientsMonitoritzats')}</div>
                    </div>
                    <div className="landing-stat-item fade-in-element stagger-3">
                        <div className="landing-stat-icon">
                            <ShieldIcon />
                        </div>
                        <div className="landing-stat-number">99.9%</div>
                        <div className="landing-stat-label">{t('disponibilitat')}</div>
                    </div>
                    <div className="landing-stat-item fade-in-element stagger-4">
                        <div className="landing-stat-icon">
                            <BellIcon />
                        </div>
                        <div className="landing-stat-number">0</div>
                        <div className="landing-stat-label">{t('incidentsSeguretat')}</div>
                    </div>
                </div>
            </section>

            <section id="caracteristiques" className="landing-features">
                <div className="section-header fade-in-element">
                    <div className="section-badge">{t('caracteristiques')}</div>
                    <h2 className="landing-section-title">{t('estatArtControl')}</h2>
                    <p className="section-description">
                        {t('solucioCompleta')}
                    </p>
                </div>

                <div className="features-container">
                    <div className="feature-card fade-in-element stagger-1">
                        <div className="feature-icon">
                            <UsersIcon />
                        </div>
                        <h3 className="feature-title">{t('monitoritzacioPacients')}</h3>
                        <p className="feature-description">
                            {t('seguimentLogic')}
                        </p>
                    </div>

                    <div className="feature-card fade-in-element stagger-2">
                        <div className="feature-icon">
                            <BellIcon />
                        </div>
                        <h3 className="feature-title">{t('alertesSeguretat')}</h3>
                        <p className="feature-description">
                            {t('protocolAutematic')}
                        </p>
                    </div>

                    <div className="feature-card fade-in-element stagger-3">
                        <div className="feature-icon">
                            <DocumentIcon />
                        </div>
                        <h3 className="feature-title">{t('informesAuditoria')}</h3>
                        <p className="feature-description">
                            {t('generacioAutomatitzada')}
                        </p>
                    </div>

                    <div className="feature-card fade-in-element stagger-1">
                        <div className="feature-icon">
                            <ChartIcon />
                        </div>
                        <h3 className="feature-title">{t('analyticsAvancat')}</h3>
                        <p className="feature-description">
                            {t('dashboardInteligent')}
                        </p>
                    </div>

                    <div className="feature-card fade-in-element stagger-2">
                        <div className="feature-icon">
                            <ShieldIcon />
                        </div>
                        <h3 className="feature-title">{t('complimentNormatiu')}</h3>
                        <p className="feature-description">
                            {t('normativaEuropea')}
                        </p>
                    </div>

                    <div className="feature-card fade-in-element stagger-3">
                        <div className="feature-icon">
                            <LockIcon />
                        </div>
                        <h3 className="feature-title">{t('xifratGrauMedic')}</h3>
                        <p className="feature-description">
                            {t('protectioDades')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="landing-showcase">
                <div className="showcase-container">
                    <div className="showcase-content">
                        <div className="section-badge fade-in-element">{t('solucionsIntegrals')}</div>
                        <h2 className="landing-section-title fade-in-element">
                            {t('dissenyatEquips')}
                        </h2>
                        <p className="section-description fade-in-element">
                            {t('plataformaIntegra')}
                        </p>
                        <div className="showcase-features fade-in-element">
                            <div className="showcase-feature-item">
                                <div className="showcase-feature-icon">
                                    <CheckIcon />
                                </div>
                                <div className="showcase-feature-text">
                                    <h4>{t('integracioApi')}</h4>
                                    <p>{t('connecteuSistemes')}</p>
                                </div>
                            </div>
                            <div className="showcase-feature-item">
                                <div className="showcase-feature-icon">
                                    <CheckIcon />
                                </div>
                                <div className="showcase-feature-text">
                                    <h4>{t('suport247')}</h4>
                                    <p>{t('equipEspecialistes')}</p>
                                </div>
                            </div>
                            <div className="showcase-feature-item">
                                <div className="showcase-feature-icon">
                                    <CheckIcon />
                                </div>
                                <div className="showcase-feature-text">
                                    <h4>{t('formacioInclosa')}</h4>
                                    <p>{t('cursosCertificacio')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="showcase-visual fade-in-element">
                        <div className="showcase-image-main">
                            <img src={imgMedicos} alt="Dashboard del sistema" />
                        </div>
                        <div className="showcase-stats-overlay">
                            <div className="landing-showcase-stat-card">
                                <div className="landing-showcase-stat-number">24/7</div>
                                <div className="landing-showcase-stat-label">{t('sincronizacion')}</div>
                            </div>
                            <div className="landing-showcase-stat-card">
                                <div className="landing-showcase-stat-number">Multi</div>
                                <div className="landing-showcase-stat-label">{t('integracions')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contacte" className="landing-cta">
                <div className="cta-container">
                    <h2 className="cta-title fade-in-element">
                        {t('prepareuHospital')}
                    </h2>
                    <p className="cta-description fade-in-element">
                        {t('contacteuNosaltres')}
                    </p>
                        <div className="cta-actions fade-in-element">
                        <a href="https://mail.google.com/mail/?view=cm&to=radioisotopo.portal@gmail.com&su=Informació%20sobre%20Radioisòtops" target="_blank" rel="noopener noreferrer" className="btn-primary">
                            {t('contactaNos')}
                            <ArrowIcon />
                        </a>
                    </div>
                    <div className="cta-trust fade-in-element">
                        <div className="cta-trust-item">
                            <CheckIcon />
                            <span>{t('respostaMenys24h')}</span>
                        </div>
                        <div className="cta-trust-item">
                            <CheckIcon />
                            <span>{t('assessoriaPersonalitzada')}</span>
                        </div>
                        <div className="cta-trust-item">
                            <CheckIcon />
                            <span>{t('senseCompromis')}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section id="demo" className="landing-demo">
                <div className="demo-header section-header fade-in-element">
                    <div className="section-badge">{t('demo')}</div>
                    <h2 className="landing-section-title">{t('quePodeuMonitoritzar')}</h2>
                    <p className="section-description">
                        {t('descobrirFuncionalitats')}
                    </p>
                </div>
                <div className="demo-grid">
                    <div className="demo-card fade-in-element stagger-1">
                        <div className="demo-card-image">
                            <img src={ imgPanellPacients } alt={t('panellPacients')} />
                        </div>
                        <div className="demo-card-content">
                            <h3>{t('panellPacients')}</h3>
                            <p>{t('visualitzaRealTime')}</p>
                        </div>
                    </div>
                    <div className="demo-card fade-in-element stagger-2">
                        <div className="demo-card-image">
                            <img src={ imgPerfilPacients } alt={t('estadistiquesDetallades')} />
                        </div>
                        <div className="demo-card-content">
                            <h3>{t('estadistiquesDetallades')}</h3>
                            <p>{t('grafiquesInformes')}</p>
                        </div>
                    </div>
                    <div className="demo-card fade-in-element stagger-3">
                        <div className="demo-card-image">
                            <img src={ imgAuditoriaAdmin } alt={t('sistemaAuditoria')} />
                        </div>
                        <div className="demo-card-content">
                            <h3>{t('sistemaAuditoria')}</h3>
                            <p>{t('registreComplet')}</p>
                        </div>
                    </div>
                    <div className="demo-card fade-in-element stagger-1">
                        <div className="demo-card-image">
                            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80" alt={t('sistemaAlertes')} />
                        </div>
                        <div className="demo-card-content">
                            <h3>{t('sistemaAlertes')}</h3>
                            <p>{t('notificacionsAutomaticas')}</p>
                        </div>
                    </div>
                    <div className="demo-card fade-in-element stagger-2">
                        <div className="demo-card-image">
                            <img src="https://images.unsplash.com/photo-1559757175-5700dde87bc0?w=600&q=80" alt={t('creacioPacient')} />
                        </div>
                        <div className="demo-card-content">
                            <h3>{t('creacioPacient')}</h3>
                            <p>{t('calculAutoma')}</p>
                        </div>
                    </div>
                    <div className="demo-card fade-in-element stagger-3">
                        <div className="demo-card-image">
                            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80" alt={t('generacioInformes')} />
                        </div>
                        <div className="demo-card-content">
                            <h3>{t('generacioInformes')}</h3>
                            <p>{t('creaExportaInformes')}</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="landing-footer">
                <div className="footer-minimal">
                    <span className="footer-minimal-copy">© 2026 {t('radioisotopos')}. {t('totsDretsReservats')}</span>
                    <nav className="footer-minimal-links">
                        <a href="mailto:radioisotopo.portal@gmail.com?subject=Información%20sobre%20Radioisòtops">{t('contacte')}</a>
                        <span>·</span>
                        <a href="/privacidad">{t('politicaPrivacitat')}</a>
                        <span>·</span>
                        <a href="/privacidad#terminos" className="footer-link-secondary">{t('termesServei')}</a>
                    </nav>
                </div>
            </footer>
            <div className="cookies-banner" id="cookies-banner">
                <div className="cookies-content">
                    <div className="cookies-text">
                        <strong>{t('cookiesTitol')}</strong>
                        <p>{t('cookiesMensaje')}</p>
                        <span className="cookies-tipos">{t('cookiesTipos')}</span>
                    </div>
                    <div className="cookies-actions">
                        <button className="btn-cookies" onClick={() => {
                            setCookie('cookiesAccepted', 'true', 365);
                            document.getElementById('cookies-banner').style.display = 'none';
                        }}>
                            {t('cookiesAceptar')}
                        </button>
                        <a href="/privacidad" className="link-cookies">{t('cookiesMasInfo')}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
