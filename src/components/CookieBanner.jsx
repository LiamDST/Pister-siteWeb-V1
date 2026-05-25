import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X, ChevronDown, ChevronUp, Shield, BarChart2, Megaphone } from 'lucide-react';

const STORAGE_KEY = 'pisteur_cookie_consent';

const defaultPrefs = {
  necessary: true,   // toujours actif
  analytics: false,
  marketing: false,
};

export default function CookieBanner() {
  const [visible, setVisible]       = useState(false);
  const [expanded, setExpanded]     = useState(false);
  const [prefs, setPrefs]           = useState(defaultPrefs);

  // Afficher seulement si pas encore de consentement stocké
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (accepted) => {
    const finalPrefs = accepted
      ? { necessary: true, analytics: true, marketing: true }
      : { ...prefs, necessary: true };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(finalPrefs)); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Préférences cookies"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[9999] animate-slideUp"
    >
      <div className="bg-[#0f1623] border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <Cookie className="w-5 h-5 text-emerald-400" />
            <p className="font-semibold text-sm text-white">Vos préférences cookies</p>
          </div>
          <button
            onClick={() => save(false)}
            aria-label="Refuser et fermer"
            className="text-white/30 hover:text-white/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <div className="px-5 pb-3">
          <p className="text-xs text-white/55 leading-relaxed">
            Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic.
            Consultez notre{' '}
            <Link
              to="/confidentialite"
              className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
            >
              politique de confidentialité
            </Link>.
          </p>
        </div>

        {/* Détails personnalisés (accordéon) */}
        <div className="px-5 pb-3">
          <button
            onClick={() => setExpanded(o => !o)}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            Personnaliser
          </button>

          {expanded && (
            <div className="mt-3 space-y-3">
              {/* Nécessaires */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-white">Cookies nécessaires</p>
                    <p className="text-[11px] text-white/40 mt-0.5">Authentification, sécurité, session. Toujours actifs.</p>
                  </div>
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold shrink-0 mt-0.5">Toujours actif</span>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <BarChart2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-white">Analytiques</p>
                    <p className="text-[11px] text-white/40 mt-0.5">Mesure d'audience, pages visitées, comportement.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={prefs.analytics}
                    onChange={e => setPrefs(p => ({ ...p, analytics: e.target.checked }))}
                  />
                  <div className="w-8 h-4 bg-white/10 peer-focus-visible:outline peer-checked:bg-emerald-500 rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4" />
                </label>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <Megaphone className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-white">Marketing</p>
                    <p className="text-[11px] text-white/40 mt-0.5">Publicités personnalisées, retargeting.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={prefs.marketing}
                    onChange={e => setPrefs(p => ({ ...p, marketing: e.target.checked }))}
                  />
                  <div className="w-8 h-4 bg-white/10 peer-focus-visible:outline peer-checked:bg-emerald-500 rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4" />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => save(false)}
            className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold border border-white/10 text-white/60 hover:border-white/25 hover:text-white/80 transition-all"
          >
            {expanded ? 'Enregistrer mes choix' : 'Refuser'}
          </button>
          <button
            onClick={() => save(true)}
            className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-white transition-all shadow shadow-emerald-500/20"
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}
