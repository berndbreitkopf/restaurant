# Workspace

## Project: Café Melody Bistro Bonn

Full website for **Café Melody Bistro** (Werftstraße 5-7, 53117 Bonn-Graurheindorf).
- **Phone**: +49 170 9384822 | **Email**: hallo@cafe-melody-bonn.de
- **Hours**: Montag Ruhetag, Di–So 10:00–19:00 Uhr
- **Navigation**: Startseite, Speisekarte, Getränkekarte, Tageskarte, Service, Galerie, Anfahrt
- **Admin**: /admin (Dashboard, Tageskarte, Events, Social Media, Speisekarte, Galerie, Einstellungen)
- **Colors**: Green `#078930`, Yellow `#FCDD09`, Red `#DA121A`
- **Fonts**: Playfair Display (serif headings), Inter (body)
- **SEO**: Full German SEO, JSON-LD CafeOrCoffeeShop schema, canonical `cafe-melody-bonn.de`

### All Pages
- `/` — Startseite (Hero, Events, Testimonials, CTAs)
- `/speisekarte` — Vollständige Speisekarte (hardcoded real menu + DB items)
- `/getraenkekarte` — Getränkekarte
- `/tageskarte` — Tageskarte (DB-driven daily menu)
- `/service` — Service & Angebote (Kaffeezeremonie, Gruppen, Eltern-Kind, etc.)
- `/galerie` — Bildergalerie
- `/anfahrt` — Anfahrt + Reservierungsformular
- `/kontakt` — Kontakt-Formular + Infos
- `/impressum` — Impressum (DSGVO)
- `/datenschutz` — Datenschutzerklärung (DSGVO)
- `/admin` — Admin-Bereich (no layout wrapper)

### Architecture
pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm --filter @workspace/db run push` — push DB schema changes
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API client from OpenAPI spec
- `pnpm --filter @workspace/api-client-react run build` — build API client React package
- `cd lib/api-client-react && npx tsc -p tsconfig.json` — build TS declarations

## DB Tables

- `menuItems` — speisekarte items
- `dailyMenuItems` — tageskarte items
- `socialPosts` — social media posts
- `galleryImages` — gallery images
- `events` — events on homepage
- `siteSettings` — key-value settings (restaurant info, SEO, social URLs)

## API Routes

- `GET/POST /api/menu` — menu items
- `GET/POST /api/daily-menu/today` — today's daily menu
- `GET/POST /api/social-posts` — social media posts
- `GET /api/social-posts/stats` — social media stats
- `GET/POST /api/gallery` — gallery images
- `GET/POST /api/events` — events
- `GET /api/settings` — all site settings
- `GET /api/settings/:key` — single setting
- `PUT /api/settings/:key` — update setting
- `POST /api/social/buffer` — post to Buffer API (Instagram/Facebook/TikTok)
- `GET /api/social/buffer/status` — check Buffer API configuration

## Environment Variables Needed

For Buffer Social Media API (optional):
- `BUFFER_ACCESS_TOKEN`
- `BUFFER_INSTAGRAM_PROFILE_ID`
- `BUFFER_FACEBOOK_PROFILE_ID`
- `BUFFER_TIKTOK_PROFILE_ID`
