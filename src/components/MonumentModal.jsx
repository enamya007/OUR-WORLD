import React, { useEffect } from 'react';
import './MonumentModal.css';

const MonumentModal = ({ monument, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!monument) return null;

  const continentLabel = {
    africa: 'Afrique',
    europe: 'Europe',
    america: 'Amériques',
    asia: 'Asie',
    oceania: 'Océanie',
  }[monument.continent] || monument.continent;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Fermer">
          <span>✕</span>
        </button>

        {/* Header stripe */}
        <div className="modal-header-stripe" />

        {/* Image section */}
        <div className="modal-image-wrapper">
          <img
            src={`/images/${monument.image}`}
            alt={monument.name}
            className="modal-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="modal-image-overlay" />
          <div className="modal-image-caption">
            <span className="modal-continent">{continentLabel}</span>
            <span className="modal-country">{monument.country} — {monument.city}</span>
          </div>
        </div>

        {/* Content */}
        <div className="modal-content">
          <div className="modal-year-badge">
            <span className="modal-year-label">Fondé en</span>
            <span className="modal-year-value">{monument.year}</span>
          </div>

          <h2 className="modal-title">{monument.name}</h2>

          <div className="modal-divider">
            <span className="modal-divider-line" />
            <span className="modal-divider-ornament">◆</span>
            <span className="modal-divider-line" />
          </div>

          <div className="modal-description">
            {monument.description.split('. ').map((sentence, i) => (
              <span key={i} className="modal-sentence">
                {sentence}{i < monument.description.split('. ').length - 1 ? '. ' : ''}
              </span>
            ))}
          </div>

          <div className="modal-meta">
            <div className="modal-meta-item">
              <span className="modal-meta-label">Pays</span>
              <span className="modal-meta-value">{monument.country}</span>
            </div>
            <div className="modal-meta-item">
              <span className="modal-meta-label">Ville</span>
              <span className="modal-meta-value">{monument.city}</span>
            </div>
            <div className="modal-meta-item">
              <span className="modal-meta-label">Continent</span>
              <span className="modal-meta-value">{continentLabel}</span>
            </div>
            <div className="modal-meta-item">
              <span className="modal-meta-label">Année</span>
              <span className="modal-meta-value">{monument.year}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="modal-btn-close" onClick={onClose}>
            Retour au globe
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonumentModal;