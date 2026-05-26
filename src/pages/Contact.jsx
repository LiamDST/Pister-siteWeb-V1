import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight, Star, Clock, Users, Zap, Shield, BarChart3, Play } from 'lucide-react';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';

function FadeSection({ children, delay = 0, className = '' }) {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
      {children}
    </div>
  );
}

const benefits = [
  { icon: Zap, title: 'Opérationnel en 5 min', desc: 'Paramétrez votre ICP et recevez vos premiers leads immédiatement.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: BarChart3, title: 'Démo sur mesure', desc: 'Nous configurons la démo avec vos critères réels et votre zone cible.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Users, title: 'Accompagnement dédié', desc: 'Un expert bâtiment vous guide pendant et après votre onboarding.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Shield, title: 'Sans engagement', desc: '14 jours gratuits, sans carte bancaire. Annulation en 1 clic.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

const testimonials = [
  { name: 'Sarah M.', role: 'Dir. commerciale — IsolPro', text: '47 RDV qualifiés en 3 semaines. Résultat inégalé avec toutes les solutions testées.', stars: 5, avatar: 'SM' },
  { name: 'Karim B.', role: 'CEO — RénoPlus', text: 'Le score Match est bluffant. On ne perd plus de temps sur les mauvais prospects.', stars: 5, avatar: 'KB' },
  { name: 'Anne-Sophie L.', role: 'Commerciale — EnergétiK', text: "51% de taux d'ouverture sur les emails IA. C'est 2× plus que nos envois manuels.", stars: 5, avatar: 'AL' },
];

function Card3D({ children, className = '' }) {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(8px)`;
  };
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };
  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ${className}`} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
}

export default function Contact() {
  const [step, setStep] = useState(1); // 1 = form, 2 = success
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', size: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep(2);
  };

  return (
    <div className="relative min-h-screen">
      <div className="page-circles" />
      <div className="page-circles-extra" />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="hero-glow opacity-60" />
        <div className="dot-grid opacity-30" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Gauche — texte + bénéfices */}
            <div>
              <FadeSection>
                <span className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-xs font-semibold px-4 py-2 rounded-full mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Réponse en moins de 2h · Démo offerte
                </span>
              </FadeSection>

              <FadeSection delay={80}>
                <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-6">
                  Obtenez votre<br />
                  <span className="stat-number">démo personnalisée</span>
                </h1>
                <p className="text-white/55 text-lg mb-10 leading-relaxed">
                  Remplissez le formulaire et un expert Pisteur configure une démo avec vos critères réels — bâtiments dans votre zone, DPE ciblés, email IA.
                </p>
              </FadeSection>

              {/* Bénéfices 3D */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {benefits.map((b, i) => (
                  <FadeSection key={b.title} delay={160 + i * 80}>
                    <Card3D>
                      <div className={`card-glass p-4 h-full contact-benefit-card`}>
                        <div className={`w-9 h-9 rounded-xl ${b.bg} flex items-center justify-center mb-3`}>
                          <b.icon className={b.color} size={17} />
                        </div>
                        <p className="font-bold text-sm mb-1">{b.title}</p>
                        <p className="text-xs text-white/45 leading-relaxed">{b.desc}</p>
                      </div>
                    </Card3D>
                  </FadeSection>
                ))}
              </div>

              {/* Social proof */}
              <FadeSection delay={500}>
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="flex -space-x-2 shrink-0">
                    {['SM','KB','AL'].map(av => (
                      <div key={av} className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white/10 flex items-center justify-center text-[10px] font-bold text-white">{av}</div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} size={11} className="text-amber-400 fill-amber-400" />)}
                      <span className="text-xs text-amber-400 font-bold ml-1">4.9/5</span>
                    </div>
                    <p className="text-xs text-white/50">+340 professionnels nous font confiance</p>
                  </div>
                </div>
              </FadeSection>
            </div>

            {/* Droite — formulaire 3D */}
            <FadeSection delay={200}>
              <Card3D>
                {step === 2 ? (
                  <div className="card-glass p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
                    <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="text-emerald-400" size={36} />
                    </div>
                    <h2 className="text-2xl font-black mb-3">Demande reçue !</h2>
                    <p className="text-white/55 mb-8 leading-relaxed">
                      Notre équipe va configurer votre démo personnalisée et vous contacte sous <strong className="text-white">2h</strong> en jours ouvrés.
                    </p>
                    <div className="space-y-3">
                      {['📧 Confirmation envoyée par email', '📅 Vous serez recontacté sous 2h', '🎯 Démo configurée sur vos critères'].map(item => (
                        <div key={item} className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2.5 text-sm text-emerald-300">{item}</div>
                      ))}
                    </div>
                    <Link to="/simulation" className="btn-accent w-full justify-center mt-8 gap-2">
                      Simuler mon marché en attendant <ArrowRight size={16} />
                    </Link>
                  </div>
                ) : (
                  <div className="card-glass p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
                    <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-blue-500/5 blur-2xl pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-7">
                        <div>
                          <h2 className="text-xl font-black">Demander une démo</h2>
                          <p className="text-xs text-white/40 mt-1">Gratuite · Personnalisée · Sans engagement</p>
                        </div>
                        <div className="flex items-center gap-1.5 bg-blue-500/15 border border-blue-500/25 px-3 py-1.5 rounded-full">
                          <Clock size={12} className="text-blue-400" />
                          <span className="text-xs text-blue-300 font-semibold">~2h</span>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-white/40 mb-1.5 block">Prénom & Nom *</label>
                            <input
                              type="text" required placeholder="Jean Martin"
                              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                              className="form-input text-sm py-2.5"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-white/40 mb-1.5 block">Entreprise *</label>
                            <input
                              type="text" required placeholder="IsolPro SAS"
                              value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                              className="form-input text-sm py-2.5"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-white/40 mb-1.5 block">Email professionnel *</label>
                          <input
                            type="email" required placeholder="jean@isolpro.fr"
                            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                            className="form-input text-sm py-2.5"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-white/40 mb-1.5 block">Téléphone</label>
                            <input
                              type="tel" placeholder="+33 6 00 00 00 00"
                              value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                              className="form-input text-sm py-2.5"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-white/40 mb-1.5 block">Taille équipe</label>
                            <select
                              value={form.size} onChange={e => setForm({ ...form, size: e.target.value })}
                              className="form-input text-sm py-2.5 cursor-pointer"
                            >
                              <option value="">Sélectionner</option>
                              <option>1 personne</option>
                              <option>2–5 personnes</option>
                              <option>6–20 personnes</option>
                              <option>+20 personnes</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-white/40 mb-1.5 block">Votre besoin (optionnel)</label>
                          <textarea
                            rows={3} placeholder="Ex: Je cherche des bâtiments résidentiels DPE F/G en Île-de-France…"
                            value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                            className="form-input text-sm py-2.5 resize-none"
                          />
                        </div>

                        <button type="submit" disabled={loading}
                          className="w-full btn-accent py-3.5 text-sm font-bold gap-2 justify-center disabled:opacity-70">
                          {loading ? (
                            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Envoi en cours…</>
                          ) : (
                            <><Play size={15} /> Demander ma démo gratuite</>
                          )}
                        </button>
                      </form>

                      <p className="text-[11px] text-white/25 text-center mt-4">
                        ✓ Aucune carte bancaire · ✓ Sans engagement · ✓ RGPD conforme
                      </p>
                    </div>
                  </div>
                )}
              </Card3D>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section className="section relative">
        <div className="section-inner">
          <FadeSection className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">Témoignages</p>
            <h2 className="text-3xl font-black">Ils ont fait confiance à Pisteur</h2>
          </FadeSection>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <FadeSection key={t.name} delay={i * 100}>
                <Card3D className="h-full">
                  <div className="card-glass p-6 h-full flex flex-col gap-4">
                    {/* Google badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.stars }).map((_, s) => (
                          <Star key={s} size={13} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-lg px-2.5 py-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span className="text-[10px] text-white/50 font-medium">Google</span>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed italic flex-1">"{t.text}"</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-white/8">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">{t.avatar}</div>
                      <div>
                        <p className="text-sm font-bold">{t.name}</p>
                        <p className="text-xs text-white/40">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── INFOS CONTACT ── */}
      <section className="section relative">
        <div className="section-inner max-w-4xl">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Mail, label: 'Email', value: 'contact@pisteur.fr', href: 'mailto:contact@pisteur.fr', color: 'text-blue-400', bg: 'bg-blue-500/10' },
              { icon: Phone, label: 'Téléphone', value: '+33 1 00 00 00 00', href: 'tel:+33100000000', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              { icon: MapPin, label: 'Adresse', value: 'Paris, France', href: null, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            ].map(({ icon: Icon, label, value, href, color, bg }, i) => (
              <FadeSection key={label} delay={i * 80}>
                <Card3D>
                  <div className="card-glass p-6 text-center">
                    <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={color} size={20} />
                    </div>
                    <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">{label}</p>
                    {href ? (
                      <a href={href} className={`text-sm font-semibold ${color} hover:underline`}>{value}</a>
                    ) : (
                      <p className="text-sm font-semibold">{value}</p>
                    )}
                  </div>
                </Card3D>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
