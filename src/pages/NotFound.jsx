import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Home, ArrowLeft, Search, MapPin, Zap } from 'lucide-react';

/* ── Faux leads "introuvables" qui flashent sur le radar ── */
const GHOST_LEADS = [
  { name: 'Résidence Les Pins', dpe: 'F', angle: 42,  dist: 55 },
  { name: 'Tour Horizon',       dpe: 'G', angle: 128, dist: 70 },
  { name: 'Copro Verdun',       dpe: 'E', angle: 215, dist: 45 },
  { name: 'Imm. Bellevue',      dpe: 'F', angle: 310, dist: 65 },
  { name: 'Résid. Étoile',      dpe: 'G', angle: 75,  dist: 30 },
];

const dpeColor = { G: '#ef4444', F: '#f97316', E: '#f59e0b' };

function RadarCanvas() {
  const canvasRef = useRef(null);
  const angleRef  = useRef(0);
  const frameRef  = useRef(null);
  const pingsRef  = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const S = canvas.width = canvas.height = 320;
    const cx = S / 2, cy = S / 2, R = S * 0.42;

    const draw = () => {
      ctx.clearRect(0, 0, S, S);

      /* ── Cercles concentriques ── */
      [0.25, 0.5, 0.75, 1].forEach(f => {
        ctx.beginPath();
        ctx.arc(cx, cy, R * f, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(59,130,246,0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      /* ── Croix ── */
      ctx.strokeStyle = 'rgba(59,130,246,0.10)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();

      /* ── Sweep (cône lumineux) ── */
      const a = angleRef.current;
      const grad = ctx.createConicalGradient
        ? null
        : (() => {
            const g = ctx.createLinearGradient(0, 0, S, 0);
            return null;
          })();
      // Utilise arc + fillStyle gradient radial pour le cône
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(a);
      const cone = ctx.createRadialGradient(0, 0, 0, 0, 0, R);
      cone.addColorStop(0, 'rgba(59,130,246,0.55)');
      cone.addColorStop(1, 'rgba(59,130,246,0)');
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, R, -0.55, 0, false);
      ctx.closePath();
      ctx.fillStyle = cone;
      ctx.fill();
      ctx.restore();

      /* ── Trail (traîne verte qui s'estompe) ── */
      ctx.save();
      ctx.translate(cx, cy);
      for (let i = 1; i <= 8; i++) {
        ctx.save();
        ctx.rotate(a - i * 0.07);
        const trailGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, R);
        trailGrad.addColorStop(0, `rgba(59,130,246,${0.06 - i * 0.006})`);
        trailGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, R, -0.4, 0, false); ctx.closePath();
        ctx.fillStyle = trailGrad; ctx.fill();
        ctx.restore();
      }
      ctx.restore();

      /* ── Ligne du sweep ── */
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(a);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(R, 0);
      ctx.strokeStyle = 'rgba(59,130,246,0.9)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      /* ── Pings leads ── */
      const aD = ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      GHOST_LEADS.forEach(lead => {
        const la = (lead.angle * Math.PI / 180);
        const diff = ((aD - la) + Math.PI * 2) % (Math.PI * 2);
        if (diff < 0.15) {
          pingsRef.current.push({ lead, life: 1.0, x: cx + Math.cos(la) * R * (lead.dist / 100), y: cy + Math.sin(la) * R * (lead.dist / 100) });
        }
      });

      pingsRef.current = pingsRef.current.filter(p => p.life > 0);
      pingsRef.current.forEach(p => {
        const col = dpeColor[p.lead.dpe] || '#3b82f6';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5 * (2 - p.life), 0, Math.PI * 2);
        ctx.strokeStyle = col + Math.round(p.life * 200).toString(16).padStart(2, '0');
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();
        p.life -= 0.018;
      });

      /* ── Centre ── */
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#3b82f6'; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(59,130,246,0.4)'; ctx.lineWidth = 1; ctx.stroke();

      angleRef.current += 0.025;
      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return <canvas ref={canvasRef} width={320} height={320} className="opacity-90" />;
}

const SUGGESTIONS = [
  { to: '/',           label: 'Accueil',    desc: 'Retour à la page principale',     icon: Home },
  { to: '/simulation', label: 'Simulation', desc: 'Estimez votre potentiel de leads', icon: Search },
  { to: '/tarifs',     label: 'Tarifs',     desc: 'Voir nos offres et crédits',       icon: Zap },
  { to: '/contact',    label: 'Contact',    desc: 'Parler à un conseiller',           icon: MapPin },
];

export default function NotFound() {
  const navigate  = useNavigate();
  const [countdown, setCountdown] = useState(20);
  const [visibleLead, setVisibleLead] = useState(null);

  useEffect(() => {
    if (countdown <= 0) { navigate('/'); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, navigate]);

  /* Flash des leads "détectés" */
  useEffect(() => {
    const cycle = () => {
      const lead = GHOST_LEADS[Math.floor(Math.random() * GHOST_LEADS.length)];
      setVisibleLead(lead);
      setTimeout(() => setVisibleLead(null), 2200);
    };
    cycle();
    const t = setInterval(cycle, 3500);
    return () => clearInterval(t);
  }, []);

  /* Progression du compte à rebours */
  const progress = (countdown / 20) * 100;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ background: 'radial-gradient(ellipse 600px 400px at 50% 40%, rgba(59,130,246,0.07), transparent 70%)' }} className="absolute inset-0" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">

        {/* Radar central */}
        <div className="flex justify-center mb-6 relative">
          <div className="relative">
            <RadarCanvas />
            {/* Badge 404 au-dessus du radar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
              <p className="text-5xl font-black tabular-nums" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(139,92,246,0.15))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'blur(0px)' }}>404</p>
            </div>
          </div>
        </div>

        {/* Toast lead "détecté" */}
        <div className="h-10 flex items-center justify-center mb-4">
          {visibleLead && (
            <div className="flex items-center gap-2 bg-white/6 border border-white/12 backdrop-blur-md px-4 py-2 rounded-full text-xs animate-slideUp">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-white/60">Lead détecté :</span>
              <span className="font-bold text-white">{visibleLead.name}</span>
              <span className={`font-black px-1.5 py-0.5 rounded text-[10px]`} style={{ background: dpeColor[visibleLead.dpe] + '25', color: dpeColor[visibleLead.dpe] }}>
                DPE {visibleLead.dpe}
              </span>
              <span className="text-white/30">— introuvable sur cette page</span>
            </div>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black mb-3">
          Aucun lead trouvé… sur cette URL
        </h1>
        <p className="text-white/50 text-base leading-relaxed max-w-md mx-auto mb-8">
          La page que vous cherchez n'existe pas. Notre radar tourne en continu, mais pas ici.
          Redirection dans{' '}
          <span className="text-blue-400 font-black tabular-nums">{countdown}s</span>.
        </p>

        {/* Barre de progression compte à rebours */}
        <div className="w-48 mx-auto h-1 bg-white/8 rounded-full overflow-hidden mb-8">
          <div className="h-full rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #3b82f6, #818cf8)' }} />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button onClick={() => navigate(-1)} className="btn-outline flex items-center gap-2 text-sm">
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
          <Link to="/" className="btn-primary flex items-center gap-2 text-sm">
            <Home className="w-4 h-4" /> Accueil
          </Link>
          <Link to="/simulation" className="btn-accent flex items-center gap-2 text-sm">
            <Search className="w-4 h-4" /> Simuler mon marché
          </Link>
        </div>

        {/* Suggestions */}
        <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto">
          {SUGGESTIONS.map(s => (
            <Link key={s.to} to={s.to}
              className="card-glass p-4 flex items-center gap-3 hover:border-blue-500/30 hover:-translate-y-0.5 transition-all duration-200 group text-left">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-200 shrink-0">
                <s.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{s.label}</p>
                <p className="text-xs text-white/40">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
