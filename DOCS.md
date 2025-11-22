# Documentación del Proyecto Astro Docs

## 🚀 Inicio Rápido

### Instalar dependencias
```bash
npm install
```

### Comandos principales

#### Levantar el servidor de desarrollo
```bash
npm run dev
```
- Abre el navegador en: `http://localhost:5173/astro-docs/`
- Hot Module Replacement (HMR) activado - los cambios se reflejan automáticamente
- Mantén la terminal abierta mientras trabajas

#### Detener el servidor
**En la terminal donde corre el servidor:**
- Presiona `Ctrl + C`
- Confirma con `S` o `Y` si te lo pide

#### Compilar para producción
```bash
npm run build
```
- Genera los archivos optimizados en la carpeta `dist/`
- Listo para desplegar en GitHub Pages

#### Previsualizar el build de producción
```bash
npm run preview
```
- Previsualiza localmente el contenido de `dist/`
- Útil para verificar antes de desplegar

---

## 📁 Estructura del Proyecto

```
astro-docs/
├── .github/workflows/
│   └── deploy.yml          # CI/CD automático para GitHub Pages
├── public/                 # Archivos estáticos (imágenes, fuentes, etc)
├── src/
│   ├── components/        # Componentes reutilizables (vacío, listo para usar)
│   ├── styles/
│   │   └── main.css       # Tailwind CSS (@import "tailwindcss")
│   └── index.html         # Página principal
├── dist/                   # Build de producción (generado, no editar)
├── vite.config.js         # Configuración de Vite
├── package.json           # Dependencias y scripts
└── README.md              # Documentación general
```

---

## 🛠️ Cómo Funciona

### Sistema de Build - Vite

**Vite** es el build tool que gestiona todo el proyecto:
- **Servidor de desarrollo ultra rápido** con HMR
- **Compila Tailwind CSS automáticamente**
- **Optimiza para producción** (minificación, tree-shaking, etc)

### Tailwind CSS v4

El proyecto usa **Tailwind CSS v4** con el plugin oficial `@tailwindcss/vite`:

1. **En desarrollo:** Vite procesa `@import "tailwindcss"` en `src/styles/main.css`
2. **Escribes clases** directamente en el HTML: `<div class="bg-[#1d1d1d] text-white">`
3. **Tailwind genera** solo el CSS que realmente usas
4. **El navegador recibe** CSS compilado y optimizado

### GitHub Actions

**¿Qué es GitHub Actions?**

GitHub Actions es un sistema de **CI/CD (Integración Continua y Despliegue Continuo)** integrado en GitHub que automatiza tareas cuando ocurren eventos en tu repositorio.

**¿Para qué nos sirve en este proyecto?**

En este proyecto, GitHub Actions se encarga de:
1. **Detectar cambios:** Se activa automáticamente cuando haces `git push` a `main`
2. **Instalar dependencias:** Ejecuta `npm ci` en un servidor de GitHub
3. **Compilar el proyecto:** Ejecuta `npm run build` para generar la carpeta `dist/`
4. **Desplegar a GitHub Pages:** Sube los archivos compilados y los publica

**Ventajas:**
- ✅ **Automatización total:** No necesitas compilar manualmente
- ✅ **Sin errores locales:** Se compila en un ambiente limpio
- ✅ **Historial de despliegues:** Puedes ver cada despliegue en la pestaña "Actions"
- ✅ **Gratuito:** GitHub Actions es gratis para repositorios públicos

**Archivo de configuración:**
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]        # Se ejecuta en cada push a main
  workflow_dispatch:         # También se puede ejecutar manualmente

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest   # Usa un servidor Ubuntu
    steps:
      - uses: actions/checkout@v4          # Clona el repositorio
      - uses: actions/setup-node@v4        # Instala Node.js
        with:
          node-version: 20
          cache: npm
      - run: npm ci                         # Instala dependencias
      - run: npm run build                  # Compila el proyecto
      - uses: actions/configure-pages@v4   # Configura GitHub Pages
      - uses: actions/upload-pages-artifact@v3  # Sube los archivos
        with:
          path: dist
      - uses: actions/deploy-pages@v4      # Despliega a GitHub Pages
```

**Cómo ver el estado de los despliegues:**
1. Ve a: `https://github.com/Daardev/astro-docs/actions`
2. Verás una lista de todos los workflows ejecutados
3. Haz clic en cualquiera para ver los detalles
4. Si hay errores, aparecerán en rojo con los logs completos

**Ejecutar manualmente:**
1. Ve a: `https://github.com/Daardev/astro-docs/actions`
2. Selecciona el workflow "Deploy"
3. Haz clic en "Run workflow"
4. Selecciona la rama `main` y confirma

### GitHub Pages

El despliegue es **automático** gracias a GitHub Actions:
1. Haces `git push` a la rama `main`
2. GitHub Actions ejecuta el workflow (`.github/workflows/deploy.yml`)
3. Compila el proyecto con `npm run build`
4. Despliega la carpeta `dist/` a GitHub Pages
5. Tu sitio está disponible en: `https://daardev.github.io/astro-docs/`

---

## 📝 Workflow de Desarrollo

### 1. Levantar el entorno
```bash
npm run dev
```

### 2. Editar archivos
- **HTML:** `src/index.html`
- **CSS:** `src/styles/main.css`
- **Componentes:** Crea archivos en `src/components/`

### 3. Ver cambios
- Los cambios se reflejan **automáticamente** en el navegador
- No necesitas recargar manualmente

### 4. Hacer commit
```bash
git add .
git commit -m "Descripción de cambios"
git push
```

### 5. Despliegue automático
- GitHub Actions se encarga del resto
- Verifica el estado en: `https://github.com/Daardev/astro-docs/actions`

---

## 💡 Tips

### Usar clases de Tailwind personalizadas
Tailwind v4 soporta valores arbitrarios:
```html
<!-- Colores personalizados -->
<div class="bg-[#1d1d1d] text-[#ff6b6b]">

<!-- Espaciado personalizado -->
<div class="mt-[137px] p-[23px]">

<!-- Cualquier CSS válido -->
<div class="w-[calc(100%-2rem)]">
```

### Organizar componentes
Crea archivos `.html` o `.js` en `src/components/`:
```
src/components/
├── Header.html
├── Footer.html
└── Card.html
```

### Assets estáticos
Coloca imágenes, fuentes, etc. en `public/`:
```
public/
├── images/
│   └── logo.png
└── fonts/
    └── custom-font.woff2
```
Accede con: `/images/logo.png`

---

## 🔧 Configuración

### Cambiar el puerto de desarrollo
En `vite.config.js`:
```js
export default defineConfig({
  server: {
    port: 3000  // Cambia a tu puerto preferido
  },
  // ... resto de config
})
```

### Cambiar la base URL (para GitHub Pages)
En `vite.config.js`:
```js
export default defineConfig({
  base: '/nombre-de-tu-repo/',  // Debe coincidir con el nombre del repo
  // ...
})
```

---

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Los estilos no se aplican
- ✅ Usa `npm run dev` (NO Live Server)
- ✅ Verifica que la terminal no muestre errores
- ✅ Recarga con `Ctrl + Shift + R`

### GitHub Pages no funciona
1. Ve a: `Settings → Pages`
2. Verifica que "Source" esté en **"GitHub Actions"**
3. Revisa el workflow en la pestaña "Actions"

---

## 📦 Dependencias

- **vite** - Build tool y servidor de desarrollo
- **tailwindcss** - Framework CSS utility-first
- **@tailwindcss/vite** - Plugin oficial de Tailwind para Vite

### Actualizar dependencias
```bash
npm update
```

---

## 🌐 URLs Importantes

- **Desarrollo:** http://localhost:5173/astro-docs/
- **Producción:** https://daardev.github.io/astro-docs/
- **Repositorio:** https://github.com/Daardev/astro-docs
- **Actions:** https://github.com/Daardev/astro-docs/actions

---

## 📖 Recursos

- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de Tailwind CSS v4](https://tailwindcss.com/docs)
- [GitHub Pages](https://docs.github.com/en/pages)
