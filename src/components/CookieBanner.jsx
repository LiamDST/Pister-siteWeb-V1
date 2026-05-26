import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X, ChevronDown, ChevronUp, Shield, BarChart2, Megaphone } from 'lucide-react';

const STORAGE_KEY = 'pisteur_cookie_consent';

const defaultPrefs = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export default function CookieBanner() {
  const [visible, setVisible]   = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [prefs, setPrefs]       = useState(defaultPrefs);

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

  /* Le bandeau est TOUJOURS dark — fond #111827 fixe — indépendant du thème du site */
  const bg       = '#111827';
  const textMain = '#f9fafb';
  const textMuted= 'rgba(249,250,251,0.55)';
  const textFaint= 'rgba(249,250,251,0.38)';
  const border   = '1px solid rgba(255,255,255,0.10)';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Préférences cookies"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[9999] animate-slideUp"
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: bg,
          border,
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <Cookie className="w-5 h-5 text-blue-400" />
            <p className="font-semibold text-sm" style={{ color: textMain }}>
              Vos préférences cookies
            </p>
          </div>
          <button
            onClick={() => save(false)}
            aria-label="Refuser et fermer"
            style={{ color: textFaint }}
            className="hover:opacity-80 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <div className="px-5 pb-3">
          <p className="text-xs leading-relaxed" style={{ color: textMuted }}>
            Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic.
            Consultez notre{' '}
            <Link
              to="/confidentialite"
              className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors"
            >
              politique de confidentialité
            </Link>.
          </p>
        </div>

        {/* Accordéon personnaliser */}
        <div className="px-5 pb-3">
          <button
            onClick={() => setExpanded(o => !o)}
            className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-80"
            style={{ color: textFaint }}
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            Personnaliser
          </button>

          {expanded && (
            <div className="mt-3 space-y-3">
              {/* Nécessaires */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold" style={{ color: textMain }}>Cookies nécessaires</p>
                    <p className="text-[11px] mt-0.5" style={{ color: textFaint }}>
                      Authentification, sécurité, session. Toujours actifs.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-blue-400 font-semibold shrink-0 mt-0.5">Toujours actif</span>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <BarChart2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold" style={{ color: textMain }}>Analytiques</p>
                    <p className="text-[11px] mt-0.5" style={{ color: textFaint }}>
                      Mesure d'audience, pages visitées, comportement.
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={prefs.analytics}
                    onChange={e => setPrefs(p => ({ ...p, analytics: e.target.checked }))}
                  />
                  <div className="w-8 h-4 rounded-full transition-colors bg-white/10 peer-checked:bg-blue-500 relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4" />
                </label>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <Megaphone className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold" style={{ color: textMain }}>Marketing</p>
                    <p className="text-[11px] mt-0.5" style={{ color: textFaint }}>
                      Publicités personnalisées, retargeting.
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={prefs.marketing}
                    onChange={e => setPrefs(p => ({ ...p, marketing: e.target.checked }))}
                  />
                  <div className="w-8 h-4 rounded-full transition-colors bg-white/10 peer-checked:bg-blue-500 relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4" />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => save(false)}
            className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.12)', color: textMuted, background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'; e.currentTarget.style.color = textMain; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = textMuted; }}
          >
            {expanded ? 'Enregistrer mes choix' : 'Refuser'}
          </button>
          <button
            onClick={() => save(true)}
            className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-500 hover:bg-blue-400 transition-all shadow shadow-blue-500/20"
            style={{ color: '#fff' }}
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}
