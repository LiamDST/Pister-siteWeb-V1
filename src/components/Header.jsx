import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Moon, SunMedium, X } from 'lucide-react';
import RadarLogo from './RadarLogo';

const navItems = [
  { to: '/',           label: 'Accueil' },
  { to: '/demo',       label: 'Démo' },
  { to: '/simulation', label: 'Simulation' },
  { to: '/tarifs',     label: 'Tarifs' },
  { to: '/blog',       label: 'Blog' },
  { to: '/faq',        label: 'FAQ' },
];

// bg-white/8 n'est pas valide en Tailwind → bg-white/[0.08]
const navCls = ({ isActive }) =>
  `text-sm px-3 py-2 rounded-lg transition-colors ${
    isActive ? 'bg-white/[0.08] text-white' : 'text-white/60 hover:text-white'
  }`;

export default function Header({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-navy-950/80 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9">
            <RadarLogo size={36} />
          </div>
          <span className="font-semibold text-white tracking-tight">Pisteur</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} className={navCls} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          >
            {theme === 'dark' ? <SunMedium className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link to="/contact" className="hidden sm:inline-flex btn-primary text-xs px-4 py-2">
            Demander une démo
          </Link>
          <button
            className="lg:hidden text-white/70 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-navy-950 border-t border-white/5 px-4 pb-4 pt-2 space-y-1 animate-slideUp">
          <button
            type="button"
            onClick={onToggleTheme}
            className="mb-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            {theme === 'dark' ? <SunMedium className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
          </button>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={navCls}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="btn-accent w-full mt-2 text-center block"
            onClick={() => setOpen(false)}
          >
            Demander une démo
          </Link>
        </div>
      )}
    </header>
  );
}