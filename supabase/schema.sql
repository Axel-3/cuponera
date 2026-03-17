-- ============================================================
-- CUPONERA — Supabase Schema
-- Ejecutar en el SQL Editor de tu proyecto Supabase
-- ============================================================

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLAS
-- ============================================================

-- Tabla de perfiles (extiende auth.users)
CREATE TABLE public.profiles (
  id         UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role       TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabla de cupones
CREATE TABLE public.coupons (
  id              UUID         DEFAULT uuid_generate_v4() PRIMARY KEY,
  title           TEXT         NOT NULL,
  description     TEXT         NOT NULL DEFAULT '',
  expiration_date DATE,
  status          TEXT         NOT NULL DEFAULT 'available'
                               CHECK (status IN ('available', 'used')),
  created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  created_by      UUID         REFERENCES auth.users(id) ON DELETE SET NULL
);

-- ============================================================
-- FUNCIÓN Y TRIGGER: auto-crear perfil al registrarse
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons  ENABLE ROW LEVEL SECURITY;

-- ---- PROFILES ----

-- Cada usuario solo puede ver su propio perfil
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Los admins pueden ver todos los perfiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ---- COUPONS ----

-- Todos los usuarios autenticados pueden leer cupones
CREATE POLICY "Authenticated users can read coupons"
  ON public.coupons FOR SELECT
  TO authenticated
  USING (true);

-- Solo admins pueden insertar cupones
CREATE POLICY "Admins can insert coupons"
  ON public.coupons FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Solo admins pueden actualizar cupones
CREATE POLICY "Admins can update coupons"
  ON public.coupons FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Solo admins pueden eliminar cupones
CREATE POLICY "Admins can delete coupons"
  ON public.coupons FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================
-- DATOS INICIALES (opcional)
-- Descomenta y reemplaza 'TU_ADMIN_UUID' con el UUID real
-- del usuario admin después de crearlo en Supabase Auth.
-- ============================================================

-- UPDATE public.profiles SET role = 'admin' WHERE id = 'TU_ADMIN_UUID';

-- INSERT INTO public.coupons (title, description, expiration_date, status, created_by) VALUES
--   ('Cena romántica',            'Cupón válido por una cena romántica donde tú elijas',                '2027-02-14', 'available', 'TU_ADMIN_UUID'),
--   ('Hotcakes',                  'Este cupón es válido por un par de hotcakes hechos por mí',           '2027-02-14', 'available', 'TU_ADMIN_UUID'),
--   ('Comodín',                   'Cupón válido por cualquier cosa que quieras',                        '2027-02-14', 'available', 'TU_ADMIN_UUID'),
--   ('Galletas',                  'Este cupón es válido por unas galletitas hechas por mí',              '2027-02-14', 'available', 'TU_ADMIN_UUID'),
--   ('Ver la serie que tú quieras','Cupón válido para ver completa la serie que tú elijas',              '2027-02-14', 'available', 'TU_ADMIN_UUID'),
--   ('Cocinar juntos',            'Cupón válido por un día cocinando una deliciosa comida juntos',      '2027-02-14', 'available', 'TU_ADMIN_UUID'),
--   ('Pay de limón',              'Cupón válido por un delicioso pay de limón',                         '2027-02-14', 'available', 'TU_ADMIN_UUID'),
--   ('Elegir salida',             'Cupón válido por una salida a donde sea que tú elijas',              '2027-02-14', 'available', 'TU_ADMIN_UUID'),
--   ('Sesión de fotos',           'Cupón válido por una sesión de fotos juntos',                        '2027-02-14', 'available', 'TU_ADMIN_UUID'),
--   ('Baile juntos',              'Cupón válido por un baile juntos, tú eliges la canción',             '2027-02-14', 'available', 'TU_ADMIN_UUID'),
--   ('Un besito',                 'Cupón válido por un besito o los que tú elijas',                     '2027-02-14', 'available', 'TU_ADMIN_UUID'),
--   ('Plática profunda',          'Cupón válido por tener una plática larga y profunda juntos',         '2027-02-14', 'available', 'TU_ADMIN_UUID');
