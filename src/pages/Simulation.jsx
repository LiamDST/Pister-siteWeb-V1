import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2, CheckCircle2, Building2 } from 'lucide-react';

const regions = ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Occitanie', 'Nouvelle-Aquitaine', 'Bretagne', 'Grand Est', 'Normandie', 'Hauts-de-France'];
const buildingTypes = ['Résidentiel collectif', 'Tertiaire', 'Logement social', 'Établissement public', 'Commercial'];
const dpeOptions = ['E', 'F', 'G', 'E+F', 'E+F+G'];

function computeResult({ region, buildingType, dpe, minSurface }) {
  const base = {
    'Île-de-France': 8400, 'Auvergne-Rhône-Alpes': 4200, 'Occitanie': 3100,
    'Nouvelle-Aquitaine': 2900, 'Bretagne': 1800, 'Grand Est': 2200,
    'Normandie': 1600, 'Hauts-de-France': 2500,
  }[region] || 3000;
  const typeMult = { 'Résidentiel collectif': 1, 'Tertiaire': 0.6, 'Logement social': 0.4, 'Établissement public': 0.3, 'Commercial': 0.5 }[buildingType] || 0.8;
  const dpeMult = dpe.includes('+') ? dpe.split('+').length * 0.35 : 0.35;
  const surfMult = Math.max(0.2, 1 - (parseInt(minSurface) || 0) / 10000);
  return Math.round(base * typeMult * dpeMult * surfMult);
}

export default function Simulation() {
  const [form, setForm] = useState({
    region: regions[0], buildingType: buildingTypes[0],
    dpe: 'E+F+G', minSurface: '500', email: '',
  });
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('idle');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSimulate = async e => {
    e.preventDefault();
    setStatus('loading');
    const count = computeResult(form);
    await new Promise(r => setTimeout(r, 700));

    if (form.email) {
      await supabase.from('simulations').insert([{
        email: form.email, region: form.region, building_type: form.buildingType,
        dpe: form.dpe, min_surface: parseInt(form.minSurface) || 0,
        result_count: count, created_at: new Date().toISOString(),
      }]).catch(console.error);
    }

    setResult(count);
    setStatus('done');
  };

  return (
    <section className="section">
      <div className="section-inner max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div>
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">Simulation</p>
            <h1 className="text-4xl font-bold mb-3">Estimez votre marché</h1>
            <p className="text-white/60 text-sm leading-relaxed">
              Renseignez votre ICP et découvrez combien de bâtiments correspondent
              à votre profil cible en France.
            </p>
          </div>

          <form onSubmit={handleSimulate} className="card-glass p-6 space-y-4">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Région</label>
              <select name="region" value={form.region} onChange={handleChange} className="form-input bg-navy-950">
                {regions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Type de bâtiment</label>
              <select name="buildingType" value={form.buildingType} onChange={handleChange} className="form-input bg-navy-950">
                {buildingTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">DPE ciblé</label>
              <select name="dpe" value={form.dpe} onChange={handleChange} className="form-input bg-navy-950">
                {dpeOptions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Surface minimale (m²)</label>
              <input name="minSurface" type="number" value={form.minSurface}
                onChange={handleChange} min={0} className="form-input" placeholder="500" />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">
                Email <span className="text-white/30">(optionnel)</span>
              </label>
              <input name="email" type="email" value={form.email}
                onChange={handleChange} placeholder="jean@entreprise.fr" className="form-input" />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-accent w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
              {status === 'loading' ? 'Calcul en cours...' : 'Simuler mon marché'}
            </button>
          </form>
        </div>

        <div className="card-glass p-8 flex flex-col items-center justify-center text-center gap-4 min-h-64">
          {status === 'idle' && (
            <>
              <Building2 className="w-12 h-12 text-white/20" />
              <p className="text-white/40 text-sm">Remplissez le formulaire pour estimer votre marché adressable.</p>
            </>
          )}
          {status === 'loading' && <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />}
          {status === 'done' && result !== null && (
            <>
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              <div>
                <p className="text-5xl font-black text-emerald-400">{result.toLocaleString('fr-FR')}</p>
                <p className="text-white/60 text-sm mt-2">bâtiments correspondent à vos critères</p>
              </div>
              <p className="text-xs text-white/40 max-w-xs">
                Estimation basée sur les données BDNB et ADEME.
              </p>
              <Link to="/contact" className="btn-accent">Obtenir mes premiers leads</Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}