import { Link, NavLink } from 'react-router-dom';

const baseLinkClasses =
  'text-sm text-white/70 hover:text-white transition-colors px-3 py-1.5 rounded-full';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-900/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary-500 to-neon-500 flex items-center justify-center text-xs font-bold shadow-glow">
            P
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-white tracking-tight">Pisteur</span>
            <span className="text-[10px] text-white/50">AI Building Signals</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-1.5 py-1 backdrop-blur-xl">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseLinkClasses} ${isActive ? 'bg-white/10 text-white' : ''}`
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/tarifs"
            className={({ isActive }) =>
              `${baseLinkClasses} ${isActive ? 'bg-white/10 text-white' : ''}`
            }
          >
            Tarifs
          </NavLink>
          <NavLink
            to="/faq"
            className={({ isActive }) =>
              `${baseLinkClasses} ${isActive ? 'bg-white/10 text-white' : ''}`
            }
          >
            FAQ
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${baseLinkClasses} ${isActive ? 'bg-white/10 text-white' : ''}`
            }
          >
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
            Start-up friendly · Futuriste
          </span>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-medium rounded-full bg-white text-navy-900 hover:bg-gray-100 transition-colors shadow-soft"
          >
            Demander une démo
          </Link>
        </div>
      </div>
    </header>
  );
}
