import React, { useEffect, useState, useRef, useReducer } from 'react';
import '../styles/Landing.css';
import logo from '../assets/logo.webp';
import imgInicioWeb from '../assets/images-demo/inicio-web.webp';
import imgAltaPacientesWeb from '../assets/images-demo/alta-pacientes-web.webp';
import imgAltaMedicoWeb from '../assets/images-demo/alta-medico-web.webp';
import imgPacientesWeb from '../assets/images-demo/pacientes-web.webp';
import imgAuditoriaWeb from '../assets/images-demo/auditoria-web.webp';
import imgConfigWeb from '../assets/images-demo/config-web.webp';
import imgPhone1 from '../assets/images-demo/phone1-app.webp';
import imgPhone2 from '../assets/images-demo/phone2-app.webp';
import imgPhone3 from '../assets/images-demo/phone3-app.webp';
import imgSmartwatchOne from '../assets/images-demo/one-smartwatch.webp';
import imgSmartwatchSecond from '../assets/images-demo/second-smartwatch.webp';
import imgSmartwatchThird from '../assets/images-demo/third-smartwatch.webp';
import imgSmartwatchFourth from '../assets/images-demo/fourth-smartwatch.webp';
import imgSmartwatchFifht from '../assets/images-demo/fifht-smartwatch.webp';
import collaborator1 from '../assets/collaborators/collaborator1.webp';
import collaborator2 from '../assets/collaborators/collaborator2.webp';
import { useTranslation } from '../hooks/useTranslation';
import { getCookie, setCookie } from '../utils/cookies';
import { DemoCarousel } from '../components/DemoCarousel';
import { LightboxModal } from '../components/LightboxModal';
import { LandingHero, LandingFeatures, LandingShowcase, LandingStats, LandingCTA } from '../components/LandingSections';

const images = {
    web: [imgInicioWeb, imgAltaPacientesWeb, imgAltaMedicoWeb, imgPacientesWeb, imgAuditoriaWeb, imgConfigWeb],
    app: [imgPhone1, imgPhone2, imgPhone3],
    watch: [imgSmartwatchOne, imgSmartwatchSecond, imgSmartwatchThird, imgSmartwatchFourth, imgSmartwatchFifht],
};

const initialState = {
    webSlide: 0,
    appSlide: 0,
    watchSlide: 0,
    lightboxOpen: false,
    lightboxImages: [],
    lightboxIndex: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_SLIDE':
            return { ...state, [`${action.carousel}Slide`]: action.index };
        case 'CHANGE_SLIDE': {
            const slideKey = `${action.carousel}Slide`;
            const imgs = images[action.carousel];
            let next = state[slideKey] + action.direction;
            if (next < 0) next = imgs.length - 1;
            if (next >= imgs.length) next = 0;
            return { ...state, [slideKey]: next };
        }
        case 'OPEN_LIGHTBOX': {
            const imgs = images[action.carousel];
            const slideKey = `${action.carousel}Slide`;
            return { ...state, lightboxOpen: true, lightboxImages: imgs, lightboxIndex: state[slideKey] };
        }
        case 'CLOSE_LIGHTBOX':
            return { ...state, lightboxOpen: false, lightboxImages: [], lightboxIndex: 0 };
        case 'NAVIGATE_LIGHTBOX': {
            let next = state.lightboxIndex + action.direction;
            if (next < 0) next = state.lightboxImages.length - 1;
            if (next >= state.lightboxImages.length) next = 0;
            return { ...state, lightboxIndex: next };
        }
        case 'ROTATE_ALL': {
            const { web, app, watch } = action.interacting;
            return {
                ...state,
                webSlide: web ? state.webSlide : (state.webSlide + 1) % images.web.length,
                appSlide: app ? state.appSlide : (state.appSlide + 1) % images.app.length,
                watchSlide: watch ? state.watchSlide : (state.watchSlide + 1) % images.watch.length,
            };
        }
        default:
            return state;
    }
}

export function LandingPage() {
    const [scrolled, setScrolled] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);
    const { t, idioma, changeLanguage } = useTranslation();

    const [state, dispatch] = useReducer(reducer, initialState);
    const userInteractingRef = useRef({ web: false, app: false, watch: false });
    const [, setInteractionTrigger] = useState(0);

    const openLightbox = (carousel) => {
        dispatch({ type: 'OPEN_LIGHTBOX', carousel });
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        dispatch({ type: 'CLOSE_LIGHTBOX' });
        document.body.style.overflow = '';
    };

    const navigateLightbox = (direction) => {
        dispatch({ type: 'NAVIGATE_LIGHTBOX', direction });
    };

    const changeSlide = (carousel, direction) => {
        userInteractingRef.current = { ...userInteractingRef.current, [carousel]: true };
        setInteractionTrigger(n => n + 1);
        dispatch({ type: 'CHANGE_SLIDE', carousel, direction });
    };

    const handleDotClick = (carousel, index) => {
        userInteractingRef.current = { ...userInteractingRef.current, [carousel]: true };
        setInteractionTrigger(n => n + 1);
        dispatch({ type: 'SET_SLIDE', carousel, index });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({ type: 'ROTATE_ALL', interacting: userInteractingRef.current });
        }, 5000);
        return () => clearInterval(interval);
    }, [setInteractionTrigger]);

    useEffect(() => {
        document.body.classList.remove('dark-mode');
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
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
        <main id="top" className="landing-wrapper">
            <header className={`landing-header ${scrolled ? 'scrolled' : ''}`}>
                <a href="#top" className="landing-logo">
                    <div className="landing-logo-icon">
                            <img src={logo} alt="Radioisòtop" width="80" height="80" />
                    </div>
                    <span>{t('radioisotopos')}</span>
                </a>
                <nav className="landing-nav">
                    <a href="#demo">{t('demo')}</a>
                    <a href="#caracteristiques">{t('caracteristiques')}</a>
                    <a href="#contacte">{t('contacte')}</a>
                </nav>
                <div className="header-actions">
                    <div className="language-selector">
                        <button 
                            className="language-btn" 
                            onClick={() => setShowLangMenu(!showLangMenu)}
                        >
                            {idioma === 'Catala' ? 'CAT' : idioma === 'English' ? 'EN' : 'ES'}
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
                        </button>
                        {showLangMenu && (
                            <div className="language-dropdown">
                                <button onClick={() => { changeLanguage('Castellano'); setShowLangMenu(false); }}>
                                    <span className="flag flag-spain"></span>
                                    Español
                                </button>
                                <button onClick={() => { changeLanguage('Catala'); setShowLangMenu(false); }}>
                                    <span className="flag flag-catalonia"></span>
                                    Català
                                </button>
                                <button onClick={() => { changeLanguage('English'); setShowLangMenu(false); }}>
                                    <span className="flag flag-uk"></span>
                                    English
                                </button>
                            </div>
                        )}
                    </div>
                    <a href="/login-page" className="btn-login-header" aria-label={t('iniciarSesion')}>
                        <svg className="login-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                            <polyline points="10 17 15 12 10 7"/>
                            <line x1="15" y1="12" x2="3" y2="12"/>
                        </svg>
                        <span className="login-text">{t('iniciarSesion')}</span>
                    </a>
                </div>
            </header>

            <LandingHero t={t} />

            <LandingStats t={t} />

            <LandingFeatures t={t} />

            <LandingShowcase t={t} />

            <LandingCTA t={t} />

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
                            <DemoCarousel
                                images={images.web}
                                slideIndex={state.webSlide}
                                t={t}
                                onChangeSlide={(dir) => changeSlide('web', dir)}
                                onDotClick={(index) => handleDotClick('web', index)}
                                onOpenLightbox={() => openLightbox('web')}
                                type="web"
                            />
                            <div className="demo-card-content">
                                <h3>{t('demoWeb')}</h3>
                                <p>{t('demoWebDesc')}</p>
                            </div>
                        </div>
                        <div className="demo-card fade-in-element stagger-2">
                            <DemoCarousel
                                images={images.app}
                                slideIndex={state.appSlide}
                                t={t}
                                onChangeSlide={(dir) => changeSlide('app', dir)}
                                onDotClick={(index) => handleDotClick('app', index)}
                                onOpenLightbox={() => openLightbox('app')}
                                type="app"
                            />
                            <div className="demo-card-content">
                                <h3>{t('demoApp')}</h3>
                                <p>{t('demoAppDesc')}</p>
                            </div>
                        </div>
                        <div className="demo-card fade-in-element stagger-3">
                            <DemoCarousel
                                images={images.watch}
                                slideIndex={state.watchSlide}
                                t={t}
                                onChangeSlide={(dir) => changeSlide('watch', dir)}
                                onDotClick={(index) => handleDotClick('watch', index)}
                                onOpenLightbox={() => openLightbox('watch')}
                                type="watch"
                            />
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
                            <img src={collaborator1} alt="Colaborador 1" width="320" height="154" />
                        </div>
                        <div className="collaborator-logo fade-in-element stagger-2">
                            <img src={collaborator2} alt="Colaborador 2" width="320" height="124" />
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
            <LightboxModal
                open={state.lightboxOpen}
                images={state.lightboxImages}
                currentIndex={state.lightboxIndex}
                onClose={closeLightbox}
                onNavigate={navigateLightbox}
            />
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
        </main>
    );
}
