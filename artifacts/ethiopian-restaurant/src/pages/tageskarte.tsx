import { Helmet } from "react-helmet-async";
import { useGetTodaysDailyMenu } from "@workspace/api-client-react";
import { Leaf, Clock, ChefHat } from "lucide-react";

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
        <title>Tageskarte — Habesha Restaurant Bonn | Tagesempfehlungen</title>
        <meta name="description" content="Entdecken Sie unsere heutige Tageskarte mit frisch zubereiteten äthiopischen Spezialitäten. Täglich neue Gerichte zum Mittagstisch und Abendessen." />
        <meta property="og:title" content="Tageskarte — Habesha Restaurant Bonn" />
        <meta property="og:description" content="Tagesfrische äthiopische Spezialitäten — täglich wechselnde Empfehlungen vom Küchenchef." />
        <link rel="canonical" href="https://habesha-bonn.de/tageskarte" />
      </Helmet>

      <header className="py-16 text-white" style={{ background: "linear-gradient(135deg, var(--eth-green) 0%, #04581d 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-yellow-300 text-sm font-medium tracking-widest uppercase">Täglich frisch</span>
          <h1 className="font-serif text-5xl font-bold mt-2 mb-4">Tageskarte</h1>
          <div className="flex items-center justify-center gap-2 text-green-200">
            <Clock className="w-4 h-4" />
            <time dateTime={today.toISOString().split("T")[0]} className="text-sm">{formattedDate}</time>
          </div>
        </div>
      </header>

      <main className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-36 bg-muted rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : dailyMenu && dailyMenu.items.length > 0 ? (
            <>
              {/* Summary bar */}
              <div className="mb-8 p-5 rounded-2xl text-white flex flex-wrap gap-4 justify-between items-center" style={{ background: "var(--eth-green)" }}>
                <div className="flex items-center gap-3">
                  <ChefHat className="w-8 h-8 text-yellow-300" />
                  <div>
                    <p className="font-semibold">Heutige Tageskarte</p>
                    <p className="text-sm text-green-200">{dailyMenu.totalItems} Gerichte verfügbar</p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  {dailyMenu.veganCount > 0 && (
                    <span className="flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full">
                      <Leaf className="w-3 h-3" />
                      {dailyMenu.veganCount} vegan
                    </span>
                  )}
                  {dailyMenu.vegetarianCount > 0 && (
                    <span className="flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full">
                      <Leaf className="w-3 h-3" />
                      {dailyMenu.vegetarianCount} vegetarisch
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {dailyMenu.items.map((item, i) => (
                  <article
                    key={item.id}
                    className={`bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow animate-fade-in-up delay-${(i + 1) * 100}`}
                    data-testid={`card-tageskarte-${item.id}`}
                  >
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-serif font-bold text-xl">{item.name}</h3>
                          {item.isVegan && (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 border border-green-300 text-green-700">
                              <Leaf className="w-3 h-3" />
                              Vegan
                            </span>
                          )}
                          {!item.isVegan && item.isVegetarian && (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700">
                              <Leaf className="w-3 h-3" />
                              Vegetarisch
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
                        {item.note && (
                          <p className="text-sm italic mt-2" style={{ color: "var(--eth-red)" }}>{item.note}</p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="font-bold text-2xl" style={{ color: "var(--eth-green)" }}>
                          {item.price.toFixed(2).replace(".", ",")} €
                        </span>
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
            </>
          ) : (
            <div className="text-center py-20">
              <ChefHat className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">Heute keine Tageskarte</h2>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Für heute ist keine Tageskarte verfügbar. Bitte schauen Sie unsere vollständige Speisekarte an oder rufen Sie uns an.
              </p>
              <a
                href="tel:+4922812345678"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-90"
                style={{ background: "var(--eth-green)" }}
                data-testid="link-phone-tageskarte"
              >
                +49 228 12345678
              </a>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
