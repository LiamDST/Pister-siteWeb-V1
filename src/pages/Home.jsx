import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Building2, Zap, BarChart3, Mail, Shield, Star, TrendingUp, Users, CheckCircle2, Play, ChevronRight, Quote, MapPin, Filter, Sparkles, Lock, Activity, Target } from 'lucide-react';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';

function Card3D({ children, className = '' }) {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateZ(10px)`;
    el.style.boxShadow = `${-x * 20}px ${y * 20}px 40px rgba(59,130,246,0.12)`;
  };
  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      ref.current.style.boxShadow = '';
    }
  };
  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className={`transition-all duration-300 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
}

function FadeSection({ children, delay = 0, className = '' }) {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
      {children}
    </div>
  );
}

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { count, ref };
}

function StatCounter({ value, suffix = '', label }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="stat-number text-4xl font-black tabular-nums">{count.toLocaleString('fr-FR')}{suffix}</div>
      <div className="text-white/50 text-sm mt-1">{label}</div>
    </div>
  );
}

const TYPEWRITER_WORDS = [
  'avant vos concurrents',
  'en moins de 5 minutes',
  'grâce à l\'IA',
  'avec les données DPE',
  'sans perdre de temps',
];

function TypewriterText() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true); }, 1800);
      return () => clearTimeout(t);
    }
    const word = TYPEWRITER_WORDS[wordIdx];
    if (!deleting) {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 55);
        return () => clearTimeout(t);
      } else {
        setPaused(true);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setWordIdx(i => (i + 1) % TYPEWRITER_WORDS.length);
      }
    }
  }, [displayed, deleting, paused, wordIdx]);

  return (
    <span className="relative inline-block">
      <span className="stat-number">{displayed}</span>
      <span className="inline-block w-0.5 h-[0.85em] bg-blue-400 ml-0.5 align-middle animate-pulse" />
    </span>
  );
}

const features = [
  {
    icon: Building2, title: 'Ciblage bâtiment précis', color: 'text-blue-400', bg: 'bg-blue-500/10', accent: '#3b82f6',
    desc: 'Identifiez les bâtiments énergivores (DPE E/F/G), anciens ou en travaux dans votre zone géographique.',
    stat: '1,5M', statLabel: 'bâtiments indexés',
    tags: ['DPE E/F/G', 'Surface', 'Année', 'Région'],
    preview: 'ciblage',
  },
  {
    icon: Zap, title: 'Score IA 0–100', color: 'text-amber-400', bg: 'bg-amber-500/10', accent: '#f59e0b',
    desc: 'Chaque lead est scoré de 0 à 100 selon votre ICP. Priorisez les meilleures opportunités instantanément.',
    stat: '94', statLabel: 'score moyen top leads',
    tags: ['Score Match', 'ICP', 'Priorité', 'Auto-tri'],
    preview: 'score',
  },
  {
    icon: Mail, title: 'Emails IA personnalisés', color: 'text-emerald-400', bg: 'bg-emerald-500/10', accent: '#10b981',
    desc: 'Générez des emails ultra-ciblés mentionnant le bâtiment, le DPE, la surface et le décideur direct.',
    stat: '47%', statLabel: "taux d'ouverture moyen",
    tags: ['IA GPT', 'Bâtiment cité', 'Décideur', '1 clic'],
    preview: 'email',
  },
  {
    icon: BarChart3, title: 'Dashboard temps réel', color: 'text-purple-400', bg: 'bg-purple-500/10', accent: '#8b5cf6',
    desc: 'Visualisez vos leads, campagnes et pipeline en direct. KPIs, entonnoir de conversion, alertes.',
    stat: '8h', statLabel: 'économisées/semaine',
    tags: ['KPIs', 'Pipeline', 'Alertes', 'Export'],
    preview: 'dashboard',
  },
  {
    icon: Shield, title: 'RGPD & données certifiées', color: 'text-green-400', bg: 'bg-green-500/10', accent: '#22c55e',
    desc: 'Données issues de BDNB, ADEME et SIRENE — 100% open data françaises. Hébergement France. ISO 27001.',
    stat: '100%', statLabel: 'conformité RGPD',
    tags: ['BDNB', 'ADEME', 'ISO 27001', 'France'],
    preview: 'rgpd',
  },
  {
    icon: TrendingUp, title: 'ROI en 2 semaines', color: 'text-rose-400', bg: 'bg-rose-500/10', accent: '#f43f5e',
    desc: 'Nos clients génèrent 3× plus de RDV qualifiés en moyenne. Résultats mesurables dès la première semaine.',
    stat: '3×', statLabel: 'plus de RDV qualifiés',
    tags: ['ROI rapide', 'Mesurable', 'Cas clients', 'Garanti'],
    preview: 'roi',
  },
];

const steps = [
  { num: '01', title: 'Définissez votre ICP', desc: 'Région, type de bâtiment, classe DPE, surface minimale — configuré en 5 minutes.', icon: '🎯' },
  { num: '02', title: 'Obtenez vos leads qualifiés', desc: 'Pisteur scanne 1,5M de bâtiments et vous livre une liste scorée et priorisée.', icon: '📊' },
  { num: '03', title: 'Lancez votre prospection IA', desc: 'Générez des emails personnalisés et partez à la chasse avec les bons arguments.', icon: '🚀' },
];

const allTestimonials = [
  { name: 'Sarah M.', role: 'Dir. commerciale — IsolPro', text: '47 RDV qualifiés en 3 semaines. Jamais vu ça avec une autre solution.', avatar: 'SM', stars: 5, city: 'Paris' },
  { name: 'Karim B.', role: 'CEO — RénoPlus', text: 'Le score Match est bluffant. On ne perd plus de temps sur des prospects froids.', avatar: 'KB', stars: 5, city: 'Lyon' },
  { name: 'Anne-Sophie L.', role: 'Commerciale — EnergétiK', text: "51% de taux d'ouverture sur les emails IA. 2× mieux que nos envois manuels.", avatar: 'AL', stars: 5, city: 'Nantes' },
  { name: 'Thomas R.', role: 'Directeur — BatiRénov', text: 'ROI positif dès la première semaine. On a signé 3 contrats grâce aux leads Pisteur.', avatar: 'TR', stars: 5, city: 'Bordeaux' },
  { name: 'Julie D.', role: 'Business dev — IsolaFrance', text: "La simulation de marché nous a ouvert les yeux. 12 000 bâtiments cibles rien qu'en PACA.", avatar: 'JD', stars: 5, city: 'Marseille' },
  { name: 'Marc P.', role: 'Fondateur — EnergieClick', text: "L'IA génère des emails tellement personnalisés que les prospects pensent qu'on les connaît.", avatar: 'MP', stars: 5, city: 'Toulouse' },
  { name: 'Céline V.', role: 'Commerciale — ThermoPro', text: "J'ai réduit de 80% le temps passé à chercher des prospects. Pisteur fait tout.", avatar: 'CV', stars: 5, city: 'Lille' },
  { name: 'Alexandre G.', role: 'CEO — GreenBuild', text: 'La data DPE est précise et actuelle. On cible exactement les bâtiments F et G.', avatar: 'AG', stars: 5, city: 'Strasbourg' },
];

function TestimonialCard({ t }) {
  return (
    <div className="card-glass p-5 flex flex-col gap-3 w-72 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: t.stars }).map((_, s) => (
            <Star key={s} size={12} className="text-amber-400 fill-amber-400" />
          ))}
        </div>
        <div className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-lg px-2 py-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-[10px] text-white/50 font-medium">Google</span>
        </div>
      </div>
      <p className="text-white/70 text-xs leading-relaxed italic flex-1">"{t.text}"</p>
      <div className="flex items-center gap-2.5 pt-2 border-t border-white/8">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">{t.avatar}</div>
        <div>
          <p className="text-xs font-bold">{t.name}</p>
          <p className="text-[10px] text-white/35">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Aperçus mini-UI par feature ────────────────────────── */
function FeaturePreview({ type, accent }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 1400);
    return () => clearInterval(t);
  }, []);

  if (type === 'ciblage') {
    const leads = [
      { name: 'Rés. Les Acacias', city: 'Paris 15e', dpe: 'F', score: 94 },
      { name: 'Copro Verdun', city: 'Lyon 3e', dpe: 'E', score: 87 },
      { name: 'Tour Horizon', city: 'Toulouse', dpe: 'G', score: 96 },
    ];
    return (
      <div className="space-y-2 p-1">
        {leads.map((l, i) => (
          <div key={l.name} className={`flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 transition-all duration-500 ${tick % 3 === i ? 'ring-1 ring-blue-500/40 bg-blue-500/8' : ''}`}>
            <MapPin size={11} className="text-blue-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold truncate">{l.name}</p>
              <p className="text-[10px] text-white/35">{l.city}</p>
            </div>
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${l.dpe === 'G' ? 'bg-red-500/20 text-red-300' : l.dpe === 'F' ? 'bg-orange-500/20 text-orange-300' : 'bg-amber-500/20 text-amber-300'}`}>{l.dpe}</span>
            <span className="text-[11px] font-black text-blue-400">{l.score}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-1">
          <div className="h-1 flex-1 bg-white/8 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all duration-700" style={{ width: `${30 + (tick % 4) * 18}%` }} />
          </div>
          <span className="text-[10px] text-white/30">Scan en cours…</span>
        </div>
      </div>
    );
  }

  if (type === 'score') {
    const scores = [96, 91, 87, 82, 74];
    return (
      <div className="space-y-2 p-1">
        {scores.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
              <span className="text-[9px] font-black text-amber-400">#{i + 1}</span>
            </div>
            <div className="flex-1 h-2 bg-white/8 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${s}%`, background: `linear-gradient(90deg, ${accent}, ${accent}88)`, transitionDelay: `${i * 120}ms` }} />
            </div>
            <span className="text-[11px] font-black text-amber-400 w-7 text-right tabular-nums">{s}</span>
          </div>
        ))}
        <div className="flex gap-2 pt-1 flex-wrap">
          {['DPE G', 'Surface', 'Décideur', 'Secteur'].map((t, i) => (
            <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300">{t}</span>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'email') {
    const lines = [
      'Bonjour M. Leclerc,',
      '',
      'Votre bâtiment "Tour Horizon" (DPE G,',
      '4 500 m²) est concerné par les nouvelles',
      'obligations énergétiques 2025…',
    ];
    return (
      <div className="p-1">
        <div className="bg-white/5 rounded-xl p-3 space-y-1 font-mono">
          {lines.map((l, i) => (
            <div key={i} className={`text-[10px] leading-relaxed transition-all duration-300 ${i === 0 ? 'text-emerald-300 font-bold' : 'text-white/50'}`}
              style={{ opacity: tick >= i ? 1 : 0, transform: tick >= i ? 'translateX(0)' : 'translateX(-8px)', transition: 'all 0.4s ease' }}>
              {l || <span className="opacity-0">_</span>}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-white/30">Généré par IA · 0.8s</span>
          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <Sparkles size={9} /> Personnalisé
          </span>
        </div>
      </div>
    );
  }

  if (type === 'dashboard') {
    const bars = [40, 65, 55, 80, 70, 90, 75];
    return (
      <div className="p-1 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {[{ v: '143', l: 'Emails', c: 'text-purple-400' }, { v: '47%', l: 'Ouverture', c: 'text-blue-400' }, { v: '12', l: 'RDV', c: 'text-emerald-400' }].map(({ v, l, c }) => (
            <div key={l} className="bg-white/5 rounded-lg p-2 text-center">
              <p className={`text-sm font-black tabular-nums ${c}`}>{v}</p>
              <p className="text-[9px] text-white/30 mt-0.5">{l}</p>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-1 h-10">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t transition-all duration-700"
              style={{ height: `${h}%`, background: accent + (tick % 7 === i ? 'ff' : '55'), transitionDelay: `${i * 80}ms` }} />
          ))}
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      </div>
    );
  }

  if (type === 'rgpd') {
    const items = [
      { label: 'BDNB vérifiée', ok: true },
      { label: 'ADEME certifiée', ok: true },
      { label: 'Hébergé en France', ok: true },
      { label: 'ISO 27001', ok: true },
    ];
    return (
      <div className="p-1 space-y-2">
        {items.map((item, i) => (
          <div key={item.label} className={`flex items-center gap-2 transition-all duration-300`}
            style={{ opacity: tick > i ? 1 : 0.3, transitionDelay: `${i * 200}ms` }}>
            <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0">
              <CheckCircle2 size={10} className="text-green-400" />
            </div>
            <span className="text-xs text-white/70">{item.label}</span>
          </div>
        ))}
        <div className="mt-2 p-2 bg-green-500/8 border border-green-500/20 rounded-xl flex items-center gap-2">
          <Lock size={12} className="text-green-400" />
          <span className="text-[10px] text-green-300 font-semibold">AES-256 · TLS 1.3 · Sauvegarde 30j</span>
        </div>
      </div>
    );
  }

  if (type === 'roi') {
    const months = [
      { label: 'S1', rdv: 3 },
      { label: 'S2', rdv: 8 },
      { label: 'M1', rdv: 18 },
      { label: 'M2', rdv: 34 },
      { label: 'M3', rdv: 47 },
    ];
    const max = 47;
    return (
      <div className="p-1 space-y-2">
        <div className="space-y-1.5">
          {months.map((m, i) => (
            <div key={m.label} className="flex items-center gap-2">
              <span className="text-[10px] text-white/35 w-5 shrink-0">{m.label}</span>
              <div className="flex-1 h-2 bg-white/8 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${(m.rdv / max) * 100}%`, background: `linear-gradient(90deg, ${accent}, ${accent}99)`, transitionDelay: `${i * 150}ms` }} />
              </div>
              <span className="text-[10px] font-black tabular-nums text-rose-400 w-5 text-right">{m.rdv}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 p-2 bg-rose-500/8 border border-rose-500/20 rounded-xl">
          <Activity size={11} className="text-rose-400" />
          <span className="text-[10px] text-rose-300 font-bold">+47 RDV en 3 mois · ROI ×8</span>
        </div>
      </div>
    );
  }

  return null;
}

/* ─── Section Fonctionnalités interactive ─────────────────── */
function FeatureSection() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const cardRefs = useRef([]);

  const handleMouseMove = (e, idx) => {
    const el = cardRefs.current[idx];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(12px)`;
  };

  const handleMouseLeave = (idx) => {
    const el = cardRefs.current[idx];
    if (el) el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    setHovered(null);
  };

  const activeF = features[active];

  return (
    <section className="section relative overflow-hidden">
      {/* Fond avec grille lumineuse */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 800px 400px at 50% 50%, ${activeF.accent}0a, transparent 70%)`, transition: 'background 0.6s ease' }} />
      </div>

      <div className="section-inner relative z-10">
        <FadeSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 border border-blue-500/25 bg-blue-500/10 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-5">
            <Target size={12} /> Fonctionnalités
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight">
            Tout ce dont vous avez besoin<br />
            <span className="stat-number">pour prospecter comme un pro</span>
          </h2>
          <p className="text-white/45 max-w-xl mx-auto">Cliquez sur une fonctionnalité pour voir l'aperçu en action.</p>
        </FadeSection>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* ── Colonne gauche : liste des features ── */}
          <div className="lg:col-span-2 space-y-2">
            {features.map((f, i) => (
              <FadeSection key={f.title} delay={i * 60}>
                <button
                  ref={el => cardRefs.current[i] = el}
                  onClick={() => setActive(i)}
                  onMouseMove={e => handleMouseMove(e, i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                  className={`w-full text-left transition-all duration-400 rounded-2xl p-4 border relative overflow-hidden group ${
                    active === i
                      ? 'border-opacity-100 bg-white/8 shadow-lg'
                      : 'border-white/8 hover:border-white/15 hover:bg-white/5'
                  }`}
                  style={{
                    borderColor: active === i ? f.accent + '55' : undefined,
                    boxShadow: active === i ? `0 0 30px ${f.accent}15, 0 8px 30px rgba(0,0,0,0.2)` : undefined,
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.25s ease, box-shadow 0.4s ease, background 0.3s ease, border-color 0.3s ease',
                  }}
                >
                  {/* Ligne de gauche active */}
                  <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-all duration-400"
                    style={{ background: f.accent, opacity: active === i ? 1 : 0 }} />

                  <div className="flex items-start gap-3 pl-2">
                    <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center shrink-0 transition-transform duration-300 ${active === i ? 'scale-110' : 'group-hover:scale-105'}`}>
                      <f.icon className={f.color} size={19} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`font-black text-sm transition-colors duration-300 ${active === i ? 'text-white' : 'text-white/70'}`}>{f.title}</p>
                        {/* Stat badge */}
                        <span className={`text-xs font-black tabular-nums transition-all duration-300 ${active === i ? 'opacity-100' : 'opacity-0'}`}
                          style={{ color: f.accent }}>{f.stat}</span>
                      </div>
                      <p className={`text-xs leading-relaxed transition-all duration-300 ${active === i ? 'text-white/60 max-h-20' : 'text-white/35 max-h-0 overflow-hidden'}`}
                        style={{ maxHeight: active === i ? '80px' : '0px', transition: 'max-height 0.4s ease, color 0.3s ease' }}>
                        {f.desc}
                      </p>
                      {/* Tags */}
                      <div className={`flex flex-wrap gap-1 transition-all duration-400 overflow-hidden ${active === i ? 'mt-2.5 max-h-12 opacity-100' : 'max-h-0 opacity-0'}`}>
                        {f.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border"
                            style={{ borderColor: f.accent + '40', background: f.accent + '10', color: f.accent }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              </FadeSection>
            ))}
          </div>

          {/* ── Colonne droite : aperçu animé ── */}
          <div className="lg:col-span-3 lg:sticky lg:top-28">
            <FadeSection delay={200}>
              <div className="relative rounded-3xl overflow-hidden border transition-all duration-600"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`,
                  borderColor: activeF.accent + '35',
                  boxShadow: `0 0 60px ${activeF.accent}10, 0 30px 80px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)`,
                  transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
                }}>

                {/* Barre top avec titre */}
                <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: activeF.accent + '20' }}>
                      <activeF.icon style={{ color: activeF.accent }} size={18} />
                    </div>
                    <div>
                      <p className="font-black text-sm">{activeF.title}</p>
                      <p className="text-[10px] text-white/35">{activeF.statLabel}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black tabular-nums" style={{ color: activeF.accent }}>{activeF.stat}</p>
                  </div>
                </div>

                {/* Zone d'aperçu */}
                <div className="p-5 min-h-[200px]">
                  <FeaturePreview type={activeF.preview} accent={activeF.accent} />
                </div>

                {/* Barre de progression active */}
                <div className="px-5 pb-5">
                  <div className="h-px bg-white/8 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${((active + 1) / features.length) * 100}%`, background: `linear-gradient(90deg, ${activeF.accent}, ${activeF.accent}88)` }} />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-white/25">{active + 1} / {features.length} fonctionnalités</span>
                    <button onClick={() => setActive((active + 1) % features.length)}
                      className="text-[10px] font-semibold flex items-center gap-1 transition-colors hover:text-white/70"
                      style={{ color: activeF.accent }}>
                      Suivante <ChevronRight size={11} />
                    </button>
                  </div>
                </div>

                {/* Scan line déco */}
                <div className="scan-line" style={{ background: `linear-gradient(90deg, transparent, ${activeF.accent}50, transparent)` }} />
              </div>

              {/* Dots de navigation */}
              <div className="flex justify-center gap-2 mt-5">
                {features.map((f, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: active === i ? '24px' : '8px',
                      height: '8px',
                      background: active === i ? f.accent : 'rgba(255,255,255,0.15)',
                    }} />
                ))}
              </div>
            </FadeSection>
          </div>
        </div>

        {/* ── Bannière stat globale ── */}
        <FadeSection delay={300} className="mt-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Building2, val: '1,5M', label: 'bâtiments indexés', color: '#3b82f6' },
              { icon: Zap, val: '< 5 min', label: 'pour les premiers leads', color: '#f59e0b' },
              { icon: Mail, val: '47%', label: "taux d'ouverture moyen", color: '#10b981' },
              { icon: TrendingUp, val: '3×', label: 'plus de RDV qualifiés', color: '#f43f5e' },
            ].map(({ icon: Icon, val, label, color }) => (
              <div key={label} className="card-glass p-5 text-center group hover:-translate-y-1 transition-all duration-300 cursor-default">
                <div className="w-10 h-10 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: color + '18' }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <p className="text-2xl font-black tabular-nums mb-1" style={{ color }}>{val}</p>
                <p className="text-[11px] text-white/40 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Demi-cercles décoratifs */}
      <div className="page-circles" />
      <div className="page-circles-extra" />

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 sm:px-6">
        <div className="hero-glow" />
        <div className="dot-grid opacity-40" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="fade-in-up" style={{ animationDelay: '0ms' }}>
            <span className="badge-pulse inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/25 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Prospection bâtiment intelligente — Données BDNB · ADEME
            </span>
          </div>

          <h1 className="fade-in-up text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight mb-7" style={{ animationDelay: '80ms' }}>
            Trouvez vos prochains<br />
            clients{' '}
            <span className="relative">
              <TypewriterText />
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none">
                <path d="M0 3 Q75 0 150 3 Q225 6 300 3" stroke="url(#ul)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <defs><linearGradient id="ul" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#818cf8" /></linearGradient></defs>
              </svg>
            </span>
          </h1>

          <p className="fade-in-up text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed" style={{ animationDelay: '160ms' }}>
            Pisteur identifie les bâtiments à fort potentiel DPE, qualifie les leads avec l'IA et automatise votre prospection — de la cible à l'email en un clic.
          </p>

          <div className="fade-in-up flex flex-col sm:flex-row gap-4 justify-center mb-16" style={{ animationDelay: '240ms' }}>
            <Link to="/demo" className="btn-accent group text-base px-8 py-4 gap-2">
              <Play size={18} className="group-hover:scale-110 transition-transform" />
              Voir la démo interactive
            </Link>
            <Link to="/simulation" className="btn-outline group text-base px-8 py-4 gap-2">
              Simuler mon marché
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Social proof mini */}
          <div className="fade-in-up flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/40" style={{ animationDelay: '320ms' }}>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['SM','KB','AL','JD'].map(i => (
                  <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white/10 flex items-center justify-center text-[9px] font-bold text-white">{i}</div>
                ))}
              </div>
              <span>+340 professionnels actifs</span>
            </div>
            <div className="w-px h-4 bg-white/15 hidden sm:block" />
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-amber-400 fill-amber-400" />)}
              <span className="ml-1">4.9/5 sur 200+ avis</span>
            </div>
            <div className="w-px h-4 bg-white/15 hidden sm:block" />
            <span>✓ Sans engagement · Essai 14j gratuit</span>
          </div>
        </div>

        {/* Floating UI Card déco */}
        <div className="fade-in relative z-10 max-w-2xl mx-auto mt-14 px-4" style={{ animationDelay: '500ms' }}>
          <div className="card-glass p-5 shadow-2xl shadow-blue-500/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-white/70">Résultats en temps réel</span>
              </div>
              <span className="text-xs text-white/30">Île-de-France · DPE F/G · &gt;1500 m²</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Bâtiments trouvés', value: '2 847', trend: '+12%', color: 'text-blue-400' },
                { label: 'Leads scorés', value: '1 203', trend: '+8%', color: 'text-emerald-400' },
                { label: 'Score moyen', value: '87/100', trend: '↗', color: 'text-amber-400' },
              ].map(({ label, value, trend, color }) => (
                <div key={label} className="bg-white/5 rounded-xl p-3">
                  <p className="text-[10px] text-white/40 mb-1">{label}</p>
                  <p className={`text-lg font-black tabular-nums ${color}`}>{value}</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">{trend}</p>
                </div>
              ))}
            </div>
            <div className="progress-bar-animated mt-4 opacity-60" />
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────── */}
      <section className="relative py-16 px-4 sm:px-6 border-y border-white/8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounter value={52} suffix="M+" label="bâtiments référencés" />
          <StatCounter value={800000} suffix="" label="DPE E/F/G identifiés" />
          <StatCounter value={47} suffix="%" label="taux d'ouverture email IA" />
          <StatCounter value={3} suffix="×" label="plus de RDV en 2 semaines" />
        </div>
      </section>

      {/* ── DÉMO ARCADE ──────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div className="hero-glow opacity-40" />
        <div className="section-inner relative z-10">
          <FadeSection className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/25 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Démonstration interactive
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-3">
              Voyez Pisteur en action<br />
              <span className="stat-number">en moins de 2 minutes</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto text-sm">
              Découvrez comment identifier, scorer et contacter vos leads bâtiment — du paramétrage ICP à l'email IA en un clic.
            </p>
          </FadeSection>

          <FadeSection>
            <div className="relative rounded-2xl overflow-hidden video-glow border border-white/10 bg-black/20">
              {/* Badge en haut */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  Démo live
                </span>
              </div>
              {/* Durée estimée */}
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-black/60 backdrop-blur-md border border-white/15 text-white/70 text-[11px] px-3 py-1.5 rounded-full">
                  ⏱ ~2 min
                </span>
              </div>
              {/* Iframe Arcade */}
              <div className="relative w-full" style={{ paddingBottom: '62.5%' }}>
                <iframe
                  src="https://demo.arcade.software/NadC049RYMZAgOJ6mjFM?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
                  title="Démonstration Pisteur.io"
                  frameBorder="0"
                  loading="lazy"
                  allowFullScreen
                  allow="clipboard-write"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    colorScheme: 'light',
                  }}
                />
              </div>
            </div>

            {/* Légende sous la démo */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6 text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Données réelles BDNB · ADEME
              </span>
              <span className="w-px h-3 bg-white/15 hidden sm:block" />
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Score IA en temps réel
              </span>
              <span className="w-px h-3 bg-white/15 hidden sm:block" />
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Email personnalisé en 1 clic
              </span>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── FONCTIONNALITÉS AVANCÉES ─────────────────── */}
      <FeatureSection />

      {/* ── COMMENT ÇA MARCHE — FUTURISTE ────────────── */}
      <section className="section relative overflow-hidden">
        {/* Fond futuriste */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 900px 500px at 50% 50%, rgba(59,130,246,0.06), transparent 70%)' }} />
          {/* Lignes de grille */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          {/* Particules */}
          {[{top:'15%',left:'8%',delay:'0s'},{top:'60%',left:'92%',delay:'1.5s'},{top:'80%',left:'15%',delay:'3s'},{top:'25%',right:'5%',delay:'2s'}].map((pos, i) => (
            <div key={i} className="particle" style={{...pos, animationDelay: pos.delay}} />
          ))}
        </div>

        <div className="section-inner relative z-10">
          <FadeSection className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">Process</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-3">Opérationnel en <span className="stat-number">3 étapes</span></h2>
            <p className="text-white/45 max-w-md mx-auto text-sm">De zéro à vos premiers leads qualifiés en moins de 10 minutes.</p>
          </FadeSection>

          {/* Connecteur horizontal desktop */}
          <div className="hidden md:flex items-center justify-center gap-0 mb-0 -mb-6 relative z-20 px-24">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center flex-1 last:flex-none">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all duration-500 shrink-0 ${
                  activeStep >= i ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-white/5 border-white/15 text-white/30'
                }`}>{i + 1}</div>
                {i < steps.length - 1 && (
                  <div className="connector-line flex-1 mx-2">
                    <div className="connector-line-fill" style={{ width: activeStep > i ? '100%' : '0%' }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {steps.map((s, i) => (
              <FadeSection key={s.num} delay={i * 120}>
                <div
                  onClick={() => setActiveStep(i)}
                  className={`process-step card-glass p-7 cursor-pointer relative overflow-hidden ${
                    activeStep === i ? 'active border-blue-500/35' : 'hover:border-white/15'
                  }`}
                >
                  {/* Scan line quand actif */}
                  {activeStep === i && <div className="scan-line" />}

                  {/* Numéro holographique */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`process-orb w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black transition-all duration-500 ${
                      activeStep === i
                        ? 'bg-blue-600/20 border border-blue-500/40 text-blue-300 shadow-lg shadow-blue-500/20'
                        : 'bg-white/5 border border-white/10 text-white/20'
                    }`}>
                      {activeStep === i ? <span className="neon-blue">{i + 1}</span> : i + 1}
                    </div>
                    <span className={`text-4xl transition-all duration-500 ${ activeStep === i ? 'scale-125 rotate-[-5deg]' : 'opacity-50' }`}>{s.icon}</span>
                  </div>

                  <h3 className={`font-black text-lg mb-2 transition-all duration-300 ${ activeStep === i ? 'text-white' : 'text-white/70' }`}>{s.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-5">{s.desc}</p>

                  {/* Barre de progression */}
                  <div className="h-px bg-white/8 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${ activeStep === i ? 'w-full' : 'w-0' }`}
                      style={{ background: 'linear-gradient(90deg, #3b82f6, #818cf8, #10b981)' }} />
                  </div>

                  {/* Détails supplémentaires si actif */}
                  <div className={`overflow-hidden transition-all duration-500 ${ activeStep === i ? 'max-h-24 mt-4 opacity-100' : 'max-h-0 opacity-0' }`}>
                    <div className="flex flex-wrap gap-2">
                      {(i === 0 ? ['Région', 'DPE', 'Surface', 'Type'] :
                        i === 1 ? ['Score 0-100', 'BDNB', 'ADEME', 'SIRENE'] :
                        ['Email IA', 'Export CSV', 'CRM sync', 'Pipeline']).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-1 rounded-lg bg-blue-500/15 border border-blue-500/20 text-blue-300">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>

          <FadeSection className="text-center mt-10">
            <Link to="/demo" className="btn-accent gap-2 text-sm">
              Voir la démo complète <ArrowRight size={16} />
            </Link>
          </FadeSection>
        </div>
      </section>

      {/* ── TÉMOIGNAGES CAROUSEL ──────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="section-inner">
          <FadeSection className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Témoignages</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-3">Ce que disent nos clients</h2>
            {/* Badge Google */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-2xl px-5 py-2.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} size={13} className="text-amber-400 fill-amber-400" />)}
                </div>
                <span className="text-sm font-black">4.9</span>
                <span className="text-white/40 text-xs">· 200+ avis Google vérifiés</span>
              </div>
            </div>
          </FadeSection>
        </div>

        {/* Carousel ligne 1 — gauche vers droite */}
        <div className="marquee-container mb-4">
          <div className="testimonial-track">
            {[...allTestimonials, ...allTestimonials].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>

        {/* Carousel ligne 2 — droite vers gauche */}
        <div className="marquee-container">
          <div className="testimonial-track testimonial-track-reverse">
            {[...allTestimonials.slice().reverse(), ...allTestimonials.slice().reverse()].map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>

        <FadeSection className="text-center mt-10">
          <Link to="/contact" className="btn-outline text-sm gap-2">
            Lire tous les avis <ArrowRight size={15} />
          </Link>
        </FadeSection>
      </section>

      {/* ── CTA FINAL ────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div className="hero-glow" />
        <div className="section-inner relative z-10">
          <FadeSection>
            <div className="card-glass p-10 sm:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Lancez-vous</p>
                <h2 className="text-3xl sm:text-5xl font-black mb-5">
                  Prêt à trouver vos<br />
                  <span className="stat-number">100 premiers leads</span> ?
                </h2>
                <p className="text-white/50 mb-10 text-lg max-w-md mx-auto">
                  Essai gratuit 14 jours. Sans carte bancaire. Annulez quand vous voulez.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/simulation" className="btn-accent gap-2 text-base px-8 py-4">
                    Simuler mon marché <ArrowRight size={18} />
                  </Link>
                  <Link to="/contact" className="btn-outline gap-2 text-base px-8 py-4">
                    Parler à l'équipe
                  </Link>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-8 text-xs text-white/30">
                  {['✓ 14 jours gratuits', '✓ Sans carte bancaire', '✓ Support inclus', '✓ Données RGPD'].map(f => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>
    </div>
  );
}
