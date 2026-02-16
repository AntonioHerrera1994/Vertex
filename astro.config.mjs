import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vertexf.com/',
  integrations: [sitemap()],
  vite: {
    server: {
      fs: {
        // Permite acceso a archivos fuera del directorio raíz
        allow: [
          // Busca archivos desde la raíz del proyecto
          '..',
          // O específicamente permite node_modules
          '../node_modules',
        ]
      }
    }
  }
});