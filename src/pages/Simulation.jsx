import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  Loader2, CheckCircle2, Building2, MapPin,
  TrendingUp, Mail, ArrowRight, ChevronLeft,
  Users, Zap, BarChart3, Ruler
} from 'lucide-react';

/* ─── Data ───────────────────────────────────────────── */
const regions = [
  'Île-de-France', 'Auvergne-Rhône-Alpes', 'Occitanie',
  'Nouvelle-Aquitaine', 'Bretagne', 'Grand Est',
  'Normandie', 'Hauts-de-France', 'Pays de la Loire',
  "Provence-Alpes-Côte d'Azur",
  'Centre-Val de Loire', 'Bourgogne-Franche-Comté',
];

const buildingTypes = [
  { value: 'Résidentiel collectif', icon: '🏢' },
  { value: 'Tertiaire', icon: '🏬' },
  { value: 'Logement social', icon: '🏘️' },
  { value: 'Établissement public', icon: '🏛️' },
  { value: 'Commercial', icon: '🛒' },
];

const dpeGrades = [
  { label: 'A', color: 'bg-[#009A44] text-white', border: 'border-[#009A44]' },
  { label: 'B', color: 'bg-[#51B948] text-white', border: 'border-[#51B948]' },
  { label: 'C', color: 'bg-[#AECF45] text-black', border: 'border-[#AECF45]' },
  { label: 'D', color: 'bg-[#F7EC00] text-black', border: 'border-[#F7EC00]' },
  { label: 'E', color: 'bg-[#F0A500] text-black', border: 'border-[#F0A500]' },
  { label: 'F', color: 'bg-[#E8612A] text-white', border: 'border-[#E8612A]' },
  { label: 'G', color: 'bg-[#C9282D] text-white', border: 'border-[#C9282D]' },
];

const fakeleads = [
  { city: 'Paris 15e', type: 'Résidentiel collectif', dpe: 'F', surface: '2 340 m²' },
  { city: 'Lyon 3e', type: 'Résidentiel collectif', dpe: 'E', surface: '1 870 m²' },
  { city: 'Nantes Centre', type: 'Tertiaire', dpe: 'G', surface: '4 100 m²' },
];

/* ─── Compute ─────────────────────────────────────────── */
function computeResult({ region, buildingType, dpeSelected, minSurface }) {
  const base = {
    'Île-de-France': 8400, 'Auvergne-Rhône-Alpes': 4200, 'Occitanie': 3100,
    'Nouvelle-Aquitaine': 2900, 'Bretagne': 1800, 'Grand Est': 2200,
    'Normandie': 1600, 'Hauts-de-France': 2500, 'Pays de la Loire': 2100,
    "Provence-Alpes-Côte d'Azur": 3600,
    'Centre-Val de Loire': 1400, 'Bourgogne-Franche-Comté': 1200,
  }[region] || 3000;
  const typeMult = {
    'Résidentiel collectif': 1, 'Tertiaire': 0.6, 'Logement social': 0.4,
    'Établissement public': 0.3, 'Commercial': 0.5,
  }[buildingType] || 0.8;
  const dpeMult = Math.max(0.1, dpeSelected.length * 0.3);
  const surfMult = Math.max(0.2, 1 - (parseInt(minSurface) || 0) / 10000);
  return Math.round(base * typeMult * dpeMult * surfMult);
}

/* ─── Counter animation ───────────────────────────────── */
function useCountUp(target, duration = 900) {
  const [count, setCount] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const from = prev.current;
    prev.current = target;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(from + (target - from) * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}
/* ─── Carte SVG France — paths géographiquement fidèles ─── */
/* viewBox="0 0 600 660" — projection Lambert-93 simplifiée */
const regionMeta = {
  'Hauts-de-France':             { leads: 2500, labelX: 308, labelY: 60,  short: 'Hauts-de-France' },
  'Normandie':                    { leads: 1600, labelX: 162, labelY: 88,  short: 'Normandie' },
  'Île-de-France':                { leads: 8400, labelX: 300, labelY: 120, short: 'Île-de-France' },
  'Grand Est':                    { leads: 2200, labelX: 424, labelY: 90,  short: 'Grand Est' },
  'Bretagne':                     { leads: 1800, labelX: 90,  labelY: 156, short: 'Bretagne' },
  'Pays de la Loire':             { leads: 2100, labelX: 168, labelY: 178, short: 'Pays de la Loire' },
  'Centre-Val de Loire':          { leads: 1400, labelX: 268, labelY: 182, short: 'Centre-VdL' },
  'Bourgogne-Franche-Comté':     { leads: 1200, labelX: 375, labelY: 186, short: 'Bourgogne-FC' },
  'Nouvelle-Aquitaine':           { leads: 2900, labelX: 112, labelY: 270, short: 'Nouvelle-Acq.' },
  'Auvergne-Rhône-Alpes':        { leads: 4200, labelX: 355, labelY: 250, short: 'Auvergne-RA' },
  'Occitanie':                    { leads: 3100, labelX: 214, labelY: 336, short: 'Occitanie' },
  "Provence-Alpes-Côte d'Azur":  { leads: 3600, labelX: 441, labelY: 334, short: 'PACA' },
};

/* Chemins SVG France — tracés réels adaptés viewBox "0 0 500 520" */
const regionPaths = {
  'Hauts-de-France':
    'M232 34 C244 28 268 24 300 22 C328 20 354 26 372 36 C384 44 388 54 382 66 C374 80 354 88 328 94 C308 98 284 100 262 96 C244 92 234 80 230 66 C228 56 228 42 232 34Z',
  'Normandie':
    'M84 76 C108 62 148 54 186 52 C214 50 232 56 234 68 C234 80 218 94 196 106 C178 116 156 124 132 122 C110 120 88 110 78 96 C72 86 74 80 84 76Z',
  'Île-de-France':
    'M262 96 C276 90 296 90 314 96 C330 102 340 114 338 126 C336 138 322 146 304 148 C286 150 270 144 262 134 C254 124 252 108 262 96Z',
  'Grand Est':
    'M372 36 C394 28 428 24 460 32 C482 38 494 54 490 74 C486 96 468 116 448 130 C430 142 408 148 390 142 C372 136 358 118 350 96 C344 78 350 60 360 48 C364 42 368 38 372 36Z',
  'Bretagne':
    'M32 134 C52 122 84 118 112 122 C134 126 148 140 144 156 C140 170 124 182 104 188 C84 194 60 190 44 178 C30 168 26 152 32 134Z',
  'Pays de la Loire':
    'M112 122 C132 118 156 118 180 122 C202 126 220 136 232 148 C242 160 242 176 232 192 C222 208 204 220 182 228 C160 236 136 234 118 222 C100 210 90 190 90 168 C90 148 100 130 112 122Z',
  'Centre-Val de Loire':
    'M232 148 C248 140 268 138 288 144 C308 150 322 164 322 180 C322 196 310 212 292 220 C274 228 252 228 236 220 C220 212 212 196 214 180 C216 164 222 154 232 148Z',
  'Bourgogne-Franche-Comté':
    'M338 126 C358 118 382 118 402 130 C422 142 434 162 432 184 C430 206 416 224 396 234 C376 244 352 244 336 234 C320 224 314 204 316 184 C318 162 326 136 338 126Z',
  'Nouvelle-Aquitaine':
    'M90 168 C102 162 122 162 140 168 C158 174 170 188 174 206 C184 226 188 252 178 280 C168 306 148 330 124 346 C102 360 76 366 58 356 C40 346 36 322 40 296 C44 268 58 240 72 218 C80 200 84 178 90 168Z',
  'Auvergne-Rhône-Alpes':
    'M322 180 C340 170 362 168 384 176 C406 186 422 206 424 230 C426 254 414 278 396 296 C378 312 354 322 330 320 C308 318 290 304 284 284 C278 262 286 238 296 218 C306 200 312 188 322 180Z',
  'Occitanie':
    'M174 280 C190 268 212 264 232 270 C252 276 264 294 266 316 C268 340 256 364 238 382 C220 398 196 406 174 402 C152 398 136 384 126 366 C116 348 120 326 128 306 C136 288 158 290 174 280Z',
  "Provence-Alpes-Côte d'Azur":
    'M396 296 C416 282 444 278 466 288 C488 298 498 320 494 344 C490 364 474 378 454 382 C434 386 412 378 398 362 C384 346 380 322 384 302 C388 298 392 296 396 296Z',
};

/* Couleur de chaleur selon le nombre de leads */
function leadColor(leads, isSelected, isHovered) {
  if (isSelected) return { fill: 'rgba(59,130,246,0.42)', stroke: '#3b82f6', sw: 2 };
  if (isHovered)  return { fill: 'rgba(59,130,246,0.22)', stroke: 'rgba(59,130,246,0.8)', sw: 1.5 };
  // heatmap subtil : plus de leads = teinte bleue légère
  const intensity = Math.min((leads - 1000) / 8000, 1);
  const alpha = 0.06 + intensity * 0.10;
  return {
    fill: `rgba(59,130,246,${alpha.toFixed(2)})`,
    stroke: 'rgba(99,120,180,0.30)',
    sw: 0.8,
  };
}

function FranceMap({ selected, onSelect }) {
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);

  const handleMouseMove = (e, name) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setHovered(name);
  };

  return (
    <div className="relative select-none">
      {/* Titre */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-white/50">Cliquez sur une région</p>
        {selected && (
          <span className="text-xs font-black text-blue-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {selected}
          </span>
        )}
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 520 420"
        className="w-full h-auto drop-shadow-sm"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          <filter id="rglow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="rselected" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(59,130,246,0.04)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </radialGradient>
        </defs>

        {/* Halo fond */}
        <ellipse cx="270" cy="300" rx="260" ry="240" fill="url(#bgGrad)" />

        {Object.entries(regionPaths).map(([name, path]) => {
          const isSelected = selected === name;
          const isHovered  = hovered === name;
          const meta       = regionMeta[name];
          if (!meta) return null;
          const { fill, stroke, sw } = leadColor(meta.leads, isSelected, isHovered);
          const active = isSelected || isHovered;

          return (
            <g key={name}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelect(name)}
              onMouseMove={e => handleMouseMove(e, name)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Ombre portée si actif */}
              {active && (
                <path d={path} fill="rgba(59,130,246,0.08)"
                  transform="translate(2,4)"
                  style={{ filter: 'blur(6px)' }} />
              )}

              {/* Région principale */}
              <path
                d={path}
                fill={fill}
                stroke={stroke}
                strokeWidth={sw}
                strokeLinejoin="round"
                style={{
                  transition: 'fill 0.2s ease, stroke 0.2s ease, filter 0.2s ease',
                  filter: isSelected ? 'url(#rselected)' : isHovered ? 'url(#rglow)' : 'none',
                }}
              />

              {/* Label région — toujours visible */}
              <text
                x={meta.labelX}
                y={meta.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={isSelected ? '9' : '7.5'}
                fontWeight={active ? '800' : '600'}
                fontFamily="system-ui, sans-serif"
                fill={isSelected ? '#93c5fd' : isHovered ? 'rgba(147,197,253,0.9)' : 'rgba(150,160,200,0.55)'}
                style={{ transition: 'all 0.2s ease', pointerEvents: 'none', letterSpacing: '0.3px' }}
              >
                {meta.short}
              </text>

              {/* Pastille leads — visible au hover/select */}
              {active && (
                <g style={{ pointerEvents: 'none' }}>
                  {/* Glow ring */}
                  {isSelected && (
                    <>
                      <circle cx={meta.labelX} cy={meta.labelY} r="18"
                        fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1">
                        <animate attributeName="r" values="18;28;18" dur="2.2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0;0.5" dur="2.2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={meta.labelX} cy={meta.labelY} r="13"
                        fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="1">
                        <animate attributeName="r" values="13;22;13" dur="2.2s" begin="0.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.4;0;0.4" dur="2.2s" begin="0.4s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                  {/* Badge */}
                  <circle cx={meta.labelX} cy={meta.labelY} r="13"
                    fill={isSelected ? '#2563eb' : 'rgba(59,130,246,0.75)'}
                    style={{ filter: 'url(#rselected)' }} />
                  <text x={meta.labelX} y={meta.labelY} textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontSize="6.5" fontWeight="800" fontFamily="system-ui">
                    {meta.leads >= 1000 ? `${(meta.leads/1000).toFixed(1)}k` : meta.leads}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip flottant positionné à la souris */}
      {hovered && regionMeta[hovered] && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: Math.min(tooltip.x + 12, 300),
            top: tooltip.y - 42,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="bg-gray-900/95 backdrop-blur-md border border-blue-500/30 rounded-xl px-3.5 py-2.5 shadow-xl shadow-blue-500/10 animate-slideUp whitespace-nowrap">
            <p className="text-[11px] font-black text-white mb-0.5">{hovered}</p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-blue-300 font-bold">{regionMeta[hovered].leads.toLocaleString('fr-FR')} leads</span>
              <span className="text-[10px] text-white/30">·</span>
              <span className="text-[10px] text-white/50">Cliquez pour sélectionner</span>
            </div>
          </div>
        </div>
      )}

      {/* Légende heatmap */}
      <div className="flex items-center justify-between mt-3 px-1">
        <span className="text-[10px] text-white/25">Faible densité</span>
        <div className="flex gap-0.5">
          {[0.06, 0.09, 0.12, 0.15, 0.18, 0.22, 0.30, 0.42].map((a, i) => (
            <div key={i} className="w-4 h-1.5 rounded-sm" style={{ background: `rgba(59,130,246,${a})` }} />
          ))}
        </div>
        <span className="text-[10px] text-white/25">Forte densité</span>
      </div>
    </div>
  );
}
/* ─── Steps indicator ─────────────────────────────────── */
function StepsBar({ step }) {
  const steps = ['Localisation', 'Bâtiment & DPE', 'Contact'];
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 ${
              i < step
                ? 'bg-blue-500 border-blue-500 text-white'
                : i === step
                  ? 'bg-blue-500/20 border-blue-500/60 text-blue-400'
                  : 'bg-white/5 border-white/15 text-white/30'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`text-[10px] whitespace-nowrap ${i === step ? 'text-blue-400' : 'text-white/30'}`}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-px mb-4 transition-all duration-500 ${i < step ? 'bg-blue-500/50' : 'bg-white/10'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── ICP Summary — utilise les CSS vars icp-* ────────── */
function ICPSummary({ form, liveCount }) {
  const buildingTypeIcon = buildingTypes.find(t => t.value === form.buildingType)?.icon ?? '🏢';

  return (
    <div className="icp-card">
      {/* Header */}
      <div className="icp-header">
        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          Récapitulatif de votre ICP
        </span>
      </div>

      {/* Lignes */}
      <div>
        {/* Région */}
        <div className="icp-divider flex items-center gap-3 px-4 py-3">
          <div className="icp-icon">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="icp-label">Région</p>
            <p className="icp-value">{form.region}</p>
          </div>
        </div>

        {/* Type */}
        <div className="icp-divider flex items-center gap-3 px-4 py-3">
          <div className="icp-icon text-base leading-none">
            {buildingTypeIcon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="icp-label">Type de bâtiment</p>
            <p className="icp-value">{form.buildingType}</p>
          </div>
        </div>

        {/* DPE */}
        <div className="icp-divider flex items-center gap-3 px-4 py-3">
          <div className="icp-icon-amber">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="icp-label">DPE ciblés</p>
            <div className="flex items-center gap-1 flex-wrap mt-1">
              {form.dpeSelected.length > 0
                ? form.dpeSelected.map(d => {
                    const grade = dpeGrades.find(g => g.label === d);
                    return (
                      <span
                        key={d}
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[11px] font-black ${grade?.color}`}
                      >
                        {d}
                      </span>
                    );
                  })
                : <span className="text-sm" style={{ color: 'var(--icp-label)' }}>—</span>
              }
            </div>
          </div>
        </div>

        {/* Surface */}
        <div className="icp-divider flex items-center gap-3 px-4 py-3">
          <div className="icp-icon">
            <Ruler className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="icp-label">Surface minimale</p>
            <p className="icp-value">
              {parseInt(form.minSurface) === 0
                ? 'Toutes surfaces'
                : `≥ ${parseInt(form.minSurface).toLocaleString('fr-FR')} m²`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Footer — estimation */}
      <div className="icp-footer">
        <div>
          <p className="icp-label">Estimation</p>
          <p className="text-xl font-black text-blue-400 tabular-nums leading-tight">
            {liveCount.toLocaleString('fr-FR')}
            <span className="text-sm font-semibold text-blue-400/70 ml-1">bâtiments</span>
          </p>
        </div>
        <div className="text-right">
          <p className="icp-source">Source BDNB · ADEME</p>
          <p className="icp-source" style={{ opacity: 0.6 }}>Données 2024</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Live Preview Panel ──────────────────────────────── */
function PreviewPanel({ form, liveCount, status, result }) {
  const animated = useCountUp(liveCount);

  if (status === 'loading') {
    return (
      <div className="card-glass p-8 flex flex-col items-center justify-center text-center gap-5 min-h-[420px]">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
          <div className="absolute inset-0 rounded-full bg-blue-400/10 animate-ping" />
        </div>
        <div className="space-y-1">
          <p className="text-white/70 text-sm font-medium">Analyse en cours…</p>
          <p className="text-white/35 text-xs">Scan de 1 500 000 bâtiments français</p>
        </div>
        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-blue-400 rounded-full animate-[progress_0.8s_ease-out_forwards]" style={{ width: '80%' }} />
        </div>
      </div>
    );
  }

  if (status === 'done' && result !== null) {
    return (
      <div className="card-glass p-8 flex flex-col items-center text-center gap-5 min-h-[420px]">
        <CheckCircle2 className="w-10 h-10 text-blue-400" />
        <div>
          <p className="text-6xl font-black text-blue-400 tabular-nums">{result.toLocaleString('fr-FR')}</p>
          <p className="text-white/60 text-sm mt-2">bâtiments correspondent à vos critères</p>
        </div>
        <div className="w-full space-y-2">
          {fakeleads.map((l, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2 text-left">
              <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{l.city}</p>
                <p className="text-[11px] text-white/40 truncate">{l.type} · {l.surface}</p>
              </div>
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded shrink-0 ${dpeGrades.find(d => d.label === l.dpe)?.color}`}>{l.dpe}</span>
            </div>
          ))}
          <p className="text-[10px] text-white/25 mt-1">Exemples de leads — données illustratives</p>
        </div>
        <div className="grid grid-cols-3 gap-3 w-full">
          {[['~' + Math.round(result * 0.08), 'RDV/mois estimés'], ['×3', 'plus de CA'], ['8h', 'économisées/sem']].map(([v, l]) => (
            <div key={l} className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
              <p className="text-lg font-black text-blue-400">{v}</p>
              <p className="text-[10px] text-white/45 leading-tight mt-0.5">{l}</p>
            </div>
          ))}
        </div>
        <Link to="/contact" className="btn-accent w-full text-center text-sm">
          Obtenir mes premiers leads →
        </Link>
        <p className="text-[10px] text-white/30">Estimation BDNB · ADEME. Sans engagement.</p>
      </div>
    );
  }

  return (
    <div className="card-glass p-8 flex flex-col gap-6 min-h-[420px]">
      <div className="text-center">
        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Bâtiments estimés</p>
        {form.region ? (
          <p className="text-5xl font-black text-blue-400 tabular-nums transition-all duration-300">
            {animated.toLocaleString('fr-FR')}
          </p>
        ) : (
          <p className="text-4xl font-black tabular-nums" style={{ background: 'linear-gradient(135deg, #3b82f6, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            1,5 Millions
          </p>
        )}
        <p className="text-xs text-white/30 mt-1">
          {form.region ? 'mis à jour en temps réel' : 'bâtiments dans notre base nationale'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <MapPin className="w-4 h-4 text-blue-400 mx-auto mb-1" />
          <p className="text-xs font-semibold text-white truncate">{form.region || '—'}</p>
          <p className="text-[10px] text-white/35">Région</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <Building2 className="w-4 h-4 text-blue-400 mx-auto mb-1" />
          <p className="text-xs font-semibold text-white truncate">{form.buildingType}</p>
          <p className="text-[10px] text-white/35">Type</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
          <p className="text-xs font-semibold text-white">{form.dpeSelected.length > 0 ? form.dpeSelected.join(', ') : '—'}</p>
          <p className="text-[10px] text-white/35">DPE ciblés</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <BarChart3 className="w-4 h-4 text-blue-400 mx-auto mb-1" />
          <p className="text-xs font-semibold text-white">&gt; {parseInt(form.minSurface).toLocaleString('fr-FR')} m²</p>
          <p className="text-[10px] text-white/35">Surface min.</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] text-white/30 uppercase tracking-wider">Exemples de leads</p>
        {fakeleads.map((l, i) => (
          <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2 opacity-60">
            <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{l.city}</p>
              <p className="text-[11px] text-white/40 truncate">{l.type} · {l.surface}</p>
            </div>
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded shrink-0 ${dpeGrades.find(d => d.label === l.dpe)?.color}`}>{l.dpe}</span>
          </div>
        ))}
        <p className="text-[10px] text-white/20">Lancez la simulation pour voir vos vrais leads</p>
      </div>
    </div>
  );
}

/* ─── Main ────────────────────────────────────────────── */
export default function Simulation() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    region: '',
    buildingType: buildingTypes[0].value,
    dpeSelected: ['E', 'F', 'G'],
    minSurface: 500,
    email: '',
  });
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('idle');

  const liveCount = form.region ? computeResult(form) : 0;

  const toggleDpe = (label) => {
    setForm(f => ({
      ...f,
      dpeSelected: f.dpeSelected.includes(label)
        ? f.dpeSelected.filter(d => d !== label)
        : [...f.dpeSelected, label],
    }));
  };

  const handleSimulate = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const count = computeResult(form);
    await new Promise(r => setTimeout(r, 900));

    if (form.email) {
      await supabase.from('simulations').insert([{
        email: form.email, region: form.region,
        building_type: form.buildingType,
        dpe: form.dpeSelected.join('+'),
        min_surface: form.minSurface,
        result_count: count,
        created_at: new Date().toISOString(),
      }]).catch(console.error);
    }

    setResult(count);
    setStatus('done');
  };

  return (
    <div className="relative min-h-screen">
      <div className="page-circles" />
      <div className="page-circles-extra" />
    <section className="section relative pt-28">
      <div className="hero-glow opacity-50" />
      <div className="section-inner max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Simulation de marché — BDNB · ADEME
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Estimez votre <span className="stat-number">potentiel de marché</span></h1>
          <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
            Renseignez votre ICP et découvrez combien de bâtiments correspondent à votre profil cible — en temps réel.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-white/30">
            <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> 1,5M bâtiments analysés</span>
            <span className="w-px h-3 bg-white/15" />
            <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Données BDNB · ADEME</span>
            <span className="w-px h-3 bg-white/15" />
            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 100+ clients actifs</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Formulaire */}
          <div>
            <StepsBar step={step} />

            <form onSubmit={handleSimulate} className="card-glass p-6 space-y-6">

              {/* Étape 0 : Région — Carte SVG France */}
              {step === 0 && (
                <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                  <div>
                    <label className="text-xs text-white/50 mb-3 block font-medium flex items-center justify-between">
                      <span>Sélectionnez votre région cible</span>
                      {form.region && <span className="text-blue-300 font-bold">{form.region}</span>}
                    </label>
                    <FranceMap selected={form.region} onSelect={r => setForm(f => ({ ...f, region: r }))} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={!form.region}
                    className="btn-accent w-full flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continuer <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Étape 1 : Type + DPE + Surface */}
              {step === 1 && (
                <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">
                  <div>
                    <label className="text-xs text-white/50 mb-2 block font-medium">Type de bâtiment</label>
                    <div className="space-y-2">
                      {buildingTypes.map(t => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, buildingType: t.value }))}
                          className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium border transition-all duration-200 text-left flex items-center gap-2 ${
                            form.buildingType === t.value
                              ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                              : 'bg-white/3 border-white/10 text-white/50 hover:border-white/25 hover:text-white/70'
                          }`}
                        >
                          <span>{t.icon}</span> {t.value}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-white/50 mb-2 block font-medium">
                      DPE ciblés{' '}
                      <span className="text-white/25 font-normal">(sélection multiple)</span>
                    </label>
                    <div className="flex gap-1.5 flex-wrap">
                      {dpeGrades.map(({ label, color, border }) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => toggleDpe(label)}
                          className={`w-10 h-10 rounded-xl text-sm font-black border-2 transition-all duration-200 ${
                            form.dpeSelected.includes(label)
                              ? `${color} ${border} scale-110 shadow-lg`
                              : 'bg-white/5 border-white/10 text-white/30 hover:border-white/30'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    {form.dpeSelected.length === 0 && (
                      <p className="text-[11px] text-red-400/70 mt-1">Sélectionnez au moins un DPE</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-white/50 mb-2 flex justify-between">
                      <span className="font-medium">Surface minimale</span>
                      <span className="text-blue-400 font-bold tabular-nums">{parseInt(form.minSurface).toLocaleString('fr-FR')} m²</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={5000}
                      step={100}
                      value={form.minSurface}
                      onChange={e => setForm(f => ({ ...f, minSurface: parseInt(e.target.value) }))}
                      className="w-full accent-blue-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-white/25 mt-1">
                      <span>0 m²</span>
                      <span>5 000 m²</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="btn-outline flex items-center gap-1 text-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={form.dpeSelected.length === 0}
                      className="btn-accent flex-1 flex items-center justify-center gap-2 disabled:opacity-40"
                    >
                      Continuer <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Étape 2 : Récap + Email + Submit */}
              {step === 2 && (
                <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">

                  <ICPSummary form={form} liveCount={liveCount} />

                  <div>
                    <label className="text-xs text-white/50 mb-2 flex items-center gap-1.5 font-medium">
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                      Recevez votre simulation par email
                      <span className="text-white/25 font-normal">(optionnel)</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="jean@entreprise.fr"
                      className="form-input"
                    />
                    <p className="text-[10px] text-white/25 mt-1">Gratuit · Sans CB · Résultats détaillés</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-outline flex items-center gap-1 text-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="submit"
                      disabled={status === 'loading' || form.dpeSelected.length === 0}
                      className="btn-accent flex-1 flex items-center justify-center gap-2 disabled:opacity-60 text-sm"
                    >
                      {status === 'loading' ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Calcul…</>
                      ) : (
                        <>Voir mes {liveCount.toLocaleString('fr-FR')} bâtiments cibles <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Preview panel */}
          <div className="sticky top-24">
            <PreviewPanel form={form} liveCount={liveCount} status={status} result={result} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes progress { from { width: 0%; } to { width: 80%; } }
      `}</style>
    </section>
    </div>
  );
}
