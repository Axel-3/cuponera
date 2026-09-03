# 💌 Cuponera

App web de cupones de amor construida con **Next.js 14**, **Supabase** y **Framer Motion**.

Proyecto personal: una forma interactiva de regalar cupones canjeables (una cena, una película, un detalle) en lugar de una tarjeta física. Incluye panel de administración para crear y dar seguimiento a los cupones, y una vista pensada para que la otra persona los reciba y use.

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

## Despliegue

Configurado para desplegarse en Netlify (`netlify.toml` con el plugin oficial de Next.js). Requiere definir `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` como variables de entorno en el panel de Netlify.

---

**Autor:** Axel Gutiérrez — [GitHub](https://github.com/Axel-3) · [LinkedIn](https://www.linkedin.com/in/axel-gutierrez-b59a54214/)
