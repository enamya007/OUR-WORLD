import React, {
  useEffect, useRef, useState, useCallback, useMemo,
} from 'react';
import * as topojson from 'topojson-client';
import { monuments } from '../data/monuments';
import './Globe.css';

/* ═══════════════════════════════════════════
   PAYS — nom, capitale, lat, lng
   ═══════════════════════════════════════════ */
const COUNTRIES = [
  { name: 'France',           capital: 'Paris',           lat: 48.85,  lng:   2.35 },
  { name: 'Royaume-Uni',      capital: 'Londres',         lat: 51.50,  lng:  -0.12 },
  { name: 'Allemagne',        capital: 'Berlin',          lat: 52.52,  lng:  13.40 },
  { name: 'Italie',           capital: 'Rome',            lat: 41.90,  lng:  12.49 },
  { name: 'Espagne',          capital: 'Madrid',          lat: 40.41,  lng:  -3.70 },
  { name: 'Portugal',         capital: 'Lisbonne',        lat: 38.71,  lng:  -9.14 },
  { name: 'Russie',           capital: 'Moscou',          lat: 55.75,  lng:  37.61 },
  { name: 'Ukraine',          capital: 'Kyiv',            lat: 50.45,  lng:  30.52 },
  { name: 'Pologne',          capital: 'Varsovie',        lat: 52.22,  lng:  21.01 },
  { name: 'Suède',            capital: 'Stockholm',       lat: 59.33,  lng:  18.06 },
  { name: 'Norvège',          capital: 'Oslo',            lat: 59.91,  lng:  10.75 },
  { name: 'Pays-Bas',         capital: 'Amsterdam',       lat: 52.37,  lng:   4.90 },
  { name: 'Belgique',         capital: 'Bruxelles',       lat: 50.85,  lng:   4.35 },
  { name: 'Suisse',           capital: 'Berne',           lat: 46.94,  lng:   7.44 },
  { name: 'Autriche',         capital: 'Vienne',          lat: 48.21,  lng:  16.37 },
  { name: 'Grèce',            capital: 'Athènes',         lat: 37.97,  lng:  23.72 },
  { name: 'Turquie',          capital: 'Ankara',          lat: 39.92,  lng:  32.85 },
  { name: 'États-Unis',       capital: 'Washington D.C.', lat: 38.89,  lng: -77.03 },
  { name: 'Canada',           capital: 'Ottawa',          lat: 45.42,  lng: -75.69 },
  { name: 'Mexique',          capital: 'Mexico',          lat: 19.43,  lng: -99.13 },
  { name: 'Brésil',           capital: 'Brasília',        lat: -15.78, lng: -47.93 },
  { name: 'Argentine',        capital: 'Buenos Aires',    lat: -34.61, lng: -58.38 },
  { name: 'Colombie',         capital: 'Bogotá',          lat:  4.71,  lng: -74.07 },
  { name: 'Pérou',            capital: 'Lima',            lat: -12.04, lng: -77.03 },
  { name: 'Chili',            capital: 'Santiago',        lat: -33.46, lng: -70.65 },
  { name: 'Venezuela',        capital: 'Caracas',         lat: 10.48,  lng: -66.87 },
  { name: 'Chine',            capital: 'Pékin',           lat: 39.91,  lng: 116.38 },
  { name: 'Japon',            capital: 'Tokyo',           lat: 35.68,  lng: 139.69 },
  { name: 'Inde',             capital: 'New Delhi',       lat: 28.61,  lng:  77.20 },
  { name: 'Corée du Sud',     capital: 'Séoul',           lat: 37.57,  lng: 126.98 },
  { name: 'Indonésie',        capital: 'Jakarta',         lat: -6.21,  lng: 106.84 },
  { name: 'Australie',        capital: 'Canberra',        lat: -35.28, lng: 149.13 },
  { name: 'Arabie Saoudite',  capital: 'Riyad',           lat: 24.68,  lng:  46.72 },
  { name: 'Iran',             capital: 'Téhéran',         lat: 35.69,  lng:  51.42 },
  { name: 'Pakistan',         capital: 'Islamabad',       lat: 33.72,  lng:  73.06 },
  { name: 'Thaïlande',        capital: 'Bangkok',         lat: 13.75,  lng: 100.50 },
  { name: 'Vietnam',          capital: 'Hanoï',           lat: 21.03,  lng: 105.85 },
  { name: 'Philippines',      capital: 'Manille',         lat: 14.59,  lng: 120.98 },
  { name: 'Égypte',           capital: 'Le Caire',        lat: 30.04,  lng:  31.24 },
  { name: 'Nigéria',          capital: 'Abuja',           lat:  9.07,  lng:   7.40 },
  { name: 'Éthiopie',         capital: 'Addis-Abeba',     lat:  9.03,  lng:  38.74 },
  { name: 'Afrique du Sud',   capital: 'Pretoria',        lat: -25.74, lng:  28.19 },
  { name: 'Kenya',            capital: 'Nairobi',         lat: -1.29,  lng:  36.82 },
  { name: 'Ghana',            capital: 'Accra',           lat:  5.55,  lng:  -0.20 },
  { name: 'Togo',             capital: 'Lomé',            lat:  6.13,  lng:   1.22 },
  { name: 'Bénin',            capital: 'Porto-Novo',      lat:  6.37,  lng:   2.42 },
  { name: 'Sénégal',          capital: 'Dakar',           lat: 14.69,  lng: -17.44 },
  { name: "Côte d'Ivoire",    capital: 'Yamoussoukro',    lat:  6.82,  lng:  -5.27 },
  { name: 'Cameroun',         capital: 'Yaoundé',         lat:  3.86,  lng:  11.52 },
  { name: 'Congo (RDC)',      capital: 'Kinshasa',        lat: -4.32,  lng:  15.32 },
  { name: 'Tanzanie',         capital: 'Dodoma',          lat: -6.17,  lng:  35.74 },
  { name: 'Madagascar',       capital: 'Antananarivo',    lat: -18.91, lng:  47.54 },
  { name: 'Maroc',            capital: 'Rabat',           lat: 34.02,  lng:  -6.83 },
  { name: 'Algérie',          capital: 'Alger',           lat: 36.74,  lng:   3.06 },
  { name: 'Tunisie',          capital: 'Tunis',           lat: 36.82,  lng:  10.17 },
  { name: 'Soudan',           capital: 'Khartoum',        lat: 15.55,  lng:  32.53 },
  { name: 'Angola',           capital: 'Luanda',          lat: -8.84,  lng:  13.23 },
  { name: 'Zambie',           capital: 'Lusaka',          lat: -15.42, lng:  28.28 },
  { name: 'Zimbabwe',         capital: 'Harare',          lat: -17.83, lng:  31.05 },
  { name: 'Mozambique',       capital: 'Maputo',          lat: -25.97, lng:  32.59 },
  { name: 'Nouvelle-Zélande', capital: 'Wellington',      lat: -41.29, lng: 174.78 },
  { name: 'Irak',             capital: 'Bagdad',          lat: 33.34,  lng:  44.40 },
  { name: 'Israël',           capital: 'Jérusalem',       lat: 31.77,  lng:  35.22 },
  { name: 'Émirats arabes',   capital: 'Abou Dabi',       lat: 24.45,  lng:  54.38 },
  { name: 'Kazakhstan',       capital: 'Astana',          lat: 51.18,  lng:  71.45 },
  { name: 'Cuba',             capital: 'La Havane',       lat: 23.13,  lng: -82.38 },
  { name: 'Bolivie',          capital: 'Sucre',           lat: -19.04, lng: -65.26 },
  { name: 'Paraguay',         capital: 'Asunción',        lat: -25.28, lng: -57.64 },
  { name: 'Uruguay',          capital: 'Montevideo',      lat: -34.90, lng: -56.19 },
  { name: 'Équateur',         capital: 'Quito',           lat: -0.22,  lng: -78.52 },
];

/* ═══════════════════════════════════════
   GÉOMÉTRIE 3D
   ═══════════════════════════════════════ */
const DEG = Math.PI / 180;

// Convertit lat/lng en coordonnées 3D unitaires
function latLngTo3D(lat, lng) {
  const phi   = (90 - lat) * DEG;
  const theta = (lng + 180) * DEG;
  return [
     Math.sin(phi) * Math.cos(theta),
     Math.cos(phi),
    -Math.sin(phi) * Math.sin(theta),
  ];
}

// Applique rotation X puis Y et projette en 2D avec perspective légère
function project3D(vec, rotX, rotY, cx, cy, R) {
  let [x, y, z] = vec;
  // Rotation Y (longitude)
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
  const x1 =  x * cosY + z * sinY;
  const z1 = -x * sinY + z * cosY;
  // Rotation X (latitude/tilt)
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  const y2 =  y * cosX - z1 * sinX;
  const z2 =  y * sinX + z1 * cosX;
  // Perspective douce
  const scale = 2.4 / (2.4 + z2 * 0.35);
  return {
    px: cx + x1 * R * scale,
    py: cy - y2 * R * scale,
    visible: z2 > -0.05,
    depth: z2,
  };
}


/* ═══════════════════════════════════════
   COMPOSANT GLOBE
   ═══════════════════════════════════════ */
const Globe = ({ onSelectMonument }) => {
  const canvasRef    = useRef(null);
  const animRef      = useRef(null);
  const isDragging   = useRef(false);
  const lastMouse    = useRef({ x: 0, y: 0 });
  const rotRef       = useRef({ x: 0.25, y: -0.5 });
  const velRef       = useRef({ x: 0, y: 0.0025 });
  const autoRot      = useRef(true);
  const geoRef       = useRef(null);   // polygones GeoJSON des terres
  const topoLoaded   = useRef(false);

  const [tooltip,    setTooltip]    = useState(null);
  const [clickInfo,  setClickInfo]  = useState(null);
  const [size,       setSize]       = useState(620);
  const [geoReady,   setGeoReady]   = useState(false);

  const R  = useMemo(() => size * 0.40, [size]);
  const CX = useMemo(() => size / 2,   [size]);
  const CY = useMemo(() => size / 2,   [size]);

  /* ── Responsive ── */
  useEffect(() => {
    const upd = () => {
      const w = Math.min(window.innerWidth - 32, 680);
      setSize(Math.max(300, w));
    };
    upd();
    window.addEventListener('resize', upd);
    return () => window.removeEventListener('resize', upd);
  }, []);

  /* ── Charger TopoJSON ── */
  useEffect(() => {
    if (topoLoaded.current) return;
    topoLoaded.current = true;
    fetch('/countries-110m.json')
      .then(r => r.json())
      .then(topo => {
        // Extraire les polygones des terres (land = continent fusionné)
        const land      = topojson.feature(topo, topo.objects.land);
        const countries = topojson.feature(topo, topo.objects.countries);
        geoRef.current  = { land, countries };
        setGeoReady(true);
      })
      .catch(err => console.error('TopoJSON load error:', err));
  }, []);

  /* ═══════════════════════════════════════
     DESSIN DU GLOBE
     ═══════════════════════════════════════ */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x: rotX, y: rotY } = rotRef.current;

    ctx.clearRect(0, 0, size, size);

    /* ── Fond sphère (océan) ── */
    const oceanGrad = ctx.createRadialGradient(
      CX - R * 0.28, CY - R * 0.28, R * 0.04,
      CX, CY, R
    );
    oceanGrad.addColorStop(0,   '#0f3460');
    oceanGrad.addColorStop(0.45,'#0a2240');
    oceanGrad.addColorStop(0.85,'#061428');
    oceanGrad.addColorStop(1,   '#020810');
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.fillStyle = oceanGrad;
    ctx.fill();

    /* ── Grille (méridiens + parallèles) ── */
    ctx.save();
    ctx.strokeStyle = 'rgba(80,140,255,0.07)';
    ctx.lineWidth = 0.6;
    for (let lng = -180; lng <= 180; lng += 30) {
      ctx.beginPath();
      let first = true;
      for (let lat = -90; lat <= 90; lat += 2) {
        const v = latLngTo3D(lat, lng);
        const { px, py, visible } = project3D(v, rotX, rotY, CX, CY, R);
        if (visible) {
          first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          first = false;
        } else { first = true; }
      }
      ctx.stroke();
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let first = true;
      for (let lng = -180; lng <= 180; lng += 2) {
        const v = latLngTo3D(lat, lng);
        const { px, py, visible } = project3D(v, rotX, rotY, CX, CY, R);
        if (visible) {
          first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          first = false;
        } else { first = true; }
      }
      ctx.stroke();
    }
    ctx.restore();

    /* ── Continents GeoJSON ── */
    if (geoRef.current) {
      const { land, countries } = geoRef.current;

      // Fonction de dessin d'un polygon GeoJSON sur la sphère
      const drawPolygon = (coordinates, fillStyle, strokeStyle, lw = 0.4) => {
        coordinates.forEach(ring => {
          ctx.beginPath();
          let first = true;
          let prevVisible = false;

          ring.forEach(([lng, lat]) => {
            const v = latLngTo3D(lat, lng);
            const { px, py, visible } = project3D(v, rotX, rotY, CX, CY, R);

            if (visible) {
              if (first || !prevVisible) {
                ctx.moveTo(px, py);
              } else {
                ctx.lineTo(px, py);
              }
              first = false;
              prevVisible = true;
            } else {
              prevVisible = false;
            }
          });

          ctx.fillStyle = fillStyle;
          ctx.fill();
          if (strokeStyle) {
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lw;
            ctx.stroke();
          }
        });
      };

      // ── Remplissage terres (land fusionné — bleu acier lumineux) ──
      land.features.forEach(feature => {
        const { type, coordinates } = feature.geometry;
        if (type === 'Polygon') {
          drawPolygon(coordinates, 'rgba(30,100,200,0.72)', null, 0);
        } else if (type === 'MultiPolygon') {
          coordinates.forEach(poly => drawPolygon(poly, 'rgba(30,100,200,0.72)', null, 0));
        }
      });

      // ── Contours pays (frontières fines) ──
      countries.features.forEach(feature => {
        const { type, coordinates } = feature.geometry;
        const stroke = 'rgba(100,180,255,0.22)';
        if (type === 'Polygon') {
          drawPolygon(coordinates, 'transparent', stroke, 0.5);
        } else if (type === 'MultiPolygon') {
          coordinates.forEach(poly => drawPolygon(poly, 'transparent', stroke, 0.5));
        }
      });

      // ── Rehaut lumineux sur les terres ──
      land.features.forEach(feature => {
        const { type, coordinates } = feature.geometry;
        const highlight = 'rgba(80,160,255,0.15)';
        if (type === 'Polygon') {
          drawPolygon(coordinates, highlight, null, 0);
        } else if (type === 'MultiPolygon') {
          coordinates.forEach(poly => drawPolygon(poly, highlight, null, 0));
        }
      });
    }

    /* ── Équateur (ligne d'or discrète) ── */
    ctx.beginPath();
    let firstEq = true;
    for (let lng = -180; lng <= 180; lng += 1.5) {
      const v = latLngTo3D(0, lng);
      const { px, py, visible } = project3D(v, rotX, rotY, CX, CY, R);
      if (visible) {
        firstEq ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        firstEq = false;
      } else { firstEq = true; }
    }
    ctx.strokeStyle = 'rgba(201,162,39,0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();

    /* ── Marqueurs PAYS ── */
    COUNTRIES.forEach(c => {
      const v = latLngTo3D(c.lat, c.lng);
      const { px, py, visible } = project3D(v, rotX, rotY, CX, CY, R);
      if (!visible) return;
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(160,210,255,0.55)';
      ctx.fill();
    });

    /* ── Marqueurs MONUMENTS (pulsants dorés) ── */
    const t = Date.now() * 0.0028;
    monuments.forEach(m => {
      const c = COUNTRIES.find(co => co.name === m.country);
      if (!c) return;
      const v = latLngTo3D(c.lat, c.lng);
      const { px, py, visible } = project3D(v, rotX, rotY, CX, CY, R);
      if (!visible) return;

      const pulse = 0.5 + 0.5 * Math.sin(t + m.id * 1.3);
      const rOuter = 6 + pulse * 5;

      // Halo pulsant
      ctx.beginPath();
      ctx.arc(px, py, rOuter, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(240,200,60,${0.18 + pulse * 0.22})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Deuxième anneau
      ctx.beginPath();
      ctx.arc(px, py, 4 + pulse * 2, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,220,80,${0.3 + pulse * 0.2})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Point central brillant
      const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
      g.addColorStop(0,   'rgba(255,240,120,1)');
      g.addColorStop(0.35,'rgba(220,170,40,0.9)');
      g.addColorStop(1,   'rgba(180,100,10,0)');
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });

    /* ── Atmosphère (halo bleu autour du globe) ── */
    const atmo = ctx.createRadialGradient(CX, CY, R * 0.97, CX, CY, R * 1.14);
    atmo.addColorStop(0,   'rgba(60,120,255,0.20)');
    atmo.addColorStop(0.4, 'rgba(40,90,200,0.09)');
    atmo.addColorStop(1,   'rgba(20,50,150,0)');
    ctx.beginPath();
    ctx.arc(CX, CY, R * 1.14, 0, Math.PI * 2);
    ctx.fillStyle = atmo;
    ctx.fill();

    /* ── Reflet brillant (haut-gauche) ── */
    const shine = ctx.createRadialGradient(
      CX - R * 0.38, CY - R * 0.38, 0,
      CX - R * 0.2,  CY - R * 0.2,  R * 0.55
    );
    shine.addColorStop(0,   'rgba(200,230,255,0.13)');
    shine.addColorStop(0.6, 'rgba(150,200,255,0.04)');
    shine.addColorStop(1,   'rgba(100,160,255,0)');
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.fillStyle = shine;
    ctx.fill();

    /* ── Ombre sol ── */
    const shadow = ctx.createRadialGradient(CX, CY + R * 1.06, R * 0.08, CX, CY + R * 1.06, R * 0.65);
    shadow.addColorStop(0,   'rgba(0,0,0,0.30)');
    shadow.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.ellipse(CX, CY + R * 1.06, R * 0.60, R * 0.11, 0, 0, Math.PI * 2);
    ctx.fillStyle = shadow;
    ctx.fill();

  }, [size, R, CX, CY, geoReady]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Boucle animation ── */
  useEffect(() => {
    const loop = () => {
      if (autoRot.current && !isDragging.current) {
        rotRef.current.y += velRef.current.y;
      } else if (!isDragging.current) {
        rotRef.current.x += velRef.current.x;
        rotRef.current.y += velRef.current.y;
        velRef.current.x *= 0.94;
        velRef.current.y *= 0.94;
        if (Math.abs(velRef.current.x) < 0.0001 && Math.abs(velRef.current.y) < 0.0001) {
          autoRot.current = true;
          velRef.current = { x: 0, y: 0.0025 };
        }
      }
      draw();
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  /* ══════════════════════════════════
     DÉTECTION HOVER / CLIC
     ══════════════════════════════════ */
  const findNearest = useCallback((clientX, clientY, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const mx = clientX - rect.left;
    const my = clientY - rect.top;
    const { x: rotX, y: rotY } = rotRef.current;

    let bestMon  = null, bestMonD  = 20;
    let bestCtry = null, bestCtryD = 24;

    monuments.forEach(m => {
      const co = COUNTRIES.find(c => c.name === m.country);
      if (!co) return;
      const { px, py, visible } = project3D(latLngTo3D(co.lat, co.lng), rotX, rotY, CX, CY, R);
      if (!visible) return;
      const d = Math.hypot(px - mx, py - my);
      if (d < bestMonD) { bestMonD = d; bestMon = m; }
    });

    COUNTRIES.forEach(c => {
      const { px, py, visible } = project3D(latLngTo3D(c.lat, c.lng), rotX, rotY, CX, CY, R);
      if (!visible) return;
      const d = Math.hypot(px - mx, py - my);
      if (d < bestCtryD) { bestCtryD = d; bestCtry = c; }
    });

    return { monument: bestMon, country: bestCtry, mx, my };
  }, [CX, CY, R]);

  /* ── Mouse Move ── */
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (isDragging.current) {
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      velRef.current = { x: dy * 0.007, y: dx * 0.007 };
      rotRef.current.y += dx * 0.007;
      rotRef.current.x += dy * 0.007;
      lastMouse.current = { x: e.clientX, y: e.clientY };
      setTooltip(null);
      return;
    }
    const { monument, country } = findNearest(e.clientX, e.clientY, canvas);
    const rect = canvas.getBoundingClientRect();
    if (monument) {
      canvas.style.cursor = 'pointer';
      setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, type: 'monument', data: monument });
    } else if (country) {
      canvas.style.cursor = 'pointer';
      setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, type: 'country', data: country });
    } else {
      canvas.style.cursor = 'grab';
      setTooltip(null);
    }
  }, [findNearest]);

  const handleMouseDown = useCallback((e) => {
    isDragging.current = true;
    autoRot.current    = false;
    velRef.current     = { x: 0, y: 0 };
    lastMouse.current  = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
  }, []);

  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
    setTooltip(null);
    setTimeout(() => {
      autoRot.current  = true;
      velRef.current   = { x: 0, y: 0.0025 };
    }, 1200);
  }, []);

  /* ── Clic ── */
  const handleClick = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { monument, country } = findNearest(e.clientX, e.clientY, canvas);
    if (monument) {
      onSelectMonument(monument);
      setClickInfo(null);
    } else if (country) {
      const rect = canvas.getBoundingClientRect();
      setClickInfo({ x: e.clientX - rect.left, y: e.clientY - rect.top, country });
      setTimeout(() => setClickInfo(null), 4000);
    }
  }, [findNearest, onSelectMonument]);

  /* ── Touch ── */
  const handleTouchStart = useCallback((e) => {
    isDragging.current = true;
    autoRot.current    = false;
    velRef.current     = { x: 0, y: 0 };
    lastMouse.current  = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const dx = e.touches[0].clientX - lastMouse.current.x;
    const dy = e.touches[0].clientY - lastMouse.current.y;
    velRef.current = { x: dy * 0.007, y: dx * 0.007 };
    rotRef.current.y += dx * 0.007;
    rotRef.current.x += dy * 0.007;
    lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback((e) => {
    isDragging.current = false;
    const canvas = canvasRef.current;
    if (!canvas || e.changedTouches.length === 0) return;
    const touch = e.changedTouches[0];
    const { monument, country } = findNearest(touch.clientX, touch.clientY, canvas);
    if (monument) {
      onSelectMonument(monument);
    } else if (country) {
      const rect = canvas.getBoundingClientRect();
      setClickInfo({ x: touch.clientX - rect.left, y: touch.clientY - rect.top, country });
      setTimeout(() => setClickInfo(null), 4000);
    }
    setTimeout(() => {
      autoRot.current = true;
      velRef.current  = { x: 0, y: 0.0025 };
    }, 1500);
  }, [findNearest, onSelectMonument]);

  /* ══════════════════════════════════
     RENDU
     ══════════════════════════════════ */
  return (
    <div className="globe-scene">
      {!geoReady && (
        <div className="globe-loading">
          <div className="globe-loading-ring" />
          <span>Chargement du globe…</span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className={`globe-canvas ${geoReady ? 'globe-canvas--ready' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Tooltip hover */}
      {tooltip && !clickInfo && (
        <div className="globe-tooltip" style={{ left: tooltip.x + 16, top: tooltip.y - 14 }}>
          {tooltip.type === 'monument' ? (
            <>
              <div className="tt-badge tt-badge--monument">Monument</div>
              <div className="tt-name">{tooltip.data.name}</div>
              <div className="tt-sub">{tooltip.data.country} · {tooltip.data.year}</div>
              <div className="tt-hint">Cliquer pour explorer</div>
            </>
          ) : (
            <>
              <div className="tt-badge tt-badge--country">Pays</div>
              <div className="tt-name">{tooltip.data.name}</div>
              <div className="tt-sub">Capitale : <strong>{tooltip.data.capital}</strong></div>
              <div className="tt-hint">Cliquer pour plus d'infos</div>
            </>
          )}
        </div>
      )}

      {/* Fiche pays au clic */}
      {clickInfo && (
        <div
          className="globe-country-card"
          style={{
            left: Math.min(clickInfo.x, size - 220),
            top:  Math.max(clickInfo.y - 80, 10),
          }}
        >
          <button className="country-card-close" onClick={() => setClickInfo(null)}>✕</button>
          <div className="country-card-title">{clickInfo.country.name}</div>
          <div className="country-card-row">
            <span className="country-card-label">Capitale</span>
            <span className="country-card-value">{clickInfo.country.capital}</span>
          </div>
          <div className="country-card-row">
            <span className="country-card-label">Coordonnées</span>
            <span className="country-card-value">
              {Math.abs(clickInfo.country.lat).toFixed(1)}°{clickInfo.country.lat >= 0 ? 'N' : 'S'}
              {' / '}
              {Math.abs(clickInfo.country.lng).toFixed(1)}°{clickInfo.country.lng >= 0 ? 'E' : 'O'}
            </span>
          </div>
        </div>
      )}

      {/* Légende */}
      <div className="globe-legend">
        <span className="globe-legend-item">
          <span className="globe-legend-dot globe-legend-dot--monument" />
          Monuments (cliquer)
        </span>
        <span className="globe-legend-item">
          <span className="globe-legend-dot globe-legend-dot--country" />
          Pays (cliquer)
        </span>
        <span className="globe-legend-hint">· Glisser pour tourner</span>
      </div>
    </div>
  );
};

export default Globe;