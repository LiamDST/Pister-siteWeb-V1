import { Link, NavLink } from 'react-router-dom';

const navLinkClasses =
  'text-sm text-white/70 hover:text-white transition-colors px-3 py-2 rounded-lg';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-navy-900/80 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center text-xs font-bold">
            P
          </div>
          <span className="font-semibold text-white tracking-tight">Pisteur</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navLinkClasses} ${isActive ? 'bg-white/5 text-white' : ''}`
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/tarifs"
            className={({ isActive }) =>
              `${navLinkClasses} ${isActive ? 'bg-white/5 text-white' : ''}`
            }
          >
            Tarifs
          </NavLink>
          <NavLink
            to="/faq"
            className={({ isActive }) =>
              `${navLinkClasses} ${isActive ? 'bg-white/5 text-white' : ''}`
            }
          >
            FAQ
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${navLinkClasses} ${isActive ? 'bg-white/5 text-white' : ''}`
            }
          >
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-white text-navy-900 hover:bg-gray-100 transition-colors"
          >
            Demander une démo
          </Link>
        </div>
      </div>
    </header>
  );
}
