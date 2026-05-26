import { useState, useMemo, useRef } from 'react';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';
import { BookOpen, BarChart2, Lightbulb, Search, ArrowRight, Mail, SlidersHorizontal, TrendingUp, Eye, Clock, Flame, Sparkles } from 'lucide-react';

function Card3D({ children, className = '' }) {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateZ(8px)`;
  };
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };
  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className={`transition-all duration-300 ease-out h-full ${className}`}
      style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
}

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
  },  {
    slug: '4',
    tag: 'Guides',
    date: '24 avril 2026',
    dateTs: 20260424,
    views: 870,
    readTime: '7 min',
    title: 'Score Match : comment Pisteur évalue vos leads de 0 à 100',
    excerpt: 'Découvrez les 12 critères derrière notre algorithme de scoring et comment en tirer parti pour prioriser vos actions.',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    slug: '5',
    tag: 'Data',
    date: '18 avril 2026',
    dateTs: 20260418,
    views: 1560,
    readTime: '9 min',
    title: 'BDNB & ADEME : comprendre les données qui alimentent Pisteur',
    excerpt: 'Tour d\'horizon des bases de données publiques derrière Pisteur et ce qu\'elles contiennent vraiment.',
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    slug: '6',
    tag: 'Stratégie',
    date: '10 avril 2026',
    dateTs: 20260410,
    views: 3400,
    readTime: '12 min',
    title: 'Email IA : 5 templates qui convertissent à 47% d\'ouverture',
    excerpt: 'Analyse de nos meilleurs emails de prospection générés par l\'IA avec les taux d\'ouverture et de réponse réels.',
    cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
  },];

const TAGS = ['Tous', 'Guides', 'Data', 'Stratégie'];

const tagConfig = {
  Guides:    { color: 'bg-blue-500 text-white',   icon: <BookOpen   className="w-3 h-3" /> },
  Data:      { color: 'bg-purple-500 text-white', icon: <BarChart2  className="w-3 h-3" /> },
  Stratégie: { color: 'bg-amber-500 text-white',  icon: <Lightbulb className="w-3 h-3" /> },
};

const filterBtnBase = 'px-3 py-1.5 rounded-full text-xs font-semibold transition-all border';
const filterBtnActive = 'bg-blue-500 text-white border-blue-500';
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

/* ── Carte normale 3D ──────────────────────────────────────── */
function PostCard({ p, delay = 0 }) {
  return (
    <FadeSection delay={delay}>
      <Card3D>
        <div className="blog-card-pro card-glass h-full flex flex-col overflow-hidden cursor-pointer group">
          <div className="relative h-48 overflow-hidden shrink-0">
            <img src={p.cover} alt={p.title}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-88 transition-all duration-700 group-hover:scale-105"
              loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3"><TagBadge tag={p.tag} /></div>
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1">
              <Eye className="w-3 h-3 text-white/50" />
              <span className="text-[10px] text-white/50">{p.views.toLocaleString('fr-FR')}</span>
            </div>
            {p.views > 2000 && (
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-amber-500/80 backdrop-blur-sm rounded-full px-2 py-0.5">
                <Flame className="w-2.5 h-2.5 text-white" />
                <span className="text-[10px] text-white font-bold">Populaire</span>
              </div>
            )}
          </div>
          <div className="p-5 flex flex-col gap-3 flex-1">
            <div className="flex items-center gap-2 text-[10px] text-white/35">
              <Clock className="w-3 h-3" /><span>{p.readTime}</span>
              <span className="w-px h-3 bg-white/15" /><span>{p.date}</span>
            </div>
            <h2 className="font-black text-sm leading-snug group-hover:text-blue-300 transition-colors duration-300">{p.title}</h2>
            <p className="text-xs text-white/45 leading-relaxed flex-1">{p.excerpt}</p>
            <div className="flex items-center justify-between pt-3 border-t border-white/8 mt-auto">
              <div className="w-5 h-0.5 bg-blue-500/40 rounded-full group-hover:w-10 transition-all duration-500" />
              <span className="text-xs text-blue-400 font-bold flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
                Lire l’article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
          <div className="h-px w-0 group-hover:w-full transition-all duration-700 mx-auto"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)' }} />
        </div>
      </Card3D>
    </FadeSection>
  );
}

/* ── Hero card 3D ──────────────────────────────────────────── */
function HeroCard({ p }) {
  return (
    <FadeSection>
      <div className="blog-card-pro card-glass overflow-hidden flex flex-col md:flex-row cursor-pointer group mb-8 relative">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
        <div className="relative md:w-[45%] h-64 md:h-auto overflow-hidden shrink-0">
          <img src={p.cover} alt={p.title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105"
            loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 md:block hidden" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 bg-blue-600/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
              <Sparkles className="w-3 h-3" /> Article vedette
            </span>
          </div>
        </div>
        <div className="p-8 flex flex-col gap-5 flex-1 justify-center relative z-10">
          <div className="flex items-center gap-3">
            <TagBadge tag={p.tag} />
            <span className="text-xs text-white/35 flex items-center gap-1"><Clock className="w-3 h-3" /> {p.readTime}</span>
            <span className="text-xs text-white/35">· {p.views.toLocaleString('fr-FR')} lectures</span>
          </div>
          <h2 className="text-2xl font-black leading-snug group-hover:text-blue-300 transition-colors duration-300">{p.title}</h2>
          <p className="text-sm text-white/55 leading-relaxed">{p.excerpt}</p>
          <div className="flex items-center justify-between pt-4 border-t border-white/8">
            <span className="text-xs text-white/30">{p.date}</span>
            <span className="text-sm text-blue-400 font-black flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
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
    <div className="relative min-h-screen">
      <div className="page-circles" />
      <div className="page-circles-extra" />
    <section className="section relative pt-28">
      <div className="hero-glow opacity-40" />
      <div className="section-inner relative z-10">

        {/* En-tête */}
        <FadeSection>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-purple-500/15 border border-purple-500/25 text-purple-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <BookOpen size={12} /> Ressources & insights bâtiment
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-4">
              Le blog de la <span className="stat-number">prospection bâtiment</span>
            </h1>
            <p className="text-white/50 max-w-lg mx-auto">
              Stratégies, données DPE, études de cas et guides pratiques pour générer plus de leads qualifiés.
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-xs text-white/30">
              <span className="flex items-center gap-1.5"><Eye size={12} /> {posts.reduce((a,p) => a + p.views, 0).toLocaleString('fr-FR')} lecteurs</span>
              <span className="w-px h-3 bg-white/15" />
              <span className="flex items-center gap-1.5"><Clock size={12} /> Mis à jour chaque semaine</span>
              <span className="w-px h-3 bg-white/15" />
              <span className="flex items-center gap-1.5"><TrendingUp size={12} /> {posts.length} articles</span>
            </div>
          </div>
        </FadeSection>

        {/* Barre de filtres améliorée */}
        <FadeSection delay={80}>
          <div className="card-glass p-4 mb-8 flex flex-wrap items-center gap-3">
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
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 ml-auto">
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
            <span className="text-xs text-white/30">{filtered.length} article{filtered.length > 1 ? 's' : ''}</span>
          </div>
        </FadeSection>



        {/* Articles */}
        {filtered.length === 0 ? (
          <FadeSection>
            <div className="card-glass text-center py-20 text-white/30">
              <Search className="w-10 h-10 mx-auto mb-4 opacity-30" />
              <p className="text-sm">Aucun article ne correspond à votre recherche.</p>
              <button onClick={() => { setSearch(''); setActiveTag('Tous'); }} className="btn-outline text-xs mt-4">Réinitialiser les filtres</button>
            </div>
          </FadeSection>
        ) : (
          <>
            {/* Hero card */}
            {hero && <HeroCard p={hero} />}

            {/* Grille 3 colonnes */}
            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((p, i) => (
                  <PostCard key={p.slug} p={p} delay={i * 70} />
                ))}
              </div>
            )}
          </>
        )}

        {/* — Newsletter 3D — */}
        <FadeSection delay={100}>
          <div className="relative card-glass mt-14 p-8 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0 float-3d">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-lg mb-1">Restez à la pointe de la prospection</h3>
                <p className="text-sm text-white/50">Un article expert par semaine. Zéro spam.</p>
              </div>
              {nlStatus === 'ok' ? (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-black bg-emerald-500/10 border border-emerald-500/20 px-5 py-3 rounded-xl">
                  ✓ Inscription confirmée !
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); if (email) setNlStatus('ok'); }} className="flex gap-2 w-full md:w-auto">
                  <input type="email" required placeholder="jean@entreprise.fr"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="form-input text-sm flex-1 md:w-60 py-2.5" />
                  <button type="submit" className="btn-accent text-sm px-5 py-2.5 whitespace-nowrap gap-1.5">
                    S’abonner <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </FadeSection>

      </div>
    </section>
    </div>
  );
}
