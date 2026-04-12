import { Helmet } from "react-helmet-async";
import { Phone, MapPin, Clock, Mail, Send, CheckCircle2 } from "lucide-react";
import { SiFacebook, SiInstagram, SiTiktok } from "react-icons/si";
import { useState } from "react";

export default function KontaktPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Helmet>
        <title>Kontakt & Reservierung — Café Melody Bistro Bonn</title>
        <meta name="description" content="Kontaktieren Sie das Café Melody Bistro Bonn für Tischreservierungen, Gruppenanfragen und Events. Tel: +49 170 9384822, E-Mail: hallo@cafe-melody-bonn.de." />
        <meta property="og:title" content="Kontakt & Reservierung — Café Melody Bistro Bonn" />
        <meta property="og:description" content="Kontakt und Reservierungen im Café Melody Bistro Bonn — Di–So 10–19 Uhr." />
        <meta name="twitter:card" content="summary" />
        <link rel="canonical" href="https://cafe-melody-bonn.de/kontakt" />
      </Helmet>

      {/* Hero */}
      <header className="relative py-20 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/service/catering-buffet.jpg"
            alt="Kontakt Café Melody Bistro Bonn"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(61,31,10,0.85)" }} />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 75% 50%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5" style={{ background: "var(--cafe-gold)" }} />
            <span className="cafe-label" style={{ color: "var(--cafe-gold)" }}>Schreiben Sie uns</span>
            <div className="w-8 h-0.5" style={{ background: "var(--cafe-gold)" }} />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Kontakt</h1>
          <p className="text-white/80 max-w-xl mx-auto text-lg">
            Wir freuen uns auf Ihre Nachricht — für Reservierungen, Events und Anfragen
          </p>
        </div>
      </header>

      <main className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact form */}
            <div>
              <h2 className="font-serif text-3xl font-bold mb-2">Nachricht senden</h2>
              <p className="text-muted-foreground mb-6">Für Reservierungen, Gruppenanfragen und allgemeine Fragen</p>

              {sent ? (
                <div className="rounded-2xl p-8 text-center border" style={{ background: "var(--cafe-cream)", borderColor: "var(--cafe-gold)" }}>
                  <CheckCircle2 className="w-14 h-14 mx-auto mb-4" style={{ color: "var(--cafe-brown)" }} />
                  <h3 className="font-serif text-xl font-bold mb-2" style={{ color: "var(--cafe-brown-dark)" }}>Vielen Dank!</h3>
                  <p className="text-muted-foreground text-sm">Ihre Nachricht wurde gesendet. Wir melden uns schnellstmöglich bei Ihnen.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 bg-card rounded-2xl border border-border p-6" data-testid="form-kontakt">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name *</label>
                    <input id="name" type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Ihr vollständiger Name" data-testid="input-name" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1.5">E-Mail *</label>
                      <input id="email" type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="ihre@email.de" data-testid="input-email" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1.5">Telefon</label>
                      <input id="phone" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+49..." data-testid="input-phone" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1.5">Betreff</label>
                    <select id="subject" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="select-subject">
                      <option value="">Bitte wählen...</option>
                      <option value="reservierung">Tischreservierung</option>
                      <option value="gruppe">Gruppenanfrage</option>
                      <option value="event">Event / Veranstaltung</option>
                      <option value="kaffeezeremonie">Kaffeezeremonie buchen</option>
                      <option value="catering">Catering</option>
                      <option value="sonstiges">Sonstiges</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1.5">Nachricht *</label>
                    <textarea id="message" rows={5} required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Ihre Nachricht..." data-testid="textarea-message" />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
                    style={{ background: "var(--cafe-brown)" }}
                    data-testid="button-submit-kontakt"
                  >
                    <Send className="w-4 h-4" />
                    Nachricht senden
                  </button>
                  <p className="text-xs text-muted-foreground text-center">Mit * markierte Felder sind Pflichtfelder.</p>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div>
              <h2 className="font-serif text-3xl font-bold mb-8">Kontaktdaten</h2>

              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    title: "Adresse",
                    content: <address className="text-muted-foreground not-italic leading-relaxed">Werftstraße 5-7<br />53117 Bonn-Graurheindorf</address>
                  },
                  {
                    icon: Clock,
                    title: "Öffnungszeiten",
                    content: (
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong className="text-foreground">Montag:</strong> Ruhetag</p>
                        <p><strong className="text-foreground">Dienstag – Sonntag:</strong> 10:00 – 19:00 Uhr</p>
                      </div>
                    )
                  },
                  {
                    icon: Phone,
                    title: "Telefon",
                    content: <a href="tel:+491709384822" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-phone-kontakt">+49 170 9384822</a>
                  },
                  {
                    icon: Mail,
                    title: "E-Mail",
                    content: <a href="mailto:hallo@cafe-melody-bonn.de" className="text-muted-foreground hover:text-foreground transition-colors break-all">hallo@cafe-melody-bonn.de</a>
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

                {/* Social media */}
                <div className="p-5 bg-card rounded-2xl border border-border">
                  <h3 className="font-semibold mb-3">Folgen Sie uns</h3>
                  <div className="flex gap-3 flex-wrap">
                    {[
                      { icon: SiInstagram, label: "Instagram", href: "https://instagram.com" },
                      { icon: SiFacebook, label: "Facebook", href: "https://facebook.com" },
                      { icon: SiTiktok, label: "TikTok", href: "https://tiktok.com" },
                    ].map(({ icon: Icon, label, href }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-muted/80 transition-colors">
                        <Icon className="w-4 h-4" /> {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
