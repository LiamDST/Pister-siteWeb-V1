import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} Pisteur — Prospection bâtiment intelligente.
        </p>
        <div className="flex items-center gap-4 text-xs text-white/60">
          <Link to="/mentions-legales" className="hover:text-white">
            Mentions légales
          </Link>
          <span>·</span>
          <span>Made with React & Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
