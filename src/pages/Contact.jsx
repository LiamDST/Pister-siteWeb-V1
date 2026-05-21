import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// 🔧 Remplace par tes vraies clés EmailJS
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

const profiles = [
  'Entreprise de rénovation / CVC',
  'Bureau d\'études thermiques',
  'Promoteur immobilier',
  'Gestionnaire de patrimoine',
  'Syndic / Property manager',
  'Autre',
];

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    profile: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      setStatus('success');
      setForm({ firstName: '', lastName: '', email: '', company: '', profile: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section className="section">
      <div className="section-inner grid lg:grid-cols-[1fr,1.2fr] gap-12 items-start py-12">

        {/* Colonne gauche — infos */}
        <div className="space-y-8">
          <div>
            <p className="text-xs font-semibold tracking-widest text-g-400 uppercase mb-2">
              Contact
            </p>
            <h1 className="text-3xl font-extrabold text-g-900 mb-3">
              Parlons de votre marché.
            </h1>
            <p className="text-sm text-g-500 leading-relaxed max-w-md">
              Décrivez votre activité et vos cibles. On vous montre en 30 minutes
              combien de bâtiments correspondent à votre ICP en France.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: '📧',
                label: 'Email',
                value: 'contact@pisteur.tech',
                href: 'mailto:contact@pisteur.tech',
              },
              {
                icon: '📞',
                label: 'Téléphone',
                value: '+33 1 23 45 67 89',
                href: 'tel:+33123456789',
              },
              {
                icon: '💬',
                label: 'WhatsApp',
                value: 'Échange rapide',
                href: 'https://wa.me/33600000000',
              },
            ].map(({ icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-g-200 hover:border-p/40 hover:bg-p-xsoft transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-g-100 flex items-center justify-center text-lg group-hover:bg-p-soft transition-colors">
                  {icon}
                </div>
                <div>
                  <p className="text-xs text-g-400">{label}</p>
                  <p className="text-sm font-semibold text-g-900">{value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="glass-card p-5 space-y-3">
            <p className="text-sm font-bold text-g-900">
              ✅ Ce que vous obtenez après ce formulaire
            </p>
            <ul className="space-y-2 text-xs text-g-500">
              <li className="flex items-center gap-2">
                <span className="text-green font-bold">→</span>
                Une réponse sous 24h ouvrées
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green font-bold">→</span>
                Une démo live de 30 min sur votre segment exact
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green font-bold">→</span>
                Un accès essai gratuit — sans carte bancaire
              </li>
            </ul>
          </div>
        </div>

        {/* Colonne droite — formulaire */}
        <div className="glass-card p-6 sm:p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center text-center gap-4 py-10">
              <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center text-3xl">
                ✅
              </div>
              <h2 className="text-xl font-bold text-g-900">Message envoyé !</h2>
              <p className="text-sm text-g-500 max-w-sm">
                Merci pour votre message. Notre équipe vous répond sous 24h ouvrées.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-5 py-2 text-sm font-semibold rounded-lg bg-p text-white hover:bg-p-hover transition-colors"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-lg font-bold text-g-900">
                Demander une démo gratuite
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-g-500 mb-1">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Jean"
                    className="w-full rounded-xl border border-g-200 bg-g-50 px-3 py-2.5 text-sm text-g-900 placeholder-g-400 focus:outline-none focus:ring-2 focus:ring-p/30 focus:border-p transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-g-500 mb-1">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Dupont"
                    className="w-full rounded-xl border border-g-200 bg-g-50 px-3 py-2.5 text-sm text-g-900 placeholder-g-400 focus:outline-none focus:ring-2 focus:ring-p/30 focus:border-p transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-g-500 mb-1">
                  Email professionnel *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jean.dupont@entreprise.fr"
                  className="w-full rounded-xl border border-g-200 bg-g-50 px-3 py-2.5 text-sm text-g-900 placeholder-g-400 focus:outline-none focus:ring-2 focus:ring-p/30 focus:border-p transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-g-500 mb-1">
                  Société *
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Nom de votre entreprise"
                  className="w-full rounded-xl border border-g-200 bg-g-50 px-3 py-2.5 text-sm text-g-900 placeholder-g-400 focus:outline-none focus:ring-2 focus:ring-p/30 focus:border-p transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-g-500 mb-1">
                  Votre profil *
                </label>
                <select
                  name="profile"
                  required
                  value={form.profile}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-g-200 bg-g-50 px-3 py-2.5 text-sm text-g-900 focus:outline-none focus:ring-2 focus:ring-p/30 focus:border-p transition-colors"
                >
                  <option value="">Choisir votre profil…</option>
                  {profiles.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-g-500 mb-1">
                  Décrivez votre besoin
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Votre zone géographique, type de bâtiments ciblés, volume souhaité…"
                  className="w-full rounded-xl border border-g-200 bg-g-50 px-3 py-2.5 text-sm text-g-900 placeholder-g-400 focus:outline-none focus:ring-2 focus:ring-p/30 focus:border-p transition-colors resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  Une erreur est survenue. Réessayez ou contactez-nous directement par email.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 rounded-xl bg-p text-white text-sm font-bold hover:bg-p-hover disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande de démo →'}
              </button>

              <p className="text-[11px] text-g-400 text-center">
                En soumettant ce formulaire, vous acceptez notre{' '}
                <a href="/confidentialite" className="text-p underline">
                  politique de confidentialité
                </a>
                . Réponse garantie sous 24h ouvrées.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}