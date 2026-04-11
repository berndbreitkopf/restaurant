import { Helmet } from "react-helmet-async";
import { useState } from "react";
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
  getGetTodaysDailyMenuQueryKey,
  getGetSocialPostsQueryKey,
  getGetSocialPostStatsQueryKey,
  getGetMenuItemsQueryKey,
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
} from "lucide-react";

type AdminTab = "tageskarte" | "social" | "speisekarte" | "galerie";

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>("tageskarte");

  return (
    <>
      <Helmet>
        <title>Admin — Habesha Restaurant Bonn</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex bg-background">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 text-white flex flex-col" style={{ background: "var(--eth-green)" }}>
          <div className="p-6 border-b border-green-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-green-900 text-lg">
                H
              </div>
              <div>
                <p className="font-semibold text-sm">Habesha Admin</p>
                <p className="text-green-300 text-xs">Restaurant Management</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-4" aria-label="Admin Navigation">
            <ul className="space-y-1">
              {([
                { key: "tageskarte" as AdminTab, icon: CalendarDays, label: "Tageskarte" },
                { key: "social" as AdminTab, icon: Share2, label: "Social Media" },
                { key: "speisekarte" as AdminTab, icon: UtensilsCrossed, label: "Speisekarte" },
                { key: "galerie" as AdminTab, icon: Image, label: "Galerie" },
              ]).map(item => (
                <li key={item.key}>
                  <button
                    onClick={() => setTab(item.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      tab === item.key
                        ? "bg-white/20 text-white"
                        : "text-green-200 hover:bg-white/10 hover:text-white"
                    }`}
                    data-testid={`admin-nav-${item.key}`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-green-700">
            <a
              href="/"
              className="flex items-center gap-2 text-green-300 hover:text-white text-sm transition-colors"
              data-testid="link-back-to-site"
            >
              Zur Website
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-8">
          {tab === "tageskarte" && <TageskarteAdmin />}
          {tab === "social" && <SocialMediaAdmin />}
          {tab === "speisekarte" && <SpeisekarteAdmin />}
          {tab === "galerie" && <GalerieAdmin />}
        </main>
      </div>
    </>
  );
}

function TageskarteAdmin() {
  const qc = useQueryClient();
  const { data: todayMenu, isLoading } = useGetTodaysDailyMenu();
  const createItem = useCreateDailyMenuItem();
  const deleteItem = useDeleteDailyMenuItem();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    isVegan: false,
    isVegetarian: false,
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createItem.mutate(
      {
        data: {
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          isVegan: form.isVegan,
          isVegetarian: form.isVegetarian,
          note: form.note || null,
        },
      },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: getGetTodaysDailyMenuQueryKey() });
          setForm({ name: "", description: "", price: "", isVegan: false, isVegetarian: false, note: "" });
        },
      }
    );
  };

  const handleDelete = (id: number) => {
    deleteItem.mutate({ id }, {
      onSuccess: () => qc.invalidateQueries({ queryKey: getGetTodaysDailyMenuQueryKey() }),
    });
  };

  const today = new Date().toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });

  return (
    <section>
      <h1 className="font-serif text-3xl font-bold mb-2">Tageskarte</h1>
      <p className="text-muted-foreground mb-8">{today}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add form */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Gericht hinzufügen</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-2xl p-5" data-testid="form-add-daily-item">
            <div>
              <label htmlFor="daily-name" className="block text-sm font-medium mb-1.5">Name</label>
              <input
                id="daily-name"
                type="text"
                required
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Name des Gerichts"
                data-testid="input-daily-name"
              />
            </div>
            <div>
              <label htmlFor="daily-desc" className="block text-sm font-medium mb-1.5">Beschreibung</label>
              <textarea
                id="daily-desc"
                required
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Kurze Beschreibung..."
                data-testid="textarea-daily-description"
              />
            </div>
            <div>
              <label htmlFor="daily-price" className="block text-sm font-medium mb-1.5">Preis (€)</label>
              <input
                id="daily-price"
                type="number"
                required
                step="0.1"
                min="0"
                value={form.price}
                onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="12.90"
                data-testid="input-daily-price"
              />
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isVegan} onChange={e => setForm(p => ({ ...p, isVegan: e.target.checked }))} className="rounded" data-testid="checkbox-daily-vegan" />
                <span className="text-sm">Vegan</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isVegetarian} onChange={e => setForm(p => ({ ...p, isVegetarian: e.target.checked }))} className="rounded" data-testid="checkbox-daily-vegetarian" />
                <span className="text-sm">Vegetarisch</span>
              </label>
            </div>
            <div>
              <label htmlFor="daily-note" className="block text-sm font-medium mb-1.5">Hinweis (optional)</label>
              <input
                id="daily-note"
                type="text"
                value={form.note}
                onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="z.B. Nur solange Vorrat reicht"
                data-testid="input-daily-note"
              />
            </div>
            <button
              type="submit"
              disabled={createItem.isPending}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-medium disabled:opacity-60 transition-opacity hover:opacity-90"
              style={{ background: "var(--eth-green)" }}
              data-testid="button-add-daily-item"
            >
              <Plus className="w-4 h-4" />
              {createItem.isPending ? "Wird hinzugefügt..." : "Gericht hinzufügen"}
            </button>
          </form>
        </div>

        {/* Current items */}
        <div>
          <h2 className="font-semibold text-lg mb-4">
            Heutige Gerichte
            {todayMenu && <span className="ml-2 text-sm font-normal text-muted-foreground">({todayMenu.totalItems})</span>}
          </h2>
          {isLoading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-20 bg-muted rounded-xl animate-pulse" />)}
            </div>
          ) : todayMenu && todayMenu.items.length > 0 ? (
            <div className="space-y-3">
              {todayMenu.items.map(item => (
                <div key={item.id} className="flex items-start justify-between gap-3 p-4 bg-card border border-border rounded-xl" data-testid={`admin-daily-item-${item.id}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">{item.name}</p>
                      {item.isVegan && <Leaf className="w-3.5 h-3.5 text-green-600" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.description}</p>
                    <p className="font-bold text-sm mt-1" style={{ color: "var(--eth-green)" }}>{item.price.toFixed(2)} €</p>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deleteItem.isPending}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    aria-label="Löschen"
                    data-testid={`button-delete-daily-${item.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-2xl text-muted-foreground">
              <CalendarDays className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Noch keine Tagesgerichte</p>
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

  const togglePlatform = (p: string) => {
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (platforms.length === 0) return;
    createPost.mutate(
      { data: { content, platforms, publishNow } },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: getGetSocialPostsQueryKey() });
          qc.invalidateQueries({ queryKey: getGetSocialPostStatsQueryKey() });
          setContent("");
          setPlatforms([]);
          setPublishNow(false);
        },
      }
    );
  };

  const handleDelete = (id: number) => {
    deletePost.mutate({ id }, {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getGetSocialPostsQueryKey() });
        qc.invalidateQueries({ queryKey: getGetSocialPostStatsQueryKey() });
      },
    });
  };

  const platformConfig = [
    { key: "instagram", icon: SiInstagram, label: "Instagram", color: "#E1306C" },
    { key: "facebook", icon: SiFacebook, label: "Facebook", color: "#1877F2" },
    { key: "tiktok", icon: SiTiktok, label: "TikTok", color: "#000000" },
  ];

  return (
    <section>
      <h1 className="font-serif text-3xl font-bold mb-2">Social Media</h1>
      <p className="text-muted-foreground mb-6">Beiträge erstellen und veröffentlichen</p>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {[
            { label: "Gesamt", value: stats.totalPosts, color: "var(--eth-green)" },
            { label: "Veröffentlicht", value: stats.publishedPosts, color: "var(--eth-green)" },
            { label: "Entwürfe", value: stats.draftPosts, color: "#999" },
            { label: "Instagram", value: stats.instagramPosts, color: "#E1306C" },
            { label: "Facebook", value: stats.facebookPosts, color: "#1877F2" },
            { label: "TikTok", value: stats.tiktokPosts, color: "#000" },
          ].map(stat => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-4 text-center" data-testid={`stat-${stat.label.toLowerCase()}`}>
              <p className="font-bold text-2xl" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create post */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Neuen Beitrag erstellen</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-2xl p-5" data-testid="form-social-post">
            <div>
              <label htmlFor="post-content" className="block text-sm font-medium mb-1.5">Text</label>
              <textarea
                id="post-content"
                required
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={5}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Was möchten Sie teilen?..."
                data-testid="textarea-post-content"
              />
              <p className="text-xs text-muted-foreground mt-1">{content.length} Zeichen</p>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Plattformen</p>
              <div className="flex gap-3 flex-wrap">
                {platformConfig.map(p => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => togglePlatform(p.key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      platforms.includes(p.key)
                        ? "text-white border-transparent shadow-sm"
                        : "bg-background border-border text-muted-foreground hover:border-foreground"
                    }`}
                    style={platforms.includes(p.key) ? { background: p.color, borderColor: p.color } : {}}
                    data-testid={`toggle-platform-${p.key}`}
                  >
                    <p.icon className="w-4 h-4" />
                    {p.label}
                  </button>
                ))}
              </div>
              {platforms.length === 0 && (
                <p className="text-xs text-red-500 mt-1">Bitte mindestens eine Plattform auswählen</p>
              )}
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={publishNow}
                onChange={e => setPublishNow(e.target.checked)}
                className="rounded"
                data-testid="checkbox-publish-now"
              />
              <span className="text-sm font-medium">Jetzt veröffentlichen</span>
            </label>

            <button
              type="submit"
              disabled={createPost.isPending || platforms.length === 0}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-medium disabled:opacity-60 transition-opacity hover:opacity-90"
              style={{ background: "var(--eth-green)" }}
              data-testid="button-submit-post"
            >
              <Share2 className="w-4 h-4" />
              {createPost.isPending ? "Wird erstellt..." : publishNow ? "Jetzt veröffentlichen" : "Als Entwurf speichern"}
            </button>
          </form>
        </div>

        {/* Posts list */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Letzte Beiträge</h2>
          {isLoading ? (
            <div className="space-y-3">
              {[1,2].map(i => <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />)}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {posts.map(post => (
                <div key={post.id} className="p-4 bg-card border border-border rounded-xl" data-testid={`admin-post-${post.id}`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex gap-1 flex-wrap">
                      {post.platforms.map(p => {
                        const cfg = platformConfig.find(c => c.key === p);
                        return cfg ? (
                          <span key={p} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-muted">
                            <cfg.icon className="w-3 h-3" />
                            {cfg.label}
                          </span>
                        ) : null;
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${post.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {post.status === "published" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {post.status === "published" ? "Veröffentlicht" : "Entwurf"}
                      </span>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Löschen"
                        data-testid={`button-delete-post-${post.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {new Date(post.createdAt).toLocaleDateString("de-DE")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-2xl text-muted-foreground">
              <Share2 className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Noch keine Beiträge</p>
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

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Hauptgerichte",
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createItem.mutate(
      {
        data: {
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          category: form.category,
          isVegan: form.isVegan,
          isVegetarian: form.isVegetarian,
          isGlutenFree: form.isGlutenFree,
          isAvailable: true,
        },
      },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: getGetMenuItemsQueryKey() });
          setForm({ name: "", description: "", price: "", category: "Hauptgerichte", isVegan: false, isVegetarian: false, isGlutenFree: false });
        },
      }
    );
  };

  return (
    <section>
      <h1 className="font-serif text-3xl font-bold mb-2">Speisekarte</h1>
      <p className="text-muted-foreground mb-8">Gerichte hinzufügen und verwalten</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-semibold text-lg mb-4">Neues Gericht</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-2xl p-5" data-testid="form-add-menu-item">
            <div>
              <label className="block text-sm font-medium mb-1.5">Name</label>
              <input
                required
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Gerichtsname"
                data-testid="input-menu-name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Beschreibung</label>
              <textarea
                required
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                data-testid="textarea-menu-description"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5">Preis (€)</label>
                <input
                  required
                  type="number"
                  step="0.1"
                  min="0"
                  value={form.price}
                  onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="12.90"
                  data-testid="input-menu-price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Kategorie</label>
                <select
                  value={form.category}
                  onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="select-menu-category"
                >
                  {["Vorspeisen", "Hauptgerichte", "Vegetarisch/Vegan", "Beilagen", "Getränke"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" checked={form.isVegan} onChange={e => setForm(p => ({ ...p, isVegan: e.target.checked }))} data-testid="checkbox-menu-vegan" />
                Vegan
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" checked={form.isVegetarian} onChange={e => setForm(p => ({ ...p, isVegetarian: e.target.checked }))} data-testid="checkbox-menu-vegetarian" />
                Vegetarisch
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" checked={form.isGlutenFree} onChange={e => setForm(p => ({ ...p, isGlutenFree: e.target.checked }))} data-testid="checkbox-menu-glutenfrei" />
                Glutenfrei
              </label>
            </div>
            <button
              type="submit"
              disabled={createItem.isPending}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-medium disabled:opacity-60"
              style={{ background: "var(--eth-green)" }}
              data-testid="button-add-menu-item"
            >
              <Plus className="w-4 h-4" />
              {createItem.isPending ? "Wird hinzugefügt..." : "Gericht hinzufügen"}
            </button>
          </form>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4">Alle Gerichte ({items?.length ?? 0})</h2>
          {isLoading ? (
            <div className="space-y-2">
              {[1,2,3,4].map(i => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}
            </div>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {items?.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-3 p-3 bg-card border border-border rounded-xl" data-testid={`admin-menu-item-${item.id}`}>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{item.category}</span>
                      <span className="font-semibold text-xs" style={{ color: "var(--eth-green)" }}>{item.price.toFixed(2)} €</span>
                      {item.isVegan && <Leaf className="w-3 h-3 text-green-600" />}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteItem.mutate({ id: item.id }, { onSuccess: () => qc.invalidateQueries({ queryKey: getGetMenuItemsQueryKey() }) })}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    data-testid={`button-delete-menu-${item.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createImage.mutate(
      { data: { url, caption: caption || null, category, sortOrder: 0 } },
      {
        onSuccess: () => {
          setUrl(""); setCaption(""); setCategory("food");
        },
      }
    );
  };

  return (
    <section>
      <h1 className="font-serif text-3xl font-bold mb-2">Galerie</h1>
      <p className="text-muted-foreground mb-8">Bilder zur Galerie hinzufügen</p>

      <div className="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-2xl p-5" data-testid="form-add-gallery">
          <div>
            <label className="block text-sm font-medium mb-1.5">Bild-URL</label>
            <input
              required
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://..."
              data-testid="input-gallery-url"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Bildunterschrift</label>
            <input
              value={caption}
              onChange={e => setCaption(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Beschreibung des Bildes..."
              data-testid="input-gallery-caption"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Kategorie</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              data-testid="select-gallery-category"
            >
              <option value="food">Essen</option>
              <option value="ambiance">Atmosphäre</option>
              <option value="team">Team</option>
              <option value="events">Events</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={createImage.isPending}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-medium disabled:opacity-60"
            style={{ background: "var(--eth-green)" }}
            data-testid="button-add-gallery-image"
          >
            <Plus className="w-4 h-4" />
            {createImage.isPending ? "Wird hinzugefügt..." : "Bild hinzufügen"}
          </button>
        </form>
      </div>
    </section>
  );
}

