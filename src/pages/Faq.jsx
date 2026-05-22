import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, X, MessageCircle } from 'lucide-react';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';

/* ═══════════════════════════════════════════════
   DONNÉES FAQ
   ═══════════════════════════════════════════════ */

const categories = ['Toutes', 'Données', 'Fonctionnalités', 'Tarifs & essai', 'Intégrations', 'RGPD'];

const faqs = [
  {
    category: 'Données',
    q: 'Quelles sources de données Pisteur utilise-t-il ?',
    a: "Pisteur croise les données BDNB (Base de Données Nationale des Bâtiments), les fichiers DPE ADEME, les données Sirene pour l'identification des gestionnaires, et plusieurs sources d'annuaires décisionnels. La base couvre plus de 1,2 million de bâtiments et est mise à jour chaque mois.",
  },
  {
    category: 'Données',
    q: 'À quelle fréquence les données sont-elles mises à jour ?',
    a: "Les données bâtiment (DPE, surface, usage) sont actualisées mensuellement depuis l'ADEME et la BDNB. Les informations décisionnelles (gestionnaires, contacts) sont vérifiées et enrichies chaque semaine.",
  },
  {
    category: 'Données',
    q: 'Pisteur couvre-t-il toute la France ?',
    a: "Oui, Pisteur couvre l'ensemble du territoire français : métropole, DOM et collectivités d'outre-mer. Vous pouvez filtrer par commune, département, région ou rayon GPS depuis une adresse précise.",
  },
  {
    category: 'Fonctionnalités',
    q: 'Combien de temps faut-il pour recevoir ses premiers leads ?',
    a: "Après configuration (environ 5 minutes), vous recevez vos premiers leads le lendemain matin. Les leads sont envoyés par email chaque jour à 7h, avec un résumé des bâtiments correspondant à vos critères.",
  },
  {
    category: 'Fonctionnalités',
    q: "Comment fonctionne l'email personnalisé IA ?",
    a: "À partir des données du bâtiment (DPE, surface, énergie, gestionnaire), notre modèle génère un email de prospection contextualisé que vous pouvez revoir avant envoi. Le taux d'ouverture moyen de ces emails est de 38% contre 21% pour un email générique.",
  },
  {
    category: 'Fonctionnalités',
    q: 'Peut-on filtrer les bâtiments selon des critères avancés ?',
    a: "Oui, Pisteur propose plus de 20 filtres : type de bâtiment, DPE, énergie de chauffage, surface chauffée, année de construction, code NAF du gestionnaire, département, surface de lots, nombre de lots et bien d'autres. Vous pouvez combiner et sauvegarder vos profils de recherche.",
  },
  {
    category: 'Tarifs & essai',
    q: 'Peut-on tester Pisteur sans carte bancaire ?',
    a: "Oui, le plan Pro est disponible en essai gratuit 14 jours sans CB. Le plan Starter est accessible en self-service directement depuis l'interface. Aucune carte bancaire n'est requise pour démarrer.",
  },
  {
    category: 'Tarifs & essai',
    q: 'Quels sont les différents plans disponibles ?',
    a: "Pisteur propose 3 plans : Starter (accès aux données bâtiment, export CSV), Pro (leads quotidiens + email IA + tableau de bord, essai 14j gratuit) et Growth (tout Pro + intégrations CRM natives + account manager dédié). Consultez la page Tarifs pour le détail des fonctionnalités.",
  },
  {
    category: 'Tarifs & essai',
    q: 'Peut-on changer de plan en cours de route ?',
    a: "Oui, vous pouvez monter ou descendre de plan à tout moment depuis votre tableau de bord. Les changements prennent effet immédiatement et la facturation est ajustée au prorata du mois en cours.",
  },
  {
    category: 'Intégrations',
    q: 'Peut-on intégrer Pisteur à un CRM ?',
    a: "Oui, le plan Growth inclut des intégrations natives avec HubSpot, Pipedrive et Salesforce. En plan Pro, l'export CSV permet d'importer les leads manuellement dans n'importe quel CRM. Une API REST est disponible sur demande pour les intégrations personnalisées.",
  },
  {
    category: 'Intégrations',
    q: 'Pisteur propose-t-il une API ?',
    a: "Une API REST est disponible pour les clients Growth et les entreprises qui souhaitent intégrer les données Pisteur directement dans leurs outils internes. Contactez notre équipe pour accéder à la documentation et à votre clé API.",
  },
  {
    category: 'RGPD',
    q: 'Pisteur est-il conforme RGPD ?',
    a: "Toutes les données personnelles (contacts, décideurs) proviennent de sources publiques légalement accessibles (Sirene, publications légales, sites institutionnels). Pisteur est hébergé en France (OVH Cloud), conforme au RGPD, et dispose d'un DPO. Un contrat de traitement des données (DPA) est disponible sur demande.",
  },
  {
    category: 'RGPD',
    q: 'Où sont hébergées les données ?',
    a: "Toutes les données sont hébergées exclusivement en France sur les infrastructures OVH Cloud (Roubaix et Strasbourg), certifiées ISO 27001 et conformes aux exigences du RGPD et du Cloud Act européen.",
  },
];

/* ═══════════════════════════════════════════════
   COMPOSANT FaqItem
   ═══════════════════════════════════════════════ */

function highlight(text, query) {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part)
      ? <mark key={i} className="bg-emerald-500/25 text-emerald-300 rounded px-0.5">{part}</mark>
      : part
  );
}

function FaqItem({ q, a, searchQuery, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`card-glass overflow-hidden transition-all duration-200 ${open ? 'border-white/20' : 'hover:border-white/15'}`}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-medium text-sm leading-snug group-hover:text-white transition-colors">
          {highlight(q, searchQuery)}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-emerald-400' : ''}`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-0">
            <div className="border-t border-white/5 pt-4 text-sm text-white/60 leading-relaxed">
              {highlight(a, searchQuery)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE FAQ
   ═══════════════════════════════════════════════ */

function FadeSection({ children, delay = 0, className = '' }) {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Faq() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Toutes');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return faqs.filter(item => {
      const matchCat = activeCategory === 'Toutes' || item.category === activeCategory;
      const matchSearch = !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  const hasSearch = search.trim().length > 0;

  return (
    <>
      {/* ── Hero header ─────────────────────────── */}
      <section className="section pb-0">
        <div className="section-inner max-w-3xl mx-auto">
          <FadeSection className="text-center mb-8">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-[0.28em] mb-3">
              FAQ
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
              Questions fréquentes
            </h1>
            <p className="text-white/55 text-sm">
              Vous ne trouvez pas la réponse ?{' '}
              <Link to="/contact" className="text-emerald-400 hover:underline underline-offset-2">
                Contactez-nous
              </Link>
            </p>
          </FadeSection>

          {/* ── Barre de recherche ──────────────── */}
          <FadeSection delay={80}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher une question…"
                className="form-input pl-11 pr-11 text-sm"
                aria-label="Rechercher dans la FAQ"
              />
              {hasSearch && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                  aria-label="Effacer la recherche"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </FadeSection>

          {/* ── Filtres catégories ──────────────── */}
          <FadeSection delay={120} className="mt-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${activeCategory === cat
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/75'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── Liste FAQ ───────────────────────────── */}
      <section className="section pt-8">
        <div className="section-inner max-w-3xl mx-auto">

          {/* Compteur de résultats */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs text-white/40">
              {filtered.length === 0
                ? 'Aucun résultat'
                : `${filtered.length} question${filtered.length > 1 ? 's' : ''}${hasSearch || activeCategory !== 'Toutes' ? ' trouvée' + (filtered.length > 1 ? 's' : '') : ''}`}
            </p>
            {(hasSearch || activeCategory !== 'Toutes') && (
              <button
                onClick={() => { setSearch(''); setActiveCategory('Toutes'); }}
                className="text-xs text-white/40 hover:text-white/70 flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" />
                Réinitialiser
              </button>
            )}
          </div>

          {/* Résultats */}
          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((item, i) => (
                <FadeSection key={item.q} delay={i * 40}>
                  <FaqItem
                    q={item.q}
                    a={item.a}
                    searchQuery={search}
                    defaultOpen={hasSearch && filtered.length <= 3}
                  />
                </FadeSection>
              ))}
            </div>
          ) : (
            <FadeSection>
              <div className="card-glass p-10 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                  <Search className="w-5 h-5 text-white/30" />
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">Aucun résultat pour « {search} »</p>
                  <p className="text-xs text-white/50">
                    Essayez un autre mot-clé ou{' '}
                    <button onClick={() => setSearch('')} className="text-emerald-400 hover:underline underline-offset-2">
                      effacez la recherche
                    </button>
                  </p>
                </div>
              </div>
            </FadeSection>
          )}

          {/* ── CTA contact ──────────────────────── */}
          <FadeSection delay={100} className="mt-12">
            <div className="card-glass p-6 flex flex-col sm:flex-row items-center gap-5 bg-gradient-to-br from-emerald-500/5 to-transparent">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-sm mb-0.5">Vous n'avez pas trouvé votre réponse ?</p>
                <p className="text-xs text-white/50">
                  Notre équipe répond sous 24h, du lundi au vendredi.
                </p>
              </div>
              <Link
                to="/contact"
                className="btn-accent shrink-0 sm:ml-auto text-xs px-4 py-2.5"
              >
                Nous contacter
              </Link>
            </div>
          </FadeSection>
        </div>
      </section>
    </>
  );
}