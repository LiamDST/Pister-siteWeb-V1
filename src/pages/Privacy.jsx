export default function Privacy() {
  const sections = [
    {
      title: '1. Qui sommes-nous ?',
      content: `Pisteur SAS est responsable du traitement de vos données personnelles collectées via le site pisteur.tech. Pour toute question relative à vos données, contactez-nous à : contact@pisteur.tech`,
    },
    {
      title: '2. Données collectées',
      content: `Nous collectons uniquement les données que vous nous fournissez volontairement :
• Via le formulaire de contact : nom, prénom, email professionnel, société, message
• Via les cookies analytiques : pages visitées, durée de session, source de trafic (anonymisé)
Nous ne collectons jamais de données sensibles (santé, opinions politiques, etc.).`,
    },
    {
      title: '3. Finalités du traitement',
      content: `Vos données sont utilisées pour :
• Répondre à vos demandes de contact ou de démo
• Améliorer notre site via des statistiques d'audience anonymisées
• Vous envoyer des informations commerciales si vous y avez consenti

Base légale : exécution d'un contrat, intérêt légitime, consentement.`,
    },
    {
      title: '4. Durée de conservation',
      content: `• Données de contact : 3 ans à compter du dernier contact
• Données analytiques : 14 mois (paramétrage Google Analytics)
• Données de prospection commerciale : 3 ans`,
    },
    {
      title: '5. Partage des données',
      content: `Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec :
• Google LLC (Google Analytics — anonymisé)
• Notre hébergeur Vercel Inc. (stockage technique)
Tous nos sous-traitants sont conformes au RGPD.`,
    },
    {
      title: '6. Vos droits',
      content: `Conformément au RGPD, vous disposez des droits suivants :
• Droit d'accès à vos données
• Droit de rectification
• Droit à l'effacement (« droit à l'oubli »)
• Droit à la portabilité
• Droit d'opposition au traitement
• Droit de retrait du consentement

Pour exercer ces droits : contact@pisteur.tech
Vous pouvez également introduire une réclamation auprès de la CNIL : www.cnil.fr`,
    },
    {
      title: '7. Cookies',
      content: `Nous utilisons :
• Cookies techniques (indispensables au fonctionnement du site) — pas de consentement requis
• Google Analytics 4 (mesure d'audience anonymisée) — consentement requis

Vous pouvez gérer vos préférences via la bannière de cookies ou les paramètres de votre navigateur.`,
    },
    {
      title: '8. Sécurité',
      content: `Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données : connexion HTTPS, accès restreint, mots de passe sécurisés. En cas de violation de données, nous vous en informerons dans les 72 heures conformément à l'article 33 du RGPD.`,
    },
  ];

  return (
    <section className="section">
      <div className="section-inner max-w-3xl mx-auto py-12 space-y-8">
        <div>
          <p className="text-xs font-semibold tracking-widest text-g-400 uppercase mb-2">
            RGPD
          </p>
          <h1 className="text-3xl font-extrabold text-g-900">
            Politique de confidentialité
          </h1>
          <p className="text-sm text-g-500 mt-2">
            Nous prenons la protection de vos données personnelles très au sérieux.
            Cette politique explique comment nous les collectons, les utilisons et
            les protégeons.
          </p>
        </div>

        {sections.map(({ title, content }) => (
          <div key={title} className="glass-card p-6 space-y-2">
            <h2 className="text-base font-bold text-g-900">{title}</h2>
            <p className="text-sm text-g-500 whitespace-pre-line leading-relaxed">
              {content}
            </p>
          </div>
        ))}

        <p className="text-xs text-g-400 text-center">
          Dernière mise à jour : mai 2026
        </p>
      </div>
    </section>
  );
}