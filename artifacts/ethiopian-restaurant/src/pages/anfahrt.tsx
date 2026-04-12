import { Helmet } from "react-helmet-async";
import { Phone, MapPin, Clock, Mail, Bus, Car, Bike, CheckCircle2, AlertCircle } from "lucide-react";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { useState } from "react";

const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

export default function AnfahrtPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    vorname: "", nachname: "", email: "", phone: "",
    date: "", time: "12:00", guests: "2", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_URL}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, guests: parseInt(form.guests, 10) }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json() as { error?: string };
        setError(data.error ?? "Fehler beim Senden der Anfrage");
      }
    } catch {
      setError("Verbindungsfehler — bitte versuchen Sie es erneut.");
    }
    setSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>Anfahrt & Öffnungszeiten — Café Melody Bistro Bonn-Graurheindorf</title>
        <meta name="description" content="Café Melody Bistro in Bonn-Graurheindorf. Adresse: Werftstraße 5-7, 53117 Bonn. Öffnungszeiten: Di–So 10:00–19:00 Uhr. Tel: +49 170 9384822. Kinderfreundlich & barrierefrei." />
        <meta property="og:title" content="Anfahrt & Öffnungszeiten — Café Melody Bistro Bonn" />
        <meta property="og:description" content="So finden Sie uns: Werftstraße 5-7, 53117 Bonn-Graurheindorf. Di–So 10–19 Uhr. +49 170 9384822." />
        <meta name="twitter:card" content="summary" />
        <link rel="canonical" href="https://cafe-melody-bonn.de/anfahrt" />
      </Helmet>

      {/* Hero */}
      <header className="relative py-20 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/service/event-setup.jpg"
            alt="Café Melody Bistro Bonn — Anfahrt und Öffnungszeiten"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(61,31,10,0.85)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
            <span className="cafe-label" style={{ color: "var(--cafe-gold)" }}>Ihr Weg zu uns</span>
            <div className="w-10 h-0.5" style={{ background: "var(--cafe-gold)" }} />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Anfahrt &amp; Reservierung</h1>
          <p className="text-white/80 max-w-xl mx-auto text-lg">
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
                {[
                  {
                    icon: MapPin,
                    title: "Adresse",
                    content: (
                      <address className="text-muted-foreground not-italic leading-relaxed">
                        Café Melody Bistro<br />Werftstraße 5-7<br />53117 Bonn-Graurheindorf
                      </address>
                    )
                  },
                  {
                    icon: Clock,
                    title: "Öffnungszeiten",
                    content: (
                      <table className="text-sm text-muted-foreground w-full">
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
                    )
                  },
                  {
                    icon: Phone,
                    title: "Telefon",
                    content: <a href="tel:+491709384822" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-phone-anfahrt">+49 170 9384822</a>
                  },
                  {
                    icon: Mail,
                    title: "E-Mail",
                    content: <a href="mailto:hallo@cafe-melody-bonn.de" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-email-anfahrt">hallo@cafe-melody-bonn.de</a>
                  },
                ].map(({ icon: Icon, title, content }) => (
                  <div key={title} className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: "var(--cafe-brown)" }}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{title}</h3>
                      {content}
                    </div>
                  </div>
                ))}

                {/* Anreise */}
                <div className="p-5 bg-card rounded-2xl border border-border">
                  <h3 className="font-semibold mb-3">Anreisemöglichkeiten</h3>
                  <div className="space-y-3">
                    {[
                      { icon: Car, title: "Mit dem Auto", text: "Parkmöglichkeiten in der Umgebung und 5 eigene Parkplätze am Grundstück" },
                      { icon: Bus, title: "Mit dem Bus", text: "Buslinien 601 und 600 bis Haltestelle Werftstraße" },
                      { icon: Bike, title: "Mit dem Fahrrad", text: "Fahrradstellplätze direkt vor dem Café" },
                    ].map(({ icon: Icon, title, text }) => (
                      <div key={title} className="flex items-start gap-3">
                        <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--cafe-brown)" }} />
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium text-foreground">{title}</p>
                          <p>{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {["✓ Kinderfreundlich", "✓ Barrierefreier Zugang", "✓ Fahrradstellplätze"].map(a => (
                    <span key={a} className="text-xs px-3 py-1.5 rounded-full font-medium border border-border bg-muted text-muted-foreground">{a}</span>
                  ))}
                </div>

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
              <h2 className="font-serif text-3xl font-bold mb-2">Reservierung anfragen</h2>
              <p className="text-muted-foreground mb-6">Wir bestätigen Ihre Anfrage telefonisch oder per E-Mail.</p>

              {sent ? (
                <div className="rounded-2xl p-8 text-center border" style={{ background: "var(--cafe-cream)", borderColor: "var(--cafe-gold)" }}>
                  <CheckCircle2 className="w-14 h-14 mx-auto mb-4" style={{ color: "var(--cafe-brown)" }} />
                  <h3 className="font-serif text-xl font-bold mb-2" style={{ color: "var(--cafe-brown-dark)" }}>Anfrage erhalten!</h3>
                  <p className="text-muted-foreground text-sm mb-4">Wir melden uns schnellstmöglich bei Ihnen.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ vorname: "", nachname: "", email: "", phone: "", date: "", time: "12:00", guests: "2", message: "" }); }}
                    className="text-sm font-medium hover:underline"
                    style={{ color: "var(--cafe-brown)" }}
                  >
                    Neue Reservierung
                  </button>
                </div>
              ) : (
                <form
                  className="space-y-4 bg-card rounded-2xl border border-border p-6"
                  onSubmit={handleSubmit}
                  data-testid="form-reservation"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="vorname" className="block text-sm font-medium mb-1.5">Vorname *</label>
                      <input id="vorname" type="text" required value={form.vorname} onChange={e => setForm(f => ({ ...f, vorname: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ihr Vorname" data-testid="input-vorname" />
                    </div>
                    <div>
                      <label htmlFor="nachname" className="block text-sm font-medium mb-1.5">Nachname *</label>
                      <input id="nachname" type="text" required value={form.nachname} onChange={e => setForm(f => ({ ...f, nachname: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ihr Nachname" data-testid="input-nachname" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">E-Mail *</label>
                    <input id="email" type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="ihre@email.de" data-testid="input-email" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1.5">Telefon *</label>
                    <input id="phone" type="tel" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+49..." data-testid="input-phone" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium mb-1.5">Datum *</label>
                      <input id="date" type="date" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        data-testid="input-date" />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium mb-1.5">Uhrzeit *</label>
                      <select id="time" required value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        data-testid="select-time">
                        {["10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30"].map(t => (
                          <option key={t} value={t}>{t} Uhr</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium mb-1.5">Anzahl Personen *</label>
                    <select id="guests" required value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="select-guests">
                      {[1,2,3,4,5,6,7,8,10,12].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? "Person" : "Personen"}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1.5">Nachricht</label>
                    <textarea id="message" rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Besondere Wünsche, Allergien, Anlass..." data-testid="textarea-message" />
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{ background: "var(--cafe-brown)" }}
                    data-testid="button-submit-reservation"
                  >
                    {submitting ? "Wird gesendet..." : "Reservierung anfragen"}
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    Mit * markierte Felder sind Pflichtfelder. Wir bestätigen Ihre Reservierung telefonisch.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-12 rounded-2xl overflow-hidden border border-border shadow-sm bg-muted h-64 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-2" style={{ color: "var(--cafe-brown)" }} />
              <p className="font-medium text-foreground">Café Melody Bistro Bonn</p>
              <p className="text-sm">Werftstraße 5-7, 53117 Bonn-Graurheindorf</p>
              <p className="text-xs mt-1">Bus 600/601 bis Werftstraße</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
