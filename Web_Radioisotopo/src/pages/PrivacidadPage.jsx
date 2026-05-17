/*
================================================================================
PROJECT:       [RADIOISOTOPO]
VERSION:       1.0.0
DESCRIPTION:   [Pagina para lectura de la privacidad de la pagina]
AUTHOR:        [Marcos, Wael]
UPDATED:       [23/04/2026]
================================================================================
*/

// IMPORTS
import { useTranslation } from '../hooks/useTranslation';
import '../styles/Privacidad.css';

// PAGE PRIVACIDAD
export function PrivacidadPage() {
    const { t } = useTranslation();

    return (
        <main className="privacidad-page">
            <div className="privacidad-container">
                <div className="privacidad-icono">
                    <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                </div>
                <h1>{t('privacidadTitulo')}</h1>
                <p className="privacidad-update">{t('privacidadActualizada')}</p>

                <section>
                    <h2>{t('privacidadResponsable')}</h2>
                    <p>{t('privacidadDatos')}</p>
                    <ul>
                        <li><strong>Radioisòtops</strong></li>
                        <li>Email: radioisotopo.portal@gmail.com</li>
                    </ul>
                </section>

                <section>
                    <h2>{t('privacidadRecopilacion')}</h2>
                    <p>{t('privacidadRecopilacionTexto')}</p>
                    <ul>
                        <li>{t('privacidadDatosCuenta')}</li>
                        <li>{t('privacidadDatosPaciente')}</li>
                        <li>{t('privacidadDatosLogs')}</li>
                    </ul>
                </section>

                <section>
                    <h2>{t('privacidadUso')}</h2>
                    <p>{t('privacidadUsoTexto')}</p>
                    <ul>
                        <li>{t('privacidadProporcionar')}</li>
                        <li>{t('privacidadCumplir')}</li>
                        <li>{t('privacidadMejorar')}</li>
                    </ul>
                </section>

                <section>
                    <h2>{t('privacidadCookies')}</h2>
                    <p>{t('privacidadCookiesTexto')}</p>
                    <ul>
                        <li><strong>{t('privacidadSesion')}:</strong> {t('privacidadSesion_desc')}</li>
                        <li><strong>{t('privacidadSeguridad')}:</strong> {t('privacidadSeguridad_desc')}</li>
                        <li>{t('privacidadNoAnaliticos')}</li>
                    </ul>
                </section>

                <section>
                    <h2>{t('privacidadDerechos')}</h2>
                    <p>{t('privacidadDerechosTexto')}</p>
                    <ul>
                        <li>{t('privacidadAcceso')}</li>
                        <li>{t('privacidadRectificacion')}</li>
                        <li>{t('privacidadSupresion')}</li>
                        <li>{t('privacidadPortabilidad')}</li>
                    </ul>
                </section>

                <section id="terminos">
                    <h2>{t('termesServei')}</h2>
                    <p>{t('terminosTexto')}</p>
                    <ul>
                        <li><strong>{t('terminosAceptacion')}</strong> {t('terminosAceptacionTxt')}</li>
                        <li><strong>{t('terminosUso')}</strong> {t('terminosUsoTxt')}</li>
                        <li><strong>{t('terminosLimitacion')}</strong> {t('terminosLimitacionTxt')}</li>
                        <li><strong>{t('terminosCambios')}</strong> {t('terminosCambiosTxt')}</li>
                    </ul>
                </section>

                <section>
                    <h2>{t('privacidadContacto')}</h2>
                    <p>{t('privacidadContactoTexto')}</p>
                    <a href="mailto:radioisotopo.portal@gmail.com">radioisotopo.portal@gmail.com</a>
                </section>

                <div className="privacidad-volver">
                    <a href="/">← {t('volverInicio')}</a>
                </div>
            </div>
        </main>
    );
}