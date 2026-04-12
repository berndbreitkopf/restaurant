import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { useGetTodaysDailyMenu, useGetEvents } from "@workspace/api-client-react";
import { ChevronRight, Clock, Phone, MapPin, Star, Coffee, Cake, CalendarDays } from "lucide-react";
import heroImg from "@/assets/images/hero.png";
import ambianceImg from "@/assets/images/ambiance-1.png";
import coffeeImg from "@/assets/images/coffee-ceremony.png";

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
    description: "Jeden Dienstag laden wir Eltern mit ihren Kindern zu unserem gemütlichen Treffen ein. Ein entspannter Ort zum Austausch bei Kaffee und Kuchen mit Angeboten. Reservierung empfohlen!",
    imageUrl: null,
    isActive: true,
    sortOrder: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: -2,
    title: "Feiertags-Brunch",
    subtitle: "Jeden Feiertag",
    description: "An jedem Feiertag verwöhnen wir Sie mit unserem Brunch-Angebot. Reservierung empfohlen!",
    imageUrl: null,
    isActive: true,
    sortOrder: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: -3,
    title: "Live Musik",
    subtitle: "Regelmäßig",
    description: "Genießen Sie Live-Musik in unserem gemütlichen Café. Verschiedene Künstler sorgen für eine besondere Atmosphäre.",
    imageUrl: null,
    isActive: true,
    sortOrder: 3,
    createdAt: new Date().toISOString(),
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
      <section className="relative h-[80vh] min-h-[500px] flex items-center overflow-hidden" aria-label="Willkommen">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Gemütliches Café Melody Bistro Bonn — äthiopische Spezialitäten" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(7,137,48,0.88) 0%, rgba(0,0,0,0.65) 50%, rgba(218,18,26,0.55) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-1" style={{ background: "var(--eth-yellow)" }} />
              <span className="text-yellow-300 text-sm font-medium tracking-widest uppercase">Willkommen</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-4">
              Café Melody<br />
              <span style={{ color: "var(--eth-yellow)" }}>Bistro</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-2 font-light">
              Dein gemütliches Café in Bonn mit äthiopischer Küche
            </p>
            <p className="text-base text-white/75 mb-8 leading-relaxed max-w-lg">
              Der Name „Melody" steht für Harmonie und Genuss — genau das möchten wir Ihnen bieten. Kulinarische Köstlichkeiten mit warmer Atmosphäre, inspiriert von der reichen äthiopischen Kultur.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/speisekarte"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90 hover:gap-3"
                style={{ background: "var(--eth-yellow)", color: "#1a1a1a" }}
                data-testid="button-hero-speisekarte"
              >
                Speisekarte ansehen
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/anfahrt"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-colors border border-white/30"
                data-testid="button-hero-reservieren"
              >
                Reservieren
              </Link>
            </div>
          </div>
        </div>

        {/* Opening hours ribbon */}
        <div className="absolute bottom-0 left-0 right-0 py-3 text-white text-sm" style={{ background: "rgba(7,137,48,0.92)", backdropFilter: "blur(4px)" }}>
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-start gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-300" />
              <span><strong>Mo:</strong> Ruhetag</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-300" />
              <span><strong>Di – So:</strong> 10:00 – 19:00 Uhr</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-yellow-300" />
              <a href="tel:+491709384822" className="hover:text-yellow-300 transition-colors">+49 170 9384822</a>
            </div>
          </div>
        </div>
      </section>

      {/* Events / Neuigkeiten */}
      <section className="py-16 bg-muted" aria-label="Neuigkeiten und Events">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-1" style={{ background: "var(--eth-green)" }} />
              <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Aktuelles</span>
              <div className="w-8 h-1" style={{ background: "var(--eth-green)" }} />
            </div>
            <h2 className="font-serif text-4xl font-bold text-foreground">Neuigkeiten &amp; Events</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Bleiben Sie auf dem Laufenden über unsere aktuellen Veranstaltungen
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event, i) => (
              <article
                key={event.id}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
                data-testid={`card-event-${event.id}`}
              >
                <div className="h-40 flex items-center justify-center" style={{ background: `linear-gradient(135deg, var(--eth-green) 0%, ${i === 1 ? "var(--eth-yellow)" : i === 2 ? "var(--eth-red)" : "#056b25"} 100%)` }}>
                  <CalendarDays className="w-16 h-16 text-white/60" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--eth-green)" }}>
                    {event.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold mt-1 mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
                  <Link
                    href="/anfahrt"
                    className="inline-flex items-center gap-1 text-sm font-medium mt-4 transition-all hover:gap-2"
                    style={{ color: "var(--eth-green)" }}
                  >
                    Reservieren <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome / about section */}
      <section className="py-20 bg-background" aria-label="Über uns">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1" style={{ background: "var(--eth-green)" }} />
                <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Unser Café</span>
              </div>
              <h2 className="font-serif text-4xl font-bold mb-6 text-foreground">
                Willkommen im<br />Melody Café &amp; Bistro
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Der Name „Melody" steht für Harmonie und Genuss — genau das möchten wir Ihnen bieten. Unser Café &amp; Bistro vereint kulinarische Köstlichkeiten mit einer warmen Atmosphäre, inspiriert von der reichen äthiopischen Kultur.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Wir legen großen Wert auf frische, hochwertige Zutaten und verzichten auf künstliche Zusatzstoffe. Unsere Speisen werden mit Liebe und Sorgfalt zubereitet, damit Sie den besten Geschmack genießen können.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/speisekarte"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90"
                  style={{ background: "var(--eth-green)" }}
                  data-testid="link-speisekarte-welcome"
                >
                  Zur Speisekarte
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/getraenkekarte"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border border-border hover:bg-muted transition-colors"
                  data-testid="link-getraenkekarte-welcome"
                >
                  Getränkekarte
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={ambianceImg}
                alt="Gemütliche Atmosphäre im Café Melody Bonn"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
                loading="lazy"
                width={600}
                height={450}
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ background: "var(--eth-green)" }}>
                    <Star className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">100% Hausgemacht</p>
                    <p className="text-xs text-muted-foreground">Frisch zubereitet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards: Speisekarte + Getränkekarte */}
      <section className="py-16 bg-muted" aria-label="Karten">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/speisekarte" className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all" data-testid="card-link-speisekarte">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={heroImg}
                  alt="Unsere Speisekarte"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
                <div className="absolute bottom-0 left-0 p-5 text-white">
                  <p className="text-xs font-medium uppercase tracking-widest text-green-300 mb-1">Frische Speisen</p>
                  <h3 className="font-serif text-2xl font-bold">Speisekarte</h3>
                  <p className="text-sm text-white/80 mt-1">Entdecken Sie unsere vielfältige Auswahl an hausgemachten Gerichten und äthiopischen Spezialitäten.</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium mt-2" style={{ color: "var(--eth-yellow)" }}>
                    Zur Speisekarte <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/getraenkekarte" className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all" data-testid="card-link-getraenkekarte">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={coffeeImg}
                  alt="Unsere Getränkekarte"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
                <div className="absolute bottom-0 left-0 p-5 text-white">
                  <p className="text-xs font-medium uppercase tracking-widest text-green-300 mb-1">Leckere Getränke</p>
                  <h3 className="font-serif text-2xl font-bold">Getränkekarte</h3>
                  <p className="text-sm text-white/80 mt-1">Genießen Sie frische Säfte, hausgemachte Limonaden und aromatischen äthiopischen Kaffee.</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium mt-2" style={{ color: "var(--eth-yellow)" }}>
                    Zur Getränkekarte <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Daily menu teaser */}
      {todayMenu && todayMenu.items.length > 0 && (
        <section className="py-16" style={{ background: "linear-gradient(135deg, var(--eth-green) 0%, #056b25 100%)" }} aria-label="Tageskarte">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-yellow-300 text-sm font-medium tracking-widest uppercase">Täglich frisch</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-2">Heutige Tageskarte</h2>
              <p className="text-green-200 mt-2">Frisch zubereitet — nur für heute</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {todayMenu.items.slice(0, 3).map((item) => (
                <article key={item.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white border border-white/20" data-testid={`card-daily-${item.id}`}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif font-semibold text-lg">{item.name}</h3>
                    <span className="text-yellow-300 font-bold">{item.price.toFixed(2).replace(".", ",")} €</span>
                  </div>
                  <p className="text-green-100 text-sm leading-relaxed">{item.description}</p>
                  {item.note && <p className="text-xs text-yellow-300 mt-2 italic">{item.note}</p>}
                </article>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/tageskarte"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:gap-3"
                style={{ background: "var(--eth-yellow)", color: "#1a1a1a" }}
                data-testid="button-tageskarte-more"
              >
                Vollständige Tageskarte
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Ethiopian cuisine section */}
      <section className="py-20 bg-background" aria-label="Äthiopische Küche">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={heroImg}
                alt="Authentische äthiopische Küche im Café Melody Bonn"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
                loading="lazy"
                width={600}
                height={450}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1" style={{ background: "var(--eth-yellow)" }} />
                <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Authentisch &amp; Hausgemacht</span>
              </div>
              <h2 className="font-serif text-4xl font-bold mb-6 text-foreground">
                Äthiopische Küche
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Entdecken Sie die authentische äthiopische Küche in Bonn im Café Bistro Melody. Genießen Sie eine gemütliche Atmosphäre für eine echte kulturelle Erfahrung.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Die äthiopische Küche ist eine der ältesten und vielfältigsten Küchen Afrikas. Sie zeichnet sich durch ihre einzigartigen Gewürzmischungen, traditionelle Zubereitungsmethoden und die gemeinschaftliche Art des Essens aus.
              </p>
              <Link
                href="/speisekarte"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: "var(--eth-green)" }}
                data-testid="button-speisekarte-cuisine"
              >
                Zur Speisekarte
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Homemade cakes section */}
      <section className="py-20 bg-muted" aria-label="Kuchen und Getränke">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1" style={{ background: "var(--eth-red)" }} />
                <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Täglich frisch</span>
              </div>
              <h2 className="font-serif text-4xl font-bold mb-6 text-foreground">
                Hausgemachte Kuchen &amp; Getränke
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Verwöhnen Sie sich mit unseren selbstgemachten Kuchen, die täglich frisch gebacken werden. Dazu servieren wir frisch gepresste Säfte und hausgemachte Limonaden.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  { icon: Cake, text: "Wechselnde Kuchenauswahl — täglich frisch gebacken" },
                  { icon: Coffee, text: "Frisch gepresste Säfte aus saisonalem Obst" },
                  { icon: Coffee, text: "Hausgemachte Limonaden und Eistees" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3 text-muted-foreground text-sm">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "var(--eth-green)" }}>
                      <item.icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
              <Link
                href="/getraenkekarte"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: "var(--eth-green)" }}
                data-testid="button-getraenkekarte-cakes"
              >
                Zur Getränkekarte
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div>
              <img
                src={coffeeImg}
                alt="Hausgemachte Kuchen und frische Getränke im Café Melody"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
                loading="lazy"
                width={600}
                height={450}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background" aria-label="Bewertungen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-1" style={{ background: "var(--eth-green)" }} />
              <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Bewertungen</span>
              <div className="w-8 h-1" style={{ background: "var(--eth-green)" }} />
            </div>
            <h2 className="font-serif text-4xl font-bold text-foreground">Was unsere Gäste sagen</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <article key={t.name} className="bg-card border border-border rounded-2xl p-6 shadow-sm" data-testid={`card-testimonial-${i}`}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" style={{ color: "var(--eth-yellow)" }} />
                  ))}
                </div>
                <blockquote className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.text}"</blockquote>
                <p className="font-semibold text-sm">{t.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Location */}
      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, var(--eth-green) 100%)" }} aria-label="Besuchen Sie uns">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Besuchen Sie uns in Bonn</h2>
              <p className="text-green-100 mb-6">Erleben Sie die Harmonie von äthiopischer Kultur und gemütlicher Café-Atmosphäre</p>
              <div className="space-y-4 text-green-100 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 text-yellow-400" />
                  <div>
                    <p className="font-medium text-white">Café Melody Bistro Bonn</p>
                    <p>Werftstraße 5-7, 53117 Bonn-Graurheindorf</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-yellow-400" />
                  <a href="tel:+491709384822" className="hover:text-white transition-colors" data-testid="link-phone-cta">+49 170 9384822</a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-0.5 text-yellow-400" />
                  <div>
                    <p><strong className="text-white">Montag:</strong> Ruhetag</p>
                    <p><strong className="text-white">Di – So:</strong> 10:00 – 19:00 Uhr</p>
                  </div>
                </div>
              </div>
              <Link
                href="/anfahrt"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all"
                style={{ background: "var(--eth-yellow)", color: "#1a1a1a" }}
                data-testid="button-anfahrt-cta"
              >
                Anfahrt &amp; Öffnungszeiten
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-video bg-white/10 flex items-center justify-center border border-white/20">
              <div className="text-center text-white/60">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p className="font-medium text-white/80">Café Melody Bistro Bonn</p>
                <p className="text-sm">Werftstraße 5-7</p>
                <p className="text-sm">53117 Bonn-Graurheindorf</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
