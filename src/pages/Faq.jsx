const faqs = [
  {
    q: 'D&apos;où viennent vos données bâtiment ?',
    a: 'Nous croisons des bases de données publiques et privées, des données cadastrales, énergétiques et d&apos;activité économique pour reconstituer un signal bâtiment fiable.',
  },
  {
    q: 'Puis-je tester Pisteur sur un segment restreint ?',
    a: 'Oui, nous proposons des essais sur un territoire ou un type de bâtiment réduit pour valider l&apos;adéquation avec votre marché.',
  },
  {
    q: 'Combien de temps pour être opérationnel ?',
    a: 'En général moins d&apos;une semaine entre le cadrage de votre ICP et la réception des premiers leads.',
  },
];

export default function Faq() {
  return (
    <section className="section">
      <div className="section-inner max-w-3xl">
        <h1 className="text-3xl font-semibold mb-4">Questions fréquentes</h1>
        <p className="text-white/70 mb-8">
          Quelques réponses aux questions que les équipes commerciales nous posent
          le plus souvent.
        </p>

        <div className="space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group bg-white/5 border border-white/10 rounded-2xl p-4 cursor-pointer"
            >
              <summary className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-white/90">
                  <span dangerouslySetInnerHTML={{ __html: item.q }} />
                </span>
                <span className="text-xs text-white/60 group-open:hidden">+</span>
                <span className="text-xs text-white/60 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-2 text-sm text-white/70">
                <span dangerouslySetInnerHTML={{ __html: item.a }} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
