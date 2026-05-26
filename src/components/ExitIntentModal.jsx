import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { X, Zap, Building2, TrendingUp } from 'lucide-react';

/**
 * Modale exit-intent :
 * - Se déclenche quand la souris sort par le haut de la fenêtre
 * - Seulement sur desktop (hover:none = touch → pas de déclenchement)
 * - Ne s'affiche qu'une fois par session
 * - Délai minimum de 8 secondes sur la page avant de pouvoir se déclencher
 */
export default function ExitIntentModal() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [canTrigger, setCanTrigger] = useState(false);

  // Délai minimal de 8s avant activation
  useEffect(() => {
    const t = setTimeout(() => setCanTrigger(true), 8000);
    return () => clearTimeout(t);
  }, []);

  const handleMouseLeave = useCallback((e) => {
    if (!canTrigger || dismissed) return;
    if (e.clientY <= 5 && e.relatedTarget === null) {
      setVisible(true);
      setDismissed(true); // une seule fois
    }
  }, [canTrigger, dismissed]);

  useEffect(() => {
    // Seulement sur appareils avec souris
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [handleMouseLeave]);

  const close = useCallback(() => setVisible(false), []);

  // Fermeture sur Escape
  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible, close]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg card-glass border-blue-500/20 p-8 animate-slideUp">
        <button
          onClick={close}
          aria-label="Fermer"
          className="absolute top-4 right-4 text-white/30 hover:text-white/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">Avant de partir</p>
            <h2 id="exit-intent-title" className="text-lg font-bold leading-snug">
              Simulez votre marché en 60 secondes
            </h2>
          </div>
        </div>

        <p className="text-sm text-white/60 leading-relaxed mb-6">
          Entrez votre zone géographique et votre secteur — Pisteur vous montre
          instantanément combien de bâtiments correspondent à votre ICP.
        </p>

        {/* Mini-stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: <Building2 className="w-4 h-4" />, value: '1,2M+', label: 'bâtiments' },
            { icon: <TrendingUp className="w-4 h-4" />, value: '×3',     label: 'de CA moyen' },
            { icon: <Zap        className="w-4 h-4" />, value: '8h',     label: 'leads livrés' },
          ].map(({ icon, value, label }) => (
            <div key={label} className="bg-white/5 rounded-xl p-3 text-center border border-white/8">
              <div className="flex justify-center text-blue-400 mb-1">{icon}</div>
              <p className="text-base font-black text-white">{value}</p>
              <p className="text-[10px] text-white/40">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Link
            to="/simulation"
            onClick={close}
            className="btn-primary flex-1 text-center text-sm"
          >
            Simuler mon marché gratuitement
          </Link>
          <button
            onClick={close}
            className="px-4 py-2.5 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            Plus tard
          </button>
        </div>
      </div>
    </div>
  );
}
