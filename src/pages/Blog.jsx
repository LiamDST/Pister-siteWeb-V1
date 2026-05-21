import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';

const posts = [
  { slug: '1', tag: 'Guides', date: '15 mai 2026', title: 'Comment identifier vos 50 premières cibles bâtiment en 1h', excerpt: 'Un pas-à-pas pour configurer votre ICP sur Pisteur et recevoir une liste exploitable le lendemain matin.', readTime: '6 min' },
  { slug: '2', tag: 'Data', date: '8 mai 2026', title: 'DPE 2025 : ce que les nouvelles obligations changent pour la prospection', excerpt: 'Les nouvelles obligations DPE créent un marché de 800 000 bâtiments prioritaires. Comment les identifier ?', readTime: '8 min' },
  { slug: '3', tag: 'Stratégie', date: '2 mai 2026', title: 'Prospection bâtiment : pourquoi les fichiers Excel sont une impasse', excerpt: 'Comparatif entre la prospection manuelle et une approche data-driven sur 6 mois avec 3 PME de rénovation.', readTime: '10 min' },
];

const tagColors = { Guides: 'text-blue-300 bg-blue-500/10 border-blue-500/20', Data: 'text-purple-300 bg-purple-500/10 border-purple-500/20', Stratégie: 'text-amber-300 bg-amber-500/10 border-amber-500/20' };

function FadeSection({ children, delay = 0 }) {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {children}
    </div>
  );
}

export default function Blog() {
  return (
    <section className="section">
      <div className="section-inner">
        <FadeSection>
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">Blog</p>
          <h1 className="text-4xl font-bold mb-3">Ressources & insights</h1>
          <p className="text-white/60 text-sm mb-10">Stratégies, données et guides pour la prospection bâtiment.</p>
        </FadeSection>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <FadeSection key={p.slug} delay={i * 80}>
              <div className="card-glass p-5 h-full flex flex-col gap-3 hover:border-white/20 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${tagColors[p.tag]}`}>{p.tag}</span>
                  <span className="text-xs text-white/30">{p.readTime} de lecture</span>
                </div>
                <h2 className="font-semibold leading-snug">{p.title}</h2>
                <p className="text-sm text-white/50 leading-relaxed flex-1">{p.excerpt}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-white/30">{p.date}</span>
                  <span className="text-xs text-emerald-400 hover:underline cursor-pointer">Lire →</span>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}
