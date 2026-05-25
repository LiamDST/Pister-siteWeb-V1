import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';
import {
  MapPin, Zap, Mail, BarChart3, Building2,
  Star, TrendingUp, Clock, CalendarX, DollarSign,
  Info, ChevronDown, Settings, ListChecks, Send, BarChart2,
  ArrowRight, Play
} from 'lucide-react';
import logoMonCourtierEnergie from '../assets/partners/mon-courtier-energie.svg';
import logoPlaceDesEnergies from '../assets/partners/place-des-energies.svg';
import logoMieuxRenover from '../assets/partners/mieux-renover.svg';
import logoFnaim from '../assets/partners/fnaim.svg';
import logoEmera from '../assets/partners/emera.svg';
import logoCalomatech from '../assets/partners/calomatech.svg';
import logoCbre from '../assets/partners/cbre.svg';
import logoFoncia from '../assets/partners/foncia.svg';

const demoVideoUrl = 'https://demo.arcade.software/NadC049RYMZAgOJ6mjFM?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=false';

const partnerLogos = [
  { name: 'Mon courtier energie', image: logoMonCourtierEnergie },
  { name: 'Place des Energies', image: logoPlaceDesEnergies },
  { name: 'Mieux Renover', image: logoMieuxRenover },
  { name: 'FNAIM', image: logoFnaim },
  { name: 'Emera', image: logoEmera },
  { name: 'Calomatech', image: logoCalomatech },
  { name: 'CBRE', image: logoCbre },
  { name: 'Foncia', image: logoFoncia },
];

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

function Stars() {
  return (
    <div className="flex gap-1">
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
    </div>
  );
}

function useCountUp(target, duration = 1200, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started || target === 0) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

function StatCard({ icon, numericValue, prefix, suffix, label, trend, trendUp, context, barPct, delay }) {
  const { ref, visible } = useFadeInOnScroll();
  const count = useCountUp(numericValue, 1400, visible);
  const [showTip, setShowTip] = useState(false);
  const display = prefix + count + suffix;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="group relative card-glass p-6 min-h-[260px] h-full flex flex-col gap-4 hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            {icon}
          </div>
          <button
            type="button"
            aria-label="Plus d'info"
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
            onFocus={() => setShowTip(true)}
            onBlur={() => setShowTip(false)}
            className="text-white/20 hover:text-white/60 transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
          {showTip && (
            <div className="absolute right-4 top-12 z-20 w-52 bg-navy-950 border border-white/10 rounded-xl p-3 text-xs text-white/70 shadow-xl leading-relaxed">
              {context}
            </div>
          )}
        </div>
        <div>
          <p className="text-4xl font-black text-emerald-400 tabular-nums leading-none">{display}</p>
          <p className="text-sm text-white/55 mt-1.5">{label}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-semibold flex items-center gap-0.5 ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
          <span className="text-[11px] text-white/30">vs. méthode traditionnelle</span>
        </div>
        {barPct !== null && (
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${trendUp ? 'bg-emerald-400' : 'bg-red-400'}`}
              style={{ width: visible ? `${barPct}%` : '0%' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function HeroSection() {
  const marqueeLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="relative overflow-hidden section">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="section-inner relative grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            73 leads identifiés aujourd&apos;hui
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            Trouvez les bâtiments{' '}
            <span className="text-emerald-400">qui ont besoin de vous.</span>
          </h1>
          <p className="text-base text-white/60 max-w-md leading-relaxed">
            Pisteur analyse 1,2 million de bâtiments et vous livre chaque matin les
            cibles prioritaires avec DPE, décideur nominatif, coordonnées et potentiel chiffré.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">Essai gratuit — sans CB</Link>
            <Link to="/demo" className="btn-outline">Voir la démo</Link>
          </div>
          <div className="flex gap-6 pt-2">
            {[['1,2M+', 'bâtiments analysés'], ['100+', 'clients actifs'], ['73', 'leads / jour']].map(([v, l]) => (
              <div key={l}>
                <p className="text-xl font-bold text-white">{v}</p>
                <p className="text-xs text-white/50">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glass p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Vos filtres actifs</p>
            <span className="text-xs text-emerald-400 font-medium">12 leads trouvés</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Type', 'Résidentiel collectif'],
              ['DPE', 'E / F / G'],
              ['Surface', '> 2 000 m²'],
              ['Code NAF', '68.32A'],
            ].map(([k, v]) => (
              <div key={k} className="bg-navy-950/60 rounded-xl p-3 border border-white/5">
                <p className="text-xs text-white/40 mb-1">{k}</p>
                <p className="text-sm font-medium text-white">{v}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-3 space-y-2">
            {['Résidence Les Acacias — Paris 15e', 'Copropriété Verdun — Lyon 3e', 'Imm. Les Platanes — Nantes'].map(lead => (
              <div key={lead} className="flex items-center gap-2 text-sm text-white/70">
                <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {lead}
              </div>
            ))}
          </div>
          <Link to="/simulation" className="btn-accent w-full text-center text-xs">
            Simuler mon marché
          </Link>
        </div>
      </div>

      <div className="section-inner relative mt-10 md:mt-14">
        <FadeSection>
          <div className="text-center mb-5 md:mb-6">
            <p className="text-emerald-400 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] mb-2">
              Démonstration produit
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold text-white/90 max-w-2xl mx-auto">
              En 2 minutes, voyez comment Pisteur trouve vos bâtiments cibles
            </h2>
          </div>
        </FadeSection>
        <FadeSection delay={80}>
          <div className="w-full max-w-4xl mx-auto card-glass overflow-hidden border-white/10 shadow-2xl shadow-black/20">
            <div className="aspect-video bg-navy-950/80">
              <iframe
                src={demoVideoUrl}
                title="Démo de l'utilisation de Pisteur"
                className="w-full h-full"
                allow="clipboard-write; fullscreen"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

const features = [
  {
    icon: <MapPin className="w-5 h-5" />,
    title: 'Ciblage géographique précis',
    desc: 'Filtrez par commune, département, secteur ou rayon GPS. Pisteur connaît chaque bâtiment en France.',
    bullets: ['Régions, départements, communes, codes postaux', 'Rayon GPS autour d’un point exact', 'Compatible ICP mono-zone ou multi-zones'],
    step: 'Utilisé à l\'étape 01',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    badge: 'Populaire',
    title: 'Leads livrés chaque matin',
    desc: 'Recevez une liste priorisée avec DPE, surface, énergie, gestionnaire et décideur nominatif.',
    bullets: ['Classement par score de potentiel', 'Données prêtes à exploiter au quotidien', 'Export immédiat vers votre stack commerciale'],
    step: 'Utilisé à l\'étape 02',
  },
  {
    icon: <Mail className="w-5 h-5" />,
    badge: 'Nouveau',
    title: 'Emails personnalisés',
    desc: 'Un email rédigé automatiquement, contextualisé avec le bâtiment exact et son profil énergétique.',
    bullets: ['Mention du DPE et du bâtiment ciblé', 'Angle de valeur adapté à votre offre', 'Modification manuelle possible avant envoi'],
    step: 'Utilisé à l\'étape 03',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Tableau de bord analytique',
    desc: 'Suivez vos taux d\'ouverture, relances, conversions et potentiel de CA sur vos segments cibles.',
    bullets: [
      'Pipeline visuel : envoyé → ouvert → répondu → RDV',
      'Comparaison entre segments et territoires',
      'Vision claire des résultats et du ROI',
    ],
    step: 'Utilisé à l\'étape 04',
  },
];

const steps = [
  {
    time: '5 min',
    title: 'Configurez votre ICP',
    desc: 'Type de bâtiment, DPE, énergie, surface, NAF, géographie — en 5 minutes.',
    detail: 'Définissez votre client idéal une seule fois. Pisteur mémorise vos filtres et les applique automatiquement chaque jour sur l\'ensemble des 1,2 million de bâtiments français.',
    icon: <Settings className="w-5 h-5" />,
  },
  {
    time: 'Chaque matin',
    title: 'Recevez vos leads qualifiés',
    desc: 'Chaque matin, une liste priorisée avec coordonnées et contexte décisionnel.',
    detail: 'À 8h chaque matin, votre liste est prête. Chaque lead inclut le DPE, la surface, le gestionnaire nominatif, ses coordonnées et un score de priorité calculé automatiquement.',
    icon: <ListChecks className="w-5 h-5" />,
  },
  {
    time: '1 clic',
    title: 'Contactez avec un email personnalisé',
    desc: 'L\'IA génère un email contextualisé pour chaque bâtiment en un clic.',
    detail: 'L\'IA rédige un email personnalisé mentionnant le DPE exact du bâtiment, sa surface et son potentiel d\'économie. Chaque prospect a l\'impression que vous connaissez déjà son immeuble.',
    icon: <Send className="w-5 h-5" />,
  },
  {
    time: 'Temps réel',
    title: 'Suivez vos conversions',
    desc: 'Tableau de bord pour suivre les relances, RDV, conversions et CA généré.',
    detail: 'Visualisez en temps réel votre pipeline : emails envoyés, ouverts, répondus, RDV pris. Estimez le CA potentiel par segment et optimisez vos critères de ciblage.',
    icon: <BarChart2 className="w-5 h-5" />,
    cta: { label: 'Voir la démo du dashboard', to: '/demo' },
    featureTag: 'Analyse',
  },
];

const stats = [
  {
    icon: <TrendingUp className="w-5 h-5" />,
    numericValue: 40,
    prefix: '+',
    suffix: '%',
    label: 'de conversion en RDV',
    trend: '+40%',
    trendUp: true,
    context: 'Basé sur 120 clients Pisteur sur 6 mois. Taux de conversion moyen de 6 % en prospection traditionnelle, 8,4 % avec Pisteur.',
    barPct: 84,
  },
  {
    icon: <Clock className="w-5 h-5" />,
    numericValue: 60,
    prefix: '−',
    suffix: '%',
    label: 'de temps de prospection',
    trend: '−60%',
    trendUp: true,
    context: 'Mesuré sur 3 équipes commerciales. Passage de 4h/jour de qualification manuelle à moins de 1h30 avec Pisteur.',
    barPct: 60,
  },
  {
    icon: <CalendarX className="w-5 h-5" />,
    numericValue: 67,
    prefix: '',
    suffix: '%',
    label: 'des RDV inutiles évités',
    trend: '2/3 des RDV',
    trendUp: true,
    context: 'Ratio calculé sur les RDV à faible potentiel éliminés grâce au scoring DPE + surface + NAF de Pisteur.',
    barPct: 67,
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    numericValue: 3,
    prefix: '×',
    suffix: '',
    label: 'de CA sur le marché bâtiment',
    trend: '×3 de CA',
    trendUp: true,
    context: 'Comparatif sur 6 mois entre une équipe utilisant Pisteur et une équipe en prospection classique dans le secteur rénovation énergétique.',
    barPct: 75,
  },
];

const testimonials = [
  { name: 'Marc Dupont', role: 'Directeur commercial, IsolPro', quote: "Pisteur nous a permis d'identifier 3× plus de cibles qualifiées en moins d'une semaine. Le ROI a été immédiat." },
  { name: 'Sophie Martin', role: 'Gérante, EnergétiK Conseil', quote: 'Je reçois chaque matin une liste exploitable. Fini les fichiers Excel, fini les heures perdues à qualifier.' },
  { name: 'Thomas Bernard', role: 'Responsable BDD, RénoPlus', quote: "L'email personnalisé est bluffant : chaque prospect a l'impression qu'on connaît son bâtiment. Taux d'ouverture ×2." },
  { name: 'Élise Fontaine', role: 'Dirigeante, IsoTherm Services', quote: "Avant Pisteur, on prospectait à l'aveugle. Maintenant on arrive au RDV en connaissant déjà le DPE et la surface. C'est un game-changer." },
  { name: 'Nicolas Aubert', role: 'Commercial terrain, RénoBat', quote: "En 3 semaines j'ai signé 4 nouveaux chantiers grâce aux leads Pisteur. Le filtre par code NAF est particulièrement utile." },
  { name: 'Camille Renard', role: 'Responsable dev. commercial, VertiConso', quote: 'La personnalisation des emails fait toute la différence. Mes prospects me répondent en me demandant comment je connais leur immeuble !' },
];

export default function Home() {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let frame;
    const step = () => {
      if (!el) return;
      el.scrollLeft += 0.5;
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <HeroSection />
      <section className="section pt-0">
        <div className="section-inner">
          <FadeSection className="text-center mb-10">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">Fonctionnalités</p>
            <h2 className="text-3xl font-bold">Tout ce dont vous avez besoin</h2>
          </FadeSection>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <FadeSection key={f.title} delay={i * 80}>
                <div className="card-glass p-6 rounded-3xl h-full hover:-translate-y-1 hover:border-white/15 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                      {f.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      {f.badge && (
                        <span className={`text-[10px] px-2 py-1 rounded-full font-semibold uppercase tracking-wide ${
                          f.badge === 'Nouveau'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
                            : 'bg-white/5 text-white/55 border border-white/10'
                        }`}>
                          {f.badge}
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-white/35 border border-white/8 uppercase tracking-wide">
                        {f.step}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-4">{f.desc}</p>
                  <ul className="space-y-2 text-sm text-white/65">
                    {f.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
