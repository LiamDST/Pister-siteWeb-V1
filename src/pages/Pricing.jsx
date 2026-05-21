export default function Pricing() {
  return (
    <section className="section">
      <div className="section-inner">
        <h1 className="text-3xl font-semibold mb-4">Tarifs</h1>
        <p className="text-white/70 mb-8 max-w-2xl">
          Adaptez Pisteur à la taille de votre équipe. Tous les plans incluent les
          mêmes données de qualité, seul le volume de leads et les options
          d&apos;accompagnement changent.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-white/50 mb-1">Starter</p>
              <p className="text-2xl font-semibold">290 € / mois</p>
            </div>
            <ul className="text-sm text-white/70 space-y-2">
              <li>Jusqu&apos;à 100 bâtiments ciblés / mois</li>
              <li>1 utilisateur</li>
              <li>Export CSV</li>
            </ul>
          </div>

          <div className="bg-white/10 border border-accent-500/60 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full bg-accent-500 text-navy-900 font-semibold">
              Populaire
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-white/50 mb-1">Pro</p>
              <p className="text-2xl font-semibold">590 € / mois</p>
            </div>
            <ul className="text-sm text-white/80 space-y-2">
              <li>Jusqu&apos;à 400 bâtiments ciblés / mois</li>
              <li>Jusqu&apos;à 3 utilisateurs</li>
              <li>Emails personnalisés générés automatiquement</li>
              <li>Support prioritaire</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-white/50 mb-1">Enterprise</p>
              <p className="text-2xl font-semibold">Sur mesure</p>
            </div>
            <ul className="text-sm text-white/70 space-y-2">
              <li>Volumes illimités</li>
              <li>Intégrations CRM avancées</li>
              <li>Accompagnement dédié</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
