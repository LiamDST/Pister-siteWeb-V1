import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, Clock, Users, Building2,
  ArrowRight, CheckCircle2, Quote
} from 'lucide-react';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';

function FadeSection({ children, delay = 0, className = '' }) {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

const CASES = [
  {
    id: 'isolpro',
    company: 'IsolPro',
    sector: 'Isolation thermique',
    size: '12 commerciaux',
    color: 'emerald',
    tagline: 'De 3h de prospection par jour à 45 minutes',
    challenge: 'IsolPro prospectait manuellement via des fichiers Excel et des annuaires locaux. Chaque commercial passait 3h par jour à qualifier des cibles sans garantie de pertinence.',
    solution: 'Pisteur a été configuré sur l\'ICP d\'IsolPro en 20 minutes : bâtiments résidentiels collectifs DPE E/F/G, surfaces > 1 500 m², dans un rayon de 80 km autour de Lyon.',
    results: [
      { metric: '+43%',  label: 'taux de conversion RDV',         icon: <TrendingUp className="w-4 h-4" /> },
      { metric: '−62%',  label: 'temps de prospection quotidien',  icon: <Clock className="w-4 h-4" /> },
      { metric: '×2.8',  label: 'chiffre d\'affaires en 4 mois',  icon: <TrendingUp className="w-4 h-4" /> },
      { metric: '9',     label: 'nouveaux chantiers / mois',       icon: <Building2 className="w-4 h-4" /> },
    ],
    quote: "En arrivant au RDV, je connais déjà le DPE, la surface, et le nom du gestionnaire. Les prospects ont l'impression que j'ai fait mes devoirs. C'est bluffant.",
    author: 'Marc Dupont',
    role: 'Directeur commercial, IsolPro',
    timeline: '4 mois',
    highlights: [
      'Configuration ICP en 20 minutes',
      'Leads livrés chaque matin à 8h',
      'Email personnalisé généré par l\'IA pour chaque bâtiment',
      'Intégration directe dans leur CRM HubSpot',
    ],
  },
  {
    id: 'energetik',
    company: 'EnergétiK Conseil',
    sector: 'Audit énergétique',
    size: '3 auditeurs',
    color: 'blue',
    tagline: 'Une TPE qui compete avec les grandes structures',
    challenge: 'En tant que petite structure de 3 auditeurs, EnergétiK n\'avait ni le budget ni le temps pour une prospection commerciale structurée. Ils dépendaient du bouche-à-oreille.',
    solution: 'Pisteur a permis à l\'équipe de cibler précisément les syndics de copropriété gérant des immeubles DPE F/G en Île-de-France, avec coordonnées nominatives directes.',
    results: [
      { metric: '18',    label: 'leads qualifiés / semaine',  icon: <Users className="w-4 h-4" /> },
      { metric: '+210%', label: 'de CA en 6 mois',            icon: <TrendingUp className="w-4 h-4" /> },
      { metric: '1h',    label: 'de prospection / jour max',  icon: <Clock className="w-4 h-4" /> },
      { metric: '24',    label: 'nouveaux clients signés',    icon: <CheckCircle2 className="w-4 h-4" /> },
    ],
    quote: "On a l'impression de jouer dans une catégorie au-dessus. Nos prospects pensent qu'on a une vraie équipe commerciale. La réalité c'est juste Pisteur.",
    author: 'Sophie Martin',
    role: 'Gérante, EnergétiK Conseil',
    timeline: '6 mois',
    highlights: [
      'Zéro recrutement commercial supplémentaire',
      'Ciblage syndics de copropriété avec NAF 68.32A',
      'Relances automatiques J+3 et J+7',
      'Taux d\'ouverture email : 41% vs 18% en moyenne secteur',
    ],
  },
  {
    id: 'renoplus',
    company: 'RénoPlus',
    sector: 'Rénovation énergétique globale',
    size: '28 commerciaux',
    color: 'amber',
    tagline: 'Scalabilité nationale en 8 semaines',
    challenge: 'RénoPlus venait de lever des fonds et devait étendre sa prospection à 5 nouvelles régions en moins de 3 mois. Leurs outils internes ne permettaient pas ce scale.',
    solution: 'Déploiement Pisteur sur 5 régions simultanément avec des ICP régionaux distincts. Intégration API avec leur CRM Salesforce pour un pipeline unifié.',
    results: [
      { metric: '5',     label: 'régions opérationnelles simultanément', icon: <Building2 className="w-4 h-4" /> },
      { metric: '+380%', label: 'de leads qualifiés vs avant',           icon: <TrendingUp className="w-4 h-4" /> },
      { metric: '8 sem', label: 'pour atteindre le régime nominal',      icon: <Clock className="w-4 h-4" /> },
      { metric: '×3.2',  label: 'ROI sur les 6 premiers mois',          icon: <TrendingUp className="w-4 h-4" /> },
    ],
    quote: "Pisteur nous a donné la capacité de prospecter comme une grande entreprise sans multiplier les équipes. C'est la brique qui manquait à notre scale.",
    author: 'Thomas Bernard',
    role: 'Responsable BDD, RénoPlus',
    timeline: '8 semaines de déploiement',
    highlights: [
      'Onboarding accompagné par l\'équipe Pisteur',
      'ICP personnalisés par région et type de bâtiment',
      'Intégration Salesforce via API REST',
      'Dashboard consolidé multi-régions en temps réel',
    ],
  },
];

const COLOR_MAP = {
  emerald: {
    badge:  'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300',
    icon:   'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    metric: 'text-emerald-600 dark:text-emerald-400',
    bar:    'bg-emerald-400',
    border: 'border-emerald-500/30 bg-emerald-500/5',
  },
  blue: {
    badge:  'bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-300',
    icon:   'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
    metric: 'text-blue-600 dark:text-blue-400',
    bar:    'bg-blue-400',
    border: 'border-blue-500/30 bg-blue-500/5',
  },
  amber: {
    badge:  'bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300',
    icon:   'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
    metric: 'text-amber-600 dark:text-amber-400',
    bar:    'bg-amber-400',
    border: 'border-amber-500/30 bg-amber-500/5',
  },
};

function CaseCard({ cs, isActive, onClick }) {
  const c = COLOR_MAP[cs.color];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`card-glass p-5 text-left w-full flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 ${
        isActive ? c.border : 'hover:border-white/20'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${c.badge}`}>
          {cs.sector}
        </span>
        <span className="text-[10px] text-gray-500 dark:text-white/30">{cs.size}</span>
      </div>
      <h3 className="font-bold text-base leading-snug text-gray-900 dark:text-white">{cs.company}</h3>
      <p className="text-xs text-gray-500 dark:text-white/50 leading-relaxed">{cs.tagline}</p>
      <div className="flex items-center gap-1 text-xs mt-auto">
        <span className={`font-semibold ${c.metric}`}>{cs.results[0].metric}</span>
        <span className="text-gray-400 dark:text-white/30">{cs.results[0].label}</span>
      </div>
    </button>
  );
}

function CaseDetail({ cs }) {
  const c = COLOR_MAP[cs.color];
  return (
    <div className="card-glass p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${c.badge}`}>
            {cs.sector}
          </span>
          <h2 className="text-2xl font-black mt-3 text-gray-900 dark:text-white">{cs.company}</h2>
          <p className="text-gray-500 dark:text-white/60 text-sm mt-1">{cs.tagline}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[10px] text-gray-400 dark:text-white/30 uppercase tracking-wider">Résultats en</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{cs.timeline}</p>
        </div>
      </div>

      {/* Métriques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cs.results.map(r => (
          <div key={r.label} className="bg-white/5 rounded-xl p-4 border border-white/8">
            <div className={`${c.icon} w-7 h-7 rounded-lg border flex items-center justify-center mb-2`}>
              {r.icon}
            </div>
            <p className={`text-xl font-black ${c.metric} tabular-nums`}>{r.metric}</p>
            <p className="text-[11px] text-gray-500 dark:text-white/45 leading-snug mt-0.5">{r.label}</p>
          </div>
        ))}
      </div>

      {/* Contexte */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xs font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider mb-3">Le défi</h3>
          <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed">{cs.challenge}</p>
        </div>
        <div>
          <h3 className="text-xs font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider mb-3">La solution</h3>
          <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed">{cs.solution}</p>
        </div>
      </div>

      {/* Points clés */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider mb-3">Points clés</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {cs.highlights.map(h => (
            <div key={h} className="flex items-start gap-2 text-sm text-gray-600 dark:text-white/60">
              <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${c.metric}`} />
              {h}
            </div>
          ))}
        </div>
      </div>

      {/* Citation — texte foncé en light mode, clair en dark */}
      <div className={`card-glass ${c.border} p-5 flex gap-4`}>
        <Quote className={`w-6 h-6 ${c.metric} shrink-0 mt-1`} />
        <div>
          <p className="text-sm italic leading-relaxed mb-3 text-gray-700 dark:text-white/80">
            &ldquo;{cs.quote}&rdquo;
          </p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{cs.author}</p>
          <p className="text-xs text-gray-500 dark:text-white/40">{cs.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [activeId, setActiveId] = useState(CASES[0].id);
  const activeCase = CASES.find(c => c.id === activeId);

  return (
    <section className="section min-h-screen">
      <div className="section-inner">
        {/* Header */}
        <FadeSection>
          <div className="mb-10">
            <p className="text-emerald-500 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">Études de cas</p>
            <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">Ils ont transformé leur prospection</h1>
            <p className="text-gray-500 dark:text-white/60 text-sm max-w-xl leading-relaxed">
              Des entreprises du secteur bâtiment — de la TPE à l&apos;ETI — ont fait de Pisteur
              leur avantage concurrentiel. Voici leurs résultats réels.
            </p>
          </div>
        </FadeSection>

        {/* Layout : 3 cards à gauche + détail à droite */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          {/* Colonne cards */}
          <div className="flex flex-col gap-4">
            {CASES.map((cs, i) => (
              <FadeSection key={cs.id} delay={i * 80}>
                <CaseCard
                  cs={cs}
                  isActive={activeId === cs.id}
                  onClick={() => setActiveId(cs.id)}
                />
              </FadeSection>
            ))}
          </div>

          {/* Détail */}
          <FadeSection key={activeId}>
            <CaseDetail cs={activeCase} />
          </FadeSection>
        </div>

        {/* CTA bas */}
        <FadeSection delay={200}>
          <div className="mt-12 text-center">
            <p className="text-gray-500 dark:text-white/50 text-sm mb-4">
              Vous aussi, transformez votre prospection bâtiment.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/simulation" className="btn-primary flex items-center gap-2">
                Simuler mon marché <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="btn-outline">
                Parler à un conseiller
              </Link>
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}
