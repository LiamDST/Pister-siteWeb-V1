import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '149',
    desc: 'Pour tester et démarrer votre prospection.',
    features: ['50 leads/mois', 'Filtres de base (DPE, surface, zone)', 'Export CSV', 'Support email'],
    cta: 'Commencer',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '349',
    desc: 'Pour une équipe commerciale active.',
    features: ['200 leads/mois', 'Filtres avancés (code NAF, énergie, ancienneté)', 'Décideur nominatif', 'Email personnalisé auto', 'Support prioritaire'],
    cta: 'Choisir Pro',
    highlight: true,
  },
  {
    name: 'Growth',
    price: '749',
    desc: 'Pour les équipes à forte cadence.',
    features: ['Leads illimités', 'Tous les filtres + API', 'CRM sync (HubSpot, Pipedrive)', 'Dashboard analytics', 'Account manager dédié'],
    cta: 'Choisir Growth',
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <>
      <section className="relative pt-32 pb-16 bg-navy-950">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-navy-900 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Tarifs simples et transparents</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">Sans engagement. Changez de formule à tout moment.</p>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-2xl p-6 flex flex-col gap-4 border ${plan.highlight ? 'border-green-400 bg-navy-950 text-white shadow-2xl shadow-green-500/20 scale-105' : 'border-navy-100 bg-white text-navy-900'}`}>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${plan.highlight ? 'text-green-400' : 'text-navy-400'}`}>{plan.name}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold">{plan.price}€</span>
                  <span className={`text-sm mb-1 ${plan.highlight ? 'text-white/60' : 'text-navy-500'}`}>/mois</span>
                </div>
                <p className={`text-sm ${plan.highlight ? 'text-white/60' : 'text-navy-500'}`}>{plan.desc}</p>
              </div>
              <ul className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-green-400' : 'text-green-500'}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                  plan.highlight
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30 hover:bg-green-600'
                    : 'bg-navy-50 text-navy-900 hover:bg-navy-100 border border-navy-200'
                }`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}