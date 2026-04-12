import { Router } from "express";
import { db } from "@workspace/db";
import { siteSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

const DEFAULT_SETTINGS: Record<string, { value: string; label: string }> = {
  restaurant_name: { value: "Café Melody Bistro", label: "Restaurant Name" },
  hero_title: { value: "Café Melody Bistro", label: "Hero Titel" },
  hero_subtitle: { value: "Dein gemütliches Café in Bonn mit äthiopischer Küche", label: "Hero Untertitel" },
  phone: { value: "+49 170 9384822", label: "Telefon" },
  email: { value: "hallo@cafe-melody-bonn.de", label: "E-Mail" },
  address_line_1: { value: "Werftstraße 5-7", label: "Adresse Zeile 1" },
  address_line_2: { value: "53117 Bonn-Graurheindorf", label: "Adresse Zeile 2" },
  opening_hours_mon: { value: "Ruhetag", label: "Öffnungszeiten Montag" },
  opening_hours_tue_sun: { value: "10:00 – 19:00 Uhr", label: "Öffnungszeiten Di–So" },
  seo_title: { value: "Café Melody Bistro Bonn — Gemütliches Café mit äthiopischer Küche", label: "SEO Titel" },
  seo_description: { value: "Café Melody Bistro Bonn-Graurheindorf — Ihr gemütliches Café mit äthiopischer Küche, hausgemachten Kuchen, frischen Säften und traditioneller Kaffeezeremonie. Werftstraße 5-7, Di–So 10–19 Uhr.", label: "SEO Beschreibung" },
  seo_keywords: { value: "Café Melody Bonn, äthiopisches Café Bonn, Bistro Bonn, Kaffeezeremonie, hausgemachte Kuchen", label: "SEO Keywords" },
  facebook_url: { value: "", label: "Facebook URL" },
  instagram_url: { value: "", label: "Instagram URL" },
  tiktok_url: { value: "", label: "TikTok URL" },
};

router.get("/settings", async (req, res) => {
  try {
    const dbSettings = await db.select().from(siteSettingsTable);
    const settingsMap: Record<string, string> = {};
    dbSettings.forEach(s => { settingsMap[s.key] = s.value; });
    const result = Object.entries(DEFAULT_SETTINGS).map(([key, defaults]) => ({
      id: dbSettings.find(s => s.key === key)?.id ?? 0,
      key,
      value: settingsMap[key] ?? defaults.value,
      label: defaults.label,
      updatedAt: dbSettings.find(s => s.key === key)?.updatedAt?.toISOString() ?? new Date().toISOString(),
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

router.get("/settings/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const [setting] = await db.select().from(siteSettingsTable).where(eq(siteSettingsTable.key, key));
    if (setting) {
      res.json({ key, value: setting.value, label: DEFAULT_SETTINGS[key]?.label ?? key });
    } else if (DEFAULT_SETTINGS[key]) {
      res.json({ key, value: DEFAULT_SETTINGS[key].value, label: DEFAULT_SETTINGS[key].label });
    } else {
      res.status(404).json({ error: "Setting not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch setting" });
  }
});

router.put("/settings/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    if (typeof value !== "string") {
      return res.status(400).json({ error: "value must be a string" });
    }
    const existing = await db.select().from(siteSettingsTable).where(eq(siteSettingsTable.key, key));
    if (existing.length > 0) {
      await db.update(siteSettingsTable).set({ value }).where(eq(siteSettingsTable.key, key));
    } else {
      await db.insert(siteSettingsTable).values({ key, value, label: DEFAULT_SETTINGS[key]?.label ?? key });
    }
    res.json({ key, value });
  } catch (err) {
    res.status(500).json({ error: "Failed to update setting" });
  }
});

export default router;
