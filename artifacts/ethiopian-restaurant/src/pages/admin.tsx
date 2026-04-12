import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import {
  useGetTodaysDailyMenu,
  useCreateDailyMenuItem,
  useDeleteDailyMenuItem,
  useGetSocialPosts,
  useCreateSocialPost,
  useDeleteSocialPost,
  useGetSocialPostStats,
  useGetMenuItems,
  useCreateMenuItem,
  useDeleteMenuItem,
  useCreateGalleryImage,
  useGetEvents,
  useCreateEvent,
  useDeleteEvent,
  getGetTodaysDailyMenuQueryKey,
  getGetSocialPostsQueryKey,
  getGetSocialPostStatsQueryKey,
  getGetMenuItemsQueryKey,
  getGetEventsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";
import {
  CalendarDays,
  Share2,
  UtensilsCrossed,
  Trash2,
  Plus,
  Leaf,
  Image,
  CheckCircle2,
  Clock,
  Star,
  LayoutDashboard,
  Settings,
  TrendingUp,
  Wifi,
  WifiOff,
  Save,
  Coffee,
  Send,
  Pencil,
  Globe,
} from "lucide-react";

type AdminTab = "dashboard" | "tageskarte" | "events" | "social" | "speisekarte" | "galerie" | "einstellungen";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>("dashboard");

  const tabs: { key: AdminTab; icon: React.ElementType; label: string }[] = [
    { key: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { key: "tageskarte", icon: CalendarDays, label: "Tageskarte" },
    { key: "events", icon: Star, label: "Events" },
    { key: "social", icon: Share2, label: "Social Media" },
    { key: "speisekarte", icon: UtensilsCrossed, label: "Speisekarte" },
    { key: "galerie", icon: Image, label: "Galerie" },
    { key: "einstellungen", icon: Settings, label: "Einstellungen" },
  ];

  return (
    <>
      <Helmet>
        <title>Admin — Café Melody Bistro Bonn</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex bg-background">
        <aside className="w-64 flex-shrink-0 text-white flex flex-col shadow-xl" style={{ background: "linear-gradient(180deg, var(--cafe-brown-dark) 0%, var(--cafe-brown) 100%)" }}>
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img src="/logo/logo.svg" alt="Café Melody Bistro" className="h-10 w-auto brightness-0 invert opacity-90" />
            </div>
            <p className="text-amber-200/60 text-xs mt-2 ml-1">Admin-Bereich</p>
          </div>
          <nav className="flex-1 p-3 overflow-y-auto" aria-label="Admin Navigation">
            <ul className="space-y-1">
              {tabs.map(item => (
                <li key={item.key}>
                  <button
                    onClick={() => setTab(item.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      tab === item.key
                        ? "bg-white/20 text-white shadow-sm"
                        : "text-amber-100/70 hover:bg-white/10 hover:text-white"
                    }`}
                    data-testid={`admin-nav-${item.key}`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-white/10 space-y-2">
            <a href="/" className="flex items-center gap-2 text-amber-200/60 hover:text-white text-sm transition-colors" data-testid="link-back-to-site">
              <Globe className="w-4 h-4" />
              Zur Website
            </a>
          </div>
        </aside>

        <main className="flex-1 overflow-auto bg-muted/30 p-8">
          {tab === "dashboard" && <DashboardAdmin onNavigate={setTab} />}
          {tab === "tageskarte" && <TageskarteAdmin />}
          {tab === "events" && <EventsAdmin />}
          {tab === "social" && <SocialMediaAdmin />}
          {tab === "speisekarte" && <SpeisekarteAdmin />}
          {tab === "galerie" && <GalerieAdmin />}
          {tab === "einstellungen" && <EinstellungenAdmin />}
        </main>
      </div>
    </>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number | string; icon: React.ElementType; color: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 shadow-sm">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color }}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function DashboardAdmin({ onNavigate }: { onNavigate: (tab: AdminTab) => void }) {
  const { data: todayMenu } = useGetTodaysDailyMenu();
  const { data: events } = useGetEvents();
  const { data: stats } = useGetSocialPostStats();
  const { data: menuItems } = useGetMenuItems();

  const today = new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <section>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">{today}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Heutige Tagesgerichte" value={todayMenu?.totalItems ?? 0} icon={CalendarDays} color="var(--eth-green)" />
        <StatCard label="Aktive Events" value={events?.length ?? 0} icon={Star} color="var(--eth-yellow)" />
        <StatCard label="Social Posts gesamt" value={stats?.totalPosts ?? 0} icon={Share2} color="var(--eth-red)" />
        <StatCard label="Menü-Einträge" value={menuItems?.length ?? 0} icon={UtensilsCrossed} color="#6366f1" />
      </div>

      {stats && (
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" style={{ color: "var(--eth-green)" }} />
            Social Media Übersicht
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Veröffentlicht", value: stats.publishedPosts },
              { label: "Entwürfe", value: stats.draftPosts },
              { label: "Instagram", value: stats.instagramPosts },
              { label: "Facebook", value: stats.facebookPosts },
              { label: "TikTok", value: stats.tiktokPosts },
            ].map(s => (
              <div key={s.label} className="text-center p-3 bg-muted rounded-xl">
                <p className="font-bold text-xl" style={{ color: "var(--eth-green)" }}>{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {([
          { tab: "tageskarte" as AdminTab, icon: CalendarDays, title: "Tageskarte verwalten", desc: "Tagesgerichte hinzufügen und bearbeiten" },
          { tab: "events" as AdminTab, icon: Star, title: "Events verwalten", desc: "Veranstaltungen auf der Startseite" },
          { tab: "social" as AdminTab, icon: Share2, title: "Social Media", desc: "Beiträge erstellen und veröffentlichen" },
          { tab: "speisekarte" as AdminTab, icon: UtensilsCrossed, title: "Speisekarte", desc: "Menü-Einträge bearbeiten" },
          { tab: "galerie" as AdminTab, icon: Image, title: "Galerie", desc: "Bilder verwalten" },
          { tab: "einstellungen" as AdminTab, icon: Settings, title: "Einstellungen", desc: "Restaurant-Infos und SEO" },
        ]).map(item => (
          <button key={item.tab} onClick={() => onNavigate(item.tab)} className="bg-card border border-border rounded-2xl p-5 text-left hover:shadow-md hover:border-primary transition-all group" data-testid={`dashboard-link-${item.tab}`}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform" style={{ background: "var(--eth-green)" }}>
              <item.icon className="w-5 h-5" />
            </div>
            <p className="font-semibold text-sm">{item.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function TageskarteAdmin() {
  const qc = useQueryClient();
  const { data: todayMenu, isLoading } = useGetTodaysDailyMenu();
  const createItem = useCreateDailyMenuItem();
  const deleteItem = useDeleteDailyMenuItem();
  const [form, setForm] = useState({ name: "", description: "", price: "", isVegan: false, isVegetarian: false, note: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createItem.mutate(
      { data: { name: form.name, description: form.description, price: parseFloat(form.price), isVegan: form.isVegan, isVegetarian: form.isVegetarian, note: form.note || null } },
      { onSuccess: () => { qc.invalidateQueries({ queryKey: getGetTodaysDailyMenuQueryKey() }); setForm({ name: "", description: "", price: "", isVegan: false, isVegetarian: false, note: "" }); } }
    );
  };

  const today = new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });

  return (
    <section>
      <h1 className="font-serif text-3xl font-bold mb-1">Tageskarte</h1>
      <p className="text-muted-foreground mb-8">{today}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-semibold text-lg mb-4">Gericht hinzufügen</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-2xl p-5 shadow-sm" data-testid="form-add-daily-item">
            <div>
              <label className="block text-sm font-medium mb-1.5">Name *</label>
              <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="z.B. Tomatensuppe" data-testid="input-daily-name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Beschreibung *</label>
              <textarea required value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" data-testid="textarea-daily-description" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Preis (€) *</label>
              <input required type="number" step="0.1" min="0" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="7.90" data-testid="input-daily-price" />
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="checkbox" checked={form.isVegan} onChange={e => setForm(p => ({ ...p, isVegan: e.target.checked }))} data-testid="checkbox-daily-vegan" className="rounded" /> Vegan</label>
              <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="checkbox" checked={form.isVegetarian} onChange={e => setForm(p => ({ ...p, isVegetarian: e.target.checked }))} data-testid="checkbox-daily-vegetarian" className="rounded" /> Vegetarisch</label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Hinweis (optional)</label>
              <input value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="z.B. Nur solange Vorrat reicht" data-testid="input-daily-note" />
            </div>
            <button type="submit" disabled={createItem.isPending} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-60 transition-all hover:opacity-90" style={{ background: "var(--eth-green)" }} data-testid="button-add-daily-item">
              <Plus className="w-4 h-4" />
              {createItem.isPending ? "Wird hinzugefügt..." : "Gericht hinzufügen"}
            </button>
          </form>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-4">Heutige Gerichte <span className="text-sm font-normal text-muted-foreground">({todayMenu?.totalItems ?? 0})</span></h2>
          {isLoading ? <div className="space-y-3">{[1,2].map(i => <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />)}</div>
            : todayMenu && todayMenu.items.length > 0 ? (
              <div className="space-y-3">
                {todayMenu.items.map(item => (
                  <div key={item.id} className="flex items-start justify-between gap-3 p-4 bg-card border border-border rounded-xl shadow-sm" data-testid={`admin-daily-item-${item.id}`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {item.isVegan && <Leaf className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />}
                        <p className="font-medium text-sm">{item.name}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.description}</p>
                      <p className="font-bold text-sm mt-1" style={{ color: "var(--eth-green)" }}>{item.price.toFixed(2).replace(".", ",")} €</p>
                    </div>
                    <button onClick={() => deleteItem.mutate({ id: item.id }, { onSuccess: () => qc.invalidateQueries({ queryKey: getGetTodaysDailyMenuQueryKey() }) })} disabled={deleteItem.isPending} className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors flex-shrink-0" data-testid={`button-delete-daily-${item.id}`}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-2xl border border-border text-muted-foreground">
                <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-medium">Noch keine Tagesgerichte</p>
                <p className="text-xs mt-1">Fügen Sie das erste Gericht hinzu</p>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}

function EventsAdmin() {
  const qc = useQueryClient();
  const { data: events, isLoading } = useGetEvents();
  const createEvent = useCreateEvent();
  const deleteEvent = useDeleteEvent();
  const [form, setForm] = useState({ title: "", subtitle: "", description: "", isActive: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEvent.mutate(
      { data: { title: form.title, subtitle: form.subtitle, description: form.description, isActive: form.isActive } },
      { onSuccess: () => { qc.invalidateQueries({ queryKey: getGetEventsQueryKey() }); setForm({ title: "", subtitle: "", description: "", isActive: true }); } }
    );
  };

  return (
    <section>
      <h1 className="font-serif text-3xl font-bold mb-1">Events & Neuigkeiten</h1>
      <p className="text-muted-foreground mb-8">Veranstaltungen auf der Startseite verwalten</p>
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl mb-6 text-sm text-yellow-800">
        <strong>Hinweis:</strong> Wenn keine Events gespeichert sind, werden 3 Standard-Events (Eltern-Kind-Treffen, Feiertags-Brunch, Live Musik) auf der Startseite angezeigt.
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-semibold text-lg mb-4">Neues Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-2xl p-5 shadow-sm" data-testid="form-add-event">
            <div><label className="block text-sm font-medium mb-1.5">Titel *</label><input required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="z.B. Live Musik" data-testid="input-event-title" /></div>
            <div><label className="block text-sm font-medium mb-1.5">Untertitel / Termin *</label><input required value={form.subtitle} onChange={e => setForm(p => ({ ...p, subtitle: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="z.B. Jeden Freitag" data-testid="input-event-subtitle" /></div>
            <div><label className="block text-sm font-medium mb-1.5">Beschreibung *</label><textarea required value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" data-testid="textarea-event-description" /></div>
            <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="checkbox" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} className="rounded" data-testid="checkbox-event-active" /> Aktiv (auf Startseite sichtbar)</label>
            <button type="submit" disabled={createEvent.isPending} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-60 hover:opacity-90 transition-all" style={{ background: "var(--eth-green)" }} data-testid="button-add-event">
              <Plus className="w-4 h-4" />
              {createEvent.isPending ? "Wird erstellt..." : "Event hinzufügen"}
            </button>
          </form>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-4">Aktuelle Events ({events?.length ?? 0})</h2>
          {isLoading ? <div className="space-y-3">{[1,2].map(i => <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />)}</div>
            : events && events.length > 0 ? (
              <div className="space-y-3">
                {events.map(event => (
                  <div key={event.id} className="flex items-start justify-between gap-3 p-4 bg-card border border-border rounded-xl shadow-sm" data-testid={`admin-event-${event.id}`}>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs font-medium mt-0.5" style={{ color: "var(--eth-green)" }}>{event.subtitle}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                    </div>
                    <button onClick={() => deleteEvent.mutate({ id: event.id }, { onSuccess: () => qc.invalidateQueries({ queryKey: getGetEventsQueryKey() }) })} className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors flex-shrink-0" data-testid={`button-delete-event-${event.id}`}><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-2xl border border-border text-muted-foreground">
                <Star className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-medium">Keine Events gespeichert</p>
                <p className="text-xs mt-1">Standard-Events werden angezeigt</p>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}

function SocialMediaAdmin() {
  const qc = useQueryClient();
  const { data: posts, isLoading } = useGetSocialPosts();
  const { data: stats } = useGetSocialPostStats();
  const createPost = useCreateSocialPost();
  const deletePost = useDeleteSocialPost();
  const [content, setContent] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [publishNow, setPublishNow] = useState(false);
  const [bufferStatus, setBufferStatus] = useState<{ ready: boolean; configured: Record<string, boolean> } | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/social/buffer/status`).then(r => r.json()).then(setBufferStatus).catch(() => setBufferStatus(null));
  }, []);

  const togglePlatform = (p: string) => setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (platforms.length === 0) return;
    createPost.mutate(
      { data: { content, platforms, publishNow } },
      { onSuccess: () => { qc.invalidateQueries({ queryKey: getGetSocialPostsQueryKey() }); qc.invalidateQueries({ queryKey: getGetSocialPostStatsQueryKey() }); setContent(""); setPlatforms([]); setPublishNow(false); } }
    );
  };

  const platformConfig = [
    { key: "instagram", icon: SiInstagram, label: "Instagram", color: "#E1306C" },
    { key: "facebook", icon: SiFacebook, label: "Facebook", color: "#1877F2" },
    { key: "tiktok", icon: SiTiktok, label: "TikTok", color: "#000000" },
  ];

  return (
    <section>
      <h1 className="font-serif text-3xl font-bold mb-1">Social Media</h1>
      <p className="text-muted-foreground mb-6">Beiträge erstellen und veröffentlichen</p>

      {bufferStatus !== null && (
        <div className={`flex items-center gap-2 p-4 rounded-xl mb-6 text-sm border ${bufferStatus.ready ? "bg-green-50 border-green-200 text-green-800" : "bg-yellow-50 border-yellow-200 text-yellow-800"}`}>
          {bufferStatus.ready ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          {bufferStatus.ready ? "Buffer API verbunden — Posts werden direkt veröffentlicht" : "Buffer API nicht konfiguriert — Posts werden nur intern gespeichert"}
          {!bufferStatus.ready && (
            <span className="ml-2 text-xs">
              (Fehlend: {Object.entries(bufferStatus.configured).filter(([,v]) => !v).map(([k]) => k).join(", ")})
            </span>
          )}
        </div>
      )}

      {stats && (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
          {[
            { label: "Gesamt", value: stats.totalPosts }, { label: "Veröffentlicht", value: stats.publishedPosts }, { label: "Entwürfe", value: stats.draftPosts },
            { label: "Instagram", value: stats.instagramPosts }, { label: "Facebook", value: stats.facebookPosts }, { label: "TikTok", value: stats.tiktokPosts },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
              <p className="font-bold text-2xl" style={{ color: "var(--eth-green)" }}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-semibold text-lg mb-4">Neuen Beitrag erstellen</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-2xl p-5 shadow-sm" data-testid="form-social-post">
            <div>
              <label className="block text-sm font-medium mb-1.5">Text *</label>
              <textarea required value={content} onChange={e => setContent(e.target.value)} rows={5} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" placeholder="Was möchten Sie teilen?..." data-testid="textarea-post-content" />
              <p className="text-xs text-muted-foreground mt-1">{content.length} Zeichen</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Plattformen *</p>
              <div className="flex gap-2 flex-wrap">
                {platformConfig.map(p => (
                  <button key={p.key} type="button" onClick={() => togglePlatform(p.key)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${platforms.includes(p.key) ? "text-white border-transparent shadow-sm" : "bg-background border-border text-muted-foreground hover:border-foreground"}`} style={platforms.includes(p.key) ? { background: p.color, borderColor: p.color } : {}} data-testid={`toggle-platform-${p.key}`}>
                    <p.icon className="w-4 h-4" />{p.label}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={publishNow} onChange={e => setPublishNow(e.target.checked)} className="rounded" data-testid="checkbox-publish-now" />
              <span className="text-sm font-medium">Jetzt veröffentlichen</span>
            </label>
            <button type="submit" disabled={createPost.isPending || platforms.length === 0} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-60 hover:opacity-90 transition-all" style={{ background: "var(--eth-green)" }} data-testid="button-submit-post">
              <Send className="w-4 h-4" />
              {createPost.isPending ? "Wird erstellt..." : publishNow ? "Jetzt veröffentlichen" : "Als Entwurf speichern"}
            </button>
          </form>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-4">Letzte Beiträge</h2>
          {isLoading ? <div className="space-y-3">{[1,2].map(i => <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />)}</div>
            : posts && posts.length > 0 ? (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {posts.map(post => (
                  <div key={post.id} className="p-4 bg-card border border-border rounded-xl shadow-sm" data-testid={`admin-post-${post.id}`}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex gap-1 flex-wrap">
                        {post.platforms.map(p => { const cfg = platformConfig.find(c => c.key === p); return cfg ? <span key={p} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-muted"><cfg.icon className="w-3 h-3" />{cfg.label}</span> : null; })}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${post.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {post.status === "published" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {post.status === "published" ? "Veröffentlicht" : "Entwurf"}
                        </span>
                        <button onClick={() => deletePost.mutate({ id: post.id }, { onSuccess: () => { qc.invalidateQueries({ queryKey: getGetSocialPostsQueryKey() }); qc.invalidateQueries({ queryKey: getGetSocialPostStatsQueryKey() }); } })} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" data-testid={`button-delete-post-${post.id}`}><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-2xl border border-border text-muted-foreground">
                <Share2 className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-medium">Noch keine Beiträge</p>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}

function SpeisekarteAdmin() {
  const qc = useQueryClient();
  const { data: items, isLoading } = useGetMenuItems();
  const createItem = useCreateMenuItem();
  const deleteItem = useDeleteMenuItem();
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "Hauptgerichte", isVegan: false, isVegetarian: false, isGlutenFree: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createItem.mutate(
      { data: { name: form.name, description: form.description, price: parseFloat(form.price), category: form.category, isVegan: form.isVegan, isVegetarian: form.isVegetarian, isGlutenFree: form.isGlutenFree, isAvailable: true } },
      { onSuccess: () => { qc.invalidateQueries({ queryKey: getGetMenuItemsQueryKey() }); setForm({ name: "", description: "", price: "", category: "Hauptgerichte", isVegan: false, isVegetarian: false, isGlutenFree: false }); } }
    );
  };

  return (
    <section>
      <h1 className="font-serif text-3xl font-bold mb-1">Speisekarte</h1>
      <p className="text-muted-foreground mb-8">Zusätzliche Gerichte zur Datenbank hinzufügen</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-semibold text-lg mb-4">Neues Gericht</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-2xl p-5 shadow-sm" data-testid="form-add-menu-item">
            <div><label className="block text-sm font-medium mb-1.5">Name *</label><input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Gerichtsname" data-testid="input-menu-name" /></div>
            <div><label className="block text-sm font-medium mb-1.5">Beschreibung *</label><textarea required value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" data-testid="textarea-menu-description" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-medium mb-1.5">Preis (€) *</label><input required type="number" step="0.1" min="0" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="12.90" data-testid="input-menu-price" /></div>
              <div><label className="block text-sm font-medium mb-1.5">Kategorie</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" data-testid="select-menu-category">
                  {["Frühstück","Mittagstisch","Suppe","Salate","Vorspeisen","Hauptgerichte","Kaffeezeremonie","Getränke"].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="checkbox" checked={form.isVegan} onChange={e => setForm(p => ({ ...p, isVegan: e.target.checked }))} className="rounded" data-testid="checkbox-menu-vegan" /> Vegan</label>
              <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="checkbox" checked={form.isVegetarian} onChange={e => setForm(p => ({ ...p, isVegetarian: e.target.checked }))} className="rounded" data-testid="checkbox-menu-vegetarian" /> Vegetarisch</label>
              <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="checkbox" checked={form.isGlutenFree} onChange={e => setForm(p => ({ ...p, isGlutenFree: e.target.checked }))} className="rounded" data-testid="checkbox-menu-glutenfrei" /> Glutenfrei</label>
            </div>
            <button type="submit" disabled={createItem.isPending} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-60 hover:opacity-90 transition-all" style={{ background: "var(--eth-green)" }} data-testid="button-add-menu-item">
              <Plus className="w-4 h-4" />{createItem.isPending ? "Wird hinzugefügt..." : "Gericht hinzufügen"}
            </button>
          </form>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-4">Alle DB-Gerichte ({items?.length ?? 0})</h2>
          {isLoading ? <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}</div>
            : items && items.length > 0 ? (
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-3 p-3 bg-card border border-border rounded-xl shadow-sm" data-testid={`admin-menu-item-${item.id}`}>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{item.category}</span>
                        <span className="font-semibold text-xs" style={{ color: "var(--eth-green)" }}>{item.price.toFixed(2).replace(".", ",")} €</span>
                        {item.isVegan && <Leaf className="w-3 h-3 text-green-600" />}
                      </div>
                    </div>
                    <button onClick={() => deleteItem.mutate({ id: item.id }, { onSuccess: () => qc.invalidateQueries({ queryKey: getGetMenuItemsQueryKey() }) })} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors" data-testid={`button-delete-menu-${item.id}`}><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted rounded-2xl text-muted-foreground">
                <UtensilsCrossed className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Keine DB-Gerichte — statische Speisekarte ist aktiv</p>
              </div>
            )}
        </div>
      </div>
    </section>
  );
}

function GalerieAdmin() {
  const createImage = useCreateGalleryImage();
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("food");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createImage.mutate(
      { data: { url, caption: caption || null, category, sortOrder: 0 } },
      { onSuccess: () => { setUrl(""); setCaption(""); setCategory("food"); setSaved(true); setTimeout(() => setSaved(false), 2000); } }
    );
  };

  return (
    <section>
      <h1 className="font-serif text-3xl font-bold mb-1">Galerie</h1>
      <p className="text-muted-foreground mb-8">Bilder zur Galerie hinzufügen</p>
      <div className="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-2xl p-5 shadow-sm" data-testid="form-add-gallery">
          <div><label className="block text-sm font-medium mb-1.5">Bild-URL *</label><input required type="url" value={url} onChange={e => setUrl(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="https://..." data-testid="input-gallery-url" /></div>
          <div><label className="block text-sm font-medium mb-1.5">Bildunterschrift</label><input value={caption} onChange={e => setCaption(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" data-testid="input-gallery-caption" /></div>
          <div><label className="block text-sm font-medium mb-1.5">Kategorie</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" data-testid="select-gallery-category">
              <option value="food">Essen</option>
              <option value="ambiance">Atmosphäre</option>
              <option value="team">Team</option>
              <option value="events">Events</option>
            </select>
          </div>
          <button type="submit" disabled={createImage.isPending} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-60 hover:opacity-90 transition-all" style={{ background: saved ? "#16a34a" : "var(--eth-green)" }} data-testid="button-add-gallery-image">
            {saved ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {saved ? "Gespeichert!" : createImage.isPending ? "Wird hinzugefügt..." : "Bild hinzufügen"}
          </button>
        </form>
      </div>
    </section>
  );
}

interface SettingEntry {
  key: string;
  value: string;
  label: string;
  id: number;
  updatedAt: string;
}

function EinstellungenAdmin() {
  const [settings, setSettings] = useState<SettingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<"restaurant" | "seo" | "social">("restaurant");

  useEffect(() => {
    fetch(`${BASE_URL}/api/settings`).then(r => r.json()).then(data => {
      setSettings(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const updateSetting = async (key: string, value: string) => {
    setSaving(key);
    await fetch(`${BASE_URL}/api/settings/${key}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });
    setSaving(null);
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
  };

  const groups = {
    restaurant: {
      label: "Restaurant",
      icon: Coffee,
      keys: ["restaurant_name", "phone", "email", "address_line_1", "address_line_2", "opening_hours_mon", "opening_hours_tue_sun", "hero_title", "hero_subtitle"],
    },
    seo: {
      label: "SEO",
      icon: Globe,
      keys: ["seo_title", "seo_description", "seo_keywords"],
    },
    social: {
      label: "Social Media URLs",
      icon: Share2,
      keys: ["instagram_url", "facebook_url", "tiktok_url"],
    },
  } as const;

  const currentGroup = groups[activeGroup];
  const groupSettings = settings.filter(s => currentGroup.keys.includes(s.key as typeof currentGroup.keys[number]));

  return (
    <section>
      <h1 className="font-serif text-3xl font-bold mb-1">Einstellungen</h1>
      <p className="text-muted-foreground mb-6">Restaurant-Informationen, SEO und Social Media</p>

      <div className="flex gap-2 mb-6">
        {(Object.entries(groups) as [keyof typeof groups, typeof groups[keyof typeof groups]][]).map(([key, group]) => (
          <button key={key} onClick={() => setActiveGroup(key)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeGroup === key ? "text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`} style={activeGroup === key ? { background: "var(--eth-green)" } : {}}>
            <group.icon className="w-4 h-4" />
            {group.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-4 max-w-2xl">
          {groupSettings.map(setting => (
            <div key={setting.key} className="bg-card border border-border rounded-xl p-4 shadow-sm">
              <label className="block text-sm font-medium mb-1.5">{setting.label}</label>
              {setting.key.includes("description") || setting.key.includes("subtitle") ? (
                <textarea
                  value={setting.value}
                  onChange={e => handleChange(setting.key, e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={setting.value}
                  onChange={e => handleChange(setting.key, e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              )}
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => updateSetting(setting.key, setting.value)}
                  disabled={saving === setting.key}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all ${saved === setting.key ? "bg-green-600" : "hover:opacity-90"}`}
                  style={saved === setting.key ? {} : { background: "var(--eth-green)" }}
                  data-testid={`button-save-setting-${setting.key}`}
                >
                  {saved === setting.key ? <CheckCircle2 className="w-3.5 h-3.5" /> : saving === setting.key ? <span className="animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full inline-block" /> : <Save className="w-3.5 h-3.5" />}
                  {saved === setting.key ? "Gespeichert" : saving === setting.key ? "Speichert..." : "Speichern"}
                </button>
              </div>
            </div>
          ))}
          {groupSettings.length === 0 && (
            <div className="text-center py-12 bg-muted rounded-2xl text-muted-foreground">
              <Settings className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Keine Einstellungen gefunden</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
