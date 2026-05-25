import { Link } from 'react-router-dom';
import RadarLogo from './RadarLogo';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-950/60 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Marque */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-3" aria-label="Pisteur — accueil">
              <div className="w-8 h-8"><RadarLogo size={32} /></div>
              <span className="font-semibold text-white text-sm">Pisteur</span>
            </Link>
            <p className="text-xs text-white/40 leading-relaxed max-w-[180px]">
              Prospection bâtiment intelligente — données DPE, décideurs, IA.
            </p>
          </div>

          {/* Produit */}
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Produit</p>
            <ul className="space-y-2">
              {[
                { to: '/demo',       label: 'Démo' },
                { to: '/simulation', label: 'Simulation' },
                { to: '/tarifs',     label: 'Tarifs' },
                { to: '/cas-clients',label: 'Cas clients' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-xs text-white/40 hover:text-white/80 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Ressources</p>
            <ul className="space-y-2">
              {[
                { to: '/blog',    label: 'Blog' },
                { to: '/faq',     label: 'FAQ' },
                { to: '/contact', label: 'Contact' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-xs text-white/40 hover:text-white/80 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Légal</p>
            <ul className="space-y-2">
              {[
                { to: '/confidentialite', label: 'Confidentialité' },
                { to: '/confidentialite#cookies', label: 'Cookies' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-xs text-white/40 hover:text-white/80 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bas de footer */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Pisteur SAS — Tous droits réservés
          </p>
          <p className="text-xs text-white/20">
            Données BDNB / ADEME — Mises à jour mensuellement
          </p>
        </div>
      </div>
    </footer>
  );
}
