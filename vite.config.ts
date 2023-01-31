import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [],
  root: '.',
  build: {
    emptyOutDir: true,
    outDir: './dist',
  },
});
