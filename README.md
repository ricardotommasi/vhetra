# Vhetra

Sitio web del estudio **Vhetra**: diseño web, identidad visual y presencia digital. Es una landing de una sola página con secciones a pantalla completa, animaciones editoriales y soporte bilingüe (español / inglés). 

Producción: [vhetra.com.ar](https://vhetra.com.ar)

## Características

- **Landing multipanel** con navegación por secciones: inicio, servicios, proyectos, filosofía y contacto
- **Scroll controlado** (`SectionScrollController`): scroll interno dentro de cada sección y salto animado entre paneles (rueda, touch, teclado y navbar)
- **Internacionalización** con `next-intl` (`/es`, `/en`)
- **Video en el hero**, con póster estático para movimiento reducido y pausa fuera de pantalla
- **Carrusel de proyectos** con scroll nativo, controles anterior/siguiente y modales accesibles
- **Tarjeta de contacto** en ruta dedicada (`/tarjeta`)
- **Integración WhatsApp** configurable por variable de entorno
- **Analytics** (Vercel Analytics + Speed Insights)

## Stack

| Área        | Tecnología                        |
| ----------- | --------------------------------- |
| Framework   | Next.js 16 (App Router)           |
| UI          | React 19, Tailwind CSS 4          |
| Animaciones | Framer Motion                     |
| i18n        | next-intl                         |
| Deploy      | Vercel                            |

## Estructura del proyecto

```
app/
├── [locale]/
│   ├── (main)/page.tsx      # Landing principal
│   └── (tarjeta)/tarjeta/   # Página tarjeta de contacto
├── components/
│   ├── SectionScrollController.tsx  # Lógica de scroll entre secciones
│   ├── sections/                    # Hero, Servicios, Proyectos, etc.
│   └── ...
├── utils/scrollToSection.ts         # Helper para navegación programática
└── globals.css                      # Estilos globales y snap panels

i18n/                    # Routing y navegación localizada
messages/es.json         # Traducciones español
messages/en.json         # Traducciones inglés
public/                  # Imágenes, fuentes, animaciones GLB, íconos
```

## Requisitos

- Node.js 20+
- pnpm (recomendado) o npm

## Instalación

```bash
pnpm install
cp .env.example .env.local
```

Editá `.env.local` y configurá el teléfono de WhatsApp en formato E.164:

```env
NEXT_PUBLIC_WHATSAPP_PHONE=5493875038714
```

## Scripts

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo en [http://localhost:3000](http://localhost:3000) |
| `pnpm build` | Build de producción |
| `pnpm start` | Servidor de producción |
| `pnpm lint` | ESLint |
| `pnpm build:analyze` | Build con análisis de bundle |
| `pnpm optimize:services` | Regenera texturas optimizadas desde `assets/services` |
| `pnpm check:messages` | Detecta claves duplicadas y diferencias entre idiomas |
| `pnpm test:e2e` | Pruebas de navegación y accesibilidad en Chromium |

## Navegación entre secciones

La navbar y los CTAs usan `scrollToSectionStart()` (`app/utils/scrollToSection.ts`), que dispara el evento `vhetra:section-navigate` en el contenedor `.snap-page`. `SectionScrollController` escucha ese evento y ejecuta la transición animada hacia la sección indicada.

Cada sección usa la clase `snap-panel` y ocupa el alto del viewport (`100dvh`).

## Rutas

| Ruta          | Descripción                             |
| ------------- | --------------------------------------- |
| `/es`         | Landing en español (locale por defecto) |
| `/en`         | Landing en inglés                       |
| `/es/tarjeta` | Tarjeta de contacto                     |

## Deploy

El proyecto está pensado para Vercel. El build usa webpack (`next build --webpack`).

Variables de entorno necesarias en producción:

- `NEXT_PUBLIC_WHATSAPP_PHONE`

## Verificación de cambios

Usar `pnpm install --frozen-lockfile` para reproducir las versiones revisadas.

```bash
pnpm lint
pnpm check:messages
pnpm typecheck
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
pnpm audit
```

Las pruebas E2E levantan el build de producción en `127.0.0.1:3100` y verifican
las rutas ES/EN, apertura de modales con teclado, Escape, devolución del foco,
bloqueo del fondo y navegación móvil. El puerto 3100 debe estar libre.
Los reportes de fallos y trazas se guardan en `test-results/`.

Los modales comparten `app/components/Modal.tsx`, que utiliza `dialog.showModal()`
para mantener el foco y desactivar el fondo. La apertura detiene las transiciones
de sección; el cierre restaura el scroll y el foco del control que lo abrió.

Los catálogos están en `app/data`, los contactos y el dominio en `app/config/site.ts`
y los metadatos compartidos en `app/config/metadata.ts`. Las traducciones se tipan
desde `i18n/types.d.ts`. Los originales de las texturas se conservan fuera de `public`
en `assets/services`; los recursos de versiones anteriores están en `assets/legacy`.
Los archivos públicos con nombres estables se revalidan, mientras que Next administra
el caché de sus propios archivos con hash. El workflow `.github/workflows/ci.yml`
ejecuta las verificaciones en pushes y pull requests.

## Licencia

Proyecto privado de Vhetra.
