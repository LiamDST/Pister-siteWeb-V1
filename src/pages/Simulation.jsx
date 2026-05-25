import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  Loader2, CheckCircle2, Building2, MapPin,
  TrendingUp, Mail, ArrowRight, ChevronLeft,
  Users, Zap, BarChart3, Ruler
} from 'lucide-react';

/* ─── Data ───────────────────────────────────────────── */
const regions = [
  'Île-de-France', 'Auvergne-Rhône-Alpes', 'Occitanie',
  'Nouvelle-Aquitaine', 'Bretagne', 'Grand Est',
  'Normandie', 'Hauts-de-France', 'Pays de la Loire',
  "Provence-Alpes-Côte d'Azur",
];

const buildingTypes = [
  { value: 'Résidentiel collectif', icon: '🏢' },
  { value: 'Tertiaire', icon: '🏬' },
  { value: 'Logement social', icon: '🏘️' },
  { value: 'Établissement public', icon: '🏛️' },
  { value: 'Commercial', icon: '🛒' },
];

const dpeGrades = [
  { label: 'A', color: 'bg-[#009A44] text-white', border: 'border-[#009A44]' },
  { label: 'B', color: 'bg-[#51B948] text-white', border: 'border-[#51B948]' },
  { label: 'C', color: 'bg-[#AECF45] text-black', border: 'border-[#AECF45]' },
  { label: 'D', color: 'bg-[#F7EC00] text-black', border: 'border-[#F7EC00]' },
  { label: 'E', color: 'bg-[#F0A500] text-black', border: 'border-[#F0A500]' },
  { label: 'F', color: 'bg-[#E8612A] text-white', border: 'border-[#E8612A]' },
  { label: 'G', color: 'bg-[#C9282D] text-white', border: 'border-[#C9282D]' },
];

const fakeleads = [
  { city: 'Paris 15e', type: 'Résidentiel collectif', dpe: 'F', surface: '2 340 m²' },
  { city: 'Lyon 3e', type: 'Résidentiel collectif', dpe: 'E', surface: '1 870 m²' },
  { city: 'Nantes Centre', type: 'Tertiaire', dpe: 'G', surface: '4 100 m²' },
];

/* ─── Compute ─────────────────────────────────────────── */
function computeResult({ region, buildingType, dpeSelected, minSurface }) {
  const base = {
    'Île-de-France': 8400, 'Auvergne-Rhône-Alpes': 4200, 'Occitanie': 3100,
    'Nouvelle-Aquitaine': 2900, 'Bretagne': 1800, 'Grand Est': 2200,
    'Normandie': 1600, 'Hauts-de-France': 2500, 'Pays de la Loire': 2100,
    "Provence-Alpes-Côte d'Azur": 3600,
  }[region] || 3000;
  const typeMult = {
    'Résidentiel collectif': 1, 'Tertiaire': 0.6, 'Logement social': 0.4,
    'Établissement public': 0.3, 'Commercial': 0.5,
  }[buildingType] || 0.8;
  const dpeMult = Math.max(0.1, dpeSelected.length * 0.3);
  const surfMult = Math.max(0.2, 1 - (parseInt(minSurface) || 0) / 10000);
  return Math.round(base * typeMult * dpeMult * surfMult);
}

/* ─── Counter animation ───────────────────────────────── */
function useCountUp(target, duration = 900) {
  const [count, setCount] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const from = prev.current;
    prev.current = target;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(from + (target - from) * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}

/* ─── Steps indicator ─────────────────────────────────── */
function StepsBar({ step }) {
  const steps = ['Localisation', 'Bâtiment & DPE', 'Contact'];
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 ${
              i < step
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : i === step
                  ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-400'
                  : 'bg-white/5 border-white/15 text-white/30'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`text-[10px] whitespace-nowrap ${i === step ? 'text-emerald-400' : 'text-white/30'}`}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-px mb-4 transition-all duration-500 ${i < step ? 'bg-emerald-500/50' : 'bg-white/10'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── ICP Summary — utilise les CSS vars icp-* ────────── */
function ICPSummary({ form, liveCount }) {
  const buildingTypeIcon = buildingTypes.find(t => t.value === form.buildingType)?.icon ?? '🏢';

  return (
    <div className="icp-card">
      {/* Header */}
      <div className="icp-header">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          Récapitulatif de votre ICP
        </span>
      </div>

      {/* Lignes */}
      <div>
        {/* Région */}
        <div className="icp-divider flex items-center gap-3 px-4 py-3">
          <div className="icp-icon">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="icp-label">Région</p>
            <p className="icp-value">{form.region}</p>
          </div>
        </div>

        {/* Type */}
        <div className="icp-divider flex items-center gap-3 px-4 py-3">
          <div className="icp-icon text-base leading-none">
            {buildingTypeIcon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="icp-label">Type de bâtiment</p>
            <p className="icp-value">{form.buildingType}</p>
          </div>
        </div>

        {/* DPE */}
        <div className="icp-divider flex items-center gap-3 px-4 py-3">
          <div className="icp-icon-amber">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="icp-label">DPE ciblés</p>
            <div className="flex items-center gap-1 flex-wrap mt-1">
              {form.dpeSelected.length > 0
                ? form.dpeSelected.map(d => {
                    const grade = dpeGrades.find(g => g.label === d);
                    return (
                      <span
                        key={d}
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[11px] font-black ${grade?.color}`}
                      >
                        {d}
                      </span>
                    );
                  })
                : <span className="text-sm" style={{ color: 'var(--icp-label)' }}>—</span>
              }
            </div>
          </div>
        </div>

        {/* Surface */}
        <div className="icp-divider flex items-center gap-3 px-4 py-3">
          <div className="icp-icon">
            <Ruler className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="icp-label">Surface minimale</p>
            <p className="icp-value">
              {parseInt(form.minSurface) === 0
                ? 'Toutes surfaces'
                : `≥ ${parseInt(form.minSurface).toLocaleString('fr-FR')} m²`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Footer — estimation */}
      <div className="icp-footer">
        <div>
          <p className="icp-label">Estimation</p>
          <p className="text-xl font-black text-emerald-400 tabular-nums leading-tight">
            {liveCount.toLocaleString('fr-FR')}
            <span className="text-sm font-semibold text-emerald-400/70 ml-1">bâtiments</span>
          </p>
        </div>
        <div className="text-right">
          <p className="icp-source">Source BDNB · ADEME</p>
          <p className="icp-source" style={{ opacity: 0.6 }}>Données 2024</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Live Preview Panel ──────────────────────────────── */
function PreviewPanel({ form, liveCount, status, result }) {
  const animated = useCountUp(liveCount);

  if (status === 'loading') {
    return (
      <div className="card-glass p-8 flex flex-col items-center justify-center text-center gap-5 min-h-[420px]">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-emerald-400 animate-spin" />
          <div className="absolute inset-0 rounded-full bg-emerald-400/10 animate-ping" />
        </div>
        <div className="space-y-1">
          <p className="text-white/70 text-sm font-medium">Analyse en cours…</p>
          <p className="text-white/35 text-xs">Scan de 1 200 000 bâtiments français</p>
        </div>
        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-emerald-400 rounded-full animate-[progress_0.8s_ease-out_forwards]" style={{ width: '80%' }} />
        </div>
      </div>
    );
  }

  if (status === 'done' && result !== null) {
    return (
      <div className="card-glass p-8 flex flex-col items-center text-center gap-5 min-h-[420px]">
        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        <div>
          <p className="text-6xl font-black text-emerald-400 tabular-nums">{result.toLocaleString('fr-FR')}</p>
          <p className="text-white/60 text-sm mt-2">bâtiments correspondent à vos critères</p>
        </div>
        <div className="w-full space-y-2">
          {fakeleads.map((l, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2 text-left">
              <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{l.city}</p>
                <p className="text-[11px] text-white/40 truncate">{l.type} · {l.surface}</p>
              </div>
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded shrink-0 ${dpeGrades.find(d => d.label === l.dpe)?.color}`}>{l.dpe}</span>
            </div>
          ))}
          <p className="text-[10px] text-white/25 mt-1">Exemples de leads — données illustratives</p>
        </div>
        <div className="grid grid-cols-3 gap-3 w-full">
          {[['~' + Math.round(result * 0.08), 'RDV/mois estimés'], ['×3', 'plus de CA'], ['8h', 'économisées/sem']].map(([v, l]) => (
            <div key={l} className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">
              <p className="text-lg font-black text-emerald-400">{v}</p>
              <p className="text-[10px] text-white/45 leading-tight mt-0.5">{l}</p>
            </div>
          ))}
        </div>
        <Link to="/contact" className="btn-accent w-full text-center text-sm">
          Obtenir mes premiers leads →
        </Link>
        <p className="text-[10px] text-white/30">Estimation BDNB · ADEME. Sans engagement.</p>
      </div>
    );
  }

  return (
    <div className="card-glass p-8 flex flex-col gap-6 min-h-[420px]">
      <div className="text-center">
        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Bâtiments estimés</p>
        <p className="text-5xl font-black text-emerald-400 tabular-nums transition-all duration-300">
          {animated.toLocaleString('fr-FR')}
        </p>
        <p className="text-xs text-white/30 mt-1">mis à jour en temps réel</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <MapPin className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
          <p className="text-xs font-semibold text-white truncate">{form.region}</p>
          <p className="text-[10px] text-white/35">Région</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <Building2 className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
          <p className="text-xs font-semibold text-white truncate">{form.buildingType}</p>
          <p className="text-[10px] text-white/35">Type</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
          <p className="text-xs font-semibold text-white">{form.dpeSelected.length > 0 ? form.dpeSelected.join(', ') : '—'}</p>
          <p className="text-[10px] text-white/35">DPE ciblés</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <BarChart3 className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
          <p className="text-xs font-semibold text-white">&gt; {parseInt(form.minSurface).toLocaleString('fr-FR')} m²</p>
          <p className="text-[10px] text-white/35">Surface min.</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] text-white/30 uppercase tracking-wider">Exemples de leads</p>
        {fakeleads.map((l, i) => (
          <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2 opacity-60">
            <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{l.city}</p>
              <p className="text-[11px] text-white/40 truncate">{l.type} · {l.surface}</p>
            </div>
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded shrink-0 ${dpeGrades.find(d => d.label === l.dpe)?.color}`}>{l.dpe}</span>
          </div>
        ))}
        <p className="text-[10px] text-white/20">Lancez la simulation pour voir vos vrais leads</p>
      </div>
    </div>
  );
}

/* ─── Main ────────────────────────────────────────────── */
export default function Simulation() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    region: regions[0],
    buildingType: buildingTypes[0].value,
    dpeSelected: ['E', 'F', 'G'],
    minSurface: 500,
    email: '',
  });
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('idle');

  const liveCount = computeResult(form);

  const toggleDpe = (label) => {
    setForm(f => ({
      ...f,
      dpeSelected: f.dpeSelected.includes(label)
        ? f.dpeSelected.filter(d => d !== label)
        : [...f.dpeSelected, label],
    }));
  };

  const handleSimulate = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const count = computeResult(form);
    await new Promise(r => setTimeout(r, 900));

    if (form.email) {
      await supabase.from('simulations').insert([{
        email: form.email, region: form.region,
        building_type: form.buildingType,
        dpe: form.dpeSelected.join('+'),
        min_surface: form.minSurface,
        result_count: count,
        created_at: new Date().toISOString(),
      }]).catch(console.error);
    }

    setResult(count);
    setStatus('done');
  };

  return (
    <section className="section">
      <div className="section-inner max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-[0.28em] mb-2">Simulation</p>
          <h1 className="text-4xl font-bold mb-3">Estimez votre marché</h1>
          <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
            Renseignez votre ICP et découvrez combien de bâtiments correspondent à votre profil cible.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-white/30">
            <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> 1,2M bâtiments analysés</span>
            <span className="w-px h-3 bg-white/15" />
            <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Données BDNB · ADEME</span>
            <span className="w-px h-3 bg-white/15" />
            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 100+ clients actifs</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Formulaire */}
          <div>
            <StepsBar step={step} />

            <form onSubmit={handleSimulate} className="card-glass p-6 space-y-6">

              {/* Étape 0 : Région */}
              {step === 0 && (
                <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                  <div>
                    <label className="text-xs text-white/50 mb-2 block font-medium">Région cible</label>
                    <div className="grid grid-cols-2 gap-2">
                      {regions.map(r => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, region: r }))}
                          className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 text-left flex items-center gap-2 ${
                            form.region === r
                              ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                              : 'bg-white/3 border-white/10 text-white/50 hover:border-white/25 hover:text-white/70'
                          }`}
                        >
                          <MapPin className="w-3 h-3 shrink-0" /> {r}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-accent w-full flex items-center justify-center gap-2"
                  >
                    Continuer <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Étape 1 : Type + DPE + Surface */}
              {step === 1 && (
                <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">
                  <div>
                    <label className="text-xs text-white/50 mb-2 block font-medium">Type de bâtiment</label>
                    <div className="space-y-2">
                      {buildingTypes.map(t => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, buildingType: t.value }))}
                          className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium border transition-all duration-200 text-left flex items-center gap-2 ${
                            form.buildingType === t.value
                              ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                              : 'bg-white/3 border-white/10 text-white/50 hover:border-white/25 hover:text-white/70'
                          }`}
                        >
                          <span>{t.icon}</span> {t.value}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-white/50 mb-2 block font-medium">
                      DPE ciblés{' '}
                      <span className="text-white/25 font-normal">(sélection multiple)</span>
                    </label>
                    <div className="flex gap-1.5 flex-wrap">
                      {dpeGrades.map(({ label, color, border }) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => toggleDpe(label)}
                          className={`w-10 h-10 rounded-xl text-sm font-black border-2 transition-all duration-200 ${
                            form.dpeSelected.includes(label)
                              ? `${color} ${border} scale-110 shadow-lg`
                              : 'bg-white/5 border-white/10 text-white/30 hover:border-white/30'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    {form.dpeSelected.length === 0 && (
                      <p className="text-[11px] text-red-400/70 mt-1">Sélectionnez au moins un DPE</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-white/50 mb-2 flex justify-between">
                      <span className="font-medium">Surface minimale</span>
                      <span className="text-emerald-400 font-bold tabular-nums">{parseInt(form.minSurface).toLocaleString('fr-FR')} m²</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={5000}
                      step={100}
                      value={form.minSurface}
                      onChange={e => setForm(f => ({ ...f, minSurface: parseInt(e.target.value) }))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-white/25 mt-1">
                      <span>0 m²</span>
                      <span>5 000 m²</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="btn-outline flex items-center gap-1 text-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={form.dpeSelected.length === 0}
                      className="btn-accent flex-1 flex items-center justify-center gap-2 disabled:opacity-40"
                    >
                      Continuer <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Étape 2 : Récap + Email + Submit */}
              {step === 2 && (
                <div className="space-y-5 animate-[fadeIn_0.3s_ease-out]">

                  <ICPSummary form={form} liveCount={liveCount} />

                  <div>
                    <label className="text-xs text-white/50 mb-2 flex items-center gap-1.5 font-medium">
                      <Mail className="w-3.5 h-3.5 text-emerald-400" />
                      Recevez votre simulation par email
                      <span className="text-white/25 font-normal">(optionnel)</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="jean@entreprise.fr"
                      className="form-input"
                    />
                    <p className="text-[10px] text-white/25 mt-1">Gratuit · Sans CB · Résultats détaillés</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-outline flex items-center gap-1 text-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="submit"
                      disabled={status === 'loading' || form.dpeSelected.length === 0}
                      className="btn-accent flex-1 flex items-center justify-center gap-2 disabled:opacity-60 text-sm"
                    >
                      {status === 'loading' ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Calcul…</>
                      ) : (
                        <>Voir mes {liveCount.toLocaleString('fr-FR')} bâtiments cibles <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Preview panel */}
          <div className="sticky top-24">
            <PreviewPanel form={form} liveCount={liveCount} status={status} result={result} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes progress { from { width: 0%; } to { width: 80%; } }
      `}</style>
    </section>
  );
}
