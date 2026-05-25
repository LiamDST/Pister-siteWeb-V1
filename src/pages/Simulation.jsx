import { Link } from 'react-router-dom';
import { BarChart3, Building2, Mail, MapPin, Search, ChevronRight, Loader2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { supabase } from '../lib/supabase';

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

const leadExamples = [
  { city: 'Paris 15e', type: 'Résidentiel collectif', dpe: 'F', surface: '2 340 m²' },
  { city: 'Lyon 3e', type: 'Résidentiel collectif', dpe: 'E', surface: '1 870 m²' },
  { city: 'Nantes Centre', type: 'Tertiaire', dpe: 'G', surface: '4 100 m²' },
];

export default function Simulation() {
  const [form, setForm] = useState({
    region: 'Île-de-France',
    buildingType: 'Résidentiel collectif',
    dpeSelected: ['E', 'F', 'G'],
    minSurface: 0,
    email: '',
  });
  const [status, setStatus] = useState('idle');

  const estimatedCount = useMemo(() => 8400, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await supabase.from('simulations').insert([{
        region: form.region,
        building_type: form.buildingType,
        dpe: form.dpeSelected.join('+'),
        min_surface: form.minSurface,
        email: form.email,
      }]);
      setStatus('done');
    } catch {
      setStatus('idle');
    }
  };

  return (
    <section className="section">
      <div className="section-inner grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
        <div className="card-glass p-6 rounded-3xl">
          <div className="mb-6">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">Simulation</p>
            <h1 className="text-4xl font-bold mb-3">Estimez votre marché</h1>
            <div className="flex flex-wrap gap-4 text-sm text-white/55">
              <span>1,2M bâtiments analysés</span>
              <span>Données BDNB · ADEME</span>
              <span>100+ clients actifs</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Région cible</label>
              <select
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Type de bâtiment</label>
              <select
                value={form.buildingType}
                onChange={(e) => setForm({ ...form, buildingType: e.target.value })}
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3"
              >
                {buildingTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.value}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="block text-sm font-medium mb-2">DPE ciblés <span className="text-white/40">(sélection multiple)</span></p>
              <div className="flex gap-2">
                {['E', 'F', 'G'].map((dpe) => {
                  const active = form.dpeSelected.includes(dpe);
                  return (
                    <button
                      type="button"
                      key={dpe}
                      onClick={() => setForm({
                        ...form,
                        dpeSelected: active ? form.dpeSelected.filter((x) => x !== dpe) : [...form.dpeSelected, dpe],
                      })}
                      className={`px-4 py-2 rounded-xl border ${active ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white/5 border-white/10 text-white/70'}`}
                    >
                      DPE {dpe}
                    </button>
                  );
                })}
              </div>
              {form.dpeSelected.length === 0 && <p className="text-xs text-red-400 mt-2">Sélectionnez au moins un DPE</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Surface minimale <span className="text-white/40">(optionnel)</span></label>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={form.minSurface}
                onChange={(e) => setForm({ ...form, minSurface: Number(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-white/40 mt-2">
                <span>0 m²</span>
                <span>5 000 m²</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="vous@entreprise.fr"
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || form.dpeSelected.length === 0}
              className="btn-primary w-full"
            >
              {status === 'loading' ? 'Calcul…' : 'Gratuit · Sans CB · Résultats détaillés'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="card-glass p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-white/50">Estimation</p>
                <p className="text-4xl font-bold text-emerald-400">{estimatedCount.toLocaleString('fr-FR')} bâtiments</p>
              </div>
              <div className="text-right text-xs text-white/45">
                <p>Source BDNB · ADEME</p>
                <p style={{ opacity: 0.6 }}>Données 2025</p>
              </div>
            </div>
            <p className="text-sm text-white/60">Estimation BDNB · ADEME. Sans engagement.</p>
          </div>

          <div className="card-glass p-6 rounded-3xl">
            <p className="text-sm font-semibold mb-3">Exemples de leads — données illustratives</p>
            <div className="space-y-3">
              {leadExamples.map((lead) => (
                <div key={lead.city} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{lead.city}</p>
                      <p className="text-sm text-white/55">{lead.type}</p>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold">DPE {lead.dpe}</span>
                  </div>
                  <p className="text-sm text-white/60 mt-2">Surface : {lead.surface}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
