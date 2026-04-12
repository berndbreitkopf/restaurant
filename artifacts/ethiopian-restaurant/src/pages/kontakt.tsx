import { Helmet } from "react-helmet-async";
import { Phone, MapPin, Clock, Mail, Send } from "lucide-react";
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
        <link rel="canonical" href="https://cafe-melody-bonn.de/kontakt" />
      </Helmet>

      <header className="py-20 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a2e14 0%, var(--eth-green) 60%, #04581d 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 75% 50%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-1 bg-yellow-400" />
            <span className="text-yellow-300 text-sm font-medium tracking-widest uppercase">Schreiben Sie uns</span>
            <div className="w-8 h-1 bg-yellow-400" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Kontakt</h1>
          <p className="text-green-100 max-w-xl mx-auto text-lg">
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
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "var(--eth-green)" }}>
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2 text-green-800">Vielen Dank!</h3>
                  <p className="text-green-700 text-sm">Ihre Nachricht wurde gesendet. Wir melden uns schnellstmöglich bei Ihnen.</p>
                  <button onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }} className="mt-4 text-sm font-medium underline" style={{ color: "var(--eth-green)" }}>
                    Neue Nachricht senden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-2xl p-6" data-testid="form-kontakt">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="k-name">Name *</label>
                    <input id="k-name" required type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Ihr vollständiger Name" data-testid="input-kontakt-name" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5" htmlFor="k-email">E-Mail *</label>
                      <input id="k-email" required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="ihre@email.de" data-testid="input-kontakt-email" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" htmlFor="k-phone">Telefon</label>
                      <input id="k-phone" type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="+49..." data-testid="input-kontakt-phone" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="k-subject">Betreff *</label>
                    <select id="k-subject" required value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" data-testid="select-kontakt-subject">
                      <option value="">Bitte wählen...</option>
                      <option value="reservation">Tischreservierung</option>
                      <option value="group">Gruppenanfrage (ab 6 Personen)</option>
                      <option value="ceremony">Kaffeezeremonie</option>
                      <option value="event">Veranstaltungsanfrage</option>
                      <option value="general">Allgemeine Anfrage</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="k-message">Nachricht *</label>
                    <textarea id="k-message" required value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={5} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" placeholder="Schreiben Sie uns..." data-testid="textarea-kontakt-message" />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90" style={{ background: "var(--eth-green)" }} data-testid="button-submit-kontakt">
                    <Send className="w-4 h-4" />
                    Nachricht senden
                  </button>
                  <p className="text-xs text-muted-foreground text-center">Mit * markierte Felder sind Pflichtfelder.</p>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="space-y-4">
              <h2 className="font-serif text-3xl font-bold mb-6">So erreichen Sie uns</h2>

              <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: "var(--eth-green)" }}>
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Adresse</h3>
                  <address className="text-muted-foreground not-italic leading-relaxed text-sm">
                    Café Melody Bistro<br />
                    Werftstraße 5-7<br />
                    53117 Bonn-Graurheindorf
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: "var(--eth-green)" }}>
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Öffnungszeiten</h3>
                  <table className="text-sm text-muted-foreground">
                    <tbody>
                      <tr><td className="pr-6 py-0.5 font-medium text-foreground">Montag</td><td>Ruhetag</td></tr>
                      <tr><td className="pr-6 py-0.5 font-medium text-foreground">Di – So</td><td>10:00 – 19:00 Uhr</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: "var(--eth-green)" }}>
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Telefon</h3>
                  <a href="tel:+491709384822" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium" data-testid="link-phone-kontakt">
                    +49 170 9384822
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">Erreichbar Di–So, 10:00–19:00 Uhr</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: "var(--eth-green)" }}>
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">E-Mail</h3>
                  <a href="mailto:hallo@cafe-melody-bonn.de" className="text-muted-foreground hover:text-foreground transition-colors text-sm break-all">
                    hallo@cafe-melody-bonn.de
                  </a>
                </div>
              </div>

              <div className="p-5 bg-card rounded-2xl border border-border">
                <h3 className="font-semibold mb-3">Folgen Sie uns</h3>
                <div className="flex gap-3 flex-wrap">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" }} data-testid="link-instagram-kontakt">
                    <SiInstagram className="w-4 h-4" /> Instagram
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white hover:opacity-90 transition-opacity" style={{ background: "#1877F2" }} data-testid="link-facebook-kontakt">
                    <SiFacebook className="w-4 h-4" /> Facebook
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-black text-white hover:opacity-90 transition-opacity">
                    <SiTiktok className="w-4 h-4" /> TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
