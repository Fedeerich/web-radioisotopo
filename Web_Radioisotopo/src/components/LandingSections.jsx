import imgMedicos from '../assets/images/medicos.webp';
import imgMedicos2 from '../assets/images/medicos2.webp';
import { ShieldIcon, ChartIcon, ArrowIcon, UsersIcon, BellIcon, DocumentIcon, LockIcon, CheckIcon } from '../constants/iconosLanding';

export function LandingHero({ t }) {
    return (
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
    );
}

export function LandingFeatures({ t }) {
    return (
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
    );
}

export function LandingStats({ t }) {
    return (
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
    );
}

export function LandingCTA({ t }) {
    return (
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
    );
}

export function LandingShowcase({ t }) {
    return (
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
                        <img src={imgMedicos2} alt="Dashboard del sistema" />
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
    );
}
