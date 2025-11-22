# Astro Docs

Documentación moderna con Tailwind CSS v4 y Vite.

## 📁 Estructura del Proyecto

```
astro-docs/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions para despliegue automático
├── public/                     # Archivos estáticos (imágenes, fuentes, etc)
├── src/
│   ├── components/            # Componentes reutilizables
│   │   ├── Header.js
│   │   ├── Card.js
│   │   └── MainSection.js
│   ├── styles/
│   │   └── main.css           # Estilos con Tailwind CSS
│   ├── index.html             # Página principal
│   └── main.js                # JavaScript principal
├── vite.config.js             # Configuración de Vite
├── package.json
└── .gitignore
```

## 🚀 Scripts Disponibles

### Desarrollo
```bash
npm run dev
```
Inicia el servidor de desarrollo en `http://localhost:5173/astro-docs/`

### Producción
```bash
npm run build
```
Compila el proyecto para producción en la carpeta `dist/`

### Preview
```bash
npm run preview
```
Previsualiza el build de producción localmente

## 🛠️ Tecnologías

- **Vite 7.x** - Build tool ultrarrápido
- **Tailwind CSS 4.x** - Framework CSS utility-first
- **JavaScript ES6+** - Módulos nativos del navegador

## 📦 Dependencias

- `@tailwindcss/vite` - Plugin oficial de Tailwind para Vite
- `tailwindcss` - Framework CSS
- `vite` - Build tool y servidor de desarrollo

## 🌐 Despliegue

El proyecto se despliega automáticamente en GitHub Pages cuando se hace push a la rama `main`.

**URL de producción:** https://daardev.github.io/astro-docs/

## 💡 Características

- ✅ Hot Module Replacement (HMR)
- ✅ Estructura modular de componentes
- ✅ Configuración limpia y minimalista
- ✅ Despliegue automático con GitHub Actions
- ✅ Tailwind CSS v4 con las últimas características
- ✅ Optimizado para producción

## 📝 Notas

- Los componentes en `src/components/` son funciones JavaScript que retornan HTML
- Los estilos están centralizados en `src/styles/main.css`
- Los archivos estáticos deben ir en la carpeta `public/`
- El `base` en `vite.config.js` está configurado para GitHub Pages

## 🤝 Contribuir

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
