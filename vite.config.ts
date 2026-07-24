import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type PluginOption } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import svgr from 'vite-plugin-svgr';

import path from 'path';

const plugins: PluginOption[] = [react(), tailwindcss(), svgr()];

// https://vite.dev/config/
export default defineConfig({
   plugins,
   resolve: {
      alias: {
         '@': path.resolve(__dirname, 'src'),
      },
   },
   build: {
      chunkSizeWarningLimit: 2000,
      cssMinify: true,
      minify: true,
   },
   preview: {
      port: 9900,
   },
   optimizeDeps: {
      include: ['dayjs'],
   },
   // run on development
   ...(process.env.NODE_ENV === 'development' && {
      plugins: [
         ...plugins,
         analyzer({
            analyzerPort: 8008,
         }),
      ],
      server: {
         port: 9900,
      },
   }),
});
