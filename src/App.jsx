import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MessageCircle, Phone, Mail, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Faq from './pages/Faq';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const whatsappUrl = 'https://wa.me/33600000000?text=Bonjour%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20Pisteur.';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-navy-100 overflow-hidden animate-slideUp">
          <div className="bg-navy-900 px-5 py-4 flex items-center justify-between">
            <p className="text-white font-semibold text-sm">Vous avez une question ?</p>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-2">
            {/* Link vers /contact — PAS dans un autre <a> */}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-navy-900">Contact sur le site</p>
                <p className="text-xs text-navy-500">Formulaire en ligne</p>
              </div>
            </Link>
            {/* <a> natif pour tel: — pas de Link imbriqué */}
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
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-200 hover:scale-105"
      >
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-7 h-7 text-white" />}
      </button>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-white">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tarifs" element={<Pricing />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}