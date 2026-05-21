import { Link } from 'react-router-dom';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';

// ─── Hero ────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="section">
      <div className="section-inner grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Prospection bâtiment intelligente
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
            Trouvez chaque jour les bâtiments qui ont vraiment besoin de vous.
          </h1>

          <p className="text-base sm:text-lg text-white/70 max-w-xl">
            Pisteur analyse des millions de bâtiments et vous envoie uniquement ceux
            où votre expertise a un impact concret : DPE, surface, gestionnaire,
            décideur nominatif et potentiel de chantier estimé.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white text-navy-900 font-medium text-sm shadow-soft hover:bg-gray-100 transition-colors"
            >
              Essai gratuit — sans CB
            </Link>
            <Link
              to="/simulation"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-white/15 text-sm text-white/80 hover:bg-white/5 transition-colors"
            >
              Estimer mon marché →
            </Link>
          </div>

          <div className="flex flex-wrap gap-8 pt-2">
            {[
              { val: '73', label: 'leads générés aujourd\'hui' },
              { val: '100+', label: 'clients actifs' },
              { val: '1,2M+', label: 'bâtiments analysés' },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="text-white font-semibold text-xl">{val}</p>
                <p className="text-xs text-white/60">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4">
          <p className="text-sm font-medium text-white/80">Votre cible en quelques filtres</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { label: 'Type de bâtiment', val: 'Résidentiel collectif' },
              { label: 'Code NAF', val: '68.32A' },
              { label: 'DPE', val: 'E / F / G' },
              { label: 'Surface', val: '> 2 000 m²' },
            ].map(({ label, val }) => (
              <div key={label} className="bg-navy-900/60 rounded-2xl p-3 border border-white/5">
                <p className="text-white/60 mb-1">{label}</p>
                <p className="font-semibold">{val}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/50 pt-1">
            Pisteur croise plus de 100 signaux pour ne livrer que les bâtiments
            où vous avez une vraie chance de signer.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Comment ça marche ───────────────────────────────────────────────────────
function HowItWorksSection() {
  const { ref, visible } = useFadeInOnScroll();

  const steps = [
    {
      n: '1',
      title: 'Configurez votre marché',
      desc: 'Type de bâtiment, DPE, énergie, surface, géographie, code NAF… en moins de 5 minutes.',
    },
    {
      n: '2',
      title: 'Recevez vos leads chaque matin',
      desc: 'Une liste de bâtiments priorisés avec décideur nominatif, coordonnées et potentiel chiffré.',
    },
    {
      n: '3',
      title: 'Contactez avec un email personnalisé',
      desc: 'Un email généré automatiquement qui cite le bâtiment exact et son contexte énergétique.',
    },
  ];

  return (
    <section
      ref={ref}
      className={`section transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="section-inner">
        <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-2">
          Fonctionnement
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Comment ça marche</h2>
        <p className="text-white/70 max-w-2xl mb-10">
          Pisteur fait le travail de ciblage à votre place et transforme des données
          bâtiment brutes en actions commerciales prêtes à l&apos;emploi.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold">
                {s.n}
              </div>
              <h3 className="font-medium">{s.title}</h3>
              <p className="text-sm text-white/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Market Signals Timeline ─────────────────────────────────────────────────
function MarketSignalsTimelineSection() {
  const { ref, visible } = useFadeInOnScroll();

  const signals = [
    { time: 'J-0', label: 'Dépôt de permis de construire détecté', color: 'bg-blue-400' },
    { time: 'J+2', label: 'DPE classé F/G identifié sur le bâtiment', color: 'bg-orange-400' },
    { time: 'J+3', label: 'Gestionnaire contactable trouvé (nom + email)', color: 'bg-emerald-400' },
    { time: 'J+5', label: 'Lead livré dans votre tableau de bord', color: 'bg-white' },
  ];

  return (
    <section
      ref={ref}
      className={`section transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="section-inner grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-2">
            Signal bâtiment
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            De la donnée brute à l&apos;opportunité en 5 jours.
          </h2>
          <p className="text-white/70 max-w-xl">
            Pisteur agrège en temps réel les signaux publics (permis, DPE, mutation,
            copropriété) et les croise avec la base décideur pour créer un lead
            actionnable avant vos concurrents.
          </p>
        </div>

        <div className="space-y-4">
          {signals.map((s, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full mt-1 ${s.color}`} />
                {i < signals.length - 1 && (
                  <div className="w-px flex-1 bg-white/10 mt-1 min-h-[2rem]" />
                )}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex-1">
                <p className="text-xs text-white/50 mb-0.5">{s.time}</p>
                <p className="text-sm font-medium">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Email Examples ──────────────────────────────────────────────────────────
function EmailExamplesSection() {
  const { ref, visible } = useFadeInOnScroll();

  return (
    <section
      ref={ref}
      className={`section transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="section-inner grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-2">
            Email automatisé
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Un email personnalisé généré pour chaque bâtiment.
          </h2>
          <p className="text-white/70 max-w-xl mb-4">
            Pisteur rédige automatiquement un email commercial qui cite le bâtiment
            par son adresse, son DPE et son potentiel estimé. Vous envoyez en un clic,
            sans rien réécrire.
          </p>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span> Nom du décideur intégré
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span> Contexte DPE et surface cités
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span> Ton ajustable (formel / direct)
            </li>
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-sm space-y-3 font-mono text-white/80">
          <p className="text-white/40 text-xs">Aperçu email généré</p>
          <p>
            <span className="text-white/50">À :</span> m.dupont@syndic-paris.fr
          </p>
          <p>
            <span className="text-white/50">Objet :</span> Rénovation énergétique — 12 rue
            des Acacias, Paris 14e (DPE F)
          </p>
          <hr className="border-white/10" />
          <p>Bonjour M. Dupont,</p>
          <p>
            Je me permets de vous contacter au sujet du bâtiment situé au{' '}
            <span className="text-emerald-300">12 rue des Acacias (75014)</span>, classé{' '}
            <span className="text-orange-300">DPE F</span>, dont vous êtes le gestionnaire.
          </p>
          <p>
            Avec une surface de <span className="text-blue-300">3 200 m²</span>, ce
            bâtiment représente un potentiel estimé de{' '}
            <span className="text-emerald-300">180 000 €</span> de travaux de rénovation.
          </p>
          <p className="text-white/50 text-xs pt-2">…</p>
        </div>
      </div>
    </section>
  );
}

// ─── Comparison ──────────────────────────────────────────────────────────────
function ComparisonSection() {
  const { ref, visible } = useFadeInOnScroll();

  const rows = [
    { feature: 'Leads qualifiés chaque matin', pisteur: true, manual: false },
    { feature: 'Décideur nominatif identifié', pisteur: true, manual: false },
    { feature: 'DPE et surface croisés', pisteur: true, manual: false },
    { feature: 'Email personnalisé généré', pisteur: true, manual: false },
    { feature: 'Temps de setup', pisteur: '5 min', manual: '2 semaines' },
    { feature: 'Coût par lead', pisteur: '< 3 €', manual: '> 50 €' },
  ];

  return (
    <section
      ref={ref}
      className={`section transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="section-inner">
        <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-2">
          Comparaison
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-10">
          Pisteur vs. prospection manuelle
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-5 py-3 text-white/50 font-medium">Critère</th>
                <th className="px-5 py-3 text-emerald-400 font-semibold">Pisteur</th>
                <th className="px-5 py-3 text-white/40 font-medium">Manuel</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.feature}
                  className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                >
                  <td className="px-5 py-3 text-white/80">{r.feature}</td>
                  <td className="px-5 py-3 text-center">
                    {typeof r.pisteur === 'boolean' ? (
                      r.pisteur ? (
                        <span className="text-emerald-400 font-bold">✓</span>
                      ) : (
                        <span className="text-red-400">✗</span>
                      )
                    ) : (
                      <span className="text-emerald-300 font-medium">{r.pisteur}</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-center">
                    {typeof r.manual === 'boolean' ? (
                      r.manual ? (
                        <span className="text-emerald-400 font-bold">✓</span>
                      ) : (
                        <span className="text-red-400">✗</span>
                      )
                    ) : (
                      <span className="text-white/50">{r.manual}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Advanced Intention Signals ──────────────────────────────────────────────
function AdvancedIntentionSignalsSection() {
  const { ref, visible } = useFadeInOnScroll();

  const signals = [
    { icon: '🏗️', title: 'Permis de construire', desc: 'Dépôts et modifications en temps réel sur toute la France.' },
    { icon: '⚡', title: 'DPE F & G', desc: 'Bâtiments à rénover obligatoirement d\'ici 2028 selon la loi Climat.' },
    { icon: '🏢', title: 'Mutation de propriété', desc: 'Nouveau propriétaire = nouvelle opportunité de contact à chaud.' },
    { icon: '📋', title: 'Copropriétés en déficit', desc: 'AG prévues, fonds travaux insuffisants, syndic en recherche de devis.' },
    { icon: '📍', title: 'Zones prioritaires', desc: 'QPV, OPAH, dispositifs MaPrimeRénov\' actifs dans votre secteur.' },
    { icon: '👤', title: 'Décideur nominatif', desc: 'Nom, email, téléphone du gestionnaire ou du syndic responsable.' },
  ];

  return (
    <section
      ref={ref}
      className={`section transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="section-inner">
        <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-2">
          Sources de données
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          100+ signaux d&apos;intention croisés en temps réel.
        </h2>
        <p className="text-white/70 max-w-2xl mb-10">
          Pisteur agrège des sources publiques et propriétaires pour créer un score
          de priorité unique sur chaque bâtiment.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {signals.map((s) => (
            <div
              key={s.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-2 hover:bg-white/[0.08] transition-colors"
            >
              <span className="text-2xl">{s.icon}</span>
              <h3 className="font-medium text-sm">{s.title}</h3>
              <p className="text-xs text-white/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Integrations ────────────────────────────────────────────────────────────
function IntegrationsSection() {
  const { ref, visible } = useFadeInOnScroll();

  const tools = ['HubSpot', 'Salesforce', 'Pipedrive', 'Notion', 'Google Sheets', 'Zapier'];

  return (
    <section
      ref={ref}
      className={`section transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="section-inner text-center max-w-2xl mx-auto">
        <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-2">
          Intégrations
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Pisteur s&apos;intègre dans votre workflow.
        </h2>
        <p className="text-white/70 mb-10">
          Exportez vos leads directement vers votre CRM ou outil préféré en quelques
          clics. Aucun développement requis.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {tools.map((t) => (
            <div
              key={t}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/80 hover:bg-white/10 transition-colors"
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Analytics Preview ───────────────────────────────────────────────────────
function AnalyticsPreviewSection() {
  const { ref, visible } = useFadeInOnScroll();

  const kpis = [
    { label: 'Leads reçus ce mois', val: '142', delta: '+18%' },
    { label: 'Taux d\'ouverture emails', val: '34%', delta: '+5pt' },
    { label: 'RDV générés', val: '27', delta: '+11%' },
    { label: 'CA pipeline estimé', val: '480k€', delta: '+22%' },
  ];

  return (
    <section
      ref={ref}
      className={`section transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="section-inner">
        <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-2">
          Tableau de bord
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Visualisez l&apos;impact sur votre activité.
        </h2>
        <p className="text-white/70 max-w-2xl mb-10">
          Suivez en temps réel vos leads reçus, vos emails envoyés, vos rendez-vous
          et votre pipeline commercial directement depuis Pisteur.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="bg-white/5 border border-white/10 rounded-2xl p-5"
            >
              <p className="text-xs text-white/50 mb-2">{k.label}</p>
              <p className="text-3xl font-semibold">{k.val}</p>
              <p className="text-xs text-emerald-400 mt-1">{k.delta} ce mois</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Early Adopters / Témoignages ────────────────────────────────────────────
function EarlyAdoptersSection() {
  const { ref, visible } = useFadeInOnScroll();

  const testimonials = [
    {
      name: 'Marc L.',
      role: 'Directeur commercial — Entreprise de rénovation',
      quote:
        'En 3 semaines, on a eu plus de leads qualifiés qu\'en 6 mois de prospection terrain. Le fait d\'avoir le nom du gestionnaire change tout.',
    },
    {
      name: 'Sophie K.',
      role: 'Responsable développement — Bureau d\'études thermiques',
      quote:
        'On cible uniquement les DPE F/G sur notre zone. Les leads arrivent chaque matin, on n\'a plus qu\'à appeler. Le ROI est évident.',
    },
    {
      name: 'Thomas B.',
      role: 'Gérant — Société de maintenance CVC',
      quote:
        'Les emails générés automatiquement avec l\'adresse exacte du bâtiment font vraiment la différence. Les taux d\'ouverture ont doublé.',
    },
  ];

  return (
    <section
      ref={ref}
      className={`section transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="section-inner">
        <p className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase mb-2">
          Témoignages
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-10">
          Ce que disent nos premiers clients.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4"
            >
              <p className="text-sm text-white/80 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto pt-4 border-t border-white/10">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-white/50">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Final ───────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
              Prêt à voir les bâtiments qui vous correspondent ?
            </h2>
            <p className="text-sm text-white/80 max-w-md">
              Configurez Pisteur sur votre ICP réel et recevez une vue claire de votre
              marché adressable. Essai gratuit, sans carte bancaire.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-navy-900 font-medium text-sm hover:bg-gray-100 transition-colors shadow-soft"
          >
            Voir Pisteur sur mes cibles
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <MarketSignalsTimelineSection />
      <EmailExamplesSection />
      <ComparisonSection />
      <AdvancedIntentionSignalsSection />
      <IntegrationsSection />
      <AnalyticsPreviewSection />
      <EarlyAdoptersSection />
      <CtaSection />
    </>
  );
}