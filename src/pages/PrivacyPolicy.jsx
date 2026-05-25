import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';
import { Link } from 'react-router-dom';
import { Shield, Mail, Database, Eye, Trash2, Clock, Globe, Lock } from 'lucide-react';

function FadeSection({ children, delay = 0, className = '' }) {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

const sections = [
  {
    icon: <Database className="w-5 h-5" />,
    title: '1. Données collectées',
    content: [
      { subtitle: 'Données que vous nous fournissez', text: 'Lorsque vous remplissez un formulaire de contact ou de démo, nous collectons votre nom, prénom, adresse e-mail professionnelle, nom de votre entreprise, numéro de téléphone (optionnel) et votre message. Ces données sont strictement nécessaires pour traiter votre demande.' },
      { subtitle: 'Données de navigation (avec votre consentement)', text: 'Avec votre accord, nous collectons des données de navigation anonymisées : pages visitées, durée de session, source de trafic. Ces données nous aident à améliorer le site. Elles ne sont jamais revendues.' },
      { subtitle: 'Données techniques nécessaires', text: 'Certaines données techniques sont collectées automatiquement pour le bon fonctionnement du site : adresse IP (anonymisée), type de navigateur, système dexploitation. Ces données ne permettent pas de vous identifier personnellement.' },
    ],
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: '2. Utilisation des données',
    content: [
      { subtitle: 'Finalités du traitement', text: 'Vos données personnelles sont utilisées exclusivement pour : répondre à vos demandes de contact ou de démo, vous envoyer des informations que vous avez explicitement demandées (newsletter), améliorer notre produit et notre site web.' },
      { subtitle: 'Base légale', text: 'Le traitement est fondé sur votre consentement (Art. 6 §1 a RGPD) pour les communications marketing, et sur notre intérêt légitime (Art. 6 §1 f RGPD) pour répondre à vos demandes commerciales.' },
    ],
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: '3. Sous-traitants & transferts',
    content: [
      { subtitle: 'Services tiers utilisés', text: 'Pisteur utilise les services suivants pour traiter vos données :' },
      { subtitle: 'Supabase (infrastructure)', text: 'Base de données et authentification. Serveurs hébergés en Europe (AWS eu-west-1). DPA disponible sur supabase.com/legal.' },
      { subtitle: 'EmailJS', text: 'Envoi des formulaires de contact. Les données de formulaire transitent par leurs serveurs. Politique disponible sur emailjs.com.' },
      { subtitle: 'Vercel (hébergement)', text: 'Hébergement du site web. Serveurs en Europe. Aucune donnée personnelle stockée par Vercel sauf les logs techniques anonymisés.' },
    ],
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: '4. Durée de conservation',
    content: [
      { subtitle: 'Données de contact', text: 'Vos données de contact sont conservées 3 ans à compter du dernier contact, conformément aux recommandations de la CNIL pour les données prospects B2B.' },
      { subtitle: 'Données de navigation', text: 'Les données analytiques sont conservées 13 mois maximum, conformément aux recommandations CNIL.' },
      { subtitle: 'Données de facturation', text: 'Les données de facturation sont conservées 10 ans conformément aux obligations comptables légales.' },
    ],
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: '5. Vos droits (RGPD)',
    content: [
      { subtitle: 'Droits applicables', text: 'Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679), vous disposez des droits suivants : accès à vos données, rectification, effacement (droit à l oubli), portabilité, opposition au traitement, limitation du traitement.' },
      { subtitle: 'Comment exercer vos droits', text: 'Pour exercer vos droits, envoyez un e-mail à : rgpd@pisteur.fr avec l objet « Exercice de droits RGPD » et une description de votre demande. Nous répondons sous 30 jours. En cas de désaccord, vous pouvez saisir la CNIL : cnil.fr.' },
    ],
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: '6. Sécurité',
    content: [
      { subtitle: 'Mesures techniques', text: 'Toutes les données transitent via HTTPS (TLS 1.3). Les mots de passe sont hachés (bcrypt). L accès à la base de données est restreint par rôle. Les sauvegardes sont chiffrées.' },
      { subtitle: 'En cas de violation', text: 'En cas de violation de données susceptible de porter atteinte à vos droits, nous nous engageons à vous notifier dans les 72h suivant la détection, conformément à l Art. 33 RGPD.' },
    ],
  },
  {
    icon: <Trash2 className="w-5 h-5" />,
    title: '7. Cookies',
    content: [
      { subtitle: 'Cookies nécessaires', text: 'Ces cookies sont indispensables au fonctionnement du site (session, sécurité). Ils ne nécessitent pas votre consentement.' },
      { subtitle: 'Cookies analytiques (consentement requis)', text: 'Avec votre accord, nous utilisons des cookies anonymisés pour mesurer l audience du site. Vous pouvez retirer votre consentement à tout moment via le bandeau cookies.' },
      { subtitle: 'Cookies marketing (consentement requis)', text: 'Uniquement avec votre accord explicite, pour personnaliser les publicités. Non activés par défaut.' },
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <section className="section pb-20">
      <div className="section-inner max-w-3xl">

        {/* Hero */}
        <FadeSection className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Confidentiel</p>
          </div>
          <h1 className="text-4xl font-bold mb-3">Politique de confidentialité</h1>
          <p className="text-white/55 text-sm leading-relaxed max-w-2xl">
            Pisteur s'engage à protéger vos données personnelles conformément au RGPD (UE 2016/679) et à la loi Informatique et Libertés.
            Ce document décrit quelles données nous collectons, pourquoi, et comment vous pouvez les contrôler.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-white/30">
            <span>Dernière mise à jour : 25 mai 2026</span>
            <span>·</span>
            <span>Responsable : Pisteur SAS</span>
          </div>
        </FadeSection>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((s, i) => (
            <FadeSection key={s.title} delay={i * 60}>
              <div className="card-glass p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    {s.icon}
                  </div>
                  <h2 className="font-bold text-base">{s.title}</h2>
                </div>
                <div className="space-y-4">
                  {s.content.map((c) => (
                    <div key={c.subtitle}>
                      <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">{c.subtitle}</p>
                      <p className="text-sm text-white/55 leading-relaxed">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeSection>
          ))}
        </div>

        {/* Contact DPO */}
        <FadeSection delay={200} className="mt-10">
          <div className="card-glass p-6 rounded-2xl border-emerald-500/20 bg-emerald-500/5">
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold mb-1">Contact Délégué à la Protection des Données</p>
                <p className="text-sm text-white/55 mb-3">Pour toute question relative à vos données personnelles ou pour exercer vos droits :</p>
                <a
                  href="mailto:rgpd@pisteur.fr"
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  rgpd@pisteur.fr
                </a>
                <p className="text-xs text-white/30 mt-3">
                  Pisteur SAS — 123 Avenue de la République, 75011 Paris — SIRET : 123 456 789 00010
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        <FadeSection delay={240} className="mt-6 text-center">
          <Link to="/" className="text-sm text-white/40 hover:text-white/70 transition-colors underline underline-offset-4">
            ← Retour à l'accueil
          </Link>
        </FadeSection>

      </div>
    </section>
  );
}
