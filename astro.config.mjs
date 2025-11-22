import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://daardev.github.io',
  base: '/astro-docs',
  integrations: [tailwind()],
});
