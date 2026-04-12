import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useGetMenuItems } from "@workspace/api-client-react";
import { Leaf, Wheat, Star, ChevronRight } from "lucide-react";
import { Link } from "wouter";

interface MenuItem {
  name: string;
  description: string;
  priceDisplay: string;
  isVegan: boolean;
  isVegetarian: boolean;
  isGlutenFree?: boolean;
  highlight?: boolean;
  image?: string;
}

interface MenuSection {
  category: string;
  items: MenuItem[];
}

const staticMenuSections: MenuSection[] = [
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
      { name: "Mittagsgerichte", description: "Freu dich auf wechselnde Mittagsgerichte mit saisonalen Zutaten — mal klassisch, mal kreativ, aber immer hausgemacht und mit Liebe gekocht. Bitte fragt unser Team nach dem aktuellen Angebot.", priceDisplay: "Täglich wechselnd", isVegan: false, isVegetarian: false },
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
      { name: "Sambusa", description: "3 knusprige Teigtaschen, gefüllt mit Linsen oder Gemüse.", priceDisplay: "6,90 €", isVegan: true, isVegetarian: true, image: "/images/speisekarte/sambusa.jpg" },
      { name: "Dips", description: "2 hausgemachte und abwechslungsreiche Dips, serviert mit Fladenbrot – z.B. Hummus oder fruchtige Salsa.", priceDisplay: "5,90 €", isVegan: true, isVegetarian: true, image: "/images/speisekarte/dips.jpg" },
      { name: "Gefüllte Weinblätter", description: "6 Stück traditionell hausgemacht – zart gerollte Weinblätter mit würziger Füllung.", priceDisplay: "5,00 €", isVegan: false, isVegetarian: true, image: "/images/speisekarte/sarma.jpg" },
    ],
  },
  {
    category: "Hauptgerichte",
    items: [
      { name: "Äthiopische Platte", description: "Eine kulinarische Reise in die Vielfalt der äthiopischen Küche: wechselnde, hausgemachte Spezialitäten – liebevoll angerichtet auf einer bunten Platte, serviert im Korb und begleitet von traditionellem Fladenbrot. Auf Wunsch vegetarisch oder vegan erhältlich.", priceDisplay: "1 Person: 16,90 € | 2 Personen: 29,90 €", isVegan: false, isVegetarian: false, highlight: true, image: "/images/speisekarte/platte.jpg" },
      { name: "Falafel", description: "Fünf hausgemachte, goldbraun gebackene Falafel – außen knusprig, innen weich und würzig. Dazu reichen wir frischen Salat, cremigen Hummus und traditionelles Fladenbrot.", priceDisplay: "14,90 €", isVegan: true, isVegetarian: true, image: "/images/speisekarte/falafel.jpg" },
      { name: "Ziegenkäse mit Trüffelhonig", description: "Warmer Ziegenkäse, veredelt mit feinem Trüffelhonig, dazu reichen wir frischen Salat – eine besondere Köstlichkeit.", priceDisplay: "13,90 €", isVegan: false, isVegetarian: true, image: "/images/speisekarte/ziegenkaese.png" },
      { name: "Hähnchenbrustspieße", description: "Zwei saftig gegrillte Hähnchenspieße mit feiner Marinade – aromatisch gewürzt und zart auf den Punkt gegart. Dazu servieren wir duftenden Gewürzreis und Gemüse der Saison.", priceDisplay: "15,90 €", isVegan: false, isVegetarian: false, image: "/images/speisekarte/huhn.jpg" },
      { name: "Spaghetti Bolognese", description: "Der Klassiker auf äthiopische Art mit Fladenbrot serviert.", priceDisplay: "12,90 €", isVegan: false, isVegetarian: false, image: "/images/speisekarte/spaghetti.jpg" },
      { name: "Rinderstreifen mit Gewürzreis", description: "Zarte Rinderstreifen mit buntem Gemüse in einer aromatischen Tomatensauce – herzhaft, hausgemacht und voller Geschmack.", priceDisplay: "16,90 €", isVegan: false, isVegetarian: false, image: "/images/speisekarte/rinderstreifen.png" },
    ],
  },
  {
    category: "Kaffeezeremonie",
    items: [
      { name: "Äthiopische Kaffeezeremonie", description: "Erlebe ein Stück äthiopischer Kultur — der Kaffee wird frisch vor dir geröstet und traditionell zubereitet – intensiv, aromatisch und mit besonderem Flair. Dazu reichen wir Fladenbrot, knuspriges Popcorn und den traditionellen äthiopischen Snack Kolo.", priceDisplay: "19,90 €", isVegan: true, isVegetarian: true, highlight: true },
    ],
  },
  {
    category: "Dessert & Kuchen",
    items: [
      { name: "Hausgemachter Kuchen", description: "Täglich wechselndes Angebot frisch gebackener Kuchen — bitte fragt nach der heutigen Auswahl.", priceDisplay: "Ab 4,50 €", isVegan: false, isVegetarian: true, image: "/images/events/kuchen.jpg" },
      { name: "Waffel", description: "Knusprige Waffel nach Wahl — mit Puderzucker, Sahne oder frischen Früchten.", priceDisplay: "6,90 €", isVegan: false, isVegetarian: true, image: "/images/speisekarte/waffel.jpg" },
      { name: "Eisbecher", description: "Cremige Eisbecherkombinationen aus hausgemachtem Speiseeis.", priceDisplay: "Ab 5,90 €", isVegan: false, isVegetarian: true, image: "/images/speisekarte/eis.jpg" },
      { name: "Milkshake", description: "Cremige Milchshakes in verschiedenen Geschmacksrichtungen.", priceDisplay: "5,90 €", isVegan: false, isVegetarian: true, image: "/images/speisekarte/milkshake.jpg" },
      { name: "Eiscafé", description: "Heißer Espresso über feinem Vanilleeis — ein klassischer Genuss.", priceDisplay: "4,90 €", isVegan: false, isVegetarian: true, image: "/images/speisekarte/eiscafe.jpg" },
    ],
  },
];

export default function SpeisekartePage() {
  const { data: menuItems } = useGetMenuItems();
  const [activeSection, setActiveSection] = useState<string>("Alle");

  const allSections = ["Alle", ...staticMenuSections.map(s => s.category)];

  const filteredSections = activeSection === "Alle"
    ? staticMenuSections
    : staticMenuSections.filter(s => s.category === activeSection);

  return (
    <>
      <Helmet>
        <title>Speisekarte — Café Melody Bistro Bonn | Äthiopische Spezialitäten</title>
        <meta name="description" content="Unsere Speisekarte im Café Melody Bistro Bonn: Frühstück, äthiopische Platte, Falafel, Sambusa, Hähnchenspieße, Ziegenkäse, Desserts und mehr. Täglich frisch zubereitet." />
        <meta property="og:title" content="Speisekarte — Café Melody Bistro Bonn" />
        <meta property="og:description" content="Entdecken Sie unsere vielfältige Speisekarte mit hausgemachten Gerichten und äthiopischen Spezialitäten." />
        <link rel="canonical" href="https://cafe-melody-bonn.de/speisekarte" />
      </Helmet>

      {/* Hero */}
      <header className="relative py-20 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/speisekarte/ethiopian-food-platter.jpg"
            alt="Äthiopische Speisen im Café Melody Bistro Bonn"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(61,31,10,0.82)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="cafe-label" style={{ color: "var(--cafe-gold)" }}>Café Melody Bistro</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mt-3 mb-4">Speisekarte</h1>
          <p className="text-white/80 max-w-xl mx-auto text-lg">
            Unsere Speisen werden mit Liebe und Sorgfalt zubereitet — frische, hochwertige Zutaten, keine künstlichen Zusatzstoffe
          </p>
        </div>
      </header>

      {/* Dietary legend */}
      <div className="bg-card border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground justify-center">
            <span className="flex items-center gap-1.5"><Leaf className="w-4 h-4" style={{ color: "var(--cafe-brown)" }} /> Vegan</span>
            <span className="flex items-center gap-1.5"><span className="w-4 h-4 text-base leading-none">🥗</span> Vegetarisch</span>
            <span className="flex items-center gap-1.5"><Wheat className="w-4 h-4 text-amber-600" /> Glutenfrei</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4" style={{ color: "var(--cafe-gold)" }} /> Empfehlung</span>
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {allSections.map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0 ${
                  activeSection === section
                    ? "text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                style={activeSection === section ? { background: "var(--cafe-brown)" } : {}}
                data-testid={`filter-${section}`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu sections */}
      <main className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-14">
            {filteredSections.map(section => (
              <section key={section.category} id={section.category.toLowerCase().replace(/\s/g, "-")}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1 h-8 rounded-full" style={{ background: "var(--cafe-brown)" }} />
                  <h2 className="font-serif text-3xl font-bold" style={{ color: "var(--cafe-brown-dark)" }}>{section.category}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {section.items.map(item => (
                    <article
                      key={item.name}
                      className={`bg-card border rounded-2xl overflow-hidden shadow-sm hover-lift transition-all ${item.highlight ? "border-2 ring-2 ring-amber-100" : "border-border"}`}
                      style={item.highlight ? { borderColor: "var(--cafe-gold)" } : {}}
                      data-testid={`menu-item-${item.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {item.image && (
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={item.image}
                            alt={`${item.name} — Café Melody Bistro Bonn`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                          />
                          {item.highlight && (
                            <div className="absolute top-3 right-3">
                              <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm" style={{ background: "var(--cafe-brown)" }}>
                                <Star className="w-3 h-3" /> Empfehlung
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="p-5">
                        {item.highlight && !item.image && (
                          <div className="flex items-center gap-1.5 mb-2">
                            <Star className="w-3.5 h-3.5" style={{ color: "var(--cafe-gold)" }} />
                            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--cafe-brown)" }}>Empfehlung</span>
                          </div>
                        )}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-serif font-bold text-base leading-tight">{item.name}</h3>
                          <div className="flex gap-1.5 flex-shrink-0">
                            {item.isVegan && <Leaf className="w-3.5 h-3.5 mt-0.5" style={{ color: "var(--cafe-brown)" }} title="Vegan" />}
                            {item.isVegetarian && !item.isVegan && <span className="text-sm leading-none mt-0.5" title="Vegetarisch">🥗</span>}
                            {item.isGlutenFree && <Wheat className="w-3.5 h-3.5 mt-0.5 text-amber-600" title="Glutenfrei" />}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-3">{item.description}</p>
                        <p className="font-bold text-sm" style={{ color: "var(--cafe-brown)" }}>{item.priceDisplay}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}

            {/* DB Items */}
            {menuItems && menuItems.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1 h-8 rounded-full" style={{ background: "var(--cafe-brown)" }} />
                  <h2 className="font-serif text-3xl font-bold" style={{ color: "var(--cafe-brown-dark)" }}>Weitere Gerichte</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {menuItems.filter(item => item.isAvailable).map(item => (
                    <article key={item.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm hover-lift">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-serif font-bold text-base">{item.name}</h3>
                        <div className="flex gap-1">
                          {item.isVegan && <Leaf className="w-3.5 h-3.5 mt-0.5" style={{ color: "var(--cafe-brown)" }} />}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed mb-3">{item.description}</p>
                      <p className="font-bold text-sm" style={{ color: "var(--cafe-brown)" }}>{item.price.toFixed(2).replace(".", ",")} €</p>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-3xl p-10 text-center text-white" style={{ background: "var(--cafe-brown)" }}>
            <h2 className="font-serif text-3xl font-bold mb-3">Tageskarte & Empfehlungen</h2>
            <p className="text-white/80 max-w-md mx-auto mb-8">Entdecken Sie unser täglich wechselndes Angebot — frisch und saisonal</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/tageskarte" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all" style={{ background: "var(--cafe-gold)", color: "var(--cafe-brown-dark)" }}>
                Tageskarte ansehen <ChevronRight className="w-4 h-4" />
              </Link>
              <a href="tel:+491709384822" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-white/15 hover:bg-white/25 border border-white/25 transition-all">
                Reservieren
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
