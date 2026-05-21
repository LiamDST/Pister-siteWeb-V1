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
            Pisteur analyse des millions de bâtiments et vous envoie uniquement ceux
            où votre expertise a un impact concret.
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
            Votre cible en quelques filtres
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
      desc: 'Une liste de bâtiments priorisés avec décideurs nominatif, coordonnées et potentiel chiffré.',
    },
    {
      title: 'Contactez avec un email personnalisé',
      desc: 'Un email généré automatiquement qui cite le bâtiment exact et son contexte énergétique.',
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

function CtaSection() {
  return (
    <section className="section">
      <div className="section-inner bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Prêt à voir les bâtiments qui vous correspondent ?
          </h2>
          <p className="text-sm text-white/80 max-w-md">
            Configurez Pisteur sur votre ICP réel et recevez une vue claire de votre
            marché adressable. Essai gratuit, sans carte bancaire.
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
      <ImpactSection />
      <CtaSection />
    </>
  );
}
