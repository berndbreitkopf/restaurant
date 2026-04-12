import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { CheckCircle2, ChevronRight, Phone } from "lucide-react";

const services = [
  {
    title: "Äthiopische Kaffeezeremonie",
    subtitle: "Ein kulturelles Erlebnis",
    description: "Erleben Sie die traditionelle äthiopische Kaffeezeremonie — ein jahrtausendealtes Ritual, bei dem Kaffee frisch geröstet und dreifach aufgebrüht wird. Dazu reichen wir Fladenbrot, Popcorn und den typischen Snack Kolo.",
    price: "19,90 € (inkl. Fladenbrot, Popcorn, Kolo)",
    features: ["Frisch geröstet vor Ihren Augen", "Dreifach aufgebrüht", "Traditionelle Tonfiguren", "Für 1–4 Personen geeignet"],
    image: "/images/service/catering-buffet.jpg",
  },
  {
    title: "Gruppenreservierungen",
    subtitle: "Für besondere Anlässe",
    description: "Planen Sie eine Feier, einen Ausflug oder ein Firmenevent? Wir reservieren für Gruppen ab 6 Personen und stimmen das Angebot gerne auf Ihre Wünsche ab. Bitte mindestens 48 Stunden im Voraus anfragen.",
    features: ["Gruppenmenüs auf Anfrage", "Reservierung ab 6 Personen", "Catering-Anfragen möglich", "Individuelle Gestaltung"],
    image: "/images/service/event-setup.jpg",
  },
  {
    title: "Eltern-Kind-Treffen",
    subtitle: "Jeden Dienstag",
    description: "Jeden Dienstag laden wir Eltern mit ihren Kleinkindern herzlich ein. In unserem gemütlichen Café haben Sie Raum zum Austausch bei Kaffee und Kuchen. Die Kinder sind willkommen, der Platz ist kinderfreundlich gestaltet.",
    features: ["Jeden Dienstag", "Kinderfreundliche Umgebung", "Hohe Stühle vorhanden", "Austausch mit anderen Eltern"],
    image: "/images/events/fam.png",
  },
  {
    title: "Feiertags-Brunch",
    subtitle: "An jedem Feiertag",
    description: "An Feiertagen verwöhnen wir Sie mit einem besonderen Brunch-Angebot. Lassen Sie den Tag gemütlich bei uns ausklingen — Reservierung wird empfohlen.",
    features: ["An allen Feiertagen", "Besonderes Brunch-Menü", "Reservierung empfohlen", "Für Familien geeignet"],
    image: "/images/service/brunch.jpg",
  },
  {
    title: "Hausgemachte Kuchen",
    subtitle: "Täglich frisch gebacken",
    description: "Unsere Kuchen werden täglich frisch gebacken — ein wechselndes Angebot aus verschiedenen Backtraditionen, immer mit hochwertigen Zutaten. Perfekt zum Kaffee oder als süßes Mittagessen.",
    features: ["Täglich wechselndes Angebot", "Keine Konservierungsstoffe", "Regionale Zutaten", "Auch zum Mitnehmen"],
    image: "/images/service/cakes.jpg",
  },
  {
    title: "Catering & Events",
    subtitle: "Für besondere Anlässe",
    description: "Wir bieten professionelles Catering für Ihre privaten und geschäftlichen Veranstaltungen. Von der Planung bis zur Durchführung stehen wir Ihnen zur Seite.",
    features: ["Maßgeschneiderte Menüs", "Professionelle Durchführung", "Äthiopische Spezialitäten", "Individuelle Beratung"],
    image: "/images/service/gourmet.jpg",
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

      {/* Hero */}
      <header className="relative py-24 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/service/event-setup.jpg"
            alt="Service und Veranstaltungen im Café Melody Bistro Bonn"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(61,31,10,0.82)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
            <span className="cafe-label" style={{ color: "var(--cafe-gold)" }}>Was wir bieten</span>
            <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Service &amp; Angebote</h1>
          <p className="text-white/80 max-w-xl mx-auto text-lg">
            Mehr als nur ein Café — ein Ort der Begegnung, Kultur und Genuss
          </p>
        </div>
      </header>

      <main className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 mb-16">
            {services.map((service, i) => (
              <article
                key={service.title}
                className={`bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover-lift ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                data-testid={`service-card-${i}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className={`relative h-64 md:h-auto overflow-hidden ${i % 2 !== 0 ? "md:order-2" : ""}`}>
                    <img
                      src={service.image}
                      alt={`${service.title} im Café Melody Bistro Bonn`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(61,31,10,0.3))" }} />
                  </div>
                  <div className={`p-8 flex flex-col justify-center ${i % 2 !== 0 ? "md:order-1" : ""}`}>
                    <span className="cafe-label mb-2" style={{ color: "var(--cafe-brown)" }}>{service.subtitle}</span>
                    <h2 className="font-serif text-2xl font-bold mb-3" style={{ color: "var(--cafe-brown-dark)" }}>{service.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                    {service.price && (
                      <p className="font-bold text-sm mb-4" style={{ color: "var(--cafe-brown)" }}>{service.price}</p>
                    )}
                    <ul className="space-y-2 mb-6">
                      {service.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "var(--cafe-brown)" }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/anfahrt"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white self-start hover:opacity-90 transition-all"
                      style={{ background: "var(--cafe-brown)" }}
                    >
                      Reservieren <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-3xl p-12 text-center text-white relative overflow-hidden" style={{ background: "var(--cafe-brown)" }}>
            <div className="relative z-10">
              <h2 className="font-serif text-3xl font-bold mb-4">Interesse? Kontaktieren Sie uns!</h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Für Gruppenanfragen, Events oder die Kaffeezeremonie nehmen Sie bitte Kontakt auf. Wir freuen uns auf Sie!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/anfahrt"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all"
                  style={{ background: "var(--cafe-gold)", color: "var(--cafe-brown-dark)" }}
                >
                  Tisch reservieren <ChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+491709384822"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-white/15 hover:bg-white/25 border border-white/30 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  +49 170 9384822
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
