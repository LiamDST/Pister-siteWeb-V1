import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MessageCircle, Phone, Mail, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ExitIntentModal from './components/ExitIntentModal';
import CookieBanner from './components/CookieBanner';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import Demo from './pages/Demo';
import Simulation from './pages/Simulation';
import Blog from './pages/Blog';
import CaseStudies from './pages/CaseStudies';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';

const seoByPath = {
  '/': {
    title: 'Pisteur — Prospection bâtiment intelligente',
    description: 'Pisteur identifie les bâtiments à fort potentiel, qualifie les leads et automatise la prospection pour les professionnels du bâtiment.',
    keywords: 'prospection bâtiment, leads bâtiment, DPE, CRM, email IA, qualification de prospects',
  },
  '/demo': {
    title: 'Démo Pisteur — voir loutil en action',
    description: 'Découvrez la démo Pisteur pour voir comment identifier des leads bâtiment, qualifier les cibles et gagner du temps sur la prospection.',
    keywords: 'démo Pisteur, démonstration prospection bâtiment, leads qualifiés, outil bâtiment',
  },
  '/simulation': {
    title: 'Simulation de marché — Pisteur',
    description: 'Simulez votre marché bâtiment, estimez votre potentiel de leads et obtenez une projection rapide adaptée à votre zone.',
    keywords: 'simulation marché bâtiment, estimation leads, prospection géographique, ICP bâtiment',
  },
  '/tarifs': {
    title: 'Tarifs Pisteur — crédits et abonnements',
    description: 'Consultez les abonnements Pisteur et comprenez le fonctionnement des crédits pour les leads, emails et téléphones.',
    keywords: 'tarifs Pisteur, crédits prospection, abonnement leads bâtiment, prix logiciel bâtiment',
  },
  '/blog': {
    title: 'Blog Pisteur — guides et insights bâtiment',
    description: 'Lisez nos guides sur la prospection bâtiment, les tendances DPE et les bonnes pratiques pour générer plus de leads qualifiés.',
    keywords: 'blog prospection bâtiment, DPE 2025, leads qualifiés, conseils commerciaux',
  },
  '/faq': {
    title: 'FAQ Pisteur — questions fréquentes',
    description: 'Retrouvez les réponses aux questions fréquentes sur Pisteur, les crédits, les données et lutilisation de la plateforme.',
    keywords: 'FAQ Pisteur, questions fréquentes, crédits, données bâtiment',
  },
  '/contact': {
    title: 'Contact Pisteur — demandez une démo',
    description: 'Contactez l équipe Pisteur pour poser vos questions, demander une démo personnalisée ou lancer un essai.',
    keywords: 'contact Pisteur, démo personnalisée, essai gratuit, prospection bâtiment',
  },
  '/cas-clients': {
    title: 'Études de cas Pisteur — résultats réels',
    description: 'Découvrez comment IsolPro, EnergétiK et RénoPlus ont transformé leur prospection bâtiment avec Pisteur.',
    keywords: 'études de cas prospection bâtiment, résultats Pisteur, ROI, témoignages clients',
  },
  '/confidentialite': {
    title: 'Politique de confidentialité — Pisteur',
    description: 'Découvrez comment Pisteur collecte, utilise et protège vos données personnelles conformément au RGPD.',
    keywords: 'RGPD, politique confidentialité, protection données, cookies Pisteur',
  },
};

function SeoManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    const seo = seoByPath[pathname] ?? seoByPath['/'];
    const canonicalUrl = `${window.location.origin}${pathname}`;
    document.title = seo.title;
    const upsertMeta = (selector, attributes) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
        document.head.appendChild(element);
        return;
      }
      Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    };
    const upsertLink = (selector, attributes) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement('link');
        Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
        document.head.appendChild(element);
        return;
      }
      Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    };
    upsertMeta('meta[name="description"]',       { name: 'description', content: seo.description });
    upsertMeta('meta[name="keywords"]',           { name: 'keywords',    content: seo.keywords });
    upsertMeta('meta[property="og:title"]',       { property: 'og:title',       content: seo.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description });
    upsertMeta('meta[property="og:type"]',         { property: 'og:type',        content: 'website' });
    upsertMeta('meta[property="og:url"]',          { property: 'og:url',         content: canonicalUrl });
    upsertMeta('meta[name="twitter:card"]',        { name: 'twitter:card',        content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]',       { name: 'twitter:title',       content: seo.title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description });
    upsertLink('link[rel="canonical"]',            { rel: 'canonical', href: canonicalUrl });
  }, [pathname]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ─── Décorations demi-cercles globales ─────────────────────────── */
function SideDecorations() {
  return (
    <>
      {/* Demi-cercle gauche haut */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-24 -left-24 w-48 h-48 rounded-full"
        style={{
          background: 'radial-gradient(circle at 100% 50%, #1e3a5f 0%, #0f2040 60%, transparent 100%)',
          opacity: 0.55,
          clipPath: 'inset(0 50% 0 0)',
        }}
      />
      {/* Demi-cercle gauche bas */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-1/2 -left-32 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle at 100% 50%, #162d4e 0%, #0a1a30 60%, transparent 100%)',
          opacity: 0.45,
          clipPath: 'inset(0 50% 0 0)',
        }}
      />
      {/* Demi-cercle droit haut */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-32 -right-24 w-48 h-48 rounded-full"
        style={{
          background: 'radial-gradient(circle at 0% 50%, #1e3a5f 0%, #0f2040 60%, transparent 100%)',
          opacity: 0.55,
          clipPath: 'inset(0 0 0 50%)',
        }}
      />
      {/* Demi-cercle droit bas */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-32 -right-32 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle at 0% 50%, #162d4e 0%, #0a1a30 60%, transparent 100%)',
          opacity: 0.45,
          clipPath: 'inset(0 0 0 50%)',
        }}
      />
    </>
  );
}

/* ─── Widget WhatsApp/Contact ────────────────────────────────── */
function ContactWidget() {
  const [open, setOpen] = useState(false);
  const whatsappUrl = 'https://wa.me/33600000000?text=Bonjour%2C%20je%20voudrais%20en%20savoir%20plus%20sur%20Pisteur.';
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-navy-100 overflow-hidden animate-slideUp">
          <div className="bg-navy-900 px-5 py-4 flex items-center justify-between">
            <p className="text-white font-semibold text-sm">Besoin d&apos;aide ?</p>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-2">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-navy-900">Formulaire de contact</p>
                <p className="text-xs text-navy-500">Réponse sous 24h</p>
              </div>
            </Link>
            <a href="tel:+33123456789" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-navy-900">Appeler</p>
                <p className="text-xs text-navy-500">+33 1 23 45 67 89</p>
              </div>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-navy-900">WhatsApp</p>
                <p className="text-xs text-navy-500">Message rapide</p>
              </div>
            </a>
            <Link
              to="/cas-clients"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors border-t border-gray-100 mt-1 pt-3"
            >
              <div className="w-9 h-9 bg-purple-50 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-navy-900">Études de cas</p>
                <p className="text-xs text-navy-500">Résultats réels</p>
              </div>
            </Link>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Ouvrir le contact"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-200 hover:scale-105"
      >
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-7 h-7 text-white" />}
      </button>
    </div>
  );
}

/* ─── Splash Screen ─────────────────────────────────────────── */
function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 22 + 8;
      if (p >= 100) {
        p = 100;
        clearInterval(t);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onDone, 500);
        }, 200);
      }
      setProgress(Math.min(p, 100));
    }, 80);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: 'var(--page-bg)' }}>
      {/* Halo glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 600px 400px at 50% 45%, rgba(59,130,246,0.08), transparent 70%)' }} />
      {/* Grille */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo animé */}
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.15))', border: '1px solid rgba(59,130,246,0.3)', boxShadow: '0 0 40px rgba(59,130,246,0.2)' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
              <circle cx="12" cy="12" r="6" stroke="rgba(59,130,246,0.6)" strokeWidth="1" />
              <circle cx="12" cy="12" r="2" stroke="rgba(59,130,246,0.9)" strokeWidth="1.5" />
              <line x1="12" y1="2" x2="12" y2="22" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
              <line x1="2" y1="12" x2="22" y2="12" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
              <path d="M12 12 L19 8" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"
                style={{ transformOrigin: '12px 12px', animation: 'sweep 2s linear infinite' }} />
            </svg>
          </div>
          {/* Ping */}
          <div className="absolute inset-0 rounded-2xl animate-ping" style={{ border: '1px solid rgba(59,130,246,0.15)', animationDuration: '1.5s' }} />
        </div>

        {/* Nom */}
        <div className="text-center">
          <p className="text-2xl font-black tracking-tight" style={{ background: 'linear-gradient(135deg, #ffffff, rgba(255,255,255,0.6))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pisteur</p>
          <p className="text-xs text-white/30 mt-1 tracking-widest uppercase">Prospection bâtiment IA</p>
        </div>

        {/* Barre de progression */}
        <div className="w-48 space-y-2">
          <div className="h-0.5 bg-white/8 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #3b82f6, #818cf8, #10b981)', backgroundSize: '200% 100%', animation: 'gradientShift 1.5s ease infinite' }} />
          </div>
          <p className="text-[10px] text-white/25 text-center tabular-nums">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Bouton Scroll To Top ───────────────────────────────────── */
function ScrollToTopButton() {
  const [scrollPct, setScrollPct] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setScrollPct(pct);
      setVisible(pct > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const r = 20;
  const circ = 2 * Math.PI * r;
  const dash = circ - (scrollPct / 100) * circ;

  return (
    <button
      onClick={handleClick}
      aria-label="Retour en haut"
      className={`fixed bottom-24 right-6 z-50 w-12 h-12 flex items-center justify-center transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {/* Cercle SVG de progression */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
        {/* Piste */}
        <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        {/* Progression */}
        <circle cx="24" cy="24" r={r} fill="none"
          stroke="url(#scrollGrad)" strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={dash}
          style={{ transition: 'stroke-dashoffset 0.2s ease' }} />
        <defs>
          <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
      </svg>
      {/* Fond intérieur + flèche */}
      <div className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </div>
    </button>
  );
}

/* ─── ErrorBoundary ────────────────────────────────────────── */
import { Component } from 'react';
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error('Pisteur ErrorBoundary:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-4">⚡</div>
            <h1 className="text-2xl font-bold text-white mb-2">Quelque chose s'est mal passé</h1>
            <p className="text-white/50 text-sm mb-6">Une erreur inattendue s'est produite. Rechargez la page ou revenez à l'accueil.</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-400 transition-colors"
              >
                Recharger
              </button>
              <a
                href="/"
                className="px-5 py-2.5 rounded-xl border border-white/10 text-white/70 text-sm font-semibold hover:border-white/25 hover:text-white transition-colors"
              >
                Accueil
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ─── App ───────────────────────────────────────────────────── */
export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
    } catch {}
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { window.localStorage.setItem('theme', theme); } catch {};
  }, [theme]);

  return (
    <ErrorBoundary>
      <ToastProvider>
        {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
        <div className="relative min-h-screen flex flex-col overflow-x-hidden">
          <SideDecorations />
          <ScrollToTopButton />
          <ScrollProgress />
          <SeoManager />
          <ScrollToTop />
          <ExitIntentModal />
          <CookieBanner />
          <Header theme={theme} onToggleTheme={() => setTheme(current => (current === 'dark' ? 'light' : 'dark'))} />
          <main className="flex-1">
            <Routes>
              <Route path="/"                element={<Home />} />
              <Route path="/demo"            element={<Demo />} />
              <Route path="/simulation"      element={<Simulation />} />
              <Route path="/tarifs"          element={<Pricing />} />
              <Route path="/blog"            element={<Blog />} />
              <Route path="/faq"             element={<Faq />} />
              <Route path="/contact"         element={<Contact />} />
              <Route path="/cas-clients"     element={<CaseStudies />} />
              <Route path="/confidentialite" element={<PrivacyPolicy />} />
              <Route path="*"                element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ContactWidget />
        </div>
      </ToastProvider>
    </ErrorBoundary>
  );
}
