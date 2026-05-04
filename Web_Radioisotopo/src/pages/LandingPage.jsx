/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Página principal que puedes ver si no tienes cuenta]
AUTHOR:        [Marcos, Wael]
UPDATED:       [23/04/2026]
================================================================================
*/

// IMPORTS
import React, { useEffect, useState } from 'react';
import '../styles/Landing.css';
import imgMedicos from '../assets/images/medicos.jpg';
import logo from '../assets/logo.png';
import imgPanellPacients from '../assets/images-demo/gestion-pacientes.png';
import imgPerfilPacients from '../assets/images-demo/perfil-usuario.png';
import imgAuditoriaAdmin from '../assets/images-demo/auditoria-admin.png';
import collaborator1 from '../assets/collaborators/collaborator1.png';
import collaborator2 from '../assets/collaborators/collaborator2.png';
import { AtomIcon, UsersIcon, ShieldIcon, ChartIcon, BellIcon, DocumentIcon, CheckIcon, ArrowIcon, LockIcon, MoonIcon, SunIcon } from '../constants/iconosLanding';
import { useTranslation } from '../hooks/useTranslation';
import { getCookie, setCookie } from '../utils/cookies';

// PAGE LANDING PAGE
export function LandingPage() {
    const [scrolled, setScrolled] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const { t } = useTranslation();

    // Estados para los carruseles de demo
    const [webSlide, setWebSlide] = useState(0);
    const [appSlide, setAppSlide] = useState(0);
    const [watchSlide, setWatchSlide] = useState(0);
    const [userInteracting, setUserInteracting] = useState({ web: false, app: false, watch: false });

    // Imágenes temporales para cada demo (puedes reemplazar con tus propias)
    const webImages = [imgPanellPacients, imgPerfilPacients, imgAuditoriaAdmin];
    const appImages = [
        "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80"
    ];
    const watchImages = [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
        "https://images.unsplash.com/photo-1579586337278-3f1a5c2f1c1a?w=600&q=80"
    ];

    // Función para cambiar slide
    const changeSlide = (type, direction) => {
        setUserInteracting(prev => ({ ...prev, [type]: true }));
        const images = type === 'web' ? webImages : type === 'app' ? appImages : watchImages;
        const currentSlide = type === 'web' ? webSlide : type === 'app' ? appSlide : watchSlide;
        const setSlide = type === 'web' ? setWebSlide : type === 'app' ? setAppSlide : setWatchSlide;
        
        let newSlide = currentSlide + direction;
        if (newSlide < 0) newSlide = images.length - 1;
        if (newSlide >= images.length) newSlide = 0;
        setSlide(newSlide);
    };

    // Auto-rotación cada 5 segundos si el usuario no interactúa
    useEffect(() => {
        const intervals = [];
        
        if (!userInteracting.web) {
            intervals.push(setInterval(() => {
                setWebSlide(prev => (prev + 1) % webImages.length);
            }, 5000));
        }
        if (!userInteracting.app) {
            intervals.push(setInterval(() => {
                setAppSlide(prev => (prev + 1) % appImages.length);
            }, 5000));
        }
        if (!userInteracting.watch) {
            intervals.push(setInterval(() => {
                setWatchSlide(prev => (prev + 1) % watchImages.length);
            }, 5000));
        }

        return () => intervals.forEach(clearInterval);
    }, [userInteracting]);

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
                        <img src={logo} alt="Radioisòtop" />
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
                            <div className="demo-card-image carousel-container">
                                <div className="carousel-slides">
                                    {webImages.map((img, index) => (
                                        <div key={index} className={`carousel-slide ${index === webSlide ? 'active' : ''}`}>
                                            <img src={img} alt={`${t('demoWeb')} ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-btn carousel-prev" onClick={() => changeSlide('web', -1)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button className="carousel-btn carousel-next" onClick={() => changeSlide('web', 1)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <div className="carousel-dots">
                                    {webImages.map((_, index) => (
                                        <span 
                                            key={index} 
                                            className={`carousel-dot ${index === webSlide ? 'active' : ''}`}
                                            onClick={() => {
                                                setWebSlide(index);
                                                setUserInteracting(prev => ({ ...prev, web: true }));
                                            }}
                                        ></span>
                                    ))}
                                </div>
                            </div>
                            <div className="demo-card-content">
                                <h3>{t('demoWeb')}</h3>
                                <p>{t('demoWebDesc')}</p>
                            </div>
                        </div>
                        <div className="demo-card fade-in-element stagger-2">
                            <div className="demo-card-image carousel-container">
                                <div className="carousel-slides">
                                    {appImages.map((img, index) => (
                                        <div key={index} className={`carousel-slide ${index === appSlide ? 'active' : ''}`}>
                                            <img src={img} alt={`${t('demoApp')} ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-btn carousel-prev" onClick={() => changeSlide('app', -1)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button className="carousel-btn carousel-next" onClick={() => changeSlide('app', 1)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <div className="carousel-dots">
                                    {appImages.map((_, index) => (
                                        <span 
                                            key={index} 
                                            className={`carousel-dot ${index === appSlide ? 'active' : ''}`}
                                            onClick={() => {
                                                setAppSlide(index);
                                                setUserInteracting(prev => ({ ...prev, app: true }));
                                            }}
                                        ></span>
                                    ))}
                                </div>
                            </div>
                            <div className="demo-card-content">
                                <h3>{t('demoApp')}</h3>
                                <p>{t('demoAppDesc')}</p>
                            </div>
                        </div>
                        <div className="demo-card fade-in-element stagger-3">
                            <div className="demo-card-image carousel-container">
                                <div className="carousel-slides">
                                    {watchImages.map((img, index) => (
                                        <div key={index} className={`carousel-slide ${index === watchSlide ? 'active' : ''}`}>
                                            <img src={img} alt={`${t('demoSmartwatch')} ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-btn carousel-prev" onClick={() => changeSlide('watch', -1)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button className="carousel-btn carousel-next" onClick={() => changeSlide('watch', 1)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <div className="carousel-dots">
                                    {watchImages.map((_, index) => (
                                        <span 
                                            key={index} 
                                            className={`carousel-dot ${index === watchSlide ? 'active' : ''}`}
                                            onClick={() => {
                                                setWatchSlide(index);
                                                setUserInteracting(prev => ({ ...prev, watch: true }));
                                            }}
                                        ></span>
                                    ))}
                                </div>
                            </div>
                            <div className="demo-card-content">
                                <h3>{t('demoSmartwatch')}</h3>
                                <p>{t('demoSmartwatchDesc')}</p>
                            </div>
                        </div>
                    </div>
                </section>

            <section className="landing-collaborators">
                <div className="collaborators-container">
                    <div className="section-header fade-in-element">
                        <div className="section-badge">{t('colaboradores')}</div>
                        <h2 className="landing-section-title">{t('nuestrosColaboradores')}</h2>
                        <p className="section-description">
                            {t('colaboradoresDesc')}
                        </p>
                    </div>
                    <div className="collaborators-logos">
                        <div className="collaborator-logo fade-in-element stagger-1">
                            <img src={collaborator1} alt="Colaborador 1" />
                        </div>
                        <div className="collaborator-logo fade-in-element stagger-2">
                            <img src={collaborator2} alt="Colaborador 2" />
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
                <div className="cookies-banner-content">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <p>{t('cookiesMensaje')}</p>
                </div>
                <div className="cookies-banner-actions">
                    <button className="btn-cookies-accept" onClick={() => {
                        setCookie('cookiesAccepted', 'true', 365);
                        document.getElementById('cookies-banner').style.display = 'none';
                    }}>
                        {t('cookiesAceptar')}
                    </button>
                    <a href="/privacidad" className="btn-cookies-learn">{t('cookiesMasInfo')}</a>
                </div>
            </div>
        </div>
    );
}
