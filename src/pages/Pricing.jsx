import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, TrendingUp, Users, Zap, Building2 } from 'lucide-react';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';

function FadeSection({ children, delay = 0, className = '' }) {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

/* ─── Données plans ─────────────────────────────────────────── */
const plans = [
  {
    name: 'Starter',
    monthlyPrice: 149,
    desc: 'Pour démarrer et tester votre marché.',
    features: ['50 leads / mois', '2 filtres actifs', 'Export CSV', 'Email support'],
    cta: 'Démarrer',
    highlight: false,
    popularity: 22,
    popularityLabel: '22% de nos clients',
    icon: Zap,
  },
  {
    name: 'Pro',
    monthlyPrice: 349,
    desc: 'Pour une prospection régulière et structurée.',
    features: ['200 leads / mois', 'Filtres illimités', 'Email personnalisé IA', 'Dashboard analytique', 'Support prioritaire'],
    cta: 'Essai gratuit 14j',
    highlight: true,
    popularity: 61,
    popularityLabel: '61% de nos clients',
    icon: TrendingUp,
  },
  {
    name: 'Growth',
    monthlyPrice: 749,
    desc: 'Pour les équipes commerciales qui scalent.',
    features: ['Leads illimités', 'Multi-utilisateurs', 'Intégration CRM', 'Onboarding dédié', 'Account manager'],
    cta: "Contacter l'équipe",
    highlight: false,
    popularity: 17,
    popularityLabel: '17% de nos clients',
    icon: Users,
  },
];

/* ─── Tableau comparatif ────────────────────────────────────── */
const compareRows = [
  { label: 'Leads / mois',            starter: '50',     pro: '200',    growth: 'Illimités' },
  { label: 'Filtres actifs',          starter: '2',      pro: 'Illimités', growth: 'Illimités' },
  { label: 'Export CSV',              starter: true,     pro: true,     growth: true },
  { label: 'Email personnalisé IA',   starter: false,    pro: true,     growth: true },
  { label: 'Dashboard analytique',   starter: false,    pro: true,     growth: true },
  { label: 'Multi-utilisateurs',      starter: false,    pro: false,    growth: true },
  { label: 'Intégration CRM',         starter: false,    pro: false,    growth: true },
  { label: 'Onboarding dédié',        starter: false,    pro: false,    growth: true },
  { label: 'Account manager',         starter: false,    pro: false,    growth: true },
  { label: 'API accès',               starter: false,    pro: false,    growth: true },
  { label: 'Support prioritaire',     starter: false,    pro: true,     growth: true },
  { label: 'Mise à jour mensuelle',   starter: true,     pro: true,     growth: true },
];

const faqItems = [
  {
    q: 'Peut-on changer de plan à tout moment ?',
    a: 'Oui, totalement. Vous pouvez passer à un plan supérieur ou inférieur à tout moment depuis votre tableau de bord, sans frais ni engagement.',
  },
  {
    q: "Y a-t-il des frais cachés ?",
    a: "Non. Le prix affiché inclut tout. Vous payez uniquement les crédits consommés au-delà du forfait si vous dépassez votre quota mensuel.",
  },
  {
    q: "Que se passe-t-il si je dépasse mon quota de leads ?",
    a: "Vous pouvez acheter des packs de crédits supplémentaires à la carte, ou passer au plan supérieur. Aucune surprise en fin de mois.",
  },
  {
    q: "L'essai gratuit nécessite-t-il une carte bancaire ?",
    a: "Non. L'essai 14 jours est entièrement gratuit, sans CB demandée. Vous renseignez votre moyen de paiement uniquement si vous décidez de continuer.",
  },
  {
    q: "Les données DPE sont-elles à jour ?",
    a: "Oui. Nous synchronisons la base BDNB / ADEME chaque mois. Toutes les données affichées datent de moins de 30 jours.",
  },
];

/* ─── Sous-composants ───────────────────────────────────────── */
function BoolCell({ val }) {
  if (val === true)  return <CheckCircle2 className="w-4 h-4 text-blue-400 mx-auto" />;
  if (val === false) return <XCircle className="w-4 h-4 text-white/20 mx-auto" />;
  return <span className="text-sm font-medium">{val}</span>;
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 text-left text-sm font-medium gap-4 hover:text-blue-400 transition-colors"
      >
        <span>{q}</span>
        {open ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 pb-4' : 'max-h-0'}`}>
        <p className="text-sm text-white/60 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ─── Page principale ───────────────────────────────────────── */
export default function Pricing() {
  const [annual, setAnnual]         = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [rdv, setRdv]               = useState(8);
  const [panier, setPanier]         = useState(3500);

  const annualDiscount = 0.20;
  const getPrice = (monthly) =>
    annual ? Math.round(monthly * (1 - annualDiscount)) : monthly;

  const roiCA       = rdv * panier;
  const planRecom   = rdv <= 4 ? 'Starter' : rdv <= 12 ? 'Pro' : 'Growth';
  const planPrice   = planRecom === 'Starter' ? getPrice(149) : planRecom === 'Pro' ? getPrice(349) : getPrice(749);
  const roiRatio    = ((roiCA / planPrice) * 100).toFixed(0);

  return (
    <section className="section pb-28">
      <div className="section-inner">

        {/* ── En-tête ── */}
        <FadeSection className="text-center mb-10">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">Tarifs</p>
          <h1 className="text-4xl font-bold mb-3">Simple, transparent.</h1>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Pas d&apos;engagement, pas de CB demandée pour l&apos;essai. Changez de plan à tout moment.
          </p>

          {/* Toggle mensuel / annuel */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white/5 rounded-full px-2 py-1.5 text-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full transition-all font-medium ${!annual ? 'bg-blue-500 text-white shadow' : 'text-white/50 hover:text-white/80'}`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full transition-all font-medium flex items-center gap-2 ${annual ? 'bg-blue-500 text-white shadow' : 'text-white/50 hover:text-white/80'}`}
            >
              Annuel
              <span className="text-xs bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded-full font-semibold">
                −20%
              </span>
            </button>
          </div>
        </FadeSection>

        {/* ── Cartes plans ── */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => {
            const Icon = p.icon;
            const price = getPrice(p.monthlyPrice);
            const originalPrice = p.monthlyPrice;
            return (
              <FadeSection key={p.name} delay={i * 80}>
                <div className={`card-glass p-6 h-full flex flex-col gap-5 relative overflow-hidden ${p.highlight ? 'border-blue-500/40 ring-1 ring-blue-500/20' : ''}`}>
                  {p.highlight && (
                    <div className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{ boxShadow: 'inset 0 0 40px 0 rgba(16,185,129,0.06)' }} />
                  )}

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {p.highlight && (
                        <span className="inline-block text-xs font-semibold bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full mb-2">
                          ✦ Recommandé
                        </span>
                      )}
                      <p className="font-bold text-lg">{p.name}</p>
                      <p className="text-white/50 text-xs mt-1">{p.desc}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 shrink-0">
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>

                  {/* Prix avec animation */}
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black tabular-nums transition-all duration-300">
                      {price}€
                    </span>
                    <span className="text-white/40 text-sm mb-1"> / mois</span>
                    {annual && (
                      <span className="text-white/30 text-xs line-through mb-1 ml-1">{originalPrice}€</span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="flex-1 space-y-2">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Popularité */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-white/35 mb-1">
                      <span>{p.popularityLabel}</span>
                      <span>{p.popularity}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/8 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500/60 rounded-full transition-all duration-700"
                        style={{ width: `${p.popularity}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className={p.highlight ? 'btn-accent text-center' : 'btn-outline text-center'}
                  >
                    {p.cta}
                  </Link>
                </div>
              </FadeSection>
            );
          })}
        </div>

        {/* ── Carte Entreprise ── */}
        <FadeSection className="mt-4">
          <div className="card-glass p-5 flex flex-col sm:flex-row items-center gap-4 border-white/8">
            <div className="p-3 rounded-xl bg-white/5 shrink-0">
              <Building2 className="w-5 h-5 text-white/60" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold text-sm">Entreprise / Volume</p>
              <p className="text-white/50 text-xs mt-0.5">+50 utilisateurs, tarif négocié, SLA garanti, intégration sur-mesure.</p>
            </div>
            <Link to="/contact" className="btn-outline text-sm px-5 py-2 shrink-0 whitespace-nowrap">
              Parler à un expert
            </Link>
          </div>
        </FadeSection>

        {/* ── Tableau comparatif ── */}
        <FadeSection className="mt-10">
          <button
            onClick={() => setShowCompare(o => !o)}
            className="mx-auto flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            {showCompare ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {showCompare ? 'Masquer la comparaison' : 'Voir la comparaison complète'}
          </button>

          <div className={`overflow-hidden transition-all duration-500 ${showCompare ? 'max-h-[900px] mt-6' : 'max-h-0'}`}>
            <div className="card-glass p-0 overflow-x-auto rounded-2xl border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left p-4 text-white/50 font-medium w-1/2">Fonctionnalité</th>
                    <th className="text-center p-4 font-semibold">Starter</th>
                    <th className="text-center p-4 font-semibold text-blue-400">Pro</th>
                    <th className="text-center p-4 font-semibold">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={row.label} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.015]' : ''}`}>
                      <td className="p-4 text-white/70">{row.label}</td>
                      <td className="p-4 text-center"><BoolCell val={row.starter} /></td>
                      <td className="p-4 text-center"><BoolCell val={row.pro} /></td>
                      <td className="p-4 text-center"><BoolCell val={row.growth} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeSection>

        {/* ── Calculateur ROI ── */}
        <FadeSection className="mt-10">
          <div className="card-glass p-6 sm:p-8 rounded-3xl border-white/10">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">Calculateur ROI</p>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">Quel est votre retour sur investissement ?</h2>
            <p className="text-sm text-white/50 mb-8">Ajustez les curseurs pour estimer le CA généré par Pisteur.</p>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Rendez-vous signés / mois
                  <span className="ml-2 text-blue-400 font-bold">{rdv}</span>
                </label>
                <input
                  type="range" min="1" max="40" value={rdv}
                  onChange={e => setRdv(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                  <span>1</span><span>40</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Panier moyen / chantier
                  <span className="ml-2 text-blue-400 font-bold">{panier.toLocaleString('fr-FR')} €</span>
                </label>
                <input
                  type="range" min="500" max="20000" step="500" value={panier}
                  onChange={e => setPanier(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                  <span>500 €</span><span>20 000 €</span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white/5 border border-white/8 p-5 text-center">
                <p className="text-xs text-white/40 uppercase tracking-widest mb-2">CA potentiel / mois</p>
                <p className="text-3xl font-black text-white tabular-nums">
                  {roiCA.toLocaleString('fr-FR')} €
                </p>
              </div>
              <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 text-center">
                <p className="text-xs text-blue-300/60 uppercase tracking-widest mb-2">Plan recommandé</p>
                <p className="text-3xl font-black text-blue-400">{planRecom}</p>
                <p className="text-xs text-white/40 mt-1">{planPrice} € / mois</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/8 p-5 text-center">
                <p className="text-xs text-white/40 uppercase tracking-widest mb-2">ROI estimé</p>
                <p className="text-3xl font-black text-amber-400 tabular-nums">×{Math.round(roiRatio / 100)}</p>
                <p className="text-xs text-white/40 mt-1">{roiRatio}% du CA / coût plan</p>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ── Crédits ── */}
        <FadeSection className="mt-10">
          <div className="card-glass p-6 sm:p-8 rounded-3xl border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Comment fonctionnent les crédits ?</h2>
            <p className="text-sm text-white/60 mb-6">
              Vous ne payez que pour ce que vous obtenez. 0 crédit débité si l&apos;information est introuvable.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { val: '1 crédit', sub: '= 1 lead qualifié', desc: 'Association bâtiment x entreprise avec score % Match et potentiel €.' },
                { val: '1 crédit', sub: '= 1 adresse email', desc: 'Email nominatif du décideur. 0 crédit si non trouvé.' },
                { val: '10 crédits', sub: '= 1 téléphone portable', desc: 'Numéro direct du contact. 0 crédit si non trouvé.' },
              ].map(c => (
                <div key={c.sub} className="rounded-2xl bg-navy-950/70 p-5 border border-white/10">
                  <p className="text-3xl font-bold text-blue-400">{c.val}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-blue-300/90">{c.sub}</p>
                  <p className="mt-4 text-sm text-white/60 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* ── FAQ ── */}
        <FadeSection className="mt-10">
          <div className="card-glass p-6 sm:p-8 rounded-3xl border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Questions fréquentes</h2>
            {faqItems.map(item => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
            <p className="mt-6 text-center text-sm text-white/55">
              Autre question ?{' '}
              <Link to="/contact" className="font-medium text-blue-400 underline underline-offset-4">
                Demandez une démo personnalisée.
              </Link>
            </p>
          </div>
        </FadeSection>

        <FadeSection className="mt-10 text-center text-sm text-white/40">
          Tous les plans incluent l&apos;accès aux données DPE nationales, la mise à jour mensuelle et l&apos;assistance email.
        </FadeSection>
      </div>

      {/* ── Sticky CTA mobile ── */}
      <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden p-4 bg-navy-950/90 backdrop-blur-md border-t border-white/8">
        <Link to="/contact" className="btn-accent w-full text-center block">
          Essai gratuit 14j — sans CB
        </Link>
      </div>
    </section>
  );
}
