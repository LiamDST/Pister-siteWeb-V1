import { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronDown, Search, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: 'Données',          emoji: '🗄️' },
  { id: 'Fonctionnalités',  emoji: '⚡' },
  { id: 'Tarifs & Essai',   emoji: '💳' },
  { id: 'Technique',        emoji: '🔒' },
];

const FAQS = [
  {
    category: 'Données',
    q: 'Quelles sources de données Pisteur utilise-t-il ?',
    a: 'Pisteur croise la BDNB (Base de Données Nationale des Bâtiments), les fichiers DPE de l'ADEME, les données Sirene pour l'identification des gestionnaires, et plusieurs annuaires décisionnels. La base est mise à jour chaque mois.',
  },
  {
    category: 'Données',
    q: 'Les données personnelles des contacts sont-elles légales ?',
    a: 'Oui. Toutes les données de contact (décideurs, gestionnaires) proviennent exclusivement de sources publiques légalement accessibles : Sirene, publications légales, sites institutionnels. Pisteur est hébergé en France et entièrement conforme au RGPD.',
  },
  {
    category: 'Données',
    q: 'Combien de bâtiments sont couverts en France ?',
    a: 'La base Pisteur couvre plus de 1,2 million de bâtiments analysés sur l'ensemble du territoire français, avec un focus sur le tertiaire, le résidentiel collectif et les bâtiments publics.',
  },
  {
    category: 'Fonctionnalités',
    q: 'Combien de temps pour recevoir ses premiers leads ?',
    a: 'Après configuration de vos filtres (environ 5 minutes), vous recevez vos premiers leads le lendemain matin à 7h. La liste est actualisée quotidiennement en fonction de votre ICP.',
  },
  {
    category: 'Fonctionnalités',
    q: 'Comment fonctionne l'email personnalisé par IA ?',
    a: 'À partir des données du bâtiment (DPE, surface, énergie, gestionnaire identifié), notre modèle génère un email de prospection contextualisé que vous pouvez relire avant envoi. Le taux d'ouverture moyen est de 38 %, contre 21 % pour un email générique.',
  },
  {
    category: 'Fonctionnalités',
    q: 'Peut-on filtrer les leads par région ou département ?',
    a: 'Oui, le ciblage géographique est disponible à la commune, au département ou à la région. Vous pouvez combiner ce filtre avec d'autres critères comme le DPE, la surface ou le type d'usage du bâtiment.',
  },
  {
    category: 'Fonctionnalités',
    q: 'Peut-on intégrer Pisteur à un CRM ?',
    a: 'Oui. Le plan Growth inclut des intégrations natives avec HubSpot, Pipedrive et Salesforce. En plan Pro, un export CSV quotidien permet d'importer les leads manuellement dans n'importe quel CRM.',
  },
  {
    category: 'Tarifs & Essai',
    q: 'Peut-on tester Pisteur sans carte bancaire ?',
    a: 'Oui. Le plan Pro est disponible en essai gratuit 14 jours, sans CB requise. Le plan Starter est accessible en self-service directement depuis votre espace.',
  },
  {
    category: 'Tarifs & Essai',
    q: 'Quels plans sont disponibles ?',
    a: 'Pisteur propose trois offres : Starter (accès self-service, leads quotidiens de base), Pro (personnalisation avancée, IA email, export CSV) et Growth (CRM natif, équipe multi-utilisateurs, onboarding dédié).',
  },
  {
    category: 'Tarifs & Essai',
    q: 'Y a-t-il un engagement minimum ?',
    a: 'Non. Tous les plans sont sans engagement, résiliables à tout moment depuis votre tableau de bord. Aucun frais caché ni pénalité de résiliation.',
  },
  {
    category: 'Technique',
    q: 'Pisteur est-il conforme RGPD ?',
    a: 'Oui. Pisteur est hébergé en France (OVHcloud), les données personnelles proviennent de sources publiques légales, et notre DPA est disponible sur demande pour les entreprises soumises à des obligations contractuelles spécifiques.',
  },
  {
    category: 'Technique',
    q: 'Quelle est la fréquence de mise à jour des données ?',
    a: 'La base bâtiment est mise à jour mensuellement. Les données DPE sont synchronisées en continu depuis les flux ADEME. Les informations décisionnaires sont vérifiées trimestriellement.',
  },
];

/* ─────────────────────────────────────────────────────────────
   ACCORDION ITEM
───────────────────────────────────────────────────────────── */
function FaqItem({ q, a, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!bodyRef.current) return;
    setHeight(isOpen ? bodyRef.current.scrollHeight : 0);
  }, [isOpen]);

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isOpen
          ? 'border-emerald-500/30 bg-emerald-500/5'
          : 'border-white/8 bg-white/4 hover:border-white/14'
      }`}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-sm leading-snug">{q}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-emerald-400' : 'text-white/35'
          }`}
        />
      </button>

      <div
        style={{ maxHeight: height, transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)' }}
        className="overflow-hidden"
      >
        <div ref={bodyRef} className="px-5 pb-5 pt-0 text-sm text-white/60 leading-relaxed border-t border-white/6">
          <div className="pt-3">{a}</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function Faq() {
  const [activeCategory, setActiveCategory] = useState('Toutes');
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const { ref: heroRef, visible: heroVisible } = useFadeInOnScroll();
  const { ref: ctaRef, visible: ctaVisible } = useFadeInOnScroll();

  const filtered = useMemo(() => {
    return FAQS.filter((item) => {
      const matchCat = activeCategory === 'Toutes' || item.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  useEffect(() => { setOpenIndex(null); }, [activeCategory, search]);

  const handleToggle = (idx) => setOpenIndex((prev) => (prev === idx ? null : idx));

  // Group filtered items by category for the sidebar display
  const groupedByCategory = useMemo(() => {
    if (activeCategory !== 'Toutes') return null;
    return CATEGORIES.map((cat) => ({
      ...cat,
      items: filtered.filter((f) => f.category === cat.id),
    })).filter((g) => g.items.length > 0);
  }, [filtered, activeCategory]);

  return (
    <section className="section">
      <div className="section-inner max-w-5xl mx-auto">

        {/* ── Hero ── */}
        <div
          ref={heroRef}
          className={`text-center mb-10 transition-all duration-700 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-emerald-400 text-[11px] font-semibold uppercase tracking-[0.28em] mb-3">
            Centre d'aide
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
            Questions fréquentes
          </h1>
          <p className="text-white/50 text-sm">
            Vous ne trouvez pas ?{' '}
            <Link to="/contact" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Contactez notre équipe
            </Link>
          </p>
        </div>

        {/* ── Barre de recherche ── */}
        <div className="relative mb-6 max-w-2xl mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35 pointer-events-none" />
          <input
            type="text"
            placeholder="Rechercher une question…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-10"
          />
        </div>

        {/* ── Layout 2 colonnes ── */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Sidebar catégories */}
          <aside className="lg:sticky lg:top-24 w-full lg:w-56 shrink-0 flex flex-row lg:flex-col gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory('Toutes')}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-200 w-full ${
                activeCategory === 'Toutes'
                  ? 'bg-emerald-500/12 text-emerald-300 border border-emerald-500/30'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className="text-base">📋</span>
              <span>Toutes</span>
              <span className="ml-auto text-xs text-white/30">{FAQS.length}</span>
            </button>

            {CATEGORIES.map((cat) => {
              const count = FAQS.filter((f) => f.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-200 w-full ${
                    activeCategory === cat.id
                      ? 'bg-emerald-500/12 text-emerald-300 border border-emerald-500/30'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="text-base">{cat.emoji}</span>
                  <span>{cat.id}</span>
                  <span className="ml-auto text-xs text-white/30">{count}</span>
                </button>
              );
            })}

            {/* Séparateur + CTA sidebar */}
            <div className="hidden lg:block mt-4 pt-4 border-t border-white/8 w-full">
              <p className="text-xs text-white/40 mb-3">Besoin d'aide ?</p>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-white/6 hover:bg-white/10 border border-white/10 transition-all duration-200 text-white/70 hover:text-white"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                Nous écrire
              </Link>
            </div>
          </aside>

          {/* Contenu questions */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-white/40 text-sm rounded-2xl border border-white/8 bg-white/3">
                <p className="mb-2 text-base font-medium text-white/60">Aucun résultat</p>
                <p>
                  Essayez un autre mot-clé ou{' '}
                  <Link to="/contact" className="text-emerald-400 hover:underline">
                    posez-nous directement la question
                  </Link>.
                </p>
              </div>
            ) : groupedByCategory ? (
              /* Vue "Toutes" → groupé par catégorie */
              <div className="space-y-8">
                {groupedByCategory.map((group) => {
                  const globalOffset = filtered.filter(
                    (f) => CATEGORIES.findIndex((c) => c.id === f.category) <
                           CATEGORIES.findIndex((c) => c.id === group.id)
                  ).length;
                  return (
                    <div key={group.id}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm">{group.emoji}</span>
                        <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                          {group.id}
                        </h2>
                      </div>
                      <div className="space-y-2">
                        {group.items.map((item, localIdx) => {
                          const globalIdx = globalOffset + localIdx;
                          return (
                            <FaqItem
                              key={item.q}
                              q={item.q}
                              a={item.a}
                              isOpen={openIndex === globalIdx}
                              onToggle={() => handleToggle(globalIdx)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Vue filtre unique → liste plate */
              <div className="space-y-2">
                {filtered.map((item, idx) => (
                  <FaqItem
                    key={item.q}
                    q={item.q}
                    a={item.a}
                    isOpen={openIndex === idx}
                    onToggle={() => handleToggle(idx)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── CTA bas de page ── */}
        <div
          ref={ctaRef}
          className={`mt-12 transition-all duration-700 delay-100 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="card-glass rounded-2xl px-6 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-0.5">Vous avez une autre question ?</p>
                <p className="text-xs text-white/50">Notre équipe répond sous 24h — et souvent bien avant.</p>
              </div>
            </div>
            <Link to="/contact" className="btn-accent shrink-0 flex items-center gap-2">
              Nous contacter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
