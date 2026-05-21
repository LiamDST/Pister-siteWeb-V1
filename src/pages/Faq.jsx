import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSeoMeta } from '../hooks/useSeoMeta';

const faqs = [
  {
    category: 'Le produit',
    items: [
      {
        q: 'Comment Pisteur identifie-t-il les bâtiments à cibler ?',
        a: 'Pisteur agrège plus de 100 sources de données publiques et propriétaires (ADEME, BDNB, DVF, permis de construire, registre des copropriétés…) et les croise avec un algorithme de scoring pour identifier les bâtiments les plus susceptibles d\'avoir besoin de vos services.',
      },
      {
        q: 'D\'où proviennent les coordonnées des décideurs ?',
        a: 'Nous croisons les registres légaux (Infogreffe, SIRENE), les bases de syndics, les appels d\'offres publics et des sources propriétaires pour identifier le gestionnaire ou décideur nominatif de chaque bâtiment. Toutes les données sont conformes RGPD.',
      },
      {
        q: 'Combien de bâtiments sont disponibles en France ?',
        a: 'Pisteur couvre plus de 1,2 million de bâtiments tertiaires et résidentiels collectifs en France. La base est mise à jour en continu avec les nouvelles données publiques.',
      },
      {
        q: 'Les données sont-elles à jour ?',
        a: 'Oui. Les signaux temps réel (permis de construire, mutations, nouveaux DPE) sont mis à jour quotidiennement. Les données décideur sont actualisées mensuellement.',
      },
    ],
  },
  {
    category: 'Fonctionnement',
    items: [
      {
        q: 'Comment configurer mes critères de ciblage ?',
        a: 'Depuis votre tableau de bord, vous définissez votre ICP en quelques minutes : zone géographique, type de bâtiment, classe DPE, tranche de surface, code NAF du gestionnaire. Pisteur génère immédiatement une prévisualisation du volume adressable.',
      },
      {
        q: 'À quelle fréquence reçois-je des leads ?',
        a: 'Vous recevez une liste de leads chaque matin par email et dans votre tableau de bord. La fréquence et le volume dépendent de votre plan.',
      },
      {
        q: 'Comment fonctionnent les emails personnalisés ?',
        a: 'Pour chaque lead, Pisteur génère un email commercial prêt à envoyer qui cite l\'adresse exacte du bâtiment, son DPE, sa surface et le contexte réglementaire. Vous pouvez personnaliser le ton (formel, direct) et envoyer en un clic.',
      },
      {
        q: 'Puis-je exporter mes leads vers mon CRM ?',
        a: 'Oui. Pisteur s\'intègre nativement avec HubSpot, Pipedrive et Salesforce sur les plans Pro et Growth. L\'export CSV/Excel est disponible sur tous les plans.',
      },
    ],
  },
  {
    category: 'Tarifs & engagement',
    items: [
      {
        q: 'Y a-t-il un engagement de durée ?',
        a: 'Non. Tous les plans Pisteur sont sans engagement, facturés mensuellement, résiliables à tout moment depuis votre espace client.',
      },
      {
        q: 'L\'essai gratuit est-il vraiment gratuit ?',
        a: 'Oui, 7 jours d\'accès complet au plan Pro, sans carte bancaire requise. Aucun prélèvement automatique à l\'issue de la période d\'essai.',
      },
      {
        q: 'Que se passe-t-il si je dépasse mon quota de leads ?',
        a: 'Vous recevez une notification et pouvez choisir d\'upgrader votre plan ou d\'attendre le prochain cycle mensuel. Aucun frais supplémentaire automatique.',
      },
    ],
  },
  {
    category: 'Données & RGPD',
    items: [
      {
        q: 'Les données de Pisteur sont-elles conformes RGPD ?',
        a: 'Oui. Pisteur ne collecte que des données professionnelles issues de sources légales publiques. Les données personnelles (nom, email) de décideurs sont traitées dans le cadre de l\'intérêt légitime B2B, conformément à la doctrine de la CNIL.',
      },
      {
        q: 'Mes données clients sont-elles partagées ?',
        a: 'Non. Vos données de configuration, vos leads et vos résultats commerciaux ne sont jamais partagés avec d\'autres clients ni avec des tiers.',
      },
      {
        q: 'Où sont hébergées les données ?',
        a: 'Les données sont hébergées en Europe (Vercel — région EU) et ne transitent jamais hors de l\'Union Européenne.',
      },
    ],
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-g-200 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-g-900">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-g-400 shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <p className="text-sm text-g-500 leading-relaxed pb-4 animate-slideUp">
          {a}
        </p>
      )}
    </div>
  );
}

export default function Faq() {
  useSeoMeta({
    title: 'FAQ',
    description: 'Toutes les réponses sur Pisteur : fonctionnement, données, tarifs, RGPD, intégrations CRM et emails automatisés.',
    canonical: '/faq',
  });

  return (
    <section className="section">
      <div className="section-inner py-12 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest text-g-400 uppercase mb-2">
            FAQ
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-g-900 mb-4">
            Questions fréquentes
          </h1>
          <p className="text-g-500 text-sm">
            Une question non listée ?{' '}
            <a href="/contact" className="text-p underline hover:text-p-hover">
              Contactez-nous directement.
            </a>
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map(({ category, items }) => (
            <div key={category}>
              <h2 className="text-xs font-bold tracking-widest text-p uppercase mb-4">
                {category}
              </h2>
              <div className="glass-card px-6 divide-y divide-g-100">
                {items.map(({ q, a }) => (
                  <FaqItem key={q} q={q} a={a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}