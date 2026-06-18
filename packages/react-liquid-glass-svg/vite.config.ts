import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ['**/*.test.*', '**/*.spec.*', 'src/test/**'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: [
        {
          format: 'es',
          entryFileNames: 'index.esm.js',
          banner: "'use client';",
        },
        {
          format: 'cjs',
          entryFileNames: 'index.cjs',
          banner: "'use client';",
          exports: 'named',
        },
      ],
    },
    target: 'es2020',
    minify: true,
    copyPublicDir: false,
  },
});
