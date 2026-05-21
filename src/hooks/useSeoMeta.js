// src/hooks/useSeoMeta.js
import { useEffect } from 'react';

export function useSeoMeta({ title, description, canonical }) {
  useEffect(() => {
    // Title
    document.title = title
      ? `${title} — Pisteur`
      : 'Pisteur — Prospection bâtiment intelligente';

    // Description
    const desc = document.querySelector('meta[name="description"]');
    if (desc && description) desc.setAttribute('content', description);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    if (canonical) link.setAttribute('href', `https://pisteur.tech${canonical}`);

    // OG title + description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc  = document.querySelector('meta[property="og:description"]');
    const ogUrl   = document.querySelector('meta[property="og:url"]');
    if (ogTitle && title)       ogTitle.setAttribute('content', `${title} — Pisteur`);
    if (ogDesc && description)  ogDesc.setAttribute('content', description);
    if (ogUrl && canonical)     ogUrl.setAttribute('content', `https://pisteur.tech${canonical}`);
  }, [title, description, canonical]);
}