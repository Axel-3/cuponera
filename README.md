# 💌 Cuponera

Aplicación web de cupones de amor, construida con **Next.js 14**, **Supabase** y **Framer Motion**. Basada en el diseño original de `index.html` (cupones tipo ticket impresos), transformada en una app moderna, responsiva y con autenticación.

---

## Características

- Autenticación con Supabase Auth (email + contraseña)
- Roles: **admin** (CRUD completo) y **usuario** (solo lectura)
- Cupones estilo ticket con el diseño y paleta de colores originales
- Filtrado por tabs: Disponibles / Usados / Todos
- Modal animado al hacer clic en un cupón
- Panel admin para crear, editar, eliminar y cambiar estado
- Actualizaciones en tiempo real vía Supabase Realtime
- Row Level Security (RLS) en Supabase
- Mobile-first, responsive (1 columna → 2 → 3)

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14 (App Router) |
| UI | TailwindCSS |
| Animaciones | Framer Motion |
| Backend / DB | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Tipado | TypeScript |

---

## Estructura del proyecto

```
cuponera/
├── index.html                  # Diseño original (versión imprimible)
├── supabase/
│   └── schema.sql              # Tablas, RLS y trigger de Supabase
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (fuentes, globals)
│   │   ├── page.tsx            # Redirección a /dashboard
│   │   ├── login/page.tsx      # Página de login
│   │   ├── dashboard/page.tsx  # Vista principal de cupones
│   │   └── admin/page.tsx      # Panel administrativo
│   ├── components/
│   │   ├── Navbar.tsx          # Barra de navegación
│   │   ├── Tabs.tsx            # Filtros (Disponibles/Usados/Todos)
│   │   ├── CouponCard.tsx      # Tarjeta tipo ticket
│   │   ├── CouponModal.tsx     # Modal animado de detalle
│   │   ├── CouponForm.tsx      # Formulario crear/editar
│   │   └── AdminPanel.tsx      # Panel de gestión
│   ├── hooks/
│   │   ├── useAuth.ts          # Estado de autenticación y rol
│   │   └── useCoupons.ts       # CRUD + tiempo real de cupones
│   ├── lib/
│   │   └── supabase.ts         # Cliente Supabase (browser)
│   ├── middleware.ts            # Protección de rutas
│   └── types/index.ts          # Tipos TypeScript
├── .env.local.example
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Instalación y configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ve a **SQL Editor** y ejecuta `supabase/schema.sql`
3. Copia las credenciales desde **Project Settings → API**

### 3. Variables de entorno

```bash
cp .env.local.example .env.local
```

Edita `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

### 4. Crear usuarios en Supabase

Desde **Supabase → Authentication → Users**, crea al menos dos usuarios:

- **Admin**: cualquier email/contraseña
- **Usuario normal**: cualquier email/contraseña

Luego asigna el rol admin ejecutando en SQL Editor:

```sql
UPDATE public.profiles SET role = 'admin' WHERE id = 'UUID_DEL_ADMIN';
```

### 5. Cargar cupones iniciales (opcional)

Descomenta e inserta los datos del seed en `supabase/schema.sql`, reemplazando `TU_ADMIN_UUID`.

### 6. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## Rutas

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/login` | Público | Inicio de sesión |
| `/dashboard` | Autenticado | Galería de cupones |
| `/admin` | Solo admin | Gestión de cupones |

---

## Diseño original

El archivo `index.html` en la raíz es la versión imprimible original del proyecto. Puede abrirse directamente en el navegador e imprimirse en papel carta (8.5×11 in). El diseño de los cupones tipo ticket con los muescas laterales y la paleta de colores pastel se mantiene fiel en la versión web.

---

## Documentación

Ver [`docs/manual-usuario.md`](docs/manual-usuario.md) para el manual completo de uso.
