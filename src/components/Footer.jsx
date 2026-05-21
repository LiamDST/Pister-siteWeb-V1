import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center text-white text-xs font-bold">P</div>
            <span className="font-bold text-white">Pisteur</span>
          </div>
          <p className="text-xs text-white/50 max-w-xs">
            Prospection bâtiment intelligente pour les professionnels de la rénovation énergétique.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Navigation</p>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
            <li><Link to="/tarifs" className="hover:text-white transition-colors">Tarifs</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Contact</p>
          <ul className="space-y-2 text-sm text-white/60">
            <li>contact@pisteur.tech</li>
            <li>+33 1 23 45 67 89</li>
            <li>Paris, France</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 px-4 py-4 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Pisteur — Tous droits réservés.
      </div>
    </footer>
  );
}