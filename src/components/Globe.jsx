import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { monuments } from '../data/monuments';
import './Globe.css';

/* ═══════════════════════════════════════════
   DONNÉES PAYS — nom, capitale, lat, lng
   ═══════════════════════════════════════════ */
const COUNTRIES = [
  { name: 'France',          capital: 'Paris',          lat: 48.85,  lng:   2.35 },
  { name: 'Royaume-Uni',     capital: 'Londres',        lat: 51.50,  lng:  -0.12 },
  { name: 'Allemagne',       capital: 'Berlin',         lat: 52.52,  lng:  13.40 },
  { name: 'Italie',          capital: 'Rome',           lat: 41.90,  lng:  12.49 },
  { name: 'Espagne',         capital: 'Madrid',         lat: 40.41,  lng:  -3.70 },
  { name: 'Portugal',        capital: 'Lisbonne',       lat: 38.71,  lng:  -9.14 },
  { name: 'Russie',          capital: 'Moscou',         lat: 55.75,  lng:  37.61 },
  { name: 'Ukraine',         capital: 'Kyiv',           lat: 50.45,  lng:  30.52 },
  { name: 'Pologne',         capital: 'Varsovie',       lat: 52.22,  lng:  21.01 },
  { name: 'Suède',           capital: 'Stockholm',      lat: 59.33,  lng:  18.06 },
  { name: 'Norvège',         capital: 'Oslo',           lat: 59.91,  lng:  10.75 },
  { name: 'Pays-Bas',        capital: 'Amsterdam',      lat: 52.37,  lng:   4.90 },
  { name: 'Belgique',        capital: 'Bruxelles',      lat: 50.85,  lng:   4.35 },
  { name: 'Suisse',          capital: 'Berne',          lat: 46.94,  lng:   7.44 },
  { name: 'Autriche',        capital: 'Vienne',         lat: 48.21,  lng:  16.37 },
  { name: 'Grèce',           capital: 'Athènes',        lat: 37.97,  lng:  23.72 },
  { name: 'Turquie',         capital: 'Ankara',         lat: 39.92,  lng:  32.85 },
  { name: 'États-Unis',      capital: 'Washington D.C.',lat: 38.89,  lng: -77.03 },
  { name: 'Canada',          capital: 'Ottawa',         lat: 45.42,  lng: -75.69 },
  { name: 'Mexique',         capital: 'Mexico',         lat: 19.43,  lng: -99.13 },
  { name: 'Brésil',          capital: 'Brasília',       lat: -15.78, lng: -47.93 },
  { name: 'Argentine',       capital: 'Buenos Aires',   lat: -34.61, lng: -58.38 },
  { name: 'Colombie',        capital: 'Bogotá',         lat:  4.71,  lng: -74.07 },
  { name: 'Pérou',           capital: 'Lima',           lat: -12.04, lng: -77.03 },
  { name: 'Chili',           capital: 'Santiago',       lat: -33.46, lng: -70.65 },
  { name: 'Venezuela',       capital: 'Caracas',        lat: 10.48,  lng: -66.87 },
  { name: 'Chine',           capital: 'Pékin',          lat: 39.91,  lng: 116.38 },
  { name: 'Japon',           capital: 'Tokyo',          lat: 35.68,  lng: 139.69 },
  { name: 'Inde',            capital: 'New Delhi',      lat: 28.61,  lng:  77.20 },
  { name: 'Corée du Sud',    capital: 'Séoul',          lat: 37.57,  lng: 126.98 },
  { name: 'Indonésie',       capital: 'Jakarta',        lat: -6.21,  lng: 106.84 },
  { name: 'Australie',       capital: 'Canberra',       lat: -35.28, lng: 149.13 },
  { name: 'Arabie Saoudite', capital: 'Riyad',          lat: 24.68,  lng:  46.72 },
  { name: 'Iran',            capital: 'Téhéran',        lat: 35.69,  lng:  51.42 },
  { name: 'Pakistan',        capital: 'Islamabad',      lat: 33.72,  lng:  73.06 },
  { name: 'Bangladesh',      capital: 'Dacca',          lat: 23.72,  lng:  90.41 },
  { name: 'Thaïlande',       capital: 'Bangkok',        lat: 13.75,  lng: 100.50 },
  { name: 'Vietnam',         capital: 'Hanoï',          lat: 21.03,  lng: 105.85 },
  { name: 'Philippines',     capital: 'Manille',        lat: 14.59,  lng: 120.98 },
  { name: 'Égypte',          capital: 'Le Caire',       lat: 30.04,  lng:  31.24 },
  { name: 'Nigéria',         capital: 'Abuja',          lat:  9.07,  lng:   7.40 },
  { name: 'Éthiopie',        capital: 'Addis-Abeba',    lat:  9.03,  lng:  38.74 },
  { name: 'Afrique du Sud',  capital: 'Pretoria',       lat: -25.74, lng:  28.19 },
  { name: 'Kenya',           capital: 'Nairobi',        lat: -1.29,  lng:  36.82 },
  { name: 'Ghana',           capital: 'Accra',          lat:  5.55,  lng:  -0.20 },
  { name: 'Togo',            capital: 'Lomé',           lat:  6.13,  lng:   1.22 },
  { name: 'Bénin',           capital: 'Porto-Novo',     lat:  6.37,  lng:   2.42 },
  { name: 'Sénégal',         capital: 'Dakar',          lat: 14.69,  lng: -17.44 },
  { name: 'Côte d\'Ivoire',  capital: 'Yamoussoukro',   lat:  6.82,  lng:  -5.27 },
  { name: 'Cameroun',        capital: 'Yaoundé',        lat:  3.86,  lng:  11.52 },
  { name: 'Congo (RDC)',     capital: 'Kinshasa',       lat: -4.32,  lng:  15.32 },
  { name: 'Tanzanie',        capital: 'Dodoma',         lat: -6.17,  lng:  35.74 },
  { name: 'Mozambique',      capital: 'Maputo',         lat: -25.97, lng:  32.59 },
  { name: 'Madagascar',      capital: 'Antananarivo',   lat: -18.91, lng:  47.54 },
  { name: 'Maroc',           capital: 'Rabat',          lat: 34.02,  lng:  -6.83 },
  { name: 'Algérie',         capital: 'Alger',          lat: 36.74,  lng:   3.06 },
  { name: 'Tunisie',         capital: 'Tunis',          lat: 36.82,  lng:  10.17 },
  { name: 'Libye',           capital: 'Tripoli',        lat: 32.90,  lng:  13.18 },
  { name: 'Soudan',          capital: 'Khartoum',       lat: 15.55,  lng:  32.53 },
  { name: 'Angola',          capital: 'Luanda',         lat: -8.84,  lng:  13.23 },
  { name: 'Zambie',          capital: 'Lusaka',         lat: -15.42, lng:  28.28 },
  { name: 'Zimbabwe',        capital: 'Harare',         lat: -17.83, lng:  31.05 },
  { name: 'Nouvelle-Zélande',capital: 'Wellington',     lat: -41.29, lng: 174.78 },
  { name: 'Irak',            capital: 'Bagdad',         lat: 33.34,  lng:  44.40 },
  { name: 'Syrie',           capital: 'Damas',          lat: 33.51,  lng:  36.29 },
  { name: 'Israël',          capital: 'Jérusalem',      lat: 31.77,  lng:  35.22 },
  { name: 'Émirats arabes',  capital: 'Abou Dabi',      lat: 24.45,  lng:  54.38 },
  { name: 'Kazakhstan',      capital: 'Astana',         lat: 51.18,  lng:  71.45 },
  { name: 'Ouzbékistan',     capital: 'Tachkent',       lat: 41.30,  lng:  69.27 },
  { name: 'Cuba',            capital: 'La Havane',      lat: 23.13,  lng: -82.38 },
  { name: 'Haïti',           capital: 'Port-au-Prince', lat: 18.54,  lng: -72.34 },
  { name: 'Bolivie',         capital: 'Sucre',          lat: -19.04, lng: -65.26 },
  { name: 'Paraguay',        capital: 'Asunción',       lat: -25.28, lng: -57.64 },
  { name: 'Uruguay',         capital: 'Montevideo',     lat: -34.90, lng: -56.19 },
  { name: 'Équateur',        capital: 'Quito',          lat: -0.22,  lng: -78.52 },
];

/* ═══════════════════════════════════════
   UTILITAIRES GÉOMÉTRIQUES
   ═══════════════════════════════════════ */
const DEG = Math.PI / 180;

function latLngToXYZ(lat, lng, r = 1) {
  const phi = (90 - lat) * DEG;
  const theta = (lng + 180) * DEG;
  return {
    x:  r * Math.sin(phi) * Math.cos(theta),
    y:  r * Math.cos(phi),
    z: -r * Math.sin(phi) * Math.sin(theta),
  };
}

function projectPoint(x, y, z, rotX, rotY, cx, cy, R) {
  // Rotation Y
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
  const x1 =  x * cosY + z * sinY;
  const z1 = -x * sinY + z * cosY;
  // Rotation X
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  const y2 =  y * cosX - z1 * sinX;
  const z2 =  y * sinX + z1 * cosX;
  // Perspective
  const scale = (2.2 * R) / (2.2 * R + z2 * R * 0.4);
  return {
    px: cx + x1 * R * scale,
    py: cy - y2 * R * scale,
    visible: z2 > -0.18,
    depth: z2,
  };
}

/* ═══════════════════════════════════════
   CONTINENTS (polygones lon/lat simplifiés)
   ═══════════════════════════════════════ */
const CONTINENTS = [
  {
    name: 'europe',
    color: '#1a3a5c',
    highlight: '#2a5f96',
    paths: [
      // Europe principale
      [[-10,36],[40,36],[40,71],[-10,71]],
      // Scandinavie
      [[5,56],[30,56],[30,71],[5,71]],
    ],
  },
  {
    name: 'africa',
    color: '#1a3a1a',
    highlight: '#2a6b2a',
    paths: [
      [[-18,37],[52,37],[52,-35],[-18,-35]],
    ],
  },
  {
    name: 'north_america',
    color: '#2a1a3a',
    highlight: '#4a2a6b',
    paths: [
      [[-170,72],[-50,72],[-50,15],[-170,15]],
      [[-120,15],[-85,15],[-85,8],[-120,8]],
    ],
  },
  {
    name: 'south_america',
    color: '#1a2a3a',
    highlight: '#2a4a6b',
    paths: [
      [[-82,13],[-34,13],[-34,-56],[-82,-56]],
    ],
  },
  {
    name: 'asia',
    color: '#2a1a1a',
    highlight: '#6b2a2a',
    paths: [
      [[26,12],[145,12],[145,72],[26,72]],
      [[60,-10],[145,-10],[145,12],[60,12]],
    ],
  },
  {
    name: 'oceania',
    color: '#1a2a2a',
    highlight: '#2a5a5a',
    paths: [
      [[113,-10],[154,-10],[154,-44],[113,-44]],
      [[166,-34],[178,-34],[178,-47],[166,-47]],
    ],
  },
];

/* ═══════════════════════════════════════
   COMPOSANT GLOBE
   ═══════════════════════════════════════ */
const Globe = ({ onSelectMonument }) => {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 0.3, y: -0.6 });
  const velRef = useRef({ x: 0, y: 0.003 });
  const autoRotate = useRef(true);

  const [tooltip, setTooltip] = useState(null);
  const [clickInfo, setClickInfo] = useState(null);
  const [size, setSize] = useState(580);

  /* Rayon du globe selon taille écran */
  const R = useMemo(() => size * 0.38, [size]);
  const CX = useMemo(() => size / 2, [size]);
  const CY = useMemo(() => size / 2, [size]);

  /* Responsive */
  useEffect(() => {
    const update = () => {
      const w = Math.min(window.innerWidth - 40, 680);
      setSize(Math.max(320, w));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* ─── DRAW ─── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x: rotX, y: rotY } = rotRef.current;

    ctx.clearRect(0, 0, size, size);

    /* ── Fond spatial ── */
    const bgGrad = ctx.createRadialGradient(CX, CY, R * 0.2, CX, CY, size * 0.8);
    bgGrad.addColorStop(0, 'rgba(10,8,25,0)');
    bgGrad.addColorStop(1, 'rgba(5,3,15,0)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, size, size);

    /* ── Globe base ── */
    const earthGrad = ctx.createRadialGradient(
      CX - R * 0.25, CY - R * 0.25, R * 0.05,
      CX, CY, R
    );
    earthGrad.addColorStop(0,   '#1a3a6b');
    earthGrad.addColorStop(0.4, '#0d2550');
    earthGrad.addColorStop(0.8, '#071830');
    earthGrad.addColorStop(1,   '#030d1e');
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.fillStyle = earthGrad;
    ctx.fill();

    /* ── Grille lat/lon ── */
    ctx.save();
    ctx.strokeStyle = 'rgba(100,160,255,0.06)';
    ctx.lineWidth = 0.5;
    // Méridiens
    for (let lng = -180; lng <= 180; lng += 20) {
      ctx.beginPath();
      let first = true;
      for (let lat = -90; lat <= 90; lat += 3) {
        const p = latLngToXYZ(lat, lng);
        const { px, py, visible } = projectPoint(p.x, p.y, p.z, rotX, rotY, CX, CY, R);
        if (visible) {
          if (first) { ctx.moveTo(px, py); first = false; }
          else ctx.lineTo(px, py);
        } else { first = true; }
      }
      ctx.stroke();
    }
    // Parallèles
    for (let lat = -80; lat <= 80; lat += 20) {
      ctx.beginPath();
      let first = true;
      for (let lng = -180; lng <= 180; lng += 3) {
        const p = latLngToXYZ(lat, lng);
        const { px, py, visible } = projectPoint(p.x, p.y, p.z, rotX, rotY, CX, CY, R);
        if (visible) {
          if (first) { ctx.moveTo(px, py); first = false; }
          else ctx.lineTo(px, py);
        } else { first = true; }
      }
      ctx.stroke();
    }
    ctx.restore();

    /* ── Continents ── */
    CONTINENTS.forEach(cont => {
      cont.paths.forEach(poly => {
        const step = 4;
        const boundsLng = [
          Math.min(...poly.map(p => p[0])),
          Math.max(...poly.map(p => p[0]))
        ];
        const boundsLat = [
          Math.min(...poly.map(p => p[1])),
          Math.max(...poly.map(p => p[1]))
        ];

        // Dessiner en bandes horizontales (lat)
        for (let lat = boundsLat[0]; lat <= boundsLat[1]; lat += step) {
          ctx.beginPath();
          let first = true;
          for (let lng = boundsLng[0]; lng <= boundsLng[1]; lng += step) {
            const p3d = latLngToXYZ(lat, lng);
            const { px, py, visible } = projectPoint(p3d.x, p3d.y, p3d.z, rotX, rotY, CX, CY, R);
            if (visible) {
              if (first) { ctx.moveTo(px, py); first = false; }
              else ctx.lineTo(px, py);
            } else { first = true; }
          }
          ctx.strokeStyle = cont.color;
          ctx.lineWidth = step * R / 100 * 1.1;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      });
    });

    /* ── Équateur & Tropiques ── */
    [[0,'rgba(201,162,39,0.18)'],[23.5,'rgba(201,100,39,0.1)'],[-23.5,'rgba(201,100,39,0.1)']].forEach(([lat, color]) => {
      ctx.beginPath();
      let first = true;
      for (let lng = -180; lng <= 180; lng += 2) {
        const p = latLngToXYZ(lat, lng);
        const { px, py, visible } = projectPoint(p.x, p.y, p.z, rotX, rotY, CX, CY, R);
        if (visible) {
          if (first) { ctx.moveTo(px, py); first = false; }
          else ctx.lineTo(px, py);
        } else { first = true; }
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = lat === 0 ? 1.2 : 0.7;
      ctx.stroke();
    });

    /* ── Marqueurs PAYS ── */
    const projCountries = COUNTRIES.map(c => {
      const p3d = latLngToXYZ(c.lat, c.lng);
      const proj = projectPoint(p3d.x, p3d.y, p3d.z, rotX, rotY, CX, CY, R);
      return { ...c, ...proj };
    }).filter(c => c.visible);

    projCountries.forEach(c => {
      // Petit point doré subtil
      ctx.beginPath();
      ctx.arc(c.px, c.py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(201,162,39,0.5)';
      ctx.fill();
    });

    /* ── Marqueurs MONUMENTS ── */
    const projMonuments = monuments.map(m => {
      const p3d = latLngToXYZ(
        COUNTRIES.find(c => c.name === m.country)?.lat ?? 0,
        COUNTRIES.find(c => c.name === m.country)?.lng ?? 0
      );
      const proj = projectPoint(p3d.x, p3d.y, p3d.z, rotX, rotY, CX, CY, R);
      return { ...m, ...proj };
    }).filter(m => m.visible);

    projMonuments.forEach(m => {
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.003 + m.id);
      const r1 = 5 + pulse * 4;

      // Anneau pulsant
      ctx.beginPath();
      ctx.arc(m.px, m.py, r1, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(240,208,96,${0.25 + pulse * 0.2})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Point central lumineux
      const grad = ctx.createRadialGradient(m.px, m.py, 0, m.px, m.py, 6);
      grad.addColorStop(0,   'rgba(255,230,100,1)');
      grad.addColorStop(0.4, 'rgba(201,162,39,0.9)');
      grad.addColorStop(1,   'rgba(201,100,20,0)');
      ctx.beginPath();
      ctx.arc(m.px, m.py, 6, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    /* ── Atmosphère ── */
    const atmoGrad = ctx.createRadialGradient(CX, CY, R * 0.96, CX, CY, R * 1.12);
    atmoGrad.addColorStop(0,   'rgba(80,140,255,0.18)');
    atmoGrad.addColorStop(0.5, 'rgba(60,100,200,0.07)');
    atmoGrad.addColorStop(1,   'rgba(20,50,150,0)');
    ctx.beginPath();
    ctx.arc(CX, CY, R * 1.12, 0, Math.PI * 2);
    ctx.fillStyle = atmoGrad;
    ctx.fill();

    /* ── Reflet brillant ── */
    const shineGrad = ctx.createRadialGradient(
      CX - R * 0.35, CY - R * 0.35, 0,
      CX - R * 0.2,  CY - R * 0.2,  R * 0.6
    );
    shineGrad.addColorStop(0,   'rgba(200,230,255,0.12)');
    shineGrad.addColorStop(0.5, 'rgba(150,200,255,0.04)');
    shineGrad.addColorStop(1,   'rgba(100,160,255,0)');
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.fillStyle = shineGrad;
    ctx.fill();

    /* ── Ombre portée bas ── */
    const shadowGrad = ctx.createRadialGradient(CX, CY + R * 1.05, R * 0.1, CX, CY + R * 1.05, R * 0.7);
    shadowGrad.addColorStop(0,   'rgba(0,0,0,0.35)');
    shadowGrad.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.ellipse(CX, CY + R * 1.05, R * 0.65, R * 0.12, 0, 0, Math.PI * 2);
    ctx.fillStyle = shadowGrad;
    ctx.fill();

  }, [size, R, CX, CY]);

  /* ─── BOUCLE ANIMATION ─── */
  useEffect(() => {
    const loop = () => {
      if (autoRotate.current && !isDragging.current) {
        rotRef.current.y += velRef.current.y;
        rotRef.current.x += velRef.current.x * 0.1;
      } else if (!isDragging.current && (Math.abs(velRef.current.x) > 0.0001 || Math.abs(velRef.current.y) > 0.0001)) {
        rotRef.current.x += velRef.current.x;
        rotRef.current.y += velRef.current.y;
        velRef.current.x *= 0.95;
        velRef.current.y *= 0.95;
      }
      draw();
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [draw]);

  /* ─── TROUVER ÉLÉMENT AU CLIC / HOVER ─── */
  const findNearest = useCallback((clientX, clientY, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const mx = clientX - rect.left;
    const my = clientY - rect.top;
    const { x: rotX, y: rotY } = rotRef.current;

    let bestMonument = null, bestMDist = 18;
    let bestCountry  = null, bestCDist  = 22;

    // Chercher monument
    monuments.forEach(m => {
      const country = COUNTRIES.find(c => c.name === m.country);
      if (!country) return;
      const p3d = latLngToXYZ(country.lat, country.lng);
      const { px, py, visible } = projectPoint(p3d.x, p3d.y, p3d.z, rotX, rotY, CX, CY, R);
      if (!visible) return;
      const d = Math.hypot(px - mx, py - my);
      if (d < bestMDist) { bestMDist = d; bestMonument = m; }
    });

    // Chercher pays
    COUNTRIES.forEach(c => {
      const p3d = latLngToXYZ(c.lat, c.lng);
      const { px, py, visible } = projectPoint(p3d.x, p3d.y, p3d.z, rotX, rotY, CX, CY, R);
      if (!visible) return;
      const d = Math.hypot(px - mx, py - my);
      if (d < bestCDist) { bestCDist = d; bestCountry = c; }
    });

    return { monument: bestMonument, country: bestCountry, mx, my };
  }, [CX, CY, R]);

  /* ─── SOURIS — MOVE ─── */
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging.current) {
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      velRef.current.y = dx * 0.008;
      velRef.current.x = dy * 0.008;
      rotRef.current.y += dx * 0.008;
      rotRef.current.x += dy * 0.008;
      lastMouse.current = { x: e.clientX, y: e.clientY };
      setTooltip(null);
      return;
    }

    const { monument, country } = findNearest(e.clientX, e.clientY, canvas);
    const rect = canvas.getBoundingClientRect();

    if (monument) {
      setTooltip({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        type: 'monument',
        data: monument,
      });
      canvas.style.cursor = 'pointer';
    } else if (country) {
      setTooltip({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        type: 'country',
        data: country,
      });
      canvas.style.cursor = 'pointer';
    } else {
      setTooltip(null);
      canvas.style.cursor = isDragging.current ? 'grabbing' : 'grab';
    }
  }, [findNearest]);

  /* ─── SOURIS — DOWN ─── */
  const handleMouseDown = useCallback((e) => {
    isDragging.current = true;
    autoRotate.current = false;
    velRef.current = { x: 0, y: 0 };
    lastMouse.current = { x: e.clientX, y: e.clientY };
    canvasRef.current.style.cursor = 'grabbing';
  }, []);

  /* ─── SOURIS — UP ─── */
  const handleMouseUp = useCallback((e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    canvasRef.current.style.cursor = 'grab';

    setTimeout(() => {
      if (!isDragging.current && Math.abs(velRef.current.y) < 0.001) {
        autoRotate.current = true;
      }
    }, 800);
  }, []);

  /* ─── SOURIS — LEAVE ─── */
  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
    setTooltip(null);
    setTimeout(() => { autoRotate.current = true; }, 1200);
  }, []);

  /* ─── CLIC ─── */
  const handleClick = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { monument, country } = findNearest(e.clientX, e.clientY, canvas);

    if (monument) {
      onSelectMonument(monument);
      setClickInfo(null);
    } else if (country) {
      const rect = canvas.getBoundingClientRect();
      setClickInfo({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        country,
      });
      setTimeout(() => setClickInfo(null), 3500);
    }
  }, [findNearest, onSelectMonument]);

  /* ─── TOUCH ─── */
  const handleTouchStart = useCallback((e) => {
    isDragging.current = true;
    autoRotate.current = false;
    velRef.current = { x: 0, y: 0 };
    lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const dx = e.touches[0].clientX - lastMouse.current.x;
    const dy = e.touches[0].clientY - lastMouse.current.y;
    velRef.current.y = dx * 0.008;
    velRef.current.x = dy * 0.008;
    rotRef.current.y += dx * 0.008;
    rotRef.current.x += dy * 0.008;
    lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    setTimeout(() => { autoRotate.current = true; }, 1500);
  }, []);

  return (
    <div className="globe-scene">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="globe-canvas"
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
        <div
          className="globe-tooltip"
          style={{ left: tooltip.x + 16, top: tooltip.y - 12 }}
        >
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
              <div className="tt-sub">Capitale : {tooltip.data.capital}</div>
              <div className="tt-hint">Cliquer pour plus d'infos</div>
            </>
          )}
        </div>
      )}

      {/* Info pays au clic */}
      {clickInfo && (
        <div
          className="globe-country-card"
          style={{ left: clickInfo.x, top: clickInfo.y }}
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
              {clickInfo.country.lat.toFixed(2)}°N / {clickInfo.country.lng.toFixed(2)}°E
            </span>
          </div>
        </div>
      )}

      {/* Légende */}
      <div className="globe-legend">
        <span className="globe-legend-item">
          <span className="globe-legend-dot globe-legend-dot--monument" />
          Monuments
        </span>
        <span className="globe-legend-item">
          <span className="globe-legend-dot globe-legend-dot--country" />
          Pays
        </span>
        <span className="globe-legend-sep">·</span>
        <span className="globe-legend-hint">Glisser pour tourner</span>
      </div>
    </div>
  );
};

export default Globe;