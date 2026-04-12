import { Helmet } from "react-helmet-async";
import ambianceImg from "@/assets/images/ambiance-1.png";
import coffeeImg from "@/assets/images/coffee-ceremony.png";
import chefImg from "@/assets/images/chef.png";

export default function UberUnsPage() {
  return (
    <>
      <Helmet>
        <title>Über uns — Habesha Restaurant Bonn | Äthiopische Tradition</title>
        <meta name="description" content="Erfahren Sie mehr über das Habesha Restaurant Bonn — unsere Geschichte, äthiopische Traditionen und was uns zu einem besonderen Ort macht." />
        <meta property="og:title" content="Über uns — Habesha Restaurant Bonn" />
        <meta property="og:description" content="Die Geschichte des Habesha Restaurants — authentische äthiopische Küche und Gastfreundschaft in Bonn." />
        <link rel="canonical" href="https://habesha-bonn.de/uber-uns" />
      </Helmet>

      <header className="py-16 text-white" style={{ background: "linear-gradient(135deg, var(--cafe-brown-dark) 0%, var(--cafe-brown) 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="cafe-label" style={{ color: "var(--cafe-gold)" }}>Unsere Geschichte</span>
          <h1 className="font-serif text-5xl font-bold mt-2 mb-4">Über uns</h1>
          <p className="text-amber-100/80 max-w-xl mx-auto">
            Habesha — das bedeutet Äthiopier. Und das verkörpern wir mit jedem Teller, den wir servieren.
          </p>
        </div>
      </header>

      <main className="bg-background">
        {/* Story section */}
        <section className="py-20" aria-label="Unsere Geschichte">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-1" style={{ background: "var(--cafe-brown)" }} />
                  <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Seit 2015</span>
                </div>
                <h2 className="font-serif text-4xl font-bold mb-6">Unsere Geschichte</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Das Habesha Restaurant wurde 2015 von der Familie Tesfaye gegründet — mit einer einfachen Vision: die reiche kulinarische Tradition Äthiopiens nach Bonn zu bringen. Was als kleines Familienrestaurant begann, ist heute eine Institution für alle, die authentische afrikanische Küche erleben möchten.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Unsere Rezepte stammen aus der Heimat — von Omas Küchengeheimnissen bis zu regionalen Spezialitäten aus verschiedenen Teilen Äthiopiens. Jedes Gericht erzählt eine Geschichte: von Berbere-Gewürzen aus Addis Ababa, von Teff-Feldern in den Hochlanden, von der Einheit beim gemeinsamen Essen.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Wir sind stolz darauf, dass viele unserer Gäste regelmäßig zurückkehren — nicht nur für das Essen, sondern für die Wärme und das Gefühl, Teil unserer Familie zu sein.
                </p>
              </div>
              <div>
                <img
                  src={ambianceImg}
                  alt="Gemütliche Atmosphäre im Habesha Restaurant Bonn"
                  className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
                  loading="lazy"
                  width={600}
                  height={450}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values section */}
        <section className="py-16 bg-muted" aria-label="Unsere Werte">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Was uns besonders macht</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  color: "var(--cafe-brown)",
                  title: "Authentizität",
                  text: "Alle Gerichte werden nach original äthiopischen Rezepten zubereitet — mit importierten Gewürzen und handgemachtem Injera aus Teff-Mehl.",
                },
                {
                  color: "var(--eth-yellow)",
                  title: "Gemeinschaft",
                  text: "Beim äthiopischen Essen wird von einem großen Teller gemeinsam gegessen. Das Gursha — jemandem zu füttern — ist ein Zeichen von Zuneigung und Gastfreundschaft.",
                },
                {
                  color: "var(--eth-red)",
                  title: "Tradition",
                  text: "Die traditionelle Kaffeezeremonie, die Verwendung von Berbere und Niter Kibbeh — bei uns wird die reiche Kulturgeschichte Äthiopiens lebendig.",
                },
              ].map((v, i) => (
                <div key={v.title} className={`bg-card rounded-2xl p-6 border border-border shadow-sm animate-fade-in-up delay-${(i + 1) * 100}`}>
                  <div className="w-12 h-1 rounded mb-4" style={{ background: v.color }} />
                  <h3 className="font-serif text-xl font-semibold mb-3">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team section */}
        <section className="py-20" aria-label="Unser Team">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src={chefImg}
                  alt="Unser Küchenchef im Habesha Restaurant"
                  className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
                  loading="lazy"
                  width={600}
                  height={450}
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-1" style={{ background: "var(--eth-red)" }} />
                  <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Unser Team</span>
                </div>
                <h2 className="font-serif text-4xl font-bold mb-6">Der Küchenchef</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Unser Küchenchef Dawit Tesfaye hat seine Kochkunst in Addis Ababa erlernt und verfeinert sie seit über 20 Jahren. Er bringt die Aromen seiner Heimat täglich nach Bonn — mit Leidenschaft und Respekt vor der Tradition.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "Kochen ist für mich mehr als ein Beruf — es ist eine Möglichkeit, meine Kultur und mein Zuhause zu teilen. Jedes Gericht, das ich serviere, trägt ein Stück Äthiopien in sich."
                </p>
                <p className="italic text-sm font-medium" style={{ color: "var(--cafe-brown)" }}>— Dawit Tesfaye, Küchenchef</p>
              </div>
            </div>
          </div>
        </section>

        {/* Coffee ceremony */}
        <section className="py-20 bg-muted" aria-label="Kaffeezeremonie">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-1" style={{ background: "var(--eth-yellow)" }} />
                  <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Tradition</span>
                </div>
                <h2 className="font-serif text-4xl font-bold mb-6">Die Kaffeezeremonie</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Äthiopien ist das Geburtsland des Kaffees — hier wurde die Kaffeepflanze zum ersten Mal entdeckt. Die traditionelle Kaffeezeremonie ist ein heiliges Ritual, das Stunden dauern kann.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Die Bohnen werden frisch geröstet, im Mörser zerstoßen und dreimal in der Jebena (Tonkanne) aufgebrüht. Die drei Tassen heißen Abol (erster Aufguss), Tona (zweiter) und Baraka (Segen).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Bei uns können Sie diese Zeremonie nach Voranmeldung authentisch erleben — ein unvergessliches kulturelles Erlebnis für Gruppen.
                </p>
              </div>
              <div>
                <img
                  src={coffeeImg}
                  alt="Traditionelle äthiopische Kaffeezeremonie"
                  className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
                  loading="lazy"
                  width={600}
                  height={450}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
