import { useState, useRef } from 'react';
import { sendContactEmail } from '../lib/emailjs';
import { supabase } from '../lib/supabase';
import { CheckCircle2, AlertCircle, Loader2, Mail, Phone, Clock } from 'lucide-react';

const profiles = ['Artisan / PME', 'Entreprise de rénovation', 'Bureau d\'études', 'Promoteur', 'Autre'];

/* ── Illustration SVG animée ─────────────────────────────── */
function BuildingIllustration() {
  return (
    <div className="w-full" aria-hidden="true">
      <style>{`
        @keyframes bld-rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes win-blink {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 0.15; }
        }
        @keyframes pin-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }
      `}</style>

      {/* Rang des pastilles — alignées sur les colonnes des bâtiments */}
      <div className="flex items-end justify-center gap-3 mb-2">
        {/* Pastille gauche — au-dessus bâtiment gauche (52px) */}
        <div className="flex justify-center" style={{ width: 52, animation: 'pin-float 3s ease-in-out 0.8s infinite' }}>
          <span className="inline-flex items-center gap-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Lead qualifié
          </span>
        </div>
        {/* Espace central bâtiment (74px) — vide */}
        <div style={{ width: 74 }} />
        {/* Pastille droite — au-dessus bâtiment droit (58px) */}
        <div className="flex justify-center" style={{ width: 58, animation: 'pin-float 3s ease-in-out 1.4s infinite' }}>
          <span className="inline-flex items-center gap-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            DPE à rénover
          </span>
        </div>
      </div>

      {/* Rang des bâtiments */}
      <div className="flex items-end justify-center gap-3">
        {/* Bâtiment gauche petit */}
        <svg width="52" height="80" viewBox="0 0 52 80" fill="none"
          style={{ animation: 'bld-rise 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}>
          <rect x="4" y="10" width="44" height="70" rx="3" fill="#1e2d40" stroke="#2a4a5e" strokeWidth="1.5"/>
          {[18,32,46].map(y => [
            <rect key={`l${y}a`} x="10" y={y} width="10" height="9" rx="1.5" fill="#10b981" opacity="0.25"/>,
            <rect key={`l${y}b`} x="32" y={y} width="10" height="9" rx="1.5" fill="#10b981" opacity="0.15"/>,
          ])}
          <rect x="14" y="2" width="24" height="10" rx="5" fill="#10b981" opacity="0.8"/>
          <text x="26" y="10" textAnchor="middle" fontSize="6" fill="white" fontWeight="700">DPE F</text>
        </svg>

        {/* Bâtiment central grand */}
        <svg width="74" height="130" viewBox="0 0 74 130" fill="none"
          style={{ animation: 'bld-rise 0.9s cubic-bezier(0.22,1,0.36,1) 0s both' }}>
          <rect x="4" y="4" width="66" height="126" rx="4" fill="#162030" stroke="#2a4a5e" strokeWidth="1.5"/>
          {[16,32,48,64,80,96].map(y => [
            <rect key={`m${y}a`} x="12" y={y} width="14" height="11" rx="2" fill="#10b981"
              opacity={y === 32 ? '0.7' : '0.2'}
              style={y === 32 ? { animation: 'win-blink 3s ease-in-out 1.2s infinite' } : {}}/>,
            <rect key={`m${y}b`} x="30" y={y} width="14" height="11" rx="2" fill="#10b981" opacity="0.15"/>,
            <rect key={`m${y}c`} x="48" y={y} width="14" height="11" rx="2" fill="#10b981"
              opacity={y === 48 ? '0.55' : '0.1'}/>,
          ])}
          <line x1="37" y1="4" x2="37" y2="-8" stroke="#10b981" strokeWidth="1.5" opacity="0.5"/>
          <circle cx="37" cy="-9" r="2.5" fill="#10b981" opacity="0.7"
            style={{ animation: 'win-blink 2s ease-in-out 0.5s infinite' }}/>
          <rect x="18" y="112" width="38" height="12" rx="6" fill="#ef4444" opacity="0.75"/>
          <text x="37" y="121" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">DPE G</text>
        </svg>

        {/* Bâtiment droit moyen */}
        <svg width="58" height="100" viewBox="0 0 58 100" fill="none"
          style={{ animation: 'bld-rise 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both' }}>
          <rect x="4" y="4" width="50" height="96" rx="3" fill="#1a2a38" stroke="#2a4a5e" strokeWidth="1.5"/>
          {[16,30,44,58,72].map(y => [
            <rect key={`r${y}a`} x="10" y={y} width="12" height="10" rx="1.5" fill="#10b981" opacity="0.2"/>,
            <rect key={`r${y}b`} x="36" y={y} width="12" height="10" rx="1.5" fill="#10b981" opacity="0.15"/>,
          ])}
          <rect x="12" y="84" width="34" height="12" rx="6" fill="#f59e0b" opacity="0.7"/>
          <text x="29" y="93" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">DPE E</text>
        </svg>
      </div>

      {/* Sol */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mt-0" />
    </div>
  );
}

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', company: '', type: profiles[0], message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const { error: dbError } = await supabase.from('contacts').insert([{
        name: form.name,
        email: form.email,
        company: form.company,
        type: form.type,
        message: form.message,
        created_at: new Date().toISOString(),
      }]);
      if (dbError) throw new Error(dbError.message);

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
        <div className="space-y-7">
          <div>
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">Contact</p>
            <h1 className="text-4xl font-bold mb-3">Parlons de votre marché</h1>
            <p className="text-white/60 text-sm leading-relaxed">
              Notre équipe vous configure une démo sur vos cibles réelles et vous montre combien de bâtiments correspondent à votre ICP dans votre zone.
            </p>
          </div>

          <BuildingIllustration />

          <div className="space-y-3">
            {[
              { icon: <Mail className="w-4 h-4" />, label: 'Email', value: 'contact@pisteur.fr', href: 'mailto:contact@pisteur.fr' },
              { icon: <Phone className="w-4 h-4" />, label: 'Téléphone', value: '+33 1 23 45 67 89', href: 'tel:+33123456789' },
              { icon: <Clock className="w-4 h-4" />, label: 'Réponse', value: 'Sous 24h ouvrées', href: null },
            ].map(({ icon, label, value, href }) => (
              <div key={label} className="card-glass flex items-center gap-4 px-4 py-3 hover:border-white/20 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  {icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-white/40 leading-none mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-medium text-white/80 hover:text-emerald-400 transition-colors truncate block">{value}</a>
                  ) : (
                    <p className="text-sm font-medium text-white/80">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire */}
        <div className="card-glass p-6">
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              <h2 className="text-xl font-bold">Message envoyé !</h2>
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
