import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useGetGalleryImages } from "@workspace/api-client-react";
import { X } from "lucide-react";

interface GalleryImage {
  url: string;
  caption: string;
  category: string;
}

const localImages: GalleryImage[] = [
  { url: "/images/hero/injera-platter.jpg", caption: "Traditionelles äthiopisches Injera mit Beilagen", category: "food" },
  { url: "/images/speisekarte/platte.jpg", caption: "Habesha Platte — äthiopische Spezialitäten für 2", category: "food" },
  { url: "/images/speisekarte/ethiopian-food-platter.jpg", caption: "Hausgemachte äthiopische Spezialitäten", category: "food" },
  { url: "/images/speisekarte/sambusa.jpg", caption: "Sambusa — knusprige Teigtaschen", category: "food" },
  { url: "/images/speisekarte/falafel.jpg", caption: "Hausgemachte Falafel mit Hummus", category: "food" },
  { url: "/images/speisekarte/huhn.jpg", caption: "Hähnchenbrustspieße mit Gewürzreis", category: "food" },
  { url: "/images/speisekarte/dips.jpg", caption: "Hausgemachte Dips mit Fladenbrot", category: "food" },
  { url: "/images/speisekarte/ziegenkaese.png", caption: "Ziegenkäse mit Trüffelhonig", category: "food" },
  { url: "/images/speisekarte/rinderstreifen.png", caption: "Rinderstreifen mit Gemüse", category: "food" },
  { url: "/images/speisekarte/spaghetti.jpg", caption: "Spaghetti Bolognese mit Fladenbrot", category: "food" },
  { url: "/images/speisekarte/sarma.jpg", caption: "Gefüllte Weinblätter", category: "food" },
  { url: "/images/speisekarte/waffel.jpg", caption: "Waffel mit Früchten und Sahne", category: "dessert" },
  { url: "/images/speisekarte/eis.jpg", caption: "Eisbecher", category: "dessert" },
  { url: "/images/speisekarte/milkshake.jpg", caption: "Cremiger Milkshake", category: "dessert" },
  { url: "/images/speisekarte/eiscafe.jpg", caption: "Eiscafé — Espresso mit Vanilleeis", category: "dessert" },
  { url: "/images/events/kuchen.jpg", caption: "Täglich frisch gebackene Kuchen", category: "dessert" },
  { url: "/images/events/fam.png", caption: "Eltern-Kind-Treffen jeden Dienstag", category: "events" },
  { url: "/images/events/livemusic.png", caption: "Live Musik im Café Melody Bistro", category: "events" },
  { url: "/images/service/brunch.jpg", caption: "Feiertags-Brunch Buffet", category: "events" },
  { url: "/images/service/cakes.jpg", caption: "Hausgemachte Kuchen Auswahl", category: "dessert" },
  { url: "/images/service/catering-buffet.jpg", caption: "Catering & Events im Café Melody", category: "events" },
  { url: "/images/service/gourmet.jpg", caption: "Gourmet Speisen für besondere Anlässe", category: "events" },
  { url: "/images/home/kuchen-getraenke.jpg", caption: "Hausgemachte Kuchen & frische Säfte", category: "dessert" },
  { url: "/images/getraenke/getraenke.jpg", caption: "Frische Getränke und Säfte", category: "food" },
];

const categories = [
  { key: "alle", label: "Alle" },
  { key: "food", label: "Speisen" },
  { key: "dessert", label: "Dessert & Kuchen" },
  { key: "events", label: "Events & Atmosphäre" },
];

export default function GaleriePage() {
  const { data: galleryImages } = useGetGalleryImages();
  const [activeCategory, setActiveCategory] = useState("alle");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const dbImages: GalleryImage[] = (galleryImages ?? []).map(img => ({
    url: img.url,
    caption: img.caption ?? "",
    category: img.category,
  }));

  const allImages = [...localImages, ...dbImages];
  const filtered = activeCategory === "alle" ? allImages : allImages.filter(img => img.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Galerie — Café Melody Bistro Bonn | Bilder & Impressionen</title>
        <meta name="description" content="Bildergalerie des Café Melody Bistro Bonn — äthiopische Spezialitäten, hausgemachte Kuchen, Events und mehr." />
        <meta property="og:title" content="Galerie — Café Melody Bistro Bonn" />
        <link rel="canonical" href="https://cafe-melody-bonn.de/galerie" />
      </Helmet>

      {/* Hero */}
      <header className="relative py-20 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/speisekarte/platte.jpg"
            alt="Galerie Café Melody Bistro Bonn"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(61,31,10,0.82)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
            <span className="cafe-label" style={{ color: "var(--cafe-gold)" }}>Bilder & Impressionen</span>
            <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Galerie</h1>
          <p className="text-white/80 max-w-xl mx-auto text-lg">
            Entdecken Sie unser Café — Speisen, Atmosphäre und besondere Momente
          </p>
        </div>
      </header>

      {/* Category filter */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0 ${
                  activeCategory === cat.key ? "text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                style={activeCategory === cat.key ? { background: "var(--cafe-brown)" } : {}}
                data-testid={`filter-${cat.key}`}
              >
                {cat.label} {activeCategory === cat.key && `(${filtered.length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((image, i) => (
              <button
                key={`${image.url}-${i}`}
                onClick={() => setLightbox(image)}
                className="w-full break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover-lift block group cursor-zoom-in"
                aria-label={`Bild vergrößern: ${image.caption}`}
                data-testid={`gallery-img-${i}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={`${image.caption} — Café Melody Bistro Bonn`}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top, rgba(61,31,10,0.85), transparent)" }}>
                      {image.caption}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium">Keine Bilder gefunden</p>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          aria-modal="true"
          role="dialog"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.url}
              alt={lightbox.caption}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            {lightbox.caption && (
              <p className="text-white/80 text-center mt-4 text-sm">{lightbox.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
