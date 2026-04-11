import { Helmet } from "react-helmet-async";
import { useGetGalleryImages } from "@workspace/api-client-react";
import doroWatImg from "@/assets/images/doro-wat.png";
import misirWatImg from "@/assets/images/misir-wat.png";
import tibsImg from "@/assets/images/tibs.png";
import habeschaImg from "@/assets/images/habesha-platte.png";
import ambianceImg from "@/assets/images/ambiance-1.png";
import coffeeImg from "@/assets/images/coffee-ceremony.png";
import heroImg from "@/assets/images/hero.png";
import chefImg from "@/assets/images/chef.png";

const localImages = [
  { url: heroImg, caption: "Traditionelles äthiopisches Festessen", category: "food" },
  { url: doroWatImg, caption: "Doro Wat — würziger Hühner-Eintopf", category: "food" },
  { url: misirWatImg, caption: "Misir Wat — rote Linsen in Berbere-Sauce", category: "food" },
  { url: tibsImg, caption: "Tibs — angebratenes Rindfleisch", category: "food" },
  { url: habeschaImg, caption: "Habesha Platte für 2 Personen", category: "food" },
  { url: ambianceImg, caption: "Gemütliche Atmosphäre", category: "ambiance" },
  { url: coffeeImg, caption: "Traditionelle Kaffeezeremonie", category: "ambiance" },
  { url: chefImg, caption: "Unser Küchenchef", category: "team" },
];

export default function GaleriePage() {
  const { data: galleryImages } = useGetGalleryImages();

  const allImages = [
    ...localImages,
    ...(galleryImages ?? []).map(img => ({ url: img.url, caption: img.caption ?? "", category: img.category })),
  ];

  return (
    <>
      <Helmet>
        <title>Galerie — Habesha Restaurant Bonn | Äthiopische Küche & Atmosphäre</title>
        <meta name="description" content="Erleben Sie die Atmosphäre und Gerichte des Habesha Restaurants Bonn in unserer Bildergalerie. Authentische äthiopische Gerichte und gemütliches Ambiente." />
        <meta property="og:title" content="Galerie — Habesha Restaurant Bonn" />
        <meta property="og:description" content="Bilder von unseren authentischen äthiopischen Gerichten und gemütlicher Restaurantatmosphäre." />
        <link rel="canonical" href="https://habesha-bonn.de/galerie" />
      </Helmet>

      <header className="py-16 text-white" style={{ background: "linear-gradient(135deg, var(--eth-green) 0%, #04581d 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-yellow-300 text-sm font-medium tracking-widest uppercase">Habesha Restaurant</span>
          <h1 className="font-serif text-5xl font-bold mt-2 mb-4">Galerie</h1>
          <p className="text-green-100 max-w-xl mx-auto">
            Einblicke in unsere Küche, Atmosphäre und Kultur
          </p>
        </div>
      </header>

      <main className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {allImages.map((img, i) => (
              <article
                key={i}
                className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
                data-testid={`card-gallery-${i}`}
              >
                <div className="relative">
                  <img
                    src={img.url}
                    alt={img.caption || "Habesha Restaurant Bonn"}
                    className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}>
                      {img.caption}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
