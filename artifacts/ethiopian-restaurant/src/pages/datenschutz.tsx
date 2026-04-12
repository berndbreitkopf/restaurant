import { Helmet } from "react-helmet-async";

export default function DatenschutzPage() {
  return (
    <>
      <Helmet>
        <title>Datenschutzerklärung — Café Melody Bistro Bonn</title>
        <meta name="description" content="Datenschutzerklärung des Café Melody Bistro Bonn gemäß DSGVO." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://cafe-melody-bonn.de/datenschutz" />
      </Helmet>

      <header className="py-16 text-white" style={{ background: "linear-gradient(135deg, var(--eth-green) 0%, #04581d 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold">Datenschutzerklärung</h1>
          <p className="text-green-200 mt-2">Informationen gemäß DSGVO</p>
        </div>
      </header>

      <main className="py-12 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">

            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="font-semibold mb-2">Allgemeine Hinweise</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
              <h3 className="font-semibold mt-4 mb-2">Datenerfassung auf dieser Website</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Die Kontaktdaten finden Sie im Impressum dieser Website.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm mt-2">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. Reservierungsanfragen). Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufes).
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold mb-4">2. Allgemeine Hinweise und Pflichtinformationen</h2>
              <h3 className="font-semibold mb-2">Datenschutz</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>
              <h3 className="font-semibold mt-4 mb-2">Verantwortliche Stelle</h3>
              <address className="not-italic text-muted-foreground text-sm leading-relaxed">
                Café Melody Bistro<br />
                Werftstraße 5-7<br />
                53117 Bonn<br />
                Telefon: +49 170 9384822<br />
                E-Mail: hallo@cafe-melody-bonn.de
              </address>
              <h3 className="font-semibold mt-4 mb-2">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold mb-4">3. Datenerfassung auf dieser Website</h2>
              <h3 className="font-semibold mb-2">Server-Log-Dateien</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground text-sm space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed text-sm mt-3">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website.
              </p>
              <h3 className="font-semibold mt-4 mb-2">Kontaktformular / Reservierungsanfragen</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm mt-2">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-serif text-xl font-bold mb-4">4. Ihre Rechte</h2>
              <p className="text-muted-foreground leading-relaxed text-sm mb-3">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen sowie ein Beschwerderecht bei der zuständigen Aufsichtsbehörde.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm mt-3">
                Für Fragen zum Datenschutz wenden Sie sich bitte an:{" "}
                <a href="mailto:hallo@cafe-melody-bonn.de" className="text-foreground underline">hallo@cafe-melody-bonn.de</a>
              </p>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
