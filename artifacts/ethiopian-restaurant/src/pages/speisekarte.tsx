import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useGetMenuItems, useGetMenuCategories } from "@workspace/api-client-react";
import { Leaf, Wheat } from "lucide-react";

export default function SpeisekartePage() {
  const { data: menuItems, isLoading } = useGetMenuItems();
  const { data: categories } = useGetMenuCategories();
  const [activeCategory, setActiveCategory] = useState<string>("Alle");

  const allCategories = ["Alle", ...(categories?.map(c => c.category) ?? [])];
  const filtered = activeCategory === "Alle"
    ? menuItems
    : menuItems?.filter(item => item.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Speisekarte — Habesha Restaurant Bonn | Äthiopische Gerichte</title>
        <meta name="description" content="Entdecken Sie unsere vollständige Speisekarte mit authentischen äthiopischen Gerichten: Doro Wat, Injera, Misir Wat, Tibs und mehr. Viele vegane und vegetarische Optionen." />
        <meta property="og:title" content="Speisekarte — Habesha Restaurant Bonn" />
        <meta property="og:description" content="Unsere Speisekarte mit authentischen äthiopischen Gerichten, veganen Optionen und traditionellen Getränken." />
        <link rel="canonical" href="https://habesha-bonn.de/speisekarte" />
      </Helmet>

      {/* Page header */}
      <header className="py-16 text-white" style={{ background: "linear-gradient(135deg, var(--eth-green) 0%, #056b25 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-yellow-300 text-sm font-medium tracking-widest uppercase">Habesha Restaurant</span>
          <h1 className="font-serif text-5xl font-bold mt-2 mb-4">Speisekarte</h1>
          <p className="text-green-100 max-w-xl mx-auto">
            Alle unsere Gerichte werden traditionell auf frischem Injera serviert — handgemacht nach original äthiopischen Rezepten
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
            <span className="flex items-center gap-1.5">
              <Wheat className="w-4 h-4 text-amber-500" />
              Glutenfrei
            </span>
          </div>
        </div>
      </div>

      <main className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <nav className="flex gap-2 flex-wrap mb-10 justify-center" aria-label="Kategorien">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "text-white shadow-sm"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
                style={activeCategory === cat ? { background: "var(--eth-green)" } : {}}
                data-testid={`filter-category-${cat}`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-40 bg-muted rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered?.map(item => (
                <article
                  key={item.id}
                  className={`bg-card border rounded-2xl p-5 shadow-sm transition-all hover:shadow-md ${!item.isAvailable ? "opacity-50" : ""}`}
                  data-testid={`card-menu-item-${item.id}`}
                >
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <div>
                      <h3 className="font-serif font-semibold text-lg leading-tight">{item.name}</h3>
                      {item.nameAmharic && (
                        <span className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-ethiopic)" }}>
                          {item.nameAmharic}
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-lg whitespace-nowrap" style={{ color: "var(--eth-green)" }}>
                      {item.price.toFixed(2).replace(".", ",")} €
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.isVegan && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-50 border border-green-200 text-green-700">
                        <Leaf className="w-3 h-3" />
                        Vegan
                      </span>
                    )}
                    {!item.isVegan && item.isVegetarian && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                        <Leaf className="w-3 h-3" />
                        Vegetarisch
                      </span>
                    )}
                    {item.isGlutenFree && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700">
                        <Wheat className="w-3 h-3" />
                        Glutenfrei
                      </span>
                    )}
                    {!item.isAvailable && (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-50 border border-red-200 text-red-600">
                        Nicht verfügbar
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {filtered?.length === 0 && !isLoading && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">Keine Gerichte in dieser Kategorie</p>
            </div>
          )}

          {/* Injera note */}
          <div className="mt-12 p-6 rounded-2xl border-l-4 bg-green-50" style={{ borderColor: "var(--eth-green)" }}>
            <h2 className="font-serif font-semibold text-lg mb-2" style={{ color: "var(--eth-green)" }}>Über Injera</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Alle unsere Hauptgerichte werden auf frischem Injera serviert — dem traditionellen äthiopischen Sauerteigfladenbrot aus Teff-Mehl. Das Injera dient gleichzeitig als Teller und Brotbeilage. Das gemeinsame Essen von einem Teller ist bei uns Tradition.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
