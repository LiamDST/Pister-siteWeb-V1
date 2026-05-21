# Pisteur — React + Vite + Tailwind + EmailJS + Supabase

## Stack
- React 18 + Vite
- React Router v6
- Tailwind CSS v3
- EmailJS (envoi d'emails depuis le formulaire contact)
- Supabase (stockage des contacts et simulations)
- Framer Motion (animations)
- Lucide React (icônes)

## Installation

```bash
npm install
```

## Configuration

Créez un fichier `.env` à la racine (copie de `.env.example`) :

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Supabase — Tables à créer

```sql
-- Table contacts
create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text, email text, company text,
  type text, message text, created_at timestamptz
);

-- Table simulations
create table simulations (
  id uuid default gen_random_uuid() primary key,
  email text, region text, building_type text,
  dpe text, min_surface integer, result_count integer,
  created_at timestamptz
);
```

### EmailJS
1. Créez un compte sur emailjs.com
2. Créez un service (Gmail, Outlook…)
3. Créez un template avec les variables : `from_name`, `from_email`, `company`, `type`, `message`
4. Copiez Service ID, Template ID et Public Key dans `.env`

## Démarrage

```bash
npm run dev
```

## Build & déploiement

```bash
npm run build
# dossier dist/ → déployer sur Vercel, Netlify ou OVH
```

### Vercel (recommandé)
1. Push sur GitHub
2. Nouveau projet Vercel → connecter le repo
3. Framework: Vite (auto-détecté)
4. Ajouter les variables d'env dans Vercel Settings

## Pages disponibles
- `/` — Accueil (Hero, Features, How it works, Stats, Testimonials)
- `/demo` — Démo interactive avec leads mockup
- `/simulation` — Simulateur de marché (Supabase)
- `/tarifs` — Plans tarifaires
- `/blog` — Articles
- `/faq` — Questions fréquentes (accordéon)
- `/contact` — Formulaire (EmailJS + Supabase)
