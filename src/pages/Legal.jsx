export default function Legal() {
  return (
    <section className="section">
      <div className="section-inner max-w-3xl mx-auto py-12 space-y-8">
        <div>
          <p className="text-xs font-semibold tracking-widest text-g-400 uppercase mb-2">
            Légal
          </p>
          <h1 className="text-3xl font-extrabold text-g-900">Mentions légales</h1>
        </div>

        {[
          {
            title: 'Éditeur du site',
            content: `Pisteur SAS — Société par actions simplifiée au capital de 1 000 €
Siège social : [Adresse complète], France
SIRET : [Numéro SIRET]
RCS : [Ville] [Numéro RCS]
Directeur de la publication : [Prénom Nom]
Email : contact@pisteur.tech`,
          },
          {
            title: 'Hébergement',
            content: `Vercel Inc.
440 N Barranca Ave #4133
Covina, CA 91723, États-Unis
https://vercel.com`,
          },
          {
            title: 'Propriété intellectuelle',
            content: `L'ensemble du contenu de ce site (textes, images, logos, graphiques) est la propriété exclusive de Pisteur SAS et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, même partielle, est strictement interdite sans autorisation préalable écrite.`,
          },
          {
            title: 'Données personnelles',
            content: `Les informations collectées via les formulaires de ce site sont destinées à Pisteur SAS et ne sont jamais cédées à des tiers. Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous à : contact@pisteur.tech`,
          },
          {
            title: 'Cookies',
            content: `Ce site utilise des cookies techniques nécessaires à son fonctionnement ainsi que des cookies analytiques (Google Analytics) pour mesurer l'audience. Vous pouvez refuser les cookies non essentiels via la bannière présente lors de votre première visite.`,
          },
          {
            title: 'Limitation de responsabilité',
            content: `Pisteur SAS s'efforce d'assurer l'exactitude des informations publiées sur ce site. Cependant, elle ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées. L'utilisation de ces informations se fait sous la responsabilité exclusive de l'utilisateur.`,
          },
        ].map(({ title, content }) => (
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