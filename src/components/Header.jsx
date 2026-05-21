import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Accueil' },
  { to: '/simulation', label: 'Simulation' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

const linkClass = ({ isActive }) =>
  `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive
    ? 'bg-g-100 text-g-900'
    : 'text-g-500 hover:text-g-900 hover:bg-g-100'
  }`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-g-200 shadow-s0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-[45px] h-[45px] rounded-lg bg-p flex items-center justify-center font-extrabold text-white text-lg">
            P
          </div>
          <span className="text-[18px] font-extrabold text-g-900 tracking-tight">
            Piste<span className="text-p">ur</span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ to, label }) => (
            <NavLink key={to} to={to} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Actions desktop */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://app.pisteur.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-[7px] text-[13px] font-semibold rounded-lg border border-g-200 text-g-700 hover:bg-g-100 transition-colors"
          >
            Connexion
          </a>
          <Link
            to="/contact"
            className="px-4 py-[7px] text-[13px] font-bold rounded-lg bg-p text-white hover:bg-p-hover transition-colors"
          >
            Demander une démo
          </Link>
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden p-2 rounded-lg text-g-500 hover:text-g-900 hover:bg-g-100 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-g-200 bg-white px-4 py-4 space-y-1 animate-slideUp">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                  ? 'bg-p-soft text-p'
                  : 'text-g-700 hover:bg-g-100'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}

          <div className="pt-3 space-y-2 border-t border-g-200 mt-3">
            <a
              href="https://app.pisteur.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-4 py-2.5 text-sm font-semibold rounded-lg border border-g-200 text-g-700 hover:bg-g-100 transition-colors"
            >
              Connexion
            </a>
            <Link
              to="/contact"
              className="block text-center px-4 py-2.5 text-sm font-bold rounded-lg bg-p text-white hover:bg-p-hover transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Demander une démo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}