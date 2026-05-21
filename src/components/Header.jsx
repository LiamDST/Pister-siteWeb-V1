import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isHome = location.pathname === '/';
  const darkLinks = !isHome || scrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm pt-2 pb-2' : ''}`}>
      <div className="max-w-7xl mx-auto flex items-center h-14 lg:h-16">

        {/* LOGO — un seul Link, aucun Link à l'intérieur */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 w-36">
          <div className="w-8 h-8 rounded-xl bg-green-500 flex items-center justify-center text-white text-xs font-bold">P</div>
          <span className={`text-lg font-bold transition-colors ${darkLinks ? 'text-navy-900' : 'text-white'}`}>
            Pisteur
          </span>
        </Link>

        {/* NAV desktop — Link simples, pas imbriqués */}
        <nav className="hidden lg:flex items-center justify-center flex-1">
          <div className={`flex items-center gap-1 backdrop-blur-sm rounded-full px-2 py-1.5 border shadow-lg transition-colors ${darkLinks ? 'bg-green-500 text-white border-green-400/50' : 'bg-green-500/90 border-green-400/50'}`}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'bg-white text-green-700'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* CTA desktop — Link seul */}
        <div className="hidden lg:flex items-center justify-end flex-shrink-0 w-36">
          <Link
            to="/contact"
            className={`inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 ${
              darkLinks
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/25 hover:bg-green-600'
                : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
            }`}
          >
            Demander une démo
          </Link>
        </div>

        {/* Hamburger mobile */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden ml-auto p-2 rounded-full transition-colors ${darkLinks ? 'text-navy-700' : 'text-white'}`}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="lg:hidden bg-white rounded-2xl shadow-2xl mx-2 mt-2 p-4 border border-navy-100">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'bg-green-50 text-green-700'
                    : 'text-navy-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-2 px-4 py-3 rounded-xl bg-green-500 text-white text-sm font-semibold text-center hover:bg-green-600 transition-colors"
            >
              Demander une démo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}