export function DemoCarousel({ images, slideIndex, t, onChangeSlide, onDotClick, onOpenLightbox, type }) {
    const altPrefix = type === 'web' ? t('demoWeb') : type === 'app' ? t('demoApp') : t('demoSmartwatch');
    const dotPrefix = type + '-dot-';
    return (
        <div className="demo-card-image carousel-container" onClick={onOpenLightbox} role="button" tabIndex={0} aria-label={altPrefix} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onOpenLightbox(); }}>
            <div className="carousel-slides">
                {images.map((img, index) => (
                    <div key={img} className={`carousel-slide ${index === slideIndex ? 'active' : ''}`}>
                        <img src={img} alt={`${altPrefix} ${index + 1}`} style={{width: '90%', height: 'auto', display: 'block', margin: '0 auto'}} />
                    </div>
                ))}
            </div>
            <button className="carousel-btn carousel-prev" onClick={(e) => { e.stopPropagation(); onChangeSlide(-1); }} aria-label="Anterior">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button className="carousel-btn carousel-next" onClick={(e) => { e.stopPropagation(); onChangeSlide(1); }} aria-label="Siguiente">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <div className="carousel-dots">
                {images.map((_, index) => (
                    <span
                        key={dotPrefix + index}
                        className={`carousel-dot ${index === slideIndex ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); onDotClick(index); }}
                        role="button" tabIndex={0}
                        aria-label={`${altPrefix} ${index + 1}`}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onDotClick(index); } }}
                    ></span>
                ))}
            </div>
        </div>
    );
}
