# 💌 Cuponera

App web de cupones de amor construida con **Next.js 14**, **Supabase** y **Framer Motion**.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14 (App Router) |
| UI | TailwindCSS |
| Animaciones | Framer Motion |
| Backend / DB | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Tipado | TypeScript |

---

## Características

- Autenticación con email y contraseña
- Roles: **admin** (CRUD completo) y **usuario** (solo lectura)
- Cupones estilo ticket con paleta de colores pasteles
- Filtrado por tabs: Disponibles / Usados / Todos
- Modal animado al hacer clic en un cupón
- Panel admin para crear, editar, eliminar y cambiar estado
- Reproductor de música flotante configurable
- Mobile-first, responsive

---

## Estructura

```
src/
├── app/
│   ├── login/          # Página de login
│   ├── dashboard/      # Vista principal de cupones
│   └── admin/          # Panel administrativo
├── components/         # Componentes reutilizables
├── hooks/              # useAuth, useCoupons, useSettings
├── lib/                # Cliente Supabase
└── types/              # Tipos TypeScript
```

---

## Instalación

```bash
npm install
cp .env.local.example .env.local
# Agregar NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

## Base de datos

Ejecutar `supabase/schema.sql` en el SQL Editor de Supabase.
