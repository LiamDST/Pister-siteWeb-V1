import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Affiche la bannière si pas encore de choix enregistré
    const choice = sessionStorage.getItem('cookie_choice');
    if (!choice) setVisible(true);
  }, []);

  const accept = () => {
    sessionStorage.setItem('cookie_choice', 'accepted');
    setVisible(false);
    // Ici : activer Google Analytics si besoin
    // window.gtag('consent', 'update', { analytics_storage: 'granted' });
  };

  const reject = () => {
    sessionStorage.setItem('cookie_choice', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white border border-g-200 rounded-2xl shadow-s2 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-semibold text-g-900 mb-1">
            🍪 Ce site utilise des cookies
          </p>
          <p className="text-xs text-g-500 leading-relaxed">
            Nous utilisons des cookies analytiques (Google Analytics) pour améliorer
            notre site. Aucune donnée n&apos;est vendue à des tiers.{' '}
            <Link
              to="/confidentialite"
              className="text-p underline hover:text-p-hover"
            >
              En savoir plus
            </Link>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={reject}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-g-200 text-g-700 hover:bg-g-100 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-p text-white hover:bg-p-hover transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}