import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

require('dotenv').config();
// import { NODE_ENV } from 'dotenv';

const MODE = 'development';

console.log(process.env.MODE);

export default defineConfig({
    mode: process.env.MODE,
    // base: "./",
    // publicDir: 'public',
    devtool: process.env.NODE_ENV === "production" ? false : "source-map",
    server: {
        port: 5173,
    },
    publicDir:  false,
    build: {
        outDir: 'dist/main',
        lib: {
            entry: path.resolve(__dirname, 'src/main/index.ts'),
            formats: ['cjs'],
        },
        rollupOptions: {
            external: ['electron'],
            output: {
                format: 'cjs',
                entryFileNames: '[name].cjs',
            },
        },
    },
    resolve: {
        alias: {
            '@': '/src',
            "~": ["/"],
        }
    }
});
