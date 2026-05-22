import { useEffect, useRef, useState } from 'react';

/**
 * Retourne { ref, visible }.
 * visible est immédiatement true si l'élément est déjà dans le viewport
 * au moment du montage, ce qui évite les espaces blancs en haut de page.
 */
export function useFadeInOnScroll(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );

    // Vérification synchrone : si l'élément est déjà visible, on n'attend pas
    const rect = el.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible) {
      setVisible(true);
    } else {
      obs.observe(el);
    }

    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}
