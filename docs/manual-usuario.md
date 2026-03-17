# Manual de Usuario — Cuponera 💌

---

## 1. Introducción

**Cuponera** es una aplicación web de cupones de amor. Permite al administrador crear y gestionar cupones de experiencias especiales, y a los usuarios consultarlos, visualizarlos y hacer seguimiento de cuáles han sido canjeados.

La app mantiene el diseño visual original de los cupones tipo ticket —con paleta de colores pastel y muescas laterales— ahora convertido en una interfaz interactiva y responsiva que funciona tanto en móvil como en escritorio.

---

## 2. Objetivo del sistema

- Centralizar los cupones en una plataforma digital accesible desde cualquier dispositivo.
- Permitir al **administrador** gestionar el ciclo de vida completo de los cupones (crear, editar, eliminar, marcar como usados).
- Permitir al **usuario normal** consultar sus cupones de forma elegante y filtrada.
- Garantizar que solo usuarios autorizados puedan modificar datos, mediante autenticación y políticas de seguridad en base de datos.

---

## 3. Requisitos del sistema

| Requisito | Detalle |
|-----------|---------|
| Navegador | Chrome, Firefox, Safari, Edge (versiones modernas) |
| Conexión | Requiere internet para autenticación y datos |
| Dispositivo | Móvil, tablet o computadora |
| Cuenta | Email y contraseña creados por el administrador en Supabase |

No es necesario instalar ninguna aplicación. La app corre en el navegador.

---

## 4. Instalación (solo para desarrolladores)

Ver el archivo `README.md` en la raíz del proyecto para instrucciones completas de instalación, configuración de Supabase y ejecución local.

Resumen rápido:

```bash
npm install
cp .env.local.example .env.local
# Editar .env.local con tus credenciales de Supabase
npm run dev
```

---

## 5. Acceso al sistema

### 5.1 Página de inicio de sesión

Al abrir la aplicación, todos los usuarios son dirigidos a la página de **Login**.

**Pasos para ingresar:**

1. Ingresa tu **email** registrado.
2. Ingresa tu **contraseña**.
3. Haz clic en **Ingresar**.

Si las credenciales son correctas, serás redirigido automáticamente al dashboard (panel principal).

Si las credenciales son incorrectas, aparecerá un mensaje de error en rojo: _"Credenciales incorrectas. Verifica tu email y contraseña."_

> **Nota:** Las cuentas son creadas por el administrador del sistema desde el panel de Supabase. No existe un flujo de registro público.

### 5.2 Cierre de sesión

Para cerrar sesión, haz clic en el botón **Salir** en la barra de navegación superior (esquina superior derecha).

---

## 6. Interfaz

La aplicación tiene tres secciones principales:

| Sección | URL | Acceso |
|---------|-----|--------|
| Login | `/login` | Todos |
| Dashboard | `/dashboard` | Usuarios autenticados |
| Admin | `/admin` | Solo administradores |

### 6.1 Barra de navegación

En la parte superior de la pantalla encontrarás:
- El logo **💌 Cuponera** (enlace al dashboard).
- Los botones **Cupones** y **Admin** (solo visibles para administradores).
- Tu email de usuario.
- El botón **Salir**.

---

## 7. Uso en móvil

La aplicación está diseñada con enfoque **mobile-first**. En pantallas pequeñas:

- Los cupones se muestran en una sola columna, con tarjetas de tamaño cómodo para leer y tocar.
- Los tabs (Disponibles / Usados / Todos) se muestran en una barra horizontal deslizable.
- Al tocar un cupón se abre un **modal a pantalla casi completa** con todos los detalles.
- Los botones de acción son suficientemente grandes para usarse con el dedo.
- La barra de navegación se mantiene fija en la parte superior.

**Gesto principal:** Toca cualquier cupón para ver su detalle completo.

---

## 8. Uso en escritorio

En pantallas medianas y grandes:

- Los cupones se organizan en una cuadrícula de **2 columnas** (pantallas `md`) o **3 columnas** (pantallas `lg` y mayores).
- El panel de administración muestra una tabla de gestión con más espacio horizontal.
- El modal de cupón aparece centrado con fondo difuminado.
- Al pasar el cursor sobre una tarjeta, esta se eleva sutilmente (efecto hover).

---

## 9. Funciones del usuario normal

El usuario normal tiene acceso **solo de lectura**. Puede:

### 9.1 Ver cupones por categoría (Tabs)

En el dashboard encontrarás tres pestañas:

| Pestaña | Descripción |
|---------|-------------|
| **Disponibles** | Cupones que aún no han sido canjeados |
| **Usados** | Cupones que ya fueron utilizados |
| **Todos** | La colección completa |

Cada pestaña muestra entre paréntesis el conteo de cupones en esa categoría.

### 9.2 Ver detalle de un cupón

Haz clic (o toca) cualquier tarjeta de cupón para abrir el **modal de detalle**.

El modal muestra:
- **Título** del cupón.
- **Descripción** completa.
- **Fecha de vencimiento**.
- **Estado**: `DISPONIBLE` o `USADO` (con el color del cupón).

Para cerrar el modal, haz clic en el botón **✕** o fuera del modal.

### 9.3 Identificar cupones usados

Las tarjetas de cupones usados se muestran con:
- **Opacidad reducida** (aspecto grisáceo).
- **Sello** "USADO" en la parte inferior de la tarjeta.

---

## 10. Funciones del administrador

El administrador tiene acceso completo al sistema. Además de todas las funciones del usuario normal, puede:

### 10.1 Acceder al Panel Admin

Haz clic en **Admin** en la barra de navegación, o ve directamente a `/admin`.

### 10.2 Crear un nuevo cupón

1. Haz clic en **+ Nuevo cupón** (botón rosa en la parte superior).
2. Completa el formulario:
   - **Título** (obligatorio)
   - **Descripción** (obligatorio)
   - **Válido hasta** (fecha opcional)
   - **Estado** (Disponible / Usado)
3. Haz clic en **Guardar cupón**.

El cupón aparecerá inmediatamente en la lista y en el dashboard.

### 10.3 Editar un cupón

1. En el panel admin, localiza el cupón en la lista.
2. Haz clic en **Editar** (botón azul).
3. Modifica los campos deseados en el formulario que aparece.
4. Haz clic en **Guardar cupón**.

### 10.4 Eliminar un cupón

1. En el panel admin, haz clic en **Borrar** (botón rojo) junto al cupón.
2. Confirma la eliminación en el diálogo de confirmación.

> Esta acción es **permanente** e irreversible.

### 10.5 Marcar cupones como usados / disponibles

**Desde el panel admin:** Haz clic en el botón **✓** (para marcar usado) o **↩** (para revertir a disponible) junto a cada cupón en la lista.

**Desde el dashboard:** Cada tarjeta de cupón tiene un pequeño botón de acción en la esquina superior derecha.

**Desde el modal:** Abre el detalle del cupón y usa el botón grande de acción en la parte inferior del modal.

---

## 11. Uso paso a paso

### Escenario: El usuario quiere canjear un cupón

1. El **usuario** abre la app y va al tab **Disponibles**.
2. Selecciona el cupón que quiere usar (por ejemplo, "Cena romántica").
3. Muestra el modal al **administrador** como comprobante.
4. El **administrador** abre el mismo cupón y hace clic en **✓ Marcar como usado**.
5. El cupón pasa a la categoría **Usados** y su tarjeta muestra el sello "USADO".

### Escenario: El admin crea cupones iniciales

1. El **admin** va a `/admin`.
2. Hace clic en **+ Nuevo cupón**.
3. Ingresa título, descripción y fecha.
4. Repite para cada cupón de la colección.

---

## 12. Estados de cupones

| Estado | Visual | Descripción |
|--------|--------|-------------|
| `available` | Tarjeta con colores vivos | Disponible para canjear |
| `used` | Tarjeta opaca + sello "USADO" | Ya fue canjeado |

Solo los administradores pueden cambiar el estado de un cupón.

---

## 13. Errores comunes

| Problema | Causa probable | Solución |
|----------|---------------|----------|
| "Credenciales incorrectas" en login | Email o contraseña equivocados | Verifica los datos; contacta al admin si olvidaste la contraseña |
| Los cupones no cargan | Sin conexión o error de configuración | Verifica tu conexión a internet y recarga la página |
| No aparece el botón "Admin" | Tu cuenta no tiene rol admin | Solicita al administrador que asigne el rol admin desde Supabase |
| El modal no cierra | Clic fuera del área del modal o botón ✕ | Toca/haz clic en el fondo oscuro fuera del modal |
| Error al guardar cupón | Campos obligatorios vacíos o sin permisos | Completa los campos obligatorios; verifica que tu cuenta sea admin |

---

## 14. Conclusión

**Cuponera** combina el diseño romántico y artesanal de los cupones impresos originales con la comodidad de una aplicación web moderna. Gracias a la arquitectura en la nube, los cupones están disponibles en cualquier momento y dispositivo, y el administrador puede gestionarlos en tiempo real.

El archivo `index.html` original permanece disponible para quienes deseen **imprimir** la cuponera en papel —abre el archivo en el navegador y usa el diálogo de impresión (Ctrl+P / Cmd+P) con papel carta.

---

*Cuponera v1.0.0 — 2026*
