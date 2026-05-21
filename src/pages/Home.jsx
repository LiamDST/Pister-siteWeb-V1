import { Link } from 'react-router-dom';
import { ArrowRight, Building2, BarChart3, FileText, Users, TrendingUp, Shield, CheckCircle2, Star } from 'lucide-react';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';

// ── données ──────────────────────────────────────────────
const benefits = [
  { icon: Building2, title: 'Analyse automatique', description: 'Renseignez une cible et obtenez instantanément tous les bâtiments correspondants avec leurs décideurs.' },
  { icon: BarChart3, title: 'Signaux d\'intention', description: 'DPE, surface, énergie, ancienneté, code NAF propriétaire — croisés pour scorer chaque opportunité.' },
  { icon: TrendingUp, title: 'Leads qualifiés chaque jour', description: 'Recevez chaque matin une liste priorisée avec le potentiel de chantier estimé.' },
  { icon: FileText, title: 'Email personnalisé auto', description: 'Un email généré par bâtiment, qui cite son contexte énergétique exact.' },
  { icon: Users, title: 'Décideur nominatif', description: 'Nom, poste, email et téléphone du gestionnaire ou propriétaire identifié.' },
  { icon: Shield, title: 'Données certifiées', description: 'Sources ADEME, cadastre, DPE, foncier — recoupées et mises à jour en continu.' },
];

const steps = [
  { step: '01', title: 'Configurez votre marché', description: 'Type de bâtiment, DPE, énergie, surface, géographie, code NAF — en moins de 5 minutes.' },
  { step: '02', title: "L'IA analyse et cible", description: 'Pisteur croise plus de 100 signaux pour prioriser les bâtiments où vous avez la meilleure chance de signer.' },
  { step: '03', title: 'Contactez et convertissez', description: 'Recevez vos leads avec un email pré-rédigé, contextualisé, prêt à envoyer.' },
];

const testimonials = [
  { name: 'Antoine Revel', role: 'Directeur Commercial', company: 'IsolPro', text: "On a trouvé 40 prospects qualifiés la première semaine. Ce n'était pas possible avant Pisteur." },
  { name: 'Claire Fontaine', role: 'Responsable Développement', company: 'ThermaTech', text: "La qualité des leads est incomparable. Chaque fiche a le nom du gestionnaire et le DPE — c'est prêt à appeler." },
  { name: 'Marc Bellamy', role: 'CEO', company: 'RenovBat', text: "On a divisé notre temps de prospection par 4. L'IA fait ce qui prenait à notre équipe 3 semaines." },
];

const stats = [
  { value: '1,2M+', label: 'Bâtiments analysés' },
  { value: '73', label: 'Leads générés aujourd\'hui' },
  { value: '100+', label: 'Clients actifs' },
  { value: '2 min', label: 'Pour configurer vos filtres' },
];

// ── sections ─────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 pointer-events-none" />
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 60% 40%, #2dd87d22 0%, transparent 60%), radial-gradient(circle at 20% 70%, #3370ff18 0%, transparent 50%)' }} />

      <div className="relative max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-7 animate-fade-in">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
            Prospection bâtiment intelligente
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Trouvez chaque jour les bâtiments qui ont vraiment besoin de vous.
          </h1>
          <p className="text-lg text-white/70 max-w-xl">
            Pisteur analyse des millions de bâtiments et vous envoie uniquement ceux où votre expertise a un impact concret — DPE, décideur nominatif, potentiel de chantier estimé.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-white font-semibold text-sm shadow-lg shadow-green-500/30 hover:bg-green-600 transition-all hover:-translate-y-0.5">
              Essai gratuit — sans CB <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/tarifs" className="inline-flex items-center px-5 py-3 rounded-full border border-white/15 text-sm text-white/80 hover:bg-white/5 transition-colors">
              Voir les tarifs
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 pt-2">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-white font-bold text-xl">{s.value}</p>
                <p className="text-xs text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Carte démo */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4 animate-slide-up">
          <p className="text-sm font-semibold text-white/80">Votre cible en quelques filtres</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              ['Type de bâtiment', 'Résidentiel collectif'],
              ['Code NAF', '68.32A'],
              ['DPE', 'E / F / G'],
              ['Surface', '> 2 000 m²'],
            ].map(([label, val]) => (
              <div key={label} className="bg-navy-950/60 rounded-2xl p-3 border border-white/5">
                <p className="text-white/50 mb-1">{label}</p>
                <p className="font-semibold text-white">{val}</p>
              </div>
            ))}
          </div>
          <div className="mt-1 text-xs text-white/50 leading-relaxed">
            Pisteur croise plus de 100 signaux pour ne livrer que les bâtiments où vous avez une vraie chance de signer.
          </div>
          <div className="pt-1">
            <div className="flex items-center gap-2 text-xs text-green-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>73 nouveaux bâtiments identifiés aujourd'hui</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <section ref={ref} className={`section bg-white transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="section-inner">
        <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3">Tout ce dont vous avez besoin pour prospecter mieux</h2>
        <p className="text-navy-600 max-w-2xl mb-10">Pisteur regroupe les données bâtimentaires les plus complètes de France et les transforme en actions commerciales concrètes.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-navy-50 rounded-2xl p-5 border border-navy-100 hover:border-green-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-navy-900 mb-1">{title}</h3>
              <p className="text-sm text-navy-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <section ref={ref} className={`section bg-navy-950 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="section-inner">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Comment ça marche</h2>
        <p className="text-white/70 max-w-2xl mb-10">Pisteur fait le travail de ciblage à votre place et transforme des données bâtiment brutes en actions commerciales prêtes à l'emploi.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.step} className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 font-bold text-sm">{s.step}</div>
              <h3 className="font-semibold text-white">{s.title}</h3>
              <p className="text-sm text-white/60">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <section ref={ref} className={`section bg-white transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="section-inner">
        <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-10">Ce que disent nos clients</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-navy-50 rounded-2xl p-6 border border-navy-100 flex flex-col gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-sm text-navy-700 italic">"{t.text}"</p>
              <div className="mt-auto">
                <p className="font-semibold text-navy-900 text-sm">{t.name}</p>
                <p className="text-xs text-navy-500">{t.role} — {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="section bg-navy-950">
      <div className="section-inner">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Prêt à voir les bâtiments qui vous correspondent ?</h2>
            <p className="text-white/80 max-w-md text-sm">Configurez Pisteur sur votre ICP réel. Essai gratuit, sans carte bancaire.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-green-700 font-bold text-sm hover:bg-gray-100 transition-colors whitespace-nowrap shadow-lg">
            Voir Pisteur sur mes cibles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}