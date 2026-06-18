import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: '/react-liquid-glass-svg/',
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      {
        find: /^react-liquid-glass-svg$/,
        replacement: resolve(
          __dirname,
          '../packages/react-liquid-glass-svg/src/index.ts'
        ),
      },
    ],
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
});
