import { createHeader } from './components/Header.js';
import { createCard } from './components/Card.js';
import { createMainSection } from './components/MainSection.js';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  console.log('Astro Docs cargado correctamente');
});

// Feature cards data
const features = [
  { icon: '⚡', title: 'Rápido', description: 'Desarrollo ultra rápido con Vite y HMR' },
  { icon: '🎨', title: 'Moderno', description: 'Tailwind CSS v4 con las últimas características' },
  { icon: '📦', title: 'Simple', description: 'Configuración mínima, máximo resultado' }
];

console.log('Features:', features);
