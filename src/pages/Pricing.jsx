import { Link } from 'react-router-dom';
import { useSeoMeta } from '../hooks/useSeoMeta';

const plans = [
  {
    name: 'Starter',
    price: '149',
    period: '/mois',
    description: 'Pour tester Pisteur sur un segment précis.',
    highlight: false,
    cta: 'Essayer gratuitement',
    features: [
      '50 leads qualifiés / mois',
      '1 zone géographique',
      '2 segments de bâtiments',
      'Accès base décideurs',
      'Export CSV',
      'Support email',
    ],
    missing: [
      'Emails personnalisés générés',
      'Intégration CRM',
      'Alertes temps réel',
    ],
  },
  {
    name: 'Pro',
    price: '349',
    period: '/mois',
    description: 'Pour les équipes commerciales actives.',
    highlight: true,
    badge: 'Le plus populaire',
    cta: 'Démarrer en Pro',
    features: [
      '200 leads qualifiés / mois',
      '3 zones géographiques',
      'Segments illimités',
      'Accès base décideurs',
      'Export CSV + Excel',
      'Emails personnalisés générés',
      'Intégration HubSpot / Pipedrive',
      'Support prioritaire',
    ],
    missing: [
      'Alertes temps réel',
    ],
  },
  {
    name: 'Growth',
    price: '749',
    period: '/mois',
    description: 'Pour les équipes qui veulent dominer leur marché.',
    highlight: false,
    cta: 'Parler à l\'équipe',
    features: [
      'Leads illimités',
      'France entière',
      'Segments illimités',
      'Accès base décideurs',
      'Export tous formats',
      'Emails personnalisés générés',
      'Intégration CRM complète',
      'Alertes temps réel',
      'Account manager dédié',
      'Onboarding personnalisé',
    ],
    missing: [],
  },
];

export default function Pricing() {
  useSeoMeta({
    title: 'Tarifs',
    description: 'Découvrez les offres Pisteur : Starter à 149€/mois, Pro à 349€/mois, Growth à 749€/mois. Essai gratuit sans CB.',
    canonical: '/tarifs',
  });

  return (
    <section className="section">
      <div className="section-inner py-12">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-widest text-g-400 uppercase mb-2">
            Tarifs
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-g-900 mb-4">
            Un prix clair, pas de surprise.
          </h1>
          <p className="text-g-500 text-sm">
            Tous les plans incluent un essai gratuit de 7 jours. Sans carte bancaire.
            Résiliable à tout moment.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 flex flex-col gap-5 border transition-all ${
                plan.highlight
                  ? 'border-p bg-white shadow-s2 scale-[1.02]'
                  : 'border-g-200 bg-white shadow-s0'
              }`}
            >
              {/* Badge */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-g-900">{plan.name}</p>
                  <p className="text-xs text-g-400 mt-0.5">{plan.description}</p>
                </div>
                {plan.badge && (
                  <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-p-soft text-p border border-p/20">
                    {plan.badge}
                  </span>
                )}
              </div>

              {/* Prix */}
              <div className="flex items-end gap-1">
                <span className="text-4xl font-extrabold text-g-900">
                  {plan.price}€
                </span>
                <span className="text-sm text-g-400 mb-1">{plan.period}</span>
              </div>

              {/* CTA */}
              <Link
                to="/contact"
                className={`block text-center py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  plan.highlight
                    ? 'bg-p text-white hover:bg-p-hover'
                    : 'border border-g-200 text-g-700 hover:bg-g-100'
                }`}
              >
                {plan.cta}
              </Link>

              {/* Features incluses */}
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-g-700">
                    <span className="text-green font-bold mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-g-400">
                    <span className="mt-0.5">✗</span>
                    <span className="line-through">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Garantie */}
        <div className="mt-12 text-center glass-card p-6 max-w-2xl mx-auto space-y-2">
          <p className="text-sm font-bold text-g-900">
            🛡️ Satisfait ou remboursé 30 jours
          </p>
          <p className="text-xs text-g-500">
            Si Pisteur ne génère pas de valeur sur votre marché dans les 30 premiers
            jours, on vous rembourse intégralement. Sans question.
          </p>
        </div>

        {/* FAQ rapide */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {[
            { q: 'Puis-je changer de plan ?', r: 'Oui, à tout moment depuis votre espace client, sans frais.' },
            { q: 'Y a-t-il un engagement ?', r: 'Non, tous les plans sont sans engagement, résiliables mensuellement.' },
            { q: 'Comment fonctionne l\'essai ?', r: '7 jours gratuits, accès complet au plan Pro, sans CB requise.' },
            { q: 'Puis-je avoir une facture ?', r: 'Oui, toutes les factures sont disponibles dans votre espace client.' },
          ].map(({ q, r }) => (
            <div key={q} className="glass-card p-4 space-y-1">
              <p className="text-sm font-semibold text-g-900">{q}</p>
              <p className="text-xs text-g-500">{r}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}