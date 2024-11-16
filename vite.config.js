import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgx from "@svgx/vite-plugin-react";
import wasm from 'vite-plugin-wasm';

export default defineConfig({
    plugins: [react(), svgx(), wasm()],
    build: {
        target: 'esnext',
    },
    experimental: {
        wasm: true,
    },
    resolve: {
        alias: {
            util: 'util'
        }
    },
    define: {
        global: {}
    }
})
