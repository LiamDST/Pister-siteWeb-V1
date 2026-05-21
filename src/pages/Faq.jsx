import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';

const faqs = [
  { q: 'Pisteur utilise quelles sources de données ?', a: "Pisteur croise les données BDNB (Base de Données Nationale des Bâtiments), les fichiers DPE ADEME, les données Sirene pour l'identification des gestionnaires, et plusieurs sources d'annuaires décisionnels. La base est mise à jour chaque mois." },
  { q: 'Combien de temps faut-il pour recevoir ses premiers leads ?', a: "Après configuration (environ 5 minutes), vous recevez vos premiers leads le lendemain matin. Les leads sont envoyés par email chaque jour à 7h." },
  { q: 'Peut-on intégrer Pisteur à un CRM ?', a: "Oui, le plan Growth inclut des intégrations natives avec HubSpot, Pipedrive et Salesforce. En plan Pro, l'export CSV permet d'importer les leads manuellement dans n'importe quel CRM." },
  { q: "Comment fonctionne l'email personnalisé IA ?", a: "À partir des données du bâtiment (DPE, surface, énergie, gestionnaire), notre modèle génère un email de prospection contextualisé que vous pouvez revoir avant envoi. Le taux d'ouverture moyen de ces emails est de 38% contre 21% pour un email générique." },
  { q: 'Peut-on tester Pisteur sans carte bancaire ?', a: "Oui, le plan Pro est disponible en essai gratuit 14 jours sans CB. Le plan Starter est accessible en self-service directement." },
  { q: 'Pisteur est-il conforme RGPD ?', a: "Toutes les données personnelles (contacts, décideurs) proviennent de sources publiques légalement accessibles (Sirene, publications légales, sites institutionnels). Pisteur est hébergé en France et conforme au RGPD." },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-glass overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/3 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-sm pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-white/60 leading-relaxed animate-slideUp">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Faq() {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <section className="section">
      <div className="section-inner max-w-3xl mx-auto">
        <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} text-center mb-10`}>
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">FAQ</p>
          <h1 className="text-4xl font-bold mb-3">Questions fréquentes</h1>
          <p className="text-white/60 text-sm">Vous ne trouvez pas la réponse ? <a href="/contact" className="text-emerald-400 hover:underline">Contactez-nous</a></p>
        </div>
        <div className="space-y-3">
          {faqs.map(item => <FaqItem key={item.q} {...item} />)}
        </div>
      </div>
    </section>
  );
}
