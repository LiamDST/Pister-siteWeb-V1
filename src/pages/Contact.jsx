import { useState, useRef } from 'react';
import { sendContactEmail } from '../lib/emailjs';
import { supabase } from '../lib/supabase';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const profiles = ['Artisan / PME', 'Entreprise de rénovation', 'Bureau d\'études', 'Promoteur', 'Autre'];

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', company: '', type: profiles[0], message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      // 1) Enregistrement dans Supabase
      const { error: dbError } = await supabase.from('contacts').insert([{
        name: form.name,
        email: form.email,
        company: form.company,
        type: form.type,
        message: form.message,
        created_at: new Date().toISOString(),
      }]);
      if (dbError) throw new Error(dbError.message);

      // 2) Email de confirmation via EmailJS
      await sendContactEmail({
        from_name: form.name,
        from_email: form.email,
        company: form.company,
        type: form.type,
        message: form.message,
      });

      setStatus('success');
      setForm({ name: '', email: '', company: '', type: profiles[0], message: '' });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Une erreur est survenue. Réessayez ou contactez-nous par téléphone.');
      setStatus('error');
    }
  };

  return (
    <section className="section">
      <div className="section-inner max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">

        {/* Infos */}
        <div className="space-y-6">
          <div>
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">Contact</p>
            <h1 className="text-4xl font-bold mb-3">Parlons de votre marché</h1>
            <p className="text-white/60 text-sm leading-relaxed">
              Notre équipe vous configure une démo sur vos cibles réelles et vous montre combien de bâtiments correspondent à votre ICP dans votre zone.
            </p>
          </div>
          <div className="card-glass p-5 space-y-3">
            {[
              ['Email', 'contact@pisteur.fr'],
              ['Téléphone', '+33 1 23 45 67 89'],
              ['Réponse', 'Sous 24h ouvrées'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm">
                <span className="text-white/40">{k}</span>
                <span className="text-white/80 font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire */}
        <div className="card-glass p-6">
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              <h2 className="text-xl font-bold">Message envoyé !</h2>
              <p className="text-white/60 text-sm">Nous vous répondons dans les 24h. Un email de confirmation vous a été envoyé.</p>
              <button onClick={() => setStatus('idle')} className="btn-outline mt-2">Envoyer un autre message</button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Prénom / Nom *</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Jean Dupont" className="form-input" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jean@entreprise.fr" className="form-input" />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Entreprise</label>
                <input name="company" value={form.company} onChange={handleChange} placeholder="RénoPlus SAS" className="form-input" />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Votre profil</label>
                <select name="type" value={form.type} onChange={handleChange} className="form-input bg-navy-950">
                  {profiles.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Décrivez votre besoin, votre marché cible..." className="form-input resize-none" />
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-2 text-red-400 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-accent w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === 'loading' ? 'Envoi...' : 'Envoyer le message'}
              </button>

              <p className="text-xs text-white/30 text-center">
                En soumettant ce formulaire, vous acceptez que vos données soient traitées conformément au RGPD.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
