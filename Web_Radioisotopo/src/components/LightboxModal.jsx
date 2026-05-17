export function LightboxModal({ open, images: lbImages, currentIndex, onClose, onNavigate }) {
    if (!open) return null;
    return (
        <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true" onKeyDown={e => { if (e.key === 'Escape') onClose(); }}>
            <div className="lightbox-content" onClick={e => e.stopPropagation()} role="presentation" onKeyDown={e => e.stopPropagation()}>
                <button className="lightbox-close" onClick={onClose} aria-label="Cerrar">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18"/>
                        <path d="M6 6l12 12"/>
                    </svg>
                </button>
                <button className="lightbox-nav lightbox-prev" onClick={() => onNavigate(-1)} aria-label="Anterior">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <img src={lbImages[currentIndex]} alt={`Imagen ${currentIndex + 1}`} />
                <button className="lightbox-nav lightbox-next" onClick={() => onNavigate(1)} aria-label="Siguiente">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
                <div className="lightbox-counter">{currentIndex + 1} / {lbImages.length}</div>
            </div>
        </div>
    );
}
