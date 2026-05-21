import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

const faqs = [
  { question: "Qu'est-ce que Pisteur exactement ?", answer: "Pisteur est une plateforme de prospection B2B pour les professionnels du bâtiment. Elle analyse automatiquement des millions de bâtiments en France et vous envoie chaque jour ceux qui correspondent à votre cible, avec le décideur nominatif et le potentiel de chantier estimé." },
  { question: "Quels types de bâtiments sont couverts ?", answer: "Pisteur couvre les bâtiments résidentiels collectifs, tertiaires et industriels : copropriétés, bureaux, hôtels, entrepôts, établissements de santé. Nous disposons de données sur plus de 1,2 million de bâtiments en France." },
  { question: "Comment fonctionne le ciblage ?", answer: "Vous configurez vos filtres : type de bâtiment, DPE, énergie principale, surface, département, code NAF du propriétaire. Pisteur croise ces critères avec plus de 100 signaux d'intention pour scorer et prioriser vos leads." },
  { question: "Les données sont-elles fiables ?", answer: "Nos données sont issues de sources certifiées : base ADEME, DPE, registre foncier, données cadastrales. Elles sont recoupées par nos algorithmes et mises à jour en continu." },
  { question: "Combien coûte la plateforme ?", answer: "Pisteur propose plusieurs formules adaptées à la taille de votre équipe commerciale. Un essai gratuit est disponible sans carte bancaire. Consultez la page Tarifs ou contactez-nous pour un devis personnalisé." },
  { question: "Puis-je intégrer Pisteur à mon CRM ?", answer: "Oui, Pisteur propose une API et des exports CSV compatibles avec les principaux CRM du marché (HubSpot, Pipedrive, Salesforce)." },
  { question: "Quelle est la durée d'engagement ?", answer: "Aucun engagement minimum. Vous pouvez utiliser Pisteur tant qu'il vous apporte de la valeur. Formules mensuelles et annuelles disponibles." },
];

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-navy-100 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="text-navy-900 font-medium pr-8 group-hover:text-green-600 transition-colors">{question}</span>
        <ChevronDown className={`w-5 h-5 text-navy-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-navy-600 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <>
      <section className="relative pt-32 pb-16 bg-navy-950">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-navy-900 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Questions fréquentes</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">Tout ce que vous devez savoir sur Pisteur et la prospection bâtiment intelligente.</p>
        </div>
      </section>
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-navy-100 px-6 sm:px-8">
            {faqs.map((faq) => <FaqItem key={faq.question} {...faq} />)}
          </div>
          <div className="text-center mt-16">
            <p className="text-navy-600 mb-4">Vous avez d'autres questions ?</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-all shadow-lg shadow-green-500/25">
              Contactez-nous <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}