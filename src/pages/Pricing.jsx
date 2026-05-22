import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
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

const plans = [
  {
    name: 'Starter',
    price: '149',
    desc: 'Pour démarrer et tester votre marché.',
    features: ['50 leads / mois', '2 filtres actifs', 'Export CSV', 'Email support'],
    cta: 'Démarrer',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '349',
    desc: 'Pour une prospection régulière et structurée.',
    features: ['200 leads / mois', 'Filtres illimités', 'Email personnalisé IA', 'Dashboard analytique', 'Support prioritaire'],
    cta: 'Essai gratuit 14j',
    highlight: true,
  },
  {
    name: 'Growth',
    price: '749',
    desc: 'Pour les équipes commerciales qui scalent.',
    features: ['Leads illimités', 'Multi-utilisateurs', 'Intégration CRM', 'Onboarding dédié', 'Account manager'],
    cta: 'Contacter l\'équipe',
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className="section">
      <div className="section-inner">
        <FadeSection className="text-center mb-12">
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">Tarifs</p>
          <h1 className="text-4xl font-bold mb-3">Simple, transparent.</h1>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Pas d&apos;engagement, pas de CB demandée pour l&apos;essai. Changez de plan à tout moment.
          </p>
        </FadeSection>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <FadeSection key={p.name} delay={i * 80}>
              <div className={`card-glass p-6 h-full flex flex-col gap-5 ${p.highlight ? 'border-emerald-500/40 ring-1 ring-emerald-500/20' : ''}`}>
                {p.highlight && (
                  <span className="self-start text-xs font-semibold bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full">
                    Recommandé
                  </span>
                )}
                <div>
                  <p className="font-bold text-lg">{p.name}</p>
                  <p className="text-white/50 text-xs mt-1">{p.desc}</p>
                </div>
                <div>
                  <span className="text-4xl font-black">{p.price}€</span>
                  <span className="text-white/40 text-sm"> / mois</span>
                </div>
                <ul className="flex-1 space-y-2">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={p.highlight ? 'btn-accent text-center' : 'btn-outline text-center'}>
                  {p.cta}
                </Link>
              </div>
            </FadeSection>
          ))}
        </div>

        <FadeSection className="mt-10">
          <div className="card-glass p-6 sm:p-8 rounded-3xl border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Comment fonctionnent les crédits ?</h2>
            <p className="text-sm text-white/60 mb-6">
              Vous ne payez que pour ce que vous obtenez. 0 crédit débité si l&apos;information est introuvable.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-navy-950/70 p-5 border border-white/10">
                <p className="text-3xl font-bold text-emerald-400">1 crédit</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-emerald-300/90">= 1 lead qualifié</p>
                <p className="mt-4 text-sm text-white/60 leading-relaxed">
                  Association bâtiment x entreprise avec score % Match et potentiel €.
                </p>
              </div>

              <div className="rounded-2xl bg-navy-950/70 p-5 border border-white/10">
                <p className="text-3xl font-bold text-emerald-400">1 crédit</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-emerald-300/90">= 1 adresse email</p>
                <p className="mt-4 text-sm text-white/60 leading-relaxed">
                  Email nominatif du décideur. 0 crédit si non trouvé.
                </p>
              </div>

              <div className="rounded-2xl bg-navy-950/70 p-5 border border-white/10">
                <p className="text-3xl font-bold text-emerald-400">10 crédits</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-emerald-300/90">= 1 téléphone portable</p>
                <p className="mt-4 text-sm text-white/60 leading-relaxed">
                  Numéro direct du contact. 0 crédit si non trouvé.
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-white/55">
              Des questions ? Consultez notre{' '}
              <Link to="/faq" className="font-medium text-emerald-400 underline underline-offset-4">
                FAQ complète
              </Link>{' '}
              ou{' '}
              <Link to="/contact" className="font-medium text-emerald-400 underline underline-offset-4">
                demandez une démo personnalisée.
              </Link>
            </p>
          </div>
        </FadeSection>

        <FadeSection className="mt-10 text-center text-sm text-white/40">
          Tous les plans incluent l&apos;accès aux données DPE nationales, la mise à jour mensuelle et l&apos;assistance email.
        </FadeSection>
      </div>
    </section>
  );
}
