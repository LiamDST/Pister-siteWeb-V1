import { useState, useEffect } from 'react';

/**
 * Barre de progression de scroll fine en haut de page.
 * Couleur : dégradé blue → teal, cohérent avec la charte Pisteur.
 */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? Math.min((scrolled / total) * 100, 100) : 0);
    };

    window.addEventListener('scroll', update, { passive: true });
    update(); // calcul initial
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progression de lecture"
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 transition-none rounded-r-full"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
