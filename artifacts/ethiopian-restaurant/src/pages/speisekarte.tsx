import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useGetMenuItems, useGetMenuCategories } from "@workspace/api-client-react";
import { Leaf, Wheat, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const staticMenuSections = [
  {
    category: "Frühstück",
    items: [
      { name: "Gemischte Frühstücksplatte", description: "Knusprige Bäckerbrötchen mit Butter, feiner Käseauswahl, herzhaften Wurstsorten, frischer Gurke, Tomate und Salat – dazu süße Klassiker wie Honig und Konfitüre sowie ein locker gebratenes Rührei.", priceDisplay: "1 Person: 16,90 € | 2 Personen: 29,90 €", isVegan: false, isVegetarian: false },
      { name: "Süßes Frühstück", description: "Ein zartes Bäckercroissant mit feiner Konfitüre und cremiger Butter.", priceDisplay: "4,90 €", isVegan: false, isVegetarian: true },
      { name: "Rührei mit Sucuk", description: "Herzhaftes Rührei mit würziger Sucuk, serviert mit einem frischen Bäckerbrötchen – ein kräftiger Start in den Tag mit orientalischer Note.", priceDisplay: "10,90 €", isVegan: false, isVegetarian: false },
    ],
  },
  {
    category: "Mittagstisch",
    items: [
      { name: "Mittagsgerichte", description: "Freu dich auf wechselnde Mittagsgerichte mit saisonalen Zutaten – mal klassisch, mal kreativ, aber immer hausgemacht und mit Liebe gekocht. Bitte fragt unser Team nach dem aktuellen Angebot.", priceDisplay: "Täglich wechselnd", isVegan: false, isVegetarian: false },
    ],
  },
  {
    category: "Suppe",
    items: [
      { name: "Wechselnde Tagessuppe", description: "Täglich frisch zubereitet – eine wärmende Portion Hausgemachtes, inspiriert von saisonalen Zutaten.", priceDisplay: "7,90 € | mit Hähnchenspieß: 14,80 €", isVegan: false, isVegetarian: false },
    ],
  },
  {
    category: "Salate",
    items: [
      { name: "Chef's Salat", description: "Unser bunter Klassiker: knackiger Babyspinat, Rote Bete, Radieschen, Tomaten und Karotten – serviert in einer großzügigen Bowl, dazu ein leichtes hausgemachtes Dressing.", priceDisplay: "9,90 € | mit Falafel: 14,80 € | mit Hähnchenspieß: 16,80 €", isVegan: true, isVegetarian: true },
    ],
  },
  {
    category: "Vorspeisen",
    items: [
      { name: "Sambusa", description: "3 knusprige Teigtaschen, gefüllt mit Linsen oder Gemüse.", priceDisplay: "6,90 €", isVegan: true, isVegetarian: true },
      { name: "Dips", description: "2 hausgemachte und abwechslungsreiche Dips, serviert mit Fladenbrot – z.B. Hummus oder fruchtige Salsa.", priceDisplay: "5,90 €", isVegan: true, isVegetarian: true },
      { name: "Gefüllte Weinblätter", description: "6 Stück traditionell hausgemacht – zart gerollte Weinblätter mit würziger Füllung.", priceDisplay: "5,00 €", isVegan: false, isVegetarian: true },
    ],
  },
  {
    category: "Hauptgerichte",
    items: [
      { name: "Äthiopische Platte", description: "Eine kulinarische Reise in die Vielfalt der äthiopischen Küche: wechselnde, hausgemachte Spezialitäten – liebevoll angerichtet auf einer bunten Platte, serviert im Korb und begleitet von traditionellem Fladenbrot. Auf Wunsch vegetarisch oder vegan erhältlich.", priceDisplay: "1 Person: 16,90 € | 2 Personen: 29,90 €", isVegan: false, isVegetarian: false, highlight: true },
      { name: "Falafel", description: "Fünf hausgemachte, goldbraun gebackene Falafel – außen knusprig, innen weich und würzig. Dazu reichen wir frischen Salat, cremigen Hummus und traditionelles Fladenbrot.", priceDisplay: "14,90 €", isVegan: true, isVegetarian: true },
      { name: "Ziegenkäse mit Trüffelhonig", description: "Warmer Ziegenkäse, veredelt mit feinem Trüffelhonig, dazu reichen wir frischen Salat – eine besondere Köstlichkeit.", priceDisplay: "13,90 €", isVegan: false, isVegetarian: true },
      { name: "Hähnchenbrustspieße", description: "Zwei saftig gegrillte Hähnchenspieße mit feiner Marinade – aromatisch gewürzt und zart auf den Punkt gegart. Dazu servieren wir duftenden Gewürzreis und Gemüse der Saison.", priceDisplay: "15,90 €", isVegan: false, isVegetarian: false },
      { name: "Spaghetti Bolognese", description: "Der Klassiker auf äthiopische Art mit Fladenbrot serviert.", priceDisplay: "12,90 €", isVegan: false, isVegetarian: false },
      { name: "Rinderstreifen mit Gewürzreis", description: "Zarte Rinderstreifen mit buntem Gemüse in einer aromatischen Tomatensauce – herzhaft, hausgemacht und voller Geschmack.", priceDisplay: "16,90 €", isVegan: false, isVegetarian: false },
    ],
  },
  {
    category: "Kaffeezeremonie",
    items: [
      { name: "Äthiopische Kaffeezeremonie", description: "Erlebe ein Stück äthiopischer Kultur — der Kaffee wird frisch vor dir geröstet und traditionell zubereitet – intensiv, aromatisch und mit besonderem Flair. Dazu reichen wir Fladenbrot, knuspriges Popcorn und den traditionellen äthiopischen Snack Kolo – ein geselliges Ritual zum Genießen und Teilen.", priceDisplay: "19,90 €", isVegan: true, isVegetarian: true, highlight: true },
    ],
  },
];

export default function SpeisekartePage() {
  const { data: menuItems, isLoading } = useGetMenuItems();
  const { data: categories } = useGetMenuCategories();
  const [activeSection, setActiveSection] = useState<string>("Alle");

  const dbCategories = categories?.map(c => c.category) ?? [];
  const allSections = ["Alle", ...staticMenuSections.map(s => s.category)];

  const filteredSections = activeSection === "Alle"
    ? staticMenuSections
    : staticMenuSections.filter(s => s.category === activeSection);

  return (
    <>
      <Helmet>
        <title>Speisekarte — Café Melody Bistro Bonn | Äthiopische Spezialitäten</title>
        <meta name="description" content="Unsere Speisekarte im Café Melody Bistro Bonn: Frühstück, äthiopische Platte, Falafel, Sambusa, Hähnchenspieße, Ziegenkäse und mehr. Täglich frisch zubereitet." />
        <meta property="og:title" content="Speisekarte — Café Melody Bistro Bonn" />
        <meta property="og:description" content="Entdecken Sie unsere vielfältige Speisekarte mit hausgemachten Gerichten und äthiopischen Spezialitäten." />
        <link rel="canonical" href="https://cafe-melody-bonn.de/speisekarte" />
      </Helmet>

      <header className="py-16 text-white" style={{ background: "linear-gradient(135deg, var(--eth-green) 0%, #056b25 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-yellow-300 text-sm font-medium tracking-widest uppercase">Café Melody Bistro</span>
          <h1 className="font-serif text-5xl font-bold mt-2 mb-4">Speisekarte</h1>
          <p className="text-green-100 max-w-xl mx-auto">
            Unsere Speisen werden mit Liebe und Sorgfalt zubereitet — frische, hochwertige Zutaten, keine künstlichen Zusatzstoffe
          </p>
        </div>
      </header>

      {/* Dietary legend */}
      <div className="bg-muted border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center">
            <span className="flex items-center gap-1.5">
              <Leaf className="w-4 h-4" style={{ color: "var(--eth-green)" }} />
              Vegan
            </span>
            <span className="flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-400" />
              Vegetarisch
            </span>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="sticky top-16 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {allSections.map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeSection === section
                    ? "text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                style={activeSection === section ? { background: "var(--eth-green)" } : {}}
                data-testid={`filter-${section.toLowerCase().replace(/\s/g, "-")}`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredSections.map(section => (
            <section key={section.category} className="mb-12" aria-labelledby={`section-${section.category}`}>
              <h2
                id={`section-${section.category}`}
                className="font-serif text-2xl font-bold mb-6 pb-3 border-b-2 flex items-center gap-3"
                style={{ borderColor: "var(--eth-green)" }}
              >
                {section.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map(item => (
                  <article
                    key={item.name}
                    className={`p-5 rounded-2xl border transition-all hover:shadow-md ${
                      (item as any).highlight
                        ? "border-green-200 bg-green-50"
                        : "border-border bg-card"
                    }`}
                    data-testid={`menu-item-${item.name.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-base leading-tight">
                        {item.name}
                        {(item as any).highlight && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-medium text-white" style={{ background: "var(--eth-green)" }}>
                            Empfehlung
                          </span>
                        )}
                      </h3>
                      <div className="flex gap-1 flex-shrink-0">
                        {item.isVegan && <Leaf className="w-4 h-4 flex-shrink-0" style={{ color: "var(--eth-green)" }} aria-label="Vegan" />}
                        {!item.isVegan && item.isVegetarian && <Leaf className="w-4 h-4 flex-shrink-0 text-emerald-400" aria-label="Vegetarisch" />}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">{item.description}</p>
                    <p className="font-bold text-sm" style={{ color: "var(--eth-green)" }}>{item.priceDisplay}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}

          {/* DB managed additional items */}
          {menuItems && menuItems.filter(i => !staticMenuSections.some(s => s.items.some(si => si.name === i.name))).length > 0 && (
            <section className="mb-12" aria-labelledby="section-weitere">
              <h2 id="section-weitere" className="font-serif text-2xl font-bold mb-6 pb-3 border-b-2" style={{ borderColor: "var(--eth-green)" }}>
                Weitere Gerichte
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuItems.filter(i => !staticMenuSections.some(s => s.items.some(si => si.name === i.name))).map(item => (
                  <article key={item.id} className="p-5 rounded-2xl border border-border bg-card" data-testid={`db-menu-item-${item.id}`}>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-base">{item.name}</h3>
                      <div className="flex gap-1">
                        {item.isVegan && <Leaf className="w-4 h-4" style={{ color: "var(--eth-green)" }} aria-label="Vegan" />}
                        {!item.isVegan && item.isVegetarian && <Leaf className="w-4 h-4 text-emerald-400" aria-label="Vegetarisch" />}
                        {item.isGlutenFree && <Wheat className="w-4 h-4 text-amber-500" aria-label="Glutenfrei" />}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">{item.description}</p>
                    <p className="font-bold text-sm" style={{ color: "var(--eth-green)" }}>{item.price.toFixed(2).replace(".", ",")} €</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <div className="mt-8 p-6 rounded-2xl text-center" style={{ background: "linear-gradient(135deg, var(--eth-green) 0%, #056b25 100%)" }}>
            <p className="text-white font-medium mb-2">Reservierung empfohlen</p>
            <p className="text-green-100 text-sm mb-4">Sichern Sie sich Ihren Tisch — wir freuen uns auf Sie!</p>
            <Link
              href="/anfahrt"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: "var(--eth-yellow)", color: "#1a1a1a" }}
            >
              Tisch reservieren <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
