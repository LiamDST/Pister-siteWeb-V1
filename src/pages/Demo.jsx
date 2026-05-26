import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Zap, Mail, CheckCircle2, ArrowRight, BarChart3, Users, TrendingUp, Filter, ChevronRight, Sparkles, Eye, Download } from 'lucide-react';
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

const allLeads = [
  { name: 'Résidence Les Acacias', address: 'Paris 15e', dpe: 'F', surface: '3 200 m²', contact: 'Gilles Martin', role: 'Gestionnaire', year: 1978, score: 94, email: false },
  { name: 'Copropriété Verdun', address: 'Lyon 3e', dpe: 'E', surface: '1 800 m²', contact: 'Claire Bonnet', role: 'Syndic', year: 1983, score: 87, email: false },
  { name: 'Imm. Les Platanes', address: 'Nantes Centre', dpe: 'G', surface: '2 100 m²', contact: 'Henri Leclerc', role: 'Directeur', year: 1971, score: 91, email: false },
  { name: 'Tour Horizon', address: 'Toulouse', dpe: 'F', surface: '4 500 m²', contact: 'Marie Dupont', role: 'Propriétaire', year: 1969, score: 96, email: false },
  { name: 'Résidence du Parc', address: 'Bordeaux', dpe: 'E', surface: '2 800 m²', contact: 'Jean-Paul Moreau', role: 'Syndic', year: 1985, score: 82, email: false },
];

const dpeConfig = {
  G: { bg: 'bg-red-500/20', text: 'text-red-300', border: 'border-red-500/30', label: 'Énergivore critique' },
  F: { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-500/30', label: 'Énergivore fort' },
  E: { bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/30', label: 'Énergivore moyen' },
  D: { bg: 'bg-yellow-500/20', text: 'text-yellow-300', border: 'border-yellow-500/30', label: 'Modéré' },
};

const dpeFilters = ['Tous', 'G', 'F', 'E'];

const fakeEmail = (lead) => `Bonjour ${lead.contact},

Je me permets de vous contacter au sujet de votre bâtiment "${lead.name}" (${lead.address}), actuellement classé DPE ${lead.dpe}.

Dans le cadre des nouvelles obligations réglementaires 2025, cette classification implique des contraintes importantes sur la mise en location ou la cession. Chez [Votre entreprise], nous accompagnons les gestionnaires comme vous dans la mise aux normes énergétiques, avec des solutions adaptées aux copropriétés de ${lead.surface}.

Seriez-vous disponible pour un échange de 20 minutes cette semaine ?

Cordialement`;

function ScoreRing({ score }) {
  const circumference = 2 * Math.PI * 20;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 90 ? '#10b981' : score >= 75 ? '#3b82f6' : '#f59e0b';
  return (
    <div className="relative w-14 h-14 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
        <circle cx="24" cy="24" r="20" fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-black" style={{ color }}>{score}</span>
      </div>
    </div>
  );
}

export default function Demo() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [leads, setLeads] = useState(allLeads);
  const [emailModal, setEmailModal] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [tab, setTab] = useState('leads'); // leads | pipeline | stats

  useEffect(() => {
    setAnimating(true);
    const t = setTimeout(() => {
      setLeads(activeFilter === 'Tous' ? allLeads : allLeads.filter(l => l.dpe === activeFilter));
      setAnimating(false);
    }, 300);
    return () => clearTimeout(t);
  }, [activeFilter]);

  const handleEmail = (index) => {
    const updated = [...leads];
    updated[index].email = true;
    setLeads(updated);
    setEmailModal(leads[index]);
  };

  return (
    <div className="relative min-h-screen">
      <div className="page-circles" />
      <div className="page-circles-extra" />

      <section className="section relative pt-28">
        <div className="hero-glow opacity-50" />
        <div className="section-inner relative z-10 space-y-10">

          {/* Header */}
          <FadeSection className="text-center">
            <span className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/25 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Démo interactive — données illustratives
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-4">
              Pisteur en action —<br /><span className="stat-number">voyez vos leads en direct</span>
            </h1>
            <p className="text-white/50 max-w-lg mx-auto">
              Explorez une liste de leads générés avec les filtres d'une PME de rénovation énergétique. Testez les filtres, les scores, et générez un email IA.
            </p>
          </FadeSection>

          {/* Barre de navigation de démo */}
          <FadeSection>
            <div className="flex gap-1 p-1 bg-white/5 border border-white/10 rounded-2xl w-fit mx-auto">
              {[
                { id: 'leads', label: 'Leads', icon: Building2 },
                { id: 'pipeline', label: 'Pipeline', icon: BarChart3 },
                { id: 'stats', label: 'Statistiques', icon: TrendingUp },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${tab === id ? 'bg-blue-600 text-white shadow-lg' : 'text-white/50 hover:text-white/80'}`}
                >
                  <Icon size={15} /> {label}
                </button>
              ))}
            </div>
          </FadeSection>

          {/* ── TAB LEADS ── */}
          {tab === 'leads' && (
            <>
              {/* ICP actif */}
              <FadeSection>
                <div className="card-glass p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold flex items-center gap-2"><Filter size={14} className="text-blue-400" /> ICP configuré</p>
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">{leads.length} leads correspondants</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Résidentiel collectif', 'Île-de-France + Rhône + Loire-Atlantique', 'Surface > 1 500 m²', 'Code NAF 68.32A'].map(f => (
                      <span key={f} className="text-xs px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 flex items-center gap-1">
                        <CheckCircle2 size={11} /> {f}
                      </span>
                    ))}
                  </div>

                  {/* Filtre DPE */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/8">
                    <span className="text-xs text-white/40">Filtrer par DPE :</span>
                    {dpeFilters.map(d => (
                      <button
                        key={d}
                        onClick={() => setActiveFilter(d)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all duration-200 ${activeFilter === d ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </FadeSection>

              {/* Liste leads */}
              <div className={`space-y-3 transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
                {leads.map((lead, i) => {
                  const dpe = dpeConfig[lead.dpe] || dpeConfig.E;
                  return (
                    <FadeSection key={lead.name} delay={i * 60}>
                      <div className="card-glass card-glow p-5">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <ScoreRing score={lead.score} />

                          <div className="flex-1 space-y-2 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
                              <p className="font-bold text-sm truncate">{lead.name}</p>
                              <span className={`text-[11px] px-2 py-0.5 rounded-full font-black border ${dpe.bg} ${dpe.text} ${dpe.border}`}>DPE {lead.dpe}</span>
                              <span className="text-[11px] text-white/30 hidden sm:block">{dpe.label}</span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-xs text-white/50">
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{lead.address}</span>
                              <span>{lead.surface}</span>
                              <span>Construit {lead.year}</span>
                              <span className="flex items-center gap-1"><Users className="w-3 h-3" />{lead.contact} · {lead.role}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button className="btn-outline text-xs px-3 py-2 flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" /> Détail
                            </button>
                            <button
                              onClick={() => handleEmail(i)}
                              className={`text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 font-semibold transition-all duration-300 ${lead.email ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                            >
                              {lead.email ? <><CheckCircle2 className="w-3.5 h-3.5" /> Généré</> : <><Sparkles className="w-3.5 h-3.5" /> Email IA</>}
                            </button>
                          </div>
                        </div>
                      </div>
                    </FadeSection>
                  );
                })}
              </div>
            </>
          )}

          {/* ── TAB PIPELINE ── */}
          {tab === 'pipeline' && (
            <FadeSection>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { stage: 'À contacter', count: 47, color: 'border-t-blue-500', leads: [
                    { name: 'Résidence Les Acacias', dpe: 'F', score: 94 },
                    { name: 'Tour Horizon', dpe: 'G', score: 96 },
                    { name: 'Copropriété Verdun', dpe: 'E', score: 87 },
                  ]},
                  { stage: 'Contacté', count: 23, color: 'border-t-amber-500', leads: [
                    { name: 'Résidence du Parc', dpe: 'F', score: 82 },
                    { name: 'Imm. Les Acacias', dpe: 'E', score: 79 },
                  ]},
                  { stage: 'RDV planifié', count: 8, color: 'border-t-purple-500', leads: [
                    { name: 'Résidence Estivale', dpe: 'G', score: 91 },
                  ]},
                  { stage: 'Signé 🎉', count: 3, color: 'border-t-emerald-500', leads: [
                    { name: 'Tour de la Paix', dpe: 'F', score: 88 },
                  ]},
                ].map(({ stage, count, color, leads: sl }) => (
                  <div key={stage} className={`card-glass p-4 border-t-2 ${color}`}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-bold">{stage}</p>
                      <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-white/60">{count}</span>
                    </div>
                    <div className="space-y-2">
                      {sl.map(l => (
                        <div key={l.name} className="bg-white/5 rounded-xl p-3 text-xs">
                          <p className="font-semibold text-white/80 truncate">{l.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${dpeConfig[l.dpe]?.bg} ${dpeConfig[l.dpe]?.text}`}>DPE {l.dpe}</span>
                            <span className="text-white/40">Score {l.score}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeSection>
          )}

          {/* ── TAB STATS ── */}
          {tab === 'stats' && (
            <FadeSection>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="card-glass p-6">
                  <h3 className="font-bold mb-5 flex items-center gap-2"><TrendingUp size={16} className="text-blue-400" /> Performance des campagnes</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Emails envoyés', value: 143, max: 200, color: 'bg-blue-500' },
                      { label: 'Taux d\'ouverture', value: 67, max: 100, color: 'bg-amber-500', suffix: '%' },
                      { label: 'Taux de réponse', value: 31, max: 100, color: 'bg-emerald-500', suffix: '%' },
                      { label: 'RDV obtenus', value: 12, max: 50, color: 'bg-purple-500' },
                    ].map(({ label, value, max, color, suffix = '' }) => (
                      <div key={label}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-white/60">{label}</span>
                          <span className="font-bold">{value}{suffix}</span>
                        </div>
                        <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                          <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${(value/max)*100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-glass p-6">
                  <h3 className="font-bold mb-5 flex items-center gap-2"><BarChart3 size={16} className="text-emerald-400" /> Répartition par DPE</h3>
                  <div className="space-y-3">
                    {[
                      { dpe: 'G', count: 234, pct: 82 },
                      { dpe: 'F', count: 412, pct: 100 },
                      { dpe: 'E', count: 387, pct: 94 },
                    ].map(({ dpe, count, pct }) => (
                      <div key={dpe} className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${dpeConfig[dpe]?.bg} ${dpeConfig[dpe]?.text}`}>{dpe}</span>
                        <div className="flex-1">
                          <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-1000 ${dpe === 'G' ? 'bg-red-500' : dpe === 'F' ? 'bg-orange-500' : 'bg-amber-500'}`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                        <span className="text-xs text-white/50 w-12 text-right">{count} leads</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/8 grid grid-cols-3 gap-3">
                    {[
                      { v: '1 033', l: 'leads totaux' },
                      { v: '87', l: 'score moyen' },
                      { v: '2h', l: 'économisées/j' },
                    ].map(({ v, l }) => (
                      <div key={l} className="text-center bg-white/5 rounded-xl p-3">
                        <p className="stat-number text-xl font-black">{v}</p>
                        <p className="text-[10px] text-white/40 mt-0.5">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeSection>
          )}

          {/* CTA */}
          <FadeSection className="text-center">
            <div className="card-glass p-8 max-w-2xl mx-auto">
              <p className="text-white/60 text-sm mb-2">Ces leads sont issus de données illustratives.</p>
              <p className="font-bold mb-6">Votre liste sera 100% personnalisée sur votre ICP.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link to="/simulation" className="btn-accent gap-2">Simuler mon marché <ArrowRight size={16} /></Link>
                <Link to="/contact" className="btn-outline gap-2">Parler à l'équipe</Link>
              </div>
            </div>
          </FadeSection>

        </div>
      </section>

      {/* Modal email IA */}
      {emailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setEmailModal(null)}>
          <div className="card-glass max-w-lg w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-blue-400" />
                <span className="font-bold text-sm">Email IA généré</span>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded-full">✓ Personnalisé</span>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-xs text-white/70 leading-relaxed whitespace-pre-line font-mono mb-4">
              {fakeEmail(emailModal)}
            </div>
            <div className="flex gap-2">
              <button className="btn-accent text-xs gap-1.5 flex-1 justify-center"><Mail size={13} /> Copier l'email</button>
              <button onClick={() => setEmailModal(null)} className="btn-outline text-xs px-4">Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
