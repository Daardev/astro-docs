# 📚 Documentación del Proyecto Astro Docs

## 📑 Índice
1. [Introducción](#introducción)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Archivos de Configuración](#archivos-de-configuración)
4. [Componentes](#componentes)
5. [Layouts](#layouts)
6. [Páginas](#páginas)
7. [Estilos](#estilos)
8. [Despliegue](#despliegue)
9. [Scripts Disponibles](#scripts-disponibles)
10. [Conceptos Clave de Astro](#conceptos-clave-de-astro)

---

## 🎯 Introducción

Este es un proyecto de documentación creado con **Astro 5** y **Tailwind CSS v3**. Sirve como punto de partida para aprender Astro desde cero, implementando un sitio de documentación con menú lateral responsive y navegación instantánea mediante transiciones de página.

**Tecnologías principales:**
- **Astro 5.16.0** - Framework web moderno para sitios estáticos
- **Tailwind CSS 3.4.18** - Framework CSS utility-first
- **TypeScript** - Tipado estático configurado en modo strict
- **GitHub Actions** - CI/CD para despliegue automático en GitHub Pages

---

## 📂 Estructura del Proyecto

```
astro-docs/
├── .astro/               # Archivos temporales de Astro (auto-generado)
├── .git/                 # Control de versiones Git
├── .github/
│   └── workflows/
│       └── deploy.yml    # Workflow de despliegue automático
├── node_modules/         # Dependencias instaladas
├── public/               # Archivos estáticos (se copian tal cual al build)
├── src/
│   ├── components/       # Componentes reutilizables de Astro
│   │   └── MenuNav.astro # Menú de navegación lateral
│   ├── layouts/          # Plantillas de página
│   │   └── Layout.astro  # Layout principal del sitio
│   └── pages/            # Páginas del sitio (sistema de routing)
│       ├── index.astro   # Página de inicio (/)
│       ├── instalacion.astro  # (/instalacion)
│       ├── componentes.astro  # (/componentes)
│       └── api.astro     # (/api)
├── .gitignore            # Archivos ignorados por Git
├── astro.config.mjs      # Configuración principal de Astro
├── package.json          # Dependencias y scripts del proyecto
├── tailwind.config.mjs   # Configuración de Tailwind CSS
├── tsconfig.json         # Configuración de TypeScript
└── DOCUMENTATION.md      # Este archivo
```

---

## ⚙️ Archivos de Configuración

### `astro.config.mjs`
**Propósito:** Configuración principal del proyecto Astro.

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://daardev.github.io',  // URL base del sitio en producción
  base: '/astro-docs',                // Subpath para GitHub Pages
  integrations: [tailwind()],         // Integración de Tailwind CSS
});
```

**Explicación:**
- `site`: URL completa donde se desplegará el sitio. Necesario para generar sitemaps y URLs canónicas.
- `base`: Path base del sitio. Como GitHub Pages usa `usuario.github.io/repo`, necesitamos `/astro-docs`.
- `integrations`: Array de integraciones. Aquí solo usamos Tailwind CSS.

**Variables de entorno disponibles:**
- `import.meta.env.BASE_URL` → Devuelve `/astro-docs/` en desarrollo y producción

---

### `tailwind.config.mjs`
**Propósito:** Configuración de Tailwind CSS.

```javascript
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Explicación:**
- `content`: Rutas donde Tailwind debe buscar clases para incluir en el CSS final. Incluye todos los archivos `.astro` en `src/`.
- `theme.extend`: Aquí puedes agregar colores, fuentes, espaciados personalizados sin sobrescribir los defaults.
- `plugins`: Plugins oficiales o de terceros (ej: @tailwindcss/typography).

---

### `tsconfig.json`
**Propósito:** Configuración de TypeScript.

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

**Explicación:**
- Extiende la configuración estricta de Astro para TypeScript.
- Habilita verificaciones de tipos estrictas en tiempo de desarrollo.
- Se usa en el comando `astro check` antes del build.

---

### `package.json`
**Propósito:** Metadatos del proyecto y scripts de ejecución.

```json
{
  "name": "astro-docs",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/tailwind": "^6.0.2",
    "astro": "^5.16.0",
    "tailwindcss": "^3.4.18"
  }
}
```

**Explicación de scripts:**
- `dev`: Inicia servidor de desarrollo en http://localhost:4321
- `build`: Verifica tipos con TypeScript y genera build de producción en `dist/`
- `preview`: Previsualiza el build de producción localmente

---

## 🧩 Componentes

### `MenuNav.astro`
**Ubicación:** `src/components/MenuNav.astro`

**Propósito:** Menú de navegación lateral responsive con hamburger menu en móvil.

**Estructura:**
```astro
---
// Frontmatter (código JavaScript que se ejecuta en el servidor)
const base = import.meta.env.BASE_URL;
const menuItems = [/* array de links */];
---

<!-- Template HTML -->
<button id="menu-toggle">...</button>
<div id="menu-overlay">...</div>
<nav id="menu-nav">...</nav>

<script>
  // Script del cliente (se ejecuta en el navegador)
  function initMenu() { /* lógica del menú */ }
</script>
```

**Frontmatter (Lógica del servidor):**
- Se ejecuta durante el build (en el servidor).
- `import.meta.env.BASE_URL` obtiene el base path configurado (`/astro-docs/`).
- `menuItems` define los elementos del menú.

**Template (HTML):**
1. **Botón hamburguesa** (`#menu-toggle`): Solo visible en móvil (`md:hidden`). Muestra icono de hamburguesa o X según el estado.
2. **Overlay oscuro** (`#menu-overlay`): Capa semi-transparente que cubre la pantalla cuando el menú está abierto en móvil.
3. **Menú lateral** (`#menu-nav`): Sidebar fijo que en móvil se oculta con `transform: translateX(-100%)`.

**Script del cliente:**
```javascript
function initMenu() {
  let isOpen = false;
  
  function toggleMenu() {
    // Alterna clases de Tailwind para mostrar/ocultar
    // Cambia iconos hamburguesa ↔ X
    // Bloquea scroll del body cuando está abierto
  }
  
  // Event listeners para abrir/cerrar
  toggleBtn?.addEventListener('click', toggleMenu);
  overlay?.addEventListener('click', toggleMenu);
  
  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) toggleMenu();
  });
}

initMenu(); // Primera ejecución
document.addEventListener('astro:after-swap', initMenu); // Re-ejecutar después de navegación
```

**Características:**
- ✅ Responsive: Menú lateral fijo en desktop, colapsable en móvil
- ✅ Accesibilidad: Cierre con tecla ESC, aria-label en botón
- ✅ UX: Bloqueo de scroll cuando está abierto, overlay para cerrar
- ✅ Compatibilidad con transiciones: Se reinicializa después de cada navegación

**Clases de Tailwind importantes:**
- `fixed left-0 top-0` - Posicionamiento fijo
- `w-64` - Ancho de 16rem (256px)
- `transform -translate-x-full` - Oculta el menú fuera de la pantalla
- `md:translate-x-0` - En pantallas medianas+ muestra el menú siempre
- `transition-transform duration-300` - Animación suave de 300ms
- `z-40` / `z-50` - Z-index para overlay y botón

---

## 🎨 Layouts

### `Layout.astro`
**Ubicación:** `src/layouts/Layout.astro`

**Propósito:** Plantilla base que envuelve todas las páginas del sitio.

**Estructura:**
```astro
---
import MenuNav from '../components/MenuNav.astro';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!DOCTYPE html>
<html lang="es" transition:animate="fade">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
</head>
<body class="bg-[#1d1d1d] text-white overflow-x-hidden">
  <MenuNav />
  <div class="md:ml-64 px-4 py-8 pt-20 md:pt-8">
    <slot />
  </div>
</body>
</html>
```

**Explicación:**

**Props (Propiedades):**
- `title: string` - Título de la página que se pasa desde cada página individual.
- Se accede mediante `Astro.props`.

**Elementos clave:**
1. **`transition:animate="fade"`** - Habilita transiciones de página en Astro 5. Hace que la navegación sea instantánea sin recargas completas.
2. **`<MenuNav />`** - Incluye el componente del menú en todas las páginas.
3. **`<slot />`** - Punto de inserción donde se inyecta el contenido de cada página.
4. **`md:ml-64`** - Margin-left de 64 (256px) en desktop para compensar el ancho del menú lateral.
5. **`pt-20 md:pt-8`** - Padding-top de 20 (80px) en móvil para el botón hamburguesa, reducido en desktop.

**Clases de Tailwind aplicadas:**
- `bg-[#1d1d1d]` - Fondo gris oscuro personalizado
- `text-white` - Texto blanco por defecto
- `overflow-x-hidden` - Oculta scroll horizontal (previene problemas con el menú)

**¿Cómo funciona `<slot />`?**
Cuando una página usa el layout:
```astro
<Layout title="Mi Página">
  <h1>Hola</h1>
  <p>Contenido</p>
</Layout>
```
El contenido entre las etiquetas `<Layout>` reemplaza `<slot />`.

---

## 📄 Páginas

Las páginas en Astro se crean en `src/pages/`. El nombre del archivo determina la ruta:

| Archivo | Ruta generada |
|---------|---------------|
| `index.astro` | `/` |
| `instalacion.astro` | `/instalacion` |
| `componentes.astro` | `/componentes` |
| `api.astro` | `/api` |

### Ejemplo: `index.astro`
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Astro Docs">
  <h1 class="text-4xl font-bold mb-4 text-center">Astro Docs</h1>
  <p class="text-gray-400 text-center">Bienvenido a la documentación</p>
</Layout>
```

**Estructura:**
1. **Frontmatter** - Importa el layout
2. **Template** - Usa el layout pasando el título como prop
3. El contenido dentro de `<Layout>` se renderiza donde está el `<slot />`

**Todas las páginas tienen la misma estructura:**
- Importan `Layout.astro`
- Le pasan un `title` único
- Contienen el contenido específico de esa sección

---

## 🎨 Estilos

### Sistema de estilos usado
Este proyecto usa **Tailwind CSS** exclusivamente (utility-first CSS).

**¿Dónde se inyecta Tailwind?**
La integración `@astrojs/tailwind` automáticamente:
1. Inyecta las directivas de Tailwind en cada página
2. Escanea los archivos `.astro` buscando clases
3. Genera un CSS optimizado solo con las clases usadas

**No hay archivos CSS manuales** porque todo se maneja con clases de Tailwind.

### Clases de Tailwind más usadas en el proyecto

**Layout y espaciado:**
- `px-4` → padding horizontal de 1rem
- `py-8` → padding vertical de 2rem
- `mb-4` → margin-bottom de 1rem
- `md:ml-64` → margin-left de 16rem en pantallas medianas+

**Tipografía:**
- `text-4xl` → font-size: 2.25rem
- `font-bold` → font-weight: 700
- `text-white` → color blanco
- `text-gray-400` → gris medio
- `text-center` → text-align: center

**Colores:**
- `bg-[#1d1d1d]` → fondo gris oscuro custom
- `bg-zinc-900` → fondo zinc muy oscuro
- `bg-zinc-800` → fondo zinc oscuro
- `bg-black/50` → negro con 50% opacidad

**Responsive:**
- `md:hidden` → oculto en pantallas medianas+
- `md:translate-x-0` → sin transformación en desktop

**Posicionamiento:**
- `fixed` → posición fija
- `z-40`, `z-50` → z-index

**Transiciones:**
- `transition-colors` → anima cambios de color
- `transition-transform` → anima transformaciones
- `duration-300` → duración de 300ms

---

## 🚀 Despliegue

### GitHub Actions Workflow
**Ubicación:** `.github/workflows/deploy.yml`

**Propósito:** Desplegar automáticamente a GitHub Pages cuando se hace push a `main`.

```yaml
name: Deploy Astro to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

concurrency:
  group: pages
  cancel-in-progress: true

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build Astro
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Explicación del workflow:**

**Triggers:**
- `push: branches: [main]` - Se ejecuta cuando hay push a main
- `workflow_dispatch` - Permite ejecución manual desde la interfaz de GitHub

**Concurrency:**
- `group: pages` - Solo un workflow de páginas a la vez
- `cancel-in-progress: true` - Cancela workflows anteriores si hay uno nuevo

**Job: build**
1. **Checkout** - Descarga el código del repositorio
2. **Setup Node** - Instala Node.js 20 con caché de npm
3. **Install dependencies** - `npm ci` (instalación limpia y reproducible)
4. **Build Astro** - Ejecuta `npm run build` que genera la carpeta `dist/`
5. **Upload artifact** - Sube `dist/` como artefacto para el siguiente job

**Job: deploy**
- Depende de `build` (se ejecuta después)
- Usa el artifact generado
- Despliega a GitHub Pages usando la API oficial

**Resultado:**
Sitio disponible en: `https://daardev.github.io/astro-docs/`

---

## 🛠️ Scripts Disponibles

### `npm run dev`
**Descripción:** Inicia el servidor de desarrollo con hot-reload.

```bash
npm run dev
```

**Qué hace:**
- Inicia Astro en modo desarrollo
- Abre el sitio en `http://localhost:4321/astro-docs/`
- Recarga automáticamente al editar archivos
- Muestra errores en tiempo real en la terminal y el navegador

**Cuándo usarlo:** Durante el desarrollo para ver cambios en tiempo real.

---

### `npm run build`
**Descripción:** Genera el build de producción optimizado.

```bash
npm run build
```

**Qué hace:**
1. Ejecuta `astro check` - Verifica errores de TypeScript
2. Ejecuta `astro build` - Genera archivos estáticos en `dist/`
   - Minifica HTML, CSS, JavaScript
   - Optimiza imágenes
   - Genera sitemap
   - Pre-renderiza todas las páginas

**Salida:** Carpeta `dist/` con archivos listos para producción.

**Cuándo usarlo:** Antes de desplegar o para probar el build final.

---

### `npm run preview`
**Descripción:** Previsualiza el build de producción localmente.

```bash
npm run preview
```

**Qué hace:**
- Sirve la carpeta `dist/` generada por `npm run build`
- Abre en `http://localhost:4321/astro-docs/`
- Simula el comportamiento en producción

**Cuándo usarlo:** Para verificar que el build funciona correctamente antes de desplegarlo.

---

## 📖 Conceptos Clave de Astro

### 1. **Componentes `.astro`**
Archivos que combinan JavaScript, HTML y CSS en uno solo.

**Estructura:**
```astro
---
// Frontmatter: código JavaScript que se ejecuta en el servidor
const nombre = "Astro";
---

<!-- Template: HTML con sintaxis especial -->
<h1>Hola {nombre}</h1>

<style>
  /* Estilos con scope al componente */
  h1 { color: blue; }
</style>

<script>
  // JavaScript del cliente
  console.log('Hola desde el navegador');
</script>
```

---

### 2. **Frontmatter**
El código entre `---` al inicio del archivo `.astro`.

**Características:**
- Se ejecuta **en el servidor** durante el build
- Puede importar módulos, hacer fetch de datos, leer archivos
- Las variables están disponibles en el template
- **NO se envía al navegador** (ideal para API keys, lógica sensible)

**Ejemplo:**
```astro
---
const usuarios = await fetch('/api/users').then(r => r.json());
const fecha = new Date().toLocaleDateString();
---

<p>Hay {usuarios.length} usuarios. Fecha: {fecha}</p>
```

---

### 3. **Props (Propiedades)**
Datos que se pasan de un componente padre a un hijo.

**Definir props:**
```astro
---
interface Props {
  titulo: string;
  activo?: boolean; // opcional
}

const { titulo, activo = false } = Astro.props;
---

<h1 class:list={["titulo", { activo }]}>{titulo}</h1>
```

**Usar el componente:**
```astro
<MiComponente titulo="Hola" activo={true} />
```

---

### 4. **Slots**
Permiten pasar contenido HTML entre las etiquetas de un componente.

**Componente con slot:**
```astro
<!-- Card.astro -->
<div class="card">
  <slot /> <!-- Aquí se inyecta el contenido -->
</div>
```

**Uso:**
```astro
<Card>
  <h2>Título</h2>
  <p>Contenido</p>
</Card>
```

**Slots nombrados:**
```astro
<!-- Layout con múltiples slots -->
<header>
  <slot name="header" />
</header>
<main>
  <slot /> <!-- slot por defecto -->
</main>

<!-- Uso -->
<Layout>
  <h1 slot="header">Título</h1>
  <p>Contenido principal</p>
</Layout>
```

---

### 5. **Transiciones de Página**
Astro 5 introduce transiciones nativas sin recargas completas.

**Habilitar:**
```astro
<html transition:animate="fade">
```

**Tipos de animación:**
- `fade` - Desvanecimiento
- `slide` - Deslizamiento
- `none` - Sin animación

**Scripts que persisten:**
Los scripts inline de componentes se re-ejecutan en cada navegación. Para mantener estado:

```astro
<script>
  function init() {
    // Tu código aquí
  }
  
  init(); // Primera carga
  document.addEventListener('astro:after-swap', init); // Después de navegar
</script>
```

---

### 6. **Rutas Basadas en Archivos**
Astro usa el sistema de archivos para generar rutas.

| Archivo | Ruta |
|---------|------|
| `pages/index.astro` | `/` |
| `pages/about.astro` | `/about` |
| `pages/blog/index.astro` | `/blog` |
| `pages/blog/post-1.astro` | `/blog/post-1` |
| `pages/blog/[slug].astro` | `/blog/*` (dinámico) |

---

### 7. **Variables de Entorno**
Accesibles mediante `import.meta.env`.

**Variables disponibles:**
- `import.meta.env.BASE_URL` - Base path configurado
- `import.meta.env.MODE` - "development" o "production"
- `import.meta.env.DEV` - `true` en desarrollo
- `import.meta.env.PROD` - `true` en producción

**Variables custom:**
Crear archivo `.env`:
```
PUBLIC_API_URL=https://api.example.com
SECRET_KEY=abc123
```

Usar:
```astro
---
const apiUrl = import.meta.env.PUBLIC_API_URL; // Visible en cliente
const secretKey = import.meta.env.SECRET_KEY;  // Solo servidor
---
```

⚠️ Variables con prefijo `PUBLIC_` son visibles en el navegador.

---

### 8. **Integraciones**
Plugins que extienden funcionalidad de Astro.

**Instaladas en este proyecto:**
- `@astrojs/tailwind` - Integración de Tailwind CSS

**Agregar más integraciones:**
```bash
npx astro add react      # React
npx astro add vue        # Vue
npx astro add mdx        # MDX (Markdown con JSX)
npx astro add sitemap    # Generador de sitemap
```

---

## 🔍 Flujo de Trabajo Completo

### Desarrollo local:
1. `npm run dev` - Inicia servidor de desarrollo
2. Edita archivos en `src/`
3. Ve cambios en tiempo real en el navegador
4. Astro recarga automáticamente

### Preparar para producción:
1. `npm run build` - Genera build optimizado
2. `npm run preview` - Verifica build localmente
3. Revisa que todo funcione correctamente

### Despliegue:
1. `git add .`
2. `git commit -m "mensaje"`
3. `git push origin main`
4. GitHub Actions automáticamente:
   - Descarga el código
   - Instala dependencias
   - Ejecuta `npm run build`
   - Despliega `dist/` a GitHub Pages

---

## 🎓 Próximos Pasos para Aprender

### 1. **Agregar más páginas**
Crea archivos `.astro` en `src/pages/` para nuevas secciones.

### 2. **Crear más componentes**
Extrae código repetitivo a componentes reutilizables en `src/components/`.

### 3. **Agregar contenido dinámico**
- Usa `getStaticPaths()` para páginas dinámicas
- Fetch de APIs externas en el frontmatter
- Integra un CMS headless

### 4. **Mejorar estilos**
- Personaliza `tailwind.config.mjs` con tu paleta de colores
- Crea componentes UI reutilizables
- Agrega animaciones con Tailwind

### 5. **Optimización**
- Agrega imágenes con `<Image />` de Astro para optimización automática
- Implementa lazy loading
- Usa `astro add sitemap` para SEO

### 6. **Integrar frameworks**
- `astro add react` - Usar componentes React
- `astro add vue` - Usar componentes Vue
- Astro permite mezclar múltiples frameworks en un mismo proyecto

---

## 📚 Recursos Adicionales

- **Documentación oficial de Astro:** https://docs.astro.build
- **Documentación de Tailwind CSS:** https://tailwindcss.com/docs
- **Guías de Astro:** https://docs.astro.build/en/guides/
- **Discord de Astro:** https://astro.build/chat

---

## ✅ Checklist de Conocimientos Adquiridos

Después de estudiar este proyecto, deberías entender:

- ✅ Estructura de un proyecto Astro
- ✅ Cómo funcionan los componentes `.astro`
- ✅ Diferencia entre código del servidor (frontmatter) y del cliente (scripts)
- ✅ Sistema de rutas basado en archivos
- ✅ Uso de layouts y slots
- ✅ Props y paso de datos entre componentes
- ✅ Integración de Tailwind CSS
- ✅ Transiciones de página nativas
- ✅ Configuración de GitHub Pages con base path
- ✅ Despliegue automático con GitHub Actions
- ✅ Scripts de desarrollo, build y preview

---

**¡Felicitaciones!** Ahora tienes una base sólida para continuar aprendiendo Astro y crear proyectos más complejos. 🚀
