import { Helmet } from "react-helmet-async";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { SiFacebook, SiInstagram, SiTiktok } from "react-icons/si";

export default function KontaktPage() {
  return (
    <>
      <Helmet>
        <title>Kontakt & Reservierung — Habesha Restaurant Bonn</title>
        <meta name="description" content="Kontaktieren Sie das Habesha Restaurant Bonn für Tischreservierungen. Adresse: Musterstraße 42, 53111 Bonn. Tel: +49 228 12345678. Mo–Fr 12–14:30 & 17–22 Uhr, Sa–So 12–22:30 Uhr." />
        <meta property="og:title" content="Kontakt & Reservierung — Habesha Restaurant Bonn" />
        <meta property="og:description" content="Reservieren Sie Ihren Tisch im Habesha Restaurant Bonn. Authentische äthiopische Küche — für Gruppen und Events buchbar." />
        <link rel="canonical" href="https://habesha-bonn.de/kontakt" />
      </Helmet>

      <header className="py-16 text-white" style={{ background: "linear-gradient(135deg, var(--eth-green) 0%, #04581d 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-yellow-300 text-sm font-medium tracking-widest uppercase">Wir freuen uns auf Sie</span>
          <h1 className="font-serif text-5xl font-bold mt-2 mb-4">Kontakt & Reservierung</h1>
          <p className="text-green-100 max-w-xl mx-auto">
            Reservieren Sie Ihren Tisch oder nehmen Sie Kontakt auf — wir beantworten alle Fragen gerne
          </p>
        </div>
      </header>

      <main className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact info */}
            <div>
              <h2 className="font-serif text-3xl font-bold mb-8">So erreichen Sie uns</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: "var(--eth-green)" }}>
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <address className="text-muted-foreground not-italic leading-relaxed">
                      Habesha Restaurant Bonn<br />
                      Musterstrasse 42<br />
                      53111 Bonn
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: "var(--eth-green)" }}>
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <a
                      href="tel:+4922812345678"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="link-phone-kontakt"
                    >
                      +49 228 12345678
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
                      href="mailto:info@habesha-bonn.de"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="link-email-kontakt"
                    >
                      info@habesha-bonn.de
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: "var(--eth-green)" }}>
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Offnungszeiten</h3>
                    <table className="text-sm text-muted-foreground">
                      <tbody>
                        <tr>
                          <td className="pr-6 py-0.5 font-medium text-foreground">Montag – Freitag</td>
                          <td>12:00 – 14:30 Uhr</td>
                        </tr>
                        <tr>
                          <td className="pr-6 py-0.5 font-medium text-foreground"></td>
                          <td>17:00 – 22:00 Uhr</td>
                        </tr>
                        <tr>
                          <td className="pr-6 py-0.5 font-medium text-foreground">Samstag – Sonntag</td>
                          <td>12:00 – 22:30 Uhr</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Social media */}
                <div className="p-5 bg-card rounded-2xl border border-border">
                  <h3 className="font-semibold mb-3">Folgen Sie uns</h3>
                  <div className="flex gap-3">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-muted/80 transition-colors" data-testid="link-instagram-kontakt">
                      <SiInstagram className="w-4 h-4" />
                      Instagram
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-muted/80 transition-colors" data-testid="link-facebook-kontakt">
                      <SiFacebook className="w-4 h-4" />
                      Facebook
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-muted/80 transition-colors" data-testid="link-tiktok-kontakt">
                      <SiTiktok className="w-4 h-4" />
                      TikTok
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Reservation form */}
            <div>
              <h2 className="font-serif text-3xl font-bold mb-8">Tisch reservieren</h2>
              <form className="space-y-5 bg-card rounded-2xl border border-border p-6" onSubmit={(e) => { e.preventDefault(); alert("Vielen Dank für Ihre Reservierungsanfrage! Wir melden uns in Kürze."); }} data-testid="form-reservation">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Ihr Name"
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1.5">Telefon</label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+49..."
                      data-testid="input-phone"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium mb-1.5">Datum</label>
                    <input
                      id="date"
                      type="date"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      min={new Date().toISOString().split("T")[0]}
                      data-testid="input-date"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium mb-1.5">Uhrzeit</label>
                    <select
                      id="time"
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="select-time"
                    >
                      <option value="12:00">12:00 Uhr</option>
                      <option value="12:30">12:30 Uhr</option>
                      <option value="13:00">13:00 Uhr</option>
                      <option value="13:30">13:30 Uhr</option>
                      <option value="14:00">14:00 Uhr</option>
                      <option value="17:00">17:00 Uhr</option>
                      <option value="17:30">17:30 Uhr</option>
                      <option value="18:00">18:00 Uhr</option>
                      <option value="19:00">19:00 Uhr</option>
                      <option value="20:00">20:00 Uhr</option>
                      <option value="21:00">21:00 Uhr</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium mb-1.5">Anzahl der Gäste</label>
                  <select
                    id="guests"
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="select-guests"
                  >
                    {[1,2,3,4,5,6,7,8,10,12].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? "Person" : "Personen"}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5">Besondere Wünsche (optional)</label>
                  <textarea
                    id="message"
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Allergien, Sonderwünsche, Anlass..."
                    data-testid="textarea-message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
                  style={{ background: "var(--eth-green)" }}
                  data-testid="button-submit-reservation"
                >
                  Reservierungsanfrage senden
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  Wir bestätigen Ihre Reservierung telefonisch innerhalb von 24 Stunden.
                </p>
              </form>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-12 rounded-2xl overflow-hidden border border-border shadow-sm bg-muted h-64 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p className="font-medium">Habesha Restaurant Bonn</p>
              <p className="text-sm">Musterstrasse 42, 53111 Bonn</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
