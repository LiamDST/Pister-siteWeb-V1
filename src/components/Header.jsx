import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
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

export default function Header({ theme, onToggleTheme }) {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location                = useLocation();

  // Ombre header au scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fermer le menu mobile au changement de route
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-40 bg-navy-950/80 backdrop-blur border-b border-white/5 transition-shadow duration-300 ${
        scrolled ? 'shadow-lg shadow-black/20' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Pisteur — accueil">
          <div className="w-9 h-9">
            <RadarLogo size={36} />
          </div>
          <span className="font-semibold text-white tracking-tight">Pisteur</span>
        </Link>

        {/* Navigation desktop avec indicateur actif animé */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
          {navItems.map(item => {
            const isActive = item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={`relative text-sm px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-white font-medium'
                    : 'text-white/55 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {item.label}
                {/* Underline animé sous le lien actif */}
                <span
                  className={`absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-blue-400 transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`}
                  style={{ transformOrigin: 'center' }}
                />
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            {theme === 'dark' ? <SunMedium className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link to="/contact" className="hidden sm:inline-flex btn-primary text-xs px-4 py-2">
            Demander une démo
          </Link>
          <button
            className="lg:hidden text-white/70 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation mobile */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Navigation mobile"
          className="lg:hidden bg-navy-950 border-t border-white/5 px-4 pb-4 pt-2 space-y-1 animate-slideUp"
        >
          <button
            type="button"
            onClick={onToggleTheme}
            className="mb-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            {theme === 'dark' ? <SunMedium className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
          </button>
          {navItems.map(item => {
            const isActive = item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={`flex items-center justify-between text-sm px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-500/10 text-blue-300 font-medium border border-blue-500/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                )}
              </NavLink>
            );
          })}
          <Link
            to="/contact"
            className="btn-accent w-full mt-2 text-center block"
          >
            Demander une démo
          </Link>
        </nav>
      )}
    </header>
  );
}
