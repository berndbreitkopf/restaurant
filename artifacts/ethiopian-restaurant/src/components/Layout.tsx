import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Phone, MapPin, Clock } from "lucide-react";
import { SiFacebook, SiInstagram, SiTiktok } from "react-icons/si";

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/speisekarte", label: "Speisekarte" },
  { href: "/tageskarte", label: "Tageskarte" },
  { href: "/galerie", label: "Galerie" },
  { href: "/uber-uns", label: "Uber uns" },
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
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: "var(--eth-green)" }}>
                H
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-foreground">Habesha</span>
                <span className="block text-xs text-muted-foreground tracking-widest uppercase">Restaurant Bonn</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary pb-1 border-b-2 ${
                      location === link.href
                        ? "border-primary text-primary"
                        : "border-transparent text-foreground"
                    }`}
                    data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+4922812345678"
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--eth-green)" }}
                data-testid="link-phone-header"
              >
                <Phone className="w-4 h-4" />
                Reservierung
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-md text-foreground hover:bg-muted"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              data-testid="button-mobile-menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile nav */}
          {menuOpen && (
            <div className="md:hidden border-t border-border pb-4">
              <ul className="space-y-1 pt-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        location === link.href
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setMenuOpen(false)}
                      data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="text-white" style={{ background: "var(--eth-green)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-lg" style={{ color: "var(--eth-green)" }}>
                  H
                </div>
                <div>
                  <span className="font-serif text-lg font-bold">Habesha Restaurant</span>
                  <p className="text-green-200 text-xs tracking-widest uppercase">Bonn</p>
                </div>
              </div>
              <p className="text-green-100 text-sm leading-relaxed">
                Authentische äthiopische Küche im Herzen von Bonn. Erleben Sie die Aromen, Traditionen und Gastfreundschaft Äthiopiens.
              </p>
              <div className="flex gap-3 mt-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors" data-testid="link-instagram-footer" aria-label="Instagram">
                  <SiInstagram className="w-5 h-5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors" data-testid="link-facebook-footer" aria-label="Facebook">
                  <SiFacebook className="w-5 h-5" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors" data-testid="link-tiktok-footer" aria-label="TikTok">
                  <SiTiktok className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold mb-4 text-yellow-300">Offnungszeiten</h3>
              <div className="space-y-2 text-sm text-green-100">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 text-yellow-400 flex-shrink-0" />
                  <div>
                    <p><strong className="text-white">Mo – Fr</strong></p>
                    <p>12:00 – 14:30 Uhr</p>
                    <p>17:00 – 22:00 Uhr</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 text-yellow-400 flex-shrink-0" />
                  <div>
                    <p><strong className="text-white">Sa – So</strong></p>
                    <p>12:00 – 22:30 Uhr</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold mb-4 text-yellow-300">Kontakt</h3>
              <div className="space-y-3 text-sm text-green-100">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-yellow-400 flex-shrink-0" />
                  <address className="not-italic">
                    Musterstrasse 42<br />
                    53111 Bonn
                  </address>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <a href="tel:+4922812345678" className="hover:text-white transition-colors" data-testid="link-phone-footer">
                    +49 228 12345678
                  </a>
                </div>
              </div>
              <nav className="mt-4" aria-label="Footer Navigation">
                <ul className="space-y-1 text-sm">
                  {navLinks.map(link => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-green-200 hover:text-white transition-colors" data-testid={`footer-nav-${link.label.toLowerCase()}`}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className="border-t border-green-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-green-300">
            <p>&copy; {new Date().getFullYear()} Habesha Restaurant Bonn. Alle Rechte vorbehalten.</p>
            <p>Designed with love for Ethiopia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
