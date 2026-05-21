import { Link } from 'react-router-dom';

const sections = [
  { title: 'Produit', links: [{ to: '/demo', label: 'Démo' }, { to: '/simulation', label: 'Simulation' }, { to: '/tarifs', label: 'Tarifs' }] },
  { title: 'Ressources', links: [{ to: '/blog', label: 'Blog' }, { to: '/faq', label: 'FAQ' }] },
  { title: 'Contact', links: [{ to: '/contact', label: 'Nous contacter' }] },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="col-span-2 sm:col-span-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-white text-xs">P</div>
            <span className="font-semibold text-white">Pisteur</span>
          </div>
          <p className="text-xs text-white/50 leading-relaxed max-w-xs">
            Prospection bâtiment pilotée par la donnée. Identifiez vos cibles, contactez les décideurs.
          </p>
        </div>
        {sections.map(s => (
          <div key={s.title}>
            <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-3">{s.title}</p>
            <ul className="space-y-2">
              {s.links.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-white/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5 px-4 py-4 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Pisteur — Tous droits réservés.
      </div>
    </footer>
  );
}
