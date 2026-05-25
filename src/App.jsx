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
    title: 'Démo Pisteur — voir l'outil en action',
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
    description: 'Retrouvez les réponses aux questions fréquentes sur Pisteur, les crédits, les données et l'utilisation de la plateforme.',
    keywords: 'FAQ Pisteur, questions fréquentes, crédits, données bâtiment',
  },
  '/contact': {
    title: 'Contact Pisteur — demandez une démo',
    description: 'Contactez l'équipe Pisteur pour poser vos questions, demander une démo personnalisée ou lancer un essai.',
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

    upsertMeta('meta[name="description"]',         { name: 'description', content: seo.description });
    upsertMeta('meta[name="keywords"]',             { name: 'keywords',    content: seo.keywords });
    upsertMeta('meta[property="og:title"]',         { property: 'og:title',       content: seo.title });
    upsertMeta('meta[property="og:description"]',   { property: 'og:description', content: seo.description });
    upsertMeta('meta[property="og:type"]',           { property: 'og:type',        content: 'website' });
    upsertMeta('meta[property="og:url"]',            { property: 'og:url',         content: canonicalUrl });
    upsertMeta('meta[name="twitter:card"]',          { name: 'twitter:card',        content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]',         { name: 'twitter:title',       content: seo.title });
    upsertMeta('meta[name="twitter:description"]',   { name: 'twitter:description', content: seo.description });
    upsertLink('link[rel="canonical"]',              { rel: 'canonical', href: canonicalUrl });
  }, [pathname]);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// ─── Widget WhatsApp/Contact ──────────────────────────────────
function ContactWidget() {
  const [open, setOpen] = useState(false);
  const whatsappUrl = 'https://wa.me/33600000000?text=Bonjour%2C%20je%20voudrais%20en%20savoir%20plus%20sur%20Pisteur.';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-navy-100 overflow-hidden animate-slideUp">
          <div className="bg-navy-900 px-5 py-4 flex items-center justify-between">
            <p className="text-white font-semibold text-sm">Besoin d&apos;aide ?</p>
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
              <div className="w-9 h-9 bg-emerald-50 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
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

// ─── ErrorBoundary ──────────────────────────────────────────
import { Component } from 'react';
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
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
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-400 transition-colors"
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

// ─── App ───────────────────────────────────────────────────
export default function App() {
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
    try { window.localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  return (
    <ErrorBoundary>
      <ToastProvider>
        <div className="min-h-screen flex flex-col">
          <ScrollProgress />
          <SeoManager />
          <ScrollToTop />
          <ExitIntentModal />
          <CookieBanner />
          <Header theme={theme} onToggleTheme={() => setTheme(current => (current === 'dark' ? 'light' : 'dark'))} />
          <main className="flex-1">
            <Routes>
              <Route path="/"               element={<Home />} />
              <Route path="/demo"           element={<Demo />} />
              <Route path="/simulation"     element={<Simulation />} />
              <Route path="/tarifs"         element={<Pricing />} />
              <Route path="/blog"           element={<Blog />} />
              <Route path="/faq"            element={<Faq />} />
              <Route path="/contact"        element={<Contact />} />
              <Route path="/cas-clients"    element={<CaseStudies />} />
              <Route path="/confidentialite" element={<PrivacyPolicy />} />
              <Route path="*"               element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ContactWidget />
        </div>
      </ToastProvider>
    </ErrorBoundary>
  );
}
