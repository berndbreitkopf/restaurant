import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Phone, MapPin, Clock, Mail, ChevronDown } from "lucide-react";
import { SiFacebook, SiInstagram, SiTiktok } from "react-icons/si";

const mainNavLinks = [
  { href: "/", label: "Startseite" },
  { href: "/speisekarte", label: "Speisekarte" },
  { href: "/getraenkekarte", label: "Getränkekarte" },
  { href: "/tageskarte", label: "Tageskarte" },
  { href: "/service", label: "Service" },
  { href: "/galerie", label: "Galerie" },
  { href: "/anfahrt", label: "Anfahrt" },
];

const footerNavLinks = [
  { href: "/", label: "Startseite" },
  { href: "/speisekarte", label: "Speisekarte" },
  { href: "/getraenkekarte", label: "Getränkekarte" },
  { href: "/tageskarte", label: "Tageskarte" },
  { href: "/service", label: "Service" },
  { href: "/galerie", label: "Galerie" },
  { href: "/anfahrt", label: "Anfahrt" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Ethiopian flag stripe top */}
      <div className="h-1 eth-stripe w-full" />

      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Hauptnavigation">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group" data-testid="link-home-logo">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-sm" style={{ background: "var(--eth-green)" }}>
                M
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-foreground">Café Melody</span>
                <span className="block text-xs text-muted-foreground tracking-widest uppercase">Bistro Bonn</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden xl:flex items-center gap-1">
              {mainNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-all px-3 py-2 rounded-lg ${
                      location === link.href
                        ? "text-white"
                        : "text-foreground hover:bg-muted"
                    }`}
                    style={location === link.href ? { background: "var(--eth-green)" } : {}}
                    data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden xl:flex items-center gap-3">
              <a
                href="tel:+491709384822"
                className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full text-white transition-all hover:opacity-90 hover:shadow-md"
                style={{ background: "var(--eth-green)" }}
                data-testid="link-phone-header"
              >
                <Phone className="w-4 h-4" />
                Reservieren
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="xl:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu öffnen"
              data-testid="button-mobile-menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile nav */}
          {menuOpen && (
            <div className="xl:hidden border-t border-border pb-4 bg-white">
              <ul className="space-y-1 pt-3">
                {mainNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        location === link.href
                          ? "text-white"
                          : "text-foreground hover:bg-muted"
                      }`}
                      style={location === link.href ? { background: "var(--eth-green)" } : {}}
                      onClick={() => setMenuOpen(false)}
                      data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/kontakt" className="flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted" onClick={() => setMenuOpen(false)}>
                    Kontakt
                  </Link>
                </li>
                <li className="px-4 pt-2">
                  <a
                    href="tel:+491709384822"
                    className="flex items-center justify-center gap-2 text-sm font-medium px-4 py-3 rounded-full text-white"
                    style={{ background: "var(--eth-green)" }}
                  >
                    <Phone className="w-4 h-4" />
                    +49 170 9384822
                  </a>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="text-white" style={{ background: "var(--eth-green)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-xl" style={{ color: "var(--eth-green)" }}>
                  M
                </div>
                <div>
                  <span className="font-serif text-lg font-bold">Café Melody</span>
                  <p className="text-green-200 text-xs tracking-widest uppercase">Bistro Bonn</p>
                </div>
              </div>
              <p className="text-green-100 text-sm leading-relaxed mb-5">
                Dein gemütliches Café in Bonn mit äthiopischer Küche, hausgemachten Kuchen und traditioneller Kaffeezeremonie. Harmonie und Genuss — das ist unser Versprechen.
              </p>
              <div className="flex gap-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors" data-testid="link-instagram-footer" aria-label="Instagram">
                  <SiInstagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors" data-testid="link-facebook-footer" aria-label="Facebook">
                  <SiFacebook className="w-4 h-4" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors" data-testid="link-tiktok-footer" aria-label="TikTok">
                  <SiTiktok className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-serif text-base font-semibold mb-4 text-yellow-300">Navigation</h3>
              <nav aria-label="Footer Navigation">
                <ul className="space-y-2">
                  {footerNavLinks.map(link => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-green-100 hover:text-white transition-colors text-sm" data-testid={`footer-nav-${link.label.toLowerCase()}`}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Opening hours */}
            <div>
              <h3 className="font-serif text-base font-semibold mb-4 text-yellow-300">Öffnungszeiten</h3>
              <div className="space-y-3 text-sm text-green-100">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 text-yellow-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Montag</p>
                    <p>Ruhetag</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 text-yellow-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Dienstag – Sonntag</p>
                    <p>10:00 – 19:00 Uhr</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-serif text-base font-semibold mb-4 text-yellow-300">Kontakt</h3>
              <div className="space-y-3 text-sm text-green-100">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-yellow-400 flex-shrink-0" />
                  <address className="not-italic leading-relaxed">
                    Werftstraße 5-7<br />
                    53117 Bonn-Graurheindorf
                  </address>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <a href="tel:+491709384822" className="hover:text-white transition-colors" data-testid="link-phone-footer">
                    +49 170 9384822
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <a href="mailto:hallo@cafe-melody-bonn.de" className="hover:text-white transition-colors break-all">
                    hallo@cafe-melody-bonn.de
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-green-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-green-300">
            <p>&copy; {new Date().getFullYear()} Café Melody Bistro Bonn. Alle Rechte vorbehalten.</p>
            <div className="flex gap-4">
              <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
              <Link href="/kontakt" className="hover:text-white transition-colors">Kontakt</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
