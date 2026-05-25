import { Link } from 'react-router-dom';
import { Check, X, ChevronDown, ArrowRight, Info, Sparkles, Calculator } from 'lucide-react';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';
import { useState } from 'react';

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

const plans = [
  {
    name: 'Starter',
    price: 99,
    desc: 'Pour démarrer et tester votre marché.',
    features: ['50 leads / mois', '2 filtres actifs', 'Export CSV', 'Email support'],
    cta: 'Démarrer',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 249,
    desc: 'Pour une prospection régulière et structurée.',
    features: ['200 leads / mois', 'Filtres illimités', 'Email personnalisé IA', 'Dashboard analytique', 'Support prioritaire'],
    cta: 'Essai gratuit 14j',
    highlight: true,
  },
  {
    name: 'Growth',
    price: 599,
    desc: 'Pour les équipes commerciales qui développent leur activité.',
    features: ['Leads illimités', 'Multi-utilisateurs', 'Intégration CRM', 'Onboarding dédié', 'Account manager'],
    cta: "Contacter l'équipe",
    highlight: false,
  },
];

const compareRows = [
  { label: 'Leads / mois',            starter: '50',     pro: '200',    growth: 'Illimités' },
  { label: 'Filtres actifs',          starter: '2',      pro: 'Illimités', growth: 'Illimités' },
  { label: 'Export CSV',              starter: true,     pro: true,     growth: true },
  { label: 'Email personnalisé IA',   starter: false,    pro: true,     growth: true },
  { label: 'Dashboard analytique',    starter: false,    pro: true,     growth: true },
  { label: 'Multi-utilisateurs',      starter: false,    pro: false,    growth: true },
  { label: 'Intégration CRM',         starter: false,    pro: false,    growth: true },
  { label: 'Onboarding dédié',        starter: false,    pro: false,    growth: true },
  { label: 'Account manager',         starter: false,    pro: false,    growth: true },
  { label: 'Accès API',               starter: false,    pro: false,    growth: true },
  { label: 'Support prioritaire',     starter: false,    pro: true,     growth: true },
  { label: 'Mise à jour mensuelle',   starter: true,     pro: true,     growth: true },
];

const faqs = [
  {
    q: 'Peut-on changer de plan à tout moment ?',
    a: 'Oui, totalement. Vous pouvez passer à un plan supérieur ou inférieur à tout moment depuis votre tableau de bord, sans frais ni engagement.',
  },
  {
    q: "L'essai gratuit nécessite-t-il une carte bancaire ?",
    a: "Non. L'essai 14 jours est entièrement gratuit, sans CB demandée. Vous renseignez votre moyen de paiement uniquement si vous décidez de continuer.",
  },
];

export default function Pricing() {
  const [showCompare, setShowCompare] = useState(false);

  return (
    <section className="section">
      <div className="section-inner">
        <FadeSection className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">Tarifs</p>
          <h1 className="text-4xl font-bold mb-3">Simple et transparent.</h1>
          <p className="text-white/55 text-sm">
            Choisissez le plan adapté à votre rythme de prospection. Tous les plans incluent l’accès à la donnée bâtiment et aux mises à jour mensuelles.
          </p>
        </FadeSection>
      </div>
    </section>
  );
}
