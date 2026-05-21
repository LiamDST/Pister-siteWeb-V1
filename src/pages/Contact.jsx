import { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

const reasons = ['Demande de démonstration', 'Informations tarifaires', 'Partenariat', 'Support technique', 'Autre'];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', reason: reasons[0], message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici tu branches ton service d'envoi (EmailJS, Formspree, etc.)
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative pt-32 pb-16 bg-navy-950">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-navy-900 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Contactez-nous</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">Notre équipe vous répond sous 24h.</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold text-navy-900 mb-6">Parlons de votre projet</h2>
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
                <h3 className="text-xl font-bold text-navy-900">Message envoyé !</h3>
                <p className="text-navy-600 text-sm">Nous vous répondrons sous 24h.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: 'Nom complet', name: 'name', type: 'text', required: true },
                  { label: 'Email professionnel', name: 'email', type: 'email', required: true },
                  { label: 'Société', name: 'company', type: 'text', required: false },
                ].map(({ label, name, type, required }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-navy-700 mb-1">{label}</label>
                    <input
                      type={type}
                      name={name}
                      required={required}
                      value={form[name]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-900 text-sm focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Sujet</label>
                  <select name="reason" value={form.reason} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-900 text-sm focus:outline-none focus:border-green-500 transition-colors">
                    {reasons.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Message</label>
                  <textarea name="message" rows={4} value={form.message} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-navy-200 text-navy-900 text-sm focus:outline-none focus:border-green-500 transition-colors resize-none" />
                </div>
                <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-all shadow-lg shadow-green-500/25 hover:-translate-y-0.5">
                  Envoyer <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy-900">Informations</h2>
            {[
              { icon: Mail, label: 'Email', value: 'contact@pisteur.tech' },
              { icon: Phone, label: 'Téléphone', value: '+33 1 23 45 67 89' },
              { icon: MapPin, label: 'Adresse', value: 'Paris, Île-de-France' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 p-4 rounded-2xl bg-navy-50 border border-navy-100">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-navy-500 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-navy-900">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}