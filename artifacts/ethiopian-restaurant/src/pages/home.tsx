import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { useGetTodaysDailyMenu, useGetEvents } from "@workspace/api-client-react";
import { ChevronRight, Clock, Phone, MapPin, Star, Coffee, Leaf } from "lucide-react";

const testimonials = [
  { name: "Maria S.", text: "Das gemütlichste Café in Bonn! Der äthiopische Kaffee ist einfach unglaublich — und die Kaffeezeremonie ein absolutes Erlebnis.", rating: 5 },
  { name: "Thomas K.", text: "Wunderbare Atmosphäre, herzliches Personal und das Essen ist so gut wie selbst gemacht. Wir kommen immer wieder.", rating: 5 },
  { name: "Anika L.", text: "Die äthiopische Platte ist eine Reise für die Sinne! Und die Kuchen — täglich frisch, einfach traumhaft.", rating: 5 },
];

const defaultEvents = [
  {
    id: -1,
    title: "Eltern-Kind-Treffen",
    subtitle: "Jeden Dienstag",
    description: "Jeden Dienstag laden wir Eltern mit ihren Kindern zu unserem gemütlichen Treffen ein. Ein entspannter Ort zum Austausch bei Kaffee und Kuchen. Reservierung empfohlen!",
    imageUrl: "/images/events/fam.png",
    isActive: true, sortOrder: 1, createdAt: new Date().toISOString(),
  },
  {
    id: -2,
    title: "Feiertags-Brunch",
    subtitle: "Jeden Feiertag",
    description: "An jedem Feiertag verwöhnen wir Sie mit unserem besonderen Brunch-Angebot. Reservierung empfohlen!",
    imageUrl: "/images/events/kuchen.jpg",
    isActive: true, sortOrder: 2, createdAt: new Date().toISOString(),
  },
  {
    id: -3,
    title: "Live Musik",
    subtitle: "Regelmäßig",
    description: "Genießen Sie Live-Musik in unserem gemütlichen Café. Verschiedene Künstler sorgen für eine besondere Atmosphäre.",
    imageUrl: "/images/events/livemusic.png",
    isActive: true, sortOrder: 3, createdAt: new Date().toISOString(),
  },
];

export default function HomePage() {
  const { data: todayMenu } = useGetTodaysDailyMenu();
  const { data: eventsData } = useGetEvents();
  const events = (eventsData && eventsData.length > 0) ? eventsData : defaultEvents;

  return (
    <>
      <Helmet>
        <title>Café Melody Bistro Bonn — Gemütliches Café mit äthiopischer Küche</title>
        <meta name="description" content="Café Melody Bistro in Bonn-Graurheindorf — gemütliches Café mit äthiopischer Küche, hausgemachten Kuchen, frischen Säften und traditioneller Kaffeezeremonie. Werftstraße 5-7, Di–So 10–19 Uhr." />
        <meta property="og:title" content="Café Melody Bistro Bonn — Gemütliches Café mit äthiopischer Küche" />
        <meta property="og:description" content="Ihr gemütliches Café in Bonn mit äthiopischer Küche und hausgemachten Spezialitäten. Harmonie und Genuss." />
        <meta property="og:type" content="restaurant" />
        <meta property="og:url" content="https://cafe-melody-bonn.de/" />
        <link rel="canonical" href="https://cafe-melody-bonn.de/" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[88vh] min-h-[560px] flex items-center overflow-hidden" aria-label="Willkommen im Café Melody Bistro Bonn">
        <div className="absolute inset-0">
          <img
            src="/images/hero/injera-platter.jpg"
            alt="Äthiopische Speisen im Café Melody Bistro Bonn — Injera Platte mit verschiedenen Beilagen"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(61,31,10,0.92) 0%, rgba(61,31,10,0.75) 40%, rgba(61,31,10,0.35) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--cafe-gold)" }}>Bonn-Graurheindorf</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
              Café Melody<br />
              <span style={{ color: "var(--cafe-gold)" }}>Bistro</span>
            </h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-3 max-w-xl font-light">
              Dein gemütliches Café in Bonn mit äthiopischer Küche und hausgemachten Spezialitäten.
            </p>
            <p className="text-base text-white/65 mb-10 font-light">
              Der Name „Melody" steht für Harmonie und Genuss — genau das möchten wir Ihnen bieten.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/speisekarte"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:opacity-90 hover:shadow-xl"
                style={{ background: "var(--cafe-gold)", color: "var(--cafe-brown-dark)" }}
              >
                Speisekarte ansehen <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+491709384822"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-white/15 hover:bg-white/25 transition-all border border-white/25 backdrop-blur-sm"
              >
                <Phone className="w-4 h-4" />
                Reservieren
              </a>
            </div>
          </div>
        </div>

        {/* Info bar */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-6 py-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: "var(--cafe-gold)" }} />
                <span><strong className="text-white">Mo:</strong> Ruhetag</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: "var(--cafe-gold)" }} />
                <span><strong className="text-white">Di – So:</strong> 10:00 – 19:00 Uhr</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: "var(--cafe-gold)" }} />
                <a href="tel:+491709384822" className="hover:text-white transition-colors">+49 170 9384822</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tageskarte Banner */}
      {todayMenu && todayMenu.totalItems > 0 && (
        <section className="py-4 text-white" style={{ background: "var(--cafe-brown)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Coffee className="w-5 h-5" style={{ color: "var(--cafe-gold)" }} />
              <span className="font-medium">Tageskarte heute: {todayMenu.totalItems} Gerichte</span>
            </div>
            <Link href="/tageskarte" className="flex items-center gap-1 text-sm font-medium hover:underline" style={{ color: "var(--cafe-gold)" }}>
              Heute ansehen <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Events Section */}
      <section className="py-20" style={{ background: "var(--cafe-cream)" }} aria-labelledby="events-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
              <span className="cafe-label" style={{ color: "var(--cafe-brown)" }}>Aktuelles</span>
              <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
            </div>
            <h2 id="events-heading" className="font-serif text-4xl font-bold mb-3" style={{ color: "var(--cafe-brown-dark)" }}>Neuigkeiten & Events</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Bleiben Sie auf dem Laufenden über unsere aktuellen Veranstaltungen</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event) => (
              <article key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover-lift group border border-border" data-testid={`event-card-${event.id}`}>
                <div className="relative h-52 overflow-hidden">
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt={`${event.title} im Café Melody Bistro Bonn`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full" style={{ background: "var(--cafe-sand)" }} />
                  )}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(61,31,10,0.6) 0%, transparent 60%)" }} />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ background: "var(--cafe-brown)" }}>
                      {event.subtitle}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold mb-2" style={{ color: "var(--cafe-brown-dark)" }}>{event.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{event.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Willkommen Section */}
      <section className="py-20 bg-white" aria-labelledby="welcome-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
                <span className="cafe-label" style={{ color: "var(--cafe-brown)" }}>Unsere Geschichte</span>
              </div>
              <h2 id="welcome-heading" className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "var(--cafe-brown-dark)" }}>
                Willkommen im<br />Melody Café & Bistro
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Der Name „Melody" steht für Harmonie und Genuss — genau das möchten wir Ihnen bieten. Unser Café & Bistro vereint kulinarische Köstlichkeiten mit einer warmen Atmosphäre, inspiriert von der reichen äthiopischen Kultur.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Wir legen großen Wert auf frische, hochwertige Zutaten und verzichten auf künstliche Zusatzstoffe. Unsere Speisen werden mit Liebe und Sorgfalt zubereitet, damit Sie den besten Geschmack genießen können.
              </p>
              <Link
                href="/speisekarte"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: "var(--cafe-brown)" }}
              >
                Speisekarte entdecken <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-sm hover-lift h-64">
                <img
                  src="/images/speisekarte/ethiopian-food-platter.jpg"
                  alt="Äthiopische Spezialitäten im Café Melody Bistro Bonn"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-sm hover-lift h-64 mt-8">
                <img
                  src="/images/home/kuchen-getraenke.jpg"
                  alt="Hausgemachte Kuchen und frische Getränke im Café Melody Bonn"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speisekarte & Getränke highlight */}
      <section className="py-20" style={{ background: "var(--cafe-cream)" }} aria-labelledby="menu-highlight-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
              <span className="cafe-label" style={{ color: "var(--cafe-brown)" }}>Unser Angebot</span>
              <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
            </div>
            <h2 id="menu-highlight-heading" className="font-serif text-4xl font-bold" style={{ color: "var(--cafe-brown-dark)" }}>Speisen & Getränke</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Speisekarte */}
            <Link href="/speisekarte" className="group relative rounded-3xl overflow-hidden shadow-md hover-lift block h-72" aria-label="Zur Speisekarte">
              <img
                src="/images/speisekarte/platte.jpg"
                alt="Habesha Platte mit äthiopischen Gerichten — Speisekarte im Café Melody Bistro Bonn"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(61,31,10,0.85) 0%, transparent 60%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--cafe-gold)" }}>Frische Speisen</span>
                <h3 className="font-serif text-2xl font-bold mt-1 mb-2">Speisekarte</h3>
                <p className="text-white/80 text-sm">Entdecken Sie unsere vielfältige Auswahl an hausgemachten Gerichten und äthiopischen Spezialitäten.</p>
                <div className="flex items-center gap-1 mt-3 text-sm font-semibold" style={{ color: "var(--cafe-gold)" }}>
                  Zur Speisekarte <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Getränkekarte */}
            <Link href="/getraenkekarte" className="group relative rounded-3xl overflow-hidden shadow-md hover-lift block h-72" aria-label="Zur Getränkekarte">
              <img
                src="/images/getraenke/getraenke.jpg"
                alt="Frische Säfte und Getränke im Café Melody Bistro Bonn"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(61,31,10,0.85) 0%, transparent 60%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--cafe-gold)" }}>Leckere Getränke</span>
                <h3 className="font-serif text-2xl font-bold mt-1 mb-2">Getränkekarte</h3>
                <p className="text-white/80 text-sm">Genießen Sie frische Säfte, hausgemachte Limonaden und aromatischen äthiopischen Kaffee.</p>
                <div className="flex items-center gap-1 mt-3 text-sm font-semibold" style={{ color: "var(--cafe-gold)" }}>
                  Zur Getränkekarte <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Äthiopische Küche Section */}
      <section className="py-20 bg-white" aria-labelledby="cuisine-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 rounded-3xl overflow-hidden shadow-lg hover-lift">
              <img
                src="/images/hero/injera-platter.jpg"
                alt="Traditionelles äthiopisches Injera Gericht mit bunten Beilagen im Café Melody Bonn"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
                <span className="cafe-label" style={{ color: "var(--cafe-brown)" }}>Authentisch & Hausgemacht</span>
              </div>
              <h2 id="cuisine-heading" className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "var(--cafe-brown-dark)" }}>
                Äthiopische Küche
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Entdecken Sie die authentische äthiopische Küche in Bonn im Café Bistro Melody. Genießen Sie eine gemütliche Atmosphäre für eine echte kulturelle Erfahrung.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Die äthiopische Küche ist eine der ältesten und vielfältigsten Küchen Afrikas. Sie zeichnet sich durch einzigartige Gewürzmischungen, traditionelle Zubereitungsmethoden und die gemeinschaftliche Art des Essens aus.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/speisekarte"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90"
                  style={{ background: "var(--cafe-brown)" }}
                >
                  Zur Speisekarte
                </Link>
                <Link
                  href="/service"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border transition-all hover:bg-muted"
                  style={{ borderColor: "var(--cafe-brown)", color: "var(--cafe-brown)" }}
                >
                  Kaffeezeremonie
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kuchen & Getränke */}
      <section className="py-20" style={{ background: "var(--cafe-brown)" }} aria-labelledby="cakes-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-white">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
                <span className="cafe-label" style={{ color: "var(--cafe-gold)" }}>Täglich frisch</span>
              </div>
              <h2 id="cakes-heading" className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6">
                Hausgemachte Kuchen & Getränke
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Verwöhnen Sie sich mit unseren selbstgemachten Kuchen, die täglich frisch gebacken werden. Dazu servieren wir frisch gepresste Säfte und hausgemachte Limonaden.
              </p>
              <ul className="space-y-3 mb-8">
                {["Wechselnde Kuchenauswahl", "Frisch gepresste Säfte", "Hausgemachte Limonaden", "Äthiopischer Kaffee"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-white/85">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--cafe-gold)" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/getraenkekarte"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "var(--cafe-gold)", color: "var(--cafe-brown-dark)" }}
              >
                Zur Getränkekarte <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg hover-lift">
              <img
                src="/images/home/kuchen-getraenke.jpg"
                alt="Hausgemachte Kuchen und frische Säfte im Café Melody Bistro Bonn"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" style={{ background: "var(--cafe-cream)" }} aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
              <span className="cafe-label" style={{ color: "var(--cafe-brown)" }}>Kundenstimmen</span>
              <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
            </div>
            <h2 id="testimonials-heading" className="font-serif text-4xl font-bold" style={{ color: "var(--cafe-brown-dark)" }}>Was unsere Gäste sagen</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-border hover-lift">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: "var(--cafe-gold)" }} />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm mb-4 italic">„{t.text}"</p>
                <footer className="font-semibold text-sm" style={{ color: "var(--cafe-brown)" }}>— {t.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Visit us */}
      <section className="relative py-24 overflow-hidden" aria-labelledby="visit-heading">
        <div className="absolute inset-0">
          <img
            src="/images/speisekarte/ethiopian-food-platter.jpg"
            alt="Äthiopisches Essen im Café Melody Bistro Bonn"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(61,31,10,0.82)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
            <span className="cafe-label" style={{ color: "var(--cafe-gold)" }}>Besuchen Sie uns</span>
            <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
          </div>
          <h2 id="visit-heading" className="font-serif text-4xl md:text-5xl font-bold mb-4">In Bonn-Graurheindorf</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg">
            Erleben Sie die Harmonie von äthiopischer Kultur und gemütlicher Café-Atmosphäre
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <Link
              href="/anfahrt"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:opacity-90 transition-all"
              style={{ background: "var(--cafe-gold)", color: "var(--cafe-brown-dark)" }}
            >
              <MapPin className="w-4 h-4" />
              Anfahrt & Öffnungszeiten
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-white/15 hover:bg-white/25 transition-all border border-white/25"
            >
              Kontakt aufnehmen
            </Link>
          </div>
          <div className="flex flex-wrap gap-8 justify-center text-sm text-white/70">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: "var(--cafe-gold)" }} />
              Werftstraße 5-7, 53117 Bonn
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" style={{ color: "var(--cafe-gold)" }} />
              +49 170 9384822
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4" style={{ color: "var(--cafe-gold)" }} />
              Di – So 10:00 – 19:00 Uhr
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
