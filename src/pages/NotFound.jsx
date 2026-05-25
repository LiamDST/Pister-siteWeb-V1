import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';

const SUGGESTIONS = [
  { to: '/',           label: 'Accueil',    desc: 'Retour à la page principale' },
  { to: '/simulation', label: 'Simulation', desc: 'Estimez votre potentiel de leads' },
  { to: '/tarifs',     label: 'Tarifs',     desc: 'Voir nos offres et crédits' },
  { to: '/contact',    label: 'Contact',    desc: 'Parler à un conseiller' },
];

export default function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15);
  const { ref, visible } = useFadeInOnScroll();

  // Compte à rebours → redirection automatique vers /
  useEffect(() => {
    if (countdown <= 0) { navigate('/'); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, navigate]);

  return (
    <section className="section min-h-[80vh] flex items-center">
      <div className="section-inner w-full">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Icône */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <FileQuestion className="w-10 h-10 text-white/30" />
            </div>
          </div>

          {/* Code 404 */}
          <p className="text-8xl font-black text-emerald-500/20 leading-none mb-4 select-none">404</p>

          <h1 className="text-2xl font-bold mb-3">Page introuvable</h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-md mx-auto mb-8">
            La page que vous cherchez n&apos;existe pas ou a été déplacée.
            Vous serez redirigé vers l&apos;accueil dans{' '}
            <span className="text-emerald-400 font-semibold tabular-nums">{countdown}s</span>.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => navigate(-1)}
              className="btn-outline flex items-center gap-2 text-sm"
            >
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
          <div className="text-left">
            <p className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-4 text-center">
              Pages suggérées
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {SUGGESTIONS.map(s => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="card-glass p-4 flex items-center gap-3 hover:border-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors shrink-0">
                    <Home className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{s.label}</p>
                    <p className="text-xs text-white/40">{s.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
