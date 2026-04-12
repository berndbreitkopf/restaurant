import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Coffee, Users, CalendarDays, Baby, Cake, ChevronRight, CheckCircle2, Star } from "lucide-react";

const services = [
  {
    icon: Coffee,
    title: "Äthiopische Kaffeezeremonie",
    subtitle: "Ein kulturelles Erlebnis",
    description: "Erleben Sie die traditionelle äthiopische Kaffeezeremonie — ein jahrtausendealtes Ritual, bei dem Kaffee frisch geröstet und dreifach aufgebrüht wird. Dazu reichen wir Fladenbrot, Popcorn und den typischen Snack Kolo.",
    price: "19,90 € (inkl. Fladenbrot, Popcorn, Kolo)",
    features: ["Frisch geröstet vor Ihren Augen", "Dreifach aufgebrüht", "Traditionelle Tonfiguren", "Für 1–4 Personen geeignet"],
    color: "var(--eth-green)",
  },
  {
    icon: Users,
    title: "Gruppenreservierungen",
    subtitle: "Für besondere Anlässe",
    description: "Planen Sie eine Feier, einen Ausflug oder ein Firmenevent? Wir reservieren für Gruppen ab 6 Personen und stimmen das Angebot gerne auf Ihre Wünsche ab. Bitte mindestens 48 Stunden im Voraus anfragen.",
    features: ["Gruppenmenüs auf Anfrage", "Reservierung ab 6 Personen", "Catering-Anfragen möglich", "Individuelle Gestaltung"],
    color: "var(--eth-yellow)",
  },
  {
    icon: Baby,
    title: "Eltern-Kind-Treffen",
    subtitle: "Jeden Dienstag",
    description: "Jeden Dienstag laden wir Eltern mit ihren Kleinkindern herzlich ein. In unserem gemütlichen Café haben Sie Raum zum Austausch bei Kaffee und Kuchen. Die Kinder sind willkommen, der Platz ist kinderfreundlich gestaltet.",
    features: ["Jeden Dienstag", "Kinderfreundliche Umgebung", "Hohe Stühle vorhanden", "Austausch mit anderen Eltern"],
    color: "var(--eth-green)",
  },
  {
    icon: CalendarDays,
    title: "Feiertags-Brunch",
    subtitle: "An jedem Feiertag",
    description: "An Feiertagen verwöhnen wir Sie mit einem besonderen Brunch-Angebot. Lassen Sie den Tag gemütlich bei uns ausklingen — Reservierung wird empfohlen.",
    features: ["An allen Feiertagen", "Besonderes Brunch-Menü", "Reservierung empfohlen", "Für Familien geeignet"],
    color: "var(--eth-red)",
  },
  {
    icon: Cake,
    title: "Hausgemachte Kuchen",
    subtitle: "Täglich frisch gebacken",
    description: "Unsere Kuchen werden täglich frisch gebacken — ein wechselndes Angebot aus verschiedenen Backtraditionen, immer mit hochwertigen Zutaten. Perfekt zum Kaffee oder als süßes Mittagessen.",
    features: ["Täglich wechselndes Angebot", "Keine Konservierungsstoffe", "Regionale Zutaten", "Auch zum Mitnehmen"],
    color: "var(--eth-yellow)",
  },
  {
    icon: Star,
    title: "Live Musik",
    subtitle: "Regelmäßige Veranstaltungen",
    description: "Regelmäßig laden wir Musiker in unser Café ein, um für eine besondere Atmosphäre zu sorgen. Akustische Auftritte, Weltmusik und äthiopische Klänge — folgen Sie uns auf Social Media für aktuelle Termine.",
    features: ["Akustische Auftritte", "Äthiopische Klänge", "Weltmusik & Café-Jazz", "Eintritt frei"],
    color: "var(--eth-green)",
  },
];

export default function ServicePage() {
  return (
    <>
      <Helmet>
        <title>Service & Angebote — Café Melody Bistro Bonn</title>
        <meta name="description" content="Entdecken Sie unsere Services im Café Melody Bistro Bonn: Äthiopische Kaffeezeremonie, Eltern-Kind-Treffen, Feiertags-Brunch, Gruppenreservierungen und hausgemachte Kuchen." />
        <meta property="og:title" content="Service & Angebote — Café Melody Bistro Bonn" />
        <meta property="og:description" content="Kaffeezeremonie, Events, Gruppenreservierungen und mehr im Café Melody Bistro Bonn." />
        <link rel="canonical" href="https://cafe-melody-bonn.de/service" />
      </Helmet>

      <header className="py-20 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a2e14 0%, var(--eth-green) 60%, #04581d 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 25% 50%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-1 bg-yellow-400" />
            <span className="text-yellow-300 text-sm font-medium tracking-widest uppercase">Was wir bieten</span>
            <div className="w-8 h-1 bg-yellow-400" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Service &amp; Angebote</h1>
          <p className="text-green-100 max-w-xl mx-auto text-lg">
            Mehr als nur ein Café — ein Ort der Begegnung, Kultur und Genuss
          </p>
        </div>
      </header>

      <main className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service, i) => (
              <article
                key={service.title}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group"
                data-testid={`service-card-${i}`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform" style={{ background: service.color === "var(--eth-yellow)" ? "var(--eth-yellow)" : service.color }}>
                  <service.icon className="w-6 h-6" style={{ color: service.color === "var(--eth-yellow)" ? "#1a1a1a" : "white" }} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: service.color === "var(--eth-yellow)" ? "#b8960e" : service.color }}>
                  {service.subtitle}
                </span>
                <h2 className="font-serif text-xl font-bold mt-1 mb-3">{service.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                {service.price && (
                  <p className="font-bold text-sm mb-4" style={{ color: "var(--eth-green)" }}>{service.price}</p>
                )}
                <ul className="space-y-2">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "var(--eth-green)" }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* Reservation CTA */}
          <div className="rounded-2xl text-white p-10 text-center" style={{ background: "linear-gradient(135deg, var(--eth-green) 0%, #04581d 100%)" }}>
            <h2 className="font-serif text-3xl font-bold mb-4">Interesse? Kommen Sie vorbei oder reservieren Sie!</h2>
            <p className="text-green-100 max-w-xl mx-auto mb-8">
              Für Gruppenanfragen, Events oder die Kaffeezeremonie nehmen Sie bitte Kontakt auf. Wir freuen uns auf Sie!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/anfahrt"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "var(--eth-yellow)", color: "#1a1a1a" }}
              >
                Tisch reservieren <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+491709384822"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-white/20 hover:bg-white/30 transition-colors border border-white/30"
              >
                +49 170 9384822
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
