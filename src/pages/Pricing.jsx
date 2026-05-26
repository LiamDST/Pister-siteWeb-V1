import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Zap, X, HelpCircle, TrendingUp, Users, Building2, Star, Sparkles, Shield, Mail, BarChart3 } from 'lucide-react';
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

function Card3D({ children, className = '', intensity = 8 }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) translateZ(12px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)'; };
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave}
      className={`transition-all duration-300 ease-out ${className}`} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
}

const plans = [
  {
    name: 'Starter',
    badge: null,
    price: { monthly: '49', annual: '39' },
    period: '/mois',
    desc: 'Lancez votre prospection bâtiment sans risque.',
    color: 'text-blue-400',
    glow: 'hover:shadow-blue-500/10',
    features: [
      { text: '100 crédits leads/mois', included: true },
      { text: '50 crédits emails IA', included: true },
      { text: '1 utilisateur', included: true },
      { text: 'Export CSV', included: true },
      { text: 'Support par email', included: true },
      { text: 'Filtres avancés', included: false },
      { text: 'Intégration CRM', included: false },
      { text: 'API & Webhooks', included: false },
    ],
    cta: 'Démarrer gratuitement',
    ctaTo: '/demo',
    highlighted: false,
  },
  {
    name: 'Pro',
    badge: '⚡ Le plus populaire',
    price: { monthly: '149', annual: '119' },
    period: '/mois',
    desc: 'Pour les équipes qui veulent scaler leur prospection.',
    color: 'text-emerald-400',
    glow: 'hover:shadow-emerald-500/15',
    features: [
      { text: '500 crédits leads/mois', included: true },
      { text: '300 crédits emails IA', included: true },
      { text: '5 utilisateurs', included: true },
      { text: 'Export CSV & XLSX', included: true },
      { text: 'Support prioritaire', included: true },
      { text: 'Filtres avancés illimités', included: true },
      { text: 'Intégration CRM (HubSpot, Pipedrive)', included: true },
      { text: 'API & Webhooks', included: false },
    ],
    cta: 'Choisir Pro',
    ctaTo: '/demo',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    badge: null,
    price: { monthly: 'Sur devis', annual: 'Sur devis' },
    period: '',
    desc: 'Pour les grands comptes et franchises nationales.',
    color: 'text-purple-400',
    glow: 'hover:shadow-purple-500/10',
    features: [
      { text: 'Crédits leads illimités', included: true },
      { text: 'Emails IA illimités', included: true },
      { text: 'Utilisateurs illimités', included: true },
      { text: 'Export tous formats', included: true },
      { text: 'Account manager dédié', included: true },
      { text: 'Filtres sur mesure', included: true },
      { text: 'Intégrations personnalisées', included: true },
      { text: 'API & Webhooks prioritaires', included: true },
    ],
    cta: 'Nous contacter',
    ctaTo: '/contact',
    highlighted: false,
  },
];

const comparaison = [
  { label: 'Crédits leads/mois', starter: '100', pro: '500', enterprise: 'Illimités' },
  { label: 'Crédits emails IA', starter: '50', pro: '300', enterprise: 'Illimités' },
  { label: 'Utilisateurs', starter: '1', pro: '5', enterprise: 'Illimités' },
  { label: 'Filtres actifs', starter: '2', pro: 'Illimités', enterprise: 'Illimités' },
  { label: 'Export CSV', starter: true, pro: true, enterprise: true },
  { label: 'Intégration CRM', starter: false, pro: true, enterprise: true },
  { label: 'API REST', starter: false, pro: false, enterprise: true },
  { label: 'Support', starter: 'Email', pro: 'Prioritaire', enterprise: 'Dédié' },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  return (
    <div className="relative min-h-screen">
      <div className="page-circles" />
      <div className="page-circles-extra" />

      <section className="section relative pt-28 overflow-hidden">
        {/* Fond grille */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
        <div className="hero-glow opacity-50" />

        <div className="section-inner relative z-10">

          {/* Header */}
          <FadeSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/25 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <Sparkles size={12} /> Tarifs — simples &amp; transparents
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-4">
              Investissez dans vos leads,<br />
              <span className="stat-number">pas dans une usine à gaz</span>
            </h1>
            <p className="text-white/50 text-lg mb-8">Sans engagement. Annulez à tout moment. Essai 14j gratuit.</p>

            {/* Toggle avec animation */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-1.5 relative">
              <button onClick={() => setAnnual(false)}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${!annual ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-white/50 hover:text-white/80'}`}>
                Mensuel
              </button>
              <button onClick={() => setAnnual(true)}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2.5 ${annual ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'text-white/50 hover:text-white/80'}`}>
                Annuel
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full transition-all ${annual ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>-20%</span>
              </button>
              {annual && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/25 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                  🎉 Meilleure offre
                </span>
              )}
            </div>
          </FadeSection>

          {/* Cards 3D */}
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, i) => (
              <FadeSection key={plan.name} delay={i * 120}>
                <Card3D className="h-full" intensity={plan.highlighted ? 5 : 8}>
                  <div
                    className={`relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-500 cursor-default ${
                      plan.highlighted
                        ? 'ring-1 ring-emerald-500/30'
                        : 'border border-white/10 hover:border-white/20'
                    }`}
                    style={{
                      background: plan.highlighted
                        ? 'linear-gradient(145deg, rgba(16,185,129,0.12) 0%, rgba(255,255,255,0.05) 100%)'
                        : 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                      boxShadow: plan.highlighted
                        ? '0 0 50px rgba(16,185,129,0.12), 0 30px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)'
                        : '0 10px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
                    }}
                    onMouseEnter={() => setHoveredPlan(plan.name)}
                    onMouseLeave={() => setHoveredPlan(null)}
                  >
                    {/* Ligne top colorée */}
                    <div className="absolute top-0 left-0 right-0 h-px" style={{
                      background: plan.highlighted
                        ? 'linear-gradient(90deg, transparent, rgba(16,185,129,0.8), transparent)'
                        : plan.name === 'Starter'
                          ? 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)'
                          : 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)',
                    }} />

                    {/* Glow coin haut droit */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-opacity duration-500"
                      style={{
                        background: plan.highlighted ? 'rgba(16,185,129,0.12)' : plan.name === 'Starter' ? 'rgba(59,130,246,0.08)' : 'rgba(139,92,246,0.08)',
                        opacity: hoveredPlan === plan.name ? 1 : 0.5,
                      }} />

                    {/* Badge populaire */}
                    {plan.badge && (
                      <div className="absolute -top-px left-1/2 -translate-x-1/2 z-10">
                        <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[11px] font-black px-4 py-1.5 rounded-b-xl shadow-lg shadow-emerald-500/40">
                          <Zap size={10} /> Le plus populaire
                        </span>
                      </div>
                    )}

                    <div className={`relative z-10 p-7 flex flex-col flex-1 ${plan.badge ? 'pt-9' : ''}`}>
                      {/* Nom + couleur */}
                      <div className="flex items-center justify-between mb-4">
                        <h2 className={`text-base font-black ${plan.color}`}>{plan.name}</h2>
                        {plan.name === 'Starter' && <Shield size={14} className="text-blue-400/60" />}
                        {plan.name === 'Pro' && <Star size={14} className="text-emerald-400/60 fill-emerald-400/30" />}
                        {plan.name === 'Enterprise' && <Sparkles size={14} className="text-purple-400/60" />}
                      </div>

                      {/* Prix avec animation flip */}
                      <div className="mb-5">
                        {plan.price.monthly === 'Sur devis' ? (
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black">Sur devis</span>
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-6xl font-black tabular-nums tracking-tighter transition-all duration-500">
                              {annual ? plan.price.annual : plan.price.monthly}
                            </span>
                            <div>
                              <span className="text-white/40 text-sm">€</span>
                              <span className="text-white/40 text-sm">/mois</span>
                            </div>
                          </div>
                        )}
                        {plan.price.monthly !== 'Sur devis' && annual && (
                          <p className="text-xs text-emerald-400 mt-1.5 flex items-center gap-1">
                            <CheckCircle2 size={11} />
                            Économisez {(parseInt(plan.price.monthly) - parseInt(plan.price.annual)) * 12}€/an
                          </p>
                        )}
                        <p className="text-white/45 text-sm mt-2">{plan.desc}</p>
                      </div>

                      {/* CTA */}
                      <Link to={plan.ctaTo}
                        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-sm transition-all duration-300 hover:scale-[1.03] mb-6 group ${
                          plan.highlighted
                            ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/30'
                            : plan.name === 'Starter'
                              ? 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 hover:border-blue-500/50'
                              : 'bg-white/8 hover:bg-white/12 text-white border border-white/15'
                        }`}>
                        {plan.cta}
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                      </Link>

                      {/* Séparateur */}
                      <div className="h-px bg-white/8 mb-5" />

                      {/* Features */}
                      <div className="space-y-3 flex-1">
                        {plan.features.map((f) => (
                          <div key={f.text} className={`flex items-center gap-2.5 transition-all duration-200 ${f.included ? '' : 'opacity-35'}`}>
                            {f.included ? (
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                                plan.highlighted ? 'bg-emerald-500/20' : 'bg-white/8'
                              }`}>
                                <CheckCircle2 size={11} className={plan.color} />
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                <X size={10} className="text-white/30" />
                              </div>
                            )}
                            <span className={`text-sm ${f.included ? 'text-white/80' : 'text-white/30 line-through'}`}>{f.text}</span>
                          </div>
                        ))}
                      </div>

                      {/* Essai gratuit badge si starter/pro */}
                      {plan.name !== 'Enterprise' && (
                        <div className="mt-5 pt-4 border-t border-white/8 flex items-center gap-2 text-xs text-white/35">
                          <CheckCircle2 size={11} className="text-emerald-400" />
                          14 jours gratuits inclus · Sans CB
                        </div>
                      )}
                    </div>
                  </div>
                </Card3D>
              </FadeSection>
            ))}
          </div>

          {/* Bandeau social proof */}
          <FadeSection className="mt-14">
            <div className="relative card-glass p-6 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { icon: Users, val: '340+', label: 'entreprises actives', color: '#3b82f6' },
                  { icon: Star, val: '4.9/5', label: 'satisfaction client', color: '#f59e0b' },
                  { icon: TrendingUp, val: '3×', label: 'plus de RDV', color: '#10b981' },
                  { icon: Building2, val: '1,5M', label: 'bâtiments indexés', color: '#8b5cf6' },
                ].map(({ icon: Icon, val, label, color }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: color + '18' }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <p className="text-2xl font-black tabular-nums" style={{ color }}>{val}</p>
                    <p className="text-xs text-white/40">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>

          {/* Tableau comparatif 3D */}
          <FadeSection className="mt-10">
            <Card3D intensity={2}>
              <div className="rounded-2xl overflow-hidden border border-white/10"
                style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))' }}>
                <div className="px-6 py-5 border-b border-white/8 flex items-center justify-between">
                  <h3 className="font-black text-lg">Comparaison détaillée</h3>
                  <span className="text-xs text-white/30 bg-white/5 px-3 py-1 rounded-full">Toutes les fonctionnalités</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/8">
                        <th className="text-left px-6 py-4 text-white/40 font-medium w-1/2">Fonctionnalité</th>
                        <th className="text-center px-4 py-4">
                          <span className="text-blue-400 font-black">Starter</span>
                          <div className="text-[10px] text-white/30 font-normal mt-0.5">49€/mois</div>
                        </th>
                        <th className="text-center px-4 py-4 relative">
                          <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
                          <span className="text-emerald-400 font-black relative z-10">Pro</span>
                          <div className="text-[10px] text-white/30 font-normal mt-0.5 relative z-10">149€/mois</div>
                        </th>
                        <th className="text-center px-4 py-4">
                          <span className="text-purple-400 font-black">Enterprise</span>
                          <div className="text-[10px] text-white/30 font-normal mt-0.5">Sur devis</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparaison.map((row, i) => (
                        <tr key={row.label}
                          className={`border-b border-white/5 transition-colors hover:bg-white/[0.025] ${i % 2 === 0 ? 'bg-white/[0.015]' : ''}`}>
                          <td className="px-6 py-3.5 text-white/65 text-sm">{row.label}</td>
                          {[row.starter, row.pro, row.enterprise].map((val, j) => (
                            <td key={j} className={`text-center px-4 py-3.5 ${j === 1 ? 'relative' : ''}`}>
                              {j === 1 && <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />}
                              <span className="relative z-10">
                                {typeof val === 'boolean' ? (
                                  val
                                    ? <CheckCircle2 size={16} className={`inline ${j === 0 ? 'text-blue-400' : j === 1 ? 'text-emerald-400' : 'text-purple-400'}`} />
                                    : <X size={16} className="inline text-white/15" />
                                ) : (
                                  <span className={`text-xs font-semibold ${j === 1 ? 'text-emerald-300' : 'text-white/60'}`}>{val}</span>
                                )}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card3D>
          </FadeSection>

          {/* FAQ rapide + CTA 3D */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <FadeSection>
              <Card3D intensity={4}>
                <div className="card-glass p-7 h-full flex flex-col">
                  <h3 className="font-black mb-5 flex items-center gap-2 text-base">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center shrink-0">
                      <HelpCircle size={15} className="text-blue-400" />
                    </div>
                    Questions fréquentes
                  </h3>
                  <div className="space-y-4 flex-1">
                    {[
                      { q: 'Puis-je changer de plan ?', a: 'Oui, à tout moment depuis votre dashboard, sans frais ni engagement.' },
                      { q: 'Que se passe-t-il après le quota ?', a: 'Achetez des crédits supplémentaires à la carte. Aucun débit automatique.' },
                      { q: 'Puis-je annuler à tout moment ?', a: 'Oui, résiliation immédiate sans pénalité. Vos données exportées restent vôtres.' },
                    ].map(({ q, a }, idx) => (
                      <div key={q} className="flex gap-3">
                        <span className="w-5 h-5 rounded-full bg-blue-500/15 border border-blue-500/25 text-[10px] font-black text-blue-400 flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                        <div>
                          <p className="text-sm font-bold mb-0.5">{q}</p>
                          <p className="text-xs text-white/45 leading-relaxed">{a}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/faq" className="text-xs text-blue-400 hover:underline mt-5 inline-flex items-center gap-1">
                    Toutes les questions <ArrowRight size={11} />
                  </Link>
                </div>
              </Card3D>
            </FadeSection>
            <FadeSection delay={100}>
              <Card3D intensity={4}>
                <div className="card-glass p-7 flex flex-col h-full">
                  <h3 className="font-black mb-4 flex items-center gap-2 text-base">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                      <TrendingUp size={15} className="text-emerald-400" />
                    </div>
                    Résultats prouvés
                  </h3>
                  <div className="space-y-3 flex-1">
                    {[
                      { v: '47%', l: "taux d'ouverture email IA", icon: Mail, color: '#10b981' },
                      { v: '3×', l: 'plus de RDV qualifiés', icon: TrendingUp, color: '#f43f5e' },
                      { v: '8h', l: 'économisées par semaine', icon: BarChart3, color: '#8b5cf6' },
                    ].map(({ v, l, icon: Icon, color }) => (
                      <div key={l} className="flex items-center gap-3 rounded-xl px-4 py-3 border border-white/8 hover:border-white/15 transition-all duration-200 group"
                        style={{ background: color + '08' }}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: color + '18' }}>
                          <Icon size={16} style={{ color }} />
                        </div>
                        <div>
                          <span className="text-2xl font-black tabular-nums" style={{ color }}>{v}</span>
                          <p className="text-xs text-white/45 mt-0.5">{l}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/cas-clients" className="btn-outline text-sm mt-5 gap-2 justify-center">
                    Voir les études de cas <ArrowRight size={14} />
                  </Link>
                </div>
              </Card3D>
            </FadeSection>
          </div>

        </div>
      </section>
    </div>
  );
}
