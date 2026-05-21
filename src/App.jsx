import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingContactWidget from './components/FloatingContactWidget';
import CookieBanner from './components/CookieBanner';   // ← NOUVEAU
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import Simulation from './pages/Simulation';
import Legal from './pages/Legal';                       // ← NOUVEAU
import Privacy from './pages/Privacy';                   // ← NOUVEAU
import NotFound from './pages/NotFound';                 // ← NOUVEAU

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-g-50 text-g-900">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/"                  element={<Home />} />
          <Route path="/simulation"        element={<Simulation />} />
          <Route path="/tarifs"            element={<Pricing />} />
          <Route path="/faq"               element={<Faq />} />
          <Route path="/contact"           element={<Contact />} />
          <Route path="/mentions-legales"  element={<Legal />} />
          <Route path="/confidentialite"   element={<Privacy />} />
          <Route path="*"                  element={<NotFound />} />  {/* 404 */}
        </Routes>
      </main>
      <Footer />
      <FloatingContactWidget />
      <CookieBanner />                                   {/* ← NOUVEAU */}
    </div>
  );
}