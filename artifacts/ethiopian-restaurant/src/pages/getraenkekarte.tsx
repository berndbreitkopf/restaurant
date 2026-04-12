import { Helmet } from "react-helmet-async";
import { Coffee, Wine, Beer, Droplets } from "lucide-react";

const drinkSections = [
  {
    category: "Heiße Getränke",
    icon: Coffee,
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
    items: [
      { name: "Rhodius Wasser", description: "Classic / Still", price: "0,25l: 2,90 € | 0,75l: 5,90 €" },
      { name: "Softdrinks", description: "Coca Cola, Coca Cola Zero, Fanta", price: "0,2l: 3,40 €" },
      { name: "Proviant Bio Getränke", description: "Apfelschorle, Rhabarber", price: "0,33l: 3,90 €" },
      { name: "Frisch gepresster Orangensaft", price: "0,3l: 4,90 €" },
      { name: "Schweppes", description: "Tonic Water, Ginger Ale", price: "0,2l: 3,40 €" },
      { name: "Hausgemachter Eistee Pfirsich", price: "4,90 €" },
    ],
  },
  {
    category: "Flaschenbiere",
    icon: Beer,
    items: [
      { name: "Krombacher Pils", price: "0,33l: 3,50 €" },
      { name: "Reissdorf Kölsch", price: "0,33l: 3,50 €" },
      { name: "Krombacher Radler", description: "auch alkoholfrei", price: "0,33l: 3,50 €" },
    ],
  },
  {
    category: "Aperitif",
    icon: Wine,
    items: [
      { name: "Lillet Wildberry", description: "Lillet, Schweppes Wild Berry, Eis", price: "6,90 €" },
      { name: "Aperol Spritz", description: "Aperol, Prosecco, Soda, Eis", price: "6,90 €" },
      { name: "Mojito", description: "Rum, Limettensaft, Minze, Rohrzucker, Soda", price: "6,90 €" },
    ],
  },
  {
    category: "Weine",
    icon: Wine,
    items: [
      { name: "Nederburg Chardonnay", price: "0,2l: 5,90 € | 0,75l: 20,90 €" },
      { name: "Nederburg Rosé", price: "0,2l: 5,90 € | 0,75l: 20,90 €" },
      { name: "Nederburg Shiraz", price: "0,2l: 5,90 € | 0,75l: 20,90 €" },
    ],
  },
  {
    category: "Äthiopischer Kaffee",
    icon: Coffee,
    special: true,
    items: [
      { name: "Traditionelle Kaffeezeremonie", description: "Erleben Sie die authentische äthiopische Kaffeezeremonie – frisch geröstet und traditionell zubereitet. Ein kulturelles Erlebnis für zwei Personen.", price: "12,90 € für 2 Personen", highlight: true },
    ],
  },
];

export default function GetraenkekartePage() {
  return (
    <>
      <Helmet>
        <title>Getränkekarte — Café Melody Bistro Bonn | Kaffee, Säfte & mehr</title>
        <meta name="description" content="Getränkekarte im Café Melody Bistro Bonn: Kaffeespezialitäten, Bio-Tees, frisch gepresste Säfte, hausgemachten Eistee, Weine, Biere und die traditionelle äthiopische Kaffeezeremonie." />
        <meta property="og:title" content="Getränkekarte — Café Melody Bistro Bonn" />
        <meta property="og:description" content="Von Kaffeespezialitäten über hausgemachte Eistees bis zu frisch gepressten Säften — unsere Getränkekarte." />
        <link rel="canonical" href="https://cafe-melody-bonn.de/getraenkekarte" />
      </Helmet>

      <header className="py-16 text-white" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, var(--eth-green) 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-yellow-300 text-sm font-medium tracking-widest uppercase">Café Melody Bistro</span>
          <h1 className="font-serif text-5xl font-bold mt-2 mb-4">Getränkekarte</h1>
          <p className="text-green-100 max-w-xl mx-auto">
            Von aromatischem äthiopischen Kaffee über frisch gepresste Säfte bis zu ausgewählten Weinen
          </p>
        </div>
      </header>

      <main className="py-12 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Special highlight: Kaffeezeremonie */}
          <div className="mb-12 p-6 rounded-2xl text-white" style={{ background: "linear-gradient(135deg, var(--eth-green) 0%, #056b25 100%)" }}>
            <div className="flex items-center gap-3 mb-2">
              <Coffee className="w-6 h-6 text-yellow-300" />
              <span className="text-yellow-300 text-xs font-semibold uppercase tracking-widest">Besonderes Erlebnis</span>
            </div>
            <h2 className="font-serif text-3xl font-bold mb-2">Traditionelle Kaffeezeremonie</h2>
            <p className="text-green-100 leading-relaxed mb-4 max-w-2xl">
              Erleben Sie die authentische äthiopische Kaffeezeremonie – frisch geröstet und traditionell zubereitet. Ein kulturelles Erlebnis für zwei Personen.
            </p>
            <p className="text-2xl font-bold text-yellow-300">12,90 € für 2 Personen</p>
          </div>

          {drinkSections.filter(s => s.category !== "Äthiopischer Kaffee").map(section => (
            <section key={section.category} className="mb-10" aria-labelledby={`drinks-${section.category}`}>
              <h2
                id={`drinks-${section.category}`}
                className="font-serif text-2xl font-bold mb-4 pb-3 border-b-2 flex items-center gap-3"
                style={{ borderColor: "var(--eth-green)" }}
              >
                <section.icon className="w-6 h-6" style={{ color: "var(--eth-green)" }} />
                {section.category}
              </h2>
              <div className="space-y-0 divide-y divide-border rounded-2xl border border-border overflow-hidden bg-card">
                {section.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-4 p-4 hover:bg-muted/50 transition-colors"
                    data-testid={`drink-${item.name.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{item.name}</p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                      )}
                    </div>
                    <p className="font-bold text-sm flex-shrink-0 text-right" style={{ color: "var(--eth-green)" }}>
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <p className="text-center text-sm text-muted-foreground mt-6 p-4 bg-muted rounded-xl">
            Alle Preise inkl. MwSt. Änderungen vorbehalten.
          </p>
        </div>
      </main>
    </>
  );
}
