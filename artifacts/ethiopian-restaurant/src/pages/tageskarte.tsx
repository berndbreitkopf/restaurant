import { Helmet } from "react-helmet-async";
import { useGetTodaysDailyMenu } from "@workspace/api-client-react";
import { Leaf, Clock, ChefHat, Phone, ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function TageskartePage() {
  const { data: dailyMenu, isLoading } = useGetTodaysDailyMenu();

  const today = new Date();
  const formattedDate = today.toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Helmet>
        <title>Tageskarte — Café Melody Bistro Bonn | Tagesempfehlungen</title>
        <meta name="description" content="Heutige Tageskarte im Café Melody Bistro Bonn — täglich frisch zubereitete Spezialitäten vom Küchenchef. Werftstraße 5-7, Di–So 10–19 Uhr." />
        <meta property="og:title" content="Tageskarte — Café Melody Bistro Bonn" />
        <meta property="og:description" content="Tagesfrische äthiopische Spezialitäten — täglich wechselnde Empfehlungen vom Küchenchef." />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://cafe-melody-bonn.de/tageskarte" />
      </Helmet>

      {/* Hero */}
      <header className="relative py-20 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/speisekarte/platte.jpg"
            alt="Tagesfrische äthiopische Spezialitäten im Café Melody Bistro Bonn"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(61,31,10,0.85)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
            <span className="cafe-label" style={{ color: "var(--cafe-gold)" }}>Täglich frisch</span>
            <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mt-2 mb-4">Tageskarte</h1>
          <div className="flex items-center justify-center gap-2 text-white/70">
            <Clock className="w-4 h-4" style={{ color: "var(--cafe-gold)" }} />
            <time dateTime={today.toISOString().split("T")[0]} className="text-sm">{formattedDate}</time>
          </div>
        </div>
      </header>

      <main className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-40 bg-muted rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : dailyMenu && dailyMenu.items.length > 0 ? (
            <>
              {/* Summary bar */}
              <div className="mb-10 p-5 rounded-2xl text-white flex flex-wrap gap-4 justify-between items-center" style={{ background: "var(--cafe-brown)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <ChefHat className="w-5 h-5" style={{ color: "var(--cafe-gold)" }} />
                  </div>
                  <div>
                    <p className="font-semibold">Heutige Tageskarte</p>
                    <p className="text-sm text-white/70">{dailyMenu.totalItems} Gerichte verfügbar</p>
                  </div>
                </div>
                <div className="flex gap-3 text-sm flex-wrap">
                  {dailyMenu.veganCount > 0 && (
                    <span className="flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full">
                      <Leaf className="w-3 h-3" />
                      {dailyMenu.veganCount}× vegan
                    </span>
                  )}
                  {dailyMenu.vegetarianCount > 0 && (
                    <span className="flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full">
                      <span className="text-xs">🥗</span>
                      {dailyMenu.vegetarianCount}× vegetarisch
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-5">
                {dailyMenu.items.map((item, i) => (
                  <article
                    key={item.id}
                    className={`bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover-lift animate-fade-in-up delay-${(i + 1) * 100}`}
                    data-testid={`card-tageskarte-${item.id}`}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <h3 className="font-serif font-bold text-xl">{item.name}</h3>
                            {item.isVegan && (
                              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ background: "var(--cafe-brown)" }}>
                                <Leaf className="w-3 h-3" />
                                Vegan
                              </span>
                            )}
                            {!item.isVegan && item.isVegetarian && (
                              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "var(--cafe-cream)", color: "var(--cafe-brown)" }}>
                                🥗 Vegetarisch
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                          {item.note && (
                            <p className="text-sm italic mt-2" style={{ color: "var(--cafe-terra)" }}>{item.note}</p>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="font-bold text-2xl" style={{ color: "var(--cafe-brown)" }}>
                            {item.price.toFixed(2).replace(".", ",")} €
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10 p-5 rounded-2xl bg-muted border border-border text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Hinweis:</strong> Alle Tagesgerichte werden auf frischem Injera serviert.
                  Die Tageskarte gilt nur solange der Vorrat reicht. Bitte informieren Sie uns über Allergien oder Unverträglichkeiten.
                </p>
              </div>

              <div className="mt-8 text-center">
                <Link href="/speisekarte" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-all" style={{ background: "var(--cafe-brown)" }}>
                  Vollständige Speisekarte <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "var(--cafe-cream)" }}>
                <ChefHat className="w-10 h-10" style={{ color: "var(--cafe-brown)" }} />
              </div>
              <h2 className="font-serif text-2xl font-semibold mb-3" style={{ color: "var(--cafe-brown-dark)" }}>Heute keine Tageskarte</h2>
              <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                Für heute ist keine Tageskarte verfügbar. Bitte schauen Sie unsere vollständige Speisekarte an oder rufen Sie uns an.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/speisekarte"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-all"
                  style={{ background: "var(--cafe-brown)" }}
                  data-testid="link-speisekarte-tageskarte"
                >
                  Zur Speisekarte <ChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+491709384822"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-border hover:bg-muted transition-all"
                  data-testid="link-phone-tageskarte"
                >
                  <Phone className="w-4 h-4" />
                  +49 170 9384822
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
