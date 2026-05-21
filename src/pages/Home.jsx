import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="section">
      <div className="section-inner grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />
            Prospection bâtiment intelligente
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Trouvez chaque jour les bâtiments qui ont vraiment besoin de vous.
          </h1>

          <p className="text-base sm:text-lg text-white/70 max-w-xl">
            Pisteur identifie pour vous les bâtiments à fort potentiel en croisant des
            dizaines de sources de données bâtiment, entreprise et contact. Vous
            recevez des leads prêts à prospecter, avec décideurs nominatifs et
            potentiel chiffré.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white text-navy-900 font-medium text-sm shadow-soft hover:bg-gray-100 transition-colors"
            >
              Essai gratuit — sans CB
            </Link>
            <a
              href="https://app.pisteur.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-white/15 text-sm text-white/80 hover:bg-white/5 transition-colors"
            >
              Voir la démo interactive
            </a>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-white/60">
            <div>
              <p className="text-white font-semibold text-lg">73</p>
              <p>leads générés aujourd&apos;hui</p>
            </div>
            <div>
              <p className="text-white font-semibold text-lg">100+</p>
              <p>clients actifs</p>
            </div>
            <div>
              <p className="text-white font-semibold text-lg">1,2M+</p>
              <p>bâtiments analysés en France</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 shadow-soft space-y-4">
          <p className="text-sm font-medium text-white/80 mb-2">
            Votre marché en quelques filtres
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-navy-900/60 rounded-2xl p-3 border border-white/5">
              <p className="text-white/60 mb-1">Type de bâtiment</p>
              <p className="font-semibold">Résidentiel collectif</p>
            </div>
            <div className="bg-navy-900/60 rounded-2xl p-3 border border-white/5">
              <p className="text-white/60 mb-1">Code NAF</p>
              <p className="font-semibold">68.32A</p>
            </div>
            <div className="bg-navy-900/60 rounded-2xl p-3 border border-white/5">
              <p className="text-white/60 mb-1">DPE</p>
              <p className="font-semibold">E / F / G</p>
            </div>
            <div className="bg-navy-900/60 rounded-2xl p-3 border border-white/5">
              <p className="text-white/60 mb-1">Surface</p>
              <p className="font-semibold">&gt; 2 000 m²</p>
            </div>
          </div>
          <div className="mt-2 text-xs text-white/60">
            Pisteur croise plus de 100 signaux pour ne livrer que les bâtiments où
            vous avez une vraie chance de signer.
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: 'Configurez votre marché',
      desc: 'Type de bâtiment, DPE, énergie, surface, géographie, code NAF… en moins de 5 minutes.',
    },
    {
      title: 'Recevez vos leads chaque matin',
      desc: 'Une liste de bâtiments priorisés avec décideurs nominatifs, coordonnées et potentiel chiffré.',
    },
    {
      title: 'Contactez avec un email personnalisé',
      desc: 'Un email généré automatiquement qui cite le bâtiment exact, ses données énergétiques et le prénom du décideur.',
    },
  ];

  return (
    <section className="section bg-navy-900">
      <div className="section-inner">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Comment ça marche</h2>
        <p className="text-white/70 max-w-2xl mb-8">
          Pisteur fait le travail de ciblage à votre place et transforme des données
          bâtiment brutes en actions commerciales prêtes à l&apos;emploi.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold">
                {idx + 1}
              </div>
              <h3 className="font-medium">{step.title}</h3>
              <p className="text-sm text-white/70">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SignalSection() {
  const filters = [
    {
      title: 'Énergie & performance',
      items: ['DPE E', 'DPE F', 'DPE G', 'Gaz collectif', 'Fioul', 'Électrique'],
    },
    {
      title: 'Type de bâtiment',
      items: ['Résidentiel collectif', 'Tertiaire', 'Industriel'],
    },
    {
      title: 'Technique',
      items: ['Isolation manquante', 'Chaudière fioul', 'VMC simple flux', 'Sans PAC'],
    },
  ];

  return (
    <section className="section bg-navy-900">
      <div className="section-inner">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Ciblez au millimètre avec le signal bâtiment
        </h2>
        <p className="text-white/70 max-w-2xl mb-8">
          Définissez votre ICP avec plus de 100 signaux bâtiment. Plus vos filtres
          sont précis, plus chaque lead vaut de l&apos;or.
        </p>

        <div className="grid md:grid-cols-[2fr,1fr] gap-6 items-start">
          <div className="grid md:grid-cols-3 gap-4">
            {filters.map((block) => (
              <div
                key={block.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2"
              >
                <p className="text-xs font-semibold text-white/80 mb-1">
                  {block.title}
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] text-white/80">
                  {block.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 rounded-full bg-navy-900/70 border border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 text-xs text-white/75">
            <p className="text-sm font-medium text-white">Vue d&apos;ensemble de votre marché</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between">
                <span>Bâtiments correspondants</span>
                <span className="text-lg font-semibold">2 500</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span>Contacts identifiés</span>
                <span className="text-lg font-semibold">1 500</span>
              </div>
            </div>
            <p>
              Résultats triés par pertinence avec un score % Match pour prioriser vos
              appels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  const impacts = [
    {
      metric: '+40%',
      label: 'de conversion en rendez-vous',
      detail:
        'Chaque appel est contextualisé avec le DPE, la surface et le gestionnaire identifié.',
    },
    {
      metric: '2/3',
      label: 'des RDV inutiles évités',
      detail:
        'Vous ciblez uniquement les bâtiments où votre expertise crée vraiment de la valeur.',
    },
    {
      metric: '+60%',
      label: 'de CA sur les bâtiments identifiés',
      detail:
        'Vous visualisez votre marché adressable au lieu de rester sur un périmètre intuitif.',
    },
  ];

  return (
    <section className="section bg-navy-900">
      <div className="section-inner">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Ce que ça change pour vos chiffres
        </h2>
        <p className="text-white/70 max-w-2xl mb-8">
          Les équipes commerciales qui utilisent Pisteur mesurent un impact direct sur
          leurs indicateurs clés : plus de rendez-vous utiles, moins de temps perdu.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {impacts.map((item) => (
            <div
              key={item.label}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-2"
            >
              <p className="text-3xl font-semibold text-accent-500">{item.metric}</p>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-white/70">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CreditsSection() {
  return (
    <section className="section bg-navy-900">
      <div className="section-inner grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Un système de crédits transparent, sans surprise
          </h2>
          <p className="text-white/70 mb-4">
            Vous consommez des crédits uniquement quand une information est trouvée.
            Aucun crédit n&apos;est débité si l&apos;email ou le numéro de téléphone est
            introuvable.
          </p>
          <p className="text-white/70 text-sm">
            Les crédits se renouvellent chaque mois et vous gardez une visibilité
            claire sur votre consommation grâce à un tableau de bord dédié.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-white/50 mb-1">
              1 crédit
            </p>
            <p className="font-semibold mb-1">1 lead qualifié</p>
            <p className="text-white/70 text-xs">
              Association bâtiment × entreprise gestionnaire avec score % Match,
              potentiel chantier estimé et données énergétiques complètes.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-white/50 mb-1">
              1 crédit
            </p>
            <p className="font-semibold mb-1">1 adresse email nominative</p>
            <p className="text-white/70 text-xs">
              Email professionnel du décideur ciblé (DG, PDG, syndic…). 0 crédit
              débité si l&apos;email n&apos;est pas trouvé.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-white/50 mb-1">
              10 crédits
            </p>
            <p className="font-semibold mb-1">1 numéro de téléphone portable</p>
            <p className="text-white/70 text-xs">
              Numéro direct du contact nominatif. 0 crédit consommé si le numéro est
              indisponible dans les bases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DataStackSection() {
  const blocks = [
    {
      title: 'Données bâtiment',
      items: [
        'BDNB — Base de Données Nationale des Bâtiments',
        'Cadastre — Plan parcellaire national',
        'Etalab — Open data gouvernemental',
        'ENEDIS & GRDF — consommations énergie',
      ],
    },
    {
      title: 'Données entreprise',
      items: [
        'SIRENE / SIRET — registre national des entreprises',
        'RNIC & MAJIC — implantations et informations cadastrales',
        'Pappers — données juridiques et dirigeants',
      ],
    },
    {
      title: 'Données contact',
      items: [
        'Societeinfo — identification des contacts nominatifs',
        'FullEnrich & Hunter.io — enrichissement email & téléphone',
        'Base propriétaire Pisteur — unification des IDs bâtiment',
      ],
    },
  ];

  return (
    <section className="section bg-navy-900">
      <div className="section-inner">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Une infrastructure de données construite sur les meilleures sources
        </h2>
        <p className="text-white/70 max-w-2xl mb-8">
          Pisteur agrège, normalise et enrichit des dizaines de sources officielles
          et privées pour construire une vision fiable du parc immobilier français.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {blocks.map((block) => (
            <div
              key={block.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-sm flex flex-col gap-2"
            >
              <p className="font-semibold mb-1">{block.title}</p>
              <ul className="list-disc list-inside text-white/70 text-xs space-y-1">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="section">
      <div className="section-inner bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Prêt à voir les bâtiments qui vous correspondent ?
          </h2>
          <p className="text-sm text-white/80 max-w-md">
            Notre équipe configure Pisteur sur votre ICP réel et vous montre les
            bâtiments disponibles dans votre marché. Réponse sous 24h.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white text-navy-900 font-medium text-sm hover:bg-gray-100 transition-colors"
        >
          Voir Pisteur sur mes cibles
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <SignalSection />
      <ImpactSection />
      <CreditsSection />
      <DataStackSection />
      <CtaSection />
    </>
  );
}
