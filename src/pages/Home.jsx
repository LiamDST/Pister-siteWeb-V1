import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';
import {
  MapPin, Zap, Mail, BarChart3, Building2, ChevronRight,
  CheckCircle2, Star
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

/* ── Helper ─────────────────────────────────────────── */
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

/* ── Hero ────────────────────────────────────────────── */
function HeroSection() {
  const marqueeLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="relative overflow-hidden section">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none" />
      {/* Glow */}
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
            cibles prioritaires avec DPE, décideur nominatif, coordonnées et potentiel
            chiffré.
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

        {/* Card mockup */}
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

      {/* Bloc vidéo de démonstration */}
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
                className="h-full w-full"
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </FadeSection>
      </div>

      <div className="relative mt-14 md:mt-20">
        <div className="partners-strip-fullbleed">
          <div className="section-inner-wide py-8 md:py-10">
            <p className="text-center text-[11px] sm:text-xs uppercase tracking-[0.28em] text-white/45 font-semibold mb-6 md:mb-7">
              Ils utilisent Pisteur
            </p>
            <div className="partner-marquee" aria-label="Partenaires Pisteur">
              <div className="partner-marquee-track">
                {marqueeLogos.map((partner, index) => (
                  <div key={`${partner.name}-${index}`} className="partner-chip">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      loading="lazy"
                      className="partner-logo-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Features ────────────────────────────────────────── */
function FeaturesSection() {
  const features = [
    { icon: <MapPin className="w-5 h-5" />, title: 'Ciblage géographique précis', desc: 'Filtrez par commune, département, secteur ou rayon GPS. Pisteur connaît chaque bâtiment en France.' },
    { icon: <Zap className="w-5 h-5" />, title: 'Leads livrés chaque matin', desc: 'Recevez une liste priorisée avec DPE, surface, énergie, gestionnaire et décideur nominatif.' },
    { icon: <Mail className="w-5 h-5" />, title: 'Emails personnalisés auto', desc: 'Un email rédigé automatiquement, contextualisé avec le bâtiment exact et son profil énergétique.' },
    { icon: <BarChart3 className="w-5 h-5" />, title: 'Tableau de bord analytique', desc: 'Suivez vos taux d\'ouverture, relances, conversions et potentiel de CA sur vos segments cibles.' },
  ];

  return (
    <section className="section bg-navy-900/40">
      <div className="section-inner">
        <FadeSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Tout ce dont vous avez besoin</h2>
            <p className="text-white/60 max-w-lg mx-auto text-sm">
              De la donnée brute à la prise de contact, Pisteur automatise toute la chaîne de prospection.
            </p>
          </div>
        </FadeSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <FadeSection key={f.title} delay={i * 80}>
              <div className="card-glass p-5 h-full flex flex-col gap-3 hover:border-white/20 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-sm">{f.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Comment ça marche ────────────────────────────────── */
function HowItWorksSection() {
  const steps = [
    { n: '01', title: 'Configurez votre ICP', desc: 'Type de bâtiment, DPE, énergie, surface, NAF, géographie — en 5 minutes.' },
    { n: '02', title: 'Recevez vos leads qualifiés', desc: 'Chaque matin, une liste priorisée avec coordonnées et contexte décisionnel.' },
    { n: '03', title: 'Contactez avec un email personnalisé', desc: 'L\'IA génère un email contextualisé pour chaque bâtiment en un clic.' },
    { n: '04', title: 'Suivez vos conversions', desc: 'Dashboard pour tracker les relances, RDV, conversions et CA généré.' },
  ];

  return (
    <section className="section">
      <div className="section-inner">
        <FadeSection>
          <h2 className="text-3xl font-bold mb-3">Comment ça marche</h2>
          <p className="text-white/60 text-sm max-w-xl mb-10">
            En 4 étapes, Pisteur transforme la donnée bâtiment en chiffre d&apos;affaires.
          </p>
        </FadeSection>
        <div className="grid md:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <FadeSection key={s.n} delay={i * 100}>
              <div className="card-glass p-5 h-full flex flex-col gap-3">
                <span className="text-2xl font-black text-emerald-500/30">{s.n}</span>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Stats ───────────────────────────────────────────── */
function StatsSection() {
  const stats = [
    ['+40%', 'de conversion en RDV'],
    ['−60%', 'de temps de prospection'],
    ['2/3', 'des RDV inutiles évités'],
    ['×3', 'de CA sur le marché bâtiment'],
  ];

  return (
    <section className="section bg-emerald-500/5 border-y border-emerald-500/10">
      <div className="section-inner">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(([v, l]) => (
            <FadeSection key={l} className="text-center">
              <p className="text-4xl font-black text-emerald-400">{v}</p>
              <p className="text-sm text-white/60 mt-1">{l}</p>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ────────────────────────────────────── */
function TestimonialsSection() {
  const items = [
    {
      name: 'Marc Dupont',
      role: 'Directeur commercial, IsolPro',
      quote:
        "Pisteur nous a permis d'identifier 3× plus de cibles qualifiées en moins d'une semaine. Le ROI a été immédiat.",
    },
    {
      name: 'Sophie Martin',
      role: 'Gérante, EnergétiK Conseil',
      quote:
        'Je reçois chaque matin une liste exploitable. Fini les fichiers Excel, fini les heures perdues à qualifier.',
    },
    {
      name: 'Thomas Bernard',
      role: 'Responsable BDD, RénoPlus',
      quote:
        "L'email personnalisé est bluffant : chaque prospect a l'impression qu'on connaît son bâtiment. Taux d'ouverture ×2.",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 9000); // vitesse lente : 9s entre chaque avis

    return () => clearInterval(id);
  }, [items.length]);

  return (
    <section className="section bg-navy-900/40">
      <div className="section-inner">
        <FadeSection>
          <h2 className="text-3xl font-bold mb-10 text-center">Ce que disent nos clients</h2>
        </FadeSection>

        {/* Carrousel auto-défilant */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {items.map((t) => (
              <div
                key={t.name}
                className="min-w-full px-1 sm:px-4 flex justify-center"
              >
                <div className="card-glass p-6 flex flex-col gap-4 max-w-md w-full">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, k) => (
                      <Star
                        key={k}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed italic">
                    &quot;{t.quote}&quot;
                  </p>
                  <div className="mt-auto">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text.white/40">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Points de pagination */}
          <div className="mt-5 flex justify-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors border border-white/15 ${
                  index === i ? 'bg-emerald-400' : 'bg-white/10'
                }`}
                aria-label={`Afficher l'avis ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA ─────────────────────────────────────────────── */
function CtaSection() {
  return (
    <section className="section">
      <div className="section-inner">
        <FadeSection>
          <div className="card-glass bg-gradient-to-br from-emerald-500/10 to-blue-500/5 p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Prêt à voir vos cibles réelles ?</h2>
              <p className="text-white/60 text-sm max-w-md">
                Configurez Pisteur sur votre ICP, simulez votre marché et recevez un aperçu de vos leads dès aujourd&apos;hui.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link to="/simulation" className="btn-accent">Simuler mon marché</Link>
              <Link to="/contact" className="btn-outline">Contacter l'équipe</Link>
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
