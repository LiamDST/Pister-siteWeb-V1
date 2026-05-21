import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section">
      <div className="section-inner flex flex-col items-center justify-center text-center py-24 gap-6">
        <div className="text-8xl font-extrabold text-g-200 select-none">404</div>
        <h1 className="text-2xl font-bold text-g-900">Page introuvable</h1>
        <p className="text-g-500 max-w-md text-sm">
          La page que vous cherchez n&apos;existe pas ou a été déplacée. Revenez
          à l&apos;accueil pour continuer.
        </p>
        <Link
          to="/"
          className="px-5 py-3 rounded-lg bg-p text-white text-sm font-bold hover:bg-p-hover transition-colors"
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}