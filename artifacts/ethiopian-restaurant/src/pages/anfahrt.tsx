import { Helmet } from "react-helmet-async";
import { Phone, MapPin, Clock, Mail, Bus, Car, Bike } from "lucide-react";
import { SiFacebook, SiInstagram, SiTiktok } from "react-icons/si";

export default function AnfahrtPage() {
  return (
    <>
      <Helmet>
        <title>Anfahrt & Öffnungszeiten — Café Melody Bistro Bonn-Graurheindorf</title>
        <meta name="description" content="Café Melody Bistro in Bonn-Graurheindorf. Adresse: Werftstraße 5-7, 53117 Bonn. Öffnungszeiten: Di–So 10:00–19:00 Uhr. Tel: +49 170 9384822. Kinderfreundlich & barrierefrei." />
        <meta property="og:title" content="Anfahrt & Öffnungszeiten — Café Melody Bistro Bonn" />
        <meta property="og:description" content="So finden Sie uns: Werftstraße 5-7, 53117 Bonn-Graurheindorf. Di–So 10–19 Uhr. +49 170 9384822." />
        <link rel="canonical" href="https://cafe-melody-bonn.de/anfahrt" />
      </Helmet>

      <header className="py-16 text-white" style={{ background: "linear-gradient(135deg, var(--eth-green) 0%, #04581d 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-yellow-300 text-sm font-medium tracking-widest uppercase">Ihr Weg zu uns</span>
          <h1 className="font-serif text-5xl font-bold mt-2 mb-4">Anfahrt</h1>
          <p className="text-green-100 max-w-xl mx-auto">
            Wir freuen uns auf Ihren Besuch im gemütlichen Café Melody Bistro in Bonn-Graurheindorf
          </p>
        </div>
      </header>

      <main className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact info */}
            <div>
              <h2 className="font-serif text-3xl font-bold mb-8">So erreichen Sie uns</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: "var(--eth-green)" }}>
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <address className="text-muted-foreground not-italic leading-relaxed">
                      Café Melody Bistro<br />
                      Werftstraße 5-7<br />
                      53117 Bonn-Graurheindorf
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: "var(--eth-green)" }}>
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Öffnungszeiten</h3>
                    <table className="text-sm text-muted-foreground">
                      <tbody>
                        <tr>
                          <td className="pr-6 py-0.5 font-medium text-foreground">Montag</td>
                          <td className="text-muted-foreground">Ruhetag</td>
                        </tr>
                        <tr>
                          <td className="pr-6 py-0.5 font-medium text-foreground">Dienstag – Sonntag</td>
                          <td>10:00 – 19:00 Uhr</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: "var(--eth-green)" }}>
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <a
                      href="tel:+491709384822"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="link-phone-anfahrt"
                    >
                      +49 170 9384822
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: "var(--eth-green)" }}>
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">E-Mail</h3>
                    <a
                      href="mailto:hallo@cafe-melody-bonn.de"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="link-email-anfahrt"
                    >
                      hallo@cafe-melody-bonn.de
                    </a>
                  </div>
                </div>

                {/* Anreise info */}
                <div className="p-5 bg-card rounded-2xl border border-border">
                  <h3 className="font-semibold mb-3">Anreisemöglichkeiten</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Car className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--eth-green)" }} />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">Mit dem Auto</p>
                        <p>Parkmöglichkeiten in der Umgebung und 5 eigene Parkplätze am Grundstück</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Bus className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--eth-green)" }} />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">Mit dem Bus</p>
                        <p>Buslinien 601 und 600 bis Haltestelle Werftstraße</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Bike className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--eth-green)" }} />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">Mit dem Fahrrad</p>
                        <p>Fahrradstellplätze direkt vor dem Café</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex gap-3 flex-wrap">
                  {["Kinderfreundlich", "Barrierefreier Zugang", "Fahrradstellplätze"].map(a => (
                    <span key={a} className="text-xs px-3 py-1.5 rounded-full font-medium border border-border bg-muted text-muted-foreground">
                      ✓ {a}
                    </span>
                  ))}
                </div>

                {/* Social */}
                <div className="p-5 bg-card rounded-2xl border border-border">
                  <h3 className="font-semibold mb-3">Folgen Sie uns</h3>
                  <div className="flex gap-3">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-muted/80 transition-colors" data-testid="link-instagram-anfahrt">
                      <SiInstagram className="w-4 h-4" /> Instagram
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-muted/80 transition-colors" data-testid="link-facebook-anfahrt">
                      <SiFacebook className="w-4 h-4" /> Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Reservation form */}
            <div>
              <h2 className="font-serif text-3xl font-bold mb-8">Reservierung anfragen</h2>
              <form
                className="space-y-4 bg-card rounded-2xl border border-border p-6"
                onSubmit={(e) => { e.preventDefault(); alert("Vielen Dank für Ihre Reservierungsanfrage! Wir melden uns in Kürze unter Ihrer angegebenen Telefonnummer."); }}
                data-testid="form-reservation"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="vorname" className="block text-sm font-medium mb-1.5">Vorname *</label>
                    <input
                      id="vorname"
                      type="text"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Ihr Vorname"
                      data-testid="input-vorname"
                    />
                  </div>
                  <div>
                    <label htmlFor="nachname" className="block text-sm font-medium mb-1.5">Nachname *</label>
                    <input
                      id="nachname"
                      type="text"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Ihr Nachname"
                      data-testid="input-nachname"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5">E-Mail *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="ihre@email.de"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1.5">Telefon *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+49..."
                    data-testid="input-phone"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium mb-1.5">Datum *</label>
                    <input
                      id="date"
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="input-date"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium mb-1.5">Uhrzeit *</label>
                    <select
                      id="time"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="select-time"
                    >
                      {["10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30"].map(t => (
                        <option key={t} value={t}>{t} Uhr</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium mb-1.5">Anzahl Personen *</label>
                  <select
                    id="guests"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="select-guests"
                  >
                    {[1,2,3,4,5,6,7,8,10,12].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? "Person" : "Personen"}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5">Nachricht</label>
                  <textarea
                    id="message"
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Besondere Wünsche, Allergien, Anlass..."
                    data-testid="textarea-message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
                  style={{ background: "var(--eth-green)" }}
                  data-testid="button-submit-reservation"
                >
                  Reservierung anfragen
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  Wir bestätigen Ihre Reservierung telefonisch. Mit * markierte Felder sind Pflichtfelder.
                </p>
              </form>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-12 rounded-2xl overflow-hidden border border-border shadow-sm bg-muted h-64 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p className="font-medium">Café Melody Bistro Bonn</p>
              <p className="text-sm">Werftstraße 5-7, 53117 Bonn-Graurheindorf</p>
              <p className="text-xs mt-1">Bus 600/601 bis Werftstraße</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
