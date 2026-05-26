import { Link } from 'react-router-dom';
import { Play, ChevronRight, Building2, MapPin, Zap, Mail } from 'lucide-react';
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

const demoLeads = [
  { name: 'Résidence Les Acacias', address: 'Paris 15e', dpe: 'F', surface: '3 200 m²', contact: 'Gilles Martin — Gestionnaire', score: 94 },
  { name: 'Copropriété Verdun', address: 'Lyon 3e', dpe: 'E', surface: '1 800 m²', contact: 'Claire Bonnet — Syndic', score: 87 },
  { name: 'Imm. Les Platanes', address: 'Nantes', dpe: 'G', surface: '2 100 m²', contact: 'Henri Leclerc — Directeur', score: 91 },
];

const dpeColors = { F: 'bg-orange-500/20 text-orange-300', E: 'bg-amber-500/20 text-amber-300', G: 'bg-red-500/20 text-red-300' };

export default function Demo() {
  return (
    <section className="section">
      <div className="section-inner space-y-12">
        <FadeSection className="text-center">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">Démo interactive</p>
          <h1 className="text-4xl font-bold mb-3">Voici à quoi ressemble Pisteur</h1>
          <p className="text-white/60 text-sm max-w-lg mx-auto">
            Un exemple réel de leads générés avec les filtres d&apos;une PME de rénovation énergétique.
          </p>
        </FadeSection>

        {/* Filtres actifs */}
        <FadeSection>
          <div className="card-glass p-5">
            <p className="text-sm font-semibold mb-3 text-white/80">Filtres actifs</p>
            <div className="flex flex-wrap gap-2">
              {['Résidentiel collectif', 'DPE E/F/G', 'Surface > 1500 m²', 'Île-de-France + Rhône + Loire-Atlantique', 'Code NAF 68.32A'].map(f => (
                <span key={f} className="text-xs px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">{f}</span>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* Leads mockup */}
        <div className="space-y-4">
          {demoLeads.map((lead, i) => (
            <FadeSection key={lead.name} delay={i * 80}>
              <div className="card-glass p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-white/20 transition-colors">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <p className="font-semibold">{lead.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${dpeColors[lead.dpe]}`}>DPE {lead.dpe}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-white/50">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{lead.address}</span>
                    <span>{lead.surface}</span>
                    <span>{lead.contact}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-xl font-black text-blue-400">{lead.score}</p>
                    <p className="text-xs text-white/40">Score</p>
                  </div>
                  <button className="btn-outline text-xs px-3 py-2 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" /> Email IA
                  </button>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>

        <FadeSection className="text-center">
          <p className="text-white/60 text-sm mb-4">Ces leads sont issus de données réelles. Votre liste sera personnalisée sur votre ICP.</p>
          <div className="flex justify-center gap-3">
            <Link to="/simulation" className="btn-accent">Simuler mon marché</Link>
            <Link to="/contact" className="btn-outline">Parler à l'équipe</Link>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}
