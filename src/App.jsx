import React, { useState } from 'react';
import Globe from './components/Globe';
import MonumentModal from './components/MonumentModal';
import { monuments } from './data/monuments';
import './App.css';

function App() {
  const [selectedMonument, setSelectedMonument] = useState(null);

  return (
    <div className="app">
      {/* Alias — top left */}
      <div className="alias alias-top-left">enamya007</div>

      {/* Alias — bottom right */}
      <div className="alias alias-bottom-right">enamya007</div>

      {/* Header */}
      <header className="app-header">
        <div className="header-ornament header-ornament-left">
          <span className="ornament-line" />
          <span className="ornament-dot" />
        </div>

        <div className="header-center">
          <p className="header-tagline">— Monuments & Merveilles —</p>
          <h1 className="header-title">
            <span className="shimmer-text">OUR WORLD ?</span>
          </h1>
          <p className="header-subtitle">
            Explorez les monuments emblématiques de notre planète
          </p>
        </div>

        <div className="header-ornament header-ornament-right">
          <span className="ornament-dot" />
          <span className="ornament-line" />
        </div>
      </header>

      {/* Main content */}
      <main className="app-main">
        <div className="globe-wrapper">
          <Globe onSelectMonument={setSelectedMonument} />
        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item">
            <span className="legend-dot legend-dot-africa" />
            <span>Afrique</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot legend-dot-europe" />
            <span>Europe</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot legend-dot-america" />
            <span>Amériques</span>
          </div>
        </div>

        {/* Monument list */}
        <section className="monuments-grid">
          <h2 className="section-title">
            <span className="section-title-line" />
            <span>Monuments du Monde</span>
            <span className="section-title-line" />
          </h2>

          <MonumentsList onSelect={setSelectedMonument} />
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-divider" />
        <p className="footer-text">
          OUR WORLD ? &nbsp;·&nbsp; Exploration des Monuments Mondiaux
        </p>
        <p className="footer-sub">Survolez les marqueurs dorés sur le globe pour découvrir</p>
      </footer>

      {/* Modal */}
      {selectedMonument && (
        <MonumentModal
          monument={selectedMonument}
          onClose={() => setSelectedMonument(null)}
        />
      )}
    </div>
  );
}

/* ——— Monuments list sub-component ——— */
function MonumentsList({ onSelect }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="monuments-grid-inner">
      {monuments.map((m, i) => (
        <div
          key={m.id}
          className={`monument-card ${hoveredId === m.id ? 'monument-card--hovered' : ''}`}
          style={{ animationDelay: `${i * 0.06}s` }}
          onClick={() => onSelect(m)}
          onMouseEnter={() => setHoveredId(m.id)}
          onMouseLeave={() => setHoveredId(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelect(m)}
          aria-label={`Voir ${m.name}`}
        >
          <div className="card-image-wrapper">
            <img
              src={`/images/${m.image}`}
              alt={m.name}
              className="card-image"
              loading="lazy"
              onError={(e) => {
                e.target.style.opacity = '0';
              }}
            />
            <div className="card-image-gradient" />
          </div>

          <div className="card-body">
            <div className="card-meta-top">
              <span className="card-country">{m.country}</span>
              <span className="card-year">{m.year}</span>
            </div>
            <h3 className="card-title">{m.name}</h3>
            <p className="card-city">{m.city}</p>
          </div>

          <div className="card-hover-indicator">
            <span>Explorer</span>
            <span className="card-arrow">→</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;