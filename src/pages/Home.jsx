import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-[540px] h-[540px] rounded-full border border-neon-500/20 bg-neon-500/5 blur-3xl animate-pulse-soft" />
      </div>

      <div className="section-inner grid md:grid-cols-2 gap-10 items-center relative">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Prospection bâtiment · temps réel
            </span>
            <span className="chip bg-emerald-500/15 border-emerald-400/40 text-emerald-300">
              Boosté à l&apos;IA
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            <span className="block mb-1 text-white/60 text-base sm:text-lg">
              La prospection qui connaît déjà vos prochains chantiers.
            </span>
            <span className="gradient-text">
              Pisteur scanne le parc immobilier et vous pousse uniquement les bâtiments
              où vous pouvez gagner.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/70 max-w-xl">
            Un signal bâtiment ultra précis, des décideurs nominatifs et des emails
            sur-mesure générés automatiquement. Vous concentrez votre temps sur les
            conversations, pas sur le sourcing.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-white text-navy-900 font-medium text-sm shadow-glow hover:bg-gray-100 transition-transform hover:-translate-y-0.5"
            >
              Essai gratuit — sans CB
            </Link>
            <a
              href="https://app.pisteur.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-white/20 text-sm text-white/80 hover:bg-white/5 transition-colors"
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
              <p>équipes commerciales accompagnées</p>
            </div>
            <div>
              <p className="text-white font-semibold text-lg">1,2M+</p>
              <p>bâtiments analysés en France</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="glass-card p-4 sm:p-5 relative overflow-hidden">
            <div className="pointer-events-none absolute -top-20 -right-10 w-56 h-56 rounded-full bg-neon-500/20 blur-3xl" />

            <div className="flex items-center justify-between mb-4 relative">
              <div>
                <p className="text-xs text-white/60 mb-1">Vue marché</p>
                <p className="text-sm font-medium">Résidentiel collectif · DPE E–G</p>
              </div>
              <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                Score de match 92%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                <p className="text-white/60 mb-1">Bâtiments ciblés</p>
                <p className="text-lg font-semibold">2 500</p>
                <p className="text-[11px] text-white/60">priorisés par probabilité de signature</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
                <p className="text-white/60 mb-1">Décideurs identifiés</p>
                <p className="text-lg font-semibold">1 500</p>
                <p className="text-[11px] text-white/60">DG, syndics, gestionnaires d&apos;actifs</p>
              </div>
            </div>

            <div className="grid gap-2 text-[11px]">
              <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2 border border-white/10">
                <div>
                  <p className="font-medium">Paris · 7 200 m²</p>
                  <p className="text-white/60">DPE F · Chauffage gaz collectif</p>
                </div>
                <p className="text-emerald-300 font-semibold">+58% match</p>
              </div>
              <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2 border border-white/10">
                <div>
                  <p className="font-medium">Lyon · 3 800 m²</p>
                  <p className="text-white/60">DPE G · Toiture non isolée</p>
                </div>
                <p className="text-emerald-300 font-semibold">+64% match</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      title: '1 · Calibrez votre marché',
      desc: 'Type de bâtiment, DPE, énergie, surface, code NAF, zones. Pisteur crée un modèle exact de votre ICP.',
    },
    {
      title: '2 · Le signal bâtiment tourne en continu',
      desc: 'Notre moteur scanne le parc et met à jour votre cible en temps réel dès qu&apos;un bâtiment devient éligible.',
    },
    {
      title: '3 · Vous contactez avec un email déjà prêt',
      desc: 'Pisteur génère un message personnalisé qui cite le bâtiment, le contexte énergétique et le décideur par son prénom.',
    },
  ];

  return (
    <section className="section">
      <div className="section-inner">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase mb-2">
              Comment ça marche
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold">
              De la donnée brute à un rendez-vous dans votre agenda.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.title}
              className="glass-card p-5 flex flex-col gap-3 hover:shadow-glow hover:-translate-y-1 transition-transform duration-200"
            >
              <h3 className="text-sm font-semibold">{step.title}</h3>
              <p className="text-sm text-white/70">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AICopilotSection() {
  const cards = [
    {
      title: 'Priorisation automatique',
      desc: 'Un score % Match par bâtiment qui tient compte du DPE, de la surface, de l&apos;énergie, du type de propriétaire et de l&apos;historique.',
    },
    {
      title: 'Emails générés en 1 clic',
      desc: 'Des messages personnalisés qui citent le bâtiment, la situation énergétique et la raison précise du contact.',
    },
    {
      title: 'Vue “pipeline” temps réel',
      desc: 'Visualisez combien de bâtiments sont à sourcer, à appeler, en relance ou gagnés, directement depuis Pisteur.',
    },
  ];

  return (
    <section className="section">
      <div className="section-inner grid md:grid-cols-[1.2fr,1fr] gap-8 items-start">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase mb-2">
            Copilote IA
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
            Un copilote pour vos équipes commerciales, pas un énième fichier Excel.
          </h2>
          <p className="text-sm text-white/70 max-w-xl">
            Pisteur ne se contente pas de sortir des listes. Il met en musique votre
            prospection, de l&apos;identification du bâtiment à la relance du décideur, en
            passant par la rédaction des emails.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 md:grid-cols-1 gap-3 text-sm">
          {cards.map((card) => (
            <div key={card.title} className="glass-card p-4 bg-white/5">
              <p className="font-semibold mb-1 text-sm">{card.title}</p>
              <p className="text-xs text-white/70">{card.desc}</p>
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
    <section className="section">
      <div className="section-inner">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Ciblez au millimètre avec le signal bâtiment.
        </h2>
        <p className="text-white/70 max-w-2xl mb-8">
          Plus de 100 signaux bâtiment pour transformer l&apos;intuition en ciblage
          scientifique. Vous choisissez vos critères, Pisteur trouve les bâtiments qui
          matchent vraiment.
        </p>

        <div className="grid md:grid-cols-[2fr,1fr] gap-6 items-start">
          <div className="grid md:grid-cols-3 gap-4">
            {filters.map((block) => (
              <div key={block.title} className="glass-card p-4">
                <p className="text-xs font-semibold text-white/80 mb-2">
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

          <div className="glass-card p-4 text-xs text-white/75">
            <p className="text-sm font-medium text-white mb-2">
              Vue d&apos;ensemble de votre marché
            </p>
            <div className="flex flex-col gap-2 mb-3">
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
              Résultats triés par pertinence avec un score % Match et un classement
              automatique des meilleures opportunités.
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
    <section className="section">
      <div className="section-inner">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Un impact direct sur vos chiffres.
        </h2>
        <p className="text-white/70 max-w-2xl mb-8">
          Les équipes commerciales qui utilisent Pisteur mesurent plus de rendez-vous
          utiles, moins de temps perdu et une meilleure visibilité sur leur marché.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {impacts.map((item) => (
            <div key={item.label} className="glass-card p-5 flex flex-col gap-2">
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
    <section className="section">
      <div className="section-inner grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Un système de crédits simple, sans mauvaise surprise.
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
          <div className="glass-card p-4">
            <p className="text-xs uppercase tracking-wide text-white/50 mb-1">
              1 crédit
            </p>
            <p className="font-semibold mb-1">1 lead qualifié</p>
            <p className="text-white/70 text-xs">
              Association bâtiment × entreprise gestionnaire avec score % Match,
              potentiel chantier estimé et données énergétiques complètes.
            </p>
          </div>

          <div className="glass-card p-4">
            <p className="text-xs uppercase tracking-wide text-white/50 mb-1">
              1 crédit
            </p>
            <p className="font-semibold mb-1">1 adresse email nominative</p>
            <p className="text-white/70 text-xs">
              Email professionnel du décideur ciblé (DG, PDG, syndic…). 0 crédit
              débité si l&apos;email n&apos;est pas trouvé.
            </p>
          </div>

          <div className="glass-card p-4">
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
    <section className="section">
      <div className="section-inner">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Une infrastructure de données construite sur les meilleures sources.
        </h2>
        <p className="text-white/70 max-w-2xl mb-8">
          Pisteur agrège, normalise et enrichit des dizaines de sources officielles
          et privées pour construire une vision fiable du parc immobilier français.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {blocks.map((block) => (
            <div key={block.title} className="glass-card p-5 text-sm flex flex-col gap-2">
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
      <div className="section-inner glass-card bg-gradient-to-r from-primary-500/40 via-neon-500/40 to-accent-500/40 border-white/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
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
          className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-white text-navy-900 font-medium text-sm hover:bg-gray-100 transition-colors"
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
      <AICopilotSection />
      <SignalSection />
      <ImpactSection />
      <CreditsSection />
      <DataStackSection />
      <CtaSection />
    </>
  );
}
