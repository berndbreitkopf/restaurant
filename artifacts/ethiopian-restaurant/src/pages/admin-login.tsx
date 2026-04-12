import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Lock, Eye, EyeOff, Coffee, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function AdminLoginPage() {
  const { isAuthenticated, isLoading, login } = useAdminAuth();
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await login(password);
    setSubmitting(false);
    if (result.success) {
      navigate("/admin");
    } else {
      setError(result.error ?? "Login fehlgeschlagen");
      setPassword("");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--cafe-cream)" }}>
        <div className="animate-spin w-8 h-8 border-2 rounded-full border-t-transparent" style={{ borderColor: "var(--cafe-brown)" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, var(--cafe-brown-dark) 0%, var(--cafe-brown) 100%)" }}>
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center" style={{ background: "linear-gradient(180deg, var(--cafe-brown-dark) 0%, var(--cafe-brown) 100%)" }}>
            <img src="/logo/logo.svg" alt="Café Melody Bistro" className="h-12 w-auto mx-auto mb-3 brightness-0 invert opacity-90" />
            <p className="text-amber-200/70 text-sm">Admin-Bereich</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <h1 className="font-serif text-2xl font-bold mb-1 text-center" style={{ color: "var(--cafe-brown-dark)" }}>Anmelden</h1>
            <p className="text-muted-foreground text-sm text-center mb-6">Geben Sie Ihr Admin-Passwort ein</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1.5">Passwort</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoFocus
                    placeholder="Admin-Passwort"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="input-admin-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Passwort ausblenden" : "Passwort anzeigen"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !password}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "var(--cafe-brown)" }}
                data-testid="button-admin-login"
              >
                {submitting ? "Anmelden..." : "Anmelden"}
              </button>
            </form>

            <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700">
              <p className="font-semibold mb-1">Administrator-Hinweis:</p>
              <p>Das Passwort wird als Umgebungsvariable <code className="font-mono bg-amber-100 px-1 rounded">ADMIN_PASSWORD</code> gesetzt.</p>
            </div>
          </div>
        </div>

        <p className="text-center text-white/50 text-xs mt-6">
          <a href="/" className="hover:text-white transition-colors">← Zurück zur Website</a>
        </p>
      </div>
    </div>
  );
}
