import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { useGetTodaysDailyMenu, useGetMenuItems } from "@workspace/api-client-react";
import { ChevronRight, Leaf, Clock, Phone, MapPin, Star } from "lucide-react";
import heroImg from "@/assets/images/hero.png";
import doroWatImg from "@/assets/images/doro-wat.png";
import misirWatImg from "@/assets/images/misir-wat.png";
import tibsImg from "@/assets/images/tibs.png";
import habeschaImg from "@/assets/images/habesha-platte.png";
import ambianceImg from "@/assets/images/ambiance-1.png";
import coffeeImg from "@/assets/images/coffee-ceremony.png";

const featuredDishes = [
  { name: "Doro Wat", description: "Würziger Hühner-Eintopf nach Familienrezept", price: "15,90 €", img: doroWatImg, tag: "Klassiker" },
  { name: "Misir Wat", description: "Rote Linsen in Berbere-Sauce — vegan", price: "12,90 €", img: misirWatImg, tag: "Vegan" },
  { name: "Tibs", description: "Angebratenes Rindfleisch mit Zwiebeln", price: "17,90 €", img: tibsImg, tag: "Beliebt" },
  { name: "Habesha Platte", description: "Kombination fur 2 Personen", price: "34,90 €", img: habeschaImg, tag: "Fur 2" },
];

const testimonials = [
  { name: "Maria S.", text: "Das beste äthiopische Restaurant in Bonn! Das Doro Wat ist einfach unglaublich.", rating: 5 },
  { name: "Thomas K.", text: "Wunderbare Atmosphare und authentisches Essen. Wir kommen immer wieder.", rating: 5 },
  { name: "Anika L.", text: "Als Veganerin bin ich begeistert — so viele leckere Optionen! Misir Wat ist ein Traum.", rating: 5 },
];

export default function HomePage() {
  const { data: todayMenu } = useGetTodaysDailyMenu();
  const { data: menuItems } = useGetMenuItems();

  return (
    <>
      <Helmet>
        <title>Habesha Restaurant Bonn — Authentische Äthiopische Küche</title>
        <meta name="description" content="Habesha Restaurant Bonn — Erleben Sie authentische äthiopische Küche mit traditionellen Gerichten wie Doro Wat, Injera und mehr. Täglich frische Tageskarte. Jetzt Tisch reservieren!" />
        <meta property="og:title" content="Habesha Restaurant Bonn — Authentische Äthiopische Küche" />
        <meta property="og:description" content="Authentische äthiopische Küche im Herzen von Bonn. Traditionelle Gerichte, warme Atmosphäre, täglich frische Tageskarte." />
        <meta property="og:type" content="restaurant" />
        <meta property="og:url" content="https://habesha-bonn.de/" />
        <link rel="canonical" href="https://habesha-bonn.de/" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center overflow-hidden" aria-label="Hero">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Traditionelles äthiopisches Festessen mit Injera" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(7,137,48,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(218,18,26,0.6) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-1" style={{ background: "var(--eth-yellow)" }} />
              <span className="text-yellow-300 text-sm font-medium tracking-widest uppercase">Willkommen</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Habesha<br />
              <span style={{ color: "var(--eth-yellow)" }}>Restaurant</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-2 font-light">
              Authentische äthiopische Küche im Herzen von Bonn
            </p>
            <p className="text-base text-white/75 mb-8 leading-relaxed max-w-lg">
              Entdecken Sie die reichen Aromen Äthiopiens. Traditionell auf Injera serviert — ein gemeinschaftliches Erlebnis fur die ganze Familie.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/speisekarte"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90 hover:gap-3"
                style={{ background: "var(--eth-yellow)", color: "#1a1a1a" }}
                data-testid="button-hero-speisekarte"
              >
                Zur Speisekarte
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tageskarte"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-colors border border-white/30"
                data-testid="button-hero-tageskarte"
              >
                Tageskarte ansehen
              </Link>
            </div>
          </div>
        </div>

        {/* Opening hours ribbon */}
        <div className="absolute bottom-0 left-0 right-0 py-3 text-white text-sm" style={{ background: "rgba(7,137,48,0.9)", backdropFilter: "blur(4px)" }}>
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-start gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-300" />
              <span><strong>Mo–Fr:</strong> 12:00–14:30 & 17:00–22:00 Uhr</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-300" />
              <span><strong>Sa–So:</strong> 12:00–22:30 Uhr</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-yellow-300" />
              <a href="tel:+4922812345678" className="hover:text-yellow-300 transition-colors">+49 228 12345678</a>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome section */}
      <section className="py-20 bg-background" aria-label="Begrüßung">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1" style={{ background: "var(--eth-green)" }} />
                <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Unsere Geschichte</span>
              </div>
              <h2 className="font-serif text-4xl font-bold mb-6 text-foreground">
                Ein Stück Äthiopien<br />in Bonn
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Im Habesha Restaurant laden wir Sie ein, die reichen Traditionen und Aromen der äthiopischen Küche zu entdecken. Unser Name "Habesha" bedeutet auf Amharisch "Äthiopier" — und genau das verkörpern wir mit jedem Gericht.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Alle unsere Gerichte werden traditionell auf frischem Injera — dem charakteristischen äthiopischen Sauerteigfladenbrot — serviert. Das gemeinsame Essen von einem großen Teller ist für uns mehr als nur eine Mahlzeit: Es ist eine Einladung zur Gemeinschaft.
              </p>
              <Link
                href="/uber-uns"
                className="inline-flex items-center gap-2 font-medium text-sm transition-all hover:gap-3"
                style={{ color: "var(--eth-green)" }}
                data-testid="link-uber-uns"
              >
                Mehr über uns erfahren
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <img
                src={ambianceImg}
                alt="Gemütliche Atmosphäre im Habesha Restaurant Bonn"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
                loading="lazy"
                width={600}
                height={450}
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-scale-in">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ background: "var(--eth-green)" }}>
                    <Star className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{menuItems?.length ?? 12} Gerichte</p>
                    <p className="text-xs text-muted-foreground">Authentische Rezepte</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Today's daily menu teaser */}
      {todayMenu && todayMenu.items.length > 0 && (
        <section className="py-16" style={{ background: "linear-gradient(135deg, var(--eth-green) 0%, #056b25 100%)" }} aria-label="Tageskarte">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-yellow-300 text-sm font-medium tracking-widest uppercase">Heutige Empfehlung</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-2">Tageskarte</h2>
              <p className="text-green-200 mt-2">Frisch zubereitet — nur fur heute</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {todayMenu.items.slice(0, 3).map((item, i) => (
                <article key={item.id} className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white border border-white/20 animate-fade-in-up delay-${(i + 1) * 100}`} data-testid={`card-daily-${item.id}`}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif font-semibold text-lg">{item.name}</h3>
                    <span className="text-yellow-300 font-bold text-lg">{item.price.toFixed(2).replace(".", ",")} €</span>
                  </div>
                  <p className="text-green-100 text-sm leading-relaxed mb-3">{item.description}</p>
                  {item.isVegan && (
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-900/50 text-green-200">
                      <Leaf className="w-3 h-3" />
                      Vegan
                    </span>
                  )}
                  {item.note && (
                    <p className="text-xs text-yellow-300 mt-2 italic">{item.note}</p>
                  )}
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

      {/* Featured dishes */}
      <section className="py-20 bg-background" aria-label="Empfohlene Gerichte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-1" style={{ background: "var(--eth-red)" }} />
              <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Unsere Küche</span>
              <div className="w-8 h-1" style={{ background: "var(--eth-red)" }} />
            </div>
            <h2 className="font-serif text-4xl font-bold text-foreground">Beliebte Gerichte</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Entdecken Sie unsere meistbestellten traditionellen Gerichte — alle handgemacht mit frischen Gewürzen
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish, i) => (
              <article key={dish.name} className={`group rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up delay-${(i + 1) * 100}`} data-testid={`card-dish-${dish.name.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={dish.img}
                    alt={dish.name + " — äthiopisches Gericht"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={400}
                    height={300}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs px-3 py-1 rounded-full font-medium text-white" style={{ background: "var(--eth-green)" }}>
                      {dish.tag}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-semibold text-lg mb-1">{dish.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{dish.description}</p>
                  <p className="font-bold text-lg" style={{ color: "var(--eth-green)" }}>{dish.price}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/speisekarte"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90 hover:gap-3"
              style={{ background: "var(--eth-green)" }}
              data-testid="button-full-menu"
            >
              Zur vollständigen Speisekarte
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ethiopian culture section */}
      <section className="py-20 bg-muted" aria-label="Äthiopische Kultur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={coffeeImg}
                alt="Traditionelle äthiopische Kaffezeremonie im Habesha Restaurant"
                className="rounded-2xl shadow-xl w-full object-cover aspect-video"
                loading="lazy"
                width={600}
                height={340}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-1" style={{ background: "var(--eth-yellow)" }} />
                <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Tradition & Kultur</span>
              </div>
              <h2 className="font-serif text-4xl font-bold mb-6 text-foreground">
                Die Kaffeezeremonie
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Äthiopien ist das Geburtsland des Kaffees. Die traditionelle Kaffezeremonie ist eine heilige Tradition: Der Kaffee wird frisch gerostet, gemahlen und dreimal gebrüht — Abol, Tona und Baraka.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Bei uns können Sie diese Zeremonie authentisch erleben und unseren Bunna — äthiopischen Kaffee — in traditionellen Tassen genießen, begleitet von frisch gebackenem Popcorn oder Nüssen.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { num: "12+", label: "Authentische Gerichte" },
                  { num: "3", label: "Kaffee-Zeremonien/Tag" },
                  { num: "100%", label: "Handgemacht" },
                ].map(stat => (
                  <div key={stat.label} className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <p className="font-serif text-2xl font-bold" style={{ color: "var(--eth-green)" }}>{stat.num}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
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
              <article key={t.name} className={`bg-card border border-border rounded-2xl p-6 shadow-sm animate-fade-in-up delay-${(i + 1) * 100}`} data-testid={`card-testimonial-${i}`}>
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

      {/* Location / CTA */}
      <section className="py-16 text-white" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, var(--eth-green) 100%)" }} aria-label="Anfahrt und Kontakt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Besuchen Sie uns in Bonn</h2>
              <div className="space-y-4 text-green-100">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 text-yellow-400" />
                  <div>
                    <p className="font-medium text-white">Habesha Restaurant Bonn</p>
                    <p>Musterstrasse 42, 53111 Bonn</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-yellow-400" />
                  <a href="tel:+4922812345678" className="hover:text-white transition-colors" data-testid="link-phone-cta">+49 228 12345678</a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-0.5 text-yellow-400" />
                  <div>
                    <p><strong className="text-white">Mo–Fr:</strong> 12:00–14:30 & 17:00–22:00 Uhr</p>
                    <p><strong className="text-white">Sa–So:</strong> 12:00–22:30 Uhr</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all"
                  style={{ background: "var(--eth-yellow)", color: "#1a1a1a" }}
                  data-testid="button-kontakt-cta"
                >
                  Tisch reservieren
                </Link>
                <Link
                  href="/speisekarte"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-white/15 hover:bg-white/25 transition-colors border border-white/30"
                  data-testid="button-speisekarte-cta"
                >
                  Speisekarte
                </Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-video bg-white/10 flex items-center justify-center">
              <div className="text-center text-white/60">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Musterstrasse 42, 53111 Bonn</p>
                <p className="text-xs mt-1">Kartenansicht hier</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
