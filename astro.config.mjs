import { defineConfig } from 'astro/config';

export default defineConfig({
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