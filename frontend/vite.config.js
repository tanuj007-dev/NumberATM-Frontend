import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { visualizer } from 'rollup-plugin-visualizer';
//visualizer({ open: true })
import viteCompression from 'vite-plugin-compression';
export default defineConfig({
  //  base: './',
  plugins: [react(),viteCompression()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssTarget: 'chrome61',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
  },
});
