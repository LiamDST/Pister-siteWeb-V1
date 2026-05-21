import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} Pisteur — Prospection bâtiment intelligente.
        </p>
        <div className="flex items-center gap-4 text-xs text-g-400">
          <Link to="/mentions-legales" className="hover:text-g-700 transition-colors">
            Mentions légales
          </Link>
          <span>·</span>
          <Link to="/confidentialite" className="hover:text-g-700 transition-colors">
            Confidentialité
          </Link>
          <span>·</span>
          <Link to="/contact" className="hover:text-g-700 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
