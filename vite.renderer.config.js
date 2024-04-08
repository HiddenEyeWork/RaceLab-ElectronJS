// vite.renderer.config.js
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: './',
    server: {
        port: 3000,
    },
    build: {
        outDir: 'dist/renderer',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                cockpit: path.resolve(__dirname, 'src/renderer/cockpit/index.html'),
                server: path.resolve(__dirname, 'src/renderer/server/index.html'),
                overlayHost: path.resolve(__dirname, 'src/renderer/overlayHost/index.html'),
            }
        }
    }
});
