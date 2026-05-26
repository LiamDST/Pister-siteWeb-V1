import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';

function FadeSection({ children, delay = 0, className = '' }) {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

/* ─── Données FAQ ─────────────────────────────────────── */
const categories = [
  { id: 'all',      label: 'Toutes' },
  { id: 'data',     label: 'Données' },
  { id: 'product',  label: 'Produit' },
  { id: 'billing',  label: 'Facturation' },
  { id: 'security', label: 'Sécurité' },
];

const faqData = [
  {
    id: 1,
    cat: 'data',
    q: 'Pisteur utilise quelles sources de données ?',
    a: 'Pisteur croise trois sources publiques officielle : la base BDNB (Base de Données Nationale des Bâtiments), les DPE publiés par l’ADEME, et le registre SIRENE pour les entreprises. Toutes les données sont mises à jour chaque mois.',
    isNew: false,
  },
  {
    id: 2,
    cat: 'product',
    q: 'Combien de temps faut-il pour recevoir ses premiers leads ?',
    a: 'Après création de votre compte et paramétrage de votre ICP (environ 5 minutes), votre première liste de leads qualifiés est disponible immédiatement. Vous pouvez l’exporter en CSV ou la consulter directement dans le dashboard.',
    isNew: false,
  },
  {
    id: 3,
    cat: 'product',
    q: 'Peut-on intégrer Pisteur à un CRM ?',
    a: "L'intégration CRM native (HubSpot, Pipedrive, Salesforce) est disponible sur le plan Growth. Sur les autres plans, vous pouvez utiliser l'export CSV ou notre API REST pour connecter votre CRM via Zapier ou Make.",
    isNew: false,
  },
  {
    id: 4,
    cat: 'product',
    q: 'Comment fonctionne l’email personnalisé IA ?',
    a: "Notre moteur IA génère un email d'approche unique pour chaque prospect, en mentionnant le bâtiment spécifique (DPE, surface, année), l'entreprise cible et un angle de valeur adapté à votre offre. Le taux d'ouverture moyen observé est de 47%, contre 22% pour un email générique.",
    isNew: true,
  },
  {
    id: 5,
    cat: 'billing',
    q: 'Peut-on tester Pisteur sans carte bancaire ?',
    a: "Oui. L'essai gratuit de 14 jours (plan Pro) ne nécessite aucune carte bancaire. Vous renseignez votre moyen de paiement uniquement si vous décidez de continuer après la période d'essai.",
    isNew: false,
  },
  {
    id: 6,
    cat: 'security',
    q: 'Pisteur est-il conforme RGPD ?',
    a: "Oui. Toutes les données utilisées par Pisteur sont issues de sources publiques et open data françaises. Nous ne stockons aucune donnée personnelle des prospects. Notre infrastructure est hébergée en France (OVH, région Paris) et certifiée ISO 27001.",
    isNew: false,
  },
  {
    id: 7,
    cat: 'billing',
    q: 'Peut-on changer de plan à tout moment ?',
    a: "Oui, totalement. Vous pouvez monter ou descendre de plan depuis votre tableau de bord, sans frais ni engagement. Le changement est effectif immédiatement et la facturation est ajustée au prorata.",
    isNew: false,
  },
  {
    id: 8,
    cat: 'billing',
    q: 'Que se passe-t-il si je dépasse mon quota de leads ?',
    a: "Vous pouvez acheter des packs de crédits supplémentaires à la carte depuis votre espace client. Vous êtes notifié par email à 80% d'utilisation de votre quota. Aucun débit automatique sans votre accord.",
    isNew: false,
  },
  {
    id: 9,
    cat: 'data',
    q: 'Les données DPE sont-elles à jour ?',
    a: "Nous synchronisons la base BDNB / ADEME chaque mois. Toutes les données affichées datent de moins de 30 jours. En cas d'incohérence, notre équipe data corrige manuellement sous 48h sur signalement.",
    isNew: false,
  },
  {
    id: 10,
    cat: 'security',
    q: 'Mes données clients sont-elles sécurisées ?',
    a: "Oui. Vos données (compte, historique, exports) sont chiffrées au repos (AES-256) et en transit (TLS 1.3). Nous effectuons des sauvegardes journalières avec rétention 30 jours. Aucun partage avec des tiers.",
    isNew: true,
  },
  {
    id: 11,
    cat: 'product',
    q: 'Combien de filtres puis-je utiliser ?',
    a: "Le plan Starter offre 2 filtres actifs simultanément (ex : région + DPE). Le plan Pro déverrouille les filtres illimités : type de bâtiment, année de construction, surface, score Match, secteur d’activité, taille d’entreprise et plus encore.",
    isNew: false,
  },
  {
    id: 12,
    cat: 'data',
    q: 'Quelle est la couverture géographique ?',
    a: "Pisteur couvre l'ensemble du territoire français métropolitain, soit plus de 52 millions de bâtiments référencés. Les DOM-TOM sont disponibles en version bêta depuis le T1 2025.",
    isNew: false,
  },
];

/* ─── Composant item FAQ ──────────────────────────────── */
function FaqItem({ item }) {
  const [open, setOpen]     = useState(false);
  const [vote, setVote]     = useState(null); // 'up' | 'down' | null

  return (
    <div className={`card-glass rounded-2xl overflow-hidden transition-all duration-300 ${
      open ? 'border-blue-500/25' : 'border-white/8'
    }`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-5 text-left gap-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          {item.isNew && (
            <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-semibold bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" />Nouveau
            </span>
          )}
          <span className={`text-sm font-medium truncate ${open ? 'text-white' : 'text-white/80'}`}>
            {item.q}
          </span>
        </div>
        <div className="shrink-0 text-white/40">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${
        open ? 'max-h-96' : 'max-h-0'
      }`}>
        <div className="px-5 pb-5">
          <p className="text-sm text-white/65 leading-relaxed border-t border-white/6 pt-4">
            {item.a}
          </p>

          {/* Vote utile / pas utile */}
          {vote === null ? (
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs text-white/35">Cette réponse vous a-t-elle aidé ?</span>
              <button
                onClick={() => setVote('up')}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-blue-400 transition-colors px-2.5 py-1 rounded-lg hover:bg-blue-500/10"
              >
                <ThumbsUp className="w-3.5 h-3.5" /> Oui
              </button>
              <button
                onClick={() => setVote('down')}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors px-2.5 py-1 rounded-lg hover:bg-red-500/10"
              >
                <ThumbsDown className="w-3.5 h-3.5" /> Non
              </button>
            </div>
          ) : (
            <p className={`mt-4 text-xs ${
              vote === 'up' ? 'text-blue-400' : 'text-white/40'
            }`}>
              {vote === 'up' ? '✔ Merci pour votre retour !' : 'Merci. Nous améliorerons cette réponse.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Page principale ──────────────────────────────────────── */
export default function Faq() {
  const [activeCat, setActiveCat] = useState('all');
  const [query, setQuery]         = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return faqData.filter(item => {
      const matchCat = activeCat === 'all' || item.cat === activeCat;
      const matchQ   = !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [activeCat, query]);

  return (
    <div className="relative min-h-screen">
      <div className="page-circles" />
      <div className="page-circles-extra" />
      <section className="section relative pt-28">
        <div className="hero-glow opacity-40" />
        <div className="section-inner max-w-5xl relative z-10">

          <FadeSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/25 text-amber-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <Sparkles size={12} /> Questions fréquentes
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-4">
              Tout ce que vous voulez<br />
              <span className="stat-number">savoir sur Pisteur</span>
            </h1>
            <p className="text-white/50 text-sm max-w-md mx-auto">
              Vous ne trouvez pas la réponse ?{' '}
              <Link to="/contact" className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4 transition-colors">
                Posez-la à notre équipe
              </Link>
            </p>
            <div className="flex items-center justify-center gap-6 mt-5 text-xs text-white/30">
              <span>{faqData.length} questions répondues</span>
              <span className="w-px h-3 bg-white/15" />
              <span>Mis à jour en mai 2026</span>
              <span className="w-px h-3 bg-white/15" />
              <span>Support 7j/7</span>
            </div>
          </FadeSection>

          <FadeSection className="mb-5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              <input type="text" placeholder="Rechercher parmi les questions…" value={query} onChange={e => setQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all" />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 text-xl leading-none">×</button>
              )}
            </div>
          </FadeSection>

          <FadeSection className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setActiveCat(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${activeCat === cat.id ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'}`}>
                  {cat.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-md ${activeCat === cat.id ? 'bg-white/20 text-white' : 'bg-white/8 text-white/30'}`}>
                    {cat.id === 'all' ? faqData.length : faqData.filter(f => f.cat === cat.id).length}
                  </span>
                </button>
              ))}
            </div>
          </FadeSection>

          {filtered.length > 0 ? (
            <div className="grid lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-3 space-y-3">
                {filtered.map((item, i) => (
                  <FadeSection key={item.id} delay={i * 40}><FaqItem item={item} /></FadeSection>
                ))}
              </div>
              <div className="lg:col-span-2 space-y-5 lg:sticky lg:top-24">
                <FadeSection delay={100}>
                  <div className="card-glass p-6">
                    <h3 className="font-bold text-sm mb-4">Raccourcis par thème</h3>
                    <div className="space-y-2">
                      {categories.filter(c => c.id !== 'all').map(cat => (
                        <button key={cat.id} onClick={() => setActiveCat(cat.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${activeCat === cat.id ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'hover:bg-white/5 text-white/50'}`}>
                          {cat.label}
                          <span className="text-white/30 text-[10px]">{faqData.filter(f => f.cat === cat.id).length} questions</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </FadeSection>
                <FadeSection delay={150}>
                  <div className="card-glass p-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center mb-4">
                      <Sparkles size={18} className="text-blue-400" />
                    </div>
                    <h3 className="font-bold text-sm mb-2">Question non trouvée ?</h3>
                    <p className="text-xs text-white/45 mb-4">Notre équipe répond en moins de 2h en jours ouvrés.</p>
                    <Link to="/contact" className="btn-accent text-xs w-full text-center block py-2.5">Contacter l'équipe</Link>
                  </div>
                </FadeSection>
                <FadeSection delay={200}>
                  <div className="card-glass p-6">
                    <h3 className="font-bold text-sm mb-3">Nouveautes</h3>
                    <div className="space-y-2.5">
                      {faqData.filter(f => f.isNew).map(item => (
                        <div key={item.id} className="flex items-start gap-2">
                          <span className="text-[10px] bg-blue-500/15 text-blue-400 border border-blue-500/25 px-1.5 py-0.5 rounded-full shrink-0 mt-0.5">Nouveau</span>
                          <p className="text-xs text-white/55 leading-relaxed">{item.q}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeSection>
              </div>
            </div>
          ) : (
            <FadeSection>
              <div className="card-glass text-center py-16">
                <p className="text-4xl mb-4">Search</p>
                <p className="text-white/50 text-sm">Aucun resultat pour cette recherche.</p>
                <button onClick={() => setQuery('')} className="btn-outline text-xs mt-4">Reinitialiser</button>
              </div>
            </FadeSection>
          )}

          <FadeSection className="mt-14">
            <div className="card-glass p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
              <p className="font-black text-xl mb-2">Pret a essayer Pisteur ?</p>
              <p className="text-white/45 text-sm mb-6">14 jours gratuits - Sans carte bancaire - Support inclus</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/tarifs" className="btn-outline text-sm px-6 py-3">Voir les tarifs</Link>
                <Link to="/contact" className="btn-accent text-sm px-6 py-3">Essai gratuit</Link>
              </div>
            </div>
          </FadeSection>

        </div>
      </section>
    </div>
  );
}