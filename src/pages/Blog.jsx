import { useState, useMemo } from 'react';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';
import { BookOpen, BarChart2, Lightbulb, Search, ArrowRight, Mail, SlidersHorizontal } from 'lucide-react';

/* ── Données ─────────────────────────────────────────────── */
const posts = [
  {
    slug: '1',
    tag: 'Guides',
    date: '15 mai 2026',
    dateTs: 20260515,
    views: 1240,
    title: 'Comment identifier vos 50 premières cibles bâtiment en 1h',
    excerpt: 'Un pas-à-pas pour configurer votre ICP sur Pisteur et recevoir une liste exploitable le lendemain matin.',
    readTime: '6 min',
    cover: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    slug: '2',
    tag: 'Data',
    date: '8 mai 2026',
    dateTs: 20260508,
    views: 980,
    title: 'DPE 2025 : ce que les nouvelles obligations changent pour la prospection',
    excerpt: 'Les nouvelles obligations DPE créent un marché de 800 000 bâtiments prioritaires. Comment les identifier ?',
    readTime: '8 min',
    cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    slug: '3',
    tag: 'Stratégie',
    date: '2 mai 2026',
    dateTs: 20260502,
    views: 2100,
    title: 'Prospection bâtiment : pourquoi les fichiers Excel sont une impasse',
    excerpt: 'Comparatif entre la prospection manuelle et une approche data-driven sur 6 mois avec 3 PME de rénovation.',
    readTime: '10 min',
    cover: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
  },
];

const TAGS = ['Tous', 'Guides', 'Data', 'Stratégie'];

const tagConfig = {
  Guides:    { color: 'bg-blue-500 text-white',   icon: <BookOpen   className="w-3 h-3" /> },
  Data:      { color: 'bg-purple-500 text-white', icon: <BarChart2  className="w-3 h-3" /> },
  Stratégie: { color: 'bg-amber-500 text-white',  icon: <Lightbulb className="w-3 h-3" /> },
};

const filterBtnBase = 'px-3 py-1.5 rounded-full text-xs font-semibold transition-all border';
const filterBtnActive = 'bg-emerald-500 text-white border-emerald-500';
const filterBtnIdle = 'text-white/50 border-white/10 hover:border-white/25 hover:text-white/80';

function FadeSection({ children, delay = 0 }) {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {children}
    </div>
  );
}

function TagBadge({ tag }) {
  const cfg = tagConfig[tag];
  if (!cfg) return null;
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${cfg.color}`}>
      {cfg.icon}{tag}
    </span>
  );
}

/* ── Carte normale ────────────────────────────────────────── */
function PostCard({ p, delay = 0 }) {
  return (
    <FadeSection delay={delay}>
      <div className="group card-glass h-full flex flex-col overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        {/* Image cover */}
        <div className="h-40 overflow-hidden bg-navy-900">
          <img
            src={p.cover}
            alt={p.title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
            loading="lazy"
          />
        </div>
        {/* Contenu */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div className="flex items-center justify-between">
            <TagBadge tag={p.tag} />
            <span className="text-xs text-white/30">{p.readTime} de lecture</span>
          </div>
          <h2 className="font-semibold leading-snug text-sm">{p.title}</h2>
          <p className="text-xs text-white/50 leading-relaxed flex-1">{p.excerpt}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-white/30">{p.date}</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Lire <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </FadeSection>
  );
}

/* ── Hero card (1er article) ────────────────────────────── */
function HeroCard({ p }) {
  return (
    <FadeSection>
      <div className="group card-glass overflow-hidden flex flex-col md:flex-row hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer mb-8">
        {/* Image */}
        <div className="md:w-1/2 h-56 md:h-auto overflow-hidden bg-navy-900 shrink-0">
          <img
            src={p.cover}
            alt={p.title}
            className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
            loading="eager"
          />
        </div>
        {/* Contenu */}
        <div className="p-7 flex flex-col gap-4 flex-1 justify-center">
          <div className="flex items-center gap-3">
            <TagBadge tag={p.tag} />
            <span className="text-xs text-white/30">{p.readTime} de lecture</span>
          </div>
          <h2 className="text-xl font-bold leading-snug">{p.title}</h2>
          <p className="text-sm text-white/55 leading-relaxed">{p.excerpt}</p>
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
            <span className="text-xs text-white/30">{p.date}</span>
            <span className="text-sm text-emerald-400 font-semibold flex items-center gap-1.5 group-hover:gap-3 transition-all">
              Lire l’article <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </FadeSection>
  );
}

/* ── Page principale ─────────────────────────────────────── */
export default function Blog() {
  const [activeTag, setActiveTag] = useState('Tous');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');
  const [email, setEmail] = useState('');
  const [nlStatus, setNlStatus] = useState('idle'); // idle | ok

  const filtered = useMemo(() => {
    let list = [...posts];
    if (activeTag !== 'Tous') list = list.filter(p => p.tag === activeTag);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
      );
    }
    if (sort === 'recent') list.sort((a, b) => b.dateTs - a.dateTs);
    else list.sort((a, b) => b.views - a.views);
    return list;
  }, [activeTag, search, sort]);

  const [hero, ...rest] = filtered;

  return (
    <section className="section">
      <div className="section-inner">

        {/* En-tête */}
        <FadeSection>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">Blog</p>
              <h1 className="text-4xl font-bold mb-1">Ressources & insights</h1>
              <p className="text-white/50 text-sm">Stratégies, données et guides pour la prospection bâtiment.</p>
            </div>
            {/* Tri + compteur */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/30">{filtered.length} article{filtered.length > 1 ? 's' : ''}</span>
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1">
                <SlidersHorizontal className="w-3 h-3 text-white/30" />
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="bg-transparent text-xs text-white/60 outline-none cursor-pointer"
                >
                  <option value="recent">Plus récent</option>
                  <option value="popular">Plus lu</option>
                </select>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* Recherche + filtres */}
        <FadeSection delay={80}>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {/* Barre de recherche */}
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <input
                type="search"
                placeholder="Rechercher un article…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="form-input pl-8 text-xs py-2"
              />
            </div>
            {/* Pills catégories */}
            <div className="flex items-center gap-2 flex-wrap">
              {TAGS.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t)}
                  className={`${filterBtnBase} ${activeTag === t ? filterBtnActive : filterBtnIdle}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* Articles */}
        {filtered.length === 0 ? (
          <FadeSection>
            <div className="text-center py-20 text-white/30">
              <Search className="w-10 h-10 mx-auto mb-4 opacity-30" />
              <p className="text-sm">Aucun article ne correspond à votre recherche.</p>
            </div>
          </FadeSection>
        ) : (
          <>
            {/* Hero card */}
            {hero && <HeroCard p={hero} />}

            {/* Grille 2 colonnes */}
            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {rest.map((p, i) => (
                  <PostCard key={p.slug} p={p} delay={i * 80} />
                ))}
              </div>
            )}
          </>
        )}

        {/* — Newsletter — */}
        <FadeSection delay={100}>
          <div className="card-glass mt-14 p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold mb-1">Recevoir les nouveaux articles</h3>
              <p className="text-xs text-white/50">Une ressource par semaine, directement dans votre boîte mail. Sans spam.</p>
            </div>
            {nlStatus === 'ok' ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                ✓ Inscription confirmée !
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); if (email) setNlStatus('ok'); }}
                className="flex gap-2 w-full md:w-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="jean@entreprise.fr"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-input text-xs flex-1 md:w-56 py-2"
                />
                <button type="submit" className="btn-accent text-xs px-4 py-2 whitespace-nowrap">
                  S’abonner
                </button>
              </form>
            )}
          </div>
        </FadeSection>

      </div>
    </section>
  );
}
