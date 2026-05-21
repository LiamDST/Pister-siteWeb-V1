// src/pages/Simulation.jsx
import { useState } from 'react';

const zones = ['Île-de-France', 'Auvergne‑Rhône‑Alpes', 'Nouvelle‑Aquitaine', 'Occitanie'];
const types = ['Résidentiel collectif', 'Tertiaire', 'Industriel'];
const dpes = ['A‑C', 'D', 'E', 'F', 'G'];
const tailles = ['< 1 000 m²', '1 000 – 5 000 m²', '> 5 000 m²'];

function estimateMarket({ zone, type, dpe, taille }) {
  // Mock simple, juste pour donner un ressenti
  if (!zone || !type || !dpe || !taille) return null;

  let base = 500;
  if (zone === 'Île-de-France') base += 400;
  if (zone === 'Auvergne‑Rhône‑Alpes') base += 250;

  if (type === 'Résidentiel collectif') base += 300;
  if (type === 'Tertiaire') base += 150;

  if (dpe === 'E') base += 200;
  if (dpe === 'F') base += 260;
  if (dpe === 'G') base += 320;

  if (taille === '> 5 000 m²') base = Math.round(base * 0.4);
  if (taille === '< 1 000 m²') base = Math.round(base * 1.2);

  const heatScore = Math.min(99, Math.round((base / 1500) * 100));
  return {
    buildings: base,
    heatScore,
  };
}

export default function Simulation() {
  const [form, setForm] = useState({
    zone: '',
    type: '',
    dpe: '',
    taille: '',
  });
  const result = estimateMarket(form);

  return (
    <section className="section">
      <div className="section-inner grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-start">
        {/* Colonne gauche : formulaire */}
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase mb-2">
            Simulation
          </p>
          <h1 className="text-3xl font-semibold mb-3">
            Estimez votre marché adressable en 30 secondes.
          </h1>
          <p className="text-sm text-slate-600 mb-8 max-w-xl">
            Choisissez une zone, un type de bâtiment, un niveau de DPE et une taille.
            Nous vous donnons un ordre de grandeur du volume de bâtiments qui pourraient
            entrer dans votre cible.
          </p>

          <form className="glass-card p-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Zone géographique</label>
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={form.zone}
                  onChange={(e) => setForm((f) => ({ ...f, zone: e.target.value }))}
                >
                  <option value="">Choisir…</option>
                  {zones.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Type de bâtiment</label>
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                >
                  <option value="">Choisir…</option>
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">DPE ciblé</label>
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={form.dpe}
                  onChange={(e) => setForm((f) => ({ ...f, dpe: e.target.value }))}
                >
                  <option value="">Choisir…</option>
                  {dpes.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Taille du bâtiment</label>
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={form.taille}
                  onChange={(e) => setForm((f) => ({ ...f, taille: e.target.value }))}
                >
                  <option value="">Choisir…</option>
                  {tailles.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-[11px] text-slate-500">
              Résultats indicatifs basés sur des hypothèses moyennes. L&apos;objectif est
              de vous donner un ordre de grandeur, pas une vérité absolue.
            </p>
          </form>
        </div>

        {/* Colonne droite : résultat */}
        <div className="glass-card p-6 space-y-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-glow">
          <p className="text-sm font-medium text-slate-900 mb-2">
            Résultat de la simulation
          </p>

          {!result ? (
            <p className="text-sm text-slate-500">
              Complétez les 4 champs à gauche pour estimer le nombre de bâtiments qui
              correspondent à votre cible.
            </p>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-primary-500/10 border border-primary-500/40 p-4">
                  <p className="text-xs text-slate-600 mb-1">Bâtiments estimés</p>
                  <p className="text-3xl font-semibold text-primary-600">
                    {result.buildings.toLocaleString('fr-FR')}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Dans votre zone et votre segment, avec le DPE ciblé.
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/40 p-4">
                  <p className="text-xs text-slate-600 mb-1">Heat score de potentiel</p>
                  <p className="text-3xl font-semibold text-emerald-600">
                    {result.heatScore}%
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Plus le score est élevé, plus votre segment est intéressant à
                    travailler en priorité.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 text-xs text-slate-600 space-y-1.5">
                <p className="font-medium text-slate-900">Lecture recommandée</p>
                <p>
                  • Au‑delà de 60% de heat score, vos équipes peuvent justifier une
                  séquence de prospection dédiée.
                </p>
                <p>
                  • Vous pouvez combiner plusieurs segments dans Pisteur pour lisser la
                  saisonnalité.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}