# Workspace

## Project: Café Melody Bistro Bonn

Full website for **Café Melody Bistro** (Werftstraße 5-7, 53117 Bonn-Graurheindorf).
- **Phone**: +49 170 9384822 | **Email**: hallo@cafe-melody-bonn.de
- **Hours**: Montag Ruhetag, Di–So 10:00–19:00 Uhr
- **Navigation**: Startseite, Speisekarte, Getränkekarte, Tageskarte, Galerie, Anfahrt
- **Admin**: /admin (Tageskarte, Events, Social Media, Speisekarte, Galerie)
- **Colors**: Green `#078930`, Yellow `#FCDD09`, Red `#DA121A`
- **Fonts**: Playfair Display (serif headings), Inter (body)
- **SEO**: Full German SEO, JSON-LD CafeOrCoffeeShop schema, canonical `cafe-melody-bonn.de`

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

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
