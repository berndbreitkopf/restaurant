import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Coffee, Wine, Beer, Droplets, Sparkles, ChevronRight } from "lucide-react";
import { Link } from "wouter";

interface DrinkItem {
  name: string;
  description?: string;
  price: string;
  highlight?: boolean;
  image?: string;
}

interface DrinkSection {
  category: string;
  icon: React.ElementType;
  description?: string;
  items: DrinkItem[];
  image?: string;
  special?: boolean;
}

const drinkSections: DrinkSection[] = [
  {
    category: "Heiße Getränke",
    icon: Coffee,
    description: "Frisch zubereitete Kaffeespezialitäten und aromatische Tees",
    image: "/images/getraenke/getraenke.jpg",
    items: [
      { name: "Espresso", price: "2,40 €" },
      { name: "Espresso Doppio", price: "3,80 €" },
      { name: "Espresso Macchiato", price: "2,80 €" },
      { name: "Caffé Crema", price: "3,00 €" },
      { name: "Cappuccino", price: "3,90 €" },
      { name: "Cortado", description: "Espresso mit Milch", price: "3,20 €" },
      { name: "Latte Macchiato", price: "3,90 €" },
      { name: "Affogato", description: "Espresso mit Vanilleeis", price: "4,50 €" },
      { name: "Heiße Schokolade", description: "Sahne für +1 €", price: "4,00 €" },
      { name: "Matcha-Chai-Latte", price: "5,00 €" },
      { name: "Chai-Latte", price: "5,00 €" },
      { name: "Bio Teeauswahl", description: "Pfefferminze, Rooibos, Schwarztee, Kräuter, Kamille, Grüntee, Früchtetee", price: "3,20 €" },
      { name: "Frischer Minztee", price: "4,40 €" },
      { name: "Ingwertee mit Honig", price: "4,40 €" },
      { name: "Äthiopischer schwarzer Tee", description: "mit Kardamom, Zimt und Nelken", price: "3,90 €" },
    ],
  },
  {
    category: "Kalte Getränke",
    icon: Droplets,
    description: "Frisch gepresste Säfte und erfrischende Kaltgetränke",
    items: [
      { name: "Rhodius Wasser", description: "Classic / Still", price: "0,25 l: 2,90 € | 0,75 l: 5,90 €" },
      { name: "Softdrinks", description: "Coca Cola, Coca Cola Zero, Fanta", price: "0,2 l: 3,40 €" },
      { name: "Proviant Bio Getränke", description: "Apfelschorle, Rhabarber", price: "0,33 l: 3,90 €" },
      { name: "Frisch gepresster Orangensaft", price: "0,3 l: 4,90 €" },
      { name: "Schweppes", description: "Tonic Water, Ginger Ale", price: "0,2 l: 3,40 €" },
      { name: "Hausgemachter Eistee Pfirsich", price: "4,90 €" },
      { name: "Milkshake", description: "Verschiedene Geschmacksrichtungen", price: "5,90 €", image: "/images/speisekarte/milkshake.jpg" },
    ],
  },
  {
    category: "Biere",
    icon: Beer,
    description: "Ausgewählte Flaschenbiere aus der Region",
    items: [
      { name: "Krombacher Pils", price: "0,33 l: 3,50 €" },
      { name: "Reissdorf Kölsch", price: "0,33 l: 3,50 €" },
      { name: "Krombacher Radler", description: "auch alkoholfrei erhältlich", price: "0,33 l: 3,50 €" },
    ],
  },
  {
    category: "Aperitif & Cocktails",
    icon: Sparkles,
    description: "Spritzige Aperitifs und klassische Cocktails",
    items: [
      { name: "Lillet Wildberry", description: "Lillet, Schweppes Wild Berry, Eis", price: "6,90 €" },
      { name: "Aperol Spritz", description: "Aperol, Prosecco, Soda, Eis", price: "6,90 €" },
      { name: "Mojito", description: "Rum, Limettensaft, Minze, Rohrzucker, Soda", price: "6,90 €" },
    ],
  },
  {
    category: "Weine",
    icon: Wine,
    description: "Südafrikanische Weine von Niederburg",
    items: [
      { name: "Nederburg Chardonnay", description: "Weißwein, Südafrika", price: "0,2 l: 5,90 € | 0,75 l: 20,90 €" },
      { name: "Nederburg Rosé", description: "Rosé, Südafrika", price: "0,2 l: 5,90 € | 0,75 l: 20,90 €" },
      { name: "Nederburg Shiraz", description: "Rotwein, Südafrika", price: "0,2 l: 5,90 € | 0,75 l: 20,90 €" },
    ],
  },
];

const categories = ["Alle", ...drinkSections.map(s => s.category)];

export default function GetraenkekartePage() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const filtered = activeCategory === "Alle" ? drinkSections : drinkSections.filter(s => s.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Getränkekarte — Café Melody Bistro Bonn | Kaffee, Säfte & Weine</title>
        <meta name="description" content="Getränkekarte im Café Melody Bistro Bonn: Kaffeespezialitäten, Bio-Tees, frische Säfte, hausgemachten Eistee, Weine, Biere und die traditionelle äthiopische Kaffeezeremonie. Werftstraße 5-7, Bonn." />
        <meta property="og:title" content="Getränkekarte — Café Melody Bistro Bonn" />
        <meta property="og:description" content="Von Kaffeespezialitäten über hausgemachte Eistees bis zu frisch gepressten Säften — unsere Getränkekarte." />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://cafe-melody-bonn.de/getraenkekarte" />
      </Helmet>

      {/* Hero */}
      <header className="relative py-24 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/getraenke/getraenke.jpg"
            alt="Frische Getränke im Café Melody Bistro Bonn"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(61,31,10,0.82)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
            <span className="cafe-label" style={{ color: "var(--cafe-gold)" }}>Café Melody Bistro</span>
            <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mt-2 mb-4">Getränkekarte</h1>
          <p className="text-white/80 max-w-xl mx-auto text-lg">
            Von aromatischem äthiopischen Kaffee über frisch gepresste Säfte bis zu ausgewählten Weinen
          </p>
        </div>
      </header>

      {/* Kaffeezeremonie Highlight */}
      <section className="py-10" style={{ background: "var(--cafe-brown)" }} aria-labelledby="kaffeezeremonie-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 text-white">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Coffee className="w-6 h-6" style={{ color: "var(--cafe-gold)" }} />
                <span className="cafe-label" style={{ color: "var(--cafe-gold)" }}>Besonderes Erlebnis</span>
              </div>
              <h2 id="kaffeezeremonie-heading" className="font-serif text-3xl md:text-4xl font-bold mb-3">Traditionelle Kaffeezeremonie</h2>
              <p className="text-white/80 leading-relaxed mb-5 max-w-xl">
                Erleben Sie die authentische äthiopische Kaffeezeremonie — der Kaffee wird frisch vor Ihnen geröstet und traditionell dreifach aufgebrüht. Dazu reichen wir Fladenbrot, knuspriges Popcorn und den äthiopischen Snack Kolo.
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold" style={{ color: "var(--cafe-gold)" }}>19,90 €</span>
                <span className="text-white/60 text-sm">für 1–2 Personen</span>
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-64 h-44 rounded-2xl overflow-hidden">
              <img
                src="/images/hero/injera-platter.jpg"
                alt="Äthiopische Kaffeezeremonie im Café Melody Bistro Bonn"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category filters */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0 ${
                  activeCategory === cat ? "text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                style={activeCategory === cat ? { background: "var(--cafe-brown)" } : {}}
                data-testid={`filter-${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {filtered.map(section => (
              <section key={section.category} aria-labelledby={`section-${section.category}`}>
                {/* Section header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white flex-shrink-0" style={{ background: "var(--cafe-brown)" }}>
                    <section.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 id={`section-${section.category}`} className="font-serif text-2xl font-bold" style={{ color: "var(--cafe-brown-dark)" }}>
                      {section.category}
                    </h2>
                    {section.description && (
                      <p className="text-muted-foreground text-sm mt-0.5">{section.description}</p>
                    )}
                  </div>
                </div>

                {/* Items grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {section.items.map((item, idx) => (
                    <article
                      key={idx}
                      className="bg-card border border-border rounded-2xl overflow-hidden hover-lift flex flex-col"
                      data-testid={`drink-${item.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {item.image && (
                        <div className="h-36 overflow-hidden">
                          <img
                            src={item.image}
                            alt={`${item.name} im Café Melody Bistro Bonn`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-4 flex items-start justify-between gap-3 flex-1">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm leading-tight">{item.name}</p>
                          {item.description && (
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                          )}
                        </div>
                        <p className="font-bold text-sm flex-shrink-0 text-right leading-tight" style={{ color: "var(--cafe-brown)" }}>
                          {item.price}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-10 p-4 bg-muted rounded-2xl">
            Alle Preise inkl. MwSt. Änderungen vorbehalten.
          </p>

          {/* CTA */}
          <div className="mt-8 rounded-3xl p-10 text-center text-white" style={{ background: "var(--cafe-brown)" }}>
            <h2 className="font-serif text-2xl font-bold mb-3">Hunger bekommen?</h2>
            <p className="text-white/80 mb-6 max-w-sm mx-auto">Entdecken Sie auch unsere Speisekarte mit hausgemachten äthiopischen Spezialitäten</p>
            <Link
              href="/speisekarte"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all"
              style={{ background: "var(--cafe-gold)", color: "var(--cafe-brown-dark)" }}
            >
              Zur Speisekarte <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
