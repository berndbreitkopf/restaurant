# Workspace

## Project: Café Melody Bistro Bonn

Full website for **Café Melody Bistro** (Werftstraße 5-7, 53117 Bonn-Graurheindorf).
- **Phone**: +49 170 9384822 | **Email**: hallo@cafe-melody-bonn.de
- **Hours**: Montag Ruhetag, Di–So 10:00–19:00 Uhr
- **Navigation**: Startseite, Speisekarte, Getränkekarte, Tageskarte, Service, Galerie, Anfahrt
- **Admin**: /admin (Dashboard, Tageskarte, Events, Social Media, Speisekarte, Galerie, Einstellungen)
- **Colors**: Warm espresso brown `--cafe-brown: #7C4A2D`, gold `--cafe-gold: #C9A66B`, dark `--cafe-brown-dark: #3D1F0A`, terracotta `--cafe-terra: #B03A2E`
- **Legacy aliases**: `--eth-green` → `#7C4A2D`, `--eth-yellow` → `#C9A66B`, `--eth-red` → `#B03A2E`
- **Fonts**: Playfair Display (serif headings), Inter (body)
- **Logo**: SVG at `/logo/logo.svg` — coffee cup with music note icon + "Café Melody BISTRO · BONN" text
- **Real images**: 25 downloaded from cafe-melody-bonn.de into `public/images/` (hero/, events/, speisekarte/, service/, getraenke/, home/)

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
- `/admin` — Admin-Bereich (auth-guarded, redirects to /admin/login if not authenticated)
- `/admin/login` — Admin-Anmeldeseite (kein Layout-Wrapper)

### Architecture
pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: Supabase PostgreSQL (Transaction Pooler) + Drizzle ORM, SSL aktiviert in `lib/db/src/index.ts`
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
- `reservations` — Tischreservierungen (vorname, nachname, email, phone, date, time, guests, message, status)

## Admin Authentication

- **Stateless HMAC-based session tokens** (no extra packages, no DB session store)
- Env var `ADMIN_PASSWORD` (set as Replit Secret) — required
- Env var `SESSION_SECRET` (already set) — used for signing tokens
- Token format: Base64URL-encoded `admin:{expiry}:{nonce}:{hmac}`, valid 48h
- Frontend hook: `src/hooks/useAdminAuth.ts` — login/logout/getToken, stores token in `localStorage.cafe_admin_token`
- `/admin` route: redirects to `/admin/login` if not authenticated
- Logout button in admin sidebar

## API Routes

- `POST /api/auth/login` — admin login (body: { password }), returns { token }
- `GET /api/auth/me` — check current auth (Authorization: Bearer token)
- `POST /api/auth/logout` — logout
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
- `POST /api/reservations` — create reservation (public)
- `GET /api/reservations` — list all reservations (admin auth required)
- `PATCH /api/reservations/:id/status` — update status (admin auth required)

## Environment Variables Needed

Required:
- `ADMIN_PASSWORD` — admin login password (set as Replit Secret)
- `SUPABASE_DATABASE_URL` — Supabase Postgres connection string (Transaction Pooler, port 6543). Falls nicht gesetzt, fällt der Code auf `DATABASE_URL` zurück. SSL wird automatisch aktiviert für `*.supabase.com`.

For Buffer Social Media API (optional):
- `BUFFER_ACCESS_TOKEN`
- `BUFFER_INSTAGRAM_PROFILE_ID`
- `BUFFER_FACEBOOK_PROFILE_ID`
- `BUFFER_TIKTOK_PROFILE_ID`
