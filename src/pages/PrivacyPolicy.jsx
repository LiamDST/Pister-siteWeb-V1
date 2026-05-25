import { Link } from 'react-router-dom';
import { BarChart3, ShieldCheck, Database, Mail, Clock, ChevronLeft } from 'lucide-react';

const sections = [
  {
    title: '1. Données collectées',
    items: [
      { subtitle: 'Données de contact', text: 'Nom, prénom, adresse e-mail, numéro de téléphone, société, message envoyé via le formulaire de contact ou de demande de démo.' },
      { subtitle: 'Données de navigation', text: 'Adresse IP, navigateur, pages consultées, durée de visite, interactions avec le site, via cookies analytiques si vous les acceptez.' },
      { subtitle: 'Données liées au compte', text: 'Adresse e-mail, mot de passe chiffré, historiques de simulations et d’exports si vous créez un compte Pisteur.' },
    ],
  },
  {
    title: '2. Finalités & base légale',
    items: [
      { subtitle: 'Réponse à vos demandes', text: 'Nous utilisons vos données pour répondre à vos messages, organiser une démonstration, vous rappeler ou vous transmettre une proposition commerciale.' },
      { subtitle: 'Amélioration du service', text: 'Les données de navigation nous aident à améliorer l’ergonomie, les performances et les contenus du site.' },
      { subtitle: 'Base légale', text: 'Le traitement est fondé sur votre consentement (Art. 6 §1 a RGPD) pour les communications marketing, et sur notre intérêt légitime (Art. 6 §1 f RGPD) pour répondre à vos demandes commerciales.' },
    ],
  },
  {
    title: '3. Sous-traitants & transferts',
    items: [
      { subtitle: 'Supabase', text: 'Base de données et authentification. Serveurs hébergés en Europe (AWS eu-west-1). DPA disponible sur supabase.com/legal.' },
      { subtitle: 'EmailJS', text: 'Envoi des e-mails transactionnels liés au formulaire de contact.' },
      { subtitle: 'Vercel', text: 'Hébergement du site web. Serveurs en Europe. Aucune donnée personnelle stockée par Vercel sauf les logs techniques anonymisés.' },
    ],
  },
  {
    title: '4. Durée de conservation',
    items: [
      { subtitle: 'Demandes commerciales', text: '12 mois à compter du dernier échange.' },
      { subtitle: 'Compte client', text: 'Pendant toute la durée du compte, puis suppression ou anonymisation sous 90 jours après fermeture.' },
      { subtitle: 'Logs techniques', text: '30 jours maximum, sauf obligation légale ou besoin de sécurité.' },
    ],
  },
  {
    title: '5. Vos droits (RGPD)',
    items: [
      { subtitle: 'Vos droits', text: 'Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition, de limitation, et de portabilité de vos données.' },
      { subtitle: 'Comment exercer vos droits', text: 'Pour exercer vos droits, envoyez un e-mail à : rgpd@pisteur.fr avec l\'objet « Exercice de droits RGPD » et une description de votre demande. Nous répondons sous 30 jours. En cas de désaccord, vous pouvez saisir la CNIL : cnil.fr.' },
    ],
  },
  {
    title: '6. Sécurité',
    items: [
      { subtitle: 'Mesures techniques', text: 'Toutes les données transitent via HTTPS (TLS 1.3). Les mots de passe sont hachés (bcrypt). L\'accès à la base de données est restreint par rôle. Les sauvegardes sont chiffrées.' },
    ],
  },
  {
    title: '7. Cookies',
    items: [
      { subtitle: 'Cookies nécessaires', text: 'Ces cookies sont indispensables au fonctionnement du site (session, sécurité). Ils ne nécessitent pas votre consentement.' },
      { subtitle: 'Cookies analytiques', text: 'Mesure d’audience, pages visitées, parcours utilisateur. Utilisés uniquement avec votre consentement.' },
      { subtitle: 'Cookies marketing', text: 'Publicités personnalisées et retargeting, désactivés par défaut et activés uniquement si vous les acceptez.' },
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <section className="section">
      <div className="section-inner max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-emerald-400 transition-colors mb-6">
            <ChevronLeft className="w-4 h-4" />
            ← Retour à l'accueil
          </Link>
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">Confidentialité</p>
          <h1 className="text-4xl font-bold mb-3">Politique de confidentialité</h1>
          <p className="text-white/55 text-sm">Dernière mise à jour : 25 mai 2026</p>
        </div>
      </div>
    </section>
  );
}
