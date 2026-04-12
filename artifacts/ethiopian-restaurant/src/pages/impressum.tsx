import { Helmet } from "react-helmet-async";

export default function ImpressumPage() {
  return (
    <>
      <Helmet>
        <title>Impressum — Café Melody Bistro Bonn</title>
        <meta name="description" content="Impressum des Café Melody Bistro Bonn, Werftstraße 5-7, 53117 Bonn-Graurheindorf." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://cafe-melody-bonn.de/impressum" />
      </Helmet>

      <header className="py-16 text-white" style={{ background: "linear-gradient(135deg, var(--eth-green) 0%, #04581d 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold">Impressum</h1>
          <p className="text-green-200 mt-2">Angaben gemäß § 5 TMG</p>
        </div>
      </header>

      <main className="py-12 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-sm max-w-none space-y-8">

            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
              <address className="not-italic text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Café Melody Bistro</strong><br />
                Werftstraße 5-7<br />
                53117 Bonn<br />
                Deutschland
              </address>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold mb-4">Kontakt</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Telefon: <a href="tel:+491709384822" className="text-foreground hover:underline">+49 170 9384822</a></p>
                <p>E-Mail: <a href="mailto:hallo@cafe-melody-bonn.de" className="text-foreground hover:underline">hallo@cafe-melody-bonn.de</a></p>
              </div>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <address className="not-italic text-muted-foreground leading-relaxed">
                Café Melody Bistro<br />
                Werftstraße 5-7<br />
                53117 Bonn
              </address>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold mb-4">EU-Streitschlichtung</h2>
              <p className="text-muted-foreground leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-foreground underline">
                  https://ec.europa.eu/consumers/odr/
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold mb-4">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
              <p className="text-muted-foreground leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold mb-4">Haftung für Inhalte</h2>
              <p className="text-muted-foreground leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht obligiert, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold mb-4">Haftung für Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold mb-4">Urheberrecht</h2>
              <p className="text-muted-foreground leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
