import React, { useState, useRef, useCallback } from 'react';
import { monuments } from '../data/monuments';
import './Globe.css';

const Globe = ({ onSelectMonument }) => {
  const [hoveredMonument, setHoveredMonument] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e, monument) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredMonument(monument);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredMonument(null);
  }, []);

  return (
    <div className="globe-scene" ref={containerRef}>
      {/* Main SVG — African figure holding the Earth */}
      <svg
        className="atlas-svg"
        viewBox="0 0 600 700"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Earth gradient */}
          <radialGradient id="earthGrad" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#3a7bd5" />
            <stop offset="30%" stopColor="#1a5fa8" />
            <stop offset="70%" stopColor="#0d3d6e" />
            <stop offset="100%" stopColor="#061e38" />
          </radialGradient>

          {/* Land mass color */}
          <radialGradient id="landGrad" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#5a9e3a" />
            <stop offset="60%" stopColor="#2d6e1a" />
            <stop offset="100%" stopColor="#1a4a0a" />
          </radialGradient>

          {/* Atmosphere glow */}
          <radialGradient id="atmosphereGrad" cx="45%" cy="35%" r="55%">
            <stop offset="70%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(100,160,255,0.35)" />
          </radialGradient>

          {/* Skin tone gradient for figure */}
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a2800" />
            <stop offset="40%" stopColor="#3d1f00" />
            <stop offset="100%" stopColor="#2a1200" />
          </linearGradient>

          {/* Muscle highlight */}
          <radialGradient id="muscleHighlight" cx="30%" cy="25%" r="70%">
            <stop offset="0%" stopColor="rgba(120,60,0,0.8)" />
            <stop offset="100%" stopColor="rgba(40,15,0,0)" />
          </radialGradient>

          {/* Gold accent gradient */}
          <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9a227" />
            <stop offset="50%" stopColor="#f0d060" />
            <stop offset="100%" stopColor="#a07820" />
          </linearGradient>

          {/* Globe shadow */}
          <radialGradient id="globeShadow" cx="60%" cy="60%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,20,0.6)" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft shadow */}
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(0,0,0,0.7)" />
          </filter>

          {/* Earth clip circle */}
          <clipPath id="earthClip">
            <circle cx="300" cy="195" r="155" />
          </clipPath>

          {/* Monument marker pulse */}
          <filter id="markerGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ===================== */}
        {/*   AFRICAN FIGURE      */}
        {/* ===================== */}

        {/* Base platform / rock */}
        <ellipse cx="300" cy="680" rx="130" ry="22" fill="rgba(20,12,5,0.7)" />
        <path
          d="M200 670 Q225 640 250 650 Q275 635 300 645 Q325 635 350 650 Q375 640 400 670 Q380 690 300 695 Q220 690 200 670Z"
          fill="url(#skinGrad)"
          opacity="0.4"
        />

        {/* LEGS */}
        {/* Left leg */}
        <path
          d="M265 580 Q258 610 255 640 Q252 660 258 675 Q265 680 275 675 Q285 670 283 655 Q280 635 282 610 Q282 592 278 580Z"
          fill="url(#skinGrad)"
          filter="url(#softShadow)"
        />
        {/* Left leg highlight */}
        <path
          d="M268 585 Q263 615 262 640 Q261 655 264 665 Q268 665 270 655 Q270 635 272 610Z"
          fill="rgba(120,60,0,0.3)"
        />
        {/* Left knee cap */}
        <ellipse cx="268" cy="620" rx="12" ry="9" fill="rgba(80,35,0,0.5)" />

        {/* Right leg */}
        <path
          d="M335 580 Q342 610 345 640 Q348 660 342 675 Q335 680 325 675 Q315 670 317 655 Q320 635 318 610 Q318 592 322 580Z"
          fill="url(#skinGrad)"
          filter="url(#softShadow)"
        />
        {/* Right leg highlight */}
        <path
          d="M332 585 Q337 615 338 640 Q339 655 336 665 Q332 665 330 655 Q330 635 328 610Z"
          fill="rgba(120,60,0,0.3)"
        />
        {/* Right knee cap */}
        <ellipse cx="332" cy="620" rx="12" ry="9" fill="rgba(80,35,0,0.5)" />

        {/* Feet */}
        <path d="M252 673 Q244 678 240 682 Q248 688 262 686 Q272 682 278 675 Q268 672 252 673Z" fill="url(#skinGrad)" />
        <path d="M348 673 Q356 678 360 682 Q352 688 338 686 Q328 682 322 675 Q332 672 348 673Z" fill="url(#skinGrad)" />

        {/* TORSO */}
        <path
          d="M250 560 Q245 545 248 520 Q250 495 260 480 Q275 465 300 462 Q325 465 340 480 Q350 495 352 520 Q355 545 350 560 Q340 575 300 580 Q260 575 250 560Z"
          fill="url(#skinGrad)"
          filter="url(#softShadow)"
        />
        {/* Muscle definition — abs */}
        <path d="M288 495 Q300 490 312 495 L312 510 Q300 505 288 510Z" fill="rgba(30,10,0,0.25)" />
        <path d="M288 515 Q300 510 312 515 L312 530 Q300 525 288 530Z" fill="rgba(30,10,0,0.25)" />
        <path d="M288 535 Q300 530 312 535 L312 550 Q300 545 288 550Z" fill="rgba(30,10,0,0.25)" />
        {/* Central line */}
        <path d="M300 472 Q300 560" stroke="rgba(20,5,0,0.3)" strokeWidth="1.5" fill="none" />
        {/* Pec muscles */}
        <path d="M265 472 Q285 467 300 468 Q295 475 280 480 Q268 480 265 472Z" fill="rgba(80,35,0,0.4)" />
        <path d="M335 472 Q315 467 300 468 Q305 475 320 480 Q332 480 335 472Z" fill="rgba(80,35,0,0.4)" />
        {/* Torso highlight */}
        <path d="M290 465 Q305 460 315 468 Q305 470 295 468Z" fill="rgba(160,80,0,0.3)" />

        {/* NECK */}
        <path d="M285 463 Q290 448 300 445 Q310 448 315 463 Q305 466 300 466 Q295 466 285 463Z" fill="url(#skinGrad)" />

        {/* HEAD */}
        <ellipse cx="300" cy="428" rx="38" ry="42" fill="url(#skinGrad)" filter="url(#softShadow)" />
        {/* Hair / head top */}
        <path d="M268 415 Q275 390 300 385 Q325 390 332 415 Q318 405 300 403 Q282 405 268 415Z" fill="rgba(10,5,0,0.9)" />
        {/* Face features */}
        {/* Brow ridge */}
        <path d="M282 420 Q292 416 300 417 Q308 416 318 420" stroke="rgba(10,5,0,0.5)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Eyes */}
        <ellipse cx="289" cy="425" rx="5" ry="4" fill="rgba(5,2,0,0.85)" />
        <ellipse cx="311" cy="425" rx="5" ry="4" fill="rgba(5,2,0,0.85)" />
        {/* Eye whites */}
        <ellipse cx="288" cy="424" rx="2" ry="1.5" fill="rgba(255,240,210,0.7)" />
        <ellipse cx="310" cy="424" rx="2" ry="1.5" fill="rgba(255,240,210,0.7)" />
        {/* Nose */}
        <path d="M297 428 Q298 436 300 438 Q302 436 303 428" stroke="rgba(20,8,0,0.5)" strokeWidth="1.5" fill="none" />
        <path d="M294 438 Q300 442 306 438" stroke="rgba(20,8,0,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Lips */}
        <path d="M291 445 Q296 442 300 443 Q304 442 309 445 Q305 450 300 451 Q295 450 291 445Z" fill="rgba(60,20,10,0.7)" />
        {/* Jaw */}
        <path d="M268 430 Q265 445 268 458 Q278 468 300 470 Q322 468 332 458 Q335 445 332 430" stroke="rgba(30,12,0,0.2)" strokeWidth="1" fill="none" />
        {/* Cheekbones */}
        <path d="M265 430 Q272 425 280 428" stroke="rgba(80,35,0,0.2)" strokeWidth="1" fill="none" />
        <path d="M335 430 Q328 425 320 428" stroke="rgba(80,35,0,0.2)" strokeWidth="1" fill="none" />

        {/* SHOULDERS & ARMS — raised high holding globe */}
        {/* Left shoulder */}
        <path d="M250 478 Q230 468 215 455 Q205 445 205 430 Q210 420 220 422 Q228 440 240 452 Q255 463 260 472Z" fill="url(#skinGrad)" />
        {/* Left upper arm */}
        <path d="M215 425 Q200 400 192 370 Q188 350 195 335 Q205 325 218 330 Q225 355 228 380 Q230 405 228 425Z" fill="url(#skinGrad)" />
        {/* Left forearm */}
        <path d="M205 330 Q198 305 196 275 Q194 255 198 240 Q205 232 215 235 Q222 250 224 270 Q226 295 222 325Z" fill="url(#skinGrad)" />
        {/* Left hand */}
        <path d="M198 238 Q194 225 195 215 Q200 208 208 210 Q215 218 218 230 Q218 240 212 242Z" fill="url(#skinGrad)" />

        {/* Right shoulder */}
        <path d="M350 478 Q370 468 385 455 Q395 445 395 430 Q390 420 380 422 Q372 440 360 452 Q345 463 340 472Z" fill="url(#skinGrad)" />
        {/* Right upper arm */}
        <path d="M385 425 Q400 400 408 370 Q412 350 405 335 Q395 325 382 330 Q375 355 372 380 Q370 405 372 425Z" fill="url(#skinGrad)" />
        {/* Right forearm */}
        <path d="M395 330 Q402 305 404 275 Q406 255 402 240 Q395 232 385 235 Q378 250 376 270 Q374 295 378 325Z" fill="url(#skinGrad)" />
        {/* Right hand */}
        <path d="M402 238 Q406 225 405 215 Q400 208 392 210 Q385 218 382 230 Q382 240 388 242Z" fill="url(#skinGrad)" />

        {/* Arm muscles highlights */}
        <path d="M217 385 Q210 365 207 345" stroke="rgba(120,60,0,0.25)" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M383 385 Q390 365 393 345" stroke="rgba(120,60,0,0.25)" strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* Bicep bulge left */}
        <ellipse cx="218" cy="378" rx="12" ry="18" fill="rgba(80,35,0,0.3)" transform="rotate(-15, 218, 378)" />
        {/* Bicep bulge right */}
        <ellipse cx="382" cy="378" rx="12" ry="18" fill="rgba(80,35,0,0.3)" transform="rotate(15, 382, 378)" />

        {/* Decorative bracelet / gold bands */}
        <rect x="193" y="270" width="28" height="8" rx="4" fill="url(#goldAccent)" opacity="0.9" />
        <rect x="379" y="270" width="28" height="8" rx="4" fill="url(#goldAccent)" opacity="0.9" />

        {/* Loin cloth / fabric */}
        <path d="M250 562 Q265 590 280 595 Q300 600 320 595 Q335 590 350 562 Q330 572 300 575 Q270 572 250 562Z" fill="rgba(80,50,10,0.8)" />
        {/* Fabric folds */}
        <path d="M265 568 Q270 585 275 592" stroke="rgba(40,25,5,0.5)" strokeWidth="1.5" fill="none" />
        <path d="M300 570 Q300 588 300 595" stroke="rgba(40,25,5,0.5)" strokeWidth="1.5" fill="none" />
        <path d="M335 568 Q330 585 325 592" stroke="rgba(40,25,5,0.5)" strokeWidth="1.5" fill="none" />
        {/* Gold belt */}
        <path d="M255 562 Q300 567 345 562 Q345 556 300 553 Q255 556 255 562Z" fill="url(#goldAccent)" opacity="0.85" />

        {/* ===================== */}
        {/*     THE EARTH GLOBE   */}
        {/* ===================== */}

        {/* Globe outer atmosphere glow */}
        <circle cx="300" cy="195" r="168" fill="none" stroke="rgba(80,140,255,0.12)" strokeWidth="16" />
        <circle cx="300" cy="195" r="162" fill="none" stroke="rgba(80,140,255,0.08)" strokeWidth="8" />

        {/* Earth base */}
        <circle cx="300" cy="195" r="155" fill="url(#earthGrad)" filter="url(#softShadow)" />

        {/* Ocean texture */}
        <circle cx="300" cy="195" r="155" fill="none" stroke="rgba(80,140,220,0.1)" strokeWidth="1" clipPath="url(#earthClip)" />

        {/* === CONTINENTS (simplified SVG paths) === */}
        <g clipPath="url(#earthClip)" fill="url(#landGrad)">

          {/* EUROPE */}
          <path d="M290 115 Q302 108 315 110 Q325 112 330 118 Q335 122 330 128 Q325 132 318 130 Q310 135 305 140 Q298 138 292 133 Q285 127 290 115Z" opacity="0.9" />

          {/* SCANDINAVIA */}
          <path d="M295 100 Q300 90 305 88 Q310 90 312 98 Q308 105 302 107 Q296 105 295 100Z" opacity="0.85" />
          <path d="M305 92 Q308 82 312 80 Q316 83 315 90 Q311 96 307 95Z" opacity="0.8" />

          {/* AFRICA — large continent, centered */}
          <path d="M285 145 Q292 140 308 140 Q322 142 330 148 Q338 160 340 175 Q342 195 340 212 Q338 228 335 240 Q330 255 322 262 Q313 268 305 270 Q297 268 290 262 Q282 255 278 240 Q274 228 272 212 Q270 195 272 175 Q274 160 285 145Z" opacity="0.92" />
          {/* Horn of Africa */}
          <path d="M340 195 Q350 192 355 200 Q352 210 345 212 Q338 210 340 195Z" opacity="0.85" />
          {/* Madagascar */}
          <path d="M348 225 Q352 218 356 222 Q357 232 353 238 Q349 238 348 230Z" opacity="0.8" />

          {/* SOUTH AMERICA */}
          <path d="M218 155 Q228 148 240 150 Q250 155 252 165 Q254 180 252 200 Q250 218 245 235 Q238 250 228 258 Q220 260 215 255 Q208 248 208 235 Q206 215 208 195 Q210 175 218 155Z" opacity="0.9" />
          {/* Brazil bump */}
          <path d="M252 170 Q262 165 268 172 Q266 182 257 185 Q252 182 252 170Z" opacity="0.85" />

          {/* NORTH AMERICA */}
          <path d="M165 120 Q178 110 195 112 Q210 115 215 125 Q218 138 215 148 Q210 155 200 158 Q188 158 180 152 Q170 145 165 132 Q163 126 165 120Z" opacity="0.88" />
          {/* Canada top */}
          <path d="M172 108 Q182 98 195 98 Q208 100 210 108 Q205 115 195 115 Q183 113 172 108Z" opacity="0.8" />

          {/* ASIA — large */}
          <path d="M332 118 Q348 112 365 115 Q385 120 395 130 Q405 140 405 155 Q405 170 398 180 Q390 188 378 190 Q362 190 350 185 Q338 178 332 168 Q326 155 328 140 Q328 128 332 118Z" opacity="0.9" />
          {/* Indian subcontinent */}
          <path d="M360 188 Q370 185 378 192 Q382 202 378 215 Q372 222 364 220 Q357 215 358 205 Q358 195 360 188Z" opacity="0.88" />
          {/* Southeast Asia */}
          <path d="M395 178 Q405 172 412 178 Q415 188 410 195 Q403 198 397 192 Q395 185 395 178Z" opacity="0.82" />

          {/* AUSTRALIA */}
          <path d="M390 230 Q402 224 415 228 Q425 234 425 245 Q424 256 415 262 Q405 265 396 260 Q388 253 388 243 Q388 236 390 230Z" opacity="0.88" />

          {/* GREENLAND */}
          <path d="M228 88 Q238 80 248 82 Q256 86 255 96 Q250 104 241 105 Q232 103 228 96 Q226 91 228 88Z" opacity="0.8" />

          {/* JAPAN */}
          <path d="M408 148 Q413 143 418 146 Q420 152 416 157 Q412 158 408 154Z" opacity="0.8" />

          {/* UK */}
          <path d="M282 118 Q286 112 290 114 Q292 120 288 125 Q284 124 282 118Z" opacity="0.8" />

          {/* ICE CAPS */}
          <path d="M155 150 Q175 155 195 155 Q215 155 235 150 Q240 145 240 140 Q230 130 210 128 Q195 127 180 130 Q162 135 155 142 Q153 146 155 150Z" fill="rgba(200,230,255,0.5)" opacity="0.7" />
          <path d="M230 248 Q250 252 270 255 Q270 262 260 268 Q248 272 235 270 Q220 266 215 258 Q218 252 230 248Z" fill="rgba(200,230,255,0.5)" opacity="0.6" />
        </g>

        {/* Globe shadow overlay */}
        <circle cx="300" cy="195" r="155" fill="url(#globeShadow)" clipPath="url(#earthClip)" />

        {/* Atmosphere highlight */}
        <ellipse cx="265" cy="155" rx="55" ry="45" fill="rgba(180,210,255,0.07)" clipPath="url(#earthClip)" />

        {/* Globe edge gleam */}
        <path
          d="M175 145 Q155 175 158 210 Q162 245 182 270"
          stroke="rgba(180,220,255,0.2)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          clipPath="url(#earthClip)"
        />

        {/* Orbit ring around globe */}
        <ellipse
          cx="300"
          cy="195"
          rx="178"
          ry="28"
          fill="none"
          stroke="url(#goldAccent)"
          strokeWidth="1.5"
          strokeDasharray="8 5"
          opacity="0.35"
        />

        {/* ===================== */}
        {/*  MONUMENT MARKERS     */}
        {/* ===================== */}
        {monuments.map((m) => {
          // Map globeX/Y (0-100) to actual SVG coords within the globe circle
          // Globe center: 300, 195. Globe radius: 155
          const angle = ((m.globeX - 50) / 50) * 0.85; // longitude-ish
          const vAngle = ((m.globeY - 50) / 50) * 0.85; // latitude-ish
          const mx = 300 + Math.sin(angle) * 145;
          const my = 195 + Math.sin(vAngle) * 100 - Math.abs(Math.sin(angle)) * 30;

          const isHovered = hoveredMonument?.id === m.id;

          return (
            <g
              key={m.id}
              transform={`translate(${mx}, ${my})`}
              className="monument-marker"
              onMouseMove={(e) => handleMouseMove(e, m)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onSelectMonument(m)}
              style={{ cursor: 'pointer' }}
            >
              {/* Pulse ring */}
              <circle
                r={isHovered ? 12 : 8}
                fill="none"
                stroke="rgba(201,162,39,0.4)"
                strokeWidth="1"
                className="marker-ring"
              />
              {/* Marker dot */}
              <circle
                r={isHovered ? 5 : 3.5}
                fill={isHovered ? '#f0d060' : '#c9a227'}
                filter="url(#markerGlow)"
                className="marker-dot"
              />
              {/* Country label on hover */}
              {isHovered && (
                <text
                  dy="-14"
                  textAnchor="middle"
                  fill="#f0d060"
                  fontSize="8"
                  fontFamily="Cormorant Garamond, serif"
                  fontStyle="italic"
                  className="marker-label"
                >
                  {m.country}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredMonument && (
        <div
          className="globe-tooltip"
          style={{
            left: tooltipPos.x + 18,
            top: tooltipPos.y - 10,
          }}
        >
          <div className="tooltip-flag">{hoveredMonument.continent === 'africa' ? '🌍' : hoveredMonument.continent === 'europe' ? '🌍' : '🌎'}</div>
          <div className="tooltip-content">
            <span className="tooltip-country">{hoveredMonument.country}</span>
            <span className="tooltip-name">{hoveredMonument.name}</span>
            <span className="tooltip-year">{hoveredMonument.year}</span>
          </div>
          <div className="tooltip-hint">Cliquer pour explorer</div>
        </div>
      )}

      {/* Decorative label */}
      <div className="globe-caption">
        Survolez les marqueurs dorés pour découvrir les monuments
      </div>
    </div>
  );
};

export default Globe;