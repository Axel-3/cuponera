# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A **Next.js 14 web app** (App Router, TypeScript) for managing printable love coupons, backed by Supabase. The original `index.html` is preserved as a standalone printable version. The web app is a full rewrite of that design into React components with auth, roles, and a database.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

## Environment Setup

Copy `.env.local.example` to `.env.local` and fill in the Supabase credentials before running.

## Architecture

### Routing (App Router)

| Route | File | Access |
|-------|------|--------|
| `/` | `src/app/page.tsx` | Redirects to `/dashboard` |
| `/login` | `src/app/login/page.tsx` | Public |
| `/dashboard` | `src/app/dashboard/page.tsx` | Authenticated |
| `/admin` | `src/app/admin/page.tsx` | Admin role only |

`src/middleware.ts` guards all routes: unauthenticated → `/login`, logged-in + `/login` → `/dashboard`.

### Auth & Roles

`useAuth` (`src/hooks/useAuth.ts`) fetches the current user and their row from the `profiles` table to determine `role: 'admin' | 'user'`. The middleware uses `@supabase/ssr`'s `createServerClient` for cookie-based SSR auth.

Supabase browser client is created via `createBrowserClient` in `src/lib/supabase.ts`. Both hooks memoize the client with `useMemo([])` to avoid re-creation on every render.

### Data Flow

`useCoupons` (`src/hooks/useCoupons.ts`) fetches all coupons, assigns the pastel color palette (12 colors cycling from the original design), and subscribes to Supabase Realtime for live updates. All writes (create/update/delete) are RLS-protected server-side.

### Coupon Card Design

`CouponCard` replicates the ticket-style design from `index.html`:
- Left stub with vertical "Válido Hasta" text, separated by a dashed line
- Circular notches on left and right sides via `clipPath: polygon(...)`
- Pastel border color unique to each coupon (cycles through `COUPON_COLORS` array in `useCoupons.ts`)
- Used coupons: `filter: grayscale(0.35)` + "USADO" badge

### Database (Supabase)

Two tables — `profiles` (id, role) and `coupons` (id, title, description, expiration_date, status, created_at, created_by). A trigger auto-creates a `user`-role profile on every new signup. Full schema and RLS policies in `supabase/schema.sql`.

To promote a user to admin:
```sql
UPDATE public.profiles SET role = 'admin' WHERE id = 'USER_UUID';
```

### Printable Version

`index.html` (root) is the original static design — 5 letter-size pages, 14 coupons. Open directly in the browser and print with Ctrl+P / Cmd+P.
