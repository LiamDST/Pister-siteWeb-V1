export default function Contact() {
  return (
    <section className="section">
      <div className="section-inner grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl font-semibold mb-4">Parlons de votre marché</h1>
          <p className="text-white/70 mb-6">
            Expliquez-nous en quelques lignes votre activité, vos zones d&apos;intervention
            et les types de bâtiments que vous ciblez. Nous revenons vers vous avec
            une proposition de cadrage et une démo adaptée.
          </p>

          <div className="space-y-3 text-sm text-white/70">
            <p>
              <span className="font-medium text-white">Email :</span> contact@pisteur.tech
            </p>
            <p>
              <span className="font-medium text-white">Téléphone :</span> +33 1 23 45 67 89
            </p>
          </div>
        </div>

        <form className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/60 mb-1">Prénom</label>
              <input
                type="text"
                className="w-full rounded-xl bg-navy-900 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-accent-500"
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">Nom</label>
              <input
                type="text"
                className="w-full rounded-xl bg-navy-900 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-accent-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">Email professionnel</label>
            <input
              type="email"
              className="w-full rounded-xl bg-navy-900 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-accent-500"
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">Société</label>
            <input
              type="text"
              className="w-full rounded-xl bg-navy-900 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-accent-500"
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">Message</label>
            <textarea
              rows="4"
              className="w-full rounded-xl bg-navy-900 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-accent-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white text-navy-900 font-medium text-sm hover:bg-gray-100 transition-colors"
          >
            Envoyer ma demande
          </button>
        </form>
      </div>
    </section>
  );
}
